import PainterView from './PainterView';
import extendDrawByMouse from './extendDrawByMouse';
import EventEmitter, { Listener } from './EventEmitter';

export type DrawThickness = number;
export type DrawType = 'freeLine' | 'straightLine' | 'rectangle' | 'ellipse';
export type DrawColor = string | CanvasGradient | CanvasPattern;
export type Position = { x: number; y: number };

export interface DrawOption {
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

    _startLiveDraw(position: Position, event: MouseEvent | TouchEvent) {
        this._drawPositions.push(position);
        this._painterView.setDrawInfo(this.drawOption);
        this._painterView.setStartPosition(position);
        this._emitter.emit('drawStart', position, event);
    }

    _liveDrawing(position: Position, event: MouseEvent | TouchEvent) {
        if (this.drawOption.type === 'freeLine') {
            this._drawPositions.push(position);
            this._painterView.drawFreeLine(position);
        }

        if (this.drawOption.type === 'straightLine') {
            this._render();
            this._drawPositions = [this._drawPositions[0], position];
            this._painterView.drawStraightLine(this._drawPositions);
        }

        if (this.drawOption.type === 'rectangle') {
            this._render();
            this._drawPositions = [this._drawPositions[0], position];
            this._painterView.drawRectangle(this._drawPositions);
        }

        if (this.drawOption.type === 'ellipse') {
            this._render();
            this._drawPositions = [this._drawPositions[0], position];
            this._painterView.drawEllipse(this._drawPositions);
        }

        this._emitter.emit('drawing', position, event);
    }

    _endLiveDraw(event: MouseEvent | TouchEvent) {
        this._drawFigures.push({ positions: this._drawPositions, ...this.drawOption });
        this._emitter.emit('drawEnd', this._drawPositions, event);
        this._drawPositions = [];
        this._render();
    }

    _render() {
        if (!this._drawFigures.length) return;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (const drawFigure of this._drawFigures) {
            if (drawFigure.type === 'freeLine') {
                this._painterView.drawFreeLineFigure(drawFigure);
            }

            if (drawFigure.type === 'rectangle') {
                this._painterView.drawRectangleFigure(drawFigure);
            }

            if (drawFigure.type === 'ellipse') {
                this._painterView.drawEllipseFigure(drawFigure);
            }

            if (drawFigure.type === 'straightLine') {
                this._painterView.drawStraightLineFigure(drawFigure);
            }
        }

        this._painterView.setDrawInfo(this.drawOption);
    }
}