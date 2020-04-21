/* eslint-disable @typescript-eslint/no-explicit-any */
import Painter from './Painter';

export default function extendDrawByMouse(painter: Painter) {
    const { canvas } = painter;
    let isDrawing = false;

    const offEvents = [
        on(canvas, 'mousedown', (event) => {
            const { clientX, clientY } = event;
            const position = normalizePosition(canvas, { clientX, clientY });
            startDraw(position, event);
            drawing(position, event);
        }),
        on(document, 'mousemove', (event) => {
            const { clientX, clientY } = event;
            const position = normalizePosition(canvas, { clientX, clientY });
            drawing(position, event);
        }),
        on(document, 'mouseup', endDraw),

        on(canvas, 'touchstart', (event) => {
            const { clientX, clientY } = event.touches[0];
            const position = normalizePosition(canvas, { clientX, clientY });
            startDraw(position, event);
            drawing(position, event);
        }),
        on(document, 'touchmove', (event) => {
            const { clientX, clientY } = event.touches[0];
            const position = normalizePosition(canvas, { clientX, clientY });
            drawing(position, event);
        }),
        on(document, 'touchend', endDraw),
    ];

    function startDraw({ x, y }: { x: number; y: number }, event: MouseEvent | TouchEvent) {
        isDrawing = true;
        painter._startLiveDraw({ x, y }, event);
    };

    function drawing({ x, y }: { x: number; y: number }, event: MouseEvent | TouchEvent) {
        if (!isDrawing) return;
        painter._liveDrawing({ x, y }, event);
    };

    function endDraw(event: MouseEvent | TouchEvent) {
        if (!isDrawing) return;
        isDrawing = false;
        painter._endLiveDraw(event);
    };

    return () => {
        offEvents.forEach(off => off());
    };
}

type EventMap<Element=HTMLElement> = Element extends Document ? 
    DocumentEventMap : HTMLElementEventMap

function on<E extends HTMLElement|Document, Event extends keyof EventMap<E>>(
    element: E,
    name: Event, 
    callback: (event: EventMap<E>[Event]) => void
) {
    (element as any).addEventListener(name, callback);
    return () => (element as any).removeEventListener(name, callback);
}

function normalizePosition(
    canvas: HTMLCanvasElement, 
    { clientX, clientY }: { clientX: number; clientY: number }
) {
    const { top, left, width, height } = canvas.getBoundingClientRect();
    return {
        x: Number((clientX - left) / width),
        y: Number((clientY - top) / height)
    };
}