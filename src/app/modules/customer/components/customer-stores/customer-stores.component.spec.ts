import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerStoresComponent } from './customer-stores.component';

describe('CustomerStoresComponent', () => {
  let component: CustomerStoresComponent;
  let fixture: ComponentFixture<CustomerStoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerStoresComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerStoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
