import { Component, OnInit } from '@angular/core';
import { ThrobberHandlerService } from '@app/common/services/throbber-handler.service';

@Component({
  selector: 'app-throbber',
  templateUrl: './throbber.component.html',
  styleUrls: ['./throbber.component.scss']
})
export class ThrobberComponent implements OnInit {

  showThrobber: boolean = false;
  constructor(
    private throbberService: ThrobberHandlerService
  ) { }

  ngOnInit() {
    this.throbberService.isLoading.subscribe(val => {
      this.showThrobber = val;
    });
  }
}
