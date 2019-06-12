FROM ubuntu:latest
LABEL maintainer info@codeschluss.de
ENV DEBIAN_FRONTEND noninteractive
ADD / /opt/wooportal/
RUN \
#
# packages
apt-get update && \
apt-get install --no-install-recommends --yes \
  ca-certificates && \
apt-get install --no-install-recommends --yes ${TMPKG:= \
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
wget -O- https://deb.nodesource.com/gpgkey/nodesource.gpg.key \
  | apt-key add - && \
echo "deb https://deb.nodesource.com/node_10.x $DISTRIB_CODENAME main" \
  > /etc/apt/sources.list.d/nodejs.list && \
apt-get update && \
apt-get install --no-install-recommends --yes nodejs && \
#
# android-sdk
cd $(mktemp -d) && \
export ANDROID_HOME="$PWD" PATH="$PATH:$PWD/tools:$PWD/platform-tools" && \
wget -O- https://dl.google.com/android/repository/sdk-tools-linux-4333796.zip \
  > android-sdk.zip && \
unzip android-sdk.zip && \
yes | tools/bin/sdkmanager --licenses && \
tools/bin/sdkmanager \
  "tools" \
  "platform-tools" \
  "platforms;android-28" \
  "build-tools;28.0.3" \
  "extras;android;m2repository" && \
#
# wooportal/client
(cd /opt/wooportal && npm install) && \
(cd /opt/wooportal && npm run setup) && \
(cd /opt/wooportal && npm run build:app) && \
(cd /opt/wooportal && npm run build:ssr) && \
(cd /opt/wooportal && npm run build:oid) && \
mv $(find /opt/wooportal/platforms -name "*.apk") \
  /opt/wooportal/target/@wooportal/client/wooportal-client.apk && \
#
# cleanup
apt-get purge --autoremove --yes $TMPKG && apt-get clean all && \
(cd /opt/wooportal && npm run tns platform remove android) && \
(cd /opt/wooportal && npm prune --production) && \
find /root /tmp /var/lib/apt/lists -mindepth 1 -delete
#
# runtime
EXPOSE 4000
WORKDIR /opt/wooportal
CMD node target/express
