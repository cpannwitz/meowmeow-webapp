import React from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import { useDocumentDataOnce } from 'react-firebase-hooks/firestore'
import defaultProfileImage from '../assets/profileimage.svg'

import { AvatarWrapSmall, InnerImage, UserbadgeStyled } from '../StyleComponents'
import { useSession } from '../services/firebase'
import { routePaths } from '../Routes'
import LoadingSpinner from './LoadingSpinner'
import { userStatsDocument } from '../services/firebaseQueries'
import { UserStats } from '../types/typings'

const Rank = ({ meowpoints = 1 }: { meowpoints: number }) => {
  const count = meowpoints <= 0 ? 1 : Math.floor(meowpoints / 100)
  const tempRank = new Array(count)
  return (
    <div>
      {tempRank.map(index => (
        <img
          key={index}
          src="https://icongr.am/entypo/star.svg?size=16&color=FFC929"
          alt="star-icon"
        />
      ))}
    </div>
  )
}

const UserBadge: React.FC = React.memo(() => {
  const history = useHistory()
  const user = useSession()
  const [userStats, userStatsLoading] = useDocumentDataOnce<UserStats>(
    userStatsDocument(user ? user.uid : '')
  )

  function onClick() {
    history.push(routePaths.profile)
  }
  if (userStatsLoading) {
    return (
      <UserbadgeStyled>
        <LoadingSpinner />
      </UserbadgeStyled>
    )
  }
  return (
    <UserbadgeStyled onClick={onClick}>
      <AvatarWrapSmall>
        <InnerImage src={user && user.photoURL ? user.photoURL : defaultProfileImage} />
      </AvatarWrapSmall>

      <SubtitleSmall truncated>{user ? user.displayName : 'unknown'}</SubtitleSmall>

      <UserMP>{userStats ? userStats.meowpoints : 0} MP</UserMP>

      <UserRank meowpoints={userStats ? userStats.meowpoints : 0} />
    </UserbadgeStyled>
  )
})

export default UserBadge

/* ====================================================
   ================ STYLED COMPONENTS =================
   ==================================================== */

const UserRank = styled(Rank)`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  & > img {
    margin-right: -0.2rem;
  }
`

const UserMP = styled.div`
  font-family: 'Londrina Shadow', 'Open Sans', sans-serif;
  text-align: left;
  font-size: 1.5rem;
  line-height: 1.2;
  font-weight: bold;
  margin: 0;
  padding: 0;
  color: #fdf4e3;
  text-shadow: 0 0 5px #81aaff;
`

const SubtitleSmall = styled.h4<{ truncated: boolean }>`
  font-size: 1.2rem;
  line-height: 1.4rem;
  text-shadow: 0 0 3px ${p => p.theme.palette.blue.lightest};
  letter-spacing: -0.02rem;
  text-align: center;
  font-weight: bold;
  margin: 0.5rem;
  padding: 0;
  flex: 1 1 auto;
  color: ${p => p.theme.palette.white.main};
  font-family: ${p => p.theme.fonts.main};
  ${p =>
    p.truncated &&
    `
  flex: 0 1 45%;
  max-width: 45%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`}
`
