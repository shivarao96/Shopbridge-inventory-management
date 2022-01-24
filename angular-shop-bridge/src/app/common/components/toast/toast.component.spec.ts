import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ToastComponent } from './toast.component';
import { ToastHandlerService, ToastStatus } from '@app/common/services/toast-handler.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';

@Injectable()
class MockToasterService {
  private toastShownInfoArray = new BehaviorSubject([]);
  currentToastVisibility() {
    return this.toastShownInfoArray.asObservable();
  }
  showToast(status: ToastStatus, data: string) {
    const currentValue = this.toastShownInfoArray.value;
    this.toastShownInfoArray.next(<any>[...currentValue, { visibility: true, status, data }]);
  }
  hideToast() {
    this.toastShownInfoArray.next([]);
  }
}


describe('ToastComponent', () => {
  let component: ToastComponent;
  let fixture: ComponentFixture<ToastComponent>;
  let mockToaster: any;

  function compileComponents() {
    TestBed.compileComponents();
    fixture = TestBed.createComponent(ToastComponent);
    component = fixture.debugElement.componentInstance;
  }

  beforeEach(async(() => {
    mockToaster = jasmine.createSpyObj('ToastHandlerService', ['currentToastVisibility', 'showToast', 'hideToast']);
    TestBed.configureTestingModule({
      declarations: [ToastComponent],
      imports: [],
      providers: [
        { provide: ToastHandlerService, useClass: MockToasterService }
      ]
    });
  }));

  it('should create', () => {
    compileComponents();
    expect(component).toBeTruthy();
  });

  it('should call ngOnInit when multiple toaster is present', fakeAsync(() => {
    compileComponents();
    spyOn(window, 'clearTimeout');
    const toastService = fixture.debugElement.injector.get(ToastHandlerService);
    spyOn(toastService, 'hideToast');
    spyOn(toastService, 'currentToastVisibility').and.returnValue(of([
      {
        visibility: true,
        status: ToastStatus.SUCCESS,
        data: 'Check',
        timerId: 32
      },
      {
        visibility: true,
        status: ToastStatus.ERROR,
        data: 'Check',
        timerId: 33
      }
    ]));
    component.ngOnInit();
    expect(clearTimeout).toHaveBeenCalled();
    expect(toastService.hideToast).toHaveBeenCalled();
    expect(toastService.hideToast).toHaveBeenCalledWith(0);
  }));

  it('should call ngOnInit when multiple toaster does not exist', fakeAsync(() => {
    compileComponents();
    spyOn(window, 'clearTimeout');
    spyOn(component, 'handleStatusimg').and.callThrough();
    const toastService = fixture.debugElement.injector.get(ToastHandlerService);
    spyOn(toastService, 'hideToast');
    spyOn(toastService, 'currentToastVisibility').and.returnValue(of([
      {
        visibility: true,
        status: ToastStatus.SUCCESS,
        data: 'Check'
      }
    ]));
    component.ngOnInit();
    expect(component.handleStatusimg).toHaveBeenCalled();
    expect(component.handleStatusimg).toHaveBeenCalledWith({
      visibility: true,
      status: ToastStatus.SUCCESS,
      data: 'Check'
    });
    expect(component.toastData).toEqual(
      {
        visibility: true,
        status: ToastStatus.SUCCESS,
        data: 'Check',
        img: 'assets/images/success-toast.png'
      }
    );
    tick(3000);
    expect(toastService.hideToast).toHaveBeenCalled();
  }));

  it('should call ngOnInit when toast array is empty', fakeAsync(() => {
    compileComponents();
    spyOn(component, 'close');
    const toastService = fixture.debugElement.injector.get(ToastHandlerService);
    spyOn(toastService, 'currentToastVisibility').and.returnValue(of([]));
    component.ngOnInit();
    expect(component.close).toHaveBeenCalled();
  }));

  it('should close toast message', () => {
    compileComponents();
    component.toastData = {
      visibility: true,
      status: ToastStatus.SUCCESS,
      data: 'Check',
      img: 'assets/images/success-toast.png'
    };
    component.close();
    expect(component.toastData.visibility).toBeFalsy();
  });

  it('should show success icon', () => {
    compileComponents();
    spyOn(component, 'handleStatusimg').and.callThrough();
    const result = component.handleStatusimg({ visibility: true, status: ToastStatus.SUCCESS, data: 'Check'});
    expect(result).toEqual(
      {
        visibility: true,
        status: ToastStatus.SUCCESS,
        data: 'Check',
        img: 'assets/images/success-toast.png'
      }
    );
  });

  it('should show error icon', () => {
    compileComponents();
    spyOn(component, 'handleStatusimg').and.callThrough();
    const result = component.handleStatusimg({ visibility: true, status: ToastStatus.ERROR, data: 'Check'});
    expect(result).toEqual(
      {
        visibility: true,
        status: ToastStatus.ERROR,
        data: 'Check',
        img: 'assets/images/error-toast.png'
      }
    );
  });

  it('should show warning icon', () => {
    compileComponents();
    spyOn(component, 'handleStatusimg').and.callThrough();
    const result = component.handleStatusimg({ visibility: true, status: ToastStatus.WARNING, data: 'Check'});
    expect(result).toEqual(
      {
        visibility: true,
        status: ToastStatus.WARNING,
        data: 'Check',
        img: 'assets/images/warning-toast.png'
      }
    );
  });

});
