import React, { useState } from 'react'
import LoadingSpinner from './LoadingSpinner'
import { getDurationIntel } from '../services/utils'

import { ListItem, InlineButton, Smalltext, Truncated } from '../StyleComponents'
import { createGame } from '../services/api'
import { OnlineUser } from '../types/typings'

interface OnlinelistItemProps {
  onlineUser: OnlineUser
}
const OnlinelistItem = ({ onlineUser }: OnlinelistItemProps) => {
  const [pendingGameCreation, setPendingGameCreation] = useState(false)
  const [gameCreated, setGameCreated] = useState(false)
  function handleCreateGame() {
    if (onlineUser.uid) {
      setPendingGameCreation(true)
      createGame(onlineUser.uid)
        .then(() => {
          setPendingGameCreation(false)
          return setGameCreated(true)
        })
        .catch(error => {
          setPendingGameCreation(false)
          console.error(error)
        })
    }
  }

  return (
    <ListItem>
      <Truncated>
        <b>
          <img
            style={{ transform: 'rotate(90deg)' }}
            src="https://icongr.am/clarity/collapse.svg?size=12&color=ffffff"
            alt="arrow-icon"
          />
          {onlineUser.displayName}
        </b>
      </Truncated>

      <span>
        <Smalltext>Last seen: {getDurationIntel(onlineUser.lastChanged)}</Smalltext>

        {!gameCreated ? (
          <InlineButton onClick={handleCreateGame}>
            <span>Invite</span>
            {pendingGameCreation && <LoadingSpinner small />}
          </InlineButton>
        ) : (
          <InlineButton>
            <img
              src="https://icongr.am/feather/check-circle.svg?size=20&color=3dab51"
              alt="check-circle-icon"
            />
          </InlineButton>
        )}
      </span>
    </ListItem>
  )
}

export default OnlinelistItem
