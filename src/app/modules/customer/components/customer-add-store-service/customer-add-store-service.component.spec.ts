import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerAddStoreServiceComponent } from './customer-add-store-service.component';

describe('CustomerAddStoreServiceComponent', () => {
  let component: CustomerAddStoreServiceComponent;
  let fixture: ComponentFixture<CustomerAddStoreServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerAddStoreServiceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerAddStoreServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
