import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoginService } from '@modules/login/services/login.service';
import { User } from '@modules/user/classes/user';
import { UserService } from '@modules/user/services/user.service';
import { TitleService } from '@shared/services/title/title.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, OnDestroy {
  user: User | null = null;
  private unsub$ = new Subject<void>();

  constructor(private readonly loginService: LoginService,
              private readonly userService: UserService,
              private readonly titleService: TitleService) { }

  ngOnInit(): void {
    this.titleService.setTitle('Prodobot 9000')
    this.userService.user
      .pipe(takeUntil(this.unsub$))
      .subscribe(user => this.user = user);
  }

  ngOnDestroy(): void {
    this.unsub$.next();
    this.unsub$.complete();
  }

  onLoginBtn() {
    this.loginService.showLoginModal();
  }

}
