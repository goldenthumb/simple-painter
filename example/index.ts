import { Painter } from '../src';

const root = document.getElementById('root');
const canvas = root.appendChild(document.createElement('canvas'));
const painter = new Painter({ canvas, width: 500, height: 500 });

painter.on('drawStart', (position) => {
    console.log('drawStart', position);
});

painter.on('drawing', (position) => {
    console.log('drawing', position);
});

painter.on('drawEnd', (positions) => {
    console.log('drawEnd', positions);
});

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

painter.drawFigure([
    { x: 0.45800570994602724, y: 0.29400569993626097 },
    { x: 0.6980057245944656, y: 0.46000571006809754 },
], { 
    type: 'rectangle',
    color: 'blue',
    thickness: 3,
    lineCap: 'round',
});
