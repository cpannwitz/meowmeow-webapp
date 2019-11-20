import React from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import LoadingSpinner from './LoadingSpinner'
import { getDurationIntel } from '../services/utils'

import { InlineButton, Truncated, Smalltext } from '../StyleComponents'
import { useSession } from '../services/firebase'
import { GameObject } from '../types/typings'

interface MatchlistItemProps {
  gameData: GameObject
}
const MatchlistItem: React.FC<MatchlistItemProps> = ({ gameData }: MatchlistItemProps) => {
  const history = useHistory()
  const user = useSession()

  function enterMatch() {
    history.push('/match/' + gameData.gameId)
  }

  if (user) {
    return (
      <ListItem
        notFinished={gameData.winner ? false : true}
        news={user.uid === gameData.whichTurn ? true : false}
      >
        {gameData.winner && (
          <span>
            {gameData.winner === user.uid ? (
              <img
                style={{ verticalAlign: 'sub' }}
                src="https://icongr.am/clarity/happy-face.svg?size=20&color=10ed00"
                alt="win-icon"
              />
            ) : (
              <img
                style={{ verticalAlign: 'sub' }}
                src="https://icongr.am/clarity/sad-face.svg?size=20&color=ff2200"
                alt="loss-icon"
              />
            )}
          </span>
        )}

        <Truncated>
          <b>
            {!gameData.winner && (
              <img
                style={{ transform: 'rotate(90deg)' }}
                src="https://icongr.am/clarity/collapse.svg?size=12&color=ffffff"
                alt="arrow-icon"
              />
            )}
            {user.uid === gameData.guest.id ? gameData.guestName : gameData.hostName}
          </b>
        </Truncated>

        <Smalltext>{getDurationIntel(gameData.lastActions[0].timestamp)}</Smalltext>

        <InlineButton onClick={enterMatch}>
          <img
            src="https://icongr.am/feather/chevron-right.svg?size=20&color=f0f0f0"
            alt="chevron-right-icon"
          />
        </InlineButton>
      </ListItem>
    )
  }

  return <LoadingSpinner small />
}

export default MatchlistItem

export const ListItem = styled.li<{ notFinished: boolean; news: boolean }>`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  padding: 0 0 0 0.75rem;
  &:not(:last-child) {
    margin-bottom: 0.5rem;
  }
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  background-color: ${p =>
    !p.notFinished && p.news ? p.theme.palette.error : 'rgba(255, 255 ,255, 0.1)'};
`
