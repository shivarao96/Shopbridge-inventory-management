import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ROUTE_PATHS } from '@app/common/constants/routing.constant';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  showInfoViewer: boolean = true;
  currentKey: string = ''
  routeUnsubscriber: any;
  guiderObj = [
    {
      key: 'metrics',
      value: 'Metrics',
      img: 'assets/images/chart.png',
      description: 'Key performance indicators (KPIs) in inventory management are metrics that help you monitor and make decisions about your stock. In inventory management, KPIs matter because they offer information about turnover, sales, demand, costs, process success, relationships and more.'
    },
    {
      key: 'inventory',
      value: 'Inventory',
      img: 'assets/images/inventory.png',
      description: 'Handle and manage stock currently in the warehouse and handle shipping status'
    }
  ]

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.setCurrentAction(this.router.url);
    this.routeUnsubscriber = this.router.events.subscribe((val: any) => {
      /**istanbul ignore else */
      if(val instanceof NavigationEnd) {
        if(val.url === '/dashboard'){
          this.showInfoViewer = true;
          this.currentKey = '';
        } else {
          this.setCurrentAction(val.url)
        }
      }
    });  
  }

  setCurrentAction(url: string) {
    /**istanbul ignore else */
    if(url !== '/dashboard') {
      switch (url) {
        case '/dashboard/metrics':
          this.currentKey = 'metrics'
          break;
        case '/dashboard/inventory':
          this.currentKey = 'inventory'
          break;
        default:
          break;
      }
      this.showInfoViewer = false;
    }
  }

  navBasedOnGuider(key: string): void {
    this.currentKey = key;
    switch (key) {
      case 'metrics':
        this.router.navigate([ROUTE_PATHS.DASHBOARD, ROUTE_PATHS.DASHBOARD_METRICS]);
        break;
      case 'inventory':
        this.router.navigate([ROUTE_PATHS.DASHBOARD, ROUTE_PATHS.DASHBOARD_INVENTORY]);
        break;
      default:
        break;
    }
  }

}
