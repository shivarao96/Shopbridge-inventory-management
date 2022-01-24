import { HttpClientModule } from '@angular/common/http';
import { Injectable, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '@app/api/user.service';
import { ROUTE_PATHS } from '@app/common/constants/routing.constant';
import { ToastHandlerService, ToastStatus } from '@app/common/services/toast-handler.service';
import { BehaviorSubject, of, throwError } from 'rxjs';
import { LoginComponent } from './login.component';

const mockRouter = {
  navigate: jasmine.createSpy('navigate'),
  url: '/dashboard'
};

@Injectable()
class MockToasterService {
  private isToastShown = new BehaviorSubject({ visibility: false, status: null, data: null });
  get currentToastVisibility() {
    return this.isToastShown.asObservable();
  }
  showToast(status: ToastStatus, data: string) {
    this.isToastShown.next(<any>{ visibility: true, status, data });
  }
  hideToast() {
    this.isToastShown.next({ visibility: false, status: null, data: null });
  }
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let userServiceMock: any;
  let toastService: ToastHandlerService;
  function compileComponents() {
    TestBed.compileComponents();
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.debugElement.componentInstance;
    toastService = fixture.debugElement.injector.get(ToastHandlerService);
  }
  beforeEach(async () => {
    userServiceMock = jasmine.createSpyObj('UserService',
      ['login']);
    userServiceMock.login.and.returnValue(of({
      userId: '123',
    }));
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        HttpClientModule,
        FormsModule
      ],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: UserService, useValue: userServiceMock },
        { provide: ToastHandlerService, useClass: MockToasterService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  it('should create', () => {
    compileComponents();
    expect(component).toBeTruthy();
  });

  it('should call onLoginBtnClick', () => {
    compileComponents();
    const form = {
      valid: true
    } as NgForm;
    spyOn(component, 'loginApiCall')
    component.onLoginBtnClick(form);
    expect(component.loginApiCall).toHaveBeenCalled();
  });

  it('should call loginApiCall', () => {
    compileComponents();
    spyOn(toastService, 'showToast');
    spyOn(localStorage, 'setItem');
    spyOn(component, 'navToDashboard');
    component.loginApiCall();
    expect(toastService.showToast).toHaveBeenCalledWith(ToastStatus.SUCCESS, 'Welcome');
    expect(localStorage.setItem).toHaveBeenCalledWith('userId', '123');
    expect(component.navToDashboard).toHaveBeenCalled();
  });

  it('should call loginApiCall', () => {
    compileComponents();
    spyOn(toastService, 'showToast');
    userServiceMock.login.and.returnValue(of({ message: 'something went wrong' }));
    component.loginApiCall();
    expect(toastService.showToast).toHaveBeenCalledWith(ToastStatus.WARNING, 'something went wrong');
  });

  it('should call loginApiCall', () => {
    compileComponents();
    spyOn(toastService, 'showToast');
    userServiceMock.login.and.returnValue(throwError({ error: { message: 'Fake Error' } }));
    component.loginApiCall();
    expect(toastService.showToast).toHaveBeenCalledWith(ToastStatus.ERROR, 'Fake Error');
  });

  it('should call navToDashboard', () => {
    compileComponents();
    component.navToDashboard();
    expect(mockRouter.navigate).toHaveBeenCalledWith([ROUTE_PATHS.DASHBOARD]);
  });

});
