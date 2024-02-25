import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerUpdateStoreServiceComponent } from './customer-update-store-service.component';

describe('CustomerUpdateStoreServiceComponent', () => {
  let component: CustomerUpdateStoreServiceComponent;
  let fixture: ComponentFixture<CustomerUpdateStoreServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerUpdateStoreServiceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerUpdateStoreServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
