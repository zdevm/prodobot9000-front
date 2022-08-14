import { Injectable } from '@angular/core';
import { HttpService } from '@shared/services/http/http.service';
import { plainToInstance } from 'class-transformer';
import { BehaviorSubject, catchError, map, Observable, of, tap } from 'rxjs';
import { User } from '../classes/user';

@Injectable({
  providedIn: 'root'
})
export class UserService extends HttpService {
  private user$ = new BehaviorSubject<User | null>(null);

  constructor() {
    super('users')
  }

  register(dto: Pick<User, 'lastName' | 'firstName' | 'email'>): Observable<User> {
    return this.http.post<User>(`${this.url}/register`, dto)
                    .pipe(map(doc => <User>UserService.transform(doc)))
  }

  checkIfEmailExists(email: string) {
    return this.http.get<boolean>(`${this.url}/${email}/exists`).pipe(
      map(() => true),
      catchError(err => of(false))
    )
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
