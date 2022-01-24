import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[appCheckEmail]',
  providers: [{provide: NG_VALIDATORS, useExisting: CheckEmailDirective, multi: true}]
})
export class CheckEmailDirective {

  constructor() { }

  validate(control: AbstractControl): { [key: string]: boolean } | null  {
    const regex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    const found = regex.test(control.value);
    return found ? null : { validateEmail: true };
  }

}
