/**
 * Shape of a Release Event sent by Gitlab
 */
export interface ReleaseEvent {
  id: number
  created_at: string
  description: string
  name: string
  released_at: string
  tag: string
  object_kind: string
  project: Project
  url: string
  action: string
  assets: Assets
  commit: Commit
}

export interface Assets {
  count: number
  links: any[]
  sources: Array<null[]>
}

export interface Commit {
  id: string
  message: string
  title: string
  timestamp: string
  url: string
  author: Author
}

export interface Author {
  name: string
  email: string
}

export interface Project {
  id: number
  name: string
  description: string
  web_url: string
  avatar_url: string
  git_ssh_url: string
  git_http_url: string
  namespace: string
  visibility_level: number
  path_with_namespace: string
  default_branch: string
  ci_config_path: null
  homepage: string
  url: string
  ssh_url: string
  http_url: string
}
