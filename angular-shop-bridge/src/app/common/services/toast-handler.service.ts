import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

export enum ToastStatus {
  SUCCESS = 'success',
  WARNING = 'warning',
  ERROR = 'error'
}

@Injectable({
  providedIn: 'root'
})
export class ToastHandlerService {

  private toastShownInfoArray = new BehaviorSubject<Array<any>>([]);

  constructor() { }

  currentToastVisibility() {
    return this.toastShownInfoArray.asObservable();
  }

  showToast(status: ToastStatus, data: string) {
    const visibilityDetails = {
      visibility: true,
      status,
      data,
      timerId: null
    };
    const currentValue: any = this.toastShownInfoArray.value;
    this.toastShownInfoArray.next([...currentValue, visibilityDetails]);
  }

  hideToast(index: number = -1): void {
    const currentValue = this.toastShownInfoArray.value;
    if (currentValue.length > 1) {
        currentValue.splice(index, 1);
        this.toastShownInfoArray.next(currentValue);
    } else {
      this.toastShownInfoArray.next([]);
    }
  }
}
