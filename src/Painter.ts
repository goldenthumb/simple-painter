import PainterView from './PainterView';
import extendDrawByMouse from './extendDrawByMouse';

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
    drawOption?: DrawOption;
}

export default class Painter {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    drawOption: DrawOption;

    private _painterView: PainterView;
    private _drawFigures: DrawFigure[];
    private _drawPositions: Position[];

    constructor({ canvas, drawOption }: PainterOptions) {
        const ctx =  canvas.getContext('2d');
        if (!ctx) throw new Error('2d context not supported');

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
        this._painterView = new PainterView(this);

        extendDrawByMouse(this);
    }

    setDrawOption(drawOption: DrawOption) {
        this.drawOption = drawOption;
    }

    drawFigure(positions: Position[]) {
        this._drawFigures.push({ positions, drawOption: this.drawOption });
        this._render();
    }

    _liveStartDraw(position: Position) {
        if (this.drawOption.type === 'freeLine') {
            this._painterView.setDrawInfo(this.drawOption);
            this._painterView.startFreeLinePiece(position);
        }

        this._drawPositions.push(position);
    }

    _liveDrawing(position: Position) {
        if (this.drawOption.type === 'freeLine') {
            this._painterView.drawFreeLinePiece(position);
        }

        this._drawPositions.push(position);
    }

    _liveEndDraw() {
        this._drawFigures.push({ positions: this._drawPositions, drawOption: this.drawOption });
        this._drawPositions = [];
        this._render();
    }

    _render() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (const { drawOption, positions } of this._drawFigures) {
            if (drawOption.type === 'freeLine') {
                this._painterView.drawFreeLineFigure(positions, drawOption);
            }
        }
    }
}