import {CanActivateFn, Router} from '@angular/router';
import {StorageService} from "../../../auth/services/storage/storage.service";

export const authCustomerGuard: CanActivateFn = (route, state) => {
  const router = new Router();
  const storedUser = StorageService.getCustomerUser();
  if (storedUser && typeof storedUser.isLoggedIn === 'boolean' && storedUser.isLoggedIn === true) {
    // customer already loggedin
    // redirect to you are already logged in as #alabenyahia page
    return router.createUrlTree(['/customer/dashboard']);
  }
  return true
};
