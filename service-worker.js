// Simple cache-first PWA service worker
const CACHE = 'ocr-etiquettes-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  'https://unpkg.com/tesseract.js@5.1.0/dist/tesseract.min.js'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(ASSETS))
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.map(k => (k!==CACHE)&&caches.delete(k))))
  );
});

self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  e.respondWith(
    caches.match(e.request).then(resp => {
      return resp || fetch(e.request).then(networkResp => {
        // Optionnel : mettre en cache les nouvelles requêtes même hors liste blanche locale
        if (e.request.method === 'GET' && url.origin === location.origin) {
          const respClone = networkResp.clone();
          caches.open(CACHE).then(cache => cache.put(e.request, respClone));
        }
        return networkResp;
      }).catch(() => {
        // Offline fallback minimal (pour HTML racine)
        if (e.request.mode === 'navigate') {
          return caches.match('./index.html');
        }
      });
    })
  );
});
