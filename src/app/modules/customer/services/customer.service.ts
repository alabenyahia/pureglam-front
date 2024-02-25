import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {StorageService} from "../../../auth/services/storage/storage.service";

const BASIC_URL = "http://localhost:8080";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) {}

  getStoresByCustomerId() {
    return this.http.get(BASIC_URL + "/api/customer/store/all/bycustomer", {
      headers: this.createAuthorizationHeader()
    });
  }

  addCustomerStore(customerStoreDto: any) {
    return this.http.post(BASIC_URL + "/api/customer/store/add", customerStoreDto, {
      headers: this.createAuthorizationHeader()
    });
  }

  getCustomerStoreById(storeId: number) {
    return this.http.get(BASIC_URL + "/api/customer/store/" + storeId, {
      headers: this.createAuthorizationHeader()
    });
  }

  updateCustomerStore(storeId: number, customerStoreDto: any) {
    return this.http.put(BASIC_URL + "/api/customer/store/" + storeId, customerStoreDto, {
      headers: this.createAuthorizationHeader()
    });
  }

  deleteCustomerStore(storeId: number) {
    return this.http.delete(BASIC_URL + "/api/customer/store/" + storeId, {
      headers: this.createAuthorizationHeader()
    });
  }

  getServicesByStoreId(storeId: number) {
    return this.http.get(BASIC_URL + "/api/customer/service/all/bystore/" + storeId, {
      headers: this.createAuthorizationHeader()
    });
  }

  getCustomerStoreServiceById(storeServiceId: number) {
    return this.http.get(BASIC_URL + "/api/customer/service/" + storeServiceId, {
      headers: this.createAuthorizationHeader()
    });
  }

  addCustomerStoreService(customerStoreServiceDto: any) {
    return this.http.post(BASIC_URL + "/api/customer/service/add", customerStoreServiceDto, {
      headers: this.createAuthorizationHeader()
    });
  }


  deleteCustomerStoreService(storeServiceId: number) {
    return this.http.delete(BASIC_URL + "/api/customer/service/" + storeServiceId, {
      headers: this.createAuthorizationHeader()
    });
  }

  updateCustomerStoreService(storeId: number, customerStoreServiceDto: any) {
    return this.http.put(BASIC_URL + "/api/customer/service/" + storeId, customerStoreServiceDto, {
      headers: this.createAuthorizationHeader()
    });
  }


  createAuthorizationHeader(): HttpHeaders {
    let authHeaders: HttpHeaders = new HttpHeaders();
    authHeaders = authHeaders.set(
      'Authorization', 'Bearer ' + StorageService.getCustomerToken()
    );
    return authHeaders;
  }
}
