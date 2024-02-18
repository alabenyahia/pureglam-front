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
        NgxColorsModule
    ],
  templateUrl: './customer-add-store.component.html',
  styleUrl: './customer-add-store.component.css'
})
export class CustomerAddStoreComponent {
  addStoreForm!: FormGroup;
  brandColor: any;
  photoGallery: any = [{id: 1}];

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
    // Read or process the file to obtain the image URL
    const reader = new FileReader();
    reader.onload = () => {
      this.photoGallery[id - 1] = {...this.photoGallery[id -1], url: reader.result };
    };
    reader.readAsDataURL(file);
  }

  addStore() {
    const formData = new FormData();

    formData.append("name", this.addStoreForm.get("name")!.value);
    formData.append("brandColor", this.addStoreForm.get("brandColor")!.value);

    this.customerService.addCustomerStore(formData).subscribe((res: any) => {
      this.snackBar.open("Store added successfully!", 'Close',
        {duration: 2500, panelClass: ['.success-snackbar']})
      this.addStoreForm.reset()
    }, (err: any) => {
      this.snackBar.open("Error happened while adding store", 'Close',
        {duration: 2500, panelClass: ['.error-snackbar']});
    })

  }

}
