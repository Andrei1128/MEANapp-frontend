import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (!window.localStorage['token'] && !window.sessionStorage['token']) {
      if (route.url[0].path === 'dashboard') {
        this.router.navigate(['auth']);
        return false;
      } else {
        return true;
      }
    } else {
      if (route.url[0].path === 'auth') {
        this.router.navigate(['dashboard']);
        return false;
      } else {
        return true;
      }
    }
  }
}
