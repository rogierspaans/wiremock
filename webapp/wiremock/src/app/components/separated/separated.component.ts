import {Component, HostBinding, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Item} from '../../model/wiremock/item';
import {ServeEvent} from '../../model/wiremock/serve-event';
import {StubMapping} from '../../model/wiremock/stub-mapping';
import {ResponseDefinition} from '../../model/wiremock/response-definition';
import {WiremockService} from '../../services/wiremock.service';
import {debounceTime} from 'rxjs/operators';
import {LoggedRequest} from '../../model/wiremock/logged-request';
import queryString from 'query-string';


@Component({
  selector: 'wm-separated',
  templateUrl: './separated.component.html',
  styleUrls: [ './separated.component.scss' ]
})
export class SeparatedComponent implements OnInit, OnChanges {

  @HostBinding('class') classes = 'wmHolyGrailScroll';

  private _activeItem?: Item;

  color: string[] = [ 'bg-info', 'bg-warning', 'bg-danger', 'bg-primary', 'bg-secondary', 'bg-dark' ];

  bodyFileData?: string;
  bodyGroupKey?: string;

  xWwwFormUrlEncodedParams?: string;

  get activeItem(): Item | undefined {
    return this._activeItem;
  }

  @Input()
  set activeItem(value: Item) {
    if (!this._activeItem || this._activeItem.getCode() !== value.getCode()) {
      this._activeItem = value;
    }
  }

  constructor(private wiremockService: WiremockService) {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this._activeItem) {
      let responseDefinition: ResponseDefinition | undefined;
      if (this._activeItem instanceof StubMapping) {
        responseDefinition = (this._activeItem as StubMapping).response;
        this.bodyGroupKey = 'response';
      } else if (this._activeItem instanceof ServeEvent) {
        responseDefinition = (this._activeItem as ServeEvent).responseDefinition;
        this.bodyGroupKey = 'responseDefinition';
      } else {
        responseDefinition = undefined;
      }

      // body from file
      if (responseDefinition && responseDefinition.bodyFileName) {
        this.wiremockService.getFileBody(responseDefinition.bodyFileName)
          .pipe(debounceTime(500)).subscribe(body => this.bodyFileData = body);
      } else {
        this.bodyFileData = undefined;
        this.bodyGroupKey = undefined;
      }

      // x-www-form-urlencoded
      this.xWwwFormUrlEncoded(responseDefinition);

    }
  }

  private xWwwFormUrlEncoded(responseDefinition?: ResponseDefinition) {
    let headers: {[key: string]: string} = {};
    let body;
    if (responseDefinition) {
      headers = responseDefinition.headers;
      body = responseDefinition.body;
    } else if (this._activeItem instanceof LoggedRequest) {
      headers = (this._activeItem as LoggedRequest).headers;
      body = (this._activeItem as LoggedRequest).body;
    }

    if (headers && headers['Content-Type']
      && headers['Content-Type'] === 'application/x-www-form-urlencoded'
      && body) {
      // found x-www-form-urlencoded. Try to check body
      this.xWwwFormUrlEncodedParams = JSON.stringify(queryString.parse(body));
    } else {
      this.xWwwFormUrlEncodedParams = undefined;
    }
  }

  isObject(property: any): boolean {
    return typeof property === 'object';
  }

  isServeEvent(item: Item) {
    return item instanceof ServeEvent;
  }

  asServeEvent(item: Item): ServeEvent {
    return <ServeEvent>item;
  }

}
