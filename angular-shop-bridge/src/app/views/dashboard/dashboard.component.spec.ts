import { HttpClientModule } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NavigationEnd, NavigationExtras, Router } from '@angular/router';
import { ROUTE_PATHS } from '@app/common/constants/routing.constant';
import { Observable } from 'rxjs';
import { DashboardComponent } from './dashboard.component';

const mockRouter = {
  navigate: jasmine.createSpy('navigate'),
  url: '/dashboard'
};


describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  function compileComponents() {
    TestBed.compileComponents();
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.debugElement.componentInstance;
  }
  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [ DashboardComponent ],
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

  it('should call ngOnInit', () =>{
    class MockServices {
      public url = 'mock';
      public ne = new NavigationEnd(0,
        '/dashboard',
        '/dashboard'
      );
      public events = new Observable(observer => {
        observer.next(this.ne);
        observer.complete();
      });
      navigate(commands: any[], extras?: NavigationExtras): any { }
    }
    TestBed.overrideProvider(Router, { useValue: new MockServices() });
    compileComponents();
    spyOn(component, 'setCurrentAction');
    component.ngOnInit();
    expect(component.setCurrentAction).toHaveBeenCalledWith('mock');
    expect(component.showInfoViewer).toEqual(true);
    expect(component.currentKey).toEqual('');
  });
  it('should call ngOnInit', () =>{
    class MockServices {
      public url = 'mock';
      public ne = new NavigationEnd(0,
        '/dashboard/inventory',
        '/dashboard/inventory'
      );
      public events = new Observable(observer => {
        observer.next(this.ne);
        observer.complete();
      });
      navigate(commands: any[], extras?: NavigationExtras): any { }
    }
    TestBed.overrideProvider(Router, { useValue: new MockServices() });
    compileComponents();
    spyOn(component, 'setCurrentAction');
    component.ngOnInit();
    expect(component.setCurrentAction).toHaveBeenCalledWith('mock');
    expect(component.setCurrentAction).toHaveBeenCalledWith('/dashboard/inventory');
  });

  it('should call setCurrentAction', () => {
    compileComponents();
    component.setCurrentAction('/dashboard/metrics');
    expect(component.currentKey ).toEqual('metrics');
    expect(component.showInfoViewer ).toEqual(false)
  });

  it('should call setCurrentAction', () => {
    compileComponents();
    component.setCurrentAction('/dashboard/inventory');
    expect(component.currentKey).toEqual('inventory');
    expect(component.showInfoViewer ).toEqual(false)
  });

  it('should call setCurrentAction', () => {
    compileComponents();
    component.setCurrentAction('/test');
    expect(component.showInfoViewer ).toEqual(false)
  });

  it('should call navBasedOnGuider', () => {
    compileComponents();
    component.navBasedOnGuider('metrics');
    expect(component.currentKey ).toEqual('metrics');
    expect(mockRouter.navigate).toHaveBeenCalledWith([ROUTE_PATHS.DASHBOARD, ROUTE_PATHS.DASHBOARD_METRICS])
  });

  it('should call navBasedOnGuider', () => {
    compileComponents();
    component.navBasedOnGuider('inventory');
    expect(component.currentKey ).toEqual('inventory');
    expect(mockRouter.navigate).toHaveBeenCalledWith([ROUTE_PATHS.DASHBOARD, ROUTE_PATHS.DASHBOARD_INVENTORY])
  });

  it('should call navBasedOnGuider', () => {
    compileComponents();
    component.navBasedOnGuider('random');
    expect(component.currentKey ).toEqual('random');
  });

});
