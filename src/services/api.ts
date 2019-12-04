import ky from 'ky'
import firebase from 'firebase/app'
import { CardObject } from '../types/typings'

const { REACT_APP_API_URL = '' } = process.env
const api = ky.extend({
  hooks: {
    beforeRequest: [
      async request => {
        const user = firebase.auth().currentUser
        if (user) {
          const token = await user.getIdToken()
          request.headers.set('Authorization', token)
        }
      },
    ],
  },
})

export function initUser() {
  return new Promise((resolve, reject) => {
    api
      .get(REACT_APP_API_URL + '/api/initUser')
      .json()
      .then(resolve)
      .catch(reject)
  })
}

export function startGame(gameId: string) {
  return new Promise((resolve, reject) => {
    api
      .post(REACT_APP_API_URL + '/api/startGame', {
        json: {
          gameId,
        },
      })
      .json()
      .then(resolve)
      .catch(reject)
  })
}

export function rejectGame(gameId: string) {
  return new Promise((resolve, reject) => {
    api
      .post(REACT_APP_API_URL + '/api/rejectGame', {
        json: { gameId },
      })
      .json()
      .then(resolve)
      .catch(reject)
  })
}

export function createGame(guestId: string) {
  return new Promise((resolve, reject) => {
    api
      .post(REACT_APP_API_URL + '/api/createGame', {
        json: { guestId },
      })
      .json()
      .then(resolve)
      .catch(reject)
  })
}

export function matchActionTakeSuspension(gameId: string) {
  return new Promise((resolve, reject) => {
    api
      .post(REACT_APP_API_URL + '/api/matchAction/takeSuspension', {
        json: { gameId },
      })
      .json()
      .then(resolve)
      .catch(reject)
  })
}

export function matchActionDraw(gameId: string, penalty?: number) {
  return new Promise((resolve, reject) => {
    api
      .post(REACT_APP_API_URL + '/api/matchAction/draw', {
        json: { gameId, penalty },
      })
      .json()
      .then(resolve)
      .catch(reject)
  })
}

export function matchActionPut(gameId: string, card: CardObject, jackWish?: string) {
  return new Promise((resolve, reject) => {
    api
      .post(REACT_APP_API_URL + '/api/matchAction/put', {
        json: { gameId, card, jackWish },
      })
      .json()
      .then(resolve)
      .catch(reject)
  })
}

export function setPushNotificationsToken(token: string) {
  return new Promise((resolve, reject) => {
    api
      .post(REACT_APP_API_URL + '/api/setPushNotificationsToken', {
        json: {
          token: token,
        },
      })
      .json()
      .then(resolve)
      .catch(reject)
  })
}
export function removePushNotificationsToken() {
  return new Promise((resolve, reject) => {
    api
      .delete(REACT_APP_API_URL + '/api/removePushNotificationsToken')
      .json()
      .then(resolve)
      .catch(reject)
  })
}
export function getPushNotificationsState() {
  return new Promise((resolve, reject) => {
    api
      .get(REACT_APP_API_URL + '/api/getPushNotificationsState')
      .json()
      .then(resolve)
      .catch(reject)
  })
}
