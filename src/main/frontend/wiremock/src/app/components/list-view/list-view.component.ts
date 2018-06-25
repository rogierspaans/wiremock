import {Component, EventEmitter, HostBinding, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Item} from '../../model/wiremock/item';
import {UtilService} from '../../services/util.service';
import {WiremockService} from '../../services/wiremock.service';

@Component({
  selector: 'wm-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss']
})
export class ListViewComponent implements OnInit, OnChanges {

  @HostBinding('class') classes = 'wmHolyGrailBody column';

  @Input()
  items: Item[];

  filteredItems: Item[];

  @Input()
  activeItem: Item;

  pageSize = 20;

  page = 1;

  @Output()
  activeItemChange: EventEmitter<Item> = new EventEmitter();

  constructor(private wiremockService: WiremockService) {
  }


  ngOnInit() {
  }

  selectActiveItem(item: Item) {
    if (this.activeItem === item) {
      return;
    }
    this.activeItem = item;
    this.activeItemChange.emit(this.activeItem);
  }

  ngOnChanges(changes: SimpleChanges): void {

    let changed = false;

    if (UtilService.isDefined(changes.items) && UtilService.isDefined(this.items)) {
      if (this.items.length > this.pageSize) {
        const maxPages = Math.ceil(this.items.length / this.pageSize);
        if (maxPages < this.page) {
          this.page = maxPages;
        }
      } else {
        this.page = 1;
      }
      changed = true;
    }

    if (UtilService.isDefined(this.activeItem) && UtilService.isDefined(this.items)) {
      const index = this.items.findIndex((item: Item) => {
        return item.getId() === this.activeItem.getId();
      }) + 1;

      this.page = Math.ceil(index / this.pageSize);

      changed = true;
    }

    if (changed) {
      this.setFilteredItems();
    }
  }

  private setFilteredItems() {
    this.filteredItems = this.items.slice((this.page - 1) * this.pageSize, this.page * this.pageSize);
  }

  onPageChange(page: number) {
    this.page = page;
    this.setFilteredItems();
    this.selectActiveItem(this.filteredItems[0]);
  }

  enableProxy(item: Item) {
    this.wiremockService.enableProxy(item.getId()).subscribe(data => {
        // do nothing
      },
      err => {
        // UtilService.showErrorMessage(this.messageService, err);
      });
  }

  disableProxy(item: Item) {
    this.wiremockService.disableProxy(item.getId()).subscribe(data => {
        // do nothing
      },
      err => {
        // UtilService.showErrorMessage(this.messageService, err);
      });
  }
}
