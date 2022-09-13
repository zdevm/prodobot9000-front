import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { LoadingScreenService } from './loading-screen.service';

@Component({
  selector: 'app-loading-screen',
  templateUrl: './loading-screen.component.html',
  styleUrls: ['./loading-screen.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadingScreenComponent implements OnInit, OnDestroy {
  public loading = false;
  private unsub$ = new Subject<void>();

  constructor(public loadingScreenService: LoadingScreenService,
              private readonly cdRef: ChangeDetectorRef) {
    this.cdRef.detach();
  }

  ngOnInit(): void {
    this.loadingScreenService.loader$
    .pipe(takeUntil(this.unsub$))
    .subscribe(status => {
      this.loading = status;
      this.cdRef.detectChanges();
    })
  }

  ngOnDestroy(): void {
    this.unsub$.next();
    this.unsub$.complete();
  }

}
