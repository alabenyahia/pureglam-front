import { Component } from '@angular/core';
import {CustomerService} from "../../services/customer.service";

@Component({
  selector: 'app-customer-stores',
  standalone: true,
  imports: [],
  templateUrl: './customer-stores.component.html',
  styleUrl: './customer-stores.component.css'
})
export class CustomerStoresComponent {
  constructor(private customerService: CustomerService) {}
  customerStores: any = [];

  ngOnInit() {
    this.getStoresByCustomerId();
    console.log("ng init")
  }

  getStoresByCustomerId() {
    this.customerService.getStoresByCustomerId().subscribe((res: any )=> {
      this.customerStores = [];

      console.log("all stores ", res);
    }, error => {

    })
  }

}
