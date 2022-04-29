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
      <Header id="header" pb="2rem" as="header">
        <Title h={1}>Query React Repos</Title>
      </Header>
      <main id="main">
        <Container>{children}</Container>
      </main>
      <Footer id="footer" py="3rem" as="footer">
        © Kevin Mamaqi Kapllani
      </Footer>
    </BodyStyled>
  )
}

export default styled(Body)``
