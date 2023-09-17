/*
 * Copyright (C) 2023 Thomas Akehurst
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package com.github.tomakehurst.wiremock.jetty.websockets;

import static com.github.tomakehurst.wiremock.common.LocalNotifier.notifier;

import jakarta.websocket.*;
import jakarta.websocket.server.ServerEndpoint;
import java.io.IOException;
import java.util.Set;
import java.util.concurrent.CopyOnWriteArraySet;

/**
 * @author Christopher Holomek
 */
@ServerEndpoint("/events")
public class WebSocketEndpoint {

  private static final Set<Session> sessions = new CopyOnWriteArraySet<>();

  @OnOpen
  public void onWebSocketConnect(final Session session) {
    WebSocketEndpoint.sessions.add(session);
  }

  @OnMessage
  public void onWebSocketText(final String message) {
    notifier().info("Received TEXT message: " + message);
  }

  @OnClose
  public void onWebSocketClose(final CloseReason reason, final Session session) {
    WebSocketEndpoint.sessions.remove(session);
  }

  @OnError
  public void onWebSocketError(final Session session, final Throwable cause) {
    //        WebSocketEndpoint.sessions.remove(session);
  }

  public static void broadcast(final Message message) {
    for (final Session session : WebSocketEndpoint.sessions) {
      synchronized (session) { // we need to synchronize the messages send to client.
        try {
          session.getBasicRemote().sendText(message.getMessage());
        } catch (final IOException e) {
          notifier().error("Could not broadcast websocket message", e);
        }
      }
    }
  }
}
