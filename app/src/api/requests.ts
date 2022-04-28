import { gql } from 'graphql-request'

const getRepositoriesDocument = gql`
  query search($query: String!, $nextPage: String) {
    search(query: $query, type: REPOSITORY, first: 10, after: $nextPage) {
      edges {
        cursor
        node {
          ... on Repository {
            id
            name
            stars: stargazerCount
            forks: forkCount
          }
        }
      }
    }
  }
`

export default getRepositoriesDocument
