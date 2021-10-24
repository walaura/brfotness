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
})({"constants.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PADDING = exports.DOT_SIZE = exports.SPACE = void 0;
exports.SPACE = 60;
exports.DOT_SIZE = 10;
exports.PADDING = 30;
},{}],"draw/helpers.ts":[function(require,module,exports) {
"use strict";

var __read = this && this.__read || function (o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o),
      r,
      ar = [],
      e;

  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done) {
      ar.push(r.value);
    }
  } catch (error) {
    e = {
      error: error
    };
  } finally {
    try {
      if (r && !r.done && (m = i["return"])) m.call(i);
    } finally {
      if (e) throw e.error;
    }
  }

  return ar;
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.drawDot = exports.drawLine = void 0;

var constants_1 = require("../constants");

var drawLine = function drawLine(ctx, color, _a) {
  if (color === void 0) {
    color = "black";
  }

  var _b = __read(_a.points, 2),
      from = _b[0],
      to = _b[1];

  ctx.lineWidth = 10;
  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.moveTo(constants_1.DOT_SIZE - constants_1.PADDING + (from.x + 1) * constants_1.SPACE, constants_1.DOT_SIZE - constants_1.PADDING + (from.y + 1) * constants_1.SPACE);
  ctx.lineTo(constants_1.DOT_SIZE - constants_1.PADDING + (to.x + 1) * constants_1.SPACE, constants_1.DOT_SIZE - constants_1.PADDING + (to.y + 1) * constants_1.SPACE);
  ctx.closePath();
  ctx.stroke();
};

exports.drawLine = drawLine;

var drawDot = function drawDot(ctx, _a) {
  var x = _a.x,
      y = _a.y;
  ctx.fillRect(constants_1.DOT_SIZE / 2 - constants_1.PADDING + (x + 1) * constants_1.SPACE, constants_1.DOT_SIZE / 2 - constants_1.PADDING + (y + 1) * constants_1.SPACE, constants_1.DOT_SIZE, constants_1.DOT_SIZE);
};

exports.drawDot = drawDot;
},{"../constants":"constants.ts"}],"draw/board.ts":[function(require,module,exports) {
"use strict";

var __values = this && this.__values || function (o) {
  var s = typeof Symbol === "function" && Symbol.iterator,
      m = s && o[s],
      i = 0;
  if (m) return m.call(o);
  if (o && typeof o.length === "number") return {
    next: function next() {
      if (o && i >= o.length) o = void 0;
      return {
        value: o && o[i++],
        done: !o
      };
    }
  };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};

var __read = this && this.__read || function (o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o),
      r,
      ar = [],
      e;

  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done) {
      ar.push(r.value);
    }
  } catch (error) {
    e = {
      error: error
    };
  } finally {
    try {
      if (r && !r.done && (m = i["return"])) m.call(i);
    } finally {
      if (e) throw e.error;
    }
  }

  return ar;
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.drawBoardAt = exports.drawBoard = exports.getCanvas = void 0;

var helpers_1 = require("./helpers");

var getCanvas = function getCanvas(id) {
  var canvas = document.getElementById("cv-" + id);

  if (canvas) {
    return canvas;
  }

  canvas = document.createElement("canvas");
  document.querySelector("x-canvas").appendChild(canvas);
  canvas.width = 400;
  canvas.height = 400;
  return canvas;
};

exports.getCanvas = getCanvas;

var drawBoard = function drawBoard(board) {
  var ctx = (0, exports.getCanvas)(Math.random()).getContext("2d");
  (0, exports.drawBoardAt)(ctx, board);
};

exports.drawBoard = drawBoard;

