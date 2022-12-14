import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BreadcrumbItem } from '../classes/breadcrumb-item';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {
  private items: BreadcrumbItem[] = [];

  items$ = new BehaviorSubject<BreadcrumbItem[]>([]);

  constructor() { }

  set(items: BreadcrumbItem[]) {
    this.items = items;
    this.emitItems();
  }

  clear() {
    this.set([]);
  }

  emitItems() {
    this.items$.next(this.items);
  }

}
