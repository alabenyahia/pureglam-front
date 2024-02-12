import { TestBed } from '@angular/core/testing';

import { UserAuthStatusService } from './user-auth-status.service';

describe('UserAuthStatusService', () => {
  let service: UserAuthStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserAuthStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
