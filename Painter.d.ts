import { Listener } from './EventEmitter';
import { DrawType, DrawThickness, DrawColor, DrawOption, FigureData } from './types';
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
    disableMouseDrawing: () => void;
    private _canvas;
    private _ctx;
    private _tmpCanvas;
    private _tmpCtx;
    private _drawOption;
    private _emitter;
    private _figures;
    private _cursor;
    constructor({ canvas, width, height, drawMouse, type, color, thickness, lineCap, figures, }: PainterOptions);
    get drawOption(): DrawOption;
    get canvas(): HTMLCanvasElement;
    get figures(): FigureData[];
    get size(): {
        width: number;
        height: number;
    };
    on(name: 'drawStart' | 'drawing' | 'drawEnd' | 'figures', listener: Listener): () => Listener[];
    setSize({ width, height }: {
        width?: number;
        height?: number;
    }): void;
    setOptions(drawOption: DrawOption): void;
    draw({ drawOption, positions }: FigureData): void;
    undo(): void;
    redo(): void;
    clear(): void;
    allOff(): void;
    destroy(): void;
    enableMouseDrawing(): void;
    redraw(): void;
    setFigures(figures?: FigureData[]): void;
    private _push;
}
