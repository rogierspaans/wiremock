import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private search = new BehaviorSubject<string | undefined>(undefined);
  search$ = this.search.asObservable();

  constructor() {}

  public setValue(value: string): void {
    this.search.next(value);
  }
}
