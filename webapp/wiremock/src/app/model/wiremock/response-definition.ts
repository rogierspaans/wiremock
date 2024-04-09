export class ResponseDefinition {
  status!: number;
  statusMessage!: string;
  body?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  jsonBody?: any;
  base64Body?: string;
  bodyFileName?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  headers!: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  additionalProxyRequestHeaders?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  removeProxyRequestHeaders?: any[];
  fixedDelayMilliseconds?: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  delayDistribution: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  chunkedDribbleDelay: any;
  proxyBaseUrl?: string;
  proxyUrlPrefixToRemove?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fault: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transformers: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transformerParameters: any;
  fromConfiguredStub?: boolean;

  deserialize(unchecked: ResponseDefinition): ResponseDefinition {
    return unchecked;
  }
}
