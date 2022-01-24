import { HttpClientModule } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NavigationEnd, NavigationExtras, Router } from '@angular/router';
import { ROUTE_PATHS } from '@app/common/constants/routing.constant';
import { Observable } from 'rxjs';
import { AdminComponent, CurrentAction } from './admin.component';

const mockRouter = {
  navigate: jasmine.createSpy('navigate'),
  url: '/dashboard'
};

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;
  function compileComponents() {
    TestBed.compileComponents()
    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.debugElement.componentInstance;
  }
  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [ AdminComponent ],
      imports: [
        HttpClientModule,
      ],
      providers: [
        { provide: Router, useValue: mockRouter },
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  it('should create', () => {
    compileComponents();
    expect(component).toBeTruthy();
  });

  it('should call ngOnInit', () =>{
    class MockServices {
      public url = 'mock';
      public ne = new NavigationEnd(0,
        '/',
        '/'
      );
      public events = new Observable(observer => {
        observer.next(this.ne);
        observer.complete();
      });
      navigate(commands: any[], extras?: NavigationExtras): any { }
    }
    TestBed.overrideProvider(Router, { useValue: new MockServices() });
    compileComponents();
    spyOn(component, 'setCurrentAction');
    component.ngOnInit();
    expect(component.setCurrentAction).toHaveBeenCalledWith('mock');
    expect(component.showLandingButton).toEqual(true);
    expect(component.currentSection).toEqual('');
  });

  it('should call ngOnInit', () =>{
    class MockServices {
      public url = 'mock';
      public ne = new NavigationEnd(0,
        '/login',
        '/login'
      );
      public events = new Observable(observer => {
        observer.next(this.ne);
        observer.complete();
      });
      navigate(commands: any[], extras?: NavigationExtras): any { }
    }
    TestBed.overrideProvider(Router, { useValue: new MockServices() });
    compileComponents();
    spyOn(component, 'setCurrentAction');
    component.ngOnInit();
    expect(component.setCurrentAction).toHaveBeenCalledWith('mock');
    expect(component.setCurrentAction).toHaveBeenCalledWith('/login');
  });

  it('should call navToLogin', () => {
    compileComponents();
    component.navTologin();
    expect(mockRouter.navigate).toHaveBeenCalledWith([ROUTE_PATHS.LOGIN]);
  });

  it('should call navToRegister', () => {
    compileComponents();
    component.navToRegister();
    expect(mockRouter.navigate).toHaveBeenCalledWith([ROUTE_PATHS.REGISTER]);
  });

  it('should call setCurrentAction', () => {
    compileComponents();
    component.setCurrentAction('/login');
    expect(component.currentSection).toEqual(CurrentAction.Login)
    expect(component.showLandingButton).toEqual(false)
  });

  it('should call setCurrentAction', () => {
    compileComponents();
    component.setCurrentAction('/register');
    expect(component.currentSection).toEqual(CurrentAction.Register)
    expect(component.showLandingButton).toEqual(false)
  });

  it('should call setCurrentAction', () => {
    compileComponents();
    component.setCurrentAction('/test');
    expect(component.showLandingButton).toEqual(false)
  });

  it('should call ngOnDestroy', () => {
    compileComponents();
    spyOn(component.routeUnsubscriber, 'unsubscribe');
    component.ngOnDestroy();
    expect(component.routeUnsubscriber.unsubscribe).toHaveBeenCalled();
  });

});
