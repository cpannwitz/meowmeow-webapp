import firebase from 'firebase/app'
import {
  getPushNotificationsState,
  setPushNotificationsToken,
  removePushNotificationsToken,
} from './api'

let messaging: firebase.messaging.Messaging | null = null
if (firebase.messaging.isSupported()) {
  messaging = firebase.messaging()
  messaging.onMessage(handlePushNotifications)
}

export function handlePushNotifications(payload: any) {
  // TODO: How to handle ingame notifications?
  console.log(`LOG | : PushNotification was received: `, payload)
}

export async function checkPushNotifications(): Promise<boolean> {
  return (await getPushNotificationsState()) as Promise<boolean>
}

export async function enablePushNotifications() {
  if (!messaging) {
    return false
  }
  try {
    await messaging.requestPermission()
    const token = await messaging.getToken()
    if (!token) {
      return false
    }
    await setPushNotificationsToken(token)
    return true
  } catch (error) {
    console.error(`ERROR | : enablePushNotifications -> error`, error)
    return false
  }
}

export async function disablePushNotifications() {
  if (!messaging) {
    return false
  }
  try {
    await messaging.requestPermission()
    const token = await messaging.getToken()
    if (token) {
      await messaging.deleteToken(token)
    }
    await removePushNotificationsToken()
    return true
  } catch (error) {
    console.error(`ERROR | : disablePushNotifications -> error`, error)
    return false
  }
}
