import React from 'react'
import styled from 'styled-components'
import Modal from 'react-modal'
import { Subtitle, ModalCloseBtn, JackWishColor } from '../../StyleComponents'

// CUSTOM CSS
import IconSpade from '../../assets/icon_spade.svg'
import IconClub from '../../assets/icon_club.svg'
import IconHeart from '../../assets/icon_heart.svg'
import IconDiamond from '../../assets/icon_diamond.svg'

interface JackWishModalProps {
  isOpen: boolean
  onClose: (color?: string) => void
}

const JackWishModal: React.FC<JackWishModalProps> = ({ isOpen, onClose }: JackWishModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => onClose()}
      contentLabel="Jacks-Wish-A-Color"
      className={{
        base: 'modal-popup',
        afterOpen: 'modal-popup_after-open',
        beforeClose: 'modal-popup_before-close',
      }}
      overlayClassName={{
        base: 'modal-popup-overlay',
        afterOpen: 'modal-popup-overlay_after-open',
        beforeClose: 'modal-popup-overlay_before-close',
      }}
    >
      <ModalCloseBtn onClick={() => onClose()} />
      <Subtitle>Which color do you choose?</Subtitle>
      <Container>
        <JackWishColor src={IconSpade} alt="icon-spade" onClick={() => onClose('spade')} />
        <JackWishColor src={IconHeart} alt="icon-heart" onClick={() => onClose('heart')} />
        <JackWishColor src={IconClub} alt="icon-club" onClick={() => onClose('club')} />
        <JackWishColor src={IconDiamond} alt="icon-diamond" onClick={() => onClose('diamond')} />
      </Container>
    </Modal>
  )
}

export default JackWishModal

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
