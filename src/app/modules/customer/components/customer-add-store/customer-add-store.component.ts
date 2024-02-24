import {Component, ViewChild} from '@angular/core';
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatFabButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {NgxColorsModule} from 'ngx-colors';
import {MatSnackBar} from "@angular/material/snack-bar";
import {CustomerService} from "../../services/customer.service";
import {MatIcon} from "@angular/material/icon";
import ColorJS from 'color';
import {NgOptimizedImage} from "@angular/common";
import {AddPhotoGalleryComponent} from "../../../../shared/components/add-photo-gallery/add-photo-gallery.component";


@Component({
  selector: 'app-customer-add-store',
  standalone: true,
  imports: [
    MatError,
    MatFabButton,
    MatFormField,
    MatInput,
    MatLabel,
    MatIcon,
    ReactiveFormsModule,
    RouterLink,
    NgxColorsModule,
    NgOptimizedImage,
    AddPhotoGalleryComponent
  ],
  templateUrl: './customer-add-store.component.html',
  styleUrl: './customer-add-store.component.css'
})
export class CustomerAddStoreComponent {
  addStoreForm!: FormGroup;
  brandColor: any;


  constructor(private fb: FormBuilder,
              private customerService: CustomerService,
              private snackBar: MatSnackBar) {
  }


  @ViewChild(AddPhotoGalleryComponent) private addPhotoGalleryComponent!: AddPhotoGalleryComponent;

  ngOnInit() {
    this.addStoreForm = this.fb.group({
      name: [null, Validators.required],
      brandColor: [null, Validators.required],
    });
  }


  addStore() {
    if (this.addStoreForm.valid) {
      const formData = new FormData();

      formData.append("name", this.addStoreForm.get("name")!.value);
      formData.append("brandColor", this.addStoreForm.get("brandColor")!.value);

      this.addPhotoGalleryComponent.deleteAllUnselectedFields();

      if (Object.hasOwn(this.addPhotoGalleryComponent.photoGallery[0], "selectedFile") && this.addPhotoGalleryComponent.photoGallery[0].selectedFile) {
        this.addPhotoGalleryComponent.photoGallery.forEach((photo: any) => {
          formData.append("photos[" + (photo.id - 1).toString() + "].photo", photo.selectedFile);
        })
      }

      this.customerService.addCustomerStore(formData).subscribe((res: any) => {
        this.snackBar.open("Store added successfully!", 'Close',
          {duration: 2500, panelClass: ['success-snackbar']});
        this.addStoreForm.reset();
        this.addPhotoGalleryComponent.photoGallery = [{id: 1}];

        //TODO: remove selected image from input select after adding a store!
      }, (err: any) => {
        this.snackBar.open("Error happened while adding store", 'Close',
          {duration: 2500, panelClass: ['error-snackbar']});
      })
    }
  }
}
