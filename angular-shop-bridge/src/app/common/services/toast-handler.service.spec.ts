import { TestBed, getTestBed } from '@angular/core/testing';
import { ToastHandlerService, ToastStatus } from './toast-handler.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ToastHandlerService', () => {
  let service: ToastHandlerService;
  let injector: TestBed;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ToastHandlerService],
      schemas: [NO_ERRORS_SCHEMA],
      imports: []
    });
    injector = getTestBed();
    service = TestBed.inject(ToastHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get toast status', done => {
    const result = service.currentToastVisibility();
    result.subscribe(res => {
      expect(res).toEqual([]);
      done();
    });
  });

  it('should get toast status and message ', done => {
    service.showToast(ToastStatus.SUCCESS, 'Testing');
    service.currentToastVisibility().subscribe(res => {
      expect(res).toEqual([
        {
          visibility: true,
          status: ToastStatus.SUCCESS,
          data: 'Testing',
          timerId: null
        }
      ]);
      done();
    });
  });

  it('should have call hidetoast and empty the toastArray', done => {
    const result = service.currentToastVisibility();
    service.hideToast();
    result.subscribe(res => {
      expect(res).toEqual([]);
      done();
    });
  });

  it('should call hideToast and remove the specific toast obj', done => {
    const result = service.currentToastVisibility();
    service.showToast(ToastStatus.ERROR, 'Checking');
    service.showToast(ToastStatus.SUCCESS, 'Testing');
    service.hideToast(0);
    result.subscribe(res => {
      expect(res).toEqual([
        {
          visibility: true,
          status: ToastStatus.SUCCESS,
          data: 'Testing',
          timerId: null
        }
      ]);
      done();
    });
  });

});
