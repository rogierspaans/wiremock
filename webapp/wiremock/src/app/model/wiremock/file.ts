import { Item } from "./item";

export class File implements Item {
  name!: string;
  fileName!: string;
  folderName?: string;
  extension!: string;

  _content?: any;
  _language?: string;

  constructor(name: string) {
    this.name = name;
    const lastIndexOf = name.lastIndexOf("/");
    this.fileName = name.substring(lastIndexOf === -1 ? 0 : lastIndexOf + 1, name.length);
    this.folderName = lastIndexOf === -1 ? undefined : name.substring(0, lastIndexOf);
    this.extension = this.getExtension(this.fileName);
  }

  getBodyFileName(): string | undefined {
    return this.name;
  }

  getCode(): string {
    return "";
  }

  getFolderName(): string | undefined {
    return this.folderName;
  }

  getId(): string {
    return this.name;
  }

  getSubtitle(): string {
    return "";
  }

  getTitle(): string {
    return this.fileName;
  }

  hasFile(): boolean {
    return false;
  }

  hasFolderDefinition(): boolean {
    return true;
  }

  isProxy(): boolean {
    return false;
  }

  isProxyEnabled(): boolean {
    return false;
  }

  private getExtension(fileName: string) {
    const dot = fileName.lastIndexOf(".");

    if (dot === -1) {
      // we assume txt extension if none is set. This is just for reading purposes.
      return "txt";
    }
    return fileName.substring(fileName.lastIndexOf(".") + 1, fileName.length);
  }

  isPersistent(): boolean {
    return false;
  }

  isHighPrio(): boolean {
    return false;
  }
  isLowPrio(): boolean {
    return false;
  }
}
