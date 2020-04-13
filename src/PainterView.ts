import DrawFigure from './DrawFigure';

export type DrawColor = string | CanvasGradient | CanvasPattern;
export type DrawThickness = number;

export interface DrawOption {
    color?: DrawColor;
    thickness?: DrawThickness;
    lineCap?: CanvasLineCap;
}

export interface PainterViewOption {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    drawOption?: DrawOption;
}

export default class PainterView {
    width: number;
    height: number;

    private _canvas: HTMLCanvasElement;
    private _ctx: CanvasRenderingContext2D;
    private _drawOption: DrawOption;

    constructor({ canvas, ctx, drawOption }: PainterViewOption) {
        this.width = canvas.width;
        this.height = canvas.height;

        this._canvas = canvas;
        this._ctx = ctx;
        this._drawOption = {
            color: 'red',
            thickness: 3,
            lineCap: 'round',
            ...drawOption,
        };
    }

    setDrawOption(option: DrawOption) {
        this._drawOption = {
            ...this._drawOption,
            ...option,
        };
    }

    drawFreeLine(drawFigure: DrawFigure, option: DrawOption = this._drawOption) {
        const { color, thickness, lineCap } = option;
    
        this._ctx.beginPath();
        if (color) this._ctx.strokeStyle = color;
        if (thickness) this._ctx.lineWidth = thickness;
        if (lineCap) this._ctx.lineCap = lineCap;

        for (const { id, x, y } of drawFigure.positions) {
            if (id === 0) this._ctx.moveTo(x, y);
            else this._ctx.lineTo(x, y);
            this._ctx.stroke();
        }
    }
}