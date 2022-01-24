import { identifierName } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent {

  openFilter: Boolean = false;

  @Input() customFilterConfig: any;
  @Output() readonly filterValue = new EventEmitter<FilterConfigDs>();

  constructor() { }

  applyFilters() {
    const appliedFilters: any = {
      sortConfig: {},
      filterConfig: {}
    };

    for (const key of Object.keys(this.customFilterConfig.filterConfig)) {
      if (this.customFilterConfig.filterConfig[key].value) {
        appliedFilters.filterConfig[key] = this.customFilterConfig.filterConfig[key].label;
      }
    }
    for (const key of Object.keys(this.customFilterConfig.sortConfig)) {
      if (this.customFilterConfig.sortConfig[key].value) {
        appliedFilters.sortConfig[key] = this.customFilterConfig.sortConfig[key].sortType;
      }
    }
    this.filterValue.emit(appliedFilters);
  }

  setSortSelection(selectedKey: string | any, val: boolean): void {
    for (const key of Object.keys(this.customFilterConfig.sortConfig)) {
      if (selectedKey === key) {
        this.customFilterConfig.sortConfig[selectedKey].value = val;
      } else {
        this.customFilterConfig.sortConfig[key].value = false;
      }
    }
  }

  trackByMethod(index: number, el: any): number {
    return index;
  }

}

interface FilterConfigDs {
  sortConfig: object;
  filterConfig: object;
}
