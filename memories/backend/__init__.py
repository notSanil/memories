import os

from flask import Flask
from flask_cors import CORS
from datetime import timedelta


cors = CORS(supports_credentials=True)
def create_app(test_config=None):
    app = Flask(__name__, instance_relative_config=True)

    app.config.from_mapping(
        SECRET_KEY='dev',
        UPLOADS_PATH=app.instance_path + "/uploads/"
    )

    app.config["SESSION_COOKIE_SAMESITE"] = "None"
    app.config["SESSION_COOKIE_SECURE"] = True
    app.config["JWT_SECRET_KEY"] = 'change_me_later'
    app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=3)


    if test_config is None:
        app.config.from_pyfile('config.py')
    else:
        app.config.from_mapping(test_config)

    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    try:
        os.makedirs(app.instance_path + "/uploads")
    except OSError:
        pass

    from . import database
    database.init_app(app)

    cors.init_app(app)

    from . import auth
    app.register_blueprint(auth.bp)
    auth.init_app(app)

    from . import images
    app.register_blueprint(images.bp)

    return app