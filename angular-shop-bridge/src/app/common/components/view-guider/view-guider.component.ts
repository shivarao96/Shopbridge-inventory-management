import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-view-guider',
  templateUrl: './view-guider.component.html',
  styleUrls: ['./view-guider.component.scss']
})
export class ViewGuiderComponent {

  @Input() mappingObj: any | undefined;
  @Input() currentKey: string | undefined;
  @Output() readonly selectedKey: EventEmitter<any> = new  EventEmitter<any>();

  constructor() { }

  emitKeyOnClick(key: string) {
    this.selectedKey.emit(key);
  }

}
