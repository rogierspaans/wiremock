import { Pipe, PipeTransform } from "@angular/core";
import { UtilService } from "../services/util.service";

@Pipe({
  name: "keys",
})
export class KeysPipe implements PipeTransform {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transform(value: any): any {
    const result: KeyValue[] = [];

    if (UtilService.isUndefined(value)) {
      return result;
    }

    for (const key in value) {
      if (Object.prototype.hasOwnProperty.call(value, key) && !key.startsWith("_") && value[key]) {
        result.push(new KeyValue(key, value[key]));
      }
    }
    return result;
  }
}

export class KeyValue {
  key: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(key: string, value: any) {
    this.key = key;
    this.value = value;
  }
}
