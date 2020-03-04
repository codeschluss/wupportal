'use strict';

importScripts('/ngsw-worker.js');

self.addEventListener('notificationclick', (event) => {
  const route = (event.notification.data || { }).route || '/';

  event.waitUntil(clients.matchAll({ type: 'window' }).then((match) => (
    match.length ? match[0].navigate(route) : clients.openWindow(route)
  ).then((window) => window.focus())));
});
