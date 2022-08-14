import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '@modules/user/services/user.service';
import { LoadingScreenService } from '@shared/loading-screen/loading-screen.service';
import { HelperService } from '@shared/services/helper/helper.service';
import { TitleService } from '@shared/services/title/title.service';
import { debounceTime, finalize,  Subject, take, takeUntil } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnDestroy {
  form: FormGroup;
  emailUniqueValidatorWrapper$ = new Subject<ValidationErrors | null>();
  asyncValidatorDebounce$ = new Subject<() => void>();
  private unsub$ = new Subject<void>();

  constructor(private readonly fb: FormBuilder,
              private readonly userService: UserService,
              private readonly titleService: TitleService,
              private readonly router: Router,
              private readonly loadingScreenService: LoadingScreenService) {
    this.form = this.initForm();
    this.titleService.setTitle($localize`Register account`)
    this.asyncValidatorDebounce$.pipe(debounceTime(1000))
                                .pipe(takeUntil(this.unsub$))
                                .subscribe(handlerFn => handlerFn())
  }

  ngOnDestroy(): void {
    this.unsub$.next();
    this.unsub$.complete();
  }

  onSubmit() {
    this.loadingScreenService.show();
    this.userService.register(this.form.value)
                    .pipe(finalize(() => this.loadingScreenService.hide()))
                    .subscribe({ 
                      next: user => this.onSuccessfulRegistration(),
                      error: err => this.onError(err)
                    })
  }

  private async onSuccessfulRegistration() {
    await Swal.fire({
      icon: 'success',
      title: $localize`Registration completed successfully!`,
      text: $localize`You will be redirected to the login page.`,
      timer: 3000,
      showCloseButton: false,
      allowOutsideClick: false,
      showConfirmButton: false,
      showDenyButton: false
    })
    this.router.navigateByUrl('/login', {
      state: { nextUrl: '/' }
    });
  }

  private onError(response: HttpErrorResponse) {
    let msg: string;
    if (response.status === 500) {
      msg = $localize`We can't process your request right now, please try again later.`
    } else {
      msg = $localize`Please check the data you inserted: ` + HelperService.toArray<string[]>(response.error?.message || []).join(',')
    }
    Swal.fire({
      icon: 'info',
      title: $localize`Ooops, something went wrong!`,
      text: msg,
    })
  }

  private initForm() {
    const namePattern = /^[a-zA-Z]+$/
    const form = this.fb.group({
      firstName: [null, [Validators.required, Validators.pattern(namePattern)]],
      lastName: [null, [Validators.required, Validators.pattern(namePattern)]],
      email: [null, [Validators.required, Validators.email], [ this.asyncEmailUniqueValidator.bind(this) ]],
    })
    return form;
  }

  private asyncEmailUniqueValidator(control: AbstractControl) {
    this.asyncValidatorDebounce$.next(() => {
      this.userService.checkIfEmailExists(control.value).subscribe(exists => {
        this.emailUniqueValidatorWrapper$.next(!exists ? null : {emailNotUnique: true})
      })
    });
    return this.emailUniqueValidatorWrapper$.pipe(take(1));
  }

}
