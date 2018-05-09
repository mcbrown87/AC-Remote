class Temperature {
	constructor(tempInCelcius) {
		this._tempInCelcius = tempInCelcius
	}

	get Farenheit() { return this._tempInCelcius * 1.8 + 32 }

	static fromKelvin(tempInKelvin) {
		return new Temperature(tempInKelvin - 273.15)
	}
}
