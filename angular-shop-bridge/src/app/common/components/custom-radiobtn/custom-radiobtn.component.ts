import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-custom-radiobtn',
  templateUrl: './custom-radiobtn.component.html',
  styleUrls: ['./custom-radiobtn.component.scss']
})
export class CustomRadiobtnComponent {

  @Input() radioBtnId: number | string | unknown | undefined;
  @Input() customRadioBtnLabel: string | undefined;
  @Input() customRadioBtnStatus: boolean | undefined;
  @Output() readonly customRadioBtnStatusChange: EventEmitter<boolean> = new EventEmitter<boolean>();


  constructor() { }
}
