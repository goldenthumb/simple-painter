import PainterView, { DrawOption } from './PainterView';
import PainterController from './PainterController';
import DrawFigure from './DrawFigure';

export type DrawType = 'freeLine' | 'rectangle' | 'ellipse' | 'arrow';
export type Position = { x: number | string; y: number | string };
export type Figure = Position[];

interface PainterOptions {
    canvas: HTMLCanvasElement;
    drawType?: DrawType;
    drawOption?: DrawOption;
}

export default class Painter {
    private _painterView: PainterView;
    private _painterController: PainterController;
    private _drawType: DrawType;

    constructor({ canvas, drawType, drawOption }: PainterOptions) {
        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error('2d context not supported');

        this._drawType = drawType || 'freeLine';
        this._painterView = new PainterView({ canvas, ctx, drawOption });
        this._painterController = new PainterController();
    }

    setDrawOption(option: DrawOption) {
        this._painterView.setDrawOption(option);
    }

    drawFreeLine(positions: Position[], drawOption?: DrawOption) {
        const { width, height } = this._painterView;
        const drawFigure = new DrawFigure({ type: 'freeLine', width, height, positions });
        this._painterController.addFigure(drawFigure);
        this._painterView.drawFreeLine(drawFigure, drawOption);
    }
}