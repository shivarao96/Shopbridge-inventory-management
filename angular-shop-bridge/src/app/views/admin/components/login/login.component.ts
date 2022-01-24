import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '@app/api/user.service';
import { ROUTE_PATHS } from '@app/common/constants/routing.constant';
import { ThrobberHandlerService } from '@app/common/services/throbber-handler.service';
import { ToastHandlerService, ToastStatus } from '@app/common/services/toast-handler.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {


  loginModel: LoginModel = {
    username: '',
    password: ''
  };

  constructor(
    private router: Router,
    private userService: UserService,
    private toastHandler: ToastHandlerService
  ) { }

  onLoginBtnClick(loginForm: NgForm): void {
    /* istanbul ignore else */
    if (loginForm.valid) {
      this.loginApiCall()
    }
  }

  loginApiCall() {
    this.userService.login(this.loginModel).subscribe((res) => {
      if(res.userId) {
        this.toastHandler.showToast(ToastStatus.SUCCESS, 'Welcome');
          localStorage.setItem('userId', res.userId);
          this.navToDashboard();
      } else {
        this.toastHandler.showToast(ToastStatus.WARNING, res.message);
      }
    }, err => {
      this.toastHandler.showToast(ToastStatus.ERROR, err.error.message);
    });
  }

  navToDashboard() {
    this.router.navigate([ROUTE_PATHS.DASHBOARD]);
  }

}

export interface LoginModel { 
  username: string;
  password: string;
}