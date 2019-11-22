#
# PHASE 0
FROM ubuntu:latest
ADD / /tmp/wooportal.client
ENV DEBIAN_FRONTEND noninteractive
RUN \
#
# packages
apt-get -qy update && \
apt-get -qy install --no-install-recommends \
  gcc-multilib \
  git \
  gnupg \
  openjdk-8-jdk \
  unzip \
  wget && \
#
# buildenv
. /etc/lsb-release && \
export JAVA_HOME=$(readlink -f /usr/bin/javac | sed "s:/bin/javac::") && \
#
# nodejs
wget -qO- https://deb.nodesource.com/gpgkey/nodesource.gpg.key \
  | apt-key add - && \
echo "deb https://deb.nodesource.com/node_10.x $DISTRIB_CODENAME main" \
  > /etc/apt/sources.list.d/nodejs.list && \
apt-get -qy update && \
apt-get -qy install --no-install-recommends nodejs && \
#
# android-sdk
cd $(mktemp -d) && \
export ANDROID_HOME="$PWD" PATH="$PATH:$PWD/tools:$PWD/platform-tools" && \
wget -qO- https://dl.google.com/android/repository/sdk-tools-linux-4333796.zip \
  > android-sdk.zip && \
unzip -qq android-sdk.zip && \
yes | tools/bin/sdkmanager --licenses > /dev/null && \
tools/bin/sdkmanager \
  "build-tools;29.0.2" \
  "extras;android;m2repository" \
  "platforms;android-29" \
  "platform-tools" \
  "tools" > /dev/null && \
#
# wooportal/client
cd /tmp/wooportal.client && \
npm install && \
npm run setup && \
npm run -- tns build android \
  --bundle \
  --env.aot \
  --env.snapshot \
  --env.uglify \
  --key-store-alias=dev \
  --key-store-alias-password=password \
  --key-store-password=password \
  --key-store-path=res/Android/dev.keystore \
  --release && \
mv $(find platforms/android -name "*.apk") /client.apk
#
# PHASE 1
FROM alpine:latest
LABEL maintainer info@codeschluss.de
ADD / /opt/wooportal.client/
COPY --from=0 /client.apk /
RUN \
#
# packages
apk --no-cache add \
  nodejs && \
apk --no-cache --virtual build add \
  nodejs-npm && \
#
# wooportal/client
cd /opt/wooportal.client && \
npm install && \
npm run build:lib && \
npm run build:app && \
npm run build:ssr && \
npm prune --production && \
mv /client.apk target/@wooportal/client && \
#
# cleanup
apk del --purge build && \
find /root /tmp -mindepth 1 -delete
#
# runtime
EXPOSE 4000
WORKDIR /opt/wooportal.client
CMD node target/express
