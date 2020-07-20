import EventEmitter, { Listener } from './EventEmitter';
import { 
    EventMap, 
    DrawType, 
    DrawThickness, 
    DrawColor, 
    DrawOption, 
    Figure, 
    FigureData, 
    RelativePosition,
    DrawingEvent 
} from './types';
import FreeLine from './Figure/FreeLine';
import StraightLine from './Figure/StraightLine';
import Rectangle from './Figure/Rectangle';
import Ellipse from './Figure/Ellipse';
import Arrow from './Figure/Arrow';

export interface PainterOptions {
    canvas: HTMLCanvasElement;
    width?: number;
    height?: number;
    drawMouse?: boolean;
    type?: DrawType;
    color?: DrawColor;
    thickness?: DrawThickness;
    lineCap?: CanvasLineCap;
    figures?: FigureData[];
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
        lineCap = 'square',
        figures = [],
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
        for (const figure of figures) this.draw(figure);
    }

    get drawOption() {
        return this._drawOption;
    }

    get canvas() {
        return this._canvas;
    }

    get figures() {
        return this._figures.map((figure) => figure.data);
    }

    get size() {
        return { width: this._canvas.width, height: this._canvas.height };
    }

    on(name: 'drawStart' | 'drawing' | 'drawEnd' | 'figures', listener: Listener) {
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

    draw({ drawOption, positions }: FigureData) {
        const figure = createFigure(drawOption, positions);
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
        this.setFigures([]);
    }

    allOff() {
        this._emitter.allOff();
    }

    destroy() {
        this.disableMouseDrawing();
        this._emitter.allOff();
    }

    enableMouseDrawing() {
        this.disableMouseDrawing();

        const { canvas } = this;

        let figure: Figure | null = null;
        let resolve: (v?: DrawingEvent) => void = noop;

        async function* drawingEvents() {
            let event: DrawingEvent | undefined;
            while (event = await new Promise<DrawingEvent | undefined>(r => resolve = r)) {
                yield event;
            }
        }

        const startDraw = (position: RelativePosition, event: MouseEvent | TouchEvent) => {
            figure = createFigure(this._drawOption);
            overlayStyle(canvas, this._tmpCanvas);
            document.body.appendChild(this._tmpCanvas);
            figure.drawing(this._tmpCtx, drawingEvents());
            this._emitter.emit('drawStart', { originalEvent: event, canvas: this._canvas, relativePosition: position });
        };

        const drawing = (position: RelativePosition, event: MouseEvent | TouchEvent) => {
            if (!figure) return;
            const drawingEvent = { originalEvent: event, canvas: this._canvas, relativePosition: position };
            resolve(drawingEvent);
            this._emitter.emit('drawing', drawingEvent);
        };

        const endDraw = (position: RelativePosition, event: MouseEvent | TouchEvent) => {
            if (!figure) return;
            document.body.removeChild(this._tmpCanvas);
            resolve();
            this._ctx.drawImage(this._tmpCanvas, 0, 0);
            this._push(figure);
            resolve = noop;
            figure = null;
            this._emitter.emit('drawEnd', { originalEvent: event, canvas: this._canvas, relativePosition: position });
        };

        let lastTouch: Touch | null = null;
        const offEvents = [
            on(canvas, 'mousedown', (event) => {
                const position = normalizePosition(canvas, event, this._drawOption);
                startDraw(position, event);
                drawing(position, event);
            }),
            on(canvas, 'touchstart', (event) => {
                const position = normalizePosition(canvas, lastTouch = event.touches[0], this._drawOption);
                startDraw(position, event);
                drawing(position, event);
            }),
            on(document, 'mousemove', (event) => {
                drawing(normalizePosition(canvas, event, this._drawOption), event);
            }),
            on(document, 'touchmove', (event) => {
                drawing(normalizePosition(canvas, lastTouch = event.touches[0], this._drawOption), event);
            }),
            on(document, 'mouseup', (event) => {
                endDraw(normalizePosition(canvas, event, this._drawOption), event);
            }),
            on(canvas, 'touchend', (event) => {
                endDraw(normalizePosition(canvas, lastTouch!, this._drawOption), event);
            }),
        ];

        this.disableMouseDrawing = () => offEvents.forEach(off => off());
    }

    redraw() {
        const { width, height } = this.size;
        this._ctx.clearRect(0, 0, width, height);

        for (const figure of this._figures.slice(0, this._cursor)) {
            figure.render(this._ctx);
        }
    }

    setFigures(figures: FigureData[] = []) {
        this._figures = [];
        this._cursor = 0;
        for (const figure of figures) this.draw(figure);
    }

    private _push(figure: Figure) {
        (this._figures = this._figures.slice(0, this._cursor++)).push(figure);
        this._emitter.emit('figures', this.figures);
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

function createFigure(drawOption: DrawOption, positions: RelativePosition[] = []) {
    switch (drawOption.type) {
        case 'freeLine':
            return new FreeLine({ drawOption, positions });
        case 'straightLine':
            return new StraightLine({ drawOption, positions });
        case 'arrow':
            return new Arrow({ drawOption, positions });
        case 'rectangle':
            return new Rectangle({ drawOption, positions });
        case 'ellipse':
            return new Ellipse({ drawOption, positions });
        default:
            throw new Error(`There is no figure of "${drawOption.type}" type.`);
    }
}

function normalizePosition(
    canvas: HTMLCanvasElement,
    { clientX, clientY }: { clientX: number; clientY: number },
    drawOption: DrawOption
) {
    const { top, left, width, height } = canvas.getBoundingClientRect();
    const { type, thickness } = drawOption;
    const x = clientX - left;
    const y = clientY - top;

    return type === 'freeLine' ? {
        x: Number(x / width),
        y: Number(y / height)
    } : {
        x: Number((x < 0 ? 0 + thickness! / 2 : x > width ? width - thickness! / 2 : x) / width),
        y: Number((y < 0 ? 0 + thickness! / 2 : y > height ? height - thickness! / 2 : y) / height)
    };
}

function overlayStyle(origin: HTMLCanvasElement, target: HTMLCanvasElement) {
    const { top, left, width, height } = origin.getBoundingClientRect();
    Object.assign(target, { width: origin.width, height: origin.height });
    Object.assign(target.style, {
        position: 'fixed',
        top: top + (width - origin.width) / 2 + 'px',
        left: left + (height - origin.height) / 2 + 'px'
    });
}

function noop() { }
