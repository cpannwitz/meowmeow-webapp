import firebase from 'firebase/app'

export const rankedUsersCollection = firebase
  .firestore()
  .collection('userstats')
  .orderBy('meowpoints', 'desc')

export const onlineUsersCollection = firebase
  .firestore()
  .collection('status')
  .where('state', '==', 'online')
  .limit(20)

export const userStatsDocument = (userId: string) =>
  firebase
    .firestore()
    .collection('userstats')
    .doc(userId)

export const openGamesCollection = (userId: string) =>
  firebase
    .firestore()
    .collection('games')
    .where(userId, '==', true)
    .where('started', '==', true)
    .where('finished', '==', false)
    .where('rejected', '==', false)
    .limit(20)

export const closedGamesCollection = (userId: string) =>
  firebase
    .firestore()
    .collection('games')
    .where(userId, '==', true)
    .where('started', '==', true)
    .where('finished', '==', true)
    .where('rejected', '==', false)
    .limit(20)

export const inivitedGamesCollection = (userId: string) =>
  firebase
    .firestore()
    .collection('games')
    .where(userId, '==', true)
    .where('started', '==', false)
    .where('finished', '==', false)
    .where('rejected', '==', false)
    .limit(20)
