import { ViewChild, AfterViewInit, ElementRef } from "@angular/core";
import { CanvasType } from "./models/canvas.model";

/**
 * Class which provides basic canvas management.
 * @class Canvas
 */
export abstract class Canvas implements AfterViewInit {
  @ViewChild('canvas')
  private domRef: ElementRef;

  /** Canvas. */
  protected canvas: HTMLCanvasElement;

  /** Context of the canvas. */
  protected context: CanvasRenderingContext2D;

  private triggered: boolean;

  /**
   * Constructor
   * @param {CanvasType.Dimension} dimensions
   */
  constructor(protected dimensions: CanvasType.Dimensions) {}

  /** @inheritdoc */
  ngAfterViewInit() {
    this.canvas = <HTMLCanvasElement> this.domRef.nativeElement;
    this.canvas.width = this.dimensions.width;
    this.canvas.height = this.dimensions.height;

    this.context = this.canvas.getContext('2d');

    this.triggered = false;
  }
  
  /** Trigger the draw the method. */
  protected trigger(): void {
    if (!this.triggered) {
      this.triggered = true;
      window.requestAnimationFrame(() => this.draw());
    }
  }

  /** Method called when drawing on canvas. */
  protected abstract render(): void;

  /** Drawing on canvas. */
  private draw(): void {
    window.requestAnimationFrame(() => this.draw());

    // Clear the canvas.
    this.context.clearRect(0, 0, this.dimensions.width, this.dimensions.height);

    // Render.
    this.render();
  }
}
