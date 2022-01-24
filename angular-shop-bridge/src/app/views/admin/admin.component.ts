import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ROUTE_PATHS } from '@app/common/constants/routing.constant';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, OnDestroy {

  showLandingButton: boolean = true;
  currentSection: string = ''
  routeUnsubscriber: Subscription = new Subscription();;

  constructor(
    private router: Router    
  ) {}

  ngOnInit(): void {
    /**istanbul ignore else */
    this.setCurrentAction(this.router.url)
    this.routeUnsubscriber = this.router.events.subscribe((val: any) => {
      /**istanbul ignore else */
      if(val instanceof NavigationEnd) {
        if(val.url === '/'){
          this.showLandingButton = true;
          this.currentSection = '';
        } else {
          this.setCurrentAction(val.url)
        }
      }
    });  
  }

  navTologin() {
    this.router.navigate([ROUTE_PATHS.LOGIN]);
  }

  navToRegister() {
    this.router.navigate([ROUTE_PATHS.REGISTER]);
  }

  setCurrentAction(url: string) {
    /**istanbul ignore else */
    if(url !== '/') {
      switch (url) {
        case '/login':
          this.currentSection = CurrentAction.Login
          break;
        case '/register':
          this.currentSection = CurrentAction.Register
          break;
        default:
          break;
      }
      this.showLandingButton = false;
    }
  }

  ngOnDestroy(): void {
    this.routeUnsubscriber.unsubscribe();
  }

}


export type CurrentAction = 'login' | 'register';
export const CurrentAction = {
  Login: 'login' as CurrentAction,
  Register: 'register' as CurrentAction
};