/*
 * Copyright (C) 2023-2024 Thomas Akehurst
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
package com.github.tomakehurst.wiremock.core;

import static com.github.tomakehurst.wiremock.common.Lazy.lazy;

import com.github.tomakehurst.wiremock.common.Lazy;
import java.io.IOException;
import java.util.Properties;

public class Version {
  private static final Lazy<EnhancedVersion> version = lazy(Version::load);

  public static String getCurrentVersion() {
    return version.get().version;
  }

  public static String getGuiVersion() {
    return version.get().guiVersion;
  }

  private static EnhancedVersion load() {
    try {
      Properties properties = new Properties();
      properties.load(Version.class.getResourceAsStream("/wiremock-gui-version.properties"));
      return new EnhancedVersion(
          properties.getProperty("version"), properties.getProperty("gui-version"));
    } catch (NullPointerException | IOException e) {
      return new EnhancedVersion("unknown", "unknown");
    }
  }

  private static class EnhancedVersion {
    String version;
    String guiVersion;

    public EnhancedVersion(final String version, final String guiVersion) {
      this.version = version;
      this.guiVersion = guiVersion;
    }
  }
}
