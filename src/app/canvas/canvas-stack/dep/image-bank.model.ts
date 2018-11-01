export namespace ImageBankType {
  // Given informations to load an image.
  export interface LoadImage {
    id: string;
    path: string;
  }
  
  // Response of the image loader.
  export interface LoadStatus {
    total: number;
    loaded: number;
    errors: number;
  }
}
