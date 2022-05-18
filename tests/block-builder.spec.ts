import { test } from '@japa/runner'
import { BlockKitBuilder } from '../src/BlockKitBuilder'
import { eventRelease } from './fixtures'

let builder: BlockKitBuilder

test.group('Block builder | Release Event', (group) => {
  group.each.setup(() => {
    builder = new BlockKitBuilder()
  })

  test('Should have the correct header', ({ assert }) => {
    const result = builder.buildReleaseEventMessage(eventRelease, {})

    assert.deepEqual(result.blocks![0], {
      type: 'header',
      text: {
        type: 'plain_text',
        text: `${eventRelease.project.name}@0.1.1 released !\n${eventRelease.name}`,
      },
    })
    assert.deepEqual(result.blocks![1].type, 'divider')
  })

  test('Should have correct header', ({ assert }) => {
    const result = builder.buildReleaseEventMessage(eventRelease, {})

    assert.deepEqual(result.blocks![4], {
      type: 'actions',
      elements: [
        {
          type: 'button',
          text: {
            type: 'plain_text',
            text: 'See release',
          },
          url: eventRelease.url,
        },
        {
          type: 'button',
          text: {
            type: 'plain_text',
            text: 'See repo',
          },
          url: eventRelease.project.web_url,
        },
      ],
    })
  })

  test('Should have context with author and date', ({ assert }) => {
    const result = builder.buildReleaseEventMessage(eventRelease, {})

    assert.deepEqual(result.blocks![3], {
      type: 'context',
      elements: [
        {
          type: 'mrkdwn',
          text: `Author: ${eventRelease.commit.author.name}`,
        },
        {
          type: 'mrkdwn',
          text: `Date: ${new Date(eventRelease.released_at).toLocaleString()}`,
        },
      ],
    })
  })

  test('Should have correct description', ({ assert }) => {
    const result = builder.buildReleaseEventMessage(eventRelease, {})

    assert.deepEqual(result.blocks![2], {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: '*Features*\n\n- First feature\n- Second feature\n\n*Refactor*\n\n- Refactor test',
      },
    })
  })

  test('With custom header content', ({ assert }) => {
    const result = builder.buildReleaseEventMessage(eventRelease, {
      headerFormatter: (event) => `My header ${event.name}`,
    })

    assert.deepEqual(result.blocks![0], {
      type: 'header',
      text: {
        type: 'plain_text',
        text: `My header ${eventRelease.name}`,
      },
    })
  })

  test('With funky emoji enabled', ({ assert }) => {
    const result = builder.buildReleaseEventMessage(eventRelease, {
      funkyEmoji: true,
    })

    const hasEmojiRegex = /\p{Emoji}/u
    // @ts-expect-error private property
    assert.isTrue(hasEmojiRegex.test(result.blocks![0].text.text))
  })
})
