import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TitleService {
  private title$ = new BehaviorSubject('');

  constructor(private readonly nativeTitleService: Title) { }

  getTitle() {
    return this.title$.getValue();
  }

  setTitle(title: string) {
    this.nativeTitleService.setTitle(title);
    this.title$.next(title);
  }
  
  listenTitle() {
    return this.title$.asObservable();
  }

}
