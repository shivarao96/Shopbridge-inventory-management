import { HttpClientModule } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ROUTE_PATHS } from '@app/common/constants/routing.constant';
import { HeaderComponent } from './header.component';

const mockRouter = {
  navigate: jasmine.createSpy('navigate'),
  url: '/dashboard'
};

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  function compileComponents() {
    TestBed.compileComponents();
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.debugElement.componentInstance;
  }
  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      imports: [
        HttpClientModule,
      ],
      providers: [
        { provide: Router, useValue: mockRouter },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    });
  });

  it('should call navToDashboard', () => {
    compileComponents();
    component.navToDashboard();
    expect(mockRouter.navigate).toHaveBeenCalledWith([ROUTE_PATHS.DASHBOARD]);
  });

  it('should call logout', () => {
    compileComponents();
    spyOn(localStorage, 'removeItem');
    component.logout();
    expect(localStorage.removeItem).toHaveBeenCalledWith('userId');
    expect(mockRouter.navigate).toHaveBeenCalledWith([ROUTE_PATHS.LOGIN]);
  });
});
