import SlackWebhook from 'slack-webhook'
import { times } from 'lodash'

export default class Slack {
  constructor(webhook, logWebhook) {
    this.slack = new SlackWebhook(webhook)
    this.logSlack = new SlackWebhook(logWebhook)
  }

  post(winner, icon, reward) {
    const result = times(3, () => `:${icon}:`)

    this.slack.send({
      text: `<!here> <@${winner}> just got ${result} and won ${reward}!`,
      username: 'Slot Machine'
    })
  }

  log(message) {
    this.logSlack.send({
      text: message
    })
  }
}
