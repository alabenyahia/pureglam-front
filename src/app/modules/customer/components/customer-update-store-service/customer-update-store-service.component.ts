import {ChangeDetectorRef, Component} from '@angular/core';
import {MatError, MatFormField, MatHint, MatLabel} from "@angular/material/form-field";
import {MatFabButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {NgxColorsModule} from "ngx-colors";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CustomerService} from "../../services/customer.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-customer-update-store-service',
  standalone: true,
  imports: [
    MatError,
    MatFabButton,
    MatFormField,
    MatInput,
    MatLabel,
    NgxColorsModule,
    ReactiveFormsModule,
    MatHint
  ],
  templateUrl: './customer-update-store-service.component.html',
  styleUrl: './customer-update-store-service.component.css'
})
export class CustomerUpdateStoreServiceComponent {
  updateStoreServiceForm!: FormGroup;
  storeServiceId: number = this.activatedRoute.snapshot.params["id"];
  storeService: any = null;


  constructor(private fb: FormBuilder,
              private customerService: CustomerService,
              private snackBar: MatSnackBar,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private cdr: ChangeDetectorRef) {
  }

  getStoreServiceById() {
    this.customerService.getCustomerStoreServiceById(this.storeServiceId).subscribe((res: any) => {
      this.storeService = null;

      if (res.photos) {
        res.photos.forEach((photo: any) => {
          photo.processedPhoto = 'data:image/jpeg;base64,' + photo.returnedPhoto;
        });
      }
      this.storeService = res;
      this.cdr.detectChanges();
      this.updateStoreServiceForm.get('name')!.setValue(res.name);
      this.updateStoreServiceForm.get('description')!.setValue(res.description);
      this.updateStoreServiceForm.get('price')!.setValue(res.price);

      console.log("store ", this.storeService);
    }, error => {

    })
  }

  ngOnInit() {
    this.updateStoreServiceForm = this.fb.group({
      name: [null, Validators.required],
      description: [null, [Validators.required, Validators.max(256)]],
      price: [null, [Validators.required, Validators.min(0)]]
    });

    this.getStoreServiceById();
  }

  updateStoreService() {
    const formData = new FormData();

    formData.append("name", this.updateStoreServiceForm.get("name")!.value);
    formData.append("description", this.updateStoreServiceForm.get("description")!.value);
    formData.append("price", this.updateStoreServiceForm.get("price")!.value);

    console.log("id", this.storeServiceId);

    this.customerService.updateCustomerStoreService(this.storeServiceId, formData).subscribe((res: any) => {
      this.snackBar.open("Store service updated successfully!", 'Close',
        {duration: 2500, panelClass: ['success-snackbar']});
      this.router.navigateByUrl("/customer/stores");

      //TODO: add update store photo gallery functionality later!
      //TODO: remove selected image from input select after adding a store!
    }, (err: any) => {
      this.snackBar.open("Error happened while updating store service", 'Close',
        {duration: 2500, panelClass: ['error-snackbar']});
    })
  }
}
