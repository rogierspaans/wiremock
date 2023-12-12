package com.github.tomakehurst.wiremock.admin.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

public class VersionResult {

  private final String version;

  private final String buildTime;

  @JsonCreator
  public VersionResult(
    @JsonProperty("version")
    final String version,
    @JsonProperty("buildTime")
    final String buildTime
  ) {
    this.version = version;
    this.buildTime = buildTime;
  }

  public String getVersion() {
    return version;
  }

  public String getBuildTime() {
    return buildTime;
  }
}
