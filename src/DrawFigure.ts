import { DrawOption, Position } from './Painter';

export type Figure = {
    id: number;
    drawOption: DrawOption;
    positions: Position[];
}

let id = 0;
export default class DrawFigure {
    id: number;
    positions: Position[];
    drawOption: DrawOption;

    constructor(positions: Position[], drawOption: DrawOption) {
        this.id = id += 1;
        this.positions = positions;
        this.drawOption = drawOption;
    }
}