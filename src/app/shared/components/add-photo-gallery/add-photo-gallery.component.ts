import { Component } from '@angular/core';
import {MatFabButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatLabel} from "@angular/material/form-field";

@Component({
  selector: 'app-add-photo-gallery',
  standalone: true,
    imports: [
        MatFabButton,
        MatIcon,
        MatLabel
    ],
  templateUrl: './add-photo-gallery.component.html',
  styleUrl: './add-photo-gallery.component.css'
})
export class AddPhotoGalleryComponent {
  photoGallery: any = [{id: 1}];

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

  deleteAllUnselectedFields() {
    this.photoGallery = this.photoGallery.filter((photo: any) => {
      return 'selectedFile' in photo && photo.selectedFile !== null;
    })
  }
}
