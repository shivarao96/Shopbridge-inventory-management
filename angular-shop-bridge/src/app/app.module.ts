import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CommonAppModule } from './common-app.module';
import { PageNotFoundComponent } from './views/page-not-found/page-not-found.component';
import { AppRoutingModule } from './app-routing.module';
import { ApiModule } from './api/api.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoadingInterceptor } from './common/interceptor/loading.interceptor';
import { AuthGuard } from './common/guard/auth.guard';
import { AuthPageBlockGuard } from './common/guard/auth-page-block.guard';

const IMPORT_EXPORT_COMPONENTS: any[] = [
  AppComponent,
  PageNotFoundComponent
];

const IMPORT_EXPORT_DIRECIVES: any[] = [

];

const IMPORT_EXPORT_PIPES: any[] = [

];

const IMPORT_MODULES = [
    BrowserModule,
    AppRoutingModule,
    CommonAppModule,
    ApiModule,
    HttpClientModule
];

const PROVIDERS: any[] = [
  AuthGuard,
  AuthPageBlockGuard,
  { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
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
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
