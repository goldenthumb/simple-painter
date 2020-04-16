import PainterView from './PainterView';
import extendDrawByMouse from './extendDrawByMouse';
import EventEmitter, { Listener } from './EventEmitter';

export type DrawThickness = number;
export type DrawType = 'freeLine' | 'rectangle' | 'ellipse' | 'arrow';
export type DrawColor = string | CanvasGradient | CanvasPattern;
export type Position = { x: number; y: number };

export interface DrawOption  {
    type?: DrawType;
    color?: DrawColor;
    thickness?: DrawThickness;
    lineCap?: CanvasLineCap;
}

export interface DrawFigure extends DrawOption {
    positions: Position[];
}

export interface PainterOptions {
    canvas: HTMLCanvasElement;
    width?: number;
    height?: number;
    drawOption?: DrawOption;
}

export default class Painter {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    drawOption: DrawOption;

    private _drawPositions: Position[];
    private _drawFigures: DrawFigure[];
    private _emitter: EventEmitter;
    private _painterView: PainterView;
    private _offExtendDrawByMouse: () => void;

    constructor({ canvas, width, height, drawOption }: PainterOptions) {
        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error('2d context not supported');
        if (width) canvas.width = width;
        if (height) canvas.height = height;

        this.canvas = canvas;
        this.ctx = ctx;
        this.drawOption = {
            type: 'freeLine',
            color: 'red',
            thickness: 3,
            lineCap: 'round',
            ...drawOption,
        };

        this._drawFigures = [];
        this._drawPositions = [];
        this._emitter = new EventEmitter();
        this._painterView = new PainterView(this);
        this._offExtendDrawByMouse = extendDrawByMouse(this);
    }

    on(name: 'drawStart' | 'drawing' | 'drawEnd', listener: Listener) {
        return this._emitter.on(name, listener);
    }

    setDrawOption(drawOption: DrawOption) {
        this.drawOption = {
            ...this.drawOption,
            ...drawOption,
        };
    }

    drawFigure(drawFigure: DrawFigure) {
        this._drawFigures.push({ ...this.drawOption, ...drawFigure });
        this._render();
    }

    clearDraw() {
        this._drawFigures = [];
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    destroy() {
        this._offExtendDrawByMouse();
        this._emitter.allOff();
    }

    _startLiveDraw(position: Position) {
        this._drawPositions.push(position);
        this._painterView.setDrawInfo(this.drawOption);
        this._emitter.emit('drawStart', position);
    }

    _liveDrawing(position: Position) {
        if (this.drawOption.type === 'freeLine') {
            this._drawPositions.push(position);
            this._painterView.drawFreeLine(position);
        }

        if (this.drawOption.type === 'rectangle') {
            this._render();
            this._painterView.setDrawInfo(this.drawOption);
            this._drawPositions = [this._drawPositions[0], position];
            this._painterView.drawRectangle(this._drawPositions);
        }

        this._emitter.emit('drawing', position);
    }

    _endLiveDraw() {
        this._drawFigures.push({ positions: this._drawPositions, ...this.drawOption });
        this._emitter.emit('drawEnd', this._drawPositions);
        this._drawPositions = [];
        this._render();
    }

    _render() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (const drawFigure of this._drawFigures) {
            if (drawFigure.type === 'freeLine') {
                this._painterView.drawFreeLineFigure(drawFigure);
            }

            if (drawFigure.type === 'rectangle') {
                this._painterView.drawRectangleFigure(drawFigure);
            }
        }
    }
}