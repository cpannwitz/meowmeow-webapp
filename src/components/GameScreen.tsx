import React, { useState } from 'react'
import styled from 'styled-components'
import { useParams, useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useDocumentDataOnce, useDocumentData } from 'react-firebase-hooks/firestore'

import LoadingSpinner from './LoadingSpinner'

// GAME COMPONENTS
import GameScreenNavbar from './GameScreenComponents/GameScreenNavbar'
import OpponentsRow from './GameScreenComponents/OpponentsRow'
import DeckRow from './GameScreenComponents/DeckRow'
import AfterGame from './GameScreenComponents/AfterGame'
import LastActions from './GameScreenComponents/LastActions'
import PileAndStack from './GameScreenComponents/PileAndStack'
import ActionBar from './GameScreenComponents/ActionBar'
import InfoBar from './GameScreenComponents/InfoBar'
import JackWishModal from './GameScreenComponents/JackWishModal'

import { XXX } from '../StyleComponents'
import { routePaths } from '../Routes'
import { useSession } from '../services/firebase'
import { matchActionTakeSuspension, matchActionDraw, matchActionPut } from '../services/api'
import {
  userStatsDocument,
  gameObjectDocument,
  deckDataDocument,
  pileDataDocument,
} from '../services/firebaseQueries'
import { GameObject, CardObject, UserStats } from '../types/typings'

