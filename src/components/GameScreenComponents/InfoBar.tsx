import React from 'react'
import { Subtitle, Capitalized } from '../../StyleComponents'
import styled from 'styled-components'
import { GameObject } from '../../types/typings'
interface InfoBarProps {
  gameData: GameObject
}
const InfoBar: React.FC<InfoBarProps> = ({ gameData }: InfoBarProps) => {
  return (
    <Container>
      {gameData.preCondition.newColor && (
        <Subtitle>
          Wished color: <Capitalized>{gameData.preCondition.newColor}</Capitalized>
        </Subtitle>
      )}
      {gameData.preCondition.toDraw !== 0 && (
        <Subtitle>
          Draw {gameData.preCondition.toDraw} card{gameData.preCondition.toDraw !== 1 ? 's' : ''},
          or play 7.{' '}
        </Subtitle>
      )}
      {gameData.preCondition.suspended && <Subtitle>Take suspension, or play ace.</Subtitle>}
    </Container>
  )
}

export default InfoBar

export const Container = styled.div`
  width: 100%;
  max-width: 100%;
  height: auto;
  flex: 0 0 auto;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  position: relative;
`
