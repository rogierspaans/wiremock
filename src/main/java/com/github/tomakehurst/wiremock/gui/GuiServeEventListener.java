package com.github.tomakehurst.wiremock.gui;

import com.github.tomakehurst.wiremock.extension.Parameters;
import com.github.tomakehurst.wiremock.extension.ServeEventListener;
import com.github.tomakehurst.wiremock.jetty.websockets.Message;
import com.github.tomakehurst.wiremock.jetty.websockets.WebSocketEndpoint;
import com.github.tomakehurst.wiremock.stubbing.ServeEvent;

import static com.github.tomakehurst.wiremock.gui.GuiConstants.EXTENSION_NAME;

/**
 * @author Christopher Holomek
 * @since 17.09.2023
 */
public class GuiServeEventListener implements ServeEventListener {

  @Override
  public void beforeResponseSent(ServeEvent serveEvent, Parameters parameters) {
    if (serveEvent.getWasMatched()) {
      WebSocketEndpoint.broadcast(Message.MATCHED);
    } else {
      WebSocketEndpoint.broadcast(Message.UNMATCHED);
    }
  }

  @Override
  public String getName() {
    return "wiremock-gui";
  }
}
