import EventEmitter, { Listener } from './EventEmitter';
import { Figure, RelativePosition, DrawingEvent } from './types';
import FreeLine from './Figure/FreeLine';
import StraightLine from './Figure/StraightLine';
import Rectangle from './Figure/Rectangle';
import Ellipse from './Figure/Ellipse';

type EventMap<Element = HTMLElement> = Element extends Document ? DocumentEventMap : HTMLElementEventMap;

export type DrawThickness = number;
export type DrawType = 'freeLine' | 'straightLine' | 'rectangle' | 'ellipse';
export type DrawColor = string | CanvasGradient | CanvasPattern;

export interface DrawOption {
    type?: DrawType;
    color?: DrawColor;
    thickness?: DrawThickness;
    lineCap?: CanvasLineCap;
}

export interface DrawFigure extends DrawOption {
    positions: RelativePosition[];
}

export interface PainterOptions {
    canvas: HTMLCanvasElement;
    width?: number;
    height?: number;
    drawMouse?: boolean;
    type?: DrawType;
    color?: DrawColor;
    thickness?: DrawThickness;
    lineCap?: CanvasLineCap;
}

export default class Painter {
    disableMouseDrawing = () => { };

    private _canvas: HTMLCanvasElement;
    private _ctx: CanvasRenderingContext2D;
    private _tmpCanvas: HTMLCanvasElement;
    private _tmpCtx: CanvasRenderingContext2D;
    private _drawOption: DrawOption;
    private _emitter: EventEmitter;
    private _figures: Figure[] = [];
    private _cursor = 0;

    constructor({
        canvas, 
        width,
        height,
        drawMouse = true,
        type = 'freeLine',
        color = 'red',
        thickness = 3,
        lineCap = 'square'
    }: PainterOptions) {
        this._canvas = canvas;
        if (!(this._ctx = canvas.getContext('2d')!)) {
            throw new Error('2d context not supported');
        }

        if (width) canvas.width = width;
        if (height) canvas.height = height;

        this._tmpCanvas = document.createElement('canvas');
        this._tmpCtx = this._tmpCanvas.getContext('2d')!;
        this._drawOption = { type, color, thickness, lineCap };
        this._emitter = new EventEmitter();

        if (drawMouse) this.enableMouseDrawing();
    }

    get canvas() {
        return this._canvas;
    }

    get size() {
        return { width: this._canvas.width, height: this._canvas.height };
    }

    on(name: 'drawStart' | 'drawing' | 'drawEnd', listener: Listener) {
        return this._emitter.on(name, listener);
    }

    setSize({ width, height }: { width?: number; height?: number }) {
        if (width) this._canvas.width = width;
        if (height) this._canvas.height = height;
    }

    setOptions(drawOption: DrawOption) {
        this._drawOption = {
            ...this._drawOption,
            ...drawOption,
        };
    }

    draw(figure: Figure) {
        this._push(figure);
        figure.render(this._ctx);
    }

    undo() {
        if (this._cursor > 0) {
            this._cursor--;
            this.redraw();
        }
    }

    redo() {
        if (this._cursor < this._figures.length) {
            this._cursor++;
            this.redraw();
        }
    }

    clear() {
        const { width, height } = this.size;
        this._ctx.clearRect(0, 0, width, height);
    }

    destroy() {
        this.disableMouseDrawing();
        this._emitter.allOff();
    }

