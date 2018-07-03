import SlackWebhook from 'slack-webhook'
import { times } from 'lodash'

export default class Slack {
  constructor(webhook) {
    this.slack = new SlackWebhook(webhook)
  }

  post(winner, icon, reward) {
    const result = times(3, () => `:${icon}:`)

    this.slack.send({
      text: `<!here> <@${winner}> just got ${result} and won ${reward}!`,
      username: 'Slot Machine'
    })
  }
}
