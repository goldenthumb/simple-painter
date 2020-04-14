import EventEmitter, { Emitter } from 'event-emitter';
import { Position, DrawOption } from './Painter';

export default class PainterController {
    private _canvas: HTMLCanvasElement;
    private _ctx: CanvasRenderingContext2D;
    private _emitter: Emitter;
    private _isDrawing: boolean;
    private _positions: Position[];
    private _drawOption: DrawOption;

    constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, drawOption: DrawOption) {
        this._ctx = ctx;
        this._canvas = canvas;
        this._drawOption = drawOption;
        this._isDrawing = false;
        this._positions = [];
        this._emitter = EventEmitter();

        this._attachEvents();
    }

    on(type: string, listener: EventListener) {
        this._emitter.on(type, listener);
    }

    once(type: string, listener: EventListener) {
        this._emitter.once(type, listener);
    }

    _attachEvents() {
        document.addEventListener('mousedown', this._startDraw);
        document.addEventListener('mousemove', this._drawing);
        document.addEventListener('mouseup', this._endDraw);
    }

    _startDraw = (event: MouseEvent) => {
        this._isDrawing = true;
        this._addPosition(this._normalizePosition(event));
    };

    _drawing = (event: MouseEvent) => {
        if (!this._isDrawing) return;

        if (this._drawOption.type === 'freeLine') {
            this._drawFreeLine(event);
        }
    };

    _endDraw = () => {
        if (!this._isDrawing) return;
        this._isDrawing = false;
        this._emitter.emit('endDraw', this._positions);
        this._positions = [];
    };

    _drawFreeLine(event: MouseEvent) {
        const { color, thickness, lineCap } = this._drawOption;

        if (!this._positions.length) return;

        if (this._positions.length === 1) {
            const { width, height } = this._canvas;
            const { x, y } = this._getLastPosition();
            this._ctx.beginPath();

            if (color) this._ctx.strokeStyle = color;
            if (thickness) this._ctx.lineWidth = thickness;
            if (lineCap) this._ctx.lineCap = lineCap;

            this._ctx.moveTo(width * x, height * y);
        }
        
        const { width, height } = this._canvas;
        const position = this._normalizePosition(event);
        this._ctx.lineTo(width * position.x, height * position.y);
        this._ctx.stroke();
        this._addPosition(position);
    }

    _addPosition(position: Position) {
        const lastPosition = this._getLastPosition();
        
        if (
            lastPosition &&
            lastPosition.x === position.x && 
            lastPosition.y === position.y
        ) return;

        this._positions.push(position);
    }

    _getLastPosition() {
        return this._positions[this._positions.length - 1];
    }

    _normalizePosition({ clientX, clientY }: MouseEvent) {
        const { top, left, width, height } = this._canvas.getBoundingClientRect();
        
        return {
            x: Number((clientX - left) / width),
            y: Number((clientY - top) / height)
        };
    }
}