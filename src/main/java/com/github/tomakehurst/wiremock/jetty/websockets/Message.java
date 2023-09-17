package com.github.tomakehurst.wiremock.jetty.websockets;

/**
 * @author Christopher Holomek
 */
public enum Message {
    MAPPINGS("mappings"),
    UNMATCHED("unmatched"),
    MATCHED("matched"),
    RECORDING("recording"),
    SCENARIO("scenario"),
    ;

    private final String message;

    Message(final String message) {
        this.message = message;
    }

    public String getMessage() {
        return this.message;
    }
}