    enableMouseDrawing() {
        this.disableMouseDrawing();

        const { canvas } = this;

        let drawingFigure: Figure | null = null;
        let resolve: (v?: DrawingEvent) => void = noop;

        async function* drawingEvents() {
            let event: DrawingEvent | undefined;
            while (event = await new Promise<DrawingEvent | undefined>(r => resolve = r)) {
                yield event;
            }
        }

        const startDraw = (position: RelativePosition, event: MouseEvent | TouchEvent) => {
            switch (this._drawOption.type) {
            case 'freeLine':
                drawingFigure = new FreeLine(this._drawOption);
                break;
            case 'straightLine':
                drawingFigure = new StraightLine(this._drawOption);
                break;
            case 'rectangle':
                drawingFigure = new Rectangle(this._drawOption);
                break;
            case 'ellipse':
                drawingFigure = new Ellipse(this._drawOption);
                break;
            default:
                throw new Error(`There is no figure of "${this._drawOption.type}" type.`);
            }

            overlayStyle(canvas, this._tmpCanvas);
            document.body.appendChild(this._tmpCanvas);

            drawingFigure.drawing(this._tmpCtx, drawingEvents());
            this._emitter.emit('drawStart', { originalEvent: event, canvas: this._canvas, relativePosition: position });
        };

        const drawing = (position: RelativePosition, event: MouseEvent | TouchEvent) => {
            if (!drawingFigure) return;
            const drawingEvent = { originalEvent: event, canvas: this._canvas, relativePosition: position };
            resolve(drawingEvent);
            this._emitter.emit('drawing', drawingEvent);
        };

        const endDraw = (position: RelativePosition, event: MouseEvent | TouchEvent) => {
            if (!drawingFigure) return;
            document.body.removeChild(this._tmpCanvas);
            resolve();
            this._ctx.drawImage(this._tmpCanvas, 0, 0);
            this._push(drawingFigure);
            resolve = noop;
            drawingFigure = null;
            this._emitter.emit('drawEnd', { originalEvent: event, canvas: this._canvas, relativePosition: position });
        };

        let lastTouch: Touch | null = null;
        const offEvents = [
            on(canvas, 'mousedown', (event) => {
                const position = normalizePosition(canvas, event);
                startDraw(position, event);
                drawing(position, event);
            }),
            on(document, 'mousemove', (event) => {
                const position = normalizePosition(canvas, event);
                drawing(position, event);
            }),
            on(document, 'mouseup', (event) => {
                const position = normalizePosition(canvas, event);
                endDraw(position, event);
            }),
            on(canvas, 'touchstart', (event) => {
                const position = normalizePosition(canvas, lastTouch = event.touches[0]);
                startDraw(position, event);
                drawing(position, event);
            }),
            on(document, 'touchmove', (event) => {
                const position = normalizePosition(canvas, lastTouch = event.touches[0]);
                drawing(position, event);
            }),
            on(document, 'touchend', (event) => {
                const position = normalizePosition(canvas, lastTouch!);
                endDraw(position, event);
            }),
        ];

        this.disableMouseDrawing = () => offEvents.forEach(off => off());
    }

    redraw() {
        this.clear();
        for (const figure of this._figures.slice(0, this._cursor)) {
            figure.render(this._ctx);
        }
    }

    private _push(figure: Figure) {
        (this._figures = this._figures.slice(0, this._cursor++)).push(figure);
    }
}

function on<E extends HTMLElement | Document, Event extends keyof EventMap<E>>(
    element: E,
    name: Event,
    callback: (event: EventMap<E>[Event]) => void
) {
    (element as any).addEventListener(name, callback);
    return () => (element as any).removeEventListener(name, callback);
}

function normalizePosition(
    canvas: HTMLCanvasElement,
    { clientX, clientY }: { clientX: number; clientY: number }
) {
    const { top, left, width, height } = canvas.getBoundingClientRect();
    return {
        x: Number((clientX - left) / width),
        y: Number((clientY - top) / height)
    };
}

function overlayStyle(origin: HTMLCanvasElement, target: HTMLCanvasElement) {
    const { top, left, width, height } = origin.getBoundingClientRect();
    Object.assign(target, { width: origin.width, height: origin.height });
    Object.assign(target.style, {
        position: 'absolute',
        top: top + (width - origin.width) / 2 + 'px',
        left: left + (height - origin.height) / 2 + 'px'
    });
}

function noop() { }
