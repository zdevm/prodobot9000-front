import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  // Only LoginModalComponent must be subscribed.
  public loginModalComponentListener$ = new Subject<'show' | 'close'>();

  constructor() { }

  showLoginModal() {
    this.checkCommunication();
    this.loginModalComponentListener$.next('show');
  }

  closeLoginModal() {
    this.checkCommunication();
    this.loginModalComponentListener$.next('close');
  }

  private checkCommunication() {
    if (!this.loginModalComponentListener$.observed) {
      throw new Error('LoginService not communicating with LoginModal')
    }
  }

}
