package com.github.tomakehurst.wiremock.admin.tasks;

import static com.github.tomakehurst.wiremock.client.ResponseDefinitionBuilder.responseDefinition;
import static java.net.HttpURLConnection.HTTP_OK;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import com.github.tomakehurst.wiremock.admin.AdminTask;
import com.github.tomakehurst.wiremock.admin.model.VersionResult;
import com.github.tomakehurst.wiremock.common.Json;
import com.github.tomakehurst.wiremock.common.url.PathParams;
import com.github.tomakehurst.wiremock.core.Admin;
import com.github.tomakehurst.wiremock.http.ResponseDefinition;
import com.github.tomakehurst.wiremock.stubbing.ServeEvent;

public class VersionTask implements AdminTask {

  private static VersionResult versionResult;

  static {
    try {
      Path path = Paths.get("./version.json");
      String json = Files.readString(path);
      versionResult = Json.read(json, VersionResult.class);
    } catch (IOException e) {
      versionResult = new VersionResult("unknown","unknown");
      throw new RuntimeException(e);
    }
  }

  @Override
  public ResponseDefinition execute(Admin admin, ServeEvent serveEvent, PathParams pathParams) {

    return responseDefinition()
      .withStatus(HTTP_OK)
      .withStatusMessage("Wiremock is ok")
      .withBody(Json.write(versionResult))
      .withHeader("Content-Type", "application/json")
      .build();
  }
}
