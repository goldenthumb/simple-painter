// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../src/EventEmitter.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var EventEmitter =
/** @class */
function () {
  function EventEmitter() {
    this._events = {};
  }

  EventEmitter.prototype.emit = function (event) {
    var args = [];

    for (var _i = 1; _i < arguments.length; _i++) {
      args[_i - 1] = arguments[_i];
    }

    for (var _a = 0, _b = this._events[event] || []; _a < _b.length; _a++) {
      var fn = _b[_a];
      fn.apply(void 0, args);
    }
  };

  EventEmitter.prototype.on = function (event, callback) {
    var _this = this;

    (this._events[event] = this._events[event] || []).push(callback);
    return function () {
      return _this._events[event] = _this._events[event].filter(function (fn) {
        return fn !== callback;
      });
    };
  };

  EventEmitter.prototype.allOff = function () {
    this._events = {};
  };

  return EventEmitter;
}();

var _default = EventEmitter;
exports.default = _default;
},{}],"../src/Figure/FreeLine.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator = void 0 && (void 0).__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function sent() {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) {
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];

        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;

          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;

          case 7:
            op = _.ops.pop();

            _.trys.pop();

            continue;

          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }

            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }

            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }

            if (t && _.label < t[2]) {
              _.label = t[2];

              _.ops.push(op);

              break;
            }

            if (t[2]) _.ops.pop();

            _.trys.pop();

            continue;
        }

        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

var __asyncValues = void 0 && (void 0).__asyncValues || function (o) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var m = o[Symbol.asyncIterator],
      i;
  return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () {
    return this;
  }, i);

  function verb(n) {
    i[n] = o[n] && function (v) {
      return new Promise(function (resolve, reject) {
        v = o[n](v), settle(resolve, reject, v.done, v.value);
      });
    };
  }

  function settle(resolve, reject, d, v) {
    Promise.resolve(v).then(function (v) {
      resolve({
        value: v,
        done: d
      });
    }, reject);
  }
};

var FreeLine =
/** @class */
function () {
  function FreeLine(_data) {
    this._data = _data;
  }

  Object.defineProperty(FreeLine.prototype, "data", {
    get: function get() {
      return this._data;
    },
    enumerable: true,
    configurable: true
  });

  FreeLine.prototype.drawing = function (ctx, events) {
    var events_1, events_1_1;

    var e_1, _a;

    return __awaiter(this, void 0, void 0, function () {
      var _b, color, thickness, lineCap, _c, width, height, event, _d, x, y, e_1_1;

      return __generator(this, function (_e) {
        switch (_e.label) {
          case 0:
            _b = this._data.drawOption, color = _b.color, thickness = _b.thickness, lineCap = _b.lineCap;
            _c = ctx.canvas, width = _c.width, height = _c.height;
            if (color) ctx.strokeStyle = color;
            if (thickness) ctx.lineWidth = thickness;
            if (lineCap) ctx.lineCap = lineCap;
            ctx.beginPath();
            _e.label = 1;

          case 1:
            _e.trys.push([1, 6, 7, 12]);

            events_1 = __asyncValues(events);
            _e.label = 2;

          case 2:
            return [4
            /*yield*/
            , events_1.next()];

          case 3:
            if (!(events_1_1 = _e.sent(), !events_1_1.done)) return [3
            /*break*/
            , 5];
            event = events_1_1.value;
            _d = event.relativePosition, x = _d.x, y = _d.y;

            if (this._data.positions.length) {
              ctx.lineTo(width * x, height * y);
              ctx.stroke();
            } else {
              ctx.moveTo(width * x, height * y);
            }

            this._data.positions.push({
              x: x,
              y: y
            });

            _e.label = 4;

          case 4:
            return [3
            /*break*/
            , 2];

          case 5:
            return [3
            /*break*/
            , 12];

          case 6:
            e_1_1 = _e.sent();
            e_1 = {
              error: e_1_1
            };
            return [3
            /*break*/
            , 12];

          case 7:
            _e.trys.push([7,, 10, 11]);

            if (!(events_1_1 && !events_1_1.done && (_a = events_1.return))) return [3
            /*break*/
            , 9];
            return [4
            /*yield*/
            , _a.call(events_1)];

          case 8:
            _e.sent();

            _e.label = 9;

          case 9:
            return [3
            /*break*/
            , 11];

          case 10:
            if (e_1) throw e_1.error;
            return [7
            /*endfinally*/
            ];

          case 11:
            return [7
            /*endfinally*/
            ];

          case 12:
            return [2
            /*return*/
            ];
        }
      });
    });
  };

  FreeLine.prototype.render = function (ctx) {
    if (!this._data.positions.length) return;
    var _a = this._data.drawOption,
        color = _a.color,
        thickness = _a.thickness,
        lineCap = _a.lineCap;
    var _b = ctx.canvas,
        width = _b.width,
        height = _b.height;
    if (color) ctx.strokeStyle = color;
    if (thickness) ctx.lineWidth = thickness;
    if (lineCap) ctx.lineCap = lineCap;
    ctx.beginPath();

    for (var _i = 0, _c = this._data.positions; _i < _c.length; _i++) {
      var position = _c[_i];
      ctx.lineTo(width * position.x, height * position.y);
      ctx.stroke();
    }
  };

  return FreeLine;
}();

