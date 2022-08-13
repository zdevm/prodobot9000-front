import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { AuthService } from '@modules/auth/auth.service';
import { LoadingScreenService } from '@shared/loading-screen/loading-screen.service';
import { finalize, interval, map, Observable, Subject, takeUntil, tap } from 'rxjs';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import { MagicCodeAuthService } from './services/magic-code-auth.service';
import { differenceInSeconds } from 'date-fns'

type Step =  'email' | 'code';

@Component({
  selector: 'magic-code-auth',
  templateUrl: './magic-code-auth.component.html',
  styleUrls: ['./magic-code-auth.component.scss']
})
export class MagicCodeAuthComponent implements OnDestroy {
  @Output() acquiredTokens = new EventEmitter<{accessToken: string; refreshToken: string}>();
  authId?: string;
  step: Step = 'email';
  countingRemainingSecondsInterval$?: Observable<number>;
  successSwal?: any;
  
  private countingSecondsInterrupter$ = new Subject<void>(); 

  constructor(private readonly magicCodeAuthService: MagicCodeAuthService,
              private readonly loadingScreenService: LoadingScreenService) { }
  
  ngOnDestroy(): void {
    this.countingSecondsInterrupter$.next();
    this.countingSecondsInterrupter$.complete();
    if (this.successSwal) {
      Swal.close();
    }
  }

  onEmail(email: string) {
    this.setLoading(true);
    this.magicCodeAuthService.startValidation(email)
                             .pipe(finalize(() => this.setLoading(false)))
                             .subscribe({
                              next: res => {
                                this.step = 'code';
                                this.authId = res.id;
                                this.countingRemainingSecondsInterval$ = this.startCountingRemainingSeconds(res.expiresAt);
                              },
                              error: err => this.handleErrorResponse(err, 'email')
                             })
  }

  onCode(code: string) {
    if (!this.authId) {
      return;
    }
    this.setLoading(true);
    this.magicCodeAuthService.finishValidation(this.authId, code)
                             .pipe(finalize(() => this.setLoading(false)))
                             .subscribe({
                              next: tokens => {
                                this.step = 'code';
                                this.acquiredTokens.emit(tokens);
                                this.successSwal = this.userValidated()
                              },
                              error: err => this.handleErrorResponse(err, 'code')
                             })
  }

  private userValidated() {
    this.stopCountingRemainingSeconds();
    return Swal.fire({
      icon: 'success',
      text: $localize`Yay! Verification has been completed successfully.`,
      showCloseButton: false,
      showCancelButton: false,
      showConfirmButton: false,
      allowOutsideClick: false,
      allowEscapeKey: false,
    })
  }

  private startCountingRemainingSeconds(expiresAt: Date) {
    return interval(1000)
      .pipe(takeUntil(this.countingSecondsInterrupter$))
      .pipe(map(() => differenceInSeconds(expiresAt, new Date())))
      .pipe(tap(seconds => {
        if (seconds <= 0) {
          this.notEligible();
          this.step = 'email';
          this.authId = undefined;
          this.stopCountingRemainingSeconds();
        }
      }))
  }

  private stopCountingRemainingSeconds() {
    this.countingSecondsInterrupter$.next();
  }

  private setLoading(status: boolean) {
    this.loadingScreenService.show(status);
  }

  private handleErrorResponse(errorResponse: HttpErrorResponse, currentStep: Step) {
    if (errorResponse.status === 500) {
      this.showErrorAlert($localize`We are unable to respond.`, $localize`Please try later.`)
      return;
    }
    switch (currentStep) {
      case 'email': {
        this.handleEmailErrors(errorResponse);
        break;
      }
      case 'code': {
        this.handleCodeErrors(errorResponse);
        break;
      }
    }
  }

  private showErrorAlert(errorMsg: string, errorTitle?: string) {
    const options: SweetAlertOptions = {
      icon: 'info',
      timer: 10000,
      timerProgressBar: true
    };
    if (!errorTitle) {
      options.titleText = errorMsg;
    } else {
      options.title = errorTitle;
      options.text = errorMsg;
    }
    return Swal.fire(options)
  }

// Email step - error handler
  private handleEmailErrors(errorResponse: HttpErrorResponse) {
    if (errorResponse.status === 404) { // user not found
      this.userNotFound();
    }
  }

  private async userNotFound() {
    await this.showErrorAlert($localize`Please check that your credentials are correct, and try again.`,
                              $localize`User with specified email does not exist in our database!`);
  }

// Code step - error handler
  private handleCodeErrors(errorResponse: HttpErrorResponse) {
    if (errorResponse.status === 404) { // auth not found
      this.authNotFound();
    } else if (errorResponse.status === 403) { // not eligible for authorization (expired or reached max attempts)
      this.notEligible();
    } else {
      this.invalidCode();
    }
  }

  private async invalidCode() {
    await this.showErrorAlert($localize`The inserted code is invalid.`);
  }

  private async authNotFound() {
    await this.showErrorAlert($localize`Please check that your credentials are correct, and try again.`,
                              $localize`User with specified email does not exist in our database!`);
  }

  private async notEligible() {
    await this.showErrorAlert($localize`Code has been expired or you've reached max attempts.`);
  }

}
