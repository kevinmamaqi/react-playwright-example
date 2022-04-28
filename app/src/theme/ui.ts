import styled from 'styled-components'
import {
  border,
  BorderProps,
  color,
  ColorProps,
  layout,
  LayoutProps,
  position,
  PositionProps,
  shadow,
  ShadowProps,
  space,
  SpaceProps,
  system,
  typography,
  TypographyProps,
} from 'styled-system'

interface BaseComponentI
  extends ColorProps,
    LayoutProps,
    SpaceProps,
    BorderProps,
    PositionProps,
    TypographyProps,
    ShadowProps {
  transition?: string
}

const BaseComponent = (
  x: keyof JSX.IntrinsicElements,
  attrs: (props: any) => Record<string, unknown>,
  styles?: string
) => styled(x).attrs<BaseComponentI>(attrs)<BaseComponentI>`
  ${space}
  ${layout}
${color}
${border}
${styles}
${typography}
${shadow}
${position}
${system({ transition: true })}
`

export type { BaseComponentI }
export default BaseComponent
