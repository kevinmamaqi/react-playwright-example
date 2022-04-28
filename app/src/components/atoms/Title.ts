import styled from 'styled-components'
import { BaseComponent, colors } from '../../theme'
import type { BaseComponentI } from '../../theme'

const getFontSize = (fontSize?: number, as?: number) => {
  if (fontSize) return fontSize
  switch (as) {
    case 1:
      return 5
    case 2:
      return 4
    case 3:
      return 3
    case 4:
      return 2
    case 5:
      return 1
    case 6:
      return 0
    default:
      return 2
  }
}

type AtLeast<T, K extends keyof T> = Partial<T> & Pick<T, K>

const Title = BaseComponent('p', (props: AtLeast<any, 'h'>) => ({
  fontSize: getFontSize(props.fontSize, props.h),
  color: props.color || colors.gray[900],
  as: `h${props.h}`,
  width: props.width || '100%',
}))

interface TitleI extends BaseComponentI {
  h: 1 | 2 | 3 | 4 | 5 | 6
}

export default styled(Title)<TitleI>``
