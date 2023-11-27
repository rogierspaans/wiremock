export class SearchEvent {
  text?: string;
  caseSensitive: boolean;

  constructor(text: string | undefined, caseSensitive: boolean = false) {
    this.text = text;
    this.caseSensitive = caseSensitive;
  }
}
