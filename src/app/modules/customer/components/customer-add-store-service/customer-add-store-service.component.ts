import {Component, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
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
              private snackBar: MatSnackBar) {}

  @ViewChild(AddPhotoGalleryComponent) private addPhotoGalleryComponent!: AddPhotoGalleryComponent;

  storeId: number = this.activatedRoute.snapshot.params["storeid"];
  addStoreServiceForm!: FormGroup;

  ngOnInit() {
    this.addStoreServiceForm = this.fb.group({
      name: [null, Validators.required],
    });
  }

  addStoreService() {

  }



}
