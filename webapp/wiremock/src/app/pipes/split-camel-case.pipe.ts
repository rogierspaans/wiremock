import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'splitCamelCase',
})
export class SplitCamelCasePipe implements PipeTransform {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transform(value: string | undefined): string {
    if (!value) {
      return '';
    }
    // return value.split(/(?=[A-Z])/).join(' ');
    return value.replace(/([a-z](?=[A-Z]))/g, '$1 ');
  }
}
