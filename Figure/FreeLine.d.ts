import { Figure, FigureData, DrawingEventSource } from '../types';
export default class FreeLine implements Figure {
    private _data;
    constructor(_data: FigureData);
    get data(): FigureData;
    drawing(ctx: CanvasRenderingContext2D, events: DrawingEventSource): Promise<void>;
    render(ctx: CanvasRenderingContext2D): void;
}
