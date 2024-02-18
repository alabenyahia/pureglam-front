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
import {MatButton, MatMiniFabButton} from "@angular/material/button";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {MatIcon} from "@angular/material/icon";
import {MatDialog} from "@angular/material/dialog";
import {DialogsService} from "../../../../shared/dialogs/services/dialogs.service";
import {MatSnackBar} from "@angular/material/snack-bar";

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
    MatButton,
    RouterLink,
    RouterLinkActive,
    MatIcon,
    MatMiniFabButton
  ],
  templateUrl: './customer-stores.component.html',
  styleUrl: './customer-stores.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CustomerStoresComponent {
  constructor(private customerService: CustomerService,
              private dialogsService: DialogsService,
              private snackBar: MatSnackBar) {}

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

  deleteStore(storeId: number) {
    this.dialogsService.openDeleteConfirmationDialog('Are you sure you want to delete this store?')
      .subscribe(confirmed => {
        if (confirmed) {
          this.customerService.deleteCustomerStore(storeId).subscribe((res: any) => {
            this.snackBar.open("Store deleted successfully!", 'Close',
              {duration: 2500, panelClass: ['.success-snackbar']});

            this.getStoresByCustomerId();
          }, (err: any) => {
            this.snackBar.open("Error happened while deleting store", 'Close',
              {duration: 2500, panelClass: ['.error-snackbar']});
          });
        }
      });

  }

}
