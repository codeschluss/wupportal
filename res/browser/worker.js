'use strict';

importScripts('/ngsw-worker.js');

(() => {
  let done = null;
  self.addEventListener('message', () => done && done());
  self.addEventListener('notificationclick', (event) => {
    event.waitUntil(clients.matchAll().then((windows) => {
      const route = event.notification.data && event.notification.data.route;

      if (!windows.length) {
        return clients.openWindow(route || '/').then((window) => {
          return new Promise((resolve) => done = () => {
            resolve(window);
            done = null;
          });
        }).then((window) => {
          return window.postMessage({
            data: {
              notification: {
                body: event.notification.body,
                title: event.notification.title,
                route: route
              }
            },
            type: 'PUSH'
          })
        });
      } else if (route) {
        return windows[0].navigate(route).then((window) => window.focus());
      }

      return windows[0].focus();
    }));
  });
})();
