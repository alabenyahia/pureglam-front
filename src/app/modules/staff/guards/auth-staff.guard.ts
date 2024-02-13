import { CanActivateFn } from '@angular/router';

export const authStaffGuard: CanActivateFn = (route, state) => {
  return true;
};
