import { Figure, FigureData, DrawingEventSource } from '../types';

export default class StraightLine implements Figure {
    constructor(
        private _data: FigureData
    ) {}

    get data() {
        return this._data;
    }

    async drawing(ctx: CanvasRenderingContext2D, events: DrawingEventSource) {
        const { width, height } = ctx.canvas;

        for await (const event of events) {
            const { relativePosition } = event;
            this._data.positions.push(relativePosition);
            ctx.clearRect(0, 0, width, height);
            this.render(ctx);
        }
    }

    render(ctx: CanvasRenderingContext2D) {
        const { drawOption: { color, thickness, lineCap }, positions } = this._data;
        if (positions.length < 2) return;

        const { width, height } = ctx.canvas;
        const { x: startX, y: startY } = positions[0];
        const { x, y } = positions[positions.length - 1];

        if (color) ctx.strokeStyle = color;
        if (thickness) ctx.lineWidth = thickness;
        if (lineCap) ctx.lineCap = lineCap;

        ctx.beginPath();
        ctx.moveTo(startX * width, startY * height);
        ctx.lineTo(x * width, y * height);
        ctx.stroke();
    }
}
