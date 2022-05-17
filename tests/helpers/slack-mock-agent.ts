import { MockAgent } from 'undici'

const SlackMockAgent = new MockAgent()
SlackMockAgent.disableNetConnect()

const client = SlackMockAgent.get('https://slack-api.com')
let lastPayload: any = null

client
  .intercept({
    path: '/',
    method: 'POST',
    body: (body) => {
      lastPayload = body
      return true
    },
  })
  .reply(200, {})

export default {
  agent: SlackMockAgent,
  lastPayload,
}
