import { Figure } from './DrawFigure';
import { DrawOption, Position } from './Painter';
export default class PainterView {
    private _canvas: HTMLCanvasElement;
    private _ctx: CanvasRenderingContext2D;

    constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        this._canvas = canvas;
        this._ctx = ctx;
    }

    render(figures: Figure[]) {
        for (const { drawOption, positions } of figures) {
            if (drawOption.type === 'freeLine') {
                this._drawFreeLine(positions, drawOption);
            }
        }
    }

    _drawFreeLine(positions: Position[], drawOption: DrawOption) {
        const { color, thickness, lineCap } = drawOption;
        this._ctx.beginPath();

        if (color) this._ctx.strokeStyle = color;
        if (thickness) this._ctx.lineWidth = thickness;
        if (lineCap) this._ctx.lineCap = lineCap;

        positions.forEach((position, index) => {
            const { width , height } = this._canvas;
            const x = width * position.x;
            const y = height * position.y;

            if (index === 0) this._ctx.moveTo(x, y);
            else this._ctx.lineTo(x, y);
            this._ctx.stroke();
        });
    }
}