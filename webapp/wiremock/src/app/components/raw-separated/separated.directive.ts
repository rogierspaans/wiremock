import {Directive, HostBinding} from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: 'wm-raw-separated-separated'
})
export class SeparatedDirective {

  @HostBinding('class') classes = 'wmHolyGrailBody';

  constructor() {
  }

}
