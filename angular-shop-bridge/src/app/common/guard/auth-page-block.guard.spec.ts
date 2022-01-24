import { HttpClientModule } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { UserService } from '@app/api/user.service';
import { ROUTE_PATHS } from '../constants/routing.constant';
import { AuthPageBlockGuard } from './auth-page-block.guard';

const mockRouter = {
  navigate: jasmine.createSpy('navigate'),
  url: '/dashboard'
};

describe('AuthPageBlockGuard', () => {
  let guard: AuthPageBlockGuard;
  let userServiceMock: any;
  beforeEach(() => {
    userServiceMock = jasmine.createSpyObj('UserService',
      ['isUserLoggedIn']);
    userServiceMock.isUserLoggedIn.and.returnValue(true);
    TestBed.configureTestingModule({
      providers: [
        {provide: Router, useValue: mockRouter},
        {provide: UserService, useValue: userServiceMock}
      ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [
        HttpClientModule
      ]
    });
    guard = TestBed.inject(AuthPageBlockGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should be canActivate', () => {
    const result = guard.canActivate();
    expect(result).toEqual(false);
    expect(mockRouter.navigate).toHaveBeenCalledWith([ROUTE_PATHS.DASHBOARD]);
    expect(userServiceMock.isUserLoggedIn).toHaveBeenCalled();
  });

  it('should be canActivate', () => {
    userServiceMock.isUserLoggedIn.and.returnValue(false);
    const result = guard.canActivate();
    expect(result).toEqual(true);
    expect(userServiceMock.isUserLoggedIn).toHaveBeenCalled();
  });
});
