import React from 'react'
import styled from 'styled-components'
import { ListItem, Truncated, ListItemIndex } from '../StyleComponents'
import { UserStats } from '../types/typings'

interface RanklistItemProps {
  rankedUser: UserStats
  index: number
}
const RankListItem: React.FC<RanklistItemProps> = ({ rankedUser, index }: RanklistItemProps) => {
  return (
    <ListItem>
      <Truncated>
        <b>
          <ListItemIndex>{index + 1}. |</ListItemIndex>
          {rankedUser.displayName}
        </b>
      </Truncated>
      <Subtitle>{rankedUser.meowpoints}</Subtitle>
    </ListItem>
  )
}

export default RankListItem

export const Subtitle = styled.h3`
  font-size: 1.4rem;
  line-height: 1.4rem;
  text-shadow: 0 0 3px ${p => p.theme.palette.blue.lightest};
  letter-spacing: -0.05rem;
  text-align: center;
  font-weight: bold;
  margin: 1rem;
  padding: 0;
  flex: 1 1 auto;
  color: ${p => p.theme.palette.white.main};
  font-family: ${p => p.theme.fonts.alt};
`
