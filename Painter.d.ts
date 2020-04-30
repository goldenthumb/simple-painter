import { Listener } from './EventEmitter';
import { Figure, RelativePosition } from './types';
export declare type DrawThickness = number;
export declare type DrawType = 'freeLine' | 'straightLine' | 'rectangle' | 'ellipse';
export declare type DrawColor = string | CanvasGradient | CanvasPattern;
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
    disableMouseDrawing: () => void;
    private _canvas;
    private _ctx;
    private _tmpCanvas;
    private _tmpCtx;
    private _drawOption;
    private _emitter;
    private _figures;
    private _cursor;
    constructor({ canvas, width, height, drawMouse, type, color, thickness, lineCap }: PainterOptions);
    get canvas(): HTMLCanvasElement;
    get size(): {
        width: number;
        height: number;
    };
    on(name: 'drawStart' | 'drawing' | 'drawEnd', listener: Listener): () => Listener[];
    setSize({ width, height }: {
        width?: number;
        height?: number;
    }): void;
    setOptions(drawOption: DrawOption): void;
    draw(figure: Figure): void;
    undo(): void;
    redo(): void;
    clear(): void;
    destroy(): void;
    enableMouseDrawing(): void;
    redraw(): void;
    private _push;
}
