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


  createAuthorizationHeader(): HttpHeaders {
    let authHeaders: HttpHeaders = new HttpHeaders();
    authHeaders = authHeaders.set(
      'Authorization', 'Bearer ' + StorageService.getCustomerToken()
    );
    return authHeaders;
  }
}
