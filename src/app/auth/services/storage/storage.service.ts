import { Injectable } from '@angular/core';
const CUSTOMER_TOKEN = "customer_token";
const CUSTOMER_USER="customer_user";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  static saveCustomerToken(token: string): void {
    window.localStorage.removeItem(CUSTOMER_TOKEN);
    window.localStorage.setItem(CUSTOMER_TOKEN, token);
  }


  static saveCustomerUser(user: any): void {
    window.localStorage.removeItem(CUSTOMER_USER);
    window.localStorage.setItem(CUSTOMER_USER, JSON.stringify(user));
  }

}