var _default = FreeLine;
exports.default = _default;
},{}],"../src/Figure/StraightLine.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator = void 0 && (void 0).__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function sent() {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) {
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];

        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;

          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;

          case 7:
            op = _.ops.pop();

            _.trys.pop();

            continue;

          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }

            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }

            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }

            if (t && _.label < t[2]) {
              _.label = t[2];

              _.ops.push(op);

              break;
            }

            if (t[2]) _.ops.pop();

            _.trys.pop();

            continue;
        }

        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

var __asyncValues = void 0 && (void 0).__asyncValues || function (o) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var m = o[Symbol.asyncIterator],
      i;
  return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () {
    return this;
  }, i);

  function verb(n) {
    i[n] = o[n] && function (v) {
      return new Promise(function (resolve, reject) {
        v = o[n](v), settle(resolve, reject, v.done, v.value);
      });
    };
  }

  function settle(resolve, reject, d, v) {
    Promise.resolve(v).then(function (v) {
      resolve({
        value: v,
        done: d
      });
    }, reject);
  }
};

var StraightLine =
/** @class */
function () {
  function StraightLine(_data) {
    this._data = _data;
  }

  Object.defineProperty(StraightLine.prototype, "data", {
    get: function get() {
      return this._data;
    },
    enumerable: true,
    configurable: true
  });

  StraightLine.prototype.drawing = function (ctx, events) {
    var events_1, events_1_1;

    var e_1, _a;

    return __awaiter(this, void 0, void 0, function () {
      var _b, width, height, event, relativePosition, e_1_1;

      return __generator(this, function (_c) {
        switch (_c.label) {
          case 0:
            _b = ctx.canvas, width = _b.width, height = _b.height;
            _c.label = 1;

          case 1:
            _c.trys.push([1, 6, 7, 12]);

            events_1 = __asyncValues(events);
            _c.label = 2;

          case 2:
            return [4
            /*yield*/
            , events_1.next()];

          case 3:
            if (!(events_1_1 = _c.sent(), !events_1_1.done)) return [3
            /*break*/
            , 5];
            event = events_1_1.value;
            relativePosition = event.relativePosition;

            this._data.positions.push(relativePosition);

            ctx.clearRect(0, 0, width, height);
            this.render(ctx);
            _c.label = 4;

          case 4:
            return [3
            /*break*/
            , 2];

          case 5:
            return [3
            /*break*/
            , 12];

          case 6:
            e_1_1 = _c.sent();
            e_1 = {
              error: e_1_1
            };
            return [3
            /*break*/
            , 12];

          case 7:
            _c.trys.push([7,, 10, 11]);

            if (!(events_1_1 && !events_1_1.done && (_a = events_1.return))) return [3
            /*break*/
            , 9];
            return [4
            /*yield*/
            , _a.call(events_1)];

          case 8:
            _c.sent();

            _c.label = 9;

          case 9:
            return [3
            /*break*/
            , 11];

          case 10:
            if (e_1) throw e_1.error;
            return [7
            /*endfinally*/
            ];

          case 11:
            return [7
            /*endfinally*/
            ];

          case 12:
            return [2
            /*return*/
            ];
        }
      });
    });
  };

  StraightLine.prototype.render = function (ctx) {
    var _a = this._data,
        _b = _a.drawOption,
        color = _b.color,
        thickness = _b.thickness,
        lineCap = _b.lineCap,
        positions = _a.positions;
    if (positions.length < 2) return;
    var _c = ctx.canvas,
        width = _c.width,
        height = _c.height;
    var _d = positions[0],
        startX = _d.x,
        startY = _d.y;
    var _e = positions[positions.length - 1],
        x = _e.x,
        y = _e.y;
    if (color) ctx.strokeStyle = color;
    if (thickness) ctx.lineWidth = thickness;
    if (lineCap) ctx.lineCap = lineCap;
    ctx.beginPath();
    ctx.moveTo(startX * width, startY * height);
    ctx.lineTo(x * width, y * height);
    ctx.stroke();
  };

  return StraightLine;
}();

var _default = StraightLine;
exports.default = _default;
},{}],"../src/Figure/Rectangle.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator = void 0 && (void 0).__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function sent() {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) {
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];

        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;

          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;

          case 7:
            op = _.ops.pop();

            _.trys.pop();

            continue;

          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }

            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }

            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }

            if (t && _.label < t[2]) {
              _.label = t[2];

              _.ops.push(op);

              break;
            }

            if (t[2]) _.ops.pop();

            _.trys.pop();

            continue;
        }

        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

