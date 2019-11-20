import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { logout } from '../services/firebase'

const Navbar = React.memo(() => {
  return (
    <NavbarBar>
      <NavbarLink to="/dashboard">
        <img
          src="https://icongr.am/feather/align-left.svg?size=20&color=f0f0f0"
          alt="logout-icon"
        />
        <span>Dashboard</span>
      </NavbarLink>
      <NavbarLink to="/profile">
        <img src="https://icongr.am/feather/user.svg?size=20&color=f0f0f0" alt="logout-icon" />
        <span>Profile</span>
      </NavbarLink>
      <NavbarBarButton onClick={logout}>
        <img src="https://icongr.am/feather/log-out.svg?size=20&color=f0f0f0" alt="logout-icon" />
        <span>Logout</span>
      </NavbarBarButton>
    </NavbarBar>
  )
})

export default Navbar

export const NavbarBar = styled.div`
  width: 100%;
  height: 3rem;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
  background-color: ${p => p.theme.palette.blue.main};

  @media screen and (max-width: 550px) {
    height: 3.5rem;
  }
`

export const NavbarBarButton = styled.div`
  flex: 0 1 100%;

  height: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;

  color: ${p => p.theme.palette.white.main};
  font-weight: bold;
  text-decoration: none;
  transition: all 0.15s ease-in-out;
  cursor: pointer;
  text-shadow: none;

  &:active,
  &:hover {
    outline: none;
    background-color: ${p => p.theme.palette.blue.light};
  }

  & > img:not(:only-child) {
    margin-right: 0.5rem;
  }
`

export const NavbarLink = styled(NavLink)`
  flex: 0 1 100%;

  height: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;

  color: ${p => p.theme.palette.white.main};
  font-weight: bold;
  text-decoration: none;
  transition: all 0.15s ease-in-out;
  cursor: pointer;
  text-shadow: none;

  &.active,
  &:active,
  &:hover {
    outline: none;
    background-color: ${p => p.theme.palette.blue.light};
  }

  & > img:not(:only-child) {
    margin-right: 0.5rem;
  }
`
