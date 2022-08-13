import { Injectable } from '@angular/core';
import { HttpService } from '@shared/services/http/http.service';
import { plainToInstance } from 'class-transformer';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { User } from '../classes/user';

@Injectable({
  providedIn: 'root'
})
export class UserService extends HttpService {
  private user$ = new BehaviorSubject<User | null>(null);

  constructor() {
    super('users')
  }

  me(): Observable<User> {
    return this.http.get(`${this.url}/me`)
                    .pipe(map(doc => <User>UserService.transform(doc)))
  }

  fetchAndSetUser(): Observable<User | null> {
    return this.me().pipe(tap(user => this.setUser(user)))
  }

  setUser(user: User | null) {
    this.user$.next(user);
  }

  static transform(doc: any): User | User[] {
    return plainToInstance(User, doc, { excludeExtraneousValues: true });
  }

  get user() {
    return this.user$.asObservable();
  }

}
