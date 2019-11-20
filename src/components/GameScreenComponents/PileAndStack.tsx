import React from 'react'
import IconCard from './IconCard'
import { BatchImageWrap, ImageWrapStack } from '../../StyleComponents'
import styled from 'styled-components'
import { CardObject } from '../../types/typings'

interface PileAndStackProps {
  cards: CardObject[]
}
const PileAndStack: React.FC<PileAndStackProps> = ({ cards }: PileAndStackProps) => {
  return (
    <Container>
      <ImageWrapStack>
        <IconCard name="cutycats" width="100px" height="150px" />
      </ImageWrapStack>

      <BatchImageWrap>
        <IconCard name={cards[0].name} width="100px" height="150px" />
      </BatchImageWrap>
    </Container>
  )
}

export default PileAndStack

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
