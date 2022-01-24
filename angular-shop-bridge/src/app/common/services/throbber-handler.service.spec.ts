import { NO_ERRORS_SCHEMA } from '@angular/core';
import { getTestBed, TestBed } from '@angular/core/testing';
import { ThrobberHandlerService } from './throbber-handler.service';

describe('ThrobberHandlerService', () => {
  let service: ThrobberHandlerService;
  let injector: TestBed;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ThrobberHandlerService],
      schemas: [NO_ERRORS_SCHEMA],
      imports: []
    });
    injector = getTestBed();
    service = TestBed.inject(ThrobberHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get toast status', done => {
    const result = service.currentLoadingStatus;
    result.subscribe(res => {
      expect(res).toEqual(false);
      done();
    });
  });

  it('should get toast status', done => {
    const result = service.currentLoadingStatus;
    service.toggleThrobber(true);
    result.subscribe(res => {
      expect(res).toEqual(true);
      done();
    });
  });
});
