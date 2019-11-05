import raspberryOnly from '../utils/raspberryOnly'
import Slack from '../slack'

const slack = new Slack(process.env.SLACK_WEBHOOK, process.env.SLACK_LOG_WEBHOOK)

let servo = undefined
raspberryOnly(() => {
  servo = require('../servo')
})

export default (result, user) => {
  if (result.win) {
    if (result.cashPrize && servo) {
      servo.move()
    }
    //slack.post(user.mention, result.icon, result.cashPrize ? '$$$' : '2 Kudos!')
  }
}
