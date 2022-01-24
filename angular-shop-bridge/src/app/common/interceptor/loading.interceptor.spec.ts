import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { LoadingInterceptor } from './loading.interceptor';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ThrobberHandlerService } from '../services/throbber-handler.service';

@Injectable()
class MockApiService {
  public check(mdl: any): Observable<any> {
    return of({
      success: 'success'
    });
  }
}

describe('LoadingInterceptor', () => {
  let httpMock: HttpTestingController;
  let service: MockApiService;
  let interceptor: LoadingInterceptor;
  let httpClient: HttpClient;
  const throbberService = jasmine.createSpyObj('ThrobberHandlerService', ['toggleThrobber']);
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        LoadingInterceptor,
        MockApiService,
        { provide: ThrobberHandlerService, useValue: throbberService },
        { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true }
      ]
    });
    interceptor = TestBed.inject(LoadingInterceptor);
    service = TestBed.inject(MockApiService);
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should call toggleThrobber',  done => {
    httpClient.get('/error').subscribe(() => { }, () => {
      expect(throbberService.toggleThrobber).toHaveBeenCalledWith(true);
      done();
    });
    httpMock.expectOne('/error').error(new ErrorEvent('Unauthorized error'), {
      status: 400
    });
    expect(throbberService.toggleThrobber).toHaveBeenCalledWith(false);
    httpMock.verify();
  });
});
