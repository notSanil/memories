import os

from flask import Flask, render_template, request, jsonify 
from flask_cors import CORS


cors = CORS()
def create_app(test_config=None):
    app = Flask(__name__, instance_relative_config=True)

    app.config.from_mapping(
        SECRET_KEY='dev',
    )

    if test_config is None:
        app.config.from_pyfile('config.py')
    else:
        app.config.from_mapping(test_config)

    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    @app.route('/hello')
    def hello():
        return "Hello World"


    @app.route('/test', methods=["POST"], strict_slashes=False)
    def receiveData():
        print(request.json)
        return {"value":"LoL"}

    from . import database
    database.init_app(app)

    cors.init_app(app)

    return app