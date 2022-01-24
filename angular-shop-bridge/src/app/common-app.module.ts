import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastComponent } from '@app/common/components/toast/toast.component';
import { ThrobberComponent } from '@app/common/components/throbber/throbber.component';
import { OutsideClickDirective } from './common/directives/outside-click.directive';
import { CustomCheckboxComponent } from './common/components/custom-checkbox/custom-checkbox.component';
import { CustomRadiobtnComponent } from './common/components/custom-radiobtn/custom-radiobtn.component';
import { PaginationComponent } from './common/components/pagination/pagination.component';
import { OverlayComponent } from './common/components/overlay/overlay.component';


const IMPORT_EXPORT_COMPONENTS: any[] = [
    ToastComponent,
    ThrobberComponent,
    OutsideClickDirective,
    CustomCheckboxComponent,
    CustomRadiobtnComponent,
    PaginationComponent,
    OverlayComponent
];

const IMPORT_EXPORT_DIRECIVES: any[] = [

];

const IMPORT_EXPORT_PIPES: any[] = [

];

const IMPORT_MODULES = [
    CommonModule,
    FormsModule
];

const PROVIDERS: any[] = [

]

@NgModule({
  declarations: [
      ...IMPORT_EXPORT_COMPONENTS,
      ...IMPORT_EXPORT_DIRECIVES,
      ...IMPORT_EXPORT_PIPES
  ],
  imports: [
    ...IMPORT_MODULES
  ],
  exports: [
    ...IMPORT_EXPORT_COMPONENTS,
    ...IMPORT_EXPORT_DIRECIVES,
    ...IMPORT_EXPORT_PIPES
  ],
  providers: [
    ...PROVIDERS
  ]
})
export class CommonAppModule { }
