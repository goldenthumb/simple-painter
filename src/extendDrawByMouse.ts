import Painter from './Painter';

export default function extendDrawingByMouse(painter: Painter){
    let isDrawing = false;

    painter.canvas.addEventListener('mousedown', (event) => {
        isDrawing = true;
        painter._liveStartDraw(normalizePosition(painter.canvas, event));
    });

    painter.canvas.addEventListener('mousemove', (event) => {
        if (!isDrawing) return;
        painter._liveDrawing(normalizePosition(painter.canvas, event));
    });

    painter.canvas.addEventListener('mouseup', (event) => {
        if (!isDrawing) return;
        isDrawing = false;
        painter._liveDrawing(normalizePosition(painter.canvas, event));
        painter._liveEndDraw();
    });
}

function normalizePosition(canvas: HTMLCanvasElement, { clientX, clientY }: MouseEvent) {
    const { top, left, width, height } = canvas.getBoundingClientRect();
    
    return {
        x: Number((clientX - left) / width),
        y: Number((clientY - top) / height)
    };
}