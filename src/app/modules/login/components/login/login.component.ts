import { Component } from '@angular/core';
import { Navigation, Router } from '@angular/router';
import { AuthService } from '@modules/auth/auth.service';
import { UserService } from '@modules/user/services/user.service';
import { TitleService } from '@shared/services/title/title.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  private nextUrl?: string;

  constructor(private readonly authService: AuthService,
              private readonly userService: UserService,
              private readonly router: Router,
              private readonly titleService: TitleService) {
    const navigation: Navigation | null = this.router.getCurrentNavigation();
    if (navigation) {
      this.nextUrl = <string>navigation?.extras?.state?.['nextUrl'];
      this.titleService.setTitle('Log in')
    }
  }

  onTokensAcquisition(tokens: {accessToken: string; refreshToken: string}) {
    this.authService.accessToken = tokens.accessToken;
    this.authService.refreshToken = tokens.refreshToken;
    this.userService.fetchAndSetUser().subscribe(user => {
      if (this.nextUrl) {
        this.router.navigateByUrl(this.nextUrl);
      }
    });
  }

}
