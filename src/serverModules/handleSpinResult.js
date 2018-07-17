import raspberryOnly from '../utils/raspberryOnly'

let servo

raspberryOnly(() => {
  servo = require('../servo')
})

export default (result, user) => {
  if (result.win) {
    raspberryOnly(() => {
      if (result.cashPrize) { servo.move() }
    })
    slack.post(user.mention, result.icon, result.cashPrize ? '$$$' : '2 Kudos!')
  }
}
