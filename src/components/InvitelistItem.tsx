import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import LoadingSpinner from './LoadingSpinner'
import { getDurationIntel } from '../services/utils'

import { ListItem, InlineButton, Truncated, Smalltext } from '../StyleComponents'
import { useSession } from '../services/firebase'
import { startGame, rejectGame } from '../services/api'
import { GameObject } from '../types/typings'

interface InvitelistItemProps {
  gameData: GameObject
}
const InvitelistItem: React.FC<InvitelistItemProps> = ({ gameData }: InvitelistItemProps) => {
  const history = useHistory()
  const user = useSession()

  function enterMatch() {
    history.push('/match/' + gameData.gameId)
  }

  const [pendingStartGame, setPendingStartGame] = useState(false)
  function handleStartGame() {
    if (user) {
      setPendingStartGame(true)
      startGame(gameData.gameId)
        .then(() => {
          setPendingStartGame(false)
          return enterMatch()
        })
        .catch(error => {
          setPendingStartGame(false)
          console.error(error)
        })
    }
  }

  const [pendingRejectGame, setPendingRejectGame] = useState(false)
  function handleRejectGame() {
    if (user) {
      setPendingRejectGame(true)
      rejectGame(gameData.gameId)
        .then(() => {
          return setPendingRejectGame(false)
        })
        .catch(error => {
          setPendingRejectGame(false)
          console.error(error)
        })
    }
  }

  return (
    <ListItem>
      <Truncated>
        <b>{gameData.hostName}</b>
      </Truncated>
      <span>
        <Smalltext>{getDurationIntel(gameData.createdAt)}</Smalltext>
        {pendingRejectGame ? (
          <InlineButton>
            <LoadingSpinner small />
          </InlineButton>
        ) : (
          <InlineButton onClick={handleRejectGame}>Reject</InlineButton>
        )}
        {pendingStartGame ? (
          <InlineButton>
            <LoadingSpinner small />
          </InlineButton>
        ) : (
          <InlineButton onClick={handleStartGame}>Start</InlineButton>
        )}
      </span>
    </ListItem>
  )
}

export default InvitelistItem
