import mysql.connector
from mysql.connector.errors import IntegrityError


if __name__ == '__main__':
    connection = mysql.connector.connect(host="localhost",
            user="root",
            password="1234abc",
            database="users")

    cursor = connection.cursor()

    name = "hello"
    password = "1000"
    username = "test"


    try:
        cursor.execute("INSERT INTO users (name, password, username) VALUES (%s, %s, %s)", 
        (name, password, username))
        connection.commit()
    except IntegrityError:
        print("username already registered")
