
class TemperatureToColorMapper {
	constructor() {
		this._maxTemp = 100
		this._minTemp = -20
	}

	getColor(temperature) {
		let red  = (temperature-this._minTemp)/(this._maxTemp-this._minTemp) * 255
		return {'r': red, 'g': 0, 'b': 255 - red}
	}
}

class HumidityToColorMapper {
	getColor(humidity) {
		let blue = (humidity)/(100) * 255
		return {'r': 255 - blue, 'g': 255 - blue, 'b': 255}
	}
}
