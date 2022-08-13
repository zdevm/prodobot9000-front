import { Injectable } from '@angular/core';
import { HttpService } from '@shared/services/http/http.service';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MagicCodeAuthService extends HttpService {

  constructor() {
    super('magic-code-auth')
  }


  /**
   * Start magic code authentication process.
   * @param email User's email 
   * @returns A unique id that will later be used at finishValidation method
   */
  startValidation(email: string): Observable<{id: string, expiresAt: Date}> {
    return this.http.post<{id: string; expiresAt: Date}>(this.url, {email})
                    .pipe(map(res => ({id: res.id, expiresAt: new Date(res.expiresAt)})));
  }

  /**
   * Finishes validation.
   * @param authId Acquired previously by startValidation method
   * @param code Code sent to user's email address
   * @returns Access token and Refresh token
   */
  finishValidation(authId: string, code: string) {
    return this.http.put<{ accessToken: string; refreshToken: string; }>(`${this.url}/${authId}`, { code })
  }

}
