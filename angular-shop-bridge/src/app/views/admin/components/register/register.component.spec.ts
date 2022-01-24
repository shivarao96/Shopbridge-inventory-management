import { HttpClientModule } from '@angular/common/http';
import { Injectable, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '@app/api/user.service';
import { ROUTE_PATHS } from '@app/common/constants/routing.constant';
import { ToastHandlerService, ToastStatus } from '@app/common/services/toast-handler.service';
import { BehaviorSubject, of, throwError } from 'rxjs';
import { RegisterComponent } from './register.component';

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

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let userServiceMock: any;
  let toastService: ToastHandlerService;
  function compileComponents() {
    TestBed.compileComponents();
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.debugElement.componentInstance;
    toastService = fixture.debugElement.injector.get(ToastHandlerService);
  }
  beforeEach(async () => {
    userServiceMock = jasmine.createSpyObj('UserService',
      ['register']);
    userServiceMock.register.and.returnValue(of({
      message: 'successfully registered',
    }));
    TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
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
    })
  });

  it('should create', () => {
    compileComponents();
    expect(component).toBeTruthy();
  });
  it('should call onRegistrationBtnClick', () => {
    compileComponents();
    const form = {
      valid: true
    } as NgForm;
    spyOn(component, 'registrationApiCall')
    component.onRegistrationBtnClick(form);
    expect(component.registrationApiCall).toHaveBeenCalled();
  });

  it('should call registrationApiCall', () => {
    compileComponents();
    spyOn(toastService, 'showToast');
    spyOn(localStorage, 'setItem');
    spyOn(component, 'navToLogin');
    component.registrationApiCall();
    expect(toastService.showToast).toHaveBeenCalledWith(ToastStatus.SUCCESS, 'Successfully Registered !, please login again.');
    expect(component.navToLogin).toHaveBeenCalled();
  });


  it('should call registrationApiCall', () => {
    compileComponents();
    spyOn(toastService, 'showToast');
    userServiceMock.register.and.returnValue(throwError({ error: { message: 'Fake Error' } }));
    component.registrationApiCall();
    expect(toastService.showToast).toHaveBeenCalledWith(ToastStatus.ERROR, 'Fake Error');
  });

  it('should call navToDashboard', () => {
    compileComponents();
    component.navToLogin();
    expect(mockRouter.navigate).toHaveBeenCalledWith([ROUTE_PATHS.LOGIN]);
  });

});
