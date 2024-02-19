import {ChangeDetectorRef, Component} from '@angular/core';
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatFabButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {NgxColorsModule} from "ngx-colors";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CustomerService} from "../../services/customer.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute} from "@angular/router";

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
  photoGallery: any = [{id: 1}];
  storeId: number = this.activatedRoute.snapshot.params["id"];
  store: any = null;

  selectedFile: any;
  imagePreview: any;

  constructor(private fb: FormBuilder,
              private customerService: CustomerService,
              private snackBar: MatSnackBar,
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

}