var drawBoardAt = function drawBoardAt(ctx, _a) {
  var e_1, _b, e_2, _c, e_3, _d;

  var lines = _a.lines,
      joins = _a.joins,
      start = _a.start,
      end = _a.end,
      path = _a.path;
  ctx.clearRect(0, 0, 400, 400);

  try {
    // DRAW LINES
    for (var lines_1 = __values(lines), lines_1_1 = lines_1.next(); !lines_1_1.done; lines_1_1 = lines_1.next()) {
      var line = lines_1_1.value;
      (0, helpers_1.drawLine)(ctx, "black", line);
    }
  } catch (e_1_1) {
    e_1 = {
      error: e_1_1
    };
  } finally {
    try {
      if (lines_1_1 && !lines_1_1.done && (_b = lines_1.return)) _b.call(lines_1);
    } finally {
      if (e_1) throw e_1.error;
    }
  }

  try {
    for (var _e = __values(Object.entries(joins)), _f = _e.next(); !_f.done; _f = _e.next()) {
      var _g = __read(_f.value, 2),
          _ = _g[0],
          join = _g[1];

      (0, helpers_1.drawDot)(ctx, join);
    }
  } catch (e_2_1) {
    e_2 = {
      error: e_2_1
    };
  } finally {
    try {
      if (_f && !_f.done && (_c = _e.return)) _c.call(_e);
    } finally {
      if (e_2) throw e_2.error;
    }
  }

  ctx.fillStyle = "blue";
  (0, helpers_1.drawDot)(ctx, start);
  ctx.fillStyle = "yellow";
  (0, helpers_1.drawDot)(ctx, end);
  ctx.lineWidth = 10;

  try {
    for (var path_1 = __values(path), path_1_1 = path_1.next(); !path_1_1.done; path_1_1 = path_1.next()) {
      var line = path_1_1.value;
      (0, helpers_1.drawLine)(ctx, "lime", line);
    }
  } catch (e_3_1) {
    e_3 = {
      error: e_3_1
    };
  } finally {
    try {
      if (path_1_1 && !path_1_1.done && (_d = path_1.return)) _d.call(path_1);
    } finally {
      if (e_3) throw e_3.error;
    }
  }

  ctx.lineWidth = 1;
};

exports.drawBoardAt = drawBoardAt;
},{"./helpers":"draw/helpers.ts"}],"draw/input.ts":[function(require,module,exports) {
"use strict";

var __read = this && this.__read || function (o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o),
      r,
      ar = [],
      e;

  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done) {
      ar.push(r.value);
    }
  } catch (error) {
    e = {
      error: error
    };
  } finally {
    try {
      if (r && !r.done && (m = i["return"])) m.call(i);
    } finally {
      if (e) throw e.error;
    }
  }

  return ar;
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.startInput = void 0;

var helpers_1 = require("./helpers");

var constants_1 = require("./../constants");

var board_1 = require("./board");

var startInput = function startInput() {
  var _a = globalThis.input,
      joins = _a.joins,
      lines = _a.lines,
      start = _a.start,
      end = _a.end;

  var findJoin = function findJoin(_a) {
    var x = _a.x,
        y = _a.y;

    if (joins[x + "," + y] != null) {
      return joins[x + "," + y];
    } else {
      return null;
    }
  };

  var $input = (0, board_1.getCanvas)("input");
  var ctx = $input.getContext("2d");
  var ghostLine = null;
  $input.addEventListener("mousemove", function (ev) {
    var _a = __read([(ev.offsetX - constants_1.PADDING) / constants_1.SPACE - 0.0, (ev.offsetY - constants_1.PADDING) / constants_1.SPACE - 0.0], 2),
        rawX = _a[0],
        rawY = _a[1];

    var _b = __read([rawX, rawY].map(Math.floor), 2),
        x = _b[0],
        y = _b[1];

    var points;

    if (rawX - x > rawY - y) {
      points = [findJoin({
        x: x,
        y: y
      }), findJoin({
        x: x + 1,
        y: y
      })];
    } else {
      points = [findJoin({
        x: x,
        y: y
      }), findJoin({
        x: x,
        y: y + 1
      })];
    }

    if (!points.includes(null)) {
      ghostLine = {
        points: points
      };
    }
  });
  document.querySelector("x-input").appendChild($input);

  var draw = function draw() {
    (0, board_1.drawBoardAt)(ctx, {
      lines: lines,
      joins: joins,
      path: new Set(),
      start: start,
      end: end
    });

    if (ghostLine) {
      (0, helpers_1.drawLine)(ctx, "blue", ghostLine);
    }

    requestAnimationFrame(draw);
  };

  requestAnimationFrame(draw);
};

