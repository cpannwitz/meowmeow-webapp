import React from 'react'

import { InlineButton } from '../../StyleComponents'
import styled from 'styled-components'

interface ActionBarProps {
  handleDrawAction: () => void
  handleTakeSuspension: () => void
}
const ActionBar: React.FC<ActionBarProps> = ({
  handleDrawAction,
  handleTakeSuspension,
}: ActionBarProps) => {
  return (
    <Container>
      <InlineButton onClick={handleDrawAction}>Draw Card</InlineButton>
      <InlineButton onClick={handleTakeSuspension}>Take Suspension</InlineButton>
    </Container>
  )
}

export default ActionBar

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
