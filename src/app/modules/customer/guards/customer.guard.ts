import {CanActivateFn, Router} from '@angular/router';
import {StorageService} from "../../../auth/services/storage/storage.service";


export const customerGuard: CanActivateFn = (route, state) => {
  const router = new Router();
  const storedUser = StorageService.getCustomerUser();

  if (storedUser && typeof storedUser.isLoggedIn === 'boolean' && storedUser.isLoggedIn === true) {
    return true;
  }

  // customer is not logged in yet, redirect to login page
  return router.createUrlTree(['/customer/login']);
};
