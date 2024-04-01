export class Version {
  version!: string;
  guiVersion!: string;

  constructor(version: string, guiVersion: string) {
    this.version = version;
    this.guiVersion = guiVersion;
  }
}
