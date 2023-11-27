export class RequestPattern {
  url?: string;
  urlPattern?: string;
  urlPath?: string;
  urlPathPattern?: string;
  method?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  headers: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  queryParameters: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cookies: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  basicAuth: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  bodyPatterns?: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  customMatcher: any;

  deserialize(unchecked: RequestPattern): RequestPattern {
    return unchecked;
  }
}
