import { test } from '@japa/runner'
import build from '../src/app'
import { Config } from '../src/Config'
import { eventRelease } from './fixtures'
import nock from 'nock'

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

    const mock = nock('https://test.com')
      .post('/')
      .reply(200, (baba) => {
        console.log({ baba })
        console.log('hey !')

        return {
          hello: 'world',
        }
      })

    // @ts-ignore
    Config.slackWebhook = 'https://test.com'

    const response = await app.inject({
      method: 'POST',
      url: '/',
      payload: eventRelease,
      headers: {
        'x-gitlab-token': 'invalid',
      },
    })

    assert.deepEqual(response.statusCode, 200)
  }).pin()
})
