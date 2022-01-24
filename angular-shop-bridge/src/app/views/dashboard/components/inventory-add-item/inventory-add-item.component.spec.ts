import { HttpClientModule } from '@angular/common/http';
import { Injectable, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, NgForm } from '@angular/forms';
import { InventoryService } from '@app/api/inventory.service';
import { ToastHandlerService, ToastStatus } from '@app/common/services/toast-handler.service';
import { BehaviorSubject, of, throwError } from 'rxjs';
import { InventoryAddItemComponent } from './inventory-add-item.component';

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


describe('InventoryAddItemComponent', () => {
  let component: InventoryAddItemComponent;
  let fixture: ComponentFixture<InventoryAddItemComponent>;
  let inventoryServiceMock: any;
  let toastService: ToastHandlerService;
  function compileComponents() {
    TestBed.compileComponents();
    fixture = TestBed.createComponent(InventoryAddItemComponent);
    component = fixture.debugElement.componentInstance;
    toastService = fixture.debugElement.injector.get(ToastHandlerService);
  }
  beforeEach(async () => {
    inventoryServiceMock = jasmine.createSpyObj('InventoryService',
      ['createInventoryItem', 'updateInventoryItem']);
    inventoryServiceMock.createInventoryItem.and.returnValue(of({
      message: 'created'
    }));
    inventoryServiceMock.updateInventoryItem.and.returnValue(of({
      message: 'updated'
    }));
    TestBed.configureTestingModule({
      declarations: [ InventoryAddItemComponent ],
      imports: [
        HttpClientModule,
        FormsModule
      ],
      providers: [
        { provide: InventoryService, useValue: inventoryServiceMock },
        { provide: ToastHandlerService, useClass: MockToasterService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  it('should create', () => {
    compileComponents();
    expect(component).toBeTruthy();
  });


  it('should call itemInfo', () => {
    compileComponents();
    component.itemInfo = {id: '123', imgUrl: 'abcd'}
    expect(component.itemId).toEqual('123'); 
    expect(component.uploadedImage).toEqual(<any>'abcd'); 
    expect(component.itemModel).toEqual(<any>{id: '123', imgUrl: 'abcd'}); 
  });

  it('should call onActionButtonClick on add implementation', () => {
    compileComponents();
    spyOn(component, 'addNewItem');
    component.implementationInfo = 'add'
    component.onActionButtonClick(<NgForm>{valid: true});
    expect(component.addNewItem).toHaveBeenCalled();
  });

  it('should call onActionButtonClick on edit impelemtation', () => {
    compileComponents();
    spyOn(component, 'editNewItem');
    component.implementationInfo = 'edit'
    component.onActionButtonClick(<NgForm>{valid: true});
    expect(component.editNewItem).toHaveBeenCalled();
  });

  it('should call fileUpload invalid format', () => {
    compileComponents();
    spyOn(toastService, 'showToast');
    const mockEvent = {
      target: {
        files: [
          new File([''], 'filename', { type: 'image/svg' }) as File
        ]
      }
    };
    component.invalidFileFormatError = false;
    component.fileUpload(mockEvent as any);
    expect(toastService.showToast).toHaveBeenCalledWith(
      ToastStatus.ERROR,
      'Invalid file format !, please upload file with following format(PNG, JPG, JPEG)'
    );
  });

  it('should call fileUpload and valid format', () => {
    compileComponents();
    const mockEvent = {
      target: {
        files: [
          new File([''], 'filename', { type: 'image/png' }) as File
        ]
      }
    };
    const reader: FileReader = jasmine.createSpyObj('FileReader', ['readAsDataURL', 'onload']);
    spyOn(window as any, 'FileReader').and.returnValue(reader).and.callThrough();
    spyOn(component.reader, 'readAsDataURL').and.callThrough();
    component.invalidFileFormatError = true;
    component.fileUpload(mockEvent as any);
    expect(component.reader.readAsDataURL).toHaveBeenCalledWith(mockEvent.target.files[0]);
    expect(component.uploadedImage).toEqual(reader.result as ArrayBuffer);
  });

  it('should call addNewItem on success state', () => {
    localStorage.setItem('userId', '123');
    compileComponents();
    spyOn(toastService, 'showToast');
    spyOn(localStorage, 'getItem');
    spyOn(component.actionEmition, 'emit');
    component.addNewItem();
    expect(toastService.showToast).toHaveBeenCalledWith(ToastStatus.SUCCESS, 'created');
    expect(component.actionEmition.emit).toHaveBeenCalledWith(true);
    expect(localStorage.getItem).toHaveBeenCalledWith('userId');
  });

  it('should call addNewItem on error state', () => {
    localStorage.setItem('userId', '123');
    compileComponents();
    spyOn(toastService, 'showToast');
    spyOn(localStorage, 'getItem');
    inventoryServiceMock.createInventoryItem.and.returnValue(throwError({ error: { message: 'Fake Error' } }));
    component.addNewItem();
    expect(toastService.showToast).toHaveBeenCalledWith(ToastStatus.ERROR, 'Fake Error');
    expect(localStorage.getItem).toHaveBeenCalledWith('userId');
  });

  it('should call editNewItem on success state', () => {
    compileComponents();
    spyOn(toastService, 'showToast');
    spyOn(component.actionEmition, 'emit');
    component.editNewItem();
    expect(toastService.showToast).toHaveBeenCalledWith(ToastStatus.SUCCESS, 'updated');
    expect(component.actionEmition.emit).toHaveBeenCalledWith(true);
  });

  it('should call editNewItem on error state', () => {
    compileComponents();
    spyOn(toastService, 'showToast');
    inventoryServiceMock.updateInventoryItem.and.returnValue(throwError({ error: { message: 'Fake Error' } }));
    component.editNewItem();
    expect(toastService.showToast).toHaveBeenCalledWith(ToastStatus.ERROR, 'Fake Error');
  });

});
