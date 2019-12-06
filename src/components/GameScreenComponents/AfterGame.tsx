import React, { useState } from 'react'
import { getTimeInFrames } from '../../services/utils'
import { PyroShow } from '../../styles/pyro'

import {
  Title,
  Subtitle,
  Bolded,
  SubtitleSmall,
  SingleButton,
  CattyDiv,
} from '../../StyleComponents'
import LoadingSpinner from '../LoadingSpinner'
import styled from 'styled-components'
import { createGame } from '../../services/api'
import { GameObject, UserStats } from '../../types/typings'

interface AfterGameProps {
  gameData: GameObject
  opponentId: string
  userId: string
  userStats: UserStats
}
const AfterGame: React.FC<AfterGameProps> = ({
  gameData,
  opponentId,
  userId,
  userStats,
}: AfterGameProps) => {
  const [pendingGameCreation, setPendingGameCreation] = useState(false)
  const [gameCreated, setGameCreated] = useState(false)
  function handleCreateGame() {
    setPendingGameCreation(true)
    createGame(opponentId)
      .then(() => {
        setPendingGameCreation(false)
        return setGameCreated(true)
      })
      .catch(error => {
        setPendingGameCreation(false)
        console.error(error)
      })
  }

  const gameDuration = getTimeInFrames(gameData.createdAt)

  return (
    <Fullscreen>
      {gameData.winner === userId ? (
        <Container>
          <Title>You are the winner!</Title>
          <Subtitle>+10 MeowPoints for you! </Subtitle>
          <Subtitle>Total MeowPoints: {userStats.meowpoints + 10}</Subtitle>
        </Container>
      ) : (
        <Container>
          <Title>Sorry, next time's your chance!</Title>
          <Subtitle>+2 MeowPoints for you! </Subtitle>
          <Subtitle>Total MeowPoints: {userStats.meowpoints + 2}</Subtitle>
        </Container>
      )}

      {!gameCreated ? (
        <SmallButton onClick={handleCreateGame}>
          <span>Revanche!</span>
          {pendingGameCreation && <LoadingSpinner small />}
        </SmallButton>
      ) : (
        <SmallButton>
          <span>Invite send!</span>
          <img
            src="https://icongr.am/feather/check-circle.svg?size=20&color=3dab51"
            alt="check-circle-icon"
          />
        </SmallButton>
      )}

      <Container style={{ height: '18rem' }}>
        <CattyDiv />
      </Container>

      <Container>
        <Label>Total game duration: </Label>
        <ContainerFlat>
          <SubtitleSmall>
            <Bolded>&nbsp;{gameDuration.days}</Bolded> days
          </SubtitleSmall>
          <SubtitleSmall>
            <Bolded>&nbsp;{gameDuration.hours}</Bolded> hours
          </SubtitleSmall>
          <SubtitleSmall>
            <Bolded>&nbsp;{gameDuration.minutes}</Bolded> minutes.
          </SubtitleSmall>
        </ContainerFlat>
      </Container>

      <PyroShow />
    </Fullscreen>
  )
}

export default AfterGame

export const Fullscreen = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  margin: 0 auto;
  padding: 3.5rem 0 0rem 0;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
`

export const Container = styled.div`
  width: 100%;
  max-width: 100%;
  /* height: 100%; */
  flex: 0 0 auto;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  position: relative;
`
export const ContainerFlat = styled.div`
  width: 100%;
  max-width: 100%;
  height: 100%;
  flex: 0 0 auto;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  position: relative;
`

export const Label = styled.span`
  align-self: center;
  font-size: 0.8rem;
  font-weight: bold;
  color: #fdf4e3;
  text-shadow: 0 0 3px #fdf4e3;
`

export const SmallButton = styled(SingleButton)`
  width: 48%;
  display: inline-flex;
  padding: 0.5rem 0.5rem;
  vertical-align: middle;
  z-index: 99999999999;
`
