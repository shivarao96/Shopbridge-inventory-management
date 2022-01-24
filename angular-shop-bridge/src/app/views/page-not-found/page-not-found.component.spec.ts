import { HttpClientModule } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ROUTE_PATHS } from '@app/common/constants/routing.constant';
import { PageNotFoundComponent } from './page-not-found.component';

const mockRouter = {
  navigate: jasmine.createSpy('navigate'),
  url: '/dashboard'
};

describe('PageNotFoundComponent', () => {
  let component: PageNotFoundComponent;
  let fixture: ComponentFixture<PageNotFoundComponent>;
  function compileComponents() {
    TestBed.compileComponents()
    fixture = TestBed.createComponent(PageNotFoundComponent);
    component = fixture.debugElement.componentInstance;
  }
  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [ PageNotFoundComponent ],
      imports: [
        HttpClientModule,
      ],
      providers: [
        { provide: Router, useValue: mockRouter },
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  it('should create', () => {
    compileComponents();
    expect(component).toBeTruthy();
  });

  it('should call navToDashboard', () => {
    compileComponents();
    component.navToDashboard();
    expect(mockRouter.navigate).toHaveBeenCalledWith([ROUTE_PATHS.DASHBOARD]);
  });
});
