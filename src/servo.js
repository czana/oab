import { Gpio } from 'onoff'

class Servo {
  constructor(pin, delay) {
    this.servo = new Gpio(pin, 'out')
    this.delay = delay
  }

  move(delay) {
    this.servo.writeSync(Gpio.High)

    setTimeout(() => {
      this.servo.writeSync(Gpio.Low)
    }, delay)
  }
}

export default new Servo(17, 2000)
