import {Component, HostBinding, Input, OnInit} from '@angular/core';
import { UtilService } from '../../services/util.service';

@Component({
  selector: 'wm-code-entry',
  templateUrl: './code-entry.component.html',
  styleUrls: [ './code-entry.component.scss' ]
})
export class CodeEntryComponent implements OnInit {


  @HostBinding('class') classes = 'wmHolyGrailBody';

  _code?: string;
  @Input()
  set code(value: string | undefined) {
    this._code =  UtilService.prettify(String(value));
    // this._code =  String(value);
  }

  @Input()
  language?: string;

  constructor() {
  }

  ngOnInit() {
  }
}
