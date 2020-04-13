import DrawFigure from './DrawFigure';

export default class PainterController {
    private _figures: DrawFigure[];
    private _head: number;

    constructor() {
        this._figures = [];
        this._head = 0;
    }

    addFigure(figure: DrawFigure) {
        this._figures.push(figure);
        this._head += 1;
    }

    undo() {
        //
    }

    redo() {
        //
    }
}