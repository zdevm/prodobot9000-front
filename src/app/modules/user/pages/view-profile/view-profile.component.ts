import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@modules/user/classes/user';
import { UserService } from '@modules/user/services/user.service';
import { TitleService } from '@shared/services/title/title.service';
import { UcFirstPipe } from 'ngx-pipes';
import { firstValueFrom } from 'rxjs';

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
              private readonly router: Router) { }

  ngOnInit() {
    this.loadUser();
  }

  onLogoutBtn() {
    this.userService.logout();
    this.router.navigateByUrl('/')
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
