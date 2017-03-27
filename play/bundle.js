/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Layer = (function () {
    function Layer() {
        var items = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            items[_i] = arguments[_i];
        }
        this.items = [];
        this.items = items;
    }
    Layer.prototype.add = function () {
        var items = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            items[_i] = arguments[_i];
        }
        (_a = this.items).push.apply(_a, items);
        var _a;
    };
    Layer.prototype.getIndex = function (item) {
        for (var index = 0, len = this.items.length; index < len; index++) {
            var element = this.items[index];
            if (item.getUid() === element.getUid()) {
                return index;
            }
        }
    };
    Layer.prototype.remove = function () {
        var _this = this;
        var items = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            items[_i] = arguments[_i];
        }
        items.forEach(function (item) {
            var removeeIndex = _this.getIndex(item);
            _this.items.splice(removeeIndex, 1);
        });
    };
    Layer.prototype.getAt = function (index) {
        return this.items[index];
    };
    Layer.prototype.getCount = function () {
        return this.items.length;
    };
    Layer.prototype.getItems = function () {
        return this.items;
    };
    return Layer;
}());
exports.default = Layer;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = __webpack_require__(5);
var RenderEngineDebugger = (function () {
    function RenderEngineDebugger(doDebug) {
        this.layerCount = 0;
        this.doDebug = doDebug;
    }
    RenderEngineDebugger.prototype.render = function (tree) {
        if (!this.doDebug) {
            return;
        }
        console.log("Tree");
        for (var l = 0, len = tree.getCount(); l < len; l++) {
            var layer = tree.getAt(l);
            var indentation = util_1.stringRepeat("  ", l + 1);
            console.log(indentation + "Layer");
            for (var i = 0, len_1 = layer.getCount(); i < len_1; i++) {
                var sprite = layer.getAt(i);
                var indentation_1 = util_1.stringRepeat("  ", (l + 1) + (i + 1));
                console.log(indentation_1 + "Sprite {" + sprite.getUid() + "} | ", sprite);
            }
        }
    };
    return RenderEngineDebugger;
}());
exports.RenderEngineDebugger = RenderEngineDebugger;
var RenderEngine = (function () {
    function RenderEngine(canvas, context, doDebug) {
        if (doDebug === void 0) { doDebug = true; }
        this.doDebug = true;
        this.canvas = canvas;
        this.context = context;
        this.doDebug = doDebug;
        this.debugger = new RenderEngineDebugger(this.doDebug);
    }
    RenderEngine.prototype.clear = function (bgColor) {
        var canvas = this.canvas;
        var context = this.context;
        if (bgColor) {
            context.fillStyle = bgColor;
            context.fillRect(0, 0, canvas.width, canvas.height);
        }
        else {
            context.clearRect(0, 0, canvas.width, canvas.height);
        }
    };
    RenderEngine.prototype.render = function (tree) {
        var context = this.context;
        this.debugger.render(tree);
        this.clear(tree.getBgColor());
        this.context.save();
        for (var _i = 0, _a = tree.getLayers(); _i < _a.length; _i++) {
            var layer = _a[_i];
            for (var _b = 0, _c = layer.getItems(); _b < _c.length; _b++) {
                var item = _c[_b];
                if (item.getIsVisible()) {
                    context.save();
                    item.render(context);
                    context.restore();
                }
            }
        }
        this.context.restore();
    };
    return RenderEngine;
}());
exports.default = RenderEngine;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Sprite = (function () {
    function Sprite(x, y, rotation, scaleX, scaleY) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (rotation === void 0) { rotation = 0; }
        if (scaleX === void 0) { scaleX = 1; }
        if (scaleY === void 0) { scaleY = 1; }
        this.alpha = 1;
        this.blendMode = "source-over";
        this.isVisible = true;
        this.pivotX = 0;
        this.pivotY = 0;
        this.rotation = 0;
        this.scaleX = 1;
        this.scaleY = 1;
        this.x = 0;
        this.y = 0;
        this.x = x;
        this.y = y;
        this.rotation = rotation;
        this.scaleX = scaleX;
        this.scaleY = scaleY;
        this.uid = Sprite.uidCounter++;
    }
    Sprite.prototype.render = function (context) {
        context.translate(this.x, this.y);
        context.rotate(this.rotation * Math.PI / 180);
        context.scale(this.scaleX, this.scaleY);
        context.translate(-this.pivotX, -this.pivotY);
        context.globalAlpha = this.alpha;
        context.globalCompositeOperation = this.blendMode;
    };
    Sprite.prototype.getAlpha = function () {
        return this.alpha;
    };
    Sprite.prototype.setAlpha = function (value) {
        this.alpha = value;
        return this;
    };
    Sprite.prototype.getBlendMode = function () {
        return this.blendMode;
    };
    Sprite.prototype.setBlendMode = function (val) {
        this.blendMode = val;
        return this;
    };
    Sprite.prototype.getIsVisible = function () {
        return this.isVisible;
    };
    Sprite.prototype.setIsVisible = function (val) {
        this.isVisible = val;
        return this;
    };
    Sprite.prototype.getPivotX = function () {
        return this.pivotX;
    };
    Sprite.prototype.setPivotX = function (val) {
        this.pivotX = val;
        return this;
    };
    Sprite.prototype.getPivotY = function () {
        return this.pivotY;
    };
    Sprite.prototype.setPivotY = function (val) {
        this.pivotY = val;
        return this;
    };
    Sprite.prototype.getRotation = function () {
        return this.rotation;
    };
    Sprite.prototype.setRotation = function (val) {
        this.rotation = val;
        return this;
    };
    Sprite.prototype.getScaleX = function () {
        return this.scaleX;
    };
    Sprite.prototype.setScaleX = function (val) {
        this.scaleX = val;
        return this;
    };
    Sprite.prototype.getScaleY = function () {
        return this.scaleY;
    };
    Sprite.prototype.setScaleY = function (val) {
        this.scaleY = val;
        return this;
    };
    Sprite.prototype.getX = function () {
        return this.x;
    };
    Sprite.prototype.setX = function (val) {
        this.x = val;
        return this;
    };
    Sprite.prototype.getY = function () {
        return this.y;
    };
    Sprite.prototype.setY = function (val) {
        this.y = val;
        return this;
    };
    Sprite.prototype.getUid = function () {
        return this.uid;
    };
    return Sprite;
}());
Sprite.uidCounter = 0;
exports.default = Sprite;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Tree = (function () {
    function Tree(bgColor) {
        var layers = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            layers[_i - 1] = arguments[_i];
        }
        this.layers = [];
        this.bgColor = bgColor;
        this.layers = layers;
    }
    Tree.prototype.getBgColor = function () {
        return this.bgColor;
    };
    Tree.prototype.getCount = function () {
        return this.layers.length;
    };
    Tree.prototype.getAt = function (i) {
        return this.layers[i];
    };
    Tree.prototype.getLayers = function () {
        return this.layers;
    };
    return Tree;
}());
exports.default = Tree;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Sprite_1 = __webpack_require__(2);
var Layer_1 = __webpack_require__(0);
var Tree_1 = __webpack_require__(3);
var RenderEngine_1 = __webpack_require__(1);
var canvas = document.querySelector("canvas");
var context = canvas.getContext("2d");
var sprite = new Sprite_1.default();
var layer = new Layer_1.default(sprite);
var tree = new Tree_1.default("deepskyblue", layer);
var renderEngine = new RenderEngine_1.default(canvas, context);
renderEngine.render(tree);


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function stringRepeat(pattern, count) {
    if (count < 1)
        return '';
    var result = '';
    while (count > 1) {
        if (count & 1)
            result += pattern;
        count >>= 1, pattern += pattern;
    }
    return result + pattern;
}
exports.stringRepeat = stringRepeat;


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZmRlNTYxMzUwODkzNDZiNDExMmQiLCJ3ZWJwYWNrOi8vLy4vc3JjL0xheWVyLnRzIiwid2VicGFjazovLy8uL3NyYy9SZW5kZXJFbmdpbmUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1Nwcml0ZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvVHJlZS50cyIsIndlYnBhY2s6Ly8vLi9wbGF5L21haW4udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1EQUEyQyxjQUFjOztBQUV6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7QUM5REE7SUFJRTtRQUFhLGVBQWtCO2FBQWxCLFVBQWtCLEVBQWxCLHFCQUFrQixFQUFsQixJQUFrQjtZQUFsQiwwQkFBa0I7O1FBRnZCLFVBQUssR0FBYSxFQUFFLENBQUM7UUFHM0IsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7SUFDckIsQ0FBQztJQUVNLG1CQUFHLEdBQVY7UUFBWSxlQUFrQjthQUFsQixVQUFrQixFQUFsQixxQkFBa0IsRUFBbEIsSUFBa0I7WUFBbEIsMEJBQWtCOztRQUM1QixVQUFJLENBQUMsS0FBSyxFQUFDLElBQUksV0FBSSxLQUFLLEVBQUU7O0lBQzVCLENBQUM7SUFF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QUFPLENBQUM7SUFDbEMsQ0FBQztJQUNELE1BQU0sQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDO0FBQzFCLENBQUM7QUFSRCxvQ0FRQyIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gaWRlbnRpdHkgZnVuY3Rpb24gZm9yIGNhbGxpbmcgaGFybW9ueSBpbXBvcnRzIHdpdGggdGhlIGNvcnJlY3QgY29udGV4dFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5pID0gZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9O1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSA0KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBmZGU1NjEzNTA4OTM0NmI0MTEyZCIsImltcG9ydCBTcHJpdGUgZnJvbSBcIi4vU3ByaXRlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExheWVyIHtcblxuICBwcml2YXRlIGl0ZW1zOiBTcHJpdGVbXSA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yICguLi5pdGVtczogU3ByaXRlW10pIHtcbiAgICB0aGlzLml0ZW1zID0gaXRlbXM7XG4gIH1cblxuICBwdWJsaWMgYWRkICguLi5pdGVtczogU3ByaXRlW10pIHtcbiAgICB0aGlzLml0ZW1zLnB1c2goLi4uaXRlbXMpO1xuICB9XG5cbiAgcHVibGljIGdldEluZGV4IChpdGVtOiBTcHJpdGUpOiBudW1iZXIge1xuICAgIGZvciAodmFyIGluZGV4ID0gMCwgbGVuID0gdGhpcy5pdGVtcy5sZW5ndGg7IGluZGV4IDwgbGVuOyBpbmRleCsrKSB7XG4gICAgICBjb25zdCBlbGVtZW50OiBTcHJpdGUgPSB0aGlzLml0ZW1zW2luZGV4XTtcblxuICAgICAgaWYgKGl0ZW0uZ2V0VWlkKCkgPT09IGVsZW1lbnQuZ2V0VWlkKCkpIHtcbiAgICAgICAgcmV0dXJuIGluZGV4O1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyByZW1vdmUgKC4uLml0ZW1zKTogdm9pZCB7XG4gICAgaXRlbXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgIGNvbnN0IHJlbW92ZWVJbmRleDogbnVtYmVyID0gdGhpcy5nZXRJbmRleChpdGVtKTtcbiAgICAgIHRoaXMuaXRlbXMuc3BsaWNlKHJlbW92ZWVJbmRleCwgMSk7XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0QXQgKGluZGV4OiBudW1iZXIpOiBTcHJpdGUge1xuICAgIHJldHVybiB0aGlzLml0ZW1zW2luZGV4XTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRDb3VudCAoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5pdGVtcy5sZW5ndGg7XG4gIH1cblxuICBwdWJsaWMgZ2V0SXRlbXMgKCk6IFNwcml0ZVtdIHtcbiAgICByZXR1cm4gdGhpcy5pdGVtcztcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vfi9zb3VyY2UtbWFwLWxvYWRlciEuL3NyYy9MYXllci50cyIsImltcG9ydCBUcmVlIGZyb20gXCIuL1RyZWVcIjtcbmltcG9ydCBMYXllciBmcm9tIFwiLi9MYXllclwiO1xuaW1wb3J0IFNwcml0ZSBmcm9tIFwiLi9TcHJpdGVcIjtcbmltcG9ydCB7IHN0cmluZ1JlcGVhdCB9IGZyb20gXCIuL3V0aWxcIjtcbmltcG9ydCBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkRNb2NrIGZyb20gXCIuLi90ZXN0L21vY2tzL0NhbnZhc1JlbmRlcmluZ0NvbnRleHQyRE1vY2tcIjtcbmltcG9ydCBIVE1MQ2FudmFzRWxlbWVudE1vY2sgZnJvbSBcIi4uL3Rlc3QvbW9ja3MvSFRNTENhbnZhc0VsZW1lbnRNb2NrXCI7XG5cbmV4cG9ydCBjbGFzcyBSZW5kZXJFbmdpbmVEZWJ1Z2dlciB7XG5cbiAgcHJpdmF0ZSBkb0RlYnVnOiBib29sZWFuO1xuICBwcml2YXRlIGxheWVyQ291bnQ6IG51bWJlciA9IDA7XG5cbiAgY29uc3RydWN0b3IgKGRvRGVidWc6IGJvb2xlYW4pIHtcbiAgICB0aGlzLmRvRGVidWcgPSBkb0RlYnVnO1xuICB9XG5cbiAgcHVibGljIHJlbmRlciAodHJlZSk6IHZvaWQge1xuICAgIGlmICghdGhpcy5kb0RlYnVnKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc29sZS5sb2coXCJUcmVlXCIpO1xuXG4gICAgZm9yIChsZXQgbCA9IDAsIGxlbiA9IHRyZWUuZ2V0Q291bnQoKTsgbCA8IGxlbjsgbCsrKSB7XG4gICAgICBjb25zdCBsYXllciA9IHRyZWUuZ2V0QXQobCk7XG4gICAgICBjb25zdCBpbmRlbnRhdGlvbiA9IHN0cmluZ1JlcGVhdChcIiAgXCIsIGwgKyAxKTtcblxuICAgICAgY29uc29sZS5sb2coYCR7aW5kZW50YXRpb259TGF5ZXJgKTtcbiAgICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBsYXllci5nZXRDb3VudCgpOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgY29uc3Qgc3ByaXRlID0gbGF5ZXIuZ2V0QXQoaSk7XG4gICAgICAgIGNvbnN0IGluZGVudGF0aW9uID0gc3RyaW5nUmVwZWF0KFwiICBcIiwgKGwgKyAxKSArIChpICsgMSkpO1xuXG4gICAgICAgIGNvbnNvbGUubG9nKGAke2luZGVudGF0aW9ufVNwcml0ZSB7JHtzcHJpdGUuZ2V0VWlkKCl9fSB8IGAsIHNwcml0ZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlbmRlckVuZ2luZSB7XG4gIFxuICBwcml2YXRlIGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQgfCBIVE1MQ2FudmFzRWxlbWVudE1vY2s7XG4gIHByaXZhdGUgY29udGV4dDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEIHwgQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJETW9jaztcbiAgcHJpdmF0ZSBkb0RlYnVnOiBib29sZWFuID0gdHJ1ZTtcbiAgcHJpdmF0ZSBkZWJ1Z2dlcjogUmVuZGVyRW5naW5lRGVidWdnZXI7XG5cbiAgY29uc3RydWN0b3IgKGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQgfCBIVE1MQ2FudmFzRWxlbWVudE1vY2ssXG4gICAgICAgICAgICAgICBjb250ZXh0OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQgfCBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkRNb2NrLFxuICAgICAgICAgICAgICAgZG9EZWJ1ZzogYm9vbGVhbiA9IHRydWUpIHtcbiAgICB0aGlzLmNhbnZhcyA9IGNhbnZhcztcbiAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xuICAgIHRoaXMuZG9EZWJ1ZyA9IGRvRGVidWc7XG5cbiAgICB0aGlzLmRlYnVnZ2VyID0gbmV3IFJlbmRlckVuZ2luZURlYnVnZ2VyKHRoaXMuZG9EZWJ1Zyk7XG4gIH1cblxuICBwdWJsaWMgY2xlYXIoYmdDb2xvcj86IHN0cmluZyk6IHZvaWQge1xuICAgIGNvbnN0IGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQgfCBIVE1MQ2FudmFzRWxlbWVudE1vY2sgPSB0aGlzLmNhbnZhcztcbiAgICBjb25zdCBjb250ZXh0OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQgfCBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkRNb2NrID0gdGhpcy5jb250ZXh0O1xuXG4gICAgaWYgKGJnQ29sb3IpIHtcbiAgICAgIGNvbnRleHQuZmlsbFN0eWxlID0gYmdDb2xvcjtcbiAgICAgIGNvbnRleHQuZmlsbFJlY3QoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29udGV4dC5jbGVhclJlY3QoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgcmVuZGVyICh0cmVlOiBUcmVlKTogdm9pZCB7XG4gICAgY29uc3QgY29udGV4dCA9IHRoaXMuY29udGV4dDtcblxuICAgIHRoaXMuZGVidWdnZXIucmVuZGVyKHRyZWUpO1xuICAgIHRoaXMuY2xlYXIodHJlZS5nZXRCZ0NvbG9yKCkpO1xuICAgIHRoaXMuY29udGV4dC5zYXZlKCk7XG5cbiAgICBmb3IgKGNvbnN0IGxheWVyIG9mIHRyZWUuZ2V0TGF5ZXJzKCkpIHtcbiAgICAgIGZvciAoY29uc3QgaXRlbSBvZiBsYXllci5nZXRJdGVtcygpKSB7XG4gICAgICAgIGlmIChpdGVtLmdldElzVmlzaWJsZSgpKSB7XG4gICAgICAgICAgY29udGV4dC5zYXZlKCk7XG4gICAgICAgICAgaXRlbS5yZW5kZXIoY29udGV4dCk7XG4gICAgICAgICAgY29udGV4dC5yZXN0b3JlKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLmNvbnRleHQucmVzdG9yZSgpO1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9+L3NvdXJjZS1tYXAtbG9hZGVyIS4vc3JjL1JlbmRlckVuZ2luZS50cyIsImltcG9ydCBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkRNb2NrIGZyb20gXCIuLi90ZXN0L21vY2tzL0NhbnZhc1JlbmRlcmluZ0NvbnRleHQyRE1vY2tcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3ByaXRlIHtcblxuICBwcml2YXRlIGFscGhhIDogbnVtYmVyID0gMTtcbiAgcHJpdmF0ZSBibGVuZE1vZGU6IHN0cmluZyA9IFwic291cmNlLW92ZXJcIjtcbiAgcHJpdmF0ZSBpc1Zpc2libGU6IGJvb2xlYW4gPSB0cnVlO1xuICBwcml2YXRlIHBpdm90WDogbnVtYmVyID0gMDtcbiAgcHJpdmF0ZSBwaXZvdFk6IG51bWJlciA9IDA7XG4gIHByaXZhdGUgcm90YXRpb246IG51bWJlciA9IDA7XG4gIHByaXZhdGUgc2NhbGVYOiBudW1iZXIgPSAxO1xuICBwcml2YXRlIHNjYWxlWTogbnVtYmVyID0gMTtcbiAgcHJpdmF0ZSB4OiBudW1iZXIgPSAwO1xuICBwcml2YXRlIHk6IG51bWJlciA9IDA7XG4gIHByaXZhdGUgdWlkOiBudW1iZXI7XG5cbiAgcHJpdmF0ZSBzdGF0aWMgdWlkQ291bnRlcjogbnVtYmVyID0gMDtcblxuICBjb25zdHJ1Y3RvciAoeDogbnVtYmVyID0gMCwgeTogbnVtYmVyID0gMCwgcm90YXRpb246IG51bWJlciA9IDAsIHNjYWxlWDogbnVtYmVyID0gMSwgc2NhbGVZOiBudW1iZXIgPSAxKSB7XG4gICAgdGhpcy54ID0geDtcbiAgICB0aGlzLnkgPSB5O1xuICAgIHRoaXMucm90YXRpb24gPSByb3RhdGlvbjtcbiAgICB0aGlzLnNjYWxlWCA9IHNjYWxlWDtcbiAgICB0aGlzLnNjYWxlWSA9IHNjYWxlWTtcblxuICAgIHRoaXMudWlkID0gU3ByaXRlLnVpZENvdW50ZXIrKztcbiAgfVxuXG4gIHB1YmxpYyByZW5kZXIgKGNvbnRleHQ6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCB8IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRE1vY2spOiB2b2lkIHtcbiAgICBjb250ZXh0LnRyYW5zbGF0ZSh0aGlzLngsIHRoaXMueSk7XG4gICAgY29udGV4dC5yb3RhdGUodGhpcy5yb3RhdGlvbiAqIE1hdGguUEkgLyAxODApO1xuICAgIGNvbnRleHQuc2NhbGUodGhpcy5zY2FsZVgsIHRoaXMuc2NhbGVZKTtcbiAgICBjb250ZXh0LnRyYW5zbGF0ZSgtdGhpcy5waXZvdFgsIC10aGlzLnBpdm90WSk7XG5cbiAgICBjb250ZXh0Lmdsb2JhbEFscGhhID0gdGhpcy5hbHBoYTtcbiAgICBjb250ZXh0Lmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiA9IHRoaXMuYmxlbmRNb2RlO1xuICB9XG5cbiAgcHVibGljIGdldEFscGhhKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuYWxwaGE7XG4gIH1cbiAgcHVibGljIHNldEFscGhhICh2YWx1ZTogbnVtYmVyKTogU3ByaXRlIHtcbiAgICB0aGlzLmFscGhhID0gdmFsdWU7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBwdWJsaWMgZ2V0QmxlbmRNb2RlKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuYmxlbmRNb2RlO1xuICB9XG4gIHB1YmxpYyBzZXRCbGVuZE1vZGUgKHZhbDogc3RyaW5nKTogU3ByaXRlIHtcbiAgICB0aGlzLmJsZW5kTW9kZSA9IHZhbDtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHB1YmxpYyBnZXRJc1Zpc2libGUgKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmlzVmlzaWJsZTtcbiAgfVxuICBwdWJsaWMgc2V0SXNWaXNpYmxlICh2YWw6IGJvb2xlYW4pOiBTcHJpdGUge1xuICAgIHRoaXMuaXNWaXNpYmxlID0gdmFsO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgcHVibGljIGdldFBpdm90WCAoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5waXZvdFg7XG4gIH1cbiAgcHVibGljIHNldFBpdm90WCAodmFsOiBudW1iZXIpOiBTcHJpdGUge1xuICAgIHRoaXMucGl2b3RYID0gdmFsO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgcHVibGljIGdldFBpdm90WSAoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5waXZvdFk7XG4gIH1cbiAgcHVibGljIHNldFBpdm90WSAodmFsOiBudW1iZXIpOiBTcHJpdGUge1xuICAgIHRoaXMucGl2b3RZID0gdmFsO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgcHVibGljIGdldFJvdGF0aW9uICgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLnJvdGF0aW9uO1xuICB9XG4gIHB1YmxpYyBzZXRSb3RhdGlvbiAodmFsOiBudW1iZXIpOiBTcHJpdGUge1xuICAgIHRoaXMucm90YXRpb24gPSB2YWw7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBwdWJsaWMgZ2V0U2NhbGVYICgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLnNjYWxlWDtcbiAgfVxuICBwdWJsaWMgc2V0U2NhbGVYICh2YWw6IG51bWJlcik6IFNwcml0ZSB7XG4gICAgdGhpcy5zY2FsZVggPSB2YWw7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBwdWJsaWMgZ2V0U2NhbGVZICgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLnNjYWxlWTtcbiAgfVxuICBwdWJsaWMgc2V0U2NhbGVZICh2YWw6IG51bWJlcik6IFNwcml0ZSB7XG4gICAgdGhpcy5zY2FsZVkgPSB2YWw7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBwdWJsaWMgZ2V0WCAoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy54O1xuICB9XG4gIHB1YmxpYyBzZXRYICh2YWw6IG51bWJlcik6IFNwcml0ZSB7XG4gICAgdGhpcy54ID0gdmFsO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgcHVibGljIGdldFkgKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMueTtcbiAgfVxuICBwdWJsaWMgc2V0WSAodmFsOiBudW1iZXIpOiBTcHJpdGUge1xuICAgIHRoaXMueSA9IHZhbDtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHB1YmxpYyBnZXRVaWQgKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMudWlkO1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9+L3NvdXJjZS1tYXAtbG9hZGVyIS4vc3JjL1Nwcml0ZS50cyIsImltcG9ydCBMYXllciBmcm9tIFwiLi9MYXllclwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUcmVlIHtcblxuICBwcml2YXRlIGJnQ29sb3I6IHN0cmluZztcbiAgcHJpdmF0ZSBsYXllcnM6IExheWVyW10gPSBbXTtcblxuICBjb25zdHJ1Y3RvciAoYmdDb2xvcjogc3RyaW5nLCAuLi5sYXllcnM6IExheWVyW10pIHtcbiAgICB0aGlzLmJnQ29sb3IgPSBiZ0NvbG9yO1xuICAgIHRoaXMubGF5ZXJzID0gbGF5ZXJzO1xuICB9XG5cbiAgcHVibGljIGdldEJnQ29sb3IgKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuYmdDb2xvcjtcbiAgfVxuXG4gIHB1YmxpYyBnZXRDb3VudCAoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5sYXllcnMubGVuZ3RoO1xuICB9XG5cbiAgcHVibGljIGdldEF0IChpOiBudW1iZXIpOiBMYXllciB7XG4gICAgcmV0dXJuIHRoaXMubGF5ZXJzW2ldO1xuICB9XG5cbiAgcHVibGljIGdldExheWVycyAoKTogTGF5ZXJbXSB7XG4gICAgcmV0dXJuIHRoaXMubGF5ZXJzO1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9+L3NvdXJjZS1tYXAtbG9hZGVyIS4vc3JjL1RyZWUudHMiLCJpbXBvcnQgU3ByaXRlIGZyb20gXCIuLi9zcmMvU3ByaXRlXCI7XG5pbXBvcnQgTGF5ZXIgZnJvbSBcIi4uL3NyYy9MYXllclwiO1xuaW1wb3J0IFRyZWUgZnJvbSBcIi4uL3NyYy9UcmVlXCI7XG5pbXBvcnQgUmVuZGVyRW5naW5lIGZyb20gXCIuLi9zcmMvUmVuZGVyRW5naW5lXCI7XG5cbmNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJjYW52YXNcIik7XG5jb25zdCBjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcblxuY29uc3Qgc3ByaXRlID0gbmV3IFNwcml0ZSgpO1xuY29uc3QgbGF5ZXIgPSBuZXcgTGF5ZXIoc3ByaXRlKTtcbmNvbnN0IHRyZWUgPSBuZXcgVHJlZShcImRlZXBza3libHVlXCIsIGxheWVyKTtcbmNvbnN0IHJlbmRlckVuZ2luZSA9IG5ldyBSZW5kZXJFbmdpbmUoY2FudmFzLCBjb250ZXh0KTtcblxucmVuZGVyRW5naW5lLnJlbmRlcih0cmVlKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL34vc291cmNlLW1hcC1sb2FkZXIhLi9wbGF5L21haW4udHMiLCJleHBvcnQgZnVuY3Rpb24gc3RyaW5nUmVwZWF0IChwYXR0ZXJuLCBjb3VudCkge1xuICBpZiAoY291bnQgPCAxKSByZXR1cm4gJyc7XG4gIHZhciByZXN1bHQgPSAnJztcbiAgd2hpbGUgKGNvdW50ID4gMSkge1xuICAgIGlmIChjb3VudCAmIDEpIHJlc3VsdCArPSBwYXR0ZXJuO1xuICAgIGNvdW50ID4+PSAxLCBwYXR0ZXJuICs9IHBhdHRlcm47XG4gIH1cbiAgcmV0dXJuIHJlc3VsdCArIHBhdHRlcm47XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vfi9zb3VyY2UtbWFwLWxvYWRlciEuL3NyYy91dGlsLnRzIl0sInNvdXJjZVJvb3QiOiIifQ==