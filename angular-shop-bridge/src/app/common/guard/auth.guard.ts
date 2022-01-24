import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from '@app/api/user.service';
import { ROUTE_PATHS } from '../constants/routing.constant';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private userService: UserService) { }

  canActivate(): boolean {
    if(this.userService.isUserLoggedIn()) {
      return true;
    } else {
      this.router.navigate([ROUTE_PATHS.LOGIN]);
      return false;
    }
  }

}
