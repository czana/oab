import SlackWebhook from 'slack-webhook'
import { times, join } from 'lodash'

export default class Slack {
  constructor(webhook, logWebhook) {
    this.slack = new SlackWebhook(webhook)
    this.logSlack = new SlackWebhook(logWebhook)
  }

  post(winner, icon, reward, dev) {
    const result = join(times(3, () => `:slot_${icon}:`), '')
    const payload = {
      text: `<!here> <@${winner}> just got ${result} and won ${reward}!`,
      username: 'Slot Machine'
    }
    if (dev) {
      this.logSlack.send(payload)
    } else {
      this.slack.send(payload)
    }
  }

  log(message) {
    this.logSlack.send({
      text: message
    })
  }
}
