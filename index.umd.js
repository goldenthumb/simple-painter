!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e(t.simplePainter={})}(this,function(t){const e=function(){function t(){}return t.prototype.then=function(e,i){const r=new t,o=this.s;if(o){const t=1&o?e:i;if(t){try{n(r,1,t(this.v))}catch(t){n(r,2,t)}return r}return this}return this.o=function(t){try{const o=t.v;1&t.s?n(r,1,e?e(o):o):i?n(r,1,i(o)):n(r,2,o)}catch(t){n(r,2,t)}},r},t}();function n(t,i,r){if(!t.s){if(r instanceof e){if(!r.s)return void(r.o=n.bind(null,t,i));1&i&&(i=r.s),r=r.v}if(r&&r.then)return void r.then(n.bind(null,t,i),n.bind(null,t,2));t.s=i,t.v=r;const o=t.o;o&&o(t)}}function i(t){return t instanceof e&&1&t.s}const r="undefined"!=typeof Symbol?Symbol.iterator||(Symbol.iterator=Symbol("Symbol.iterator")):"@@iterator",o="undefined"!=typeof Symbol?Symbol.asyncIterator||(Symbol.asyncIterator=Symbol("Symbol.asyncIterator")):"@@asyncIterator";function s(t,s,h){if("function"==typeof t[o]){var a=new e,u=t[o]();return u.next().then(l).then(void 0,f),a;function c(t){if(h&&h())return n(a,1,u.return?u.return().then(function(){return t}):t);u.next().then(l).then(void 0,f)}function l(t){t.done?n(a,1):Promise.resolve(s(t.value)).then(c).then(void 0,f)}function f(t){n(a,2,u.return?u.return().then(function(){return t}):t)}}return Promise.resolve(function(t,o,s){if("function"==typeof t[r]){var h,a,u,c=t[r]();if(function t(r){try{for(;!((h=c.next()).done||s&&s());)if((r=o(h.value))&&r.then){if(!i(r))return void r.then(t,u||(u=n.bind(null,a=new e,2)));r=r.v}a?n(a,1,r):a=r}catch(t){n(a||(a=new e),2,t)}}(),c.return){var l=function(t){try{h.done||c.return()}catch(t){}return t};if(a&&a.then)return a.then(l,function(t){throw l(t)});l()}return a}if(!("length"in t))throw new TypeError("Object is not iterable");for(var f=[],v=0;v<t.length;v++)f.push(t[v]);return function(t,r,o){var s,h,a=-1;return function u(c){try{for(;++a<t.length&&(!o||!o());)if((c=r(a))&&c.then){if(!i(c))return void c.then(u,h||(h=n.bind(null,s=new e,2)));c=c.v}s?n(s,1,c):s=c}catch(t){n(s||(s=new e),2,t)}}(),s}(f,function(t){return o(f[t])},s)}(t,function(t){return Promise.resolve(t).then(s)},h))}const h={},a=function(){function t(t){this._entry=t,this._pact=null,this._resolve=null,this._return=null,this._promise=null}function i(t){return{value:t,done:!0}}function r(t){return{value:t,done:!1}}return t.prototype._yield=function(t){return this._resolve(t&&t.then?t.then(r):r(t)),this._pact=new e},t.prototype.next=function(t){const r=this;return r._promise=new Promise(function(o){const s=r._pact;if(null===s){const t=r._entry;if(null===t)return o(r._promise);function a(t){r._resolve(t&&t.then?t.then(i):i(t)),r._pact=null,r._resolve=null}r._entry=null,r._resolve=o;var u=t(r);u&&u.then?u.then(a,function(t){if(t===h)a(r._return);else{const n=new e;r._resolve(n),r._pact=null,r._resolve=null,_resolve(n,2,t)}}):a(u)}else r._pact=null,r._resolve=o,n(s,1,t)})},t.prototype.return=function(t){const e=this;return e._promise=new Promise(function(r){const o=e._pact;if(null===o)return null===e._entry?r(e._promise):(e._entry=null,r(t&&t.then?t.then(i):i(t)));e._return=t,e._resolve=r,e._pact=null,n(o,2,h)})},t.prototype.throw=function(t){const e=this;return e._promise=new Promise(function(i,r){const o=e._pact;if(null===o)return null===e._entry?i(e._promise):(e._entry=null,r(t));e._resolve=i,e._pact=null,n(o,2,t)})},t.prototype[o]=function(){return this},t}();var u=function(){this._events={}};u.prototype.emit=function(t){for(var e=[],n=arguments.length-1;n-- >0;)e[n]=arguments[n+1];for(var i=0,r=this._events[t]||[];i<r.length;i+=1)r[i].apply(void 0,e)},u.prototype.on=function(t,e){var n=this;return(this._events[t]=this._events[t]||[]).push(e),function(){return n._events[t]=n._events[t].filter(function(t){return t!==e})}},u.prototype.allOff=function(){this._events={}};var c=function(t,e){this._style=t,this._positions=e};c.prototype.drawing=function(t,e){try{var n=this,i=n._style,r=i.color,o=i.thickness,h=i.lineCap,a=t.canvas,u=a.width,c=a.height;r&&(t.strokeStyle=r),o&&(t.lineWidth=o),h&&(t.lineCap=h),n._positions=[],t.beginPath();var l=s(e,function(e){var i=e.relativePosition,r=i.x,o=i.y;n._positions.length?(t.lineTo(u*r,c*o),t.stroke()):t.moveTo(u*r,c*o),n._positions.push({x:r,y:o})});return Promise.resolve(l&&l.then?l.then(function(){}):void 0)}catch(t){return Promise.reject(t)}},c.prototype.render=function(t){if(this._positions){var e=this._style,n=e.color,i=e.thickness,r=e.lineCap,o=t.canvas,s=o.width,h=o.height;n&&(t.strokeStyle=n),i&&(t.lineWidth=i),r&&(t.lineCap=r),t.beginPath();for(var a=0,u=this._positions;a<u.length;a+=1){var c=u[a];t.lineTo(s*c.x,h*c.y),t.stroke()}}};var l=function(t,e,n){this._style=t,this._start=e,this._end=n};l.prototype.drawing=function(t,e){try{var n=this,i=t.canvas,r=i.width,o=i.height,h=s(e,function(e){var i=e.relativePosition;n._start?n._end=i:n._start=n._end=i,t.clearRect(0,0,r,o),n.render(t)});return Promise.resolve(h&&h.then?h.then(function(){}):void 0)}catch(t){return Promise.reject(t)}},l.prototype.render=function(t){if(void 0!==this._start&&void 0!==this._end){var e=this._style,n=e.color,i=e.thickness,r=e.lineCap,o=t.canvas,s=o.width,h=o.height;n&&(t.strokeStyle=n),i&&(t.lineWidth=i),r&&(t.lineCap=r);var a=this._start,u=a.x,c=a.y,l=this._end,f=l.x,v=l.y;t.beginPath(),t.moveTo(u*s,c*h),t.lineTo(f*s,v*h),t.stroke()}};var f=function(t,e,n){this._style=t,this._start=e,this._end=n};f.prototype.drawing=function(t,e){try{var n=this,i=t.canvas,r=i.width,o=i.height,h=s(e,function(e){var i=e.relativePosition;n._start?n._end=i:n._start=n._end=i,t.clearRect(0,0,r,o),n.render(t)});return Promise.resolve(h&&h.then?h.then(function(){}):void 0)}catch(t){return Promise.reject(t)}},f.prototype.render=function(t){if(void 0!==this._start&&void 0!==this._end){var e=this._style,n=e.color,i=e.thickness,r=e.lineCap,o=t.canvas,s=o.width,h=o.height;n&&(t.strokeStyle=n),i&&(t.lineWidth=i),r&&(t.lineCap=r);var a=this._start,u=a.x,c=a.y,l=this._end;t.strokeRect(u*s,c*h,(l.x-u)*s,(l.y-c)*h)}};var v=function(t,e,n){this._style=t,this._start=e,this._end=n};v.prototype.drawing=function(t,e){try{var n=this,i=t.canvas,r=i.width,o=i.height,h=s(e,function(e){var i=e.relativePosition;n._start?n._end=i:n._start=n._end=i,t.clearRect(0,0,r,o),n.render(t)});return Promise.resolve(h&&h.then?h.then(function(){}):void 0)}catch(t){return Promise.reject(t)}},v.prototype.render=function(t){if(void 0!==this._start&&void 0!==this._end){var e=this._style,n=e.color,i=e.thickness,r=e.lineCap,o=t.canvas;n&&(t.strokeStyle=n),i&&(t.lineWidth=i),r&&(t.lineCap=r),t.beginPath();var s=this._start,h=this._end,a=s.x*o.width,u=s.y*o.height,c=h.x*o.width-a,l=h.y*o.height-u,f=4*(Math.sqrt(2)-1)/3,v=c/2*f,d=l/2*f,p=a+c,_=u+l,y=a+c/2,w=u+l/2;t.beginPath(),t.moveTo(a,w),t.bezierCurveTo(a,w-d,y-v,u,y,u),t.bezierCurveTo(y+v,u,p,w-d,p,w),t.bezierCurveTo(p,w+d,y+v,_,y,_),t.bezierCurveTo(y-v,_,a,w+d,a,w),t.closePath(),t.stroke()}};var d=function(t){var e=t.canvas,n=t.width,i=t.height,r=t.drawMouse;void 0===r&&(r=!0);var o=t.type;void 0===o&&(o="freeLine");var s=t.color;void 0===s&&(s="red");var h=t.thickness;void 0===h&&(h=3);var a=t.lineCap;if(void 0===a&&(a="square"),this.disableMouseDrawing=function(){},this._figures=[],this._cursor=0,this._canvas=e,!(this._ctx=e.getContext("2d")))throw new Error("2d context not supported");n&&(e.width=n),i&&(e.height=i),this._tmpCanvas=document.createElement("canvas"),this._tmpCtx=this._tmpCanvas.getContext("2d"),this._drawOption={type:o,color:s,thickness:h,lineCap:a},this._emitter=new u,r&&this.enableMouseDrawing()},p={canvas:{configurable:!0},size:{configurable:!0}};function _(t,e,n){return t.addEventListener(e,n),function(){return t.removeEventListener(e,n)}}function y(t,e){var n=e.clientX,i=e.clientY,r=t.getBoundingClientRect(),o=r.top,s=r.height;return{x:Number((n-r.left)/r.width),y:Number((i-o)/s)}}function w(){}p.canvas.get=function(){return this._canvas},p.size.get=function(){return{width:this._canvas.width,height:this._canvas.height}},d.prototype.on=function(t,e){return this._emitter.on(t,e)},d.prototype.setSize=function(t){var e=t.width,n=t.height;e&&(this._canvas.width=e),n&&(this._canvas.height=n)},d.prototype.setOptions=function(t){this._drawOption=Object.assign({},this._drawOption,t)},d.prototype.draw=function(t){this._push(t),t.render(this._ctx)},d.prototype.undo=function(){this._cursor>0&&(this._cursor--,this.redraw())},d.prototype.redo=function(){this._cursor<this._figures.length&&(this._cursor++,this.redraw())},d.prototype.clear=function(){var t=this.size;this._ctx.clearRect(0,0,t.width,t.height)},d.prototype.destroy=function(){this.disableMouseDrawing(),this._emitter.allOff()},d.prototype.enableMouseDrawing=function(){var t=this;this.disableMouseDrawing();var r=this.canvas,o=null,s=w,h=function(h,u){switch(t._drawOption.type){case"freeLine":o=new c(t._drawOption);break;case"straightLine":o=new l(t._drawOption);break;case"rectangle":o=new f(t._drawOption);break;case"ellipse":o=new v(t._drawOption);break;default:throw new Error('There is no figure of "'+t._drawOption.type+'" type.')}var d,p,_,y,w,m,g;p=t._tmpCanvas,y=(_=(d=r).getBoundingClientRect()).top,w=_.left,m=_.width,g=_.height,Object.assign(p,{width:d.width,height:d.height}),Object.assign(p.style,{position:"fixed",top:y+(m-d.width)/2+"px",left:w+(g-d.height)/2+"px"}),document.body.appendChild(t._tmpCanvas),o.drawing(t._tmpCtx,new a(function(t){var r,o=function(t,r,o){for(var s;;){var h=t();if(i(h)&&(h=h.v),!h)return a;if(h.then){s=0;break}var a=o();if(a&&a.then){if(!i(a)){s=1;break}a=a.s}if(r){var u=r();if(u&&u.then&&!i(u)){s=2;break}}}var c=new e,l=n.bind(null,c,2);return(0===s?h.then(v):1===s?a.then(f):u.then(d)).then(void 0,l),c;function f(e){a=e;do{if(r&&(u=r())&&u.then&&!i(u))return void u.then(d).then(void 0,l);if(!(h=t())||i(h)&&!h.v)return void n(c,1,a);if(h.then)return void h.then(v).then(void 0,l);i(a=o())&&(a=a.v)}while(!a||!a.then);a.then(f).then(void 0,l)}function v(t){t?(a=o())&&a.then?a.then(f).then(void 0,l):f(a):n(c,1,a)}function d(){(h=t())?h.then?h.then(v).then(void 0,l):v(h):n(c,1,a)}}(function(){return!!Promise.resolve(new Promise(function(t){return s=t})).then(function(t){return r=t})},void 0,function(){return t._yield(r).then(function(){})});if(o&&o.then)return o.then(function(){})})),t._emitter.emit("drawStart",{originalEvent:u,canvas:t._canvas,relativePosition:h})},u=function(e,n){if(o){var i={originalEvent:n,canvas:t._canvas,relativePosition:e};s(i),t._emitter.emit("drawing",i)}},d=function(e,n){o&&(document.body.removeChild(t._tmpCanvas),s(),t._ctx.drawImage(t._tmpCanvas,0,0),t._push(o),s=w,o=null,t._emitter.emit("drawEnd",{originalEvent:n,canvas:t._canvas,relativePosition:e}))},p=null,m=[_(r,"mousedown",function(t){var e=y(r,t);h(e,t),u(e,t)}),_(document,"mousemove",function(t){var e=y(r,t);u(e,t)}),_(document,"mouseup",function(t){var e=y(r,t);d(e,t)}),_(r,"touchstart",function(t){var e=y(r,p=t.touches[0]);h(e,t),u(e,t)}),_(document,"touchmove",function(t){var e=y(r,p=t.touches[0]);u(e,t)}),_(document,"touchend",function(t){var e=y(r,p);d(e,t)})];this.disableMouseDrawing=function(){return m.forEach(function(t){return t()})}},d.prototype.redraw=function(){this.clear();for(var t=0,e=this._figures.slice(0,this._cursor);t<e.length;t+=1)e[t].render(this._ctx)},d.prototype._push=function(t){(this._figures=this._figures.slice(0,this._cursor++)).push(t)},Object.defineProperties(d.prototype,p),t.default=d,t.Painter=d,t.Ellipse=v,t.FreeLine=c,t.Rectangle=f,t.StraightLine=l});
//# sourceMappingURL=index.umd.js.map
