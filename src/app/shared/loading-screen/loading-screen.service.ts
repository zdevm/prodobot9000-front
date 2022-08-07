import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingScreenService {
  private loadingScreenOn = false;
  loader$ = new BehaviorSubject<boolean>(this.loadingScreenOn); // can only be used by loading-screen component

  constructor() { }

  show(): void
  show(show: boolean): void 
  show(show = true): void {
    this.loadingScreenOn = show;
    this.loader$.next(this.loadingScreenOn);
  }

  hide(): void {
    this.show(false);
  }

}
