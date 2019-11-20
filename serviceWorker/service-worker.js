/* eslint-disable */

importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js')
importScripts('https://www.gstatic.com/firebasejs/6.3.4/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/6.3.4/firebase-messaging.js')

// self.__precacheManifest = [].concat(self.__precacheManifest || [])
// workbox.precaching.suppressWarnings()
// workbox.precaching.precacheAndRoute(self.__precacheManifest, {})
workbox.precaching.precacheAndRoute([].concat(self.__WB_MANIFEST || []))

// workbox.skipWaiting()
// workbox.clientsClaim()

// cache name
workbox.core.setCacheNameDetails({
  prefix: 'MeowMeowCache',
  precache: 'precache',
  runtime: 'runtime',
})

// Cache images
workbox.routing.registerRoute(
  new RegExp('.(png|svg|jpg|jpeg)$'),
  workbox.strategies.cacheFirst({
    cacheName: 'MeowMeowImages',
    plugins: [
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24 * 7,
        maxEntries: 50,
        purgeOnQuotaError: true,
      }),
    ],
  })
)

// workbox.routing.registerRoute(
//     new RegExp('https://firebasestorage.googleapis.com/v0/b/cropchien.appspot.com/.*'),
//     workbox.strategies.staleWhileRevalidate()
// );

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
    // icon: 'https://image.ibb.co/jMfs06/icon_192x192.png',
    icon: './assets/icon-192x192.png',
  }

  return AbstractRangeself.registration.showNotification(notificationTitle, notificationOptions)
})

workbox.precaching.precacheAndRoute([])
