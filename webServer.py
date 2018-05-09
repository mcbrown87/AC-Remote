from flask import Flask
from flask import render_template
from flask import jsonify

from tornado.wsgi import WSGIContainer
from tornado.httpserver import HTTPServer
from tornado.ioloop import IOLoop

from py_irsend import irsend

from Temperature import Environment

app = Flask(__name__)

environment = Environment()

@app.route('/', methods=['GET'])
def index():
	return render_template('index.html')

@app.route('/temperatureData', methods=['GET'])
def getTemperatureData():
	environment.FetchData()
	return jsonify(temperature=environment.Temperature, humidity=environment.Humidity)

@app.route('/toggleACPower', methods=['POST'])
def toggleACPower():
	irsend.send_once('AC', ['KEY_POWER'])
    	return 'DONE'

http_server = HTTPServer(WSGIContainer(app))
http_server.listen(80)  # serving on port 5000
IOLoop.instance().start()
