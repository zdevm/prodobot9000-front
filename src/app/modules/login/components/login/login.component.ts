import { Component, OnInit } from '@angular/core';
import { AuthService } from '@modules/auth/auth.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  

  constructor(private readonly authService: AuthService) { }

  ngOnInit(): void {
  }

  onTokensAcquisition(tokens: {accessToken: string; refreshToken: string}) {
    this.authService.accessToken = tokens.accessToken;
    this.authService.refreshToken = tokens.refreshToken;
  }

}
