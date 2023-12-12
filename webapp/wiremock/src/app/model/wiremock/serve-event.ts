import { StubMapping } from "./stub-mapping";
import { ResponseDefinition } from "./response-definition";
import { Item } from "./item";
import { LoggedRequest } from "./logged-request";
import { LoggedResponse } from "./logged-response";
import { UtilService } from "../../services/util.service";
import { Proxy } from "./proxy";

export class ServeEvent extends Proxy implements Item {
  id!: string;
  request!: LoggedRequest;
  stubMapping!: StubMapping;
  responseDefinition!: ResponseDefinition;
  response!: LoggedResponse;
  wasMatched!: boolean;

  constructor() {
    super();
  }

  getTitle(): string {
    return this.stubMapping.name || this.request.url;
  }

  getSubtitle(): string {
    let url = "";
    if (this.stubMapping.name) {
      url = `, url=${this.request.url}`;
    }

    return `${this.request.getSubtitle()}, status=${this.response.status}${url}`;
  }

  getId(): string {
    return this.id;
  }

  getCode(): string {
    return UtilService.itemModelStringify(this);
  }

  hasFolderDefinition(): boolean {
    return false;
  }

  getFolderName(): string | undefined {
    return undefined;
  }

  deserialize(unchecked: ServeEvent): ServeEvent {
    this.id = unchecked.id;
    this.request = new LoggedRequest().deserialize(unchecked.request);
    this.stubMapping = new StubMapping().deserialize(unchecked.stubMapping);
    this.responseDefinition = unchecked.responseDefinition;
    this.response = unchecked.response;
    this.wasMatched = unchecked.wasMatched;

    // We do not want proxy feature for served events
    // if (UtilService.isDefined(this.responseDefinition.proxyBaseUrl)) {
    //   this.setProxy(true);
    // }

    return this;
  }

  getBodyFileName(): string | undefined {
    return this.responseDefinition.bodyFileName;
  }

  hasFile(): boolean {
    return this.responseDefinition.bodyFileName !== undefined;
  }

  isPersistent(): boolean {
    return this.stubMapping.persistent;
  }

  isHighPrio(): boolean {
    return this.stubMapping.priority !== undefined && this.stubMapping.priority < 5;
  }
  isLowPrio(): boolean {
    return this.stubMapping.priority !== undefined && this.stubMapping.priority > 5;
  }
}
