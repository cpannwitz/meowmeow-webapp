import firebase from 'firebase/app'

export const authVariants = {
  github: {
    icon: 'https://icongr.am/simple/github.svg?size=20&colored=true',
    label: 'Github',
    provider: new firebase.auth.GithubAuthProvider(),
  },
  facebook: {
    icon: 'https://icongr.am/simple/facebook.svg?size=20&colored=true',
    label: 'Facebook',
    provider: new firebase.auth.FacebookAuthProvider(),
  },
  google: {
    icon: 'https://icongr.am/simple/google.svg?size=20&colored=true',
    label: 'Google',
    provider: new firebase.auth.GoogleAuthProvider(),
  },
  twitter: {
    icon: 'https://icongr.am/simple/twitter.svg?size=20&colored=true',
    label: 'Twitter',
    provider: new firebase.auth.TwitterAuthProvider(),
  },
}
