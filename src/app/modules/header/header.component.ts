import { Component, OnDestroy } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
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
  private readonly initialRoute = '/menu';
  private history: string[] = [this.initialRoute]; // 0 index is the initial route, last index is the current route
  private unsub$ = new Subject<void>();

  constructor(private readonly router: Router,
              private readonly titleService: TitleService) {
    this.listenRouter();
    this.title$ = this.titleService.listenTitle();
  }

  ngOnDestroy(): void {
    this.unsub$.next();
    this.unsub$.complete(); 
  }

  onGoBackBtn() {
    if (this.history.length === 2) { // previous url is the initial route
      this.popHistory();
      this.router.navigateByUrl(this.initialRoute, { replaceUrl: true });
    } else {
      window.history.back(); // we want 'popstate' to be triggered
    }
  }

  private pushHistory(url: string) {
    if (this.history.at(-1) === url) { // skip same url
      return;
    }
    const len = this.history.push(url);
    this.canGoBack = len > 1; // 0 index is the initial route
  }

  private popHistory() {
    const currentUrl = this.history.pop();
    this.canGoBack = this.history.length > 1; // 0 index is the initial route
    return currentUrl;
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
