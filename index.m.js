const t=function(){function t(){}return t.prototype.then=function(e,i){const r=new t,o=this.s;if(o){const t=1&o?e:i;if(t){try{n(r,1,t(this.v))}catch(t){n(r,2,t)}return r}return this}return this.o=function(t){try{const o=t.v;1&t.s?n(r,1,e?e(o):o):i?n(r,1,i(o)):n(r,2,o)}catch(t){n(r,2,t)}},r},t}();function n(e,i,r){if(!e.s){if(r instanceof t){if(!r.s)return void(r.o=n.bind(null,e,i));1&i&&(i=r.s),r=r.v}if(r&&r.then)return void r.then(n.bind(null,e,i),n.bind(null,e,2));e.s=i,e.v=r;const o=e.o;o&&o(e)}}function e(n){return n instanceof t&&1&n.s}const i="undefined"!=typeof Symbol?Symbol.iterator||(Symbol.iterator=Symbol("Symbol.iterator")):"@@iterator",r="undefined"!=typeof Symbol?Symbol.asyncIterator||(Symbol.asyncIterator=Symbol("Symbol.asyncIterator")):"@@asyncIterator";function o(o,s,h){if("function"==typeof o[r]){var a=new t,u=o[r]();return u.next().then(l).then(void 0,v),a;function c(t){if(h&&h())return n(a,1,u.return?u.return().then(function(){return t}):t);u.next().then(l).then(void 0,v)}function l(t){t.done?n(a,1):Promise.resolve(s(t.value)).then(c).then(void 0,v)}function v(t){n(a,2,u.return?u.return().then(function(){return t}):t)}}return Promise.resolve(function(r,o,s){if("function"==typeof r[i]){var h,a,u,c=r[i]();if(function i(r){try{for(;!((h=c.next()).done||s&&s());)if((r=o(h.value))&&r.then){if(!e(r))return void r.then(i,u||(u=n.bind(null,a=new t,2)));r=r.v}a?n(a,1,r):a=r}catch(e){n(a||(a=new t),2,e)}}(),c.return){var l=function(t){try{h.done||c.return()}catch(t){}return t};if(a&&a.then)return a.then(l,function(t){throw l(t)});l()}return a}if(!("length"in r))throw new TypeError("Object is not iterable");for(var v=[],f=0;f<r.length;f++)v.push(r[f]);return function(i,r,o){var s,h,a=-1;return function u(c){try{for(;++a<i.length&&(!o||!o());)if((c=r(a))&&c.then){if(!e(c))return void c.then(u,h||(h=n.bind(null,s=new t,2)));c=c.v}s?n(s,1,c):s=c}catch(e){n(s||(s=new t),2,e)}}(),s}(v,function(t){return o(v[t])},s)}(o,function(t){return Promise.resolve(t).then(s)},h))}const s={},h=function(){function e(t){this._entry=t,this._pact=null,this._resolve=null,this._return=null,this._promise=null}function i(t){return{value:t,done:!0}}function o(t){return{value:t,done:!1}}return e.prototype._yield=function(n){return this._resolve(n&&n.then?n.then(o):o(n)),this._pact=new t},e.prototype.next=function(e){const r=this;return r._promise=new Promise(function(o){const h=r._pact;if(null===h){const n=r._entry;if(null===n)return o(r._promise);function a(t){r._resolve(t&&t.then?t.then(i):i(t)),r._pact=null,r._resolve=null}r._entry=null,r._resolve=o;var u=n(r);u&&u.then?u.then(a,function(n){if(n===s)a(r._return);else{const e=new t;r._resolve(e),r._pact=null,r._resolve=null,_resolve(e,2,n)}}):a(u)}else r._pact=null,r._resolve=o,n(h,1,e)})},e.prototype.return=function(t){const e=this;return e._promise=new Promise(function(r){const o=e._pact;if(null===o)return null===e._entry?r(e._promise):(e._entry=null,r(t&&t.then?t.then(i):i(t)));e._return=t,e._resolve=r,e._pact=null,n(o,2,s)})},e.prototype.throw=function(t){const e=this;return e._promise=new Promise(function(i,r){const o=e._pact;if(null===o)return null===e._entry?i(e._promise):(e._entry=null,r(t));e._resolve=i,e._pact=null,n(o,2,t)})},e.prototype[r]=function(){return this},e}();var a=function(){this._events={}};a.prototype.emit=function(t){for(var n=[],e=arguments.length-1;e-- >0;)n[e]=arguments[e+1];for(var i=0,r=this._events[t]||[];i<r.length;i+=1)r[i].apply(void 0,n)},a.prototype.on=function(t,n){var e=this;return(this._events[t]=this._events[t]||[]).push(n),function(){return e._events[t]=e._events[t].filter(function(t){return t!==n})}},a.prototype.allOff=function(){this._events={}};var u=function(t,n){this._style=t,this._positions=n};u.prototype.drawing=function(t,n){try{var e=this,i=e._style,r=i.color,s=i.thickness,h=i.lineCap,a=t.canvas,u=a.width,c=a.height;r&&(t.strokeStyle=r),s&&(t.lineWidth=s),h&&(t.lineCap=h),e._positions=[],t.beginPath();var l=o(n,function(n){var i=n.relativePosition,r=i.x,o=i.y;e._positions.length?(t.lineTo(u*r,c*o),t.stroke()):t.moveTo(u*r,c*o),e._positions.push({x:r,y:o})});return Promise.resolve(l&&l.then?l.then(function(){}):void 0)}catch(t){return Promise.reject(t)}},u.prototype.render=function(t){if(this._positions){var n=this._style,e=n.color,i=n.thickness,r=n.lineCap,o=t.canvas,s=o.width,h=o.height;e&&(t.strokeStyle=e),i&&(t.lineWidth=i),r&&(t.lineCap=r),t.beginPath();for(var a=0,u=this._positions;a<u.length;a+=1){var c=u[a];t.lineTo(s*c.x,h*c.y),t.stroke()}}};var c=function(t,n,e){this._style=t,this._start=n,this._end=e};c.prototype.drawing=function(t,n){try{var e=this,i=t.canvas,r=i.width,s=i.height,h=o(n,function(n){var i=n.relativePosition;e._start?e._end=i:e._start=e._end=i,t.clearRect(0,0,r,s),e.render(t)});return Promise.resolve(h&&h.then?h.then(function(){}):void 0)}catch(t){return Promise.reject(t)}},c.prototype.render=function(t){if(void 0!==this._start&&void 0!==this._end){var n=this._style,e=n.color,i=n.thickness,r=n.lineCap,o=t.canvas,s=o.width,h=o.height;e&&(t.strokeStyle=e),i&&(t.lineWidth=i),r&&(t.lineCap=r);var a=this._start,u=a.x,c=a.y,l=this._end,v=l.x,f=l.y;t.beginPath(),t.moveTo(u*s,c*h),t.lineTo(v*s,f*h),t.stroke()}};var l=function(t,n,e){this._style=t,this._start=n,this._end=e};l.prototype.drawing=function(t,n){try{var e=this,i=t.canvas,r=i.width,s=i.height,h=o(n,function(n){var i=n.relativePosition;e._start?e._end=i:e._start=e._end=i,t.clearRect(0,0,r,s),e.render(t)});return Promise.resolve(h&&h.then?h.then(function(){}):void 0)}catch(t){return Promise.reject(t)}},l.prototype.render=function(t){if(void 0!==this._start&&void 0!==this._end){var n=this._style,e=n.color,i=n.thickness,r=n.lineCap,o=t.canvas,s=o.width,h=o.height;e&&(t.strokeStyle=e),i&&(t.lineWidth=i),r&&(t.lineCap=r);var a=this._start,u=a.x,c=a.y,l=this._end;t.strokeRect(u*s,c*h,(l.x-u)*s,(l.y-c)*h)}};var v=function(t,n,e){this._style=t,this._start=n,this._end=e};v.prototype.drawing=function(t,n){try{var e=this,i=t.canvas,r=i.width,s=i.height,h=o(n,function(n){var i=n.relativePosition;e._start?e._end=i:e._start=e._end=i,t.clearRect(0,0,r,s),e.render(t)});return Promise.resolve(h&&h.then?h.then(function(){}):void 0)}catch(t){return Promise.reject(t)}},v.prototype.render=function(t){if(void 0!==this._start&&void 0!==this._end){var n=this._style,e=n.color,i=n.thickness,r=n.lineCap,o=t.canvas;e&&(t.strokeStyle=e),i&&(t.lineWidth=i),r&&(t.lineCap=r),t.beginPath();var s=this._start,h=this._end,a=s.x*o.width,u=s.y*o.height,c=h.x*o.width-a,l=h.y*o.height-u,v=4*(Math.sqrt(2)-1)/3,f=c/2*v,d=l/2*v,p=a+c,_=u+l,y=a+c/2,w=u+l/2;t.beginPath(),t.moveTo(a,w),t.bezierCurveTo(a,w-d,y-f,u,y,u),t.bezierCurveTo(y+f,u,p,w-d,p,w),t.bezierCurveTo(p,w+d,y+f,_,y,_),t.bezierCurveTo(y-f,_,a,w+d,a,w),t.closePath(),t.stroke()}};var f=function(t){var n=t.canvas,e=t.width,i=t.height,r=t.drawMouse;void 0===r&&(r=!0);var o=t.type;void 0===o&&(o="freeLine");var s=t.color;void 0===s&&(s="red");var h=t.thickness;void 0===h&&(h=3);var u=t.lineCap;if(void 0===u&&(u="square"),this.disableMouseDrawing=function(){},this._figures=[],this._cursor=0,this._canvas=n,!(this._ctx=n.getContext("2d")))throw new Error("2d context not supported");e&&(n.width=e),i&&(n.height=i),this._tmpCanvas=document.createElement("canvas"),this._tmpCtx=this._tmpCanvas.getContext("2d"),this._drawOption={type:o,color:s,thickness:h,lineCap:u},this._emitter=new a,r&&this.enableMouseDrawing()},d={canvas:{configurable:!0},size:{configurable:!0}};function p(t,n,e){return t.addEventListener(n,e),function(){return t.removeEventListener(n,e)}}function _(t,n){var e=n.clientX,i=n.clientY,r=t.getBoundingClientRect(),o=r.top,s=r.height;return{x:Number((e-r.left)/r.width),y:Number((i-o)/s)}}function y(){}d.canvas.get=function(){return this._canvas},d.size.get=function(){return{width:this._canvas.width,height:this._canvas.height}},f.prototype.on=function(t,n){return this._emitter.on(t,n)},f.prototype.setSize=function(t){var n=t.width,e=t.height;n&&(this._canvas.width=n),e&&(this._canvas.height=e)},f.prototype.setOptions=function(t){this._drawOption=Object.assign({},this._drawOption,t)},f.prototype.draw=function(t){this._push(t),t.render(this._ctx)},f.prototype.undo=function(){this._cursor>0&&(this._cursor--,this.redraw())},f.prototype.redo=function(){this._cursor<this._figures.length&&(this._cursor++,this.redraw())},f.prototype.clear=function(){var t=this.size;this._ctx.clearRect(0,0,t.width,t.height)},f.prototype.destroy=function(){this.disableMouseDrawing(),this._emitter.allOff()},f.prototype.enableMouseDrawing=function(){var i=this;this.disableMouseDrawing();var r=this.canvas,o=null,s=y,a=function(a,f){switch(i._drawOption.type){case"freeLine":o=new u(i._drawOption);break;case"straightLine":o=new c(i._drawOption);break;case"rectangle":o=new l(i._drawOption);break;case"ellipse":o=new v(i._drawOption);break;default:throw new Error('There is no figure of "'+i._drawOption.type+'" type.')}var d,p,_,y,w,g,m;p=i._tmpCanvas,y=(_=(d=r).getBoundingClientRect()).top,w=_.left,g=_.width,m=_.height,Object.assign(p,{width:d.width,height:d.height}),Object.assign(p.style,{position:"fixed",top:y+(g-d.width)/2+"px",left:w+(m-d.height)/2+"px"}),document.body.appendChild(i._tmpCanvas),o.drawing(i._tmpCtx,new h(function(i){var r,o=function(i,r,o){for(var s;;){var h=i();if(e(h)&&(h=h.v),!h)return a;if(h.then){s=0;break}var a=o();if(a&&a.then){if(!e(a)){s=1;break}a=a.s}if(r){var u=r();if(u&&u.then&&!e(u)){s=2;break}}}var c=new t,l=n.bind(null,c,2);return(0===s?h.then(f):1===s?a.then(v):u.then(d)).then(void 0,l),c;function v(t){a=t;do{if(r&&(u=r())&&u.then&&!e(u))return void u.then(d).then(void 0,l);if(!(h=i())||e(h)&&!h.v)return void n(c,1,a);if(h.then)return void h.then(f).then(void 0,l);e(a=o())&&(a=a.v)}while(!a||!a.then);a.then(v).then(void 0,l)}function f(t){t?(a=o())&&a.then?a.then(v).then(void 0,l):v(a):n(c,1,a)}function d(){(h=i())?h.then?h.then(f).then(void 0,l):f(h):n(c,1,a)}}(function(){return!!Promise.resolve(new Promise(function(t){return s=t})).then(function(t){return r=t})},void 0,function(){return i._yield(r).then(function(){})});if(o&&o.then)return o.then(function(){})})),i._emitter.emit("drawStart",{originalEvent:f,canvas:i._canvas,relativePosition:a})},f=function(t,n){if(o){var e={originalEvent:n,canvas:i._canvas,relativePosition:t};s(e),i._emitter.emit("drawing",e)}},d=function(t,n){o&&(document.body.removeChild(i._tmpCanvas),s(),i._ctx.drawImage(i._tmpCanvas,0,0),i._push(o),s=y,o=null,i._emitter.emit("drawEnd",{originalEvent:n,canvas:i._canvas,relativePosition:t}))},w=null,g=[p(r,"mousedown",function(t){var n=_(r,t);a(n,t),f(n,t)}),p(document,"mousemove",function(t){var n=_(r,t);f(n,t)}),p(document,"mouseup",function(t){var n=_(r,t);d(n,t)}),p(r,"touchstart",function(t){var n=_(r,w=t.touches[0]);a(n,t),f(n,t)}),p(document,"touchmove",function(t){var n=_(r,w=t.touches[0]);f(n,t)}),p(document,"touchend",function(t){var n=_(r,w);d(n,t)})];this.disableMouseDrawing=function(){return g.forEach(function(t){return t()})}},f.prototype.redraw=function(){this.clear();for(var t=0,n=this._figures.slice(0,this._cursor);t<n.length;t+=1)n[t].render(this._ctx)},f.prototype._push=function(t){(this._figures=this._figures.slice(0,this._cursor++)).push(t)},Object.defineProperties(f.prototype,d);export default f;export{f as Painter,v as Ellipse,u as FreeLine,l as Rectangle,c as StraightLine};
//# sourceMappingURL=index.m.js.map
