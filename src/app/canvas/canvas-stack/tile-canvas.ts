import { Canvas } from './base-canvas';
import { CanvasType } from './models/canvas.model';
import { CanvasTileType } from './models/canvas-tile.model';

export abstract class CanvasTile extends Canvas {
	/** Dimension of a tile in the canvas. */
	private tileDimensions: CanvasType.Dimensions;

	/**
	 * Constructor.
	 * @param {CanvasType.Dimensions} dimensions
	 * @param {CanvasType.Coordinates} grid
	 */
	constructor(dimensions: CanvasType.Dimensions,
							protected grid: CanvasType.Coordinates) {
    // Call to parent constructor.
		super(dimensions);

		// Set tile size.
		this.tileDimensions = {
			width: dimensions.width / grid.x,
			height: dimensions.height / grid.y
		};
	}

	/**
	 * Fill given tile with the given color.
	 * @param {CanvasTileType.ColorPoint} points
	 */
	fillWithColor(points: CanvasTileType.ColorPoint): void {
		points.forEach(point => {
			if (this.validCoordinates(point.coordinates)) {
				// Set the fill color.
				this.context.fillStyle = point.color;

				// Get the real coordinates of the given point.
				const realCoordinates: CanvasType.Coordinates = this.findRealCoordinates(point.coordinates);
				
				// Fill the rectangle.
				this.context.fillRect(realCoordinates.x,
															realCoordinates.y,
															this.tileDimensions.width,
															this.tileDimensions.height);
			}
		});
	}

	/**
	 * Fill the given tile with the given pattern.
	 * @param {CanvasTileType.ImagePoint} points 
	 */
	fillWithImage(points: CanvasTileType.ImagePoint): void {
		points.forEach(point => {
			if (this.validCoordinates(point.coordinates)) {
				// Get the real coordinates of the given point.
				const realCoordinates: CanvasType.Coordinates = this.findRealCoordinates(point.coordinates);

				this.context.drawImage(point.image,
															realCoordinates.x,
															realCoordinates.y,
															this.tileDimensions.width,
															this.tileDimensions.height);
			}
		});
	}

	/**
	 * Says if the coordinates can be used.
	 * @param {CanvasType.Coordinates} coordinates
	 * @returns {boolean}
	 */
	private validCoordinates(coordinates: CanvasType.Coordinates): boolean {
		// TODO: Implement.
		return true;
	}

	private findRealCoordinates(coordinates: CanvasType.Coordinates): CanvasType.Coordinates {
		return {
			x: coordinates.x * this.tileDimensions.width,
			y: coordinates.y * this.tileDimensions.height
		};
	}
}