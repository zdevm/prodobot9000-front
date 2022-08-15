import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@modules/user/classes/user';
import { UserService } from '@modules/user/services/user.service';
import { LoadingScreenService } from '@shared/loading-screen/loading-screen.service';
import { TitleService } from '@shared/services/title/title.service';
import { UcFirstPipe } from 'ngx-pipes';
import { finalize, firstValueFrom } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.scss']
})
export class ViewProfileComponent implements OnInit {
  user!: User;
  userImage: string | null = null;

  constructor(private readonly userService: UserService,
              private readonly titleService: TitleService,
              private readonly loadingScreenService: LoadingScreenService,
              private readonly router: Router) { }

  ngOnInit() {
    this.loadUser();
  }

  onLogoutBtn() {
    this.userService.logout();
    this.router.navigateByUrl('/')
  }

  async onCloseAccountBtn() {
    const result = await Swal.fire({
      title: $localize`This cannot be undone!`,
      text: $localize`Are you sure you want to continue? If so, click on 'Close account'`,
      cancelButtonText: $localize`Do not delete`,
      confirmButtonText: $localize`Close account`,
      reverseButtons: true,
      showConfirmButton: true,
      showCancelButton: true,
      customClass: {
        cancelButton: 'bg-success',
        confirmButton: 'bg-danger'
      }
    })
    if (result.isDismissed) {
      return;
    }
    this.loadingScreenService.show();
    this.userService.delete()
    .pipe(finalize(() => this.loadingScreenService.hide()))
    .subscribe({
      next: () => {
        this.userService.logout();
        this.router.navigateByUrl('/')
      },
      error: err => this.onDeleteError()
    })
  }

  private onDeleteError() {
    Swal.fire({
      icon: 'info',
      title: $localize`Ooops, something went wrong!`,
      text: $localize`We can't process your request right now, please try again later.`,
    })
  }

  private async loadUser() {
    const user = await firstValueFrom(this.userService.user);
    if (!user) {
      throw new Error('User not found.')
    } else {
      this.user = user;
    }
    this.userImage = user.image;
    const ucPipe = new UcFirstPipe();
    this.titleService.setTitle(`${ucPipe.transform(user.firstName)} ${ucPipe.transform(user.lastName)}`)
  }

}
