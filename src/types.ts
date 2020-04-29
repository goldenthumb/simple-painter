export type RelativePosition = { x: number; y: number };

export interface DrawStyle {
    color?: string | CanvasGradient | CanvasPattern;
    thickness?: number;
    lineCap?: CanvasLineCap;
}

export interface DrawingEvent {
    originalEvent: MouseEvent|TouchEvent;
    relativePosition: RelativePosition;
}

export type DrawingListener = (e: DrawingEvent) => void

export type DrawingEventSource = AsyncGenerator<DrawingEvent>

export interface Figure{
    drawing(ctx: CanvasRenderingContext2D, events: DrawingEventSource): void;
    
    render(ctx: CanvasRenderingContext2D): void;
}