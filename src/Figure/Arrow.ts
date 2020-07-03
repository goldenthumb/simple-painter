import { Figure, FigureData, DrawingEventSource } from '../types';

export default class StraightLine implements Figure {
    constructor(private _data: FigureData) {}
    getData(): FigureData {
        throw new Error('Method not implemented.');
    }

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

        const { width, height } = ctx.canvas;
        const start = positions[0];
        const end = positions[positions.length - 1];

        if (lineCap) ctx.lineCap = lineCap;
        if (color) ctx.fillStyle = color;

        const startX = start.x * width;
        const startY = start.y * height;
        const endX = end.x * width;
        const endY = end.y * height;
        const dx = endX - startX;
        const dy = endY - startY;
        const len = Math.sqrt(dx * dx + dy * dy);
        const sin = dy / len;
        const cos = dx / len;
        const a = [];
        const controlPoints = [
            0, 
            thickness! / 2, 
            -(9 + thickness!), 
            thickness! / 2, 
            -(12 + thickness! * 1.2), 
            (5 + thickness!)
        ];

        ctx.beginPath();
        a.push(0, 0);
        a.push(
            controlPoints[0] < 0 ? len + controlPoints[0] : controlPoints[0],
            controlPoints[1]
        );
        a.push(
            Math.max(
                controlPoints[2] < 0 ? len + controlPoints[2] : controlPoints[2],
                0
            ),
            controlPoints[3]
        );
        a.push(
            Math.max(
                controlPoints[4] < 0 ? len + controlPoints[4] : controlPoints[4],
                -3
            ),
            controlPoints[5]
        );
        a.push(Math.max(len, 12), 0);
        a.push(
            Math.max(
                controlPoints[4] < 0 ? len + controlPoints[4] : controlPoints[4],
                -3
            ),
            -controlPoints[5]
        );
        a.push(
            Math.max(
                controlPoints[2] < 0 ? len + controlPoints[2] : controlPoints[2],
                0
            ),
            -controlPoints[3]
        );
        a.push(
            controlPoints[0] < 0 ? len + controlPoints[0] : controlPoints[0],
            -controlPoints[1]
        );
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
