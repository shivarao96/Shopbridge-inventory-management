import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { SearchBarComponent } from './search-bar.component';

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;
  function compileComponents() {
    TestBed.compileComponents();
    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.debugElement.componentInstance;
  }
  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [SearchBarComponent]
    });
  });

  it('should create', () => {
    compileComponents();
    expect(component).toBeTruthy();
  });

  it('should call suggestionValues', () => {
    compileComponents();
    component.openSuggestionUI = false;
    component.suggestionValues = ([{ mockValue: true }]);
    expect(component.openSuggestionUI).toEqual(true);
    expect(component.suggestions).toEqual([{ mockValue: true }]);
  });

  it('should call emitSuggestionVal', fakeAsync(() => {
    compileComponents();
    spyOn(component.suggestionQueryString, 'emit');
    spyOn(window, 'clearTimeout');
    spyOn(window, 'setTimeout').and.callThrough().and.returnValue(<any>{ newTimer: 'some mock vaue' });
    component.currentTimer = { timer: 'some mock value' };
    component.debouncingTime = 0;
    component.queriedString = 'item';
    component.emitSuggestionVal({
      code: 'keyA'
    });
    tick(0);
    // expect(component.suggestionQueryString.emit).toHaveBeenCalledWith('item');
    expect(setTimeout).toHaveBeenCalled();
    // expect(clearTimeout).toHaveBeenCalledWith(<any>{ newTimer: 'some mock value' });
    expect(clearTimeout).toHaveBeenCalledWith(<any>{ timer: 'some mock value' });
  }));

  it('should call suggestionValues', () => {
    compileComponents();
    component.queriedString = 'item'
    spyOn(component.searchValue, 'emit');
    component.search();
    expect(component.searchValue.emit).toHaveBeenCalledWith('item');
  });

  it('should call clearSearchField', () => {
    compileComponents();
    component.queriedString = 'item'
    spyOn(component.searchValue, 'emit');
    component.clearSearchField();
    expect(component.queriedString).toEqual('');
    expect(component.searchValue.emit).toHaveBeenCalledWith('');
  });

  it('should call suggestionClicked', () => {
    compileComponents();
    spyOn(component.suggestionSelected, 'emit');
    component.suggestionClicked('item');
    expect(component.queriedString).toEqual('');
    expect(component.openSuggestionUI).toEqual(false);
    expect(component.suggestionSelected.emit).toHaveBeenCalledWith('item');
  });

});
