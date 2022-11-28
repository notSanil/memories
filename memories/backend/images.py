from flask import Blueprint, request, current_app, send_from_directory
from backend.database import get_db
from backend.captioning.caption_gen import generate_captions
from mysql.connector.errors import IntegrityError
import os
from flask_jwt_extended import jwt_required, get_jwt_identity
from backend.face_recognition.recogniser import recognise_faces
import cv2
import asyncio

bp = Blueprint("images", __name__, url_prefix="/")


@bp.route("/uploadimage", methods=["POST"])
@jwt_required()
def uploadImage():    
    files = request.files.getlist('files')
    current_user = get_jwt_identity()

    for file in files:
        processFile(current_user, file)

    return "Success"

def processFile(owner, file):
    hashedName = hash(file.filename + str(owner))

    filePath = current_app.config["UPLOADS_PATH"] + str(hashedName) + '.png'

    file.save(filePath)

    db, conn = get_db()

    try:
        db.execute("INSERT INTO images(ownerID, fileName, caption) VALUES (%s, %s, %s)", 
             (owner, str(hashedName), "Caption not generated"))
    except IntegrityError:
        conn.close()
        os.remove(filePath)
    else:
        conn.commit()

    asyncio.run(captionImage(filePath, str(hashedName)))

    db.execute("SELECT id from images where fileName=%s", [str(hashedName)])
    imageID = db.fetchone()[0]

    db.execute("SELECT faceID from user_faces WHERE userID=%s", [owner])
    knownIDs = db.fetchall()
    knownIDs = [x[0] for x in knownIDs]    
    faces = recognise_faces(filePath, knownIDs)

    for i in range(len(faces)):
        face = faces[i]

        faceID = -1
        if face[0] == -1:
            sampleName = hash(hashedName + i + 1)
            db.execute("INSERT INTO face_description(fileName) VALUES(%s)", [str(sampleName)])
            createSample(filePath, face[1], str(sampleName))
            conn.commit()

            db.execute("SELECT id FROM face_description WHERE fileName=%s", [str(sampleName)])
            id = db.fetchone()[0]
            faceID = id
        else:
            faceID = face[0]

        if (face[0] == -1):
            db.execute("INSERT INTO user_faces(userID, faceID) VALUES (%s, %s)", [owner, faceID])

        db.execute('INSERT INTO face_images(faceID, imageID) VALUES(%s, %s)', [faceID, imageID])
        conn.commit()

async def captionImage(filePath, fileName):
    caption = await generate_captions(filePath)
    print(caption)
    db, conn = get_db()

    db.execute("UPDATE images SET caption=%s WHERE fileName=%s", (caption, fileName))
    conn.commit()
    print("Caption Generated for" + fileName)


def createSample(path, dimensions, sampleName):
    img = cv2.imread(path)
    (top, right, bottom, left) = dimensions
    crop = img[top:bottom, left:right]

    cv2.imwrite(current_app.config["SAMPLES_PATH"] + sampleName + ".png", crop)

@bp.route("/getimage/<int:id>", methods=["GET"])
@jwt_required()
def getImage(id):
    db, conn = get_db()

    db.execute("SELECT ownerID, fileName FROM images WHERE id=%s", (id, ))
    data = db.fetchone()
    
    return send_from_directory(current_app.config["UPLOADS_PATH"], data[1] + '.png')


@bp.route('/getUserImages', methods=["GET"])
@jwt_required()
def getUserImages():
    current_user = get_jwt_identity()

    db, conn = get_db()
    db.execute("SELECT id, fileName FROM images WHERE ownerID=%s", [current_user])

    result = db.fetchall()
    response = [{"id": x[1], 'src':x[0]} for x in result]

    return response

@bp.route("/getCaption/<int:id>", methods=["GET"])
@jwt_required()
def getCaption(id):
    db, conn = get_db()

    db.execute("SELECT caption, fileName FROM images WHERE id=%s", (id, ))
    data = db.fetchone()
    
    return {"caption": data[0]}

@bp.route("/updateCaption/<int:id>", methods=["POST"])
@jwt_required()
def updateCaption(id):
    db, conn = get_db()

    newCaption = request.json["caption"]
    db.execute("UPDATE images SET caption=%s WHERE id=%s", [newCaption, id])
    conn.commit()

    return "Successfuly updated caption", 200   

@bp.route("/getFaceImages/<int:id>", methods=["GET"])
@jwt_required()
def getFaceImages(id):
    db, conn = get_db()

    db.execute("SELECT imageID FROM face_images WHERE faceID=%s", [id])
    result = db.fetchall()

    return [{"id": x[0]} for x in result]

@bp.route("/getUserFaces", methods=["GET"])
@jwt_required()
def getUserFaces():
    db, conn = get_db()

    current_user = get_jwt_identity()

    db.execute("""SELECT face_description.name, user_faces.faceID FROM user_faces 
        INNER JOIN face_description ON user_faces.faceID=face_description.id 
        WHERE user_faces.userID=%s""", [current_user])
    result = db.fetchall()

    return [{"faceID": x[1], "name": x[0]} for x in result]

@bp.route("/updateFaceName/<int:id>", methods=["POST"])
@jwt_required()
def updateFaceName(id):
    db, conn = get_db()

    newName = request.json["name"]
    db.execute("UPDATE face_description SET name=%s WHERE id=%s", [newName, id])
    conn.commit()

    return "Successfuly updated name", 200

@bp.route("/getFaceThumbnail/<int:id>", methods=["GET"])
@jwt_required()
def getFaceThumbnail(id):
    db, conn = get_db()

    db.execute("SELECT fileName FROM face_description WHERE id=%s", (id, ))
    data = db.fetchone()
    
    return send_from_directory(current_app.config["SAMPLES_PATH"], data[0] + '.png')
