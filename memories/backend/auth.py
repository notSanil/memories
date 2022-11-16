from flask import Blueprint, request
from backend.database import get_db
from werkzeug.security import generate_password_hash, check_password_hash
from mysql.connector.errors import IntegrityError

bp = Blueprint('auth', __name__, url_prefix='/auth')

@bp.route("/register", methods=("POST", ))
def register():
    username = request.json["username"]
    password = request.json["password"]

    name = request.json["name"]

    db, connection = get_db()

    try:
        db.execute("INSERT INTO users (name, password, username) VALUES (%s, %s, %s)", 
        (name, generate_password_hash(password), username))
    except IntegrityError:
        print("Username already registered")


    connection.commit()

    db.execute("Select id from users where username=%s", (username, ))
    result = db.fetchone()
    print(result)
    return {"id": 1}


@bp.route("/login", methods=["POST"])
def login():
    username = request.json["username"]
    password = request.json["password"]

    db, conn = get_db()

    db.execute("SELECT id, name, password, username FROM users where username=%s", (username, ))
    result = db.fetchone()
    if result is None:
        return "Error smth"

    if check_password_hash(result[2], password):
        return "Authenticated"
    else:
        return "Wrong password"
