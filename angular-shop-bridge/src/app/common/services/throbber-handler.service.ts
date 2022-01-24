import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThrobberHandlerService {

  isLoading = new BehaviorSubject(false);
  constructor() { }

  get currentLoadingStatus() {
    return this.isLoading.asObservable();
  }

  toggleThrobber(visibility: boolean) {
    this.isLoading.next(visibility);
  }

}
