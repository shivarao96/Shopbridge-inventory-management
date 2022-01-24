import { HttpClientModule } from '@angular/common/http';
import { Injectable, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { InventoryService } from '@app/api/inventory.service';
import { ToastHandlerService, ToastStatus } from '@app/common/services/toast-handler.service';
import { BehaviorSubject, of, throwError } from 'rxjs';
import { InventoryComponent } from './inventory.component';

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

describe('InventoryComponent', () => {
  let component: InventoryComponent;
  let fixture: ComponentFixture<InventoryComponent>;
  let inventoryServiceMock: any;
  let toastService: ToastHandlerService;
  function compileComponents() {
    TestBed.compileComponents();
    fixture = TestBed.createComponent(InventoryComponent);
    component = fixture.debugElement.componentInstance;
    toastService = fixture.debugElement.injector.get(ToastHandlerService);
  }
  beforeEach(async () => {
    inventoryServiceMock = jasmine.createSpyObj('InventoryService',
      ['getInventoryList', 'deleteInventoryItem',]);
    inventoryServiceMock.getInventoryList.and.returnValue(of({
      data: [{ name: 'some name' }],
      count: 0
    }));
    inventoryServiceMock.deleteInventoryItem.and.returnValue(of({
      message: 'delete'
    }));
    TestBed.configureTestingModule({
      declarations: [InventoryComponent],
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

  it('should calll ngOnInit', () => {
    compileComponents();
    component.searchQuery = 'test';
    spyOn(component, 'getItemList');
    component.ngOnInit();
    expect(component.getItemList).toHaveBeenCalledWith('list', undefined, 'test');
  });

  it('should calll reloadTheList', () => {
    compileComponents();
    component.searchQuery = 'test';
    spyOn(component, 'getItemList').and.callFake((a, b, c) => {
      b();
    });
    component.reloadTheList();
    expect(component.getItemList).toHaveBeenCalled();
    expect(component.reloadTheUI).toEqual(false);
  });

  it('should call getItemList', () => {
    compileComponents();
    component.apiInit = false;
    component.filterVal = ['test'];
    component.sortbyVal = 'createdOn';
    component.sortbymethod = 'desc';
    component.getItemList(
      'list',
      () => { },
      'test'
    );
    expect(component.itemList).toEqual([{ name: 'some name' }]);
    expect(component.totalItemCount).toEqual(0);
    expect(component.apiInit).toEqual(true);
  });

  it('should call getItemList', () => {
    compileComponents();
    component.apiInit = false;
    component.filterVal = ['test'];
    component.sortbyVal = 'createdOn';
    component.sortbymethod = 'desc';
    component.getItemList(
      'suggestion',
      undefined,
      ''
    );
    expect(component.currentSuggestionValues).toEqual([{ name: 'some name', value: 'some name' }]);
  });

  it('should call getItemList', () => {
    compileComponents();
    spyOn(toastService, 'showToast');
    inventoryServiceMock.getInventoryList.and.returnValue(of(undefined));
    component.getItemList(
      'list',
      () => { },
      'test'
    );
    expect(toastService.showToast).toHaveBeenCalledWith(
      ToastStatus.ERROR,
      'No result Found'
    );
  });

  it('should call getItemList', () => {
    compileComponents();
    spyOn(toastService, 'showToast');
    inventoryServiceMock.getInventoryList.and.returnValue(throwError({ error: { message: 'Fake Error' } }));
    component.getItemList(
      'list',
      () => { },
      'test'
    );
    expect(toastService.showToast).toHaveBeenCalledWith(
      ToastStatus.ERROR,
      'Fake Error'
    );
  });

  it('should calll fetchSuggestion', () => {
    compileComponents();
    spyOn(component, 'getItemList');
    component.fetchSuggestion('test');
    expect(component.getItemList).toHaveBeenCalledWith('suggestion', undefined, 'test');
  });

  it('should call displayActivePage', () => {
    compileComponents();
    spyOn(component, 'getItemList');
    component.searchQuery = 'test'
    component.currentPageNo = 2;
    component.displayActivePage(1);
    expect(component.currentPageNo).toEqual(1);
    expect(component.getItemList).toHaveBeenCalledWith('list', undefined, 'test');
  });

  it('should call closeOverlay', () => {
    compileComponents();
    component.closeOverlay();
    expect(component.openOverlayUI).toEqual(false);
  });

  it('should call addItem', () => {
    compileComponents();
    component.addItem();
    expect(component.currentAction).toEqual('add');
    expect(component.selectedItem).toEqual(undefined);
    expect(component.openOverlayUI).toEqual(true);
  });

  it('should call showItemDetail', () => {
    compileComponents();
    component.showItemDetail({});
    expect(component.currentAction).toEqual('detail');
    expect(component.selectedItem).toEqual({});
    expect(component.openOverlayUI).toEqual(true);
  });

  it('should call editItem', () => {
    compileComponents();
    component.editItem({});
    expect(component.currentAction).toEqual('edit');
    expect(component.selectedItem).toEqual({});
    expect(component.openOverlayUI).toEqual(true);
  });

  it('should call deleteItem', () => {
    compileComponents();
    spyOn(toastService, 'showToast');
    spyOn(component, 'getItemList');
    component.searchQuery = 'test';
    component.deleteItem('123');
    expect(toastService.showToast).toHaveBeenCalledWith(ToastStatus.SUCCESS, 'delete');
    expect(component.getItemList).toHaveBeenCalledWith('list', undefined, 'test');
  });

  it('should call deleteItem', () => {
    compileComponents();
    inventoryServiceMock.deleteInventoryItem.and.returnValue(throwError({ error: { message: 'Fake Error' } }));
    spyOn(toastService, 'showToast');
    component.searchQuery = 'test';
    component.deleteItem('123');
    expect(toastService.showToast).toHaveBeenCalledWith(ToastStatus.ERROR, 'Fake Error');
  });

  it('should call suggestionSelected', () => {
    compileComponents();
    component.suggestionSelected('some value');
    expect(component.currentAction).toEqual('detail');
    expect(component.selectedItem).toEqual('some value');
    expect(component.openOverlayUI).toEqual(true);
  });

  it('should call overlayAction', () => {
    compileComponents();
    spyOn(component, 'reloadTheList');
    component.overlayAction();
    expect(component.openOverlayUI).toEqual(false);
    expect(component.reloadTheList).toHaveBeenCalled();
  });

  it('should call searchByValue', () => {
    compileComponents();
    spyOn(component, 'getItemList');
    component.searchByValue('test');
    expect(component.searchQuery).toEqual('test');
    expect(component.getItemList).toHaveBeenCalledWith('list', undefined, 'test');
  });

  it('should call filterAction', () => {
    compileComponents();
    spyOn(component, 'getItemList');
    component.searchQuery = 'test'
    const event = {
      filterConfig: {
        active: 'Active'
      },
      sortConfig: {
        createdOn: 'desc'
      }
    }
    component.filterAction(event);
    expect(component.filterVal).toEqual(['Active']);
    expect(component.sortbyVal).toEqual('createdOn');
    expect(component.sortbymethod).toEqual('desc');
    expect(component.getItemList).toHaveBeenCalledWith('list', undefined, 'test')
  });

});
