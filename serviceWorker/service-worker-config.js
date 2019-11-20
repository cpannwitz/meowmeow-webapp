module.exports = {
  globDirectory: 'build/',
  globPatterns: ['static/**/*.{js,css,html,png,jpeg,svg,ttf,eot,woff}'],
  globStrict: false,
  swSrc: 'serviceWorker/service-worker.js',
  swDest: 'public/firebase-messaging-sw.js',
}
