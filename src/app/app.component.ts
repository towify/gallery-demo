import { Component } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {GalleryComponent} from './gallery/gallery/gallery.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-app-new';

  constructor(private readonly dialog: MatDialog) {}

  openGalleryDialog() {
    const dialog = this.dialog.open(GalleryComponent, {
      minWidth: '900px',
      maxWidth: '1600px',
      width: '80%'
    });

    window.addEventListener('resize', () => {
      if (dialog.componentInstance) {
        dialog.componentInstance.onResize();
      }
    });
  }
}
