import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appOutsideClick]'
})
export class OutsideClickDirective {

  @Output() readonly outsideClick: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

  @HostListener('document:mousedown', ['$event'])
  onClickEvent(event: MouseEvent): void {
    /**istanbul ignore else */
    if(!this.elemRef.nativeElement.contains(event.target)) {
      this.outsideClick.emit(event)
    }
  }

  constructor(private elemRef: ElementRef) { }

}
