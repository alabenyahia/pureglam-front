import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerStoreDetailsComponent } from './customer-store-details.component';

describe('CustomerStoreDetailsComponent', () => {
  let component: CustomerStoreDetailsComponent;
  let fixture: ComponentFixture<CustomerStoreDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerStoreDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerStoreDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
