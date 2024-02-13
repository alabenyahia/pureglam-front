import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authStaffGuard } from './auth-staff.guard';

describe('authStaffGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authStaffGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
