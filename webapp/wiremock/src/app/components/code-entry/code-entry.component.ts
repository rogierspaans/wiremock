import { Component, HostBinding, Input } from '@angular/core';
import { UtilService } from '../../services/util.service';

@Component({
  selector: 'wm-code-entry',
  templateUrl: './code-entry.component.html',
  styleUrls: [ './code-entry.component.scss' ],
})
export class CodeEntryComponent {
  @HostBinding('class') classes = 'wmHolyGrailBody';

  _code?: string;
  @Input()
  set code(value: string | undefined) {
    if (value) {
      this._code = UtilService.prettify(String(value));
    } else {
      this._code = undefined;
    }
  }

  @Input()
  language?: string;

  constructor() {
  }
}
