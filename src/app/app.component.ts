import { Component, OnInit } from '@angular/core';
import { RouteConfigLoadEnd, RouteConfigLoadStart, Router } from '@angular/router';
import { AuthService } from '@modules/auth/auth.service';
import { UserService } from '@modules/user/services/user.service';
import { LoadingScreenService } from '@shared/loading-screen/loading-screen.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Prodobot9000';

  constructor(private readonly userService: UserService,
              private readonly router: Router,
              private readonly loadingScreenService: LoadingScreenService,
              private readonly authService: AuthService) {
  }

  ngOnInit(): void {
    this.fetchCurrentUser()
    this.listenRouter();
  }

  private listenRouter() {
    this.router.events.subscribe(e => {
      if (e instanceof RouteConfigLoadStart) {
        this.loadingScreenService.show();
      } else if (e instanceof RouteConfigLoadEnd) {
        this.loadingScreenService.hide();
      }
    })
  } 

  private fetchCurrentUser() {
    if (this.authService.accessToken) {
      this.userService.fetchAndSetUser().subscribe();
    } else {
      this.userService.setUser(null);
    }
  }
}
