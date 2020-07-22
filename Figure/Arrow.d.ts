import { Figure, FigureData, DrawingEventSource } from '../types';
export default class StraightLine implements Figure {
    private _data;
    constructor(_data: FigureData);
    getData(): FigureData;
    get data(): FigureData;
    drawing(ctx: CanvasRenderingContext2D, events: DrawingEventSource): Promise<void>;
    render(ctx: CanvasRenderingContext2D): void;
}
