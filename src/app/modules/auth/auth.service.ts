import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly _accessTokenKey = 'accessToken';
  private readonly _refreshTokenKey = 'refreshToken';

  constructor(private cookieService: CookieService) {}

  get accessToken(): string | null {
    return this.cookieService.get(this._accessTokenKey) || null;
  }

  set accessToken(token: string | null) {
    if (!token) {
      this.cookieService.delete(this._accessTokenKey)
    } else {
      this.cookieService.set(this._accessTokenKey, token)
    }
  }

  get refreshToken(): string | null {
    return localStorage.getItem(this._refreshTokenKey);
  }

  set refreshToken(token: string | null) {
    if (!token) {
      localStorage.removeItem(this._refreshTokenKey);
    } else {
      localStorage.setItem(this._refreshTokenKey, token)
    }
  }

}