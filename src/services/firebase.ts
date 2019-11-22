import { useContext, useEffect, useState, createContext } from 'react'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/messaging'
import 'firebase/performance'

import systemConfig from '../configs/systemConfig'

firebase.initializeApp({ ...systemConfig.firebase })
firebase.analytics()
interface UserContext {
  user: firebase.User | null
}
export const UserContext = createContext<UserContext>({
  user: null,
})

/**
 *
 */
export function useSession() {
  const { user } = useContext(UserContext)
  return user
}

/**
 *
 */
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

/**
 *
 */
export function logout() {
  firebase
    .auth()
    .signOut()
    .catch(error => console.error('ERROR | Logout: ', error))
}
