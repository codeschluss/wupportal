#!/bin/bash

case $1 in development|production) export NODE_ENV=$1;; *) exit 64;; esac
case $(uname -s) in Darwin*) :;; *) exit 71;; esac
case $(which cfgutil) in /*) :;; *) exit 72;; esac

export APP=$(xpath config.xml '/widget/name/text()' | xargs)
export PATH=$PATH:$PWD/node_modules/.bin

mkdir -p www
npm install --also=development
cordova platform add ios
cordova prepare ios

case $NODE_ENV in
  development)
    test -f settings-dev.json || sed -E \
      -e "s|(\"profile\":) \"[^\"]+\"|\1 \"$NODE_ENV\"|" \
      settings.json >settings-dev.json

    trap 'test -n "$PID" && kill -0 $PID && pkill -P $PID' 0

    while node -e 'done = require("fsevents").watch("www", () => done())'; do
      if test -f www/index.html && cordova run ios && test -n "$APP"; then
        test -n "$PID" && kill -0 $PID && pkill -P $PID
        sh -c "cfgutil syslog | grep $APP" & PID=$!
      fi
    done &

    ng run @wooportal/client:browser:$NODE_ENV --watch
    ;;

  production)
    ng run @wooportal/client:browser:$NODE_ENV
    cordova build ios --release
    ;;
esac
