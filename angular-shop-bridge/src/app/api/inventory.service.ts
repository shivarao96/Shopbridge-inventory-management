import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class InventoryService {

  basePath = 'http://localhost:9000'
  constructor(
    private httpClient: HttpClient
  ) { }

  createInventoryItem(userId: string, body: any): Observable<any> {
    /**istanbul ignore else */
    if(!Boolean(userId)) {
      throw new Error('userId is missing !.');
    }
    /**istanbul ignore else */
    if (!Boolean(body)) {
      throw new Error('Inventory item body missing !.');
    }
    const headers = new HttpHeaders({'userid': userId});
    return this.httpClient.request<any>('post', `${this.basePath}/inventory`,
      {
        body: body,
        headers
      }
    );
  }

  getInventoryList(search?: string, offset?: number, limit?: number, filterVal?: string[], sortbyVal?: string, sortbymethod?: string ): Observable<any> {
    let queryParameters = new HttpParams();
    /**istanbul ignore else */
    if (Boolean(offset)) {
      queryParameters = queryParameters.set('offset', (offset as any - 1));
    }
    /**istanbul ignore else */
    if (Boolean(limit)) {
      queryParameters = queryParameters.set('limit', limit as any);
    }
    /**istanbul ignore else */
    if (Boolean(search)) {
      queryParameters = queryParameters.set('search', search as any);
    }
    /**istanbul ignore else */
    if (Boolean(filterVal)) {
      queryParameters = queryParameters.set('filterVal', filterVal as any);
    }
    /**istanbul ignore else */
    if (Boolean(sortbyVal)) {
      queryParameters = queryParameters.set('sortbyVal', sortbyVal as any);
    }
    /**istanbul ignore else */
    if (Boolean(sortbymethod)) {
      queryParameters = queryParameters.set('sortbymethod', sortbymethod as any);
    }
    /**istanbul ignore else */
    return this.httpClient.request<any>('get', `${this.basePath}/inventory`, 
      {
        params: queryParameters
      }
    );
  }

  getInventoryItem(itemId: string): Observable<any> {
    /**istanbul ignore else */
    if (!Boolean(itemId)) {
      throw new Error('item id is missing');
    }
    return this.httpClient.request<any>('get', `${this.basePath}/inventory/${encodeURIComponent(String(itemId))}`);
  }

  updateInventoryItem(itemId: string, body: any): Observable<any> {
    /**istanbul ignore else */
    if (!Boolean(itemId)) {
      throw new Error('item id is missing');
    }
    /**istanbul ignore else */
    if(!Boolean(body)) {
      throw new Error('body is missing');
    }
    return this.httpClient.request<any>('put', `${this.basePath}/inventory/${encodeURIComponent(String(itemId))}`, 
      {
        body: body
      }
    );
  }

  deleteInventoryItem(itemId: string): Observable<any> {
    /**istanbul ignore else */
    if (!Boolean(itemId)) {
      throw new Error('item id is missing');
    }
    return this.httpClient.request<any>('delete', `${this.basePath}/inventory/${encodeURIComponent(String(itemId))}`);
  }
}
