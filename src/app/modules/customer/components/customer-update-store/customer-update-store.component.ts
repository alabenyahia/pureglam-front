import {ChangeDetectorRef, Component} from '@angular/core';
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatFabButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {NgxColorsModule} from "ngx-colors";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CustomerService} from "../../services/customer.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-customer-update-store',
  standalone: true,
  imports: [
    MatError,
    MatFabButton,
    MatFormField,
    MatIcon,
    MatInput,
    MatLabel,
    NgxColorsModule,
    ReactiveFormsModule
  ],
  templateUrl: './customer-update-store.component.html',
  styleUrl: './customer-update-store.component.css'
})
export class CustomerUpdateStoreComponent {
  updateStoreForm!: FormGroup;
  brandColor: any;
  storeId: number = this.activatedRoute.snapshot.params["id"];
  store: any = null;


  constructor(private fb: FormBuilder,
              private customerService: CustomerService,
              private snackBar: MatSnackBar,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private cdr: ChangeDetectorRef) {
  }

  getStoreById() {
    this.customerService.getCustomerStoreById(this.storeId).subscribe((res: any) => {
      this.store = null;

      if (res.photos) {
        res.photos.forEach((photo: any) => {
          photo.processedPhoto = 'data:image/jpeg;base64,' + photo.returnedPhoto;
        });
      }
      this.store = res;
      this.cdr.detectChanges();
      this.updateStoreForm.get('name')!.setValue(res.name);
      this.updateStoreForm.get('brandColor')!.setValue(res.brandColor);

      console.log("store ", this.store);
    }, error => {

    })
  }

  ngOnInit() {
    this.updateStoreForm = this.fb.group({
      name: [null, Validators.required],
      brandColor: [null, Validators.required],
    });

    this.getStoreById();
  }

  updateStore() {
    const formData = new FormData();

    formData.append("name", this.updateStoreForm.get("name")!.value);
    formData.append("brandColor", this.updateStoreForm.get("brandColor")!.value);


    this.customerService.updateCustomerStore(this.storeId, formData).subscribe((res: any) => {
      this.snackBar.open("Store updated successfully!", 'Close',
        {duration: 2500, panelClass: ['success-snackbar']});
      this.router.navigateByUrl("/customer/stores");

      //TODO: add update store photo gallery functionality later!
      //TODO: remove selected image from input select after adding a store!
    }, (err: any) => {
      this.snackBar.open("Error happened while updating store", 'Close',
        {duration: 2500, panelClass: ['error-snackbar']});
    })

  }

}
