import request from 'graphql-request'
import { useState } from 'react'
import { useQuery } from 'react-query'
import getRepositoriesDocument from './api/requests'
import {
  Table,
  Text,
  Th,
  Tr,
  Td,
  Tbody,
  Thead,
  Input,
  Button,
} from './components/atoms'
import { Body } from './components/layout'
import { RepoEdgeI } from './types/shared.types'

interface ResI {
  search: {
    edges: RepoEdgeI[]
  }
}

function App() {
  const [inputValue, setInputValue] = useState('react')
  const [lastCursor, setLastCursor] = useState<string | undefined>(undefined)
  const [repos, setRepos] = useState<RepoEdgeI[]>([])

  const { error, isFetching, refetch } = useQuery(
    'repositories',
    async () => {
      const repositories: ResI = await request(
        import.meta.env.VITE_GITHUB_GRAPHQL,
        getRepositoriesDocument,
        {
          query: inputValue,
          nextPage: lastCursor,
        },
        {
          authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
        }
      )
      return repositories.search.edges
    },
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      onSuccess: (d) => {
        setLastCursor(d[d.length - 1].cursor)
        setRepos((r) => [...r, ...d])
      },
    }
  )

  return (
    <Body className="App">
      <Input
        type="search"
        value={inputValue}
        id="search"
        name="search"
        placeholder="Type your search"
        onChange={(val) => setInputValue(val)}
        mb="0.5rem"
      />
      <Button
        type="submit"
        loadingText="Loading..."
        text="Search"
        isFetching={isFetching}
        onClick={() => {
          setRepos([])
          refetch()
        }}
      />
      {isFetching && <Text>Loading...</Text>}
      {error && (
        <Text color="red">There was an error, please try again...</Text>
      )}
      {repos && repos.length ? (
        <>
          <Table>
            <Thead borderBottom="1px solid black">
              <Tr>
                <Th>Name</Th>
                <Th>Stars</Th>
                <Th>Forks</Th>
              </Tr>
            </Thead>
            <Tbody>
              {repos.map((repo) => (
                <Tr key={repo.cursor}>
                  <Td>{repo.node.name}</Td>
                  <Td>{repo.node.stars}</Td>
                  <Td> {repo.node.forks}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
          <Button
            type="button"
            loadingText="Loading..."
            text="Load more"
            isFetching={isFetching}
            onClick={() => refetch()}
          />
        </>
      ) : (
        <Text>Nothing to show for this query.</Text>
      )}
    </Body>
  )
}

export default App
