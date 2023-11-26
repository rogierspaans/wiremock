export class LoggedResponse {
  status!: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  headers: any;
  body!: string;
  bodyAsBase64!: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fault: any;

  deserialize(unchecked: LoggedResponse): LoggedResponse {
    return unchecked;
  }
}
