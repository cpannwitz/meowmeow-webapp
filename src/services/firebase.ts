import { useContext, useEffect, useState, createContext } from 'react'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/analytics'
import 'firebase/database'
import 'firebase/messaging'
import 'firebase/performance'
import 'firebase/storage'

import systemConfig from '../configs/systemConfig'

firebase.initializeApp({ ...systemConfig.firebase })
firebase.analytics()
interface UserContext {
  user: firebase.User | null
}
export const UserContext = createContext<UserContext>({
  user: null,
})

export function useSession() {
  const { user } = useContext(UserContext)
  return user
}

export function useAuth() {
  const [state, setState] = useState(() => {
    const user = firebase.auth().currentUser
    return { initializing: !user, user }
  })

  function onChange(user: firebase.User | null) {
    setState({ initializing: false, user })
  }

  useEffect(() => {
    // listen for auth state changes
    const unsubscribe = firebase.auth().onAuthStateChanged(onChange)
    // unsubscribe to the listener when unmounting
    return () => unsubscribe()
  }, [])

  return state
}

export function uploadUserImage(
  file: File,
  onProgress: (progress: number) => void,
  onError: (error: Error) => void,
  onSuccess: () => void
) {
  const user = firebase.auth().currentUser
  if (user && file) {
    const ref = getProfileImageRef(user.uid)
    const theUpload = ref.put(file, { contentType: file.type })

    theUpload.on(
      'state_changed',
      snapshot => {
        // upload progress
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        onProgress(progress)
      },
      error => {
        // Upload failed
        onProgress(0)
        onError(error)
      },
      () => {
        // Upload successful
        return theUpload.snapshot.ref.getDownloadURL().then(downloadURL => {
          user.updateProfile({
            photoURL: downloadURL,
          })
          setTimeout(() => {
            onProgress(0)
          }, 1000)
          return onSuccess()
        })
      }
    )
  }
}

export function logout() {
  firebase
    .auth()
    .signOut()
    .catch(error => console.error('ERROR | Logout: ', error))
}

export const getProfileImageRef = (userId: string) =>
  firebase
    .storage()
    .ref()
    .child(`users/${userId}/profileimage.png`)
