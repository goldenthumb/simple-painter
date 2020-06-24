import { Figure, FigureData, DrawingEventSource } from '../types';

export default class Ellipse implements Figure {
    constructor(private _data: FigureData) {}

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
        const {
            drawOption: { color, thickness, lineCap },
            positions,
        } = this._data;
        if (positions.length < 2) return;

        const { canvas } = ctx;
        const start = positions[0];
        const end = positions[positions.length - 1];

        if (color) ctx.strokeStyle = color;
        if (thickness) ctx.lineWidth = thickness;
        if (lineCap) ctx.lineCap = lineCap;

        ctx.beginPath();

        const startX = start.x * canvas.width;
        const startY = start.y * canvas.height;
        const x = end.x * canvas.width;
        const y = end.y * canvas.height;
        const width = x - startX;
        const height = y - startY;
        const kappa = (4 * (Math.sqrt(2) - 1)) / 3;
        const offsetX = (width / 2) * kappa;
        const offsetY = (height / 2) * kappa;
        const endX = startX + width;
        const endY = startY + height;
        const midX = startX + width / 2;
        const midY = startY + height / 2;

        ctx.beginPath();
        ctx.moveTo(startX, midY);
        ctx.bezierCurveTo(
            startX,
            midY - offsetY,
            midX - offsetX,
            startY,
            midX,
            startY
        );
        ctx.bezierCurveTo(midX + offsetX, startY, endX, midY - offsetY, endX, midY);
        ctx.bezierCurveTo(endX, midY + offsetY, midX + offsetX, endY, midX, endY);
        ctx.bezierCurveTo(
            midX - offsetX,
            endY,
            startX,
            midY + offsetY,
            startX,
            midY
        );
        ctx.closePath();
        ctx.stroke();
    }
}
