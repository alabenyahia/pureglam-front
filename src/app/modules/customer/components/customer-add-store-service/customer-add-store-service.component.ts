import {Component, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {MatError, MatFormField, MatLabel, MatHint} from "@angular/material/form-field";
import {MatFabButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {NgxColorsModule} from "ngx-colors";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AddPhotoGalleryComponent} from "../../../../shared/components/add-photo-gallery/add-photo-gallery.component";
import {CustomerService} from "../../services/customer.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-customer-add-store-service',
  standalone: true,
  imports: [
    MatError,
    MatFabButton,
    MatFormField,
    MatHint,
    MatIcon,
    MatInput,
    MatLabel,
    NgxColorsModule,
    ReactiveFormsModule,
    AddPhotoGalleryComponent
  ],
  templateUrl: './customer-add-store-service.component.html',
  styleUrl: './customer-add-store-service.component.css'
})
export class CustomerAddStoreServiceComponent {
  constructor(private activatedRoute: ActivatedRoute,
              private fb: FormBuilder,
              private customerService: CustomerService,
              private snackBar: MatSnackBar) {
  }

  @ViewChild(AddPhotoGalleryComponent) private addPhotoGalleryComponent!: AddPhotoGalleryComponent;

  storeId: number = this.activatedRoute.snapshot.params["storeid"];
  addStoreServiceForm!: FormGroup;

  ngOnInit() {
    this.addStoreServiceForm = this.fb.group({
      name: [null, Validators.required],
      description: [null, [Validators.required, Validators.max(256)]],
      price: [null, [Validators.required, Validators.min(0)]]
    });
  }

  addStoreService() {
    if (this.addStoreServiceForm.valid) {
      const formData = new FormData();

      formData.append("name", this.addStoreServiceForm.get("name")!.value);
      formData.append("description", this.addStoreServiceForm.get("description")!.value);
      formData.append("price", this.addStoreServiceForm.get("price")!.value);
      formData.append("storeId", this.storeId.toString());


      this.addPhotoGalleryComponent.deleteAllUnselectedFields();

      if (Object.hasOwn(this.addPhotoGalleryComponent.photoGallery[0], "selectedFile") && this.addPhotoGalleryComponent.photoGallery[0].selectedFile) {
        this.addPhotoGalleryComponent.photoGallery.forEach((photo: any) => {
          formData.append("photos[" + (photo.id - 1).toString() + "].photo", photo.selectedFile);
        });
      }

      this.customerService.addCustomerStoreService(formData).subscribe((res: any) => {
        this.snackBar.open("Store service added successfully!", 'Close',
          {duration: 2500, panelClass: ['success-snackbar']});
        this.addStoreServiceForm.reset();
        this.addPhotoGalleryComponent.photoGallery = [{id: 1}];
        //TODO: remove selected image from input select after adding a store!
      }, (err: any) => {
        this.snackBar.open("Error happened while adding store service", 'Close',
          {duration: 2500, panelClass: ['error-snackbar']});
      });
    }
  }

}
