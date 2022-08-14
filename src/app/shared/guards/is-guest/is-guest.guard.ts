import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { UserService } from '@modules/user/services/user.service';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IsGuestGuard implements CanActivate {
  public constructor(private readonly userService: UserService,
                     private readonly router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.userService.user.pipe(map(user => !user ? true : this.router.parseUrl('/')))
  }
  
}
