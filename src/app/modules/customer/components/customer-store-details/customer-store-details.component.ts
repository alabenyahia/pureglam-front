import {ChangeDetectorRef, Component, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {MatButton, MatMiniFabButton} from "@angular/material/button";
import {MatCard, MatCardHeader, MatCardSubtitle, MatCardTitle} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";
import {ActivatedRoute, Router, RouterLink, RouterLinkActive} from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";
import {CustomerService} from "../../services/customer.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DialogsService} from "../../../../shared/dialogs/services/dialogs.service";

@Component({
  selector: 'app-customer-store-details',
  standalone: true,
    imports: [
        MatButton,
        MatCard,
        MatCardHeader,
        MatCardSubtitle,
        MatCardTitle,
        MatIcon,
        MatMiniFabButton,
        RouterLink,
        RouterLinkActive
    ],
  templateUrl: './customer-store-details.component.html',
  styleUrl: './customer-store-details.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CustomerStoreDetailsComponent {
  storeId: number = this.activatedRoute.snapshot.params["id"];
  store: any = null;
  constructor(private fb: FormBuilder,
              private customerService: CustomerService,
              private snackBar: MatSnackBar,
              private router: Router,
              private dialogsService: DialogsService,
              private activatedRoute: ActivatedRoute,
              private cdr: ChangeDetectorRef) {}

  getStoreById() {
    this.customerService.getCustomerStoreById(this.storeId).subscribe((res: any) => {
      this.store = null;

      if (res.photos) {
        res.photos.forEach((photo: any) => {
          photo.processedPhoto = 'data:image/jpeg;base64,' + photo.returnedPhoto;
        });
      }
      this.store = res;

      console.log("store ", this.store);
    }, error => {

    })
  }

  ngOnInit() {
    this.getStoreById();
  }

  deleteStore(storeId: number) {
    this.dialogsService.openDeleteConfirmationDialog('Are you sure you want to delete this store?')
      .subscribe(confirmed => {
        if (confirmed) {
          this.customerService.deleteCustomerStore(storeId).subscribe((res: any) => {
            this.snackBar.open("Store deleted successfully!", 'Close',
              {duration: 2500, panelClass: ['.success-snackbar']});

            this.router.navigateByUrl("/customer/stores");
          }, (err: any) => {
            this.snackBar.open("Error happened while deleting store", 'Close',
              {duration: 2500, panelClass: ['.error-snackbar']});
          });
        }
      });

  }

}
