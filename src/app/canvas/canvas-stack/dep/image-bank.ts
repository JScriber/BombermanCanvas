import { Observable } from "rxjs";
import { ImageBankType as t } from './image-bank.model';

export class ImageBank {

  /** All the loaded images. */
  private images: Map<string, HTMLImageElement> = new Map();
  
  /**
   * Add a bunch of images to the image bank.
   * @param {t.LoadImage[]} images
   * @returns {Observable<t.LoadStatus>}
   */
  add(images: t.LoadImage[]): Observable<t.LoadStatus> {
    return Observable.create(obs => {
      let loaded: number = 0;
      let errors: number = 0;

      // Called after an error or a success.
      const response = (success: boolean): void => {
        success ? loaded ++ : errors ++;
        const total: number = loaded + errors;

        if (total === images.length) {
          obs.next({ total, loaded, errors });
        }
      };

      // Iterate over each image to load.
      images.forEach(image => {
        const imageEl: HTMLImageElement = new Image();
        imageEl.src = image.path;
  
        // Loading behavior.
        imageEl.onload = (_: Event) => {
          this.images.set(image.id, imageEl);
          response(true);
        };

        // Error behavior.
        imageEl.onerror = (_: Event) => {
          response(false);
        };
      });
    });
  }

  /**
   * Returns the image with the id.
   * @param {string} id - Id of the image.
   * @returns {HTMLImageElement}
   */
  get(id: string): HTMLImageElement {
    if (this.images.has(id)) {
      return this.images.get(id);
    }
  }
}
