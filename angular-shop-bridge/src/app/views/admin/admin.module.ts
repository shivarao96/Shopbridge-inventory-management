import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonAppModule } from "@app/common-app.module";
import { CheckEmailDirective } from "@app/common/directives/check-email.directive";
import { CheckPasswordDirective } from "@app/common/directives/check-password.directive";
import { AdminRoutingModule } from "./admin-routing.module";
import { AdminComponent } from "./admin.component";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";

const IMPORT_EXPORT_COMPONENTS: any[] = [
    AdminComponent,
    LoginComponent,
    RegisterComponent,
    CheckEmailDirective,
    CheckPasswordDirective
];

const IMPORT_EXPORT_DIRECIVES: any[] = [

];

const IMPORT_EXPORT_PIPES: any[] = [

];

const IMPORT_MODULES = [
    CommonModule,
    FormsModule,
    CommonAppModule,
    AdminRoutingModule,
];

const PROVIDERS: any[] = [

]

@NgModule({
    declarations: [
        ...IMPORT_EXPORT_COMPONENTS,
        ...IMPORT_EXPORT_DIRECIVES,
        ...IMPORT_EXPORT_PIPES,
    ],
    imports: [
        ...IMPORT_MODULES
    ],
    providers: [
        ...PROVIDERS
    ]
})
export class AdminModule {}