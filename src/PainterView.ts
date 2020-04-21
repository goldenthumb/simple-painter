import Painter, { Position, DrawOption, DrawFigure } from './Painter';

export default class PainterView {
    private _painter: Painter;

    constructor(painter: Painter) {
        this._painter = painter;
    }

    drawFreeLineFigure({ positions, ...drawOption }: DrawFigure) {
        this.setDrawInfo(drawOption);
        this.setStartPosition(positions[0]);
        
        for (const position of positions) {
            this.drawLine(position);
        }
    }

    drawRectangleFigure({ positions, ...drawOption }: DrawFigure) {
        this.setDrawInfo(drawOption);
        this.drawRectangle(positions);
    }

    drawEllipseFigure({ positions, ...drawOption }: DrawFigure) {
        this.setDrawInfo(drawOption);
        this.drawEllipse(positions);
    }

    setDrawInfo(drawOption: DrawOption) {
        const { ctx } = this._painter;
        const { color, thickness, lineCap } = drawOption;

        if (color) ctx.strokeStyle = color;
        if (thickness) ctx.lineWidth = thickness;
        if (lineCap) ctx.lineCap = lineCap;

        ctx.beginPath();
    }

    setStartPosition(position: Position) {
        const { ctx, canvas } = this._painter;
        ctx.moveTo(canvas.width * position.x, canvas.height * position.y);
    }

    drawLine(position: Position) {
        const { ctx, canvas } = this._painter;
        ctx.lineTo(canvas.width * position.x, canvas.height * position.y);
        ctx.stroke();
    }

    drawRectangle(positions: Position[]) {
        const { x: startX, y: startY } = positions[0];
        const { x, y } = positions[positions.length - 1];
        const { ctx, canvas } = this._painter;

        ctx.strokeRect(
            startX * canvas.width, 
            startY * canvas.height, 
            (x - startX) * canvas.width, 
            (y - startY) * canvas.height
        );
    }

    drawEllipse(positions: Position[]) {
        const startPosition = positions[0];
        const position = positions[positions.length - 1];
        const { ctx, canvas } = this._painter;

        const startX = startPosition.x * canvas.width;
        const startY = startPosition.y * canvas.height;
        const x = position.x * canvas.width;
        const y = position.y * canvas.height;
        const width = x - startX;
        const height = y - startY;
        const kappa = (4 * (Math.sqrt(2) - 1)) / 3;
        const offsetX = (width / 2) * kappa;
        const offsetY = (height / 2) * kappa;
        const endX = startX + width;
        const endY = startY + height;
        const midX = startX + width / 2;
        const midY = startY + height / 2;

        ctx.beginPath();
        ctx.moveTo(startX, midY);
        ctx.bezierCurveTo(startX, midY - offsetY, midX - offsetX, startY, midX, startY);
        ctx.bezierCurveTo(midX + offsetX, startY, endX, midY - offsetY, endX, midY);
        ctx.bezierCurveTo(endX, midY + offsetY, midX + offsetX, endY, midX, endY);
        ctx.bezierCurveTo(midX - offsetX, endY, startX, midY + offsetY, startX, midY);
        ctx.closePath();
        ctx.stroke();
    }
}