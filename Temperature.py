import Adafruit_DHT as dht

class Environment:
	def FetchData(self):
		self._humidity, self._temperature = dht.read_retry(dht.DHT22, 4)

	@property
	def Temperature(self):
		return self._temperature

	@property
	def Humidity(self):
		return self._humidity
