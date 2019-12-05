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
  AvatarWrap,
  InnerImage,
} from '../StyleComponents'
import { useSession } from '../services/firebase'
import { uploadProfileImage } from '../services/uploadProfileImage'
import { routePaths } from '../Routes'
import defaultProfileImage from '../assets/profileimage.svg'
import styled from 'styled-components'

const Welcome: React.FC = () => {
  const user = useSession()
  const history = useHistory()

  const [newUsername, setNewUsername] = useState(user && user.displayName ? user.displayName : '')
  function handleSetNewUsername(e: React.ChangeEvent<HTMLInputElement>) {
    setNewUsername(e.target.value)
  }

  const [uploadProgress, setUploadProgress] = useState(0)
  function handleImageUpload(files: FileList | null) {
    if (files && files[0]) {
      uploadProfileImage(
        files[0],
        setUploadProgress,
        () => {},
        () => {}
      )
    }
  }

  async function handleSubmit() {
    if (user && newUsername.length >= 3) {
      await user.updateProfile({
        displayName: newUsername,
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
        <Subtitle>ProfilePhoto {uploadProgress > 0 ? uploadProgress + '%' : ''}</Subtitle>
        <label htmlFor="profileImageUpload">
          <AvatarWrap>
            <InputFile
              id="profileImageUpload"
              type="file"
              onChange={e => handleImageUpload(e.target.files)}
            />
            <InnerImage src={user && user.photoURL ? user.photoURL : defaultProfileImage} />
          </AvatarWrap>
        </label>
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
