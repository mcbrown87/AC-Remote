from flask import Flask
from flask import render_template
from flask import jsonify

from tornado.wsgi import WSGIContainer
from tornado.httpserver import HTTPServer
from tornado.ioloop import IOLoop

from py_irsend import irsend

app = Flask(__name__)

@app.route('/', methods=['GET'])
def index():
	return render_template('index.html')

@app.route('/toggleACPower', methods=['POST'])
def toggleACPower():
	irsend.send_once('samsungTv.conf', ['KEY_VOLUMEDOWN'])
    	return 'DONE'

http_server = HTTPServer(WSGIContainer(app))
http_server.listen(80)  # serving on port 5000
IOLoop.instance().start()
