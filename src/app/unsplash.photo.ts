export type UnsplashPhoto = {
  id: string;
  width: number;
  height: number;
  urls: UnsplashUrls;
  displayWidth?: number;
};

export type UnsplashUrls = {
  raw: string;
  full: string;
  regular: string;
  small: string;
  thumb: string;
};
