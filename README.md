<div align="center">
  <img src="https://i.imgur.com/rZtYZ0t.png" alt="" width="300px"/>
  <h2>Gitlab Slack Release Notifier</h2>
  <p>🤖 A small service that sends a notification on Slack when a release has been published on Gitlab.</p>
</div>
<br/>
<hr/>

## Installation

### Install via npm

```bash
npm install -g gitlab-slack-release-notifier
SLACK_WEBHOOK=https://slack-webhook gitlab-slack-release-notifier
```

It is recommended to run this application as a background process. Here is a basic example with Pm2 : 
```js
module.exports = {
  apps: [
    {
      name: 'gitlab-slack-release-notifier',
      script: 'npx gitlab-slack-release-notifier',
      env: {
        SLACK_WEBHOOK: "https://slack-webhook",
        PORT: "8080"
      }
    },
  ],
}
```

### Install via Docker

Soon !


### Connect to your GitLab project

Once your service is launched with the correct url of your Slack webhook, the only thing left is to add a webhook on your GitLab project in Settings > Webhooks.

So create a new webook, with the url of the service and check the "Releases event" box. Once registered, you can test it directly from GitLab and if you have configured everything properly, you should receive a notification on your Slack channel. 🚀



### Configuration

Here are the environment variables you can modify:

`GITLAB_SECRET_TOKEN`: Secret token to validate received Gitlab payloads

`SLACK_WEBHOOK`: The URL of the Slack Webhook to send the message to

`WITH_FUNKY_EMOJIS`: If set to `true`, the bot will display a random emoji next to the notification header in Slack. ( default: `false` ) 

`PORT`: The port to listen on. ( default: 3000 )

`ADDRESS`: The address to listen on. ( default: `localhost` )

## License

[MIT](./LICENSE.md) License © 2022 [Julien Ripouteau](https://github.com/Julien-R44)
