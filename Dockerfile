FROM wiremock/wiremock:latest

# Update again in case we need to update before wiremock image is updated
RUN apt-get update && apt-get upgrade -y

ARG WIREMOCK_VERSION

COPY version.txt /var/wiremock/lib/version.txt

# we remove the official standalone jar to reduce image size and download our own file
RUN rm /var/wiremock/lib/*.jar && \
    curl -fL "https://github.com/holomekc/wiremock/releases/download/$WIREMOCK_VERSION-ui/wiremock-standalone-$WIREMOCK_VERSION.jar" -o /var/wiremock/lib/wiremock.jar
