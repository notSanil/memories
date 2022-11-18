USE users;

DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS images;

CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    password VARCHAR(105) NOT NULL,
    username VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE images (
    id INT PRIMARY KEY AUTO_INCREMENT,
    ownerID INT NOT NULL,
    fileName VARCHAR(50) NOT NULL,
    FOREIGN KEY (ownerID) REFERENCES users (id)
);