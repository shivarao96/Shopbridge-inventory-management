import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewGuiderComponent } from './view-guider.component';

describe('ViewGuiderComponent', () => {
  let component: ViewGuiderComponent;
  let fixture: ComponentFixture<ViewGuiderComponent>;
  function compileComponents() {
    TestBed.compileComponents();
    fixture = TestBed.createComponent(ViewGuiderComponent);
    component = fixture.debugElement.componentInstance;
  }
  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [ ViewGuiderComponent ]
    });
  });

  it('should create', () => {
    compileComponents();
    expect(component).toBeTruthy();
  });

  it('should call emitKeyOnClick', () => {
    compileComponents();
    spyOn(component.selectedKey, 'emit');
    component.emitKeyOnClick('some value');
    expect(component.selectedKey.emit).toHaveBeenCalledWith('some value');
  });
});
