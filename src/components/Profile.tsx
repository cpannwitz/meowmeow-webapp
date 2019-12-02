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
  TitleSmall,
  Label,
  AvatarWrap,
  InnerImage,
} from '../StyleComponents'
import { useSession, uploadUserImage } from '../services/firebase'

const Profile: React.FC = () => {
  const user = useSession()

  const [uploadProgress, setUploadProgress] = useState(0)
  function handleImageUpload(files: FileList | null) {
    if (files && files[0]) {
      uploadUserImage(
        files[0],
        setUploadProgress,
        () => {},
        () => {}
      )
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
      {uploadProgress > 0 && (
        <p>
          <b>{uploadProgress}</b>
        </p>
      )}

      <Section>
        <label htmlFor="profileImageUpload">
          <AvatarWrap>
            <InputFile
              id="profileImageUpload"
              type="file"
              onChange={e => handleImageUpload(e.target.files)}
            />
            <InnerImage src={user.photoURL || defaultProfileImage} />
          </AvatarWrap>
        </label>
        <TitleSmall style={{ flex: '0 1 75%' }}>{user.displayName}</TitleSmall>
      </Section>

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

export const InputFile = styled.input`
  /* [type="file"] { */
  border: 0;
  clip: rect(0, 0, 0, 0);
  height: 1px;
  overflow: hidden;
  padding: 0;
  position: absolute !important;
  white-space: nowrap;
  width: 1px;
  /* } */

  & + label {
    background-color: #000;
    border-radius: 4rem;
    color: #fff;
    cursor: pointer;
    display: inline-block;
    padding-left: 2rem 4rem;
  }

  &:focus + label,
  & + label:hover {
    background-color: #f15d22;
  }

  &:focus + label {
    outline: 1px dotted #000;
  }
`
