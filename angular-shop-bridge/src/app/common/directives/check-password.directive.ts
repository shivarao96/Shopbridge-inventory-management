import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[appCheckPassword]',
  providers: [{provide: NG_VALIDATORS, useExisting: CheckPasswordDirective, multi: true}]
})
export class CheckPasswordDirective {

  constructor() { }

  validate(control: AbstractControl): { [key: string]: boolean } | null  {
    const regex = /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/;
    const found = regex.test(control.value);
    return found ? null : { validatePassword: true };
  }

}
