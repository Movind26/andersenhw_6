class Car {
  #brand;
  #model;
  #yearOfManufacturing;
  #maxSpeed;
  #maxFuelVolume;
  #fuelConsumption;
  #currentFuelVolume = 0;
  #isStarted = false;
  #mileage = 0;

  set brand(value) {
    if (value && value.length <= 50) {
      this.#brand = value;
    } else {
      throw new Error('Invalid value range');
    }
  }

  get brand() {
    return this.#brand;
  }

  set model(value) {
    if (value && value.length <= 50) {
      this.#model = value;
    } else {
      throw new Error('Invalid value range');
    }
  }

  get model() {
    return this.#model;
  }

  set yearOfManufacturing(value) {
    const currentYear = new Date().getFullYear();

    if (1900 <= value <= currentYear) {
      this.#yearOfManufacturing = value;
    } else {
      throw new Error('Invalid value range');
    }
  }

  get yearOfManufacturing() {
    return this.#yearOfManufacturing;
  }

  set maxSpeed(value) {
    if (100 <= value && value < 300) {
      this.#maxSpeed = value;
    } else {
      throw new Error('Invalid value range');
    }
  }

  get maxSpeed() {
    return `${this.#maxSpeed} km/h`;
  }

  set maxFuelVolume(value) {
    if (5 <= value && value <= 20) {
      this.#maxFuelVolume = value;
    } else {
      throw new Error('Invalid value range');
    }
  }

  get maxFuelVolume() {
    return `${this.#maxFuelVolume} l`;
  }

  set fuelConsumption(value) {
    this.#fuelConsumption = (value / 100) * 100;
  }

  get fuelConsumption() {
    return `${this.#fuelConsumption} l/100km`;
  }

  get currentFuelVolume() {
    return `${this.#currentFuelVolume} l`;
  }

  get isStarted() {
    return this.#isStarted;
  }

  get mileage() {
    return `${this.#mileage} km`;
  }

  start() {
    if (this.#isStarted) {
      throw new Error('Car is already started');
    } else {
      return (this.#isStarted = true);
    }
  }

  shutDownEngine() {
    if (!this.#isStarted) {
      throw new Error('Car is not started');
    } else {
      return (this.#isStarted = false);
    }
  }

  fillUpGasTank(amount) {
    if (typeof amount !== 'number' || amount <= 0) {
      throw new Error('Invalid amount of fuel');
    } else {
      this.#currentFuelVolume += amount;

      if (this.#maxFuelVolume < this.#currentFuelVolume) {
        throw new Error('Fuel tank is full');
      }

      return this.#currentFuelVolume;
    }
  }

  drive(speed, hoursOfTime) {
    if (typeof speed !== 'number' || speed <= 0) {
      throw new Error('Invalid speed');
    } else if (typeof hoursOfTime !== 'number' || hoursOfTime <= 0) {
      throw new Error('Invalid amount of time');
    } else if (speed > this.#maxSpeed) {
      throw new Error("Car is can't drive much faster");
    } else if (this.#isStarted === false) {
      throw new Error('Car must be started');
    } else if (
      (speed * hoursOfTime) / this.#fuelConsumption >
      this.#currentFuelVolume
    ) {
      throw new Error('Insufficient fuel');
    }

    this.#currentFuelVolume -= (speed * hoursOfTime) / this.#fuelConsumption;
    this.#mileage += speed * hoursOfTime;
  }
}

const car = new Car();
console.log(car.brand);
console.log(car.model);
console.log(car.yearOfManufacturing);
console.log(car.maxSpeed);
console.log(car.maxFuelVolume);
console.log(car.fuelConsumption);
console.log(car.currentFuelVolume);
console.log(car.isStarted);
console.log(car.mileage);
car.fillUpGasTank = 50;
car.start();
car.drive(50, 1);
console.log(car.mileage);