var __asyncValues = void 0 && (void 0).__asyncValues || function (o) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var m = o[Symbol.asyncIterator],
      i;
  return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () {
    return this;
  }, i);

  function verb(n) {
    i[n] = o[n] && function (v) {
      return new Promise(function (resolve, reject) {
        v = o[n](v), settle(resolve, reject, v.done, v.value);
      });
    };
  }

  function settle(resolve, reject, d, v) {
    Promise.resolve(v).then(function (v) {
      resolve({
        value: v,
        done: d
      });
    }, reject);
  }
};

var Rectangle =
/** @class */
function () {
  function Rectangle(_data) {
    this._data = _data;
  }

  Object.defineProperty(Rectangle.prototype, "data", {
    get: function get() {
      return this._data;
    },
    enumerable: true,
    configurable: true
  });

  Rectangle.prototype.drawing = function (ctx, events) {
    var events_1, events_1_1;

    var e_1, _a;

    return __awaiter(this, void 0, void 0, function () {
      var _b, width, height, event, relativePosition, e_1_1;

      return __generator(this, function (_c) {
        switch (_c.label) {
          case 0:
            _b = ctx.canvas, width = _b.width, height = _b.height;
            _c.label = 1;

          case 1:
            _c.trys.push([1, 6, 7, 12]);

            events_1 = __asyncValues(events);
            _c.label = 2;

          case 2:
            return [4
            /*yield*/
            , events_1.next()];

          case 3:
            if (!(events_1_1 = _c.sent(), !events_1_1.done)) return [3
            /*break*/
            , 5];
            event = events_1_1.value;
            relativePosition = event.relativePosition;

            this._data.positions.push(relativePosition);

            ctx.clearRect(0, 0, width, height);
            this.render(ctx);
            _c.label = 4;

          case 4:
            return [3
            /*break*/
            , 2];

          case 5:
            return [3
            /*break*/
            , 12];

          case 6:
            e_1_1 = _c.sent();
            e_1 = {
              error: e_1_1
            };
            return [3
            /*break*/
            , 12];

          case 7:
            _c.trys.push([7,, 10, 11]);

            if (!(events_1_1 && !events_1_1.done && (_a = events_1.return))) return [3
            /*break*/
            , 9];
            return [4
            /*yield*/
            , _a.call(events_1)];

          case 8:
            _c.sent();

            _c.label = 9;

          case 9:
            return [3
            /*break*/
            , 11];

          case 10:
            if (e_1) throw e_1.error;
            return [7
            /*endfinally*/
            ];

          case 11:
            return [7
            /*endfinally*/
            ];

          case 12:
            return [2
            /*return*/
            ];
        }
      });
    });
  };

  Rectangle.prototype.render = function (ctx) {
    var _a = this._data,
        _b = _a.drawOption,
        color = _b.color,
        thickness = _b.thickness,
        lineCap = _b.lineCap,
        positions = _a.positions;
    if (positions.length < 2) return;
    var _c = ctx.canvas,
        width = _c.width,
        height = _c.height;
    var _d = positions[0],
        startX = _d.x,
        startY = _d.y;
    var _e = positions[positions.length - 1],
        x = _e.x,
        y = _e.y;
    if (color) ctx.strokeStyle = color;
    if (thickness) ctx.lineWidth = thickness;
    if (lineCap) ctx.lineCap = lineCap;
    ctx.strokeRect(startX * width, startY * height, (x - startX) * width, (y - startY) * height);
  };

  return Rectangle;
}();

var _default = Rectangle;
exports.default = _default;
},{}],"../src/Figure/Ellipse.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator = void 0 && (void 0).__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function sent() {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) {
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];

        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;

          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;

          case 7:
            op = _.ops.pop();

            _.trys.pop();

            continue;

          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }

            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }

            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }

            if (t && _.label < t[2]) {
              _.label = t[2];

              _.ops.push(op);

              break;
            }

            if (t[2]) _.ops.pop();

            _.trys.pop();

            continue;
        }

        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

var __asyncValues = void 0 && (void 0).__asyncValues || function (o) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var m = o[Symbol.asyncIterator],
      i;
  return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () {
    return this;
  }, i);

  function verb(n) {
    i[n] = o[n] && function (v) {
      return new Promise(function (resolve, reject) {
        v = o[n](v), settle(resolve, reject, v.done, v.value);
      });
    };
  }

  function settle(resolve, reject, d, v) {
    Promise.resolve(v).then(function (v) {
      resolve({
        value: v,
        done: d
      });
    }, reject);
  }
};

