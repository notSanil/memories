from flask import Blueprint, request, make_response, jsonify, session
from backend.database import get_db
from werkzeug.security import generate_password_hash, check_password_hash
from mysql.connector.errors import IntegrityError
from time import time

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
    
    session.clear()
    session['user_id'] = result[0]

    return {'name':name, 'username':username}


@bp.route("/login", methods=["POST"])
def login():
    print(session.get("user_id"))

    username = request.json["username"]
    password = request.json["password"]

    db, conn = get_db()

    db.execute("SELECT id, name, password, username FROM users where username=%s", (username, ))
    result = db.fetchone()

    response_result = {}
    id = -1

    if result is None:
        id = -1

    if check_password_hash(result[2], password):
        id = result[0]
        response_result['name'] = result[1]
        response_result['username'] = result[3]
    else:
        id = -1

    if id != -1:
        session['user_id'] = id   

    response = make_response(jsonify(response_result), 200)

    return response
