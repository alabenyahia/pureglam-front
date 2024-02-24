import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPhotoGalleryComponent } from './add-photo-gallery.component';

describe('AddPhotoGalleryComponent', () => {
  let component: AddPhotoGalleryComponent;
  let fixture: ComponentFixture<AddPhotoGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddPhotoGalleryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddPhotoGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