exports.startInput = startInput;
},{"./helpers":"draw/helpers.ts","./../constants":"constants.ts","./board":"draw/board.ts"}],"app.ts":[function(require,module,exports) {
"use strict";

var __assign = this && this.__assign || function () {
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

var __values = this && this.__values || function (o) {
  var s = typeof Symbol === "function" && Symbol.iterator,
      m = s && o[s],
      i = 0;
  if (m) return m.call(o);
  if (o && typeof o.length === "number") return {
    next: function next() {
      if (o && i >= o.length) o = void 0;
      return {
        value: o && o[i++],
        done: !o
      };
    }
  };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};

var __read = this && this.__read || function (o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o),
      r,
      ar = [],
      e;

  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done) {
      ar.push(r.value);
    }
  } catch (error) {
    e = {
      error: error
    };
  } finally {
    try {
      if (r && !r.done && (m = i["return"])) m.call(i);
    } finally {
      if (e) throw e.error;
    }
  }

  return ar;
};

var __spreadArray = this && this.__spreadArray || function (to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
    if (ar || !(i in from)) {
      if (!ar) ar = Array.prototype.slice.call(from, 0, i);
      ar[i] = from[i];
    }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
};

var e_1, _a, e_2, _b;

Object.defineProperty(exports, "__esModule", {
  value: true
});

var board_1 = require("./draw/board");

var input_1 = require("./draw/input");

var input = {
  joins: {},
  lines: new Set()
};
globalThis.input = input;
var _c = globalThis.input,
    joins = _c.joins,
    lines = _c.lines; // HARDCODE JOINS

for (var x = 0; x <= 4; x++) {
  for (var y = 0; y <= 4; y++) {
    joins[x + "," + y] = {
      x: x,
      y: y,
      lines: new Set()
    };
  }
}

var findJoin = function findJoin(_a) {
  var x = _a.x,
      y = _a.y;

  if (joins[x + "," + y] != null) {
    return joins[x + "," + y];
  } else {
    return null;
  }
};

try {
  // HC LINES
  for (var _d = __values(Object.entries(joins)), _e = _d.next(); !_e.done; _e = _d.next()) {
    var _f = __read(_e.value, 2),
        key = _f[0],
        join = _f[1];

    var x = join.x,
        y = join.y;
    var nextLines = [findJoin({
      x: x + 1,
      y: y
    }), findJoin({
      x: x,
      y: y + 1
    })];

    try {
      for (var nextLines_1 = (e_2 = void 0, __values(nextLines)), nextLines_1_1 = nextLines_1.next(); !nextLines_1_1.done; nextLines_1_1 = nextLines_1.next()) {
        var nextLine = nextLines_1_1.value;

        if (nextLine == null) {
          continue;
        }

        if (join.x === 1 && join.y === 0 && nextLine.x === 1 && nextLine.y === 1) {
          continue;
        }

        if (join.x === 1 && join.y === 3 && nextLine.x === 1 && nextLine.y === 4) {
          continue;
        }

        var line = {
          points: [join, nextLine]
        };
        lines.add(line);
        join.lines.add(line);
        nextLine.lines.add(line);
      }
    } catch (e_2_1) {
      e_2 = {
        error: e_2_1
      };
    } finally {
      try {
        if (nextLines_1_1 && !nextLines_1_1.done && (_b = nextLines_1.return)) _b.call(nextLines_1);
      } finally {
        if (e_2) throw e_2.error;
      }
    }
  }
} catch (e_1_1) {
  e_1 = {
    error: e_1_1
  };
} finally {
  try {
    if (_e && !_e.done && (_a = _d.return)) _a.call(_d);
  } finally {
    if (e_1) throw e_1.error;
  }
}

globalThis.input.start = findJoin({
  x: 2,
  y: 2
});
globalThis.input.end = findJoin({
  x: 4,
  y: 0
});

var getOtherJoinInLine = function getOtherJoinInLine(line, join) {
  if (!line.points.includes(join)) {
    alert(12);
    throw "nooo";
  }

  return line.points.filter(function (point) {
    return point != join;
  })[0];
};

var getNextLines = function getNextLines(path, join) {
  var taken = [];
  path.forEach(function (line) {
    var e_3, _a;

    try {
      for (var _b = __values(line.points), _c = _b.next(); !_c.done; _c = _b.next()) {
        var point = _c.value;
        taken.push(point);
      }
    } catch (e_3_1) {
      e_3 = {
        error: e_3_1
      };
    } finally {
      try {
        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
      } finally {
        if (e_3) throw e_3.error;
      }
    }
  });
  taken = taken.filter(function (j) {
    return j !== join;
  });

  var lines = __spreadArray([], __read(join.lines), false).filter(function (line) {
    return !path.includes(line);
  }).filter(function (line) {
    if (taken.some(function (takenPoint) {
      return line.points.includes(takenPoint);
    })) {
      return false;
    }

    return true;
  });

  return lines;
};

