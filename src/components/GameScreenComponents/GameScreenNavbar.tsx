import React from 'react'
// import defaultProfileImage from '../../assets/profileimage.svg'

import {
  NavbarBar,
  NavbarButtonSmall,
  //  AvatarWrapSmall,
  // InnerImage
} from '../../StyleComponents'
import styled from 'styled-components'
import { GameObject } from '../../types/typings'
import { useSession } from '../../services/firebase'

interface GameScreenNavbarProps {
  gameData: GameObject
  isUserHost: boolean
  handleReturn: () => void
  handleFeatureClick: () => void
}
const GameScreenNavbar: React.FC<GameScreenNavbarProps> = ({
  gameData,
  isUserHost,
  handleReturn,
  handleFeatureClick,
}: GameScreenNavbarProps) => {
  const user = useSession() as firebase.User
  return (
    <NavbarBar>
      <NavbarButtonSmall className="navbtn" onClick={handleReturn}>
        <img src="https://icongr.am/clarity/home.svg?size=24&color=ffffff" alt="back-icon" />
      </NavbarButtonSmall>

      {user.uid === gameData.whichTurn ? (
        <MatchStatus positive>
          <Truncated>It's your turn!</Truncated>
          {/* <AvatarWrapSmall>
            <InnerImage src={user.photoURL || defaultProfileImage} />
          </AvatarWrapSmall> */}
        </MatchStatus>
      ) : (
        <MatchStatus positive={false}>
          <Truncated>It's {isUserHost ? gameData.guestName : gameData.hostName} turn!</Truncated>
        </MatchStatus>
      )}

      <NavbarButtonSmall onClick={handleFeatureClick}>
        <img src="https://icongr.am/clarity/happy-face.svg?size=24&color=ffffff" alt="happy-icon" />
      </NavbarButtonSmall>
    </NavbarBar>
  )
}

export default GameScreenNavbar

export const MatchStatus = styled.div<{ positive: boolean }>`
  flex: 0 1 100%;
  max-width: 70%;

  height: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;

  color: ${p => p.theme.palette.white.main};
  font-weight: bold;
  text-decoration: none;
  background-color: ${p => (p.positive ? p.theme.palette.success : p.theme.palette.error)};
  & > *:first-child {
    margin-right: 0.5rem;
  }
`

export const Truncated = styled.span`
  max-width: 45%;
  flex: 0 0 45%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
`
