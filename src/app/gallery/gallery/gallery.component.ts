import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UnsplashPhoto } from '../../unsplash.photo';
import { UnsplashService } from '../../unsplash.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
})
export class GalleryComponent implements OnInit {
  @ViewChild('photoList')
  photoList?: ElementRef;

  photos: UnsplashPhoto[] = [];
  rowPhotos: UnsplashPhoto[][] = [];
  isLoading = false;
  firstLoading = true;
  isTransferringData = false;
  pageIndex = 1;

  sizeInfo = {
    minWidth: 130,
    maxWidth: 300,
    height: 180,
    gapWidth: 10,
    containerWidth: 0,
  };

  #hasNextPage = true;

  constructor(private readonly unsplashService: UnsplashService) {}

  ngOnInit() {
    this.listPhotos();
    this.firstLoading = false;
  }

  getCurrentContainerWidth(): number {
    return this.photoList?.nativeElement.getBoundingClientRect().width || 0;
  }

  listPhotos(): void {
    this.isLoading = true;
    this.unsplashService.listPhotos(this.pageIndex).subscribe((photos) => {
      if (photos.length === 0) this.#hasNextPage = false;
      this.photos = this.photos.concat(photos);
      this.isLoading = false;
      this.refresh();
    });
  }

  public onResize() {
    if (!this.rowPhotos.length) return;
    if (
      Math.abs(this.getCurrentContainerWidth() - this.sizeInfo.containerWidth) <
      this.sizeInfo.minWidth / 2
    )
      return;

    this.refresh();
  }

  async onScroll(params: {
    scrollHeight: number;
    scrollTop: number;
    clientHeight: number;
  }) {
    if (
      !this.#hasNextPage ||
      this.isLoading ||
      this.rowPhotos.length * (this.sizeInfo.height + this.sizeInfo.gapWidth) <
        params.clientHeight
    )
      return;

    const isBottom =
      params.scrollHeight <= params.scrollTop + params.clientHeight + 10;
    if (isBottom) {
      this.pageIndex += 1;
      this.listPhotos();
    }
  }

  ok() {}

  refresh() {
    if (!this.photos.length) return;
    let currentRowWidth = 0;
    let displayWidth = 0;
    const rowPhotos: UnsplashPhoto[][] = [];
    let currentRowItems: UnsplashPhoto[] = [];

    this.sizeInfo.containerWidth = this.getCurrentContainerWidth();

    this.photos.forEach((item) => {
      if (item.width === 0) {
        displayWidth = 150;
        item.height = 150;
      } else if (item.displayWidth) {
        displayWidth = item.displayWidth!;
      } else {
        displayWidth = item.width * (this.sizeInfo.height / item.height);
        if (displayWidth > this.sizeInfo.maxWidth) {
          displayWidth = this.sizeInfo.maxWidth;
        } else if (displayWidth < this.sizeInfo.minWidth) {
          displayWidth = this.sizeInfo.minWidth;
        }
      }
      item.displayWidth = displayWidth;
      currentRowWidth += displayWidth + this.sizeInfo.gapWidth;
      currentRowItems.push(item);
      if (
        currentRowWidth + this.sizeInfo.minWidth >
        this.sizeInfo.containerWidth
      ) {
        rowPhotos.push(currentRowItems);
        currentRowItems = [];
        currentRowWidth = 0;
      }
    });
    this.rowPhotos = rowPhotos;
  }
}
