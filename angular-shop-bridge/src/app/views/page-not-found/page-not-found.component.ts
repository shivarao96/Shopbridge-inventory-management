import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ROUTE_PATHS } from '@app/common/constants/routing.constant';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent {

  constructor(
    private router: Router
  ) { }

  navToDashboard() {
    this.router.navigate([ROUTE_PATHS.DASHBOARD])
  }

}
