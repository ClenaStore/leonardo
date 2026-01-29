const CACHE_NAME = 'grupo-dv-v1';

const FILES_TO_CACHE = [
  './',
  './app.html',
  './dashboard.html',
  './entradas.html',
  './saidas.html',
  './relatorios.html',
  './config.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

/* INSTALL */
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
  );
  self.skipWaiting();
});

/* ACTIVATE */
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(k => {
          if (k !== CACHE_NAME) return caches.delete(k);
        })
      )
    )
  );
  self.clients.claim();
});

/* FETCH */
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
