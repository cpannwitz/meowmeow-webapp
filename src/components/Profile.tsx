import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import {
  checkSubscription,
  enablePushNotifications,
  disablePushNotifications,
} from '../services/pushNotifications'
import Navbar from './Navbar'
import LoadingSpinner from './LoadingSpinner'

import defaultProfileImage from '../assets/profileimage.svg'

import {
  Fullscreen,
  Container,
  SingleButton,
  SmallButton,
  TitleSmall,
  Label,
  Inputfield,
  AvatarWrap,
  InnerImage,
} from '../StyleComponents'
import { useSession } from '../services/firebase'
import { useToggleState } from '../services/hooks'

const Profile: React.FC = () => {
  const user = useSession()

  const [isEditing, toggleIsEditing] = useToggleState(false)

  const [newUsername, setNewUsername] = useState(user ? user.displayName : '')
  function handleSetNewUsername(e: React.ChangeEvent<HTMLInputElement>) {
    setNewUsername(e.target.value)
  }
  const [newPhotoURL, setNewPhotoURL] = useState(user ? user.photoURL : '')
  function handleSetNewPhotoURL(e: React.ChangeEvent<HTMLInputElement>) {
    setNewPhotoURL(e.target.value)
  }

  function handleProfileSave() {
    if ((newUsername || newPhotoURL) && user) {
      user.updateProfile({
        displayName: newUsername,
        photoURL: newPhotoURL,
      })
    }
  }

  const [notificationsEnabled, setNotificationsEnabled] = useState(false)

  function handleSubscription() {
    if (user) {
      enablePushNotifications(user.uid)
        .then(() => setNotificationsEnabled(true))
        .catch(error => {})
    }
  }

  function handleUnsubscription() {
    if (user) {
      disablePushNotifications(user.uid)
        .then(() => setNotificationsEnabled(false))
        .catch(error => {})
    }
  }

  useEffect(() => {
    if (user) {
      checkSubscription(user.uid)
        .then(result => setNotificationsEnabled(result))
        .catch(error => {})
    }
    //eslint-disable-next-line
  }, [user])

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
      {isEditing ? (
        <SectionColumn>
          <Label>ProfilePhoto</Label>
          <Inputfield
            type="text"
            value={newPhotoURL || ''}
            onChange={handleSetNewPhotoURL}
            placeholder="https://photo.url.com/"
          />
          <Label>Username</Label>
          <Inputfield
            type="text"
            value={newUsername || ''}
            onChange={handleSetNewUsername}
            placeholder="Username"
          />

          <Container>
            <SmallButton onClick={toggleIsEditing}>Cancel</SmallButton>
            <SmallButton onClick={handleProfileSave}>
              <img src="https://icongr.am/feather/save.svg?size=20&color=ffffff" alt="save-icon" />
              Save profile
            </SmallButton>
          </Container>
        </SectionColumn>
      ) : (
        <Section>
          <AvatarWrap>
            <InnerImage src={user.photoURL || defaultProfileImage} />
          </AvatarWrap>
          <TitleSmall style={{ flex: '0 1 75%' }}>{newUsername}</TitleSmall>

          <SmallButton onClick={toggleIsEditing}>
            <img src="https://icongr.am/feather/edit.svg?size=18&color=ffffff" alt="edit-icon" />
            Edit Profile
          </SmallButton>
        </Section>
      )}

      <SectionColumn>
        <Label>PushNotifications</Label>
        {notificationsEnabled ? (
          <SingleButton onClick={handleUnsubscription}>
            <img
              src="https://icongr.am/feather/bell-off.svg?size=20&color=ffffff"
              alt="belloff-icon"
            />
            <span>Unsubscribe from Notifications</span>
          </SingleButton>
        ) : (
          <SingleButton onClick={handleSubscription}>
            <img src="https://icongr.am/feather/bell.svg?size=20&color=ffffff" alt="bell-icon" />
            <span>Subscribe to Notifications</span>
          </SingleButton>
        )}
      </SectionColumn>
    </Fullscreen>
  )
}

export default Profile

export const SectionColumn = styled.div`
  width: 96%;
  flex: 0 0 auto;
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

export const Section = styled.div`
  width: 96%;
  flex: 0 0 auto;
  overflow-y: auto;
  display: flex;
  flex-direction: row;
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
