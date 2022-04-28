import styled from 'styled-components'
import { BaseComponent, BaseComponentI, colors } from '../../theme'

interface TextI {
  as?: string
}

const Text = BaseComponent('p', (props) => ({
  fontSize: props?.fontSize || 2,
  color: props.color || colors.gray[700],
  as: props.as || 'p',
}))

export default styled(Text)<BaseComponentI & TextI>``
