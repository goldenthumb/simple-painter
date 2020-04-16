import PainterView from './PainterView';
import extendDrawByMouse from './extendDrawByMouse';
import EventEmitter, { Listener } from './EventEmitter';

export type DrawThickness = number;
export type DrawType = 'freeLine' | 'rectangle' | 'ellipse' | 'arrow';
export type DrawColor = string | CanvasGradient | CanvasPattern;
export type Position = { x: number; y: number };

export type DrawOption = {
    type?: DrawType;
    color?: DrawColor;
    thickness?: DrawThickness;
    lineCap?: CanvasLineCap;
}

export type DrawFigure = {
    drawOption: DrawOption;
    positions: Position[];
}

interface PainterOptions {
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
        this.drawOption = drawOption;
    }

    drawFigure(positions: Position[], drawOption: DrawOption = this.drawOption) {
        this._drawFigures.push({ positions, drawOption });
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
        if (this.drawOption.type === 'freeLine') {
            this._painterView.setDrawInfo(this.drawOption);
            this._painterView.startFreeLinePiece(position);
        }

        this._drawPositions.push(position);
        this._emitter.emit('drawStart', position);
    }

    _liveDrawing(position: Position) {
        if (this.drawOption.type === 'freeLine') {
            this._painterView.drawFreeLinePiece(position);
        }

        this._drawPositions.push(position);
        this._emitter.emit('drawing', position);
    }

    _endLiveDraw() {
        this._drawFigures.push({ positions: this._drawPositions, drawOption: this.drawOption });
        this._render();
        this._emitter.emit('drawEnd', this._drawPositions);
        this._drawPositions = [];
    }

    _render() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (const { drawOption, positions } of this._drawFigures) {
            if (drawOption.type === 'freeLine') {
                this._painterView.drawFreeLineFigure(positions, drawOption);
            }

            if (drawOption.type === 'rectangle') {
                this._painterView.drawRectangleFigure(positions, drawOption);
            }
        }
    }
}