const GameScreen = () => {
  const user = useSession()

  const { matchId } = useParams()
  const history = useHistory()

  // ! fetch & subscribe gameData
  const [gameData, gameDataLoading] = useDocumentData<GameObject>(gameObjectDocument(matchId || ''))

  const isUserHost = gameData && user && gameData.guest.id === user.uid ? false : true

  // ! userStats
  const [userStats, userStatsLoading] = useDocumentDataOnce<UserStats>(
    userStatsDocument(user?.uid ?? '')
  )

  // ! fetch & subscribe deckData
  const [deckData, deckDataLoading] = useDocumentData<{ deck: CardObject[] }>(
    deckDataDocument(matchId || '', user?.uid ?? '')
  )

  // ! fetch & subscribe pileData
  const [pileData, pileDataLoading] = useDocumentData<{ pile: CardObject[] }>(
    pileDataDocument(matchId || '')
  )

  // ! combined loading state
  const dataLoading =
    !gameDataLoading && !userStatsLoading && !deckDataLoading && !pileDataLoading ? false : true

  // ------------------------------------------------------------
  // NOTIFICATIONS ----------------------------------------------
  // ------------------------------------------------------------

  function _addNotifNotYourTurn() {
    toast('This is not your turn!!', {
      type: toast.TYPE.ERROR,
    })
  }
  function _addNotifWrongCard() {
    toast('This action is not allowed!', {
      type: toast.TYPE.WARNING,
    })
  }
  function _addNotifInfo() {
    toast('Reactions-Feature coming soon!', {
      type: toast.TYPE.INFO,
    })
  }

  // ------------------------------------------------------------
  // HANDLE MODAL -----------------------------------------------
  // ------------------------------------------------------------

  function handleReturn() {
    history.push(routePaths.dashboard.home)
  }

  interface OpenModalState {
    jackWishOpen: boolean
    tempCard?: CardObject | null
  }
  const [openModalState, setOpenModalState] = useState<OpenModalState>({
    jackWishOpen: false,
    tempCard: null,
  })
  function openModal(card: CardObject) {
    setOpenModalState({
      jackWishOpen: true,
      tempCard: card,
    })
  }

  async function closeModal(jackWishColor?: string) {
    if (openModalState.tempCard && jackWishColor) {
      await handleCardAction(openModalState.tempCard, jackWishColor)
      setOpenModalState({
        jackWishOpen: false,
        tempCard: null,
      })
    } else {
      setOpenModalState(state => ({
        ...state,
        jackWishOpen: false,
      }))
    }
  }

  // ------------------------------------------------------------
  // HANDLE CARD ACTION -----------------------------------------
  // ------------------------------------------------------------

  const [pendingAction, setPendingAction] = useState(false)

  async function handleCardAction(card: CardObject, jackWish?: string) {
    if (gameData?.whichTurn === user?.uid && pendingAction === false) {
      const preCondition = gameData?.preCondition
      if (
        (preCondition?.enabled && preCondition.suspended && card.value !== 'ace') ||
        (preCondition?.enabled && preCondition.toDraw !== 0 && card.value !== '7') ||
        (preCondition?.enabled && preCondition.newColor !== '' && card.value === 'jack')
      ) {
        _addNotifWrongCard()
      } else {
        setPendingAction(true)
        const cardAction = await matchActionPut(gameData?.gameId ?? '', card, jackWish)
        if (!cardAction) {
          _addNotifWrongCard()
        }
        setPendingAction(false)
      }
    } else {
      _addNotifNotYourTurn()
      setPendingAction(false)
      // handle further DONT PLAY actions
    }
  }

  // ------------------------------------------------------------
  // HANDLE DRAW ACTION -----------------------------------------
  // ------------------------------------------------------------

  async function handleDrawAction() {
    if (gameData?.whichTurn === user?.uid && !gameData?.preCondition.suspended && !pendingAction) {
      setPendingAction(true)
      await matchActionDraw(gameData?.gameId ?? '')
      setPendingAction(false)
    } else {
      _addNotifNotYourTurn()
      setPendingAction(false)
      // handle further DONT PLAY actions
    }
  }

  // ------------------------------------------------------------
  // HANDLE SUSPENSION ------------------------------------------
  // ------------------------------------------------------------

  async function handleTakeSuspension() {
    if (
      gameData?.whichTurn === user?.uid &&
      gameData?.preCondition.enabled === true &&
      gameData?.preCondition.suspended === true &&
      !pendingAction
    ) {
      setPendingAction(true)
      await matchActionTakeSuspension(gameData.gameId)
      setPendingAction(false)
    } else {
      _addNotifNotYourTurn()
      setPendingAction(false)
      // handle further DONT PLAY actions
    }
  }

  // ------------------------------------------------------------
  // RENDER RENDER RENDER ---------------------------------------
  // ------------------------------------------------------------

  return (
    <XXX>
      {openModalState.jackWishOpen && (
        <JackWishModal isOpen={openModalState.jackWishOpen} onClose={closeModal}></JackWishModal>
      )}
      {gameData && userStats && deckData && pileData && !dataLoading ? (
        <Fullscreen>
          <GameScreenNavbar
            gameData={gameData}
            isUserHost={isUserHost}
            handleReturn={handleReturn}
            handleFeatureClick={_addNotifInfo}
          />
          {!gameData.finished ? (
            <Container>
              <LastActions lastAction={gameData.lastActions[0]} />
              <OpponentsRow
                deckLength={isUserHost ? gameData.guestdeckLength : gameData.hostdeckLength}
              />
              <PileAndStack cards={pileData.pile} />
              <InfoBar gameData={gameData} />
              <ActionBar
                handleDrawAction={handleDrawAction}
                handleTakeSuspension={handleTakeSuspension}
              />
              <DeckRow
                myTurn={gameData.whichTurn === user?.uid}
                pendingAction={pendingAction}
                cards={deckData.deck}
                openModal={openModal}
                handleCardAction={handleCardAction}
              />
            </Container>
          ) : (
            <AfterGame
              gameData={gameData}
              opponentId={isUserHost ? gameData.guest.id : gameData.host.id}
              userId={user?.uid ?? ''}
              userStats={userStats}
            />
          )}
        </Fullscreen>
      ) : (
        <Container>
          <LoadingSpinner />
        </Container>
      )}
    </XXX>
  )
}

export default GameScreen

const Fullscreen = styled.div`
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

const Container = styled.div`
  width: 100%;
  max-width: 100%;
  height: 100%;
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  position: relative;
`
