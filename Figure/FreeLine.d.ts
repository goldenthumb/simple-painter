import { Figure, DrawStyle, RelativePosition, DrawingEventSource } from '../types';
export default class FreeLine implements Figure {
    private _style;
    private _positions?;
    constructor(_style: DrawStyle, _positions?: RelativePosition[] | undefined);
    drawing(ctx: CanvasRenderingContext2D, events: DrawingEventSource): Promise<void>;
    render(ctx: CanvasRenderingContext2D): void;
}
