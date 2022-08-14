import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { UserService } from '@modules/user/services/user.service';
import { catchError, iif, map, Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IsUserGuard implements CanActivate {
  public constructor(private readonly userService: UserService, private readonly router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.userService.user.pipe(
      switchMap(user => !!user ? of(true) : this.userService.me().pipe(map(user => !!user))),
      catchError(() => of(null)),
      map(hasUser => hasUser ? true :  this.router.parseUrl('/404')) // TODO replace 404
    )
  }
  
}
