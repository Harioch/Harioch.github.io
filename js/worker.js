if('serviceWorker' in navigator) {
    navigator.serviceWorker.register('../cache/sw.js');
};

self.addEventListener('install', (e) => {
    console.log('[Service Worker] Install');
});

var cacheName = 'YesCache-v1';
var appShellFiles = [
  '../index.html',
  '../favicon.ico',
  '../manifest.json',
  '../produits.csv',
  '../style.css',
  '../images/barcode-scanner.png',
  '../images/icon-cart.png',
  '../images/icon-setup.png',
  '../images/icon-transmit.png',
  '../images/logo.png',
  '../js/app.js',
  '../js/DecoderWorker.js',
  '../js/exif.js',
  '../js/job.js',
  '../icons/icon-192.png',
  '../icons/icon-512.png'
];

self.addEventListener('install', (e) => {
  console.log('[Service Worker] Install');
  e.waitUntil(
    caches.open(cacheName).then((cache) => {
          console.log('[Service Worker] Caching all: app shell and content');
      return cache.addAll(contentToCache);
    })
  );
});

self.addEventListener('fetch', (e) => {
    console.log('[Service Worker] Fetched resource '+e.request.url);
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((r) => {
          console.log('[Service Worker] Fetching resource: '+e.request.url);
      return r || fetch(e.request).then((response) => {
                return caches.open(cacheName).then((cache) => {
          console.log('[Service Worker] Caching new resource: '+e.request.url);
          cache.put(e.request, response.clone());
          return response;
        });
      });
    })
  );
});


