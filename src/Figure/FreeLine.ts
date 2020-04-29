import {Figure, DrawStyle, RelativePosition, DrawingEvent, DrawingEventSource} from "../types";

export default class FreeLine implements Figure{
    constructor( 
        private _style: DrawStyle,
        private _positions?: RelativePosition[],
    ){
    }

    async drawing(ctx: CanvasRenderingContext2D, events: DrawingEventSource){
        const { color, thickness, lineCap } = this._style;
        const {width, height} = ctx.canvas;

        if (color) ctx.strokeStyle = color;
        if (thickness) ctx.lineWidth = thickness;
        if (lineCap) ctx.lineCap = lineCap;
        
        this._positions = [];
        ctx.beginPath();

        for await(const event of events) {
            const {x, y} = event.relativePosition;
            
            if(this._positions.length){
                ctx.lineTo(width * x, height * y);
                ctx.stroke();
            }else{
                ctx.moveTo(width * x, height * y);
            }

            this._positions.push({x, y});
        }
    }

    render(ctx: CanvasRenderingContext2D){
        if(!this._positions) return;

        const { color, thickness, lineCap } = this._style;
        const {width, height} = ctx.canvas;

        if (color) ctx.strokeStyle = color;
        if (thickness) ctx.lineWidth = thickness;
        if (lineCap) ctx.lineCap = lineCap;

        ctx.beginPath();
        
        for (const position of this._positions) {
            ctx.lineTo(width * position.x, height* position.y);
            ctx.stroke();
        }
    }
}