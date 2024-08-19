// public/service-worker.js

self.addEventListener('install', (event) => {
    console.log('Service Worker installing.');
    self.skipWaiting(); // Force the new service worker to activate immediately
});

self.addEventListener('activate', (event) => {
    console.log('Service Worker activated.');
});

self.addEventListener('push', (event) => {
    const data = event.data.json();
    const title = data.title || 'New Message';
    const options = {
        body: data.body || 'You have a new message.',
        icon: 'path/to/icon.png', // Path to your icon
        badge: 'path/to/badge.png' // Path to your badge
    };

    event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
        clients.openWindow('/path-to-app') // Open your app or a specific URL
    );
});
