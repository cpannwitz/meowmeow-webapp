import React from 'react'
import Icons from '../../assets/cards/cardsprite.svg'

interface IconCardProps {
  name: string
  color?: string
  width: string
  height: string
}
const IconCard: React.FC<IconCardProps> = ({
  name,
  color = '#212121',
  width,
  height,
}: IconCardProps) => (
  <svg className={`icon icon-${name}`} fill={color} width={width} height={height}>
    <use xlinkHref={`${Icons}#icon-${name}`} />
  </svg>
)

export default IconCard
