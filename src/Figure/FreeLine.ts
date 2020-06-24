import { Figure, FigureData, DrawingEventSource } from '../types';

export default class FreeLine implements Figure {
    constructor(
        private _data: FigureData
    ) {}

    getData() {
        return this._data;
    }

    async drawing(ctx: CanvasRenderingContext2D, events: DrawingEventSource) {
        const { color, thickness, lineCap } = this._data.drawOption;
        const { width, height } = ctx.canvas;

        if (color) ctx.strokeStyle = color;
        if (thickness) ctx.lineWidth = thickness;
        if (lineCap) ctx.lineCap = lineCap;

        ctx.beginPath();

        for await (const event of events) {
            const { x, y } = event.relativePosition;

            if (this._data.positions.length) {
                ctx.lineTo(width * x, height * y);
                ctx.stroke();
            } else {
                ctx.moveTo(width * x, height * y);
            }

            this._data.positions.push({ x, y });
        }
    }

    render(ctx: CanvasRenderingContext2D) {
        if (!this._data.positions.length) return;

        const { color, thickness, lineCap } = this._data.drawOption;
        const { width, height } = ctx.canvas;

        if (color) ctx.strokeStyle = color;
        if (thickness) ctx.lineWidth = thickness;
        if (lineCap) ctx.lineCap = lineCap;

        ctx.beginPath();

        for (const position of this._data.positions) {
            ctx.lineTo(width * position.x, height * position.y);
            ctx.stroke();
        }
    }
}
