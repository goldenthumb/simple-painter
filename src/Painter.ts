import PainterView from './PainterView';
import DrawFigure from './DrawFigure';
import PainterController from './PainterController';

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

interface PainterOptions {
    canvas: HTMLCanvasElement;
    drawOption?: DrawOption;
}

export default class Painter {
    private _canvas: HTMLCanvasElement;
    private _painterView: PainterView;
    private _painterController: PainterController;
    private _drawFigures: DrawFigure[];
    private _drawOption: DrawOption;

    constructor({ canvas, drawOption }: PainterOptions) {
        const ctx =  canvas.getContext('2d');
        if (!ctx) throw new Error('2d context not supported');

        this._canvas = canvas;
        this._drawFigures = [];
        this._drawOption = {
            type: 'freeLine',
            color: 'red',
            thickness: 3,
            lineCap: 'round',
            ...drawOption,
        };

        this._painterView = new PainterView(canvas, ctx);
        this._painterController = new PainterController(canvas, ctx, this._drawOption);

        this._painterController.on('endDraw', (positions) => {
            // this._drawFigures.push(
            //     new DrawFigure(positions, this._drawOption)
            // );
        });
    }

    setDrawOption(drawOption: DrawOption) {
        this._drawOption = drawOption;
    }

    draw(positions: Position[]) {
        this._drawFigures.push(
            new DrawFigure(positions, this._drawOption)
        );
    }

    render() {
        this._painterView.render(this._drawFigures);
    }
}