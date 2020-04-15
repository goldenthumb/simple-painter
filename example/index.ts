import { Painter } from '../src';

const root = document.getElementById('root');
const canvas = root.appendChild(document.createElement('canvas'));
canvas.width = 500;
canvas.height = 400;

const painter = new Painter({ canvas });

painter.drawFigure([
    { x: 0.654859, y: 0.141068 },
    { x: 0.655767, y: 0.141068 },
    { x: 0.654859, y: 0.144299 },
    { x: 0.652134, y: 0.155608 },
    { x: 0.64941, y: 0.163685 },
    { x: 0.643052, y: 0.186302 },
    { x: 0.640327, y: 0.195995 },
    { x: 0.63851, y: 0.202457 },
]);
