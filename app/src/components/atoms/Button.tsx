import styled from 'styled-components'
import { BaseComponent, colors } from '../../theme'

const ButtonStyled = styled(
  BaseComponent('button', (props) => ({
    border: 0,
    bg: props.bg || colors.cyan[700],
    color: props.color || 'white',
  }))
)`
  border-radius: 6px;
  padding: 0.5rem 1rem;
  transition: background-color 0.2s ease;
  &:hover {
    cursor: pointer;
    background-color: ${colors.cyan[900]};
  }
`

interface ButtonI {
  type?: 'submit' | 'button' | 'reset'
  isFetching: boolean
  text: string
  loadingText?: string
  onClick?: () => void
}

function Button({
  type = 'submit',
  text,
  loadingText,
  isFetching,
  onClick,
}: ButtonI) {
  const handleClick = () => {
    if (onClick && !isFetching) onClick()
  }
  return (
    <ButtonStyled type={type} onClick={handleClick}>
      {isFetching ? loadingText : text}
    </ButtonStyled>
  )
}

export default styled(Button)``
