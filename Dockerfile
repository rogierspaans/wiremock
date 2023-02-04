FROM eclipse-temurin:17-jre-jammy

RUN apt-get update && apt-get upgrade
RUN apt-get install -y curl

RUN adduser --uid 1000 --ingroup users --home /home/wiremock wiremock

ARG WIREMOCK_VERSION

USER wiremock

WORKDIR /home/wiremock

RUN mkdir extensions

RUN  curl -fL "https://github.com/holomekc/wiremock/releases/download/$WIREMOCK_VERSION-ui/wiremock-jre8-standalone-$WIREMOCK_VERSION.jar" -o /home/wiremock/wiremock.jar

CMD java -XX:+PrintFlagsFinal $JAVA_OPTIONS -cp /home/wiremock/wiremock.jar:/home/extensions/* com.github.tomakehurst.wiremock.standalone.WireMockServerRunner


