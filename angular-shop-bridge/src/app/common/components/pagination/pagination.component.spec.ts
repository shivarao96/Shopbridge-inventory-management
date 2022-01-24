import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationComponent } from './pagination.component';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;
  function compileComponents() {
    TestBed.compileComponents();
    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.debugElement.componentInstance;
  }
  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [ PaginationComponent ]
    });
  });

  it('should call ngOnChanges', () => {
    compileComponents();
    spyOn(component, 'getPageCount').and.returnValue(1);
    spyOn(component, 'getArrayOfPage').and.returnValue([1]);
    spyOn(component.onPageChange, 'emit');
    component.ngOnChanges();
    expect(component.getPageCount).toHaveBeenCalled();
    expect(component.getArrayOfPage).toHaveBeenCalledWith(1);
    expect(component.pageNumber).toEqual(1);
    expect(component.onPageChange.emit).toHaveBeenCalledWith(1);
  });

  it('should call getPageCount', () => {
    compileComponents();
    component.count = 10;
    component.recordsPerPage = 5;
    const result = component.getPageCount();
    expect(result).toEqual(2);
  });

  it('should call getArrayOfPage', () => {
    compileComponents();
    const result = component.getArrayOfPage(2);
    expect(result).toEqual([1,2]);
  });

  it('should call onClickPage', () => {
    compileComponents();
    spyOn(component.onPageChange, 'emit');
    component.pages = [1,2];
    component.onClickPage(2);
    expect(component.pageNumber).toEqual(2);
    expect(component.onPageChange.emit).toHaveBeenCalledWith(2);
  });

});
