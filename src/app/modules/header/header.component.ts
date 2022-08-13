import { Location } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { TitleService } from '@shared/services/title/title.service';
import { Observable, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnDestroy {
  canGoBack = false;
  title$: Observable<string>;
  private history: string[] = ['/'];
  private unsub$ = new Subject<void>();

  constructor(private readonly router: Router,
              private readonly location: Location,
              private readonly titleService: TitleService) {
    this.listenRouter();
    this.title$ = this.titleService.listenTitle();
  }

  ngOnDestroy(): void {
    this.unsub$.next();
    this.unsub$.complete(); 
  }

  onGoBackBtn() {
    const previousUrl = this.popHistory();
    if (previousUrl) {
      this.location.back();
    }
  }

  private pushHistory(url: string) {
    if (this.history.length && this.history[this.history.length - 1] === url) { // skip same url
      return;
    }
    const len = this.history.push(url);
    if (len > 1) { // 0 index is the initial route
      this.canGoBack = true;
    }
  }

  private popHistory() {
    const previousUrl = this.history.pop();
    if (!previousUrl) {
      this.canGoBack = false;
    }
    return previousUrl;
  }

  private listenRouter() {
    this.router.events.pipe(takeUntil(this.unsub$))
                      .subscribe(event => {
                        if (event instanceof NavigationStart) {
                          if (event.navigationTrigger === 'popstate') {
                            this.popHistory();
                          }
                          this.pushHistory(event.url)
                        }
                      })
  }

}
