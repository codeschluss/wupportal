//

var pluginloader = require('cordova/pluginloader');

var fcm = undefined;
var xhr = new XMLHttpRequest();

xhr.addEventListener('load', function() {
  switch (true) {
    case xhr.readyState === 4 && xhr.status === 0:
    case xhr.readyState === 4 && xhr.status === 200:
    case xhr.readyState === 4 && xhr.status === 304:
      fcm = firebase.initializeApp(JSON.parse(xhr.responseText)).messaging();
      require('cordova/exec/proxy').add('FirebaseMessaging', module.exports);
  }
});

pluginloader.injectScript('firebase-app.js', function() {
  pluginloader.injectScript('firebase-messaging.js', function() {
    xhr.open('get', 'firebase.json', true);
    xhr.send();
  });
});

module.exports = {
  subscribe: function(callback, rejected) {
    error('Not implemented');
  },
  unsubscribe: function(callback, error) {
    error('Not implemented');
  },
  onTokenRefresh: function(callback, error) {
    try {
      fcm.onTokenRefresh(callback, error);
    } catch (exception) {
      error(exception);
    }
  },
  onMessage: function(callback, error) {
    try {
      fcm.onMessage(callback, error);
    } catch (exception) {
      error(exception);
    }
  },
  onBackgroundMessage: function(callback, error) {
    try {
      fcm.onBackgroundMessage(callback, error);
    } catch (exception) {
      error(exception);
    }
  },
  clearNotifications: function(callback, error) {
    error('Not implemented');
  },
  deleteToken: function(callback, error) {
    try {
      fcm.deleteToken().then(callback).catch(error);
    } catch (exception) {
      error(exception);
    }
  },
  getToken: function(callback, error) {
    try {
      navigator.serviceWorker.ready.then(function(registration) {
        return fcm.getToken({ serviceWorkerRegistration: registration });
      }).then(callback).catch(error);
    } catch (exception) {
      error(exception);
    }
  },
  setBadge: function(callback, error) {
    error('Not implemented');
  },
  getBadge: function(callback, error) {
    error('Not implemented');
  },
  requestPermission: function(callback, error) {
    try {
      fcm.requestPermission().then(callback).catch(error);
    } catch (exception) {
      error(exception);
    }
  },
  findChannel: function(callback, error) {
    error('Not implemented');
  },
  listChannels: function(callback, error) {
    error('Not implemented');
  },
  createChannel: function(callback, error) {
    error('Not implemented');
  },
  deleteChannel: function(callback, error) {
    error('Not implemented');
  }
};
