import {Component, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {CustomerService} from "../../services/customer.service";
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardImage,
  MatCardTitle,
  MatCardSubtitle
} from "@angular/material/card";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-customer-stores',
  standalone: true,
  imports: [
    MatCard,
    MatCardTitle,
    MatCardSubtitle,
    MatCardHeader,
    MatCardContent,
    MatCardImage,
    MatButton
  ],
  templateUrl: './customer-stores.component.html',
  styleUrl: './customer-stores.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CustomerStoresComponent {
  constructor(private customerService: CustomerService) {}

  customerStores: any = [];

  ngOnInit() {
    this.getStoresByCustomerId();
    console.log("ng init")
  }

  getStoresByCustomerId() {
    this.customerService.getStoresByCustomerId().subscribe((res: any) => {
      this.customerStores = [];

      res.forEach((element: any) => {
        if (element.photos) {
          element.photos.forEach((photo: any) => {
            photo.processedPhoto = 'data:image/jpeg;base64,' + photo.returnedPhoto;
          });
        }
        this.customerStores.push(element);
      })

      console.log("all stores ", this.customerStores);
    }, error => {

    })
  }

}
