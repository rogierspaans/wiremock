package com.github.tomakehurst.wiremock.admin.tasks;

import com.github.tomakehurst.wiremock.admin.AdminTask;
import com.github.tomakehurst.wiremock.common.url.PathParams;
import com.github.tomakehurst.wiremock.core.Admin;
import com.github.tomakehurst.wiremock.http.ResponseDefinition;
import com.github.tomakehurst.wiremock.stubbing.ServeEvent;

/**
 * @author Christopher Holomek
 */
public class GetProxyConfigTask implements AdminTask {
    @Override
    public ResponseDefinition execute(final Admin admin, final ServeEvent serveEvent, final PathParams pathParams) {
        return ResponseDefinition.okForJson(admin.getProxyConfig());
    }
}
