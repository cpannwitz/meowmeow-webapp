import firebase from 'firebase/app'

export function uploadProfileImage(
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
        return getProfileThumbnailRef(user.uid)
          .getDownloadURL()
          .then(downloadURL => {
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

export const getProfileImageRef = (userId: string) =>
  firebase
    .storage()
    .ref()
    .child(`users/${userId}/profileimage.png`)
export const getProfileThumbnailRef = (userId: string) =>
  firebase
    .storage()
    .ref()
    .child(`users/${userId}/thumbnail/profileimage_256x256.png`)
