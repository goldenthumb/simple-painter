import {Figure, DrawStyle, RelativePosition, DrawingEvent, DrawingEventSource} from "../types";

export default class Ellipse implements Figure{
    constructor( 
        private _style: DrawStyle,
        private _start?: RelativePosition,
        private _end?: RelativePosition,
    ){
    }

    async drawing(ctx: CanvasRenderingContext2D, events: DrawingEventSource){
        const {width, height} = ctx.canvas;

        for await(const event of events) {
            const {relativePosition} = event;
            
            if(this._start){
                this._end = relativePosition;
            }else{
                this._start = this._end = relativePosition;
            }

            ctx.clearRect(0, 0, width, height);
            this.render(ctx);
        }
    }

    render(ctx: CanvasRenderingContext2D){
        if(this._start === undefined || this._end === undefined) return;

        const { color, thickness, lineCap } = this._style;
        const {canvas} = ctx;

        if (color) ctx.strokeStyle = color;
        if (thickness) ctx.lineWidth = thickness;
        if (lineCap) ctx.lineCap = lineCap;

        ctx.beginPath();

        const startPosition = this._start;
        const position = this._end;
        
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