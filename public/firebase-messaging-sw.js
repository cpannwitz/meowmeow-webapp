/* eslint-disable */
importScripts('https://www.gstatic.com/firebasejs/6.3.4/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/6.3.4/firebase-messaging.js')

firebase.initializeApp({
  messagingSenderId: '605594120970',
})

const messaging = firebase.messaging()

messaging.setBackgroundMessageHandler(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload)
  // Customize notification here
  const notificationTitle = 'MeowMeow!'
  const notificationOptions = {
    body: payload.data.status,
    icon: './assets/icon-192x192.png',
  }

  return self.registration.showNotification(notificationTitle, notificationOptions)
})
