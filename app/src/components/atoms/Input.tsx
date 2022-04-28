import styled from 'styled-components'
import { BaseComponent, BaseComponentI } from '../../theme'

const InputStyled = styled(
  BaseComponent('input', (props) => ({
    border: '1px solid #ccc',
    borderRadius: props.borderRadius || 4,
    p: props.p || '0.5rem 1rem',
  }))
)`
  &:focus {
    outline: none;
  }
`

interface InputI {
  type?: 'text' | 'email' | 'password' | 'search'
  id: string
  name: string
  value: string
  onChange: (val: string) => void
  placeholder?: string
}
function Input({
  type = 'text',
  id,
  name,
  value,
  onChange,
  placeholder,
  ...props
}: InputI) {
  return (
    <InputStyled
      type={type}
      id={id}
      name={name}
      value={value}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        onChange(e.target.value)
      }
      placeholder={placeholder}
      {...props}
    />
  )
}

export default styled(Input)<BaseComponentI & InputI>``
