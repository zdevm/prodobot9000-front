import { Injectable } from '@angular/core';
import { BehaviorSubject, debounceTime, distinctUntilChanged, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingScreenService {
  private layers = 0;
  private loader$ = new BehaviorSubject<boolean>(false); // can only be used by loading-screen component

  constructor() { }

  show(): void
  show(show: boolean): void 
  show(show = true): void {
    this.layers += show ? 1 : -1;
    this.loader$.next(!!this.layers);
  }

  hide(): void {
    this.show(false);
  }

  get loader() {
    return this.loader$.asObservable()
                       .pipe(
                          debounceTime(50),
                          distinctUntilChanged()
                        );
  }

}
