import type { ReleaseEvent } from '../../src/Contracts/gitlab'

export const eventRelease = {
  description:
    '# Features\n' +
    '\n' +
    '- First feature\n' +
    '- Second feature\n' +
    '\n' +
    '# Refactor\n' +
    '\n' +
    '- Refactor test',
  name: 'Release name',
  released_at: '2022-05-16T17:25:39.948Z',
  tag: 'v0.1.1',
  object_kind: 'release',
  project: {
    name: 'my-package-name',
    description: 'Package description',
    web_url: 'https://gitlab.com/myPackageUrl',
  },
  url: 'https://gitlab.com/myPackage',
  commit: {
    id: '24e66a63f7114c89b26b29f2a04a75f939f2d587',
    message: 'chore(release): 0.1.1\n',
    title: 'chore(release): 0.1.1',
    timestamp: '2022-05-16T19:23:46+02:00',
    author: { name: 'Julien', email: 'julien@ripouteau.com' },
  },
} as ReleaseEvent
