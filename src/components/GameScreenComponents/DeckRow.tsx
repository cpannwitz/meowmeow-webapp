import React, { useState } from 'react'
import styled from 'styled-components'

import IconCard from './IconCard'
import LoadingSpinner from '../LoadingSpinner'
import { Container, Overlay } from '../../StyleComponents'
import { CardObject } from '../../types/typings'

interface DeckrowProps {
  myTurn: boolean
  pendingAction: boolean
  cards: CardObject[]
  openModal: (card: CardObject) => void
  handleCardAction: (card: CardObject) => void
}
const Deckrow: React.FC<DeckrowProps> = ({
  myTurn,
  pendingAction,
  cards,
  openModal,
  handleCardAction,
}: DeckrowProps) => {
  const [cardChosen, setCardChosen] = useState<number | null>(null)

  function handleCardPrechoice(card: CardObject, index: number) {
    if (cardChosen === index) {
      if (card.value === 'jack') {
        openModal(card)
        setCardChosen(null)
      } else {
        handleCardAction(card)
        setCardChosen(null)
      }
    } else if (cardChosen !== null) {
      setCardChosen(null)
    } else {
      setCardChosen(index)
    }
  }

  return (
    <DeckArea noScroll={pendingAction}>
      {cards.map((card, index) => (
        <DeckImageWrap
          // column ???
          key={index}
          notChosen={!myTurn || cardChosen !== index}
          chosen={cardChosen === index}
          onClick={() => handleCardPrechoice(card, index)}
        >
          <IconCard name={card.name} width="100px" height="150px" />
        </DeckImageWrap>
      ))}
      {/* BUG: OVerlay doesnt maximize to scroll area */}
      {pendingAction && (
        <Overlay>
          <Container>
            <LoadingSpinner />
          </Container>
        </Overlay>
      )}
    </DeckArea>
  )
}

export default Deckrow

export const DeckImageWrap = styled.div<{ chosen: boolean; notChosen: boolean }>`
  width: 20vw;
  max-width: 6rem;
  height: 30vw;
  max-height: 9rem;

  transform: ${p => (p.chosen ? 'scale(1.03) translateY(-0.5rem)' : '')};
  filter: ${p => (p.notChosen ? 'opacity(0.5)' : '')};

  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  position: relative;
  transform-origin: bottom;
  transition: all 0.15s ease-in-out;
  margin: 1rem 0.5rem 0 0.5rem;
  box-shadow: 0 0 3px ${p => p.theme.palette.blue.dark};
`

const Section = styled.div`
  width: 96%;
  flex: 1 1 auto;
  overflow-y: auto;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  margin: 1rem auto;
  padding: 0;
  border-radius: 4px;
  background-color: transparent;
  border: 1px solid rgba(255, 255, 255, 0.12);
  position: relative;
`

const DeckArea = styled(Section)<{ noScroll: boolean }>`
  max-height: 32vh;
  overflow-y: ${p => (p.noScroll ? 'hidden' : 'auto')};
  justify-content: center;
`
