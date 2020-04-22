# simple-painter [![npm](https://img.shields.io/npm/v/simple-painter.svg)](https://www.npmjs.com/package/simple-painter)
JavaScript painting plugin in a browser. <br>
Simple Painter based on HTML5/Canvas.
<br />
<br />

## Installing
```bash
$ npm install simple-painter
```
<br />
<br />

## Example
- [https://goldenthumb.github.io/simple-painter](https://goldenthumb.github.io/simple-painter)
```bash
$ git clone https://github.com/goldenthumb/simple-painter.git
$ cd simple-painter
$ npm install
$ npm run start

Now open this URL in your browser: http://localhost:1234/
```
<br />
<br />

## Usage
Please refer to the file. (example/index.ts)

```js
import Painter from 'simple-painter';

const canvas = document.getElementById('myCanvas');
const painter = new Painter({ canvas });

// change draw option
// setType, setColor, setThickness, setLineCap
painter.setOptions({ 
    type: 'ellipse',
    color: 'green',
    thickness: 2,
    lineCap: 'round',
});

// add draw figure
painter.drawFigure({ 
    type: 'rectangle',
    color: 'blue',
    thickness: 10,
    lineCap: 'round',
    positions: [
        // 0 ~ 1 percent
        { x: 0.45800570994602724, y: 0.29400569993626097 }, 
        { x: 0.6980057245944656, y: 0.46000571006809754 },
    ]
});

```
<br />
<br />

## API
### new SimplePainter(options)
Create instance.
```js
/**
 * @param {object} [options]
 * @param {HTMLCanvasElement} options.canvas
 * @param {width} [options.width]
 * @param {height} [options.height]
 * @param {boolean} [options.drawMouse]
 * @param {'freeLine'|'straightLine'|'rectangle'|'ellipse'} [options.type]
 * @param {string|CanvasGradient|CanvasPattern} [options.color]
 * @param {number} [options.thickness]
 * @param {CanvasLineCap} [options.lineCap]
 */

const painter = new SimplePainter({ canvas });
```

#### options
```
{   
    canvas,             // HTMLCanvasElement.
    width,              // Canvas width.
    height,             // Canvas height.
    drawMouse: true,    // allow draw by mouse or touch. Default is true
    type: 'freeLine',   // draw type. Default is 'freeLine'
    color: 'red',       // draw color. Default is 'red'
    thickness: 3,       // draw thickness. Default is 3
    lineCap: 'square',  // draw lineCap. Default is 'square'
}
```
<br />

### painter.setOptions(options)
Change options.

```js
painter.setOptions({
    type: 'rectangle',
    color: 'blue',
    thickness: 10,
    lineCap: 'round',
})
```
<br />

### painter.setType(type)
Change type.

```js
/** @param {'freeLine'|'straightLine'|'rectangle'|'ellipse'} type */
painter.setType('ellipse');
```
<br />

### painter.setColor(color)
Change color.

```js
/** @param {string|CanvasGradient|CanvasPattern} color */
painter.setColor('#8956FF');
```
<br />

### painter.setThickness(thickness)
Change thickness.

```js
/** @param {number} thickness */
painter.setThickness(10);
```
<br />

### painter.setLineCap(lineCap)
Change lineCap.

```js
/** @param {'butt'|'round'|'square'} lineCap */
painter.setLineCap(10);
```
<br />

### painter.drawFigure(drawFigure)
Add draw figure and render.

```js
/**
 * @param {boolean} [options.drawMouse]
 * @param {'freeLine'|'straightLine'|'rectangle'|'ellipse'} [options.type]
 * @param {string|CanvasGradient|CanvasPattern} [options.color]
 * @param {number} [options.thickness]
 * @param {CanvasLineCap} [options.lineCap]
 * @param {{ x: number; y: number }[]} options.positions
 */
painter.drawFigure({
    type: 'ellipse',
    color: 'green',
    thickness: 2,
    lineCap: 'round',
    positions: [
        { x: 0.589660464410864, y: 0.39722129782530574 },
        { x: 0.8147651703463574, y: 0.5984210792366761 },
    ],
});
```
<br />

### painter.clear()
Clear draw.

```js
painter.clear();
```
<br />

### painter.destroy()
Remove events.

```js
painter.destroy();
```
<br />

### painter.on(eventName, listener)
Add an event listener.<br />
Returns Function to remove the event listener(s).
<br />

##### Events
- drawStart - Event occurs when drawing starts.
- drawing - Event occurs when drawing.
- drawEnd - Event occurs when drawing is finished.

```js
/**
 * @param {x: number; y: number} position
 * @param {MouseEvent | TouchEvent} event
 */
painter.on('drawStart', (position, event) => {
    console.log(position, event);
});
```

```js
/**
 * @param {x: number; y: number} position
 * @param {MouseEvent | TouchEvent} event
 */
painter.on('drawing', (position, event) => {
    console.log(position, event);
});
```

```js
/**
 * @param {{x: number; y: number}[]} positions
 * @param {MouseEvent | TouchEvent} event
 */
painter.on('drawEnd', (positions, event) => {
    console.log(positions, event);
});
```
<br />
<br />

## License
MIT

<br />

