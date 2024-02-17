import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerAddStoreComponent } from './customer-add-store.component';

describe('CustomerAddStoreComponent', () => {
  let component: CustomerAddStoreComponent;
  let fixture: ComponentFixture<CustomerAddStoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerAddStoreComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerAddStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
