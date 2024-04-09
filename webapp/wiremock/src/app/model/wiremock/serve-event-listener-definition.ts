export class ServeEventListenerDefinition {

  /**
   * This class is not deserialized explicitly yet. Therefore, the actual data is whatever the server says.
   * Change that if it becomes relevant.
   */

  name!: string;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  requestPhases?: any[];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  parameters!: any;
}
