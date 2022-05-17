import { test } from '@japa/runner'
import { setGlobalDispatcher } from 'undici'
import build from '../src/app'
import { Config } from '../src/Config'
import { eventRelease } from './fixtures'
import SlackMock from './helpers/slack-mock-agent'

setGlobalDispatcher(SlackMock.agent)

test.group('Webhook', (group) => {
  group.each.setup(() => {
    // @ts-ignore
    Config.slackWebhook = null

    // @ts-ignore
    Config.gitlabSecretToken = null
  })

  test('Should decline when secret token is invalid', async ({ assert }) => {
    const app = build()

    // @ts-ignore
    Config.gitlabSecretToken = 'secret'

    const response = await app.inject({
      method: 'POST',
      url: '/',
      headers: {
        'x-gitlab-token': 'invalid',
      },
    })

    assert.deepEqual(response.statusCode, 401)
  })

  test('Should work when no secret token is provided', async ({ assert }) => {
    const app = build()

    // @ts-ignore
    Config.slackWebhook = 'https://slack-api.com'

    const response = await app.inject({
      method: 'POST',
      url: '/',
      payload: eventRelease,
      headers: {
        'x-gitlab-token': 'invalid',
      },
    })

    assert.deepEqual(response.statusCode, 200)
  })
})
