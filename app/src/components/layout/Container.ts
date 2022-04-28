import styled from 'styled-components'
import { BaseComponent } from '../../theme'

const Container = styled(
  BaseComponent('div', (props) => ({
    m: props.m || '0 auto',
  }))
)`
  display: flex;
  flex-direction: column;
  max-width: 80%;
`

export default Container
