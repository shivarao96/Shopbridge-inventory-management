import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.scss']
})
export class OverlayComponent {

  @Output() readonly closeOverlay = new EventEmitter<boolean>();
  constructor() { }

  closeOverlayClicked(): void {
    this.closeOverlay.emit(true);
  }

}
