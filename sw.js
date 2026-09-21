const CACHE_NAME = 'obc-mess-v4'; // Version badha diya
const OFFLINE_URL = 'offline.html';

// 1. Install & Force Update
self.addEventListener('install', (event) => {
    self.skipWaiting(); // Turant naya service worker activate karega
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.add(new Request(OFFLINE_URL, { cache: 'reload' }));
        })
    );
});

// 2. Activate & Delete Old Kachra (Cache)
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Old Cache Deleted:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

// 3. NETWORK FIRST STRATEGY 🔥
self.addEventListener('fetch', (event) => {
    // Sirf GET requests par rule lagayenge
    if (event.request.method === 'GET') {
        event.respondWith(
            fetch(event.request)
                .then((networkResponse) => {
                    // Agar internet chal raha hai, toh hamesha fresh data dikhao
                    return networkResponse;
                })
                .catch(() => {
                    // Agar internet band hai (offline)
                    return caches.match(event.request).then((cachedResponse) => {
                        if (cachedResponse) {
                            return cachedResponse;
                        } else if (event.request.mode === 'navigate') {
                            // Agar page load fail ho jaye, toh premium offline screen dikhao
                            return caches.match(OFFLINE_URL);
                        }
                    });
                })
        );
    }
});
