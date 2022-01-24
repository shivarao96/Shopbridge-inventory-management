import { Injectable } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ThrobberHandlerService } from '@app/common/services/throbber-handler.service';
import { BehaviorSubject } from 'rxjs';
import { ThrobberComponent } from './throbber.component';

@Injectable()
export class MockThrobberHandlerService {

  isLoading = new BehaviorSubject(true);

  get currentLoadingStatus() {
    return this.isLoading.asObservable();
  }

  toggleThrobber(visibility: boolean) { 
    this.isLoading.next(visibility);
  }

}

describe('ThrobberComponent', () => {
  let component: ThrobberComponent;
  let fixture: ComponentFixture<ThrobberComponent>;
  let throbberHandler: ThrobberHandlerService;
  function compileComponents() {
    TestBed.compileComponents();
    fixture = TestBed.createComponent(ThrobberComponent);
    component = fixture.debugElement.componentInstance;
    throbberHandler = fixture.debugElement.injector.get(ThrobberHandlerService);
  }
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ThrobberComponent],
      providers: [
        { provide: ThrobberHandlerService, useValue: MockThrobberHandlerService }
      ]
    });
  }));

  it('should create', () => {
    compileComponents();
    expect(component).toBeTruthy();
  });
  
});
