import firebase from 'firebase/app'
// Fetch the current user's ID from Firebase Authentication.

export function updateOnlineStatus() {
  const user = firebase.auth().currentUser

  if (user) {
    const { uid, displayName } = user

    const resultState = (online: boolean, db: boolean) => ({
      state: online ? 'online' : 'offline',
      lastChanged: db
        ? firebase.database.ServerValue.TIMESTAMP
        : firebase.firestore.FieldValue.serverTimestamp(),
      displayName,
    })

    const userStatusDatabaseRef = firebase.database().ref('/status/' + uid)
    const userStatusFirestoreRef = firebase.firestore().doc('/status/' + uid)

    // ! update state in firestore
    firebase
      .database()
      .ref('.info/connected')
      .on('value', function(snapshot) {
        if (snapshot.val() === false) {
          userStatusFirestoreRef.set(resultState(false, false))
          return
        }

        userStatusDatabaseRef
          .onDisconnect()
          .set(resultState(false, true))
          .then(function() {
            userStatusDatabaseRef.set(resultState(true, true))

            userStatusFirestoreRef.set(resultState(true, false))
            return
          })
          .catch(error => console.error(error))
      })
  }
}
