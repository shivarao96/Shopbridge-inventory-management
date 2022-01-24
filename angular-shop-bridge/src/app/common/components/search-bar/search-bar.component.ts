import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TimeoutInfo } from 'rxjs/internal/operators/timeout';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {
  queriedString: string = '';
  currentTimer: unknown | undefined = undefined;
  openSuggestionUI: boolean = false;
  suggestions: any[] = [];

  @Input() debouncingTime: number = 500;
  @Input() set suggestionValues(val: any) {
    /**istanbul ignore else */
    if(val) {
      this.openSuggestionUI = true;
      this.suggestions = val;
    }
  }
  @Output() readonly suggestionSelected: EventEmitter<any> = new EventEmitter<any>();
  @Output() readonly searchValue: EventEmitter<string> = new EventEmitter<string>();
  @Output() readonly suggestionQueryString: EventEmitter<string> = new EventEmitter<string>();
  constructor() { }

  emitSuggestionVal(event: any) {
    /**istanbul ignore else */
    if(event.code !== 'Enter') {
      clearTimeout(this.currentTimer as any);
      this.currentTimer = setTimeout(() => {
        /**istanbul ignore else */
        if(this.queriedString && this.queriedString.trim().length > 2) {
          this.suggestionQueryString.emit(this.queriedString);
        }
        clearTimeout(this.currentTimer as any);
      }, this.debouncingTime);
    }
  }

  search() {
    /**istanbul ignore else */
    if(Boolean(this.queriedString.trim())) {
      this.searchValue.emit(this.queriedString.trim());
    }
  }

  clearSearchField() {
    this.queriedString = '';
    this.searchValue.emit('');
  }

  suggestionClicked(value: any) {
    this.suggestionSelected.emit(value);
    this.openSuggestionUI = false;
  }

}