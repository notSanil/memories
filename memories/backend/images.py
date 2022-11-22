from flask import Blueprint, request, current_app, send_from_directory
from backend.database import get_db
from backend.captioning.caption_gen import generate_captions
from mysql.connector.errors import IntegrityError
import os

bp = Blueprint("images", __name__, url_prefix="/")


@bp.route("/uploadimage", methods=["POST"])
def uploadImage():
    id = request.form["id"]
    
    file = request.files['file']
    hashedName = hash(file.name)

    filePath = current_app.config["UPLOADS_PATH"] + str(hashedName) + '.png'

    file.save(filePath)

    caption = generate_captions(filePath)
    db, conn = get_db()
    try:
        db.execute("INSERT INTO images(ownerID, fileName, caption) VALUES (%s, %s, %s)", 
            (id, str(hashedName), caption))
    except IntegrityError:
        os.remove(filePath)
    else:
        conn.commit()

    return {"Succ":1}


@bp.route("/getimage", methods=["GET"])
def getImage():
    db, conn = get_db()

    db.execute("SELECT ownerID, fileName FROM images WHERE id=%s", (6, ))
    data = db.fetchone()
    
    return send_from_directory(current_app.config["UPLOADS_PATH"], data[1] + '.png')