var Ellipse =
/** @class */
function () {
  function Ellipse(_data) {
    this._data = _data;
  }

  Object.defineProperty(Ellipse.prototype, "data", {
    get: function get() {
      return this._data;
    },
    enumerable: true,
    configurable: true
  });

  Ellipse.prototype.drawing = function (ctx, events) {
    var events_1, events_1_1;

    var e_1, _a;

    return __awaiter(this, void 0, void 0, function () {
      var _b, width, height, event, relativePosition, e_1_1;

      return __generator(this, function (_c) {
        switch (_c.label) {
          case 0:
            _b = ctx.canvas, width = _b.width, height = _b.height;
            _c.label = 1;

          case 1:
            _c.trys.push([1, 6, 7, 12]);

            events_1 = __asyncValues(events);
            _c.label = 2;

          case 2:
            return [4
            /*yield*/
            , events_1.next()];

          case 3:
            if (!(events_1_1 = _c.sent(), !events_1_1.done)) return [3
            /*break*/
            , 5];
            event = events_1_1.value;
            relativePosition = event.relativePosition;

            this._data.positions.push(relativePosition);

            ctx.clearRect(0, 0, width, height);
            this.render(ctx);
            _c.label = 4;

          case 4:
            return [3
            /*break*/
            , 2];

          case 5:
            return [3
            /*break*/
            , 12];

          case 6:
            e_1_1 = _c.sent();
            e_1 = {
              error: e_1_1
            };
            return [3
            /*break*/
            , 12];

          case 7:
            _c.trys.push([7,, 10, 11]);

            if (!(events_1_1 && !events_1_1.done && (_a = events_1.return))) return [3
            /*break*/
            , 9];
            return [4
            /*yield*/
            , _a.call(events_1)];

          case 8:
            _c.sent();

            _c.label = 9;

          case 9:
            return [3
            /*break*/
            , 11];

          case 10:
            if (e_1) throw e_1.error;
            return [7
            /*endfinally*/
            ];

          case 11:
            return [7
            /*endfinally*/
            ];

          case 12:
            return [2
            /*return*/
            ];
        }
      });
    });
  };

  Ellipse.prototype.render = function (ctx) {
    var _a = this._data,
        _b = _a.drawOption,
        color = _b.color,
        thickness = _b.thickness,
        lineCap = _b.lineCap,
        positions = _a.positions;
    if (positions.length < 2) return;
    var canvas = ctx.canvas;
    var start = positions[0];
    var end = positions[positions.length - 1];
    if (color) ctx.strokeStyle = color;
    if (thickness) ctx.lineWidth = thickness;
    if (lineCap) ctx.lineCap = lineCap;
    ctx.beginPath();
    var startX = start.x * canvas.width;
    var startY = start.y * canvas.height;
    var x = end.x * canvas.width;
    var y = end.y * canvas.height;
    var width = x - startX;
    var height = y - startY;
    var kappa = 4 * (Math.sqrt(2) - 1) / 3;
    var offsetX = width / 2 * kappa;
    var offsetY = height / 2 * kappa;
    var endX = startX + width;
    var endY = startY + height;
    var midX = startX + width / 2;
    var midY = startY + height / 2;
    ctx.beginPath();
    ctx.moveTo(startX, midY);
    ctx.bezierCurveTo(startX, midY - offsetY, midX - offsetX, startY, midX, startY);
    ctx.bezierCurveTo(midX + offsetX, startY, endX, midY - offsetY, endX, midY);
    ctx.bezierCurveTo(endX, midY + offsetY, midX + offsetX, endY, midX, endY);
    ctx.bezierCurveTo(midX - offsetX, endY, startX, midY + offsetY, startX, midY);
    ctx.closePath();
    ctx.stroke();
  };

  return Ellipse;
}();

var _default = Ellipse;
exports.default = _default;
},{}],"../src/Figure/Arrow.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator = void 0 && (void 0).__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function sent() {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) {
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];

        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;

          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;

          case 7:
            op = _.ops.pop();

            _.trys.pop();

            continue;

          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }

            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }

            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }

            if (t && _.label < t[2]) {
              _.label = t[2];

              _.ops.push(op);

              break;
            }

            if (t[2]) _.ops.pop();

            _.trys.pop();

            continue;
        }

        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

var __asyncValues = void 0 && (void 0).__asyncValues || function (o) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var m = o[Symbol.asyncIterator],
      i;
  return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () {
    return this;
  }, i);

  function verb(n) {
    i[n] = o[n] && function (v) {
      return new Promise(function (resolve, reject) {
        v = o[n](v), settle(resolve, reject, v.done, v.value);
      });
    };
  }

  function settle(resolve, reject, d, v) {
    Promise.resolve(v).then(function (v) {
      resolve({
        value: v,
        done: d
      });
    }, reject);
  }
};

