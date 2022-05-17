import { ReleaseEvent } from '../Contracts/gitlab'
import { Blocks, Message, Elements } from 'slack-block-builder'
import { funkyEmojis } from './funky-emojis'

/**
 * Builds a Slack message for Gitlab events
 */
export class BlockKitBuilder {
  /**
   * Since slack doesn't support markdown heading,
   * we need to replace them by bold strings
   */
  private replaceMarkdownHeadingByBoldness(text: string) {
    return text.replace(/#+ (.+)/g, '*$1*')
  }

  /**
   * Randomly pick a funky emoji
   */
  private pickFunkyEmoji() {
    return funkyEmojis[Math.floor(Math.random() * funkyEmojis.length)]
  }

  /**
   * Create a header for the message
   */
  private formatHeader(
    event: ReleaseEvent,
    funkyEmoji: boolean,
    headerFormatter?: (event: ReleaseEvent) => string
  ) {
    if (headerFormatter) {
      return headerFormatter(event)
    }

    const tag = event.tag.replace('v', '')
    let headerContent = `${event.project.name}@${tag} released !`

    if (funkyEmoji) {
      headerContent += ` ${this.pickFunkyEmoji()}`
    }

    headerContent += `\n${event.name}`
    return headerContent
  }

  /**
   * Build a message for the Release Event
   */
  public buildReleaseEventMessage(
    releaseEvent: ReleaseEvent,
    options?: {
      funkyEmoji?: boolean
      headerFormatter?: (event: ReleaseEvent) => string
    }
  ) {
    const { funkyEmoji, headerFormatter } = options || {}
    let headerContent = this.formatHeader(releaseEvent, funkyEmoji || false, headerFormatter)

    return Message()
      .blocks(
        Blocks.Header().text(headerContent),
        Blocks.Divider(),
        Blocks.Section().text(this.replaceMarkdownHeadingByBoldness(releaseEvent.description)),
        Blocks.Context().elements(
          `Author: ${releaseEvent.commit.author.name}`,
          `Date: ${new Date(releaseEvent.released_at).toLocaleString()}`
        ),
        Blocks.Actions().elements(
          Elements.Button().text('See release').url(releaseEvent.url),
          Elements.Button().text('See repo').url(releaseEvent.project.web_url)
        )
      )
      .buildToObject()
  }
}
