import { Gpio } from 'onoff'

class Servo {
  constructor(pin, delay) {
    this.servo = new Gpio(pin, 'out')
    this.servo.writeSync(Gpio.LOW)
    this.delay = delay
  }

  move() {
    this.servo.writeSync(Gpio.HIGH)

    setTimeout(() => {
      this.servo.writeSync(Gpio.LOW)
    }, this.delay)
  }
}

export default new Servo(17, 2000)
