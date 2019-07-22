FROM ubuntu:latest
LABEL maintainer info@codeschluss.de
ENV DEBIAN_FRONTEND noninteractive
ADD / /opt/wooportal.client/
RUN \
#
# packages
apt-get -qy update && \
apt-get -qy install --no-install-recommends \
  ca-certificates && \
apt-get -qy install --no-install-recommends ${TMPKG:= \
  git \
  gnupg \
  openjdk-8-jdk \
  unzip \
  wget \
} && \
#
# buildenv
. /etc/lsb-release && \
export JAVA_HOME=$(readlink -f /usr/bin/javac | sed "s:/bin/javac::") && \
#
# nodejs
wget -qqO- https://deb.nodesource.com/gpgkey/nodesource.gpg.key \
  | apt-key add - && \
echo "deb https://deb.nodesource.com/node_10.x $DISTRIB_CODENAME main" \
  > /etc/apt/sources.list.d/nodejs.list && \
apt-get -qy update && \
apt-get -qy install --no-install-recommends nodejs && \
#
# android-sdk
cd $(mktemp -d) && \
export ANDROID_HOME="$PWD" PATH="$PATH:$PWD/tools:$PWD/platform-tools" && \
wget -qqO- https://dl.google.com/android/repository/sdk-tools-linux-4333796.zip \
  > android-sdk.zip && \
unzip -qq android-sdk.zip && \
yes | tools/bin/sdkmanager --licenses > /dev/null && \
tools/bin/sdkmanager \
  "tools" \
  "platform-tools" \
  "platforms;android-28" \
  "build-tools;28.0.3" \
  "extras;android;m2repository" && \
#
# wooportal/client
(cd /opt/wooportal.client && npm install) && \
(cd /opt/wooportal.client && npm run setup) && \
(cd /opt/wooportal.client && npm run build:app) && \
(cd /opt/wooportal.client && npm run build:ssr) && \
(cd /opt/wooportal.client && npm run build:oid) && \
mv $(find /opt/wooportal.client/platforms -name "*.apk") \
  /opt/wooportal.client/target/@wooportal/client/wooportal.client.apk && \
#
# cleanup
apt-get -qy purge --autoremove $TMPKG && apt-get -qy clean all && \
(cd /opt/wooportal.client && npm run tns platform remove android) && \
(cd /opt/wooportal.client && npm prune --production) && \
find /root /tmp /var/lib/apt/lists -mindepth 1 -delete
#
# runtime
EXPOSE 4000
WORKDIR /opt/wooportal.client
CMD node target/express
