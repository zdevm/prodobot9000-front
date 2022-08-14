import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '@modules/user/classes/user';
import { UserService } from '@modules/user/services/user.service';
import { LoadingScreenService } from '@shared/loading-screen/loading-screen.service';
import { HelperService } from '@shared/services/helper/helper.service';
import { TitleService } from '@shared/services/title/title.service';
import { finalize, firstValueFrom } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  
  form?: FormGroup;
  private user!: User;

  constructor(private readonly userService: UserService,
              private readonly titleService: TitleService,
              private readonly fb: FormBuilder,
              private readonly loadingScreenService: LoadingScreenService) { }

  ngOnInit(): void {
    this.titleService.setTitle('Editing profile');
    this.loadUser().then(user => this.form = this.initForm(user));
  }

  onSubmit() {
    if (!this.form) {
      return;
    }
    this.loadingScreenService.show();
    this.userService.update(this.form.value)
                    .pipe(finalize(() => this.loadingScreenService.hide()))
                    .subscribe({
                      next: user => this.userService.setUser(user),
                      error: err => this.onError(err)
                    })
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

  private initForm(user: User) {
    const namePattern = /^[a-zA-Z]+$/
    return this.fb.group({
      firstName: [user.firstName, [Validators.required, Validators.pattern(namePattern)]],
      lastName: [user.lastName, [Validators.required, Validators.pattern(namePattern)]],
    })
  }

  private async loadUser() {
    this.loadingScreenService.show();
    const user = await firstValueFrom(this.userService.user.pipe(finalize(() => this.loadingScreenService.hide())));
    if (!user) {
      throw new Error('User not found.')
    } else {
      this.user = user;
    }
    return user;
  }

}
