import { FastifyReply, FastifyRequest, FastifyServerOptions } from 'fastify'
import { BlockKitBuilder } from './BlockKitBuilder'
import { Config } from './Config'
import Fastify from 'fastify'
import { fetch } from 'undici'

/**
 * Main webhook handler
 */
async function webhookHandler(request: FastifyRequest, reply: FastifyReply) {
  /**
   * Validate the request
   */
  console.log('hey !')
  const hasGitlabSecret = !!Config.gitlabSecretToken
  if (hasGitlabSecret && request.headers['x-gitlab-token'] !== Config.gitlabSecretToken) {
    console.log('invalid !')
    reply.code(401).send()
    return
  }

  /**
   * Build the BlockKit Slack message
   */
  const builder = new BlockKitBuilder()
  const result = builder.buildReleaseEventMessage(request.body as any, {
    funkyEmoji: Config.withFunkyEmojis,
  })

  console.log('builded', Config.slackWebhook)

  /**
   * Send the message to the Slack webhook
   */
  await fetch(Config.slackWebhook, {
    body: JSON.stringify(result),
    method: 'POST',
  }).catch((err) => {
    console.log({ err })
  })

  reply.status(200).send()
}

export default function build(opts: FastifyServerOptions = {}) {
  return Fastify(opts).post('/', webhookHandler)
}
