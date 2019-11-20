import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import cats from '../assets/cuty_cats.svg'

import {
  Fullscreen,
  FullscreenHeader,
  Title,
  Subtitle,
  CutyCats,
  CutyCatsWrap,
  SingleButton,
  BigInputfield,
} from '../StyleComponents'
import { useSession } from '../services/firebase'
import { routePaths } from '../Routes'
import styled from 'styled-components'

const Welcome: React.FC = () => {
  const user = useSession()
  const history = useHistory()

  const [newUsername, setNewUsername] = useState(user && user.displayName ? user.displayName : '')
  function handleSetNewUsername(e: React.ChangeEvent<HTMLInputElement>) {
    setNewUsername(e.target.value)
  }

  const [newPhotoURL, setNewPhotoURL] = useState(user ? user.photoURL : '')
  function handleSetNewPhotoURL(e: React.ChangeEvent<HTMLInputElement>) {
    setNewPhotoURL(e.target.value)
  }

  async function handleSubmit() {
    if (user && newUsername.length >= 3) {
      await user.updateProfile({
        displayName: newUsername,
        photoURL: newPhotoURL,
      })
      history.push(routePaths.dashboard.home)
    }
  }

  // TODO: add subscription button

  return (
    <Fullscreen>
      <FullscreenHeader>
        <Title>MeowMeow</Title>
        <CutyCatsWrap>
          <CutyCats src={cats} alt="cuty_cats" />
        </CutyCatsWrap>
      </FullscreenHeader>

      <Section>
        <Subtitle>ProfilePhoto</Subtitle>
        <BigInputfield
          type="text"
          value={newPhotoURL || ''}
          onChange={handleSetNewPhotoURL}
          placeholder="https://photo.url.com/"
        />
        <Subtitle>Please choose a username:</Subtitle>
        <BigInputfield type="text" value={newUsername} onChange={handleSetNewUsername} />
        <SingleButton onClick={handleSubmit}>
          Proceed
          <img
            src="https://icongr.am/feather/chevron-right.svg?size=20&color=f0f0f0"
            alt="back-icon"
          />
        </SingleButton>
      </Section>
    </Fullscreen>
  )
}

export default Welcome

export const Section = styled.div`
  width: 96%;
  flex: 1 1 auto;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  margin: 1rem auto;
  padding: 0rem;
  padding-top: 2rem;
  border-radius: 4px;
  background-color: none;
  /* bgcolor: transparent? */
  border: 1px solid rgba(255, 255, 255, 0.12);
  position: relative;
`
