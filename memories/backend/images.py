from flask import Blueprint, request, current_app, send_from_directory
from backend.database import get_db
from backend.captioning.caption_gen import generate_captions
from mysql.connector.errors import IntegrityError
import os
from flask_jwt_extended import jwt_required, decode_token, get_jwt_identity

bp = Blueprint("images", __name__, url_prefix="/")


@bp.route("/uploadimage", methods=["POST"])
@jwt_required()
def uploadImage():    
    files = request.files.getlist('files')
    current_user = get_jwt_identity()

    for file in files:
        processFile(current_user, file)

    return {"Succ":1}

def processFile(owner, file):
    hashedName = hash(file.filename + str(owner))

    filePath = current_app.config["UPLOADS_PATH"] + str(hashedName) + '.png'

    file.save(filePath)

    # caption = generate_captions(filePath)
    db, conn = get_db()
    try:
        db.execute("INSERT INTO images(ownerID, fileName, caption) VALUES (%s, %s, %s)", 
             (owner, str(hashedName), "LOL"))
    except IntegrityError:
        conn.close()
        os.remove(filePath)
    else:
        conn.commit()

@bp.route("/getimage", methods=["GET"])
@jwt_required()
def getImage():
    db, conn = get_db()

    db.execute("SELECT ownerID, fileName FROM images WHERE id=%s", (6, ))
    data = db.fetchone()
    
    return send_from_directory(current_app.config["UPLOADS_PATH"], data[1] + '.png')

