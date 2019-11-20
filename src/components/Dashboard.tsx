import React from 'react'
import { useRouteMatch, match, Link } from 'react-router-dom'
import styled from 'styled-components'
import Navbar from './Navbar'
import UserBadge from './UserBadge'
import DashboardRoutes from './DashboardRoutes'
import LoadingSpinner from './LoadingSpinner'

import cutycats from '../assets/cuty_cats.svg'

import {
  Fullscreen,
  FullscreenHeader,
  Container,
  CutyCats,
  CutyCatsWrap,
  Title,
} from '../StyleComponents'
import { useSession } from '../services/firebase'
import { routePaths } from '../Routes'

export const Dashboard: React.FC = () => {
  const user = useSession()
  const { path } = useRouteMatch() as match<{}>

  if (!user) {
    return (
      <Container>
        <LoadingSpinner />
      </Container>
    )
  }

  return (
    <Fullscreen>
      <Navbar />
      <FullscreenHeader>
        <Title>MeowMeow</Title>

        <CutyCatsWrap>
          <CutyCats src={cutycats} alt="cute cats" />
        </CutyCatsWrap>
      </FullscreenHeader>

      <UserBadge />

      <DashboardRoutes></DashboardRoutes>

      <StyledNavigation>
        <NavigationBtn to={`${path}`} exact>
          <img src="https://icongr.am/feather/film.svg?size=20&color=ffffff" alt="games-icon" />
          <span>Games</span>
        </NavigationBtn>
        <NavigationBtn to={`${path}${routePaths.dashboard.invites}`}>
          <img src="https://icongr.am/feather/bell.svg?size=20&color=ffffff" alt="users-icon" />
          <span>Invites</span>
        </NavigationBtn>
        <NavigationBtn to={`${path}${routePaths.dashboard.people}`}>
          <img src="https://icongr.am/feather/users.svg?size=20&color=ffffff" alt="users-icon" />
          <span>Players</span>
        </NavigationBtn>
      </StyledNavigation>
    </Fullscreen>
  )
}

export default Dashboard

interface NavigationBtnProps {
  to: string
  exact?: boolean
  children: React.ReactNode
}
const NavigationBtn: React.FC<NavigationBtnProps> = ({
  to,
  exact = false,
  children,
}: NavigationBtnProps) => {
  const match = useRouteMatch({
    path: to,
    exact: exact,
  })

  return (
    <StyledNavigationBtn to={to} active={match ? 1 : 0}>
      {children}
    </StyledNavigationBtn>
  )
}

const StyledNavigation = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 3rem;
  background-color: ${p => p.theme.palette.blue.main};
  border-top: 1px solid ${p => p.theme.palette.blue.light};
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;

  @media screen and (max-width: 550px) {
    height: 3.5rem;
  }
`

const StyledNavigationBtn = styled(Link)<{ active: number }>`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  height: 3rem;
  line-height: 3rem;
  flex: 1 1 auto;
  font-weight: bold;
  font-size: 0.9rem;
  text-align: center;
  background-color: ${p => (p.active ? p.theme.palette.blue.light : 'transparent')};
  border-top: 1px solid ${p => p.theme.palette.blue.light};
  cursor: pointer;
  text-shadow: none;
  text-decoration: none;

  & > img {
    margin-right: 0.5rem;
  }
  & > span {
    color: ${p => p.theme.palette.white.main};
    text-decoration: none;
  }

  @media screen and (max-width: 550px) {
    height: 3.5rem;
    line-height: 3rem;
  }
`
