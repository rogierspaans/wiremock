import { Pipe, PipeTransform } from "@angular/core";
import { KeyValue } from "./keys.pipe";
import { UtilService } from "../services/util.service";

@Pipe({
  name: "isObject",
})
export class IsObjectPipe implements PipeTransform {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transform(value: KeyValue[]): any {
    const result: KeyValue[] = [];

    if (UtilService.isUndefined(value)) {
      return result;
    }

    for (let i = 0; i < value.length; i++) {
      if (typeof value[i].value === "object") {
        result.push(value[i]);
      }
    }
    return result;
  }
}
