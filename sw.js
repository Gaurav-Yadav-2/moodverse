/* Moodverse service worker — makes the app open instantly and work offline.
 *
 * Your journal entries are NOT stored here: they live in the browser's
 * localStorage on the device. This worker only caches the app's own files
 * (page, icons, Three.js, font) so the app loads without a connection.
 *
 * Bump VERSION whenever you upload a new index.html so phones pick it up.
 */
const VERSION = 'moodverse-v4';

// Files that make up the app. Paths are relative so it works in a sub-folder
// (e.g. https://you.github.io/moodverse/).
const APP_SHELL = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/apple-touch-icon.png',
  './icons/favicon-64.png',
];
// Third-party files the page needs; cached best-effort.
const CDN = [
  'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js',
  'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap',
];

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(VERSION);
    await cache.addAll(APP_SHELL);
    // A CDN hiccup must not stop the app from installing.
    await Promise.all(CDN.map(url => cache.add(new Request(url, { mode: 'cors' })).catch(() => {})));
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // The page itself: try the network first (to get updates), fall back to the cache offline.
  if (req.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const fresh = await fetch(req);
        const cache = await caches.open(VERSION);
        cache.put('./index.html', fresh.clone());
        return fresh;
      } catch (e) {
        return (await caches.match('./index.html')) || (await caches.match('./')) || Response.error();
      }
    })());
    return;
  }

  // Everything else (icons, Three.js, fonts): serve from cache, refresh in the background.
  const cacheable = url.origin === self.location.origin
    || url.hostname === 'cdnjs.cloudflare.com'
    || url.hostname === 'fonts.googleapis.com'
    || url.hostname === 'fonts.gstatic.com';
  if (!cacheable) return;

  event.respondWith((async () => {
    const cache = await caches.open(VERSION);
    const cached = await cache.match(req);
    const network = fetch(req).then(res => {
      if (res && (res.ok || res.type === 'opaque')) cache.put(req, res.clone());
      return res;
    }).catch(() => null);
    return cached || (await network) || Response.error();
  })());
});
