import Painter, { Position, DrawOption, DrawFigure } from './Painter';

export default class PainterView {
    private _painter: Painter;

    constructor(painter: Painter) {
        this._painter = painter;
    }

    drawFreeLineFigure({ positions, ...drawOption }: DrawFigure) {
        this.setDrawInfo(drawOption);

        for (const position of positions) {
            this.drawFreeLine(position);
        }
    }

    drawRectangleFigure({ positions, ...drawOption }: DrawFigure) {
        this.setDrawInfo(drawOption);
        this.drawRectangle(positions);
    }

    setDrawInfo(drawOption: DrawOption) {
        const { ctx } = this._painter;
        const { color, thickness, lineCap } = drawOption;

        if (color) ctx.strokeStyle = color;
        if (thickness) ctx.lineWidth = thickness;
        if (lineCap) ctx.lineCap = lineCap;

        ctx.beginPath();
    }

    drawFreeLine(position: Position) {
        const { ctx, canvas } = this._painter;
        const { width , height } = canvas;

        ctx.lineTo(width * position.x, height * position.y);
        ctx.stroke();
    }

    drawRectangle(positions: Position[]) {
        const { x: startX, y: startY } = positions[0];
        const { x: endX, y: endY } = positions[positions.length - 1];
        const { ctx, canvas } = this._painter;
        const { width , height } = canvas;

        ctx.strokeRect(
            startX * width, 
            startY * height, 
            (endX - startX) * width, 
            (endY - startY) * height
        );
    }
}