import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '@app/api/user.service';
import { ROUTE_PATHS } from '@app/common/constants/routing.constant';
import { ToastHandlerService, ToastStatus } from '@app/common/services/toast-handler.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  registrationModel: RegistrationModel = {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  };
  constructor(
    private router: Router,
    private userService: UserService,
    private toastHandler: ToastHandlerService
  ) { }

  onRegistrationBtnClick(registrationForm: NgForm): void {
    /* istanbul ignore else */
    if (registrationForm.valid) {
      this.registrationApiCall()
    }
  }

  registrationApiCall() {
    this.userService.register(
      {
        username: this.registrationModel.username,
        email: this.registrationModel.email,
        password: this.registrationModel.password,
      }
    ).subscribe((res) => {
      this.toastHandler.showToast(ToastStatus.SUCCESS, 'Successfully Registered !, please login again.');
      this.navToLogin();
    }, err => {
      this.toastHandler.showToast(ToastStatus.ERROR, err.error.message);
    });
  }

  navToLogin() {
    this.router.navigate([ROUTE_PATHS.LOGIN]);
  }

}

export interface RegistrationModel { 
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}