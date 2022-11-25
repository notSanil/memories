from flask import Blueprint, request, jsonify
from backend.database import get_db
from werkzeug.security import generate_password_hash, check_password_hash
from mysql.connector.errors import IntegrityError
from flask_jwt_extended import create_access_token, unset_jwt_cookies, JWTManager

bp = Blueprint('auth', __name__, url_prefix='/auth')

jwt = None

def create_token(id: int):
    access_token = create_access_token(identity=str(id))
    return access_token

@bp.route("/logout", methods=["POST"])
def logout():
    response = jsonify({"msg": "logout successful"})
    unset_jwt_cookies(response)
    return response

@bp.route("/register", methods=("POST", ))
def register():
    username = request.json["username"]
    password = request.json["password"]

    db, connection = get_db()

    try:
        db.execute("INSERT INTO users (password, username) VALUES (%s, %s)", 
        (generate_password_hash(password), username))
    except IntegrityError:
        connection.close()
        return {"msg": "Username already exists"}, 401

    connection.commit()

    db.execute("Select id from users where username=%s", (username, ))
    result = db.fetchone()

    token = create_token(result[0])

    return {"access_token": token}


@bp.route("/login", methods=["POST"])
def login():
    username = request.json["username"]
    password = request.json["password"]

    db, conn = get_db()

    db.execute("SELECT id, password, username FROM users where username=%s", (username, ))
    result = db.fetchone()

    id = -1
    if result is None:
        id = -1
    else:
        if check_password_hash(result[1], password):
            id = result[0]
        else:
            id = -1

    token = None
    if id != -1:
        token = create_token(id)  
    else:
        return {'msg': "Login Failed"}, 401

    return {"access_token": token}


def init_app(app):
    global jwt
    jwt = JWTManager(app)
