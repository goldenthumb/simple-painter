import { Figure, DrawStyle, RelativePosition, DrawingEventSource } from '../types';
export default class Ellipse implements Figure {
    private _style;
    private _start?;
    private _end?;
    constructor(_style: DrawStyle, _start?: RelativePosition | undefined, _end?: RelativePosition | undefined);
    drawing(ctx: CanvasRenderingContext2D, events: DrawingEventSource): Promise<void>;
    render(ctx: CanvasRenderingContext2D): void;
}
