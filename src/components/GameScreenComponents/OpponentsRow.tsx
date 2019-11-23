import React from 'react'
import IconCard from './IconCard'
import { calcRotation, calcTranslation } from '../../services/utils'

import { OpponentImageWrap, OpponentArea } from '../../StyleComponents'

interface OpponentsRowProps {
  deckLength: number
}
const OpponentsRow: React.FC<OpponentsRowProps> = ({ deckLength = 0 }: OpponentsRowProps) => {
  const tempDeck = [...Array.from(Array(deckLength < 0 ? 0 : deckLength).keys())]
  return (
    <OpponentArea>
      {tempDeck.map((item, index) => (
        <OpponentImageWrap
          key={item}
          style={{
            transform: `rotate(${calcRotation(
              index,
              tempDeck.length
            )}deg) translateY(${calcTranslation(index, tempDeck.length)}px)`,
          }}
        >
          <IconCard name="cutycats" width="55px" height="90px" />
        </OpponentImageWrap>
      ))}
    </OpponentArea>
  )
}

export default OpponentsRow
