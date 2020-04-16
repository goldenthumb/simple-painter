/* eslint-disable @typescript-eslint/no-explicit-any */
import Painter from './Painter';

export default function extendDrawByMouse(painter: Painter) {
    const { canvas } = painter;
    const isTouchDevice = 'ontouchstart' in window || navigator.msMaxTouchPoints;
    let isDrawing = false;

    const offEvents = isTouchDevice ? [
        on(canvas, 'touchstart', (event) => {
            const { clientX, clientY } = event.touches[0];
            const position = normalizePosition(canvas, { clientX, clientY });
            startDraw(position);
            drawing(position);
            event.preventDefault();
        }),
        on(canvas, 'touchmove', (event) => {
            const { clientX, clientY } = event.touches[0];
            const position = normalizePosition(canvas, { clientX, clientY });
            drawing(position);
            event.preventDefault();
        }),
        on(canvas, 'touchend', (event) => {
            endDraw();
            event.preventDefault();
        }),
    ] : [
        on(canvas, 'mousedown', ({ clientX, clientY }) => {
            const position = normalizePosition(canvas, { clientX, clientY });
            startDraw(position);
            drawing(position);
        }),
        on(canvas, 'mousemove', ({ clientX, clientY }) => {
            const position = normalizePosition(canvas, { clientX, clientY });
            drawing(position);
        }),
        on(document, 'mouseup', endDraw),
    ];

    function startDraw({ x, y }: { x: number; y: number }) {
        isDrawing = true;
        painter._startLiveDraw({ x, y });
    };

    function drawing({ x, y }: { x: number; y: number }) {
        if (!isDrawing) return;
        painter._liveDrawing({ x, y });
    };

    function endDraw() {
        if (!isDrawing) return;
        isDrawing = false;
        painter._endLiveDraw();
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