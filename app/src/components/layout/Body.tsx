import styled from 'styled-components'
import { Title } from '../atoms'
import Container from './Container'
import Footer from './Footer'
import Header from './Header'

const BodyStyled = styled.div``

interface BodyI {
  children: any
  className?: string
}

function Body({ children, className = '' }: BodyI) {
  return (
    <BodyStyled className={className}>
      <Header pb="2rem">
        <Title h={1}>Query React Repos</Title>
      </Header>
      <main id="main">
        <Container>{children}</Container>
      </main>
      <Footer py="3rem">© Kevin Mamaqi Kapllani</Footer>
    </BodyStyled>
  )
}

export default styled(Body)``
