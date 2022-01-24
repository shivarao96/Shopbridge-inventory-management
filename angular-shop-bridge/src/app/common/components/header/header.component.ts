import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ROUTE_PATHS } from '@app/common/constants/routing.constant';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(
    private router: Router
  ) { }

  navToDashboard() {
    this.router.navigate([ROUTE_PATHS.DASHBOARD])
  }

  logout() {
    localStorage.removeItem('userId');
    this.router.navigate([ROUTE_PATHS.LOGIN])
  }

}
