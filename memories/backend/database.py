from flask import current_app, g
import mysql.connector
import click


def _get_db():
    if 'conn' not in g:
        g.conn = mysql.connector.connect(
            host=current_app.config['DATABASE_HOST'],
            user=current_app.config['DATABASE_USER'],
            password=current_app.config['DATABASE_PASSWORD']
        )

    if 'db' not in g:
        g.db = g.conn.cursor()
    return g.db


def get_db():
    if 'conn' not in g:
        g.conn = mysql.connector.connect(
            host=current_app.config['DATABASE_HOST'],
            user=current_app.config['DATABASE_USER'],
            password=current_app.config['DATABASE_PASSWORD'],
            database=current_app.config["DATABASE_NAME"]
        )

    if 'db' not in g:
        g.db = g.conn.cursor()
    return g.db, g.conn

def close_db(e=None):
    db = g.get('db', None)

    if db is not None:
        db.close()


def init_db():
    db = _get_db()

    db.execute("DROP DATABASE {}".format(current_app.config["DATABASE_NAME"]))
    db.execute("CREATE DATABASE {} DEFAULT CHARACTER SET 'utf8'".format(current_app.config["DATABASE_NAME"]))

    with current_app.open_resource('schema.sql') as f:
        db.execute(f.read().decode('utf8'))

@click.command('init-db')
def init_db_command():
    """Clear the existing data and create new tables."""
    init_db()
    click.echo('Initialized the database.')

def init_app(app):
    app.teardown_appcontext(close_db)
    app.cli.add_command(init_db_command)