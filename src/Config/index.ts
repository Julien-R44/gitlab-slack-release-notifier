export class Config {
  /**
   * Token to validate received Gitlab payloads
   */
  public static readonly gitlabSecretToken = process.env.GITLAB_SECRET_TOKEN

  /**
   * The URL of the Slack Webhook to send the message to
   */
  public static readonly slackWebhook = process.env.SLACK_WEBHOOK || ''

  /**
   * Should funky emojis be used in the header
   */
  public static readonly withFunkyEmojis = process.env.WITH_FUNKY_EMOJIS === 'true'
}
