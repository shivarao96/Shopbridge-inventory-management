import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '@app/api/user.service';
import { ROUTE_PATHS } from '../constants/routing.constant';

@Injectable({
  providedIn: 'root'
})
export class AuthPageBlockGuard implements CanActivate {
  constructor(private router: Router, private userService: UserService) { }

  canActivate(): boolean {
    if(this.userService.isUserLoggedIn()) {
      this.router.navigate([ROUTE_PATHS.DASHBOARD]);
      return false;
    } else {
      return true;
    }
  }
}
