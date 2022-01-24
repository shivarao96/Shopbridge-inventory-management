import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {

  pages: number[] = [];
  pageNumber: number = 1;

  @Input() count = 0;
  @Input() recordsPerPage = 0;

  @Output() onPageChange: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnChanges(): any {
    const pageCount = this.getPageCount();
    this.pages = this.getArrayOfPage(pageCount);
    this.pageNumber = 1;
    this.onPageChange.emit(1);
  }

  getPageCount(): number {
    let totalPage = 0;

    /**istanbul ignore else */
    if (this.count > 0 && this.recordsPerPage > 0) {
      const pageCount = this.count / this.recordsPerPage;
      const roundedPageCount = Math.floor(pageCount);

      totalPage = roundedPageCount < pageCount ? roundedPageCount + 1 : roundedPageCount;
    }

    return totalPage;
  }

  getArrayOfPage(pageCount: number): number[] {
    const pageArray = [];
    /**istanbul ignore else */
    if (pageCount > 0) {
      for (let i = 1; i <= pageCount; i++) {
        pageArray.push(i);
      }
    }
    return pageArray;
  }

  onClickPage(pageNumber: number): void {
    if (pageNumber >= 1 && pageNumber <= this.pages.length) {
      this.pageNumber = pageNumber;
      this.onPageChange.emit(this.pageNumber);
    }
  }

}
