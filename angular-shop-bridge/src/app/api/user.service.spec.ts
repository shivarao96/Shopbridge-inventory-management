import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { getTestBed, TestBed } from '@angular/core/testing';
import { InventoryService } from './inventory.service';

import { UserService } from './user.service';

describe('UserService', () => {
  let injector: TestBed;
  let service: UserService;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserService],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [
        HttpClientTestingModule
      ]
    });
    injector = getTestBed();
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be login', () => {
    const mockInfo = { message: 'some mock data' };
    service.login({}).subscribe((res) => {
      expect(res).toEqual(mockInfo);
    });
    const req = httpMock.expectOne('http://localhost:9000/user/login');
    expect(req.request.method).toEqual('POST');
    req.flush(mockInfo);
    httpMock.verify();
  });
  it('should be login when body is empty', () => {
    try {
      service.login(undefined)
    } catch (e) {
      expect(e).toEqual(Error('login body was missing.'));
    }
  });
  it('should be register', () => {
    const mockInfo = { message: 'some mock data' };
    service.register({}).subscribe((res) => {
      expect(res).toEqual(mockInfo);
    });
    const req = httpMock.expectOne('http://localhost:9000/user');
    expect(req.request.method).toEqual('POST');
    req.flush(mockInfo);
    httpMock.verify();
  });
  it('should be register when body is empty', () => {
    try {
      service.register(undefined)
    } catch (e) {
      expect(e).toEqual(Error('register body was missing.'));
    }
  });
  it('should call isUserLoggedIn on false condition', () => {
    localStorage.removeItem('userId');
    spyOn(localStorage, 'getItem');
    const result = service.isUserLoggedIn()
    expect(result).toEqual(false);
    expect(localStorage.getItem).toHaveBeenCalledWith('userId');
  })
  it('should call isUserLoggedIn on true condition', () => {
    localStorage.removeItem('userId');
    localStorage.setItem('userId', '123');
    spyOn(localStorage, 'getItem');
    const result = service.isUserLoggedIn()
    expect(result).toEqual(false);
    expect(localStorage.getItem).toHaveBeenCalledWith('userId');
  })
});
