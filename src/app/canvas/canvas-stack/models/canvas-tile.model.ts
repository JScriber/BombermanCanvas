import { CanvasType } from "./canvas.model";

export namespace CanvasTileType {
	// Point of color in the canvas.
	export type ColorPoint = {
    coordinates: CanvasType.Coordinates;
		color: string;
	}[]; 
	
	// Display image in tile.
	export type ImagePoint = {
		coordinates: CanvasType.Coordinates;
		image: HTMLImageElement
	}[];
}