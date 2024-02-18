import { Component } from '@angular/core';
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatFabButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import { NgxColorsModule } from 'ngx-colors';
import {MatSnackBar} from "@angular/material/snack-bar";
import {CustomerService} from "../../services/customer.service";
import {MatIcon} from "@angular/material/icon";
import ColorJS from 'color';
import {NgOptimizedImage} from "@angular/common";


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
    NgOptimizedImage
  ],
  templateUrl: './customer-add-store.component.html',
  styleUrl: './customer-add-store.component.css'
})
export class CustomerAddStoreComponent {
  addStoreForm!: FormGroup;
  brandColor: any;
  photoGallery: any = [{id: 1}];

  selectedFile: any;
  imagePreview: any;

  constructor(private fb: FormBuilder,
              private customerService: CustomerService,
              private snackBar: MatSnackBar,
              private router: Router) {}

  ngOnInit() {
    this.addStoreForm = this.fb.group({
      name: [null, Validators.required],
      brandColor: [null, Validators.required],
    });
  }

  addOrDeleteAnotherPhoto(id: number) {
    if (id === 1) {
      this.photoGallery.push({id: this.photoGallery.length + 1});
    } else {
      this.photoGallery.pop();
    }
  }

  onSelectPhoto(event: any, id: number) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.photoGallery[id - 1] = {...this.photoGallery[id -1], preview: reader.result, selectedFile: file };
    };
    reader.readAsDataURL(file);
    console.log("galry", this.photoGallery);
  }


  addStore() {
    const formData = new FormData();

    formData.append("name", this.addStoreForm.get("name")!.value);
    formData.append("brandColor", this.addStoreForm.get("brandColor")!.value);

    if (Object.hasOwn(this.photoGallery[0], "selectedFile") && this.photoGallery[0].selectedFile) {
      this.photoGallery.forEach((photo: any) => {
        formData.append("photos[" + (photo.id - 1).toString() + "].photo",  photo.selectedFile);
      })
    }

    this.customerService.addCustomerStore(formData).subscribe((res: any) => {
      this.snackBar.open("Store added successfully!", 'Close',
        {duration: 2500, panelClass: ['.success-snackbar']})
      this.addStoreForm.reset()
      this.photoGallery = [{id: 1}];
    }, (err: any) => {
      this.snackBar.open("Error happened while adding store", 'Close',
        {duration: 2500, panelClass: ['.error-snackbar']});
    })

  }

}
