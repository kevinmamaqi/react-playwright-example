import styled from 'styled-components'
import BaseComponent from '../../theme/ui'

const Table = styled(
  BaseComponent('table', (props) => ({
    border: 0,
    my: props.my || 30,
    bg: props.bg || 'white',
  }))
)`
  border-collapse: collapse;
  border: 1px solid black;
`

const Thead = styled(
  BaseComponent('thead', () => ({
    border: 0,
  }))
)`
  text-align: left;
`

const Tbody = styled(
  BaseComponent('tbody', () => ({
    border: 0,
  }))
)`
  padding-top: 1rem;
`

const Th = styled(
  BaseComponent('th', (props) => ({
    border: 0,
    my: props.my || 30,
    bg: props.bg || 'white',
  }))
)`
  padding: 0.25rem;
  border-bottom: 1px solid black;
`

const Tr = styled(
  BaseComponent('tr', (props) => ({
    border: 0,
    my: props.my || 30,
    bg: props.bg || 'white',
  }))
)``

const Td = styled(
  BaseComponent('td', (props) => ({
    border: 0,
    my: props.my || 30,
    bg: props.bg || 'white',
  }))
)`
  padding: 0.25rem;
`

export { Table, Thead, Tbody, Tr, Th, Td }
