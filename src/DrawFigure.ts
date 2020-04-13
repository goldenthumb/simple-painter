import { DrawType, Position } from './Painter';

interface DrawFigureOption {
    type: DrawType;
    width: number;
    height: number;
    positions: Position[];
}

export default class DrawFigure {
    type: DrawType;
    width: number;
    height: number;
    positions: {
        id: number;
        x: number;
        y: number;
    }[];

    constructor({ type, width, height, positions }: DrawFigureOption) {
        this.type = type;
        this.width = width;
        this.height = height;
        this.positions = this._normalize(positions);
    }

    _normalize(positions: Position[]) {
        return positions.map(({ x, y }: Position, id: number) => ({
            id,
            x: (typeof x === 'string' && x.trim().slice(-1) === '%') ? 
                this.width * parseFloat(x) :
                Number(x),
            y: (typeof y === 'string' && y.trim().slice(-1) === '%') ?
                this.height * parseFloat(y) :
                Number(y),
        }));
    }
}