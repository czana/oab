import { Gpio } from 'onoff'

class Servo {
  constructor(pin, delay) {
    this.servo = new Gpio(pin, 'out')
    this.delay = delay
  }

  move(delay) {
    this.servo.writeSync(Gpio.HIGH)

    setTimeout(() => {
      this.servo.writeSync(Gpio.LOW)
    }, delay)
  }
}

export default new Servo(17, 2000)
