package com.github.tomakehurst.wiremock.common;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.util.DefaultPrettyPrinter;

import java.io.IOException;

public class JsonPrettyPrinter extends DefaultPrettyPrinter {

    @Override
    public DefaultPrettyPrinter createInstance() {
        return new JsonPrettyPrinter();
    }

    @Override
    public void writeObjectFieldValueSeparator(final JsonGenerator jg) throws IOException {
        jg.writeRaw(": ");
    }
}
