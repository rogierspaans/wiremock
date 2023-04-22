FROM wiremock/wiremock:latest-alpine

# Update again in case we need to update before wiremock image is updated
RUN apt-get update && apt-get upgrade -y

ARG WIREMOCK_VERSION

# we remove the official standalone jar to reduce image size and download our own file
RUN rm /var/wiremock/lib/*.jar
RUN  curl -fL "https://github.com/holomekc/wiremock/releases/download/$WIREMOCK_VERSION-ui/wiremock-jre8-standalone-$WIREMOCK_VERSION.jar" -o /var/wiremock/lib/wiremock.jar