var StraightLine =
/** @class */
function () {
  function StraightLine(_data) {
    this._data = _data;
  }

  StraightLine.prototype.getData = function () {
    throw new Error('Method not implemented.');
  };

  Object.defineProperty(StraightLine.prototype, "data", {
    get: function get() {
      return this._data;
    },
    enumerable: true,
    configurable: true
  });

  StraightLine.prototype.drawing = function (ctx, events) {
    var events_1, events_1_1;

    var e_1, _a;

    return __awaiter(this, void 0, void 0, function () {
      var _b, width, height, event, relativePosition, e_1_1;

      return __generator(this, function (_c) {
        switch (_c.label) {
          case 0:
            _b = ctx.canvas, width = _b.width, height = _b.height;
            _c.label = 1;

          case 1:
            _c.trys.push([1, 6, 7, 12]);

            events_1 = __asyncValues(events);
            _c.label = 2;

          case 2:
            return [4
            /*yield*/
            , events_1.next()];

          case 3:
            if (!(events_1_1 = _c.sent(), !events_1_1.done)) return [3
            /*break*/
            , 5];
            event = events_1_1.value;
            relativePosition = event.relativePosition;

            this._data.positions.push(relativePosition);

            ctx.clearRect(0, 0, width, height);
            this.render(ctx);
            _c.label = 4;

          case 4:
            return [3
            /*break*/
            , 2];

          case 5:
            return [3
            /*break*/
            , 12];

          case 6:
            e_1_1 = _c.sent();
            e_1 = {
              error: e_1_1
            };
            return [3
            /*break*/
            , 12];

          case 7:
            _c.trys.push([7,, 10, 11]);

            if (!(events_1_1 && !events_1_1.done && (_a = events_1.return))) return [3
            /*break*/
            , 9];
            return [4
            /*yield*/
            , _a.call(events_1)];

          case 8:
            _c.sent();

            _c.label = 9;

          case 9:
            return [3
            /*break*/
            , 11];

          case 10:
            if (e_1) throw e_1.error;
            return [7
            /*endfinally*/
            ];

          case 11:
            return [7
            /*endfinally*/
            ];

          case 12:
            return [2
            /*return*/
            ];
        }
      });
    });
  };

  StraightLine.prototype.render = function (ctx) {
    var _a = this._data,
        _b = _a.drawOption,
        color = _b.color,
        thickness = _b.thickness,
        lineCap = _b.lineCap,
        positions = _a.positions;
    if (positions.length < 2) return;
    var _c = ctx.canvas,
        width = _c.width,
        height = _c.height;
    var start = positions[0];
    var end = positions[positions.length - 1];
    if (lineCap) ctx.lineCap = lineCap;
    if (color) ctx.fillStyle = color;
    var startX = start.x * width;
    var startY = start.y * height;
    var endX = end.x * width;
    var endY = end.y * height;
    var dx = endX - startX;
    var dy = endY - startY;
    var len = Math.sqrt(dx * dx + dy * dy);
    var sin = dy / len;
    var cos = dx / len;
    var a = [];
    var controlPoints = [0, thickness / 2, -(9 + thickness), thickness / 2, -(12 + thickness * 1.2), 5 + thickness];
    ctx.beginPath();
    a.push(0, 0);
    a.push(controlPoints[0] < 0 ? len + controlPoints[0] : controlPoints[0], controlPoints[1]);
    a.push(Math.max(controlPoints[2] < 0 ? len + controlPoints[2] : controlPoints[2], 0), controlPoints[3]);
    a.push(Math.max(controlPoints[4] < 0 ? len + controlPoints[4] : controlPoints[4], -3), controlPoints[5]);
    a.push(Math.max(len, 12), 0);
    a.push(Math.max(controlPoints[4] < 0 ? len + controlPoints[4] : controlPoints[4], -3), -controlPoints[5]);
    a.push(Math.max(controlPoints[2] < 0 ? len + controlPoints[2] : controlPoints[2], 0), -controlPoints[3]);
    a.push(controlPoints[0] < 0 ? len + controlPoints[0] : controlPoints[0], -controlPoints[1]);
    a.push(0, 0);

    for (var i = 0; i < a.length; i += 2) {
      var x = a[i] * cos - a[i + 1] * sin + startX;
      var y = a[i] * sin + a[i + 1] * cos + startY;
      if (i === 0) ctx.moveTo(x, y);else ctx.lineTo(x, y);
    }

    ctx.fill();
  };

  return StraightLine;
}();

var _default = StraightLine;
exports.default = _default;
},{}],"../src/Painter.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _EventEmitter = _interopRequireDefault(require("./EventEmitter"));

var _FreeLine = _interopRequireDefault(require("./Figure/FreeLine"));

var _StraightLine = _interopRequireDefault(require("./Figure/StraightLine"));

var _Rectangle = _interopRequireDefault(require("./Figure/Rectangle"));

var _Ellipse = _interopRequireDefault(require("./Figure/Ellipse"));

