class WeatherApi {
	constructor() {
		this._url = 'http://api.openweathermap.org/data/2.5/weather'
		this._applicationId = '1963a6b41a6c18337d5160732408f58a'
		this._latitude = '43.792687'
		this._longitude = '-70.430532'
	}

	fetchData() {
		return new Promise((resolve)=>{
			$.getJSON(`${this._url}?lat=${this._latitude}&lon=${this._longitude}&appid=${this._applicationId}`, (data)=>{
				resolve({
						'humidity' : data.main.humidity.toFixed(2),
						'temperature' : Temperature.fromKelvin(data.main.temp).Farenheit.toFixed(2)
					})
			})
		})
	}
}

class EnvironmentApi {
	constructor() {
		this._url = 'temperatureData'
	}

	fetchData() {
		return new Promise((resolve)=>{
			$.getJSON("temperatureData", (data)=> {
				resolve({
						'humidity' : data.humidity.toFixed(2),
						'temperature' : new Temperature(data.temperature).Farenheit.toFixed(2)
					})
			})
		})
	}
}

class DataAggregator {
	constructor() {
		this._weatherApi = new WeatherApi()
		this._environmentApi = new EnvironmentApi()
		this._weatherData
		this._environmentData
	}

	startCollecting() {
		this._fetchData(this._weatherApi, this._environmentApi)
		setInterval(this._fetchData, 5000, this._weatherApi, this._environmentApi)
	}

	_fetchData(weatherApi, environmentApi) {
		weatherApi.fetchData().then((data)=>{
			this._weatherData = data
		})

		environmentApi.fetchData().then((data)=>{
			this._environmentData = data
		})
	}

	get HasInitialData() { return this._weatherData != null && this._environmentData != null }

	get WeatherData() { return this._weatherData }

	get EnvironmentData() { return this._environmentData }
}
