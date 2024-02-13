import {Injectable} from '@angular/core';
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
    if (storedUser && typeof storedUser.isLoggedIn === 'boolean') {
      this.customerUserSubject.next(storedUser);
    }
  }

  updateCustomerUserLoginStatus(newData: any) {
    const user = {...this.customerUserSubject.getValue(), ...newData};
    this.customerUserSubject.next(user);
    StorageService.saveCustomerUser(user);
  }

  constructor() {
    this.updateCustomerUserDataFromLocalStorage();
  }
}
