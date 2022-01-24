import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-custom-checkbox',
  templateUrl: './custom-checkbox.component.html',
  styleUrls: ['./custom-checkbox.component.scss']
})
export class CustomCheckboxComponent {

  @Input() checkBoxId: number | undefined;
  @Input() checkBoxLabel: string | undefined;
  @Input() checkBoxStatus: boolean | undefined;
  @Input() set resetCheckbox(val: boolean) {
    /*istanbul ignore else*/
    if (val) {
      this.checkBoxStatus = false;
    }
  }
  @Output() readonly checkBoxStatusChange:EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() {
  }

}
