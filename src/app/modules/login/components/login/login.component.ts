import { Component, OnInit } from '@angular/core';
import { AuthService } from '@modules/auth/auth.service';
import { UserService } from '@modules/user/services/user.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(private readonly authService: AuthService,
              private readonly userService: UserService) { }

  ngOnInit(): void {
  }

  onTokensAcquisition(tokens: {accessToken: string; refreshToken: string}) {
    this.authService.accessToken = tokens.accessToken;
    this.authService.refreshToken = tokens.refreshToken;
    this.userService.fetchAndSetUser().subscribe();
  }

}
