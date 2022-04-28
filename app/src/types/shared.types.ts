interface RepoNodeI {
  id: string
  name: string
  stars: number
  forks: number
}

interface RepoEdgeI {
  cursor: string
  node: RepoNodeI
}

export type { RepoNodeI, RepoEdgeI }
