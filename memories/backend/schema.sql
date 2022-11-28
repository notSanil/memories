USE users;

DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS images;
DROP TABLE IF EXISTS face_description;
DROP TABLE IF EXISTS user_faces;
DROP TABLE IF EXISTS face_images;

CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    password VARCHAR(105) NOT NULL,
    username VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE images (
    id INT PRIMARY KEY AUTO_INCREMENT,
    ownerID INT NOT NULL,
    fileName VARCHAR(50) NOT NULL,
    caption VARCHAR(300) NOT NULL DEFAULT ' ',
    FOREIGN KEY (ownerID) REFERENCES users (id)
);

CREATE TABLE face_description (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL DEFAULT 'Unknown'
);

CREATE TABLE user_faces (
    userID INT NOT NULL,
    faceID INT NOT NULL
);

CREATE TABLE face_images (
    faceID INT NOT NULL,
    imageID int NOT NULL
);