var _Arrow = _interopRequireDefault(require("./Figure/Arrow"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __assign = void 0 && (void 0).__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

var __generator = void 0 && (void 0).__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function sent() {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) {
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];

        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;

          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;

          case 7:
            op = _.ops.pop();

            _.trys.pop();

            continue;

          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }

            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }

            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }

            if (t && _.label < t[2]) {
              _.label = t[2];

              _.ops.push(op);

              break;
            }

            if (t[2]) _.ops.pop();

            _.trys.pop();

            continue;
        }

        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

var __await = void 0 && (void 0).__await || function (v) {
  return this instanceof __await ? (this.v = v, this) : new __await(v);
};

var __asyncGenerator = void 0 && (void 0).__asyncGenerator || function (thisArg, _arguments, generator) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var g = generator.apply(thisArg, _arguments || []),
      i,
      q = [];
  return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () {
    return this;
  }, i;

  function verb(n) {
    if (g[n]) i[n] = function (v) {
      return new Promise(function (a, b) {
        q.push([n, v, a, b]) > 1 || resume(n, v);
      });
    };
  }

  function resume(n, v) {
    try {
      step(g[n](v));
    } catch (e) {
      settle(q[0][3], e);
    }
  }

  function step(r) {
    r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
  }

  function fulfill(value) {
    resume("next", value);
  }

  function reject(value) {
    resume("throw", value);
  }

  function settle(f, v) {
    if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]);
  }
};

