import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { ThrobberHandlerService } from '../services/throbber-handler.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  totalApiCalls = 0;
  constructor(private throbberService: ThrobberHandlerService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.totalApiCalls++;
    this.throbberService.toggleThrobber(true);

    return next.handle(request).pipe(
      finalize(() => {
        this.totalApiCalls--;
        if(this.totalApiCalls === 0) {
          this.throbberService.toggleThrobber(false);
        }
      })
    );
  }
}
