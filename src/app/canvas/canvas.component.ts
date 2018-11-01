import { Component, OnInit } from '@angular/core';
import { CanvasTile } from './canvas-stack/tile-canvas';
import { CanvasTileType } from './canvas-stack/models/canvas-tile.model';
import { interval } from 'rxjs';
import { ImageBank } from './canvas-stack/dep/image-bank';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent extends CanvasTile implements OnInit {

  private points: CanvasTileType.ColorPoint = [];

  /** Bank of images. */
  private imageBank: ImageBank = new ImageBank();

  /** Constructor. */
  constructor() {
    super({
      width: 700,
      height: 700
    }, {
      x: 15,
      y: 15
    });
  }
  
  /** @inheritdoc */
  ngOnInit() {
    interval(300).subscribe(() => { 
        // TODO: Replace with back-end listener.
        this.generateRandomPoints();
    });

    // Load all the assets.
    // TODO: Wrap in another class whose constructor returns observable.
    this.imageBank.add([{
      id: 'MAGIC_HAT',
      path: 'assets/hat.png'
    }])
      .subscribe(status => {
        if (status.total === status.loaded) {
          // Start the paint methods.
          this.trigger();
        }
      });
  }

  /** Render in canvas. */
  render(): void {
    this.fillWithColor(this.points);

    this.fillWithImage([{
      coordinates: {
        x: 5,
        y: 5
      },
      image: this.imageBank.get('MAGIC_HAT')
    }]);
  }

  /** Generate random points. */
  private generateRandomPoints(): void {
    this.points = [];

    const random = (min, max): number => {
      return Math.floor(Math.random() * max - min + min);
    };

    for (let index = 0; index < 150; index++) {
      const x: number = random(0, this.grid.x);
      const y: number = random(0, this.grid.y);

      const r: number = random(10, 240);
      const g: number = random(10, 240);
      const b: number = random(10, 240);

      this.points.push({
        coordinates: {
          x, y
        },
        color: `rgb(${r}, ${g}, ${b})`
      });
    }
  }
}
