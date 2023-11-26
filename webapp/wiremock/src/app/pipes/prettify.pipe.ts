import { Pipe, PipeTransform } from '@angular/core';
import { UtilService } from '../services/util.service';

@Pipe({
  name: 'prettify',
})
export class PrettifyPipe implements PipeTransform {

  transform(value: string): string {
    return UtilService.prettify(value) + '';
  }

}
