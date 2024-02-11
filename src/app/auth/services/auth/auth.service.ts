import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

const BASE_URL = "http://localhost:8080";

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(private http: HttpClient) { }

  registerCustomer(registerData: any){
    return this.http.post(BASE_URL + "/api/auth/customer/register", registerData);
  }

  loginCustomer(loginData: any) {
    return this.http.post(BASE_URL + "/api/auth/customer/login", loginData);
  }
}
