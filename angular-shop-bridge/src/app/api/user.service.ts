import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable()
export class UserService {

  basePath = 'http://localhost:9000/user'
  constructor(
    private httpClient: HttpClient
  ) { }

  login(body: any): Observable<any> {
    /**istanbul ignore else */
    if (!Boolean(body)) {
      throw new Error('login body was missing.');
    }
    return this.httpClient.request<any>('post', `${this.basePath}/login`,
      {
        body: body,
      }
    );
  }

  register(body: any): Observable<any> {
    /**istanbul ignore else */
    if (!Boolean(body)) {
      throw new Error('register body was missing.');
    }
    return this.httpClient.request<any>('post', `${this.basePath}`,
      {
        body: body,
      }
    );
  }

  isUserLoggedIn() {
    return Boolean(localStorage.getItem('userId'));
  }
}