var Painter =
/** @class */
function () {
  function Painter(_a) {
    var canvas = _a.canvas,
        width = _a.width,
        height = _a.height,
        _b = _a.drawMouse,
        drawMouse = _b === void 0 ? true : _b,
        _c = _a.type,
        type = _c === void 0 ? 'freeLine' : _c,
        _d = _a.color,
        color = _d === void 0 ? 'red' : _d,
        _e = _a.thickness,
        thickness = _e === void 0 ? 3 : _e,
        _f = _a.lineCap,
        lineCap = _f === void 0 ? 'square' : _f,
        _g = _a.figures,
        figures = _g === void 0 ? [] : _g;

    this.disableMouseDrawing = function () {};

    this._figures = [];
    this._cursor = 0;
    this._canvas = canvas;

    if (!(this._ctx = canvas.getContext('2d'))) {
      throw new Error('2d context not supported');
    }

    if (width) canvas.width = width;
    if (height) canvas.height = height;
    this._tmpCanvas = document.createElement('canvas');
    this._tmpCtx = this._tmpCanvas.getContext('2d');
    this._drawOption = {
      type: type,
      color: color,
      thickness: thickness,
      lineCap: lineCap
    };
    this._emitter = new _EventEmitter.default();
    if (drawMouse) this.enableMouseDrawing();

    for (var _i = 0, figures_1 = figures; _i < figures_1.length; _i++) {
      var figure = figures_1[_i];
      this.draw(figure);
    }
  }

  Object.defineProperty(Painter.prototype, "drawOption", {
    get: function get() {
      return this._drawOption;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Painter.prototype, "canvas", {
    get: function get() {
      return this._canvas;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Painter.prototype, "figures", {
    get: function get() {
      return this._figures.map(function (figure) {
        return figure.data;
      });
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Painter.prototype, "size", {
    get: function get() {
      return {
        width: this._canvas.width,
        height: this._canvas.height
      };
    },
    enumerable: true,
    configurable: true
  });

  Painter.prototype.on = function (name, listener) {
    return this._emitter.on(name, listener);
  };

  Painter.prototype.setSize = function (_a) {
    var width = _a.width,
        height = _a.height;
    if (width) this._canvas.width = width;
    if (height) this._canvas.height = height;
  };

  Painter.prototype.setOptions = function (drawOption) {
    this._drawOption = __assign(__assign({}, this._drawOption), drawOption);
  };

  Painter.prototype.draw = function (_a) {
    var drawOption = _a.drawOption,
        positions = _a.positions;
    var figure = createFigure(drawOption, positions);

    this._push(figure);

    figure.render(this._ctx);
  };

  Painter.prototype.undo = function () {
    if (this._cursor > 0) {
      this._cursor--;
      this.redraw();
    }
  };

  Painter.prototype.redo = function () {
    if (this._cursor < this._figures.length) {
      this._cursor++;
      this.redraw();
    }
  };

  Painter.prototype.clear = function () {
    var _a = this.size,
        width = _a.width,
        height = _a.height;

    this._ctx.clearRect(0, 0, width, height);

    this.setFigures([]);
  };

  Painter.prototype.allOff = function () {
    this._emitter.allOff();
  };

  Painter.prototype.destroy = function () {
    this.disableMouseDrawing();

    this._emitter.allOff();
  };

  Painter.prototype.enableMouseDrawing = function () {
    var _this = this;

    this.disableMouseDrawing();
    var canvas = this.canvas;
    var figure = null;
    var resolve = noop;

    function drawingEvents() {
      return __asyncGenerator(this, arguments, function drawingEvents_1() {
        var event;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              return [4
              /*yield*/
              , __await(new Promise(function (r) {
                return resolve = r;
              }))];

            case 1:
              if (!(event = _a.sent())) return [3
              /*break*/
              , 4];
              return [4
              /*yield*/
              , __await(event)];

            case 2:
              return [4
              /*yield*/
              , _a.sent()];

            case 3:
              _a.sent();

              return [3
              /*break*/
              , 0];

            case 4:
              return [2
              /*return*/
              ];
          }
        });
      });
    }

    var startDraw = function startDraw(position, event) {
      figure = createFigure(_this._drawOption);
      overlayStyle(canvas, _this._tmpCanvas);
      document.body.appendChild(_this._tmpCanvas);
      figure.drawing(_this._tmpCtx, drawingEvents());

      _this._emitter.emit('drawStart', {
        originalEvent: event,
        canvas: _this._canvas,
        relativePosition: position
      });
    };

    var drawing = function drawing(position, event) {
      if (!figure) return;
      var drawingEvent = {
        originalEvent: event,
        canvas: _this._canvas,
        relativePosition: position
      };
      resolve(drawingEvent);

      _this._emitter.emit('drawing', drawingEvent);
    };

    var endDraw = function endDraw(position, event) {
      if (!figure) return;
      document.body.removeChild(_this._tmpCanvas);
      resolve();

      _this._ctx.drawImage(_this._tmpCanvas, 0, 0);

      _this._push(figure);

      resolve = noop;
      figure = null;

      _this._emitter.emit('drawEnd', {
        originalEvent: event,
        canvas: _this._canvas,
        relativePosition: position
      });
    };

    var lastTouch = null;
    var offEvents = [on(canvas, 'mousedown', function (event) {
      var position = normalizePosition(canvas, event, _this._drawOption);
      startDraw(position, event);
      drawing(position, event);
    }), on(canvas, 'touchstart', function (event) {
      var position = normalizePosition(canvas, lastTouch = event.touches[0], _this._drawOption);
      startDraw(position, event);
      drawing(position, event);
    }), on(document, 'mousemove', function (event) {
      drawing(normalizePosition(canvas, event, _this._drawOption), event);
    }), on(document, 'touchmove', function (event) {
      drawing(normalizePosition(canvas, lastTouch = event.touches[0], _this._drawOption), event);
    }), on(document, 'mouseup', function (event) {
      endDraw(normalizePosition(canvas, event, _this._drawOption), event);
    }), on(canvas, 'touchend', function (event) {
      endDraw(normalizePosition(canvas, lastTouch, _this._drawOption), event);
    })];

    this.disableMouseDrawing = function () {
      return offEvents.forEach(function (off) {
        return off();
      });
    };
  };

  Painter.prototype.redraw = function () {
    var _a = this.size,
        width = _a.width,
        height = _a.height;

    this._ctx.clearRect(0, 0, width, height);

    for (var _i = 0, _b = this._figures.slice(0, this._cursor); _i < _b.length; _i++) {
      var figure = _b[_i];
      figure.render(this._ctx);
    }
  };

  Painter.prototype.setFigures = function (figures) {
    if (figures === void 0) {
      figures = [];
    }

    this._figures = [];
    this._cursor = 0;

    for (var _i = 0, figures_2 = figures; _i < figures_2.length; _i++) {
      var figure = figures_2[_i];
      this.draw(figure);
    }
  };

  Painter.prototype._push = function (figure) {
    (this._figures = this._figures.slice(0, this._cursor++)).push(figure);

    this._emitter.emit('figures', this.figures);
  };

  return Painter;
}();

var _default = Painter;
exports.default = _default;

function on(element, name, callback) {
  element.addEventListener(name, callback);
  return function () {
    return element.removeEventListener(name, callback);
  };
}

function createFigure(drawOption, positions) {
  if (positions === void 0) {
    positions = [];
  }

  switch (drawOption.type) {
    case 'freeLine':
      return new _FreeLine.default({
        drawOption: drawOption,
        positions: positions
      });

    case 'straightLine':
      return new _StraightLine.default({
        drawOption: drawOption,
        positions: positions
      });

    case 'arrow':
      return new _Arrow.default({
        drawOption: drawOption,
        positions: positions
      });

    case 'rectangle':
      return new _Rectangle.default({
        drawOption: drawOption,
        positions: positions
      });

    case 'ellipse':
      return new _Ellipse.default({
        drawOption: drawOption,
        positions: positions
      });

    default:
      throw new Error("There is no figure of \"" + drawOption.type + "\" type.");
  }
}

function normalizePosition(canvas, _a, drawOption) {
  var clientX = _a.clientX,
      clientY = _a.clientY;

  var _b = canvas.getBoundingClientRect(),
      top = _b.top,
      left = _b.left,
      width = _b.width,
      height = _b.height;

  var type = drawOption.type,
      thickness = drawOption.thickness;
  var x = clientX - left;
  var y = clientY - top;
  return type === 'freeLine' ? {
    x: Number(x / width),
    y: Number(y / height)
  } : {
    x: Number((x < 0 ? 0 + thickness / 2 : x > width ? width - thickness / 2 : x) / width),
    y: Number((y < 0 ? 0 + thickness / 2 : y > height ? height - thickness / 2 : y) / height)
  };
}

function overlayStyle(origin, target) {
  var _a = origin.getBoundingClientRect(),
      top = _a.top,
      left = _a.left,
      width = _a.width,
      height = _a.height;

  Object.assign(target, {
    width: origin.width,
    height: origin.height
  });
  Object.assign(target.style, {
    position: 'fixed',
    top: top + (width - origin.width) / 2 + 'px',
    left: left + (height - origin.height) / 2 + 'px'
  });
}

function noop() {}
},{"./EventEmitter":"../src/EventEmitter.ts","./Figure/FreeLine":"../src/Figure/FreeLine.ts","./Figure/StraightLine":"../src/Figure/StraightLine.ts","./Figure/Rectangle":"../src/Figure/Rectangle.ts","./Figure/Ellipse":"../src/Figure/Ellipse.ts","./Figure/Arrow":"../src/Figure/Arrow.ts"}],"../src/index.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Painter", {
  enumerable: true,
  get: function () {
    return _Painter.default;
  }
});
exports.default = void 0;

