import { Painter } from '../src';

const freeLineButton = document.getElementById('freeLine');
const rectangleButton = document.getElementById('rectangle');
const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const painter = new Painter({ canvas, width: 500, height: 500 });

freeLineButton.addEventListener('click', () => {
    painter.setDrawOption({ type: 'freeLine' });
    freeLineButton.style.background = 'darkgray';
    rectangleButton.style.background = 'white';
});

rectangleButton.addEventListener('click', () => {
    painter.setDrawOption({ type: 'rectangle' });
    rectangleButton.style.background = 'darkgray';
    freeLineButton.style.background = 'white';
});

painter.on('drawStart', (position) => {
    console.log('drawStart', position);
});

painter.on('drawing', (position) => {
    console.log('drawing', position);
});

painter.on('drawEnd', (positions) => {
    console.log('drawEnd', positions);
});

painter.drawFigure({
    type: 'freeLine',
    color: 'red',
    thickness: 3,
    lineCap: 'round',
    positions: [
        { x: 0.654859, y: 0.141068 },
        { x: 0.655767, y: 0.141068 },
        { x: 0.654859, y: 0.144299 },
        { x: 0.652134, y: 0.155608 },
        { x: 0.64941, y: 0.163685 },
        { x: 0.643052, y: 0.186302 },
        { x: 0.640327, y: 0.195995 },
        { x: 0.63851, y: 0.202457 },
    ]
});

painter.drawFigure({ 
    type: 'rectangle',
    color: 'blue',
    thickness: 3,
    lineCap: 'round',
    positions: [
        { x: 0.45800570994602724, y: 0.29400569993626097 },
        { x: 0.6980057245944656, y: 0.46000571006809754 },
    ]
});
