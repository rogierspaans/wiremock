export class RecordSpec {
  targetBaseUrl!: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  filters: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  captureHeaders: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  requestBodyPattern: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  extractBodyCriteria: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  outputFormat: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  persist: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  repeatsAsScenarios: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transformers: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transformerParameters: any;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  deserialize(_unchecked: RecordSpec) {
    return this;
  }
}
