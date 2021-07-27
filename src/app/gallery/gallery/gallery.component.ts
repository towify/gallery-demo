import { Component, OnInit } from '@angular/core';
import {UnsplashPhoto} from "../../unsplash.photo";
import {UnsplashService} from "../../unsplash.service";

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  photos: UnsplashPhoto[] = [];

  constructor(private unsplashService: UnsplashService) { }


  ngOnInit() {
    this.listPhotos();
  }

  listPhotos(): void {
    this.unsplashService.listPhotos()
      .subscribe(photos => this.photos = photos);
  }

}
