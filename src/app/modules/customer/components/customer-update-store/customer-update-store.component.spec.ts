import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerUpdateStoreComponent } from './customer-update-store.component';

describe('CustomerUpdateStoreComponent', () => {
  let component: CustomerUpdateStoreComponent;
  let fixture: ComponentFixture<CustomerUpdateStoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerUpdateStoreComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerUpdateStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
