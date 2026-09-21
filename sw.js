const CACHE_NAME = 'obc-mess-admin-v3'; // Version change kar diya
const OFFLINE_URL = 'offline.html';

// 1. Install Event - Force cache the offline page
self.addEventListener('install', (event) => {
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            // Force browser to fetch a fresh copy of offline.html
            return cache.add(new Request(OFFLINE_URL, { cache: 'reload' }));
        })
    );
});

// 2. Activate Event - Delete old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

// 3. Fetch Event - Serve offline page
self.addEventListener('fetch', (event) => {
    if (event.request.mode === 'navigate' || (event.request.method === 'GET' && event.request.headers.get('accept').includes('text/html'))) {
        event.respondWith(
            fetch(event.request).catch((error) => {
                console.log('Fetch failed; returning offline page instead.', error);
                return caches.match(OFFLINE_URL);
            })
        );
    }
});
