import { Component, Inject, OnInit } from '@angular/core';
import { LoginService } from '@modules/login/services/login.service';
import { TitleService } from '@shared/services/title/title.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(private loginService: LoginService,
              private readonly titleService: TitleService) { }

  ngOnInit(): void {
    this.titleService.setTitle('Prodobot 9000')
  }

  onLoginBtn() {
    this.loginService.showLoginModal();
  }

}
