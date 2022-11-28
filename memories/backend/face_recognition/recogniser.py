import face_recognition as fr
import cv2  
import face_recognition  
import numpy as np  
from flask import current_app
from backend.database import get_db


def recognise_faces(img_path, knownIDs):
    image = cv2.imread(img_path)
    return classify_face(image, knownIDs)

def get_known_faces(knownIDs):
    encoded = {}

    known_sample_paths = getPathFromID(knownIDs)

    for id, path in zip(knownIDs, known_sample_paths):
        fileName = current_app.config["SAMPLES_PATH"] + str(path) + '.png'

        face = fr.load_image_file(fileName)  
        encoding = fr.face_encodings(face)[0]  
        encoded[id] = encoding  
  
    return encoded 


def getPathFromID(ids):
    db, conn = get_db()

    paths = []
    for id in ids:
        db.execute("SELECT fileName from face_description WHERE id=%s", [id])
        result = db.fetchone()

        paths.append(result[0])

    return paths
    

def classify_face(img, knownIDs):  
    """ 
    will find all of the faces in a given image and label 
    them if it knows what they are 
 
    :param im: str of file path 
    :return: list of face names 
    """  
    faces = get_known_faces(knownIDs)  
    faces_encoded = list(faces.values())  
    known_face_names = list(faces.keys())  
  
    #img = cv2.imread(im, 1)  
    #img = cv2.resize(img, (0, 0), fx=0.5, fy=0.5)  
    #img = img[:,:,::-1]  
   
    face_locations = face_recognition.face_locations(img)  
    unknown_face_encodings = face_recognition.face_encodings(img, face_locations)  
  
    face_ids = []

    for i in range(len(unknown_face_encodings)):  
        # See if the face is a match for the known face(s)  
        matches = face_recognition.compare_faces(faces_encoded, unknown_face_encodings[i])  
        id = -1
  
        # use the known face with the smallest distance to the new face  
        face_distances = face_recognition.face_distance(faces_encoded, unknown_face_encodings[i])  
        if (len(face_distances) > 0):
            best_match_index = np.argmin(face_distances)  
            if matches[best_match_index]:  
                id = known_face_names[best_match_index]  
        
        if (id != -1):
            face_ids.append((id, tuple()))
        else:
            face_ids.append((id, face_locations[i]))
        #for (top, right, bottom, left), id in zip(face_locations, face_ids):  
 
    return face_ids   