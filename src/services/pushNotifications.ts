import firebase from 'firebase/app'

let messaging: firebase.messaging.Messaging | null = null
if (firebase.messaging.isSupported()) {
  messaging = firebase.messaging()
  messaging.onMessage(payload => {
    // TODO: better handling! Maybe show toast
    console.log(`LOG | : Messagewas received: `, payload)
  })
}

export async function enablePushNotifications(userId: string) {
  return new Promise<boolean>((resolve, reject) => {
    if (!messaging) {
      return reject(false)
    } else {
      messaging
        .requestPermission()
        .then(async () => {
          console.log('Notification permission granted.')
          const token = await firebase.messaging().getToken()
          if (token) {
            await updateTokenInDB(userId, token)
          } else {
            // Show permission request.
            console.log('No Instance ID token available. Request permission to generate one.')
            // Show permission UI.
          }
          return resolve(true)
        })
        .catch(error => {
          console.error('PushPermission not granted | Error: ', error)
          return reject(error)
        })
    }
  })
}

export function disablePushNotifications(userId: string) {
  return new Promise<boolean>(async (resolve, reject) => {
    if (!messaging) {
      return reject(false)
    } else {
      const token = await messaging.getToken()
      if (token) {
        await messaging.deleteToken(token)
      }
      await firebase
        .database()
        .ref('tokens/' + userId)
        .remove()
      resolve(true)
    }
  })
}

export function updateTokenInDB(userId: string, token: string) {
  return new Promise<boolean>((resolve, reject) => {
    firebase
      .database()
      .ref('tokens/' + userId)
      .set({
        token: token,
        user: userId,
      })
      .then(() => resolve(true))
      .catch(error => reject(error))
  })
}

export function checkSubscription(userId: string) {
  return new Promise<boolean>((resolve, reject) => {
    firebase
      .database()
      .ref('tokens/' + userId)
      .once('value')
      .then(snapshot => {
        if (snapshot.val()) {
          return resolve(true)
        } else {
          return resolve(false)
        }
      })
      .catch(error => {
        console.error('Error @ checking token on user', error)
        reject(error)
      })
  })
}
