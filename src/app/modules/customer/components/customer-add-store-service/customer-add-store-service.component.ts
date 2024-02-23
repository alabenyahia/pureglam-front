import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-customer-add-store-service',
  standalone: true,
  imports: [],
  templateUrl: './customer-add-store-service.component.html',
  styleUrl: './customer-add-store-service.component.css'
})
export class CustomerAddStoreServiceComponent {
  constructor(private activatedRoute: ActivatedRoute) {}
  storeId: number = this.activatedRoute.snapshot.params["storeid"];

}
