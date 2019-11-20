import React from 'react'
import { getDurationIntel } from '../../services/utils'

import { Capitalized, Smalltext } from '../../StyleComponents'
import styled from 'styled-components'
import { GameObject } from '../../types/typings'

interface LastActionsProps {
  gameData: GameObject
}
const LastActions: React.FC<LastActionsProps> = ({ gameData }: LastActionsProps) => {
  return (
    <LastActionsLine>
      <img
        src="https://icongr.am/clarity/switch.svg?size=14&color=f0f0f0"
        alt="chevrons-right icon"
      />
      <Capitalized>
        <Smalltext>{gameData.lastActions[0].action}</Smalltext>
      </Capitalized>
      <Smalltext>{getDurationIntel(gameData.lastActions[0].timestamp)}</Smalltext>
    </LastActionsLine>
  )
}

export default LastActions

export const LastActionsLine = styled.div`
  width: 96%;
  height: 2rem;
  flex: 0 0 auto;
  overflow-y: auto;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  margin: 0.5rem auto;
  padding: 0 1rem;
  border-radius: 4px;
  background-color: transparent;
  border: 1px solid rgba(255, 255, 255, 0.12);
  position: relative;
`
