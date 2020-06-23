import { Figure, DrawStyle, RelativePosition, DrawingEventSource } from '../types';

export default class StraightLine implements Figure {
    constructor(
        private _style: DrawStyle,
        private _start?: RelativePosition,
        private _end?: RelativePosition,
    ) {}

    async drawing(ctx: CanvasRenderingContext2D, events: DrawingEventSource) {
        const { width, height } = ctx.canvas;

        for await (const event of events) {
            const { relativePosition } = event;

            if (this._start) {
                this._end = relativePosition;
            } else {
                this._start = this._end = relativePosition;
            }

            ctx.clearRect(0, 0, width, height);
            this.render(ctx);
        }
    }

    render(ctx: CanvasRenderingContext2D) {
        if (this._start === undefined || this._end === undefined) return;

        const { color, thickness = 3, lineCap } = this._style;
        const { width, height } = ctx.canvas;

        if (lineCap) ctx.lineCap = lineCap;
        if (color) ctx.fillStyle = color;
        
        const startX = this._start.x * width;
        const startY = this._start.y * height;
        const endX = this._end.x * width;
        const endY = this._end.y * height;
        const controlPoints = [0, thickness / 2, -12, thickness / 2, -15, 8];
        const dx = endX - startX;
        const dy = endY - startY;
        const len = Math.sqrt(dx * dx + dy * dy);
        const sin = dy / len;
        const cos = dx / len;
        const a = [];

        ctx.beginPath();
        a.push(0, 0);
        a.push(controlPoints[0] < 0 ? len + controlPoints[0] : controlPoints[0], controlPoints[1]);
        a.push(Math.max(controlPoints[2] < 0 ? len + controlPoints[2] : controlPoints[2], 0), controlPoints[3]);
        a.push(Math.max(controlPoints[4] < 0 ? len + controlPoints[4] : controlPoints[4], -3), controlPoints[5]);
        a.push(Math.max(len, 12), 0);
        a.push(Math.max(controlPoints[4] < 0 ? len + controlPoints[4] : controlPoints[4], -3), -controlPoints[5]);
        a.push(Math.max(controlPoints[2] < 0 ? len + controlPoints[2] : controlPoints[2], 0), -controlPoints[3]);
        a.push(controlPoints[0] < 0 ? len + controlPoints[0] : controlPoints[0], -controlPoints[1]);
        a.push(0, 0);

        for (let i = 0; i < a.length; i += 2) {
            const x = a[i] * cos - a[i + 1] * sin + startX;
            const y = a[i] * sin + a[i + 1] * cos + startY;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }

        ctx.fill();
    }
}