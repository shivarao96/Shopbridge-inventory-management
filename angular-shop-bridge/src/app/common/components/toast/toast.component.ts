import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastHandlerService } from '@app/common/services/toast-handler.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {

  toastData = {
    visibility: true,
    status: 'success',
    data: 'Successfully added',
    img: 'assets/images/success-toast.png'
  };

  successimg = 'assets/images/success-toast.png';
  warningimg = 'assets/images/warning-toast.png';
  errorimg = 'assets/images/error-toast.png';

  constructor(
    private toastHandler: ToastHandlerService,
  ) { }

  ngOnInit(): void {
    this.toastHandler.currentToastVisibility().subscribe((data) => {
      if (data.length > 1) {
        data.forEach((element, index) => {
          /*istanbul ignore else*/
          if (index !== data.length - 1) {
            clearTimeout(element.timerId);
            this.toastHandler.hideToast(index);
          }
        });
      } else {
        if (data.length && data[0].visibility) {
          this.toastData = this.handleStatusimg({
            visibility: data[0].visibility,
            status: data[0].status,
            data: data[0].data,
          });
          data[0].timerId = setTimeout(() => {
            this.toastHandler.hideToast();
          }, 3000);
        } else {
          this.close();
        }
      }
    });
  }

  handleStatusimg(e: any) {
    let imgIcon;
    if (e.status === 'success') {
      imgIcon = this.successimg;
    } else if (e.status === 'warning') {
      imgIcon = this.warningimg;
    } else {
      imgIcon = this.errorimg;
    }
    return {
      ...e, img: imgIcon
    };
  }

  close(): void {
    this.toastData.visibility = false;
  }

}

