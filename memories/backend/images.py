from flask import Blueprint, request, current_app, send_from_directory
from backend.database import get_db
import io

bp = Blueprint("images", __name__, url_prefix="/")


@bp.route("/uploadimage", methods=["POST"])
def uploadImage():
    id = request.form["id"]
    
    file = request.files['file']
    hashedName = hash(file.name)
    
    file.save(current_app.config["UPLOADS_PATH"] + str(hashedName) + '.png')
    print(current_app.config["UPLOADS_PATH"] + str(hashedName) + '.png')

    db, conn = get_db()
    db.execute("INSERT INTO images(ownerID, fileName) VALUES (%s, %s)", (id, str(hashedName)))
    conn.commit()

    return {"Succ":1}


@bp.route("/getimage", methods=["GET"])
def getImage():
    db, conn = get_db()

    db.execute("SELECT ownerID, fileName FROM images WHERE id=%s", (6, ))
    data = db.fetchone()
    
    return send_from_directory(current_app.config["UPLOADS_PATH"], data[1] + '.png')

