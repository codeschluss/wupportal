#
# PHASE 0
FROM ubuntu:latest
COPY / /tmp/wooportal.client
ENV DEBIAN_FRONTEND noninteractive
RUN \
#
# packages
apt-get -qqy update && \
apt-get -qqy install --no-install-recommends ${TMPKG:= \
  file \
  gcc-multilib \
  git \
  gnupg \
  make \
  openjdk-8-jdk \
  unzip \
  wget \
  xxd \
} && \
#
# buildenv
. /etc/lsb-release && \
#
# nodejs
wget -qO- https://deb.nodesource.com/gpgkey/nodesource.gpg.key \
  | apt-key add - && \
echo "deb https://deb.nodesource.com/node_10.x $DISTRIB_CODENAME main" \
  > /etc/apt/sources.list.d/nodejs.list && \
apt-get -qqy update && \
apt-get -qqy install --no-install-recommends nodejs && \
#
# android-sdk
cd $(mktemp -d) && \
wget -qO- https://dl.google.com/android/repository/sdk-tools-linux-4333796.zip \
  > android-sdk.zip && \
unzip -qq android-sdk.zip && \
yes | tools/bin/sdkmanager --licenses > /dev/null && \
tools/bin/sdkmanager \
  "build-tools;29.0.2" \
  "extras;android;m2repository" \
  "ndk;20.1.5948944" \
  "platforms;android-29" \
  "platform-tools" \
  "tools" > /dev/null && \
export \
  ANDROID_HOME="$PWD" \
  ANDROID_NDK_HOME="$PWD/ndk/$(ls ndk)" \
  JAVA_HOME=$(readlink -f /usr/bin/javac | sed "s:/bin/javac::") \
  PATH="$PATH:$PWD/tools:$PWD/platform-tools" && \
#
# wooportal.client
cd /tmp/wooportal.client && \
npm install && \
npm run -- build:oid \
  --env.compileSnapshot \
  --env.snapshot \
  --key-store-alias=dev \
  --key-store-alias-password=password \
  --key-store-password=password \
  --key-store-path=res/Android/dev.keystore \
  --release && \
mv $(find platforms/android -name "*.apk") /client.apk && \
#
# cleanup
apt-get -qqy clean all && \
apt-get -qqy purge --autoremove $TMPKG nodejs && \
find /root /tmp /var/lib/apt/lists -mindepth 1 -delete
#
# PHASE 1
FROM alpine:edge
LABEL maintainer info@codeschluss.de
ADD / /opt/wooportal.client
COPY --from=0 /client.apk /tmp/client.apk
RUN \
#
# packages
apk --no-cache add \
  nodejs && \
apk --no-cache --virtual build add \
  nodejs-npm && \
#
# wooportal.client
cd /opt/wooportal.client && \
npm install && \
npm run build:lib && \
npm run build:app && \
npm run build:ssr && \
npm clean-install --no-optional --only=production && \
mv /tmp/client.apk target/@wooportal/client && \
#
# cleanup
apk del --purge build && \
find /root /tmp -mindepth 1 -delete
#
# runtime
EXPOSE 4000
WORKDIR /opt/wooportal.client
CMD node target/express
