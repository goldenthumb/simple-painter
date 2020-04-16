import Painter, { Position, DrawOption } from './Painter';

export default class PainterView {
    private _painter: Painter;

    constructor(painter: Painter) {
        this._painter = painter;
    }

    drawFreeLineFigure(positions: Position[], drawOption: DrawOption) {
        positions.forEach((position, index) => {
            if (index === 0) {
                this.setDrawInfo(drawOption);
                this.startFreeLinePiece(position);
            } else {
                this.drawFreeLinePiece(position);
            }
        });
    }

    drawRectangleFigure(positions: Position[], drawOption: DrawOption) {
        this.setDrawInfo(drawOption);
        this.drawRectanglePiece(positions);
    }

    setDrawInfo(drawOption: DrawOption) {
        const { ctx } = this._painter;
        const { color, thickness, lineCap } = drawOption;
        ctx.beginPath();

        if (color) ctx.strokeStyle = color;
        if (thickness) ctx.lineWidth = thickness;
        if (lineCap) ctx.lineCap = lineCap;
    }

    startFreeLinePiece(position: Position) {
        const { ctx, canvas } = this._painter;
        const { width , height } = canvas;

        ctx.moveTo(width * position.x, height * position.y);
        ctx.stroke();
    }

    drawFreeLinePiece(position: Position) {
        const { ctx, canvas } = this._painter;
        const { width , height } = canvas;

        ctx.lineTo(width * position.x, height * position.y);
        ctx.stroke();
    }

    drawRectanglePiece(positions: Position[]) {
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