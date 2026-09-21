const CACHE_NAME = 'obc-mess-admin-v1';

// Install Event
self.addEventListener('install', (event) => {
    self.skipWaiting(); // Instantly activate the new service worker
});

// Fetch Event (Required for PWA Install Prompt)
self.addEventListener('fetch', (event) => {
    event.respondWith(
        fetch(event.request).catch(() => {
            return caches.match(event.request);
        })
    );
});
