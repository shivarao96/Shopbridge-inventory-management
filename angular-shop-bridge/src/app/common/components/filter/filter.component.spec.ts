import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FilterComponent } from './filter.component';

const exampleFilterConfig = {
  sortConfig: {
    name: {
      label: 'Name',
      value: false,
      sortType: 'ascending'
    },
  },
  filterConfig: {
    name: {
      label: 'Name',
      value: false,
      key: 'name'
    }
  }
};

describe('FilterComponent', () => {
  let component: FilterComponent;
  let fixture: ComponentFixture<FilterComponent>;

  function compileComponents() {
    TestBed.compileComponents();
    fixture = TestBed.createComponent(FilterComponent);
    component = fixture.debugElement.componentInstance;
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FilterComponent],
      imports: []
    });
  }));

  it('should create', () => {
    compileComponents();
    expect(component).toBeTruthy();
  });

  it('should call applyFilters when only filter value is applied', () => {
    compileComponents();
    component.customFilterConfig = {
      sortConfig: {},
      filterConfig: {}
    };
    spyOn(component.filterValue, 'emit');
    const changesFilterConfigValue = JSON.parse(JSON.stringify(exampleFilterConfig));
    changesFilterConfigValue.filterConfig.name.value = true;
    component.customFilterConfig = changesFilterConfigValue;
    component.applyFilters();
    expect(component.filterValue.emit).toHaveBeenCalledWith(
      {
        sortConfig: {},
        filterConfig: { name: 'Name' }
      }
    );
  });

  it('should call applyFilters when only sortby value is applied', () => {
    compileComponents();
    spyOn(component.filterValue, 'emit');
    component.customFilterConfig = {
      sortConfig: {},
      filterConfig: {}
    };
    const changesFilterConfigValue = JSON.parse(JSON.stringify(exampleFilterConfig));
    changesFilterConfigValue.sortConfig.name.value = true;
    component.customFilterConfig = changesFilterConfigValue;
    component.applyFilters();
    expect(component.filterValue.emit).toHaveBeenCalledWith(
      {
        sortConfig: { name: 'ascending'},
        filterConfig: {}
      }
    );
  });

  it('should call setSortSelection', () => {
    compileComponents();
    component.customFilterConfig = {
      sortConfig: {
        name: {
          value: false
        },
        updatedOn: {
          value: true
        }
      },
      filterConfig: {}
    };
    component.setSortSelection('name', true);
    expect(component.customFilterConfig.sortConfig).toEqual(
      {
        name: {
          value: true
        },
        updatedOn: {
          value: false
        }
    }
    );
  });

  it('should call trackBy method', () => {
    compileComponents();
    const res = component.trackByMethod(4, {});
    expect(res).toEqual(4);
  });
});
