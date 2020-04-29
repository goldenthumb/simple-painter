import {Figure, DrawStyle, RelativePosition, DrawingEvent, DrawingEventSource} from "../types";

export default class Rectangle implements Figure{
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
        const {width, height} = ctx.canvas;

        if (color) ctx.strokeStyle = color;
        if (thickness) ctx.lineWidth = thickness;
        if (lineCap) ctx.lineCap = lineCap;

        const { x: startX, y: startY } = this._start;
        const { x, y } = this._end;

        ctx.strokeRect(
            startX * width, 
            startY * height, 
            (x - startX) * width, 
            (y - startY) * height
        );
    }
}