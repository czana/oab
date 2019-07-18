import { Gpio } from 'onoff'

class Servo {
  constructor(pin, delay) {
    this.servo = new Gpio(pin, 'out')
    this.servo.writeSync(Gpio.HIGH)
    this.delay = delay
  }

  move() {
    this.servo.writeSync(Gpio.LOW)

    setTimeout(() => {
      this.servo.writeSync(Gpio.HIGH)
    }, this.delay)
  }
}
export default new Servo(17, 4000)
