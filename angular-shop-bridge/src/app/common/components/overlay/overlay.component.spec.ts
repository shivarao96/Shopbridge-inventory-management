import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { OverlayComponent } from './overlay.component';

describe('OverlayComponent', () => {
  let component: OverlayComponent;
  let fixture: ComponentFixture<OverlayComponent>;
  function compileComponents() {
    TestBed.compileComponents();
    fixture = TestBed.createComponent(OverlayComponent);
    component = fixture.debugElement.componentInstance;
  }
  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [ OverlayComponent ]
    });
  });

  it('should call closeOverlayClicked', () => {
    compileComponents();
    spyOn(component.closeOverlay, 'emit');
    component.closeOverlayClicked();
    expect(component.closeOverlay.emit).toHaveBeenCalledWith(true);
  });
});
