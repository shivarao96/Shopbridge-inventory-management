import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { getTestBed, TestBed } from '@angular/core/testing';

import { InventoryService } from './inventory.service';

describe('InventoryService', () => {
  let injector: TestBed;
  let service: InventoryService;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InventoryService],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [
        HttpClientTestingModule
      ]
    });
    injector = getTestBed();
    service = TestBed.inject(InventoryService);
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be createInventoryItem', () => {
    const mockInfo = { message: 'some mock data' };
    service.createInventoryItem('123', {}).subscribe((res) => {
      expect(res).toEqual(mockInfo);
    });
    const req = httpMock.expectOne('http://localhost:9000/inventory');
    expect(req.request.method).toEqual('POST');
    req.flush(mockInfo);
    httpMock.verify();
  });

  it('should be createInventoryItem when body is empty', () => {
    try {
      service.createInventoryItem('123', undefined)
    } catch (e) {
      expect(e).toEqual(Error('Inventory item body missing !.'));
    }
  });
  it('should be createInventoryItem when userid is empty', () => {
    try {
      service.createInventoryItem('', undefined)
    } catch (e) {
      expect(e).toEqual(Error('userId is missing !.'));
    }
  });

  it('should be deleteInventoryItem', () => {
    const mockInfo = { message: 'some mock data' };
    service.deleteInventoryItem('123').subscribe((res) => {
      expect(res).toEqual(mockInfo);
    });
    const req = httpMock.expectOne('http://localhost:9000/inventory/123');
    expect(req.request.method).toEqual('DELETE');
    req.flush(mockInfo);
    httpMock.verify();
  });

  it('should be deleteInventoryItem when itemId is empty', () => {
    try {
      service.deleteInventoryItem('')
    } catch (e) {
      expect(e).toEqual(Error('item id is missing'));
    }
  });

  it('should be updateInventoryItem', () => {
    const mockInfo = { message: 'some mock data' };
    service.updateInventoryItem('123', {}).subscribe((res) => {
      expect(res).toEqual(mockInfo);
    });
    const req = httpMock.expectOne('http://localhost:9000/inventory/123');
    expect(req.request.method).toEqual('PUT');
    req.flush(mockInfo);
    httpMock.verify();
  });

  it('should be updateInventoryItem when itemId is empty', () => {
    try {
      service.updateInventoryItem('', undefined)
    } catch (e) {
      expect(e).toEqual(Error('item id is missing'));
    }
  });

  it('should be updateInventoryItem when body is empty', () => {
    try {
      service.updateInventoryItem('123', undefined)
    } catch (e) {
      expect(e).toEqual(Error('body is missing'));
    }
  });

  it('should be getInventoryItem', () => {
    const mockInfo = { message: 'some mock data' };
    service.getInventoryItem('123').subscribe((res) => {
      expect(res).toEqual(mockInfo);
    });
    const req = httpMock.expectOne('http://localhost:9000/inventory/123');
    expect(req.request.method).toEqual('GET');
    req.flush(mockInfo);
    httpMock.verify();
  });

  it('should be getInventoryItem when itemId is empty', () => {
    try {
      service.getInventoryItem('')
    } catch (e) {
      expect(e).toEqual(Error('item id is missing'));
    }
  });

  it('should call getInventoryList', () => {
    const mockInfo = { message: 'some mock data' };
    service.getInventoryList(
      'item',
      1,
      10,
      ['Available'],
      'createdOn',
      'desc'
    ).subscribe((res) => {
      expect(res).toEqual(mockInfo);
    });
    const req = httpMock.expectOne('http://localhost:9000/inventory?offset=0&limit=10&search=item&filterVal=Available&sortbyVal=createdOn&sortbymethod=desc');
    expect(req.request.method).toEqual('GET');
    req.flush(mockInfo);
    httpMock.verify();
  });
});