var paths = getNextLines([], globalThis.input.start).map(function (line) {
  return {
    lines: [line],
    at: getOtherJoinInLine(line, globalThis.input.start),
    isFinished: false,
    isSolved: false
  };
});

var loop = function loop() {
  var e_4, _a, e_5, _b;

  var nextPaths = [];

  try {
    for (var paths_1 = __values(paths), paths_1_1 = paths_1.next(); !paths_1_1.done; paths_1_1 = paths_1.next()) {
      var path = paths_1_1.value;

      if (path.isFinished) {
        nextPaths.push(path);
        continue;
      }

      if (path.isSolved) {
        nextPaths.push(path);
        continue;
      }

      var lines_2 = getNextLines(path.lines, path.at);

      if (lines_2.length === 0) {
        nextPaths.push(__assign(__assign({}, path), {
          isFinished: true,
          isSolved: false
        }));
        continue;
      }

      try {
        for (var lines_1 = (e_5 = void 0, __values(lines_2)), lines_1_1 = lines_1.next(); !lines_1_1.done; lines_1_1 = lines_1.next()) {
          var line = lines_1_1.value;
          var to = getOtherJoinInLine(line, path.at);
          nextPaths.push({
            lines: __spreadArray(__spreadArray([], __read(path.lines), false), [line], false),
            at: to,
            isFinished: false,
            isSolved: to === globalThis.input.end
          });
        }
      } catch (e_5_1) {
        e_5 = {
          error: e_5_1
        };
      } finally {
        try {
          if (lines_1_1 && !lines_1_1.done && (_b = lines_1.return)) _b.call(lines_1);
        } finally {
          if (e_5) throw e_5.error;
        }
      }
    }
  } catch (e_4_1) {
    e_4 = {
      error: e_4_1
    };
  } finally {
    try {
      if (paths_1_1 && !paths_1_1.done && (_a = paths_1.return)) _a.call(paths_1);
    } finally {
      if (e_4) throw e_4.error;
    }
  }

  var tbd = nextPaths.length - nextPaths.filter(function (p) {
    return p.isFinished || p.isSolved;
  }).length;
  console.log(nextPaths.length + " paths total");
  console.log(tbd + " paths TBD");
  console.log(nextPaths.filter(function (p) {
    return p.isFinished;
  }).length + " finished paths");
  console.log(nextPaths.filter(function (p) {
    return p.isSolved;
  }).length + " solved paths");
  console.log(100 - tbd / nextPaths.length * 100 + "% solved");
  paths = nextPaths;
};

(0, input_1.startInput)();

var draw = function draw() {
  var e_6, _a;

  document.querySelector("x-canvas").innerHTML = "";

  try {
    for (var _b = __values(paths.sort(function (a, b) {
      return a.lines.length - b.lines.length;
    })), _c = _b.next(); !_c.done; _c = _b.next()) {
      var path = _c.value;

      if (path.isSolved !== true) {
        continue;
      }

      console.log(path);
      (0, board_1.drawBoard)({
        lines: lines,
        joins: joins,
        path: new Set(path.lines),
        start: globalThis.input.start,
        end: globalThis.input.end
      });
    }
  } catch (e_6_1) {
    e_6 = {
      error: e_6_1
    };
  } finally {
    try {
      if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
    } finally {
      if (e_6) throw e_6.error;
    }
  }
};

var $next = document.createElement("button");
$next.innerText = "next";

$next.onclick = function () {
  loop();
};

document.querySelector("x-tools").appendChild($next);
var $draw = document.createElement("button");
$draw.innerText = "draw";

$draw.onclick = function () {
  draw();
};

document.querySelector("x-tools").appendChild($draw);
},{"./draw/board":"draw/board.ts","./draw/input":"draw/input.ts"}],"../../../../../usr/local/lib/node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "52432" + '/');

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
},{}]},{},["../../../../../usr/local/lib/node_modules/parcel/src/builtins/hmr-runtime.js","app.ts"], null)
//# sourceMappingURL=/app.c61986b1.js.map