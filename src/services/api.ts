import ky from 'ky'
import firebase from 'firebase/app'
import { CardObject } from '../types/typings'

const { REACT_APP_API_URL = '' } = process.env
const api = ky.extend({
  prefixUrl: REACT_APP_API_URL,
  hooks: {
    beforeRequest: [
      async (request, options) => {
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
      .get('api/initUser')
      .json()
      .then(result => resolve(result))
      .catch(error => reject(error))
  })
}

export function startGame(gameId: string) {
  return new Promise((resolve, reject) => {
    api
      .post('api/startGame', {
        json: {
          gameId,
        },
      })
      .json()
      .then(result => resolve(result))
      .catch(error => reject(error))
  })
}

export function rejectGame(gameId: string) {
  return new Promise((resolve, reject) => {
    api
      .post('api/rejectGame', {
        json: { gameId },
      })
      .json()
      .then(result => resolve(result))
      .catch(error => reject(error))
  })
}

export function createGame(guestId: string) {
  return new Promise((resolve, reject) => {
    api
      .post('api/createGame', {
        json: { guestId },
      })
      .json()
      .then(result => resolve(result))
      .catch(error => reject(error))
  })
}

export function matchActionTakeSuspension(gameId: string) {
  return new Promise((resolve, reject) => {
    api
      .post('api/matchAction/takeSuspension', {
        json: { gameId },
      })
      .json()
      .then(result => resolve(result))
      .catch(error => reject(error))
  })
}

export function matchActionDraw(gameId: string, penalty?: number) {
  return new Promise((resolve, reject) => {
    api
      .post('api/matchAction/draw', {
        json: { gameId, penalty },
      })
      .json()
      .then(result => resolve(result))
      .catch(error => reject(error))
  })
}

export function matchActionPut(gameId: string, card: CardObject, jackWish?: string) {
  return new Promise((resolve, reject) => {
    api
      .post('api/matchAction/put', {
        json: { gameId, card, jackWish },
      })
      .json()
      .then(result => resolve(result))
      .catch(error => reject(error))
  })
}
