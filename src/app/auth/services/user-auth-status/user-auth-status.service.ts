import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {StorageService} from "../storage/storage.service";


@Injectable({
  providedIn: 'root'
})
export class UserAuthStatusService {
  private customerUserSubject = new BehaviorSubject<any>({isLoggedIn: false});
  currentCustomerUser$ = this.customerUserSubject.asObservable();

  updateCustomerUserDataFromLocalStorage() {
    const storedUser = StorageService.getCustomerUser();
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (typeof parsedUser.isLoggedIn === 'boolean') { // Ensure valid boolean
          this.customerUserSubject.next(parsedUser);
        }
      } catch (error) {
        console.error('Error parsing user data from localStorage:', error);
      }
    }
  }

  updateCustomerUserLoginStatus(isLoggedIn: boolean) {
    const user = { ...this.customerUserSubject.getValue(), isLoggedIn: isLoggedIn };
    this.customerUserSubject.next(user);
    StorageService.saveCustomerUser(user);
  }
  constructor() {
    this.updateCustomerUserDataFromLocalStorage();
  }
}