var _Painter = _interopRequireDefault(require("./Painter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _Painter.default;
exports.default = _default;
},{"./Painter":"../src/Painter.ts"}],"index.ts":[function(require,module,exports) {
"use strict";

var _src = _interopRequireDefault(require("../src"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var color = document.getElementById('color');
var radios = document.getElementsByName('draw-type');
var canvas = document.getElementById('canvas');
var painter = window.painter = new _src.default({
  canvas: canvas,
  width: 600,
  height: 600,
  lineCap: 'round',
  thickness: 3,
  color: color.value,
  type: document.querySelector('input[name="draw-type"]:checked').value,
  figures: [{
    drawOption: {
      type: 'rectangle',
      color: 'blue',
      thickness: 10,
      lineCap: 'square'
    },
    positions: [{
      x: 0.45800570994602724,
      y: 0.29400569993626097
    }, {
      x: 0.6980057245944656,
      y: 0.46000571006809754
    }]
  }]
});
color.addEventListener('change', function () {
  return painter.setOptions({
    color: color.value
  });
});

for (var _i = 0, radios_1 = radios; _i < radios_1.length; _i++) {
  var radio = radios_1[_i];
  radio.addEventListener('change', function () {
    painter.setOptions({
      type: document.querySelector('input[name="draw-type"]:checked').value
    });
  });
}

painter.draw({
  drawOption: {
    type: 'freeLine',
    color: 'red',
    thickness: 3,
    lineCap: 'round'
  },
  positions: [{
    x: 0.537866461275263,
    y: 0.24183928841850494
  }, {
    x: 0.655767612752637,
    y: 0.14106861275263723
  }, {
    x: 0.654859612752637,
    y: 0.14429961275263721
  }, {
    x: 0.640327612752637,
    y: 0.19599561275263723
  }, {
    x: 0.638516127526372,
    y: 0.20245761275263723
  }]
});
painter.draw({
  drawOption: {
    type: 'ellipse',
    color: 'green',
    thickness: 2,
    lineCap: 'round'
  },
  positions: [{
    x: 0.589660464410864,
    y: 0.39722129782530574
  }, {
    x: 0.8147651703463574,
    y: 0.5984210792366761
  }]
});
painter.draw({
  drawOption: {
    type: 'arrow',
    color: 'orange',
    thickness: 5,
    lineCap: 'square'
  },
  positions: [{
    x: 0.6147651703463574,
    y: 0.6984210792366761
  }, {
    x: 0.789660464410864,
    y: 0.29722129782530574
  }]
});
painter.draw({
  drawOption: {
    type: 'straightLine',
    color: 'purple',
    thickness: 5,
    lineCap: 'round'
  },
  positions: [{
    x: 0.589660464410864,
    y: 0.39722129782530574
  }, {
    x: 0.8147651703463574,
    y: 0.5984210792366761
  }]
});
painter.on('drawStart', function (data) {
  console.log('drawStart', data);
});
painter.on('drawing', function (data) {
  console.log('drawing', data);
});
painter.on('drawEnd', function (data) {
  console.log('drawEnd', data);
});
painter.on('figures', function (data) {
  console.log('figures', data);
});
},{"../src":"../src/index.ts"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "53710" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.ts"], null)
//# sourceMappingURL=/example.77de5100.js.map