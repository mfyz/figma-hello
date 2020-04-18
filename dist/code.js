/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/code.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../node_modules/node-serialize/lib/serialize.js":
/*!*******************************************************!*\
  !*** ../node_modules/node-serialize/lib/serialize.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var FUNCFLAG = '_$$ND_FUNC$$_';
var CIRCULARFLAG = '_$$ND_CC$$_';
var KEYPATHSEPARATOR = '_$$.$$_';
var ISNATIVEFUNC = /^function\s*[^(]*\(.*\)\s*\{\s*\[native code\]\s*\}$/;

var getKeyPath = function (obj, path) {
  path = path.split(KEYPATHSEPARATOR);
  var currentObj = obj;
  path.forEach(function (p, index) {
    if (index) {
      currentObj = currentObj[p];
    }
  });
  return currentObj;
};

exports.serialize = function (obj, ignoreNativeFunc, outputObj, cache, path) {
  path = path || '$';
  cache = cache || {};
  cache[path] = obj;
  outputObj = outputObj || {};
  var key;

  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        var subKey;
        var found = false;

        for (subKey in cache) {
          if (cache.hasOwnProperty(subKey)) {
            if (cache[subKey] === obj[key]) {
              outputObj[key] = CIRCULARFLAG + subKey;
              found = true;
            }
          }
        }

        if (!found) {
          outputObj[key] = exports.serialize(obj[key], ignoreNativeFunc, outputObj[key], cache, path + KEYPATHSEPARATOR + key);
        }
      } else if (typeof obj[key] === 'function') {
        var funcStr = obj[key].toString();

        if (ISNATIVEFUNC.test(funcStr)) {
          if (ignoreNativeFunc) {
            funcStr = 'function() {throw new Error("Call a native function unserialized")}';
          } else {
            throw new Error('Can\'t serialize a object with a native function property. Use serialize(obj, true) to ignore the error.');
          }
        }

        outputObj[key] = FUNCFLAG + funcStr;
      } else {
        outputObj[key] = obj[key];
      }
    }
  }

  return path === '$' ? JSON.stringify(outputObj) : outputObj;
};

exports.unserialize = function (obj, originObj) {
  var isIndex;

  if (typeof obj === 'string') {
    obj = JSON.parse(obj);
    isIndex = true;
  }

  originObj = originObj || obj;
  var circularTasks = [];
  var key;

  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (typeof obj[key] === 'object') {
        obj[key] = exports.unserialize(obj[key], originObj);
      } else if (typeof obj[key] === 'string') {
        if (obj[key].indexOf(FUNCFLAG) === 0) {
          obj[key] = eval('(' + obj[key].substring(FUNCFLAG.length) + ')');
        } else if (obj[key].indexOf(CIRCULARFLAG) === 0) {
          obj[key] = obj[key].substring(CIRCULARFLAG.length);
          circularTasks.push({
            obj: obj,
            key: key
          });
        }
      }
    }
  }

  if (isIndex) {
    circularTasks.forEach(function (task) {
      task.obj[task.key] = getKeyPath(originObj, task.obj[task.key]);
    });
  }

  return obj;
};

/***/ }),

/***/ "./src/code.js":
/*!*********************!*\
  !*** ./src/code.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var node_serialize__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! node-serialize */ "../node_modules/node-serialize/lib/serialize.js");
/* harmony import */ var node_serialize__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_serialize__WEBPACK_IMPORTED_MODULE_0__);
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

 // figma.showUI(__html__);

/*

Accessing document
	root document object:
		figma.root
	pages:
		figma.root.children[0]
	current page:
		figma.currentPage

Page node props:
	name
	children

api methods to create stuff
	https://www.figma.com/plugin-docs/api/properties/figma-createrectangle
	https://www.figma.com/plugin-docs/api/properties/figma-createellipse
	https://www.figma.com/plugin-docs/api/properties/figma-createtext
	https://www.figma.com/plugin-docs/api/properties/figma-createframe
	https://www.figma.com/plugin-docs/api/properties/figma-createpage


*/
// console.log('--> figma.root', figma.root)
// console.log('--> figma.currentPage', figma.currentPage)
// console.log('--> figma.getLocalTextStyles()', figma.getLocalTextStyles())
// console.log('--> figma.getLocalPaintStyles()', figma.getLocalPaintStyles())
// console.log('--> figma.getLocalEffectStyles()', figma.getLocalEffectStyles())
// console.log('--> figma.getLocalGridStyles()', figma.getLocalGridStyles())
// ----- WALK THE NODES AND SEARCH ---------
// const allNodes = []
// const textStyles = []
// function walkTree(node) {
// 	allNodes.push(node)
// 	if (node.children) node.children.forEach(walkTree)
// }
// walkTree(figma.currentPage)
// // console.log(allNodes)
// allNodes.forEach((node) => {
// 	if (node.type === 'TEXT') {
// 		console.log(node)
// 	}
// })
// -----------------
// figma.ui.onmessage = msg => {
// 	if (msg.type === 'create-rectangles') {
// 		const nodes: SceneNode[] = [];
// 		for (let i = 0; i < msg.count; i++) {
// 			const rect = figma.createRectangle();
// 			rect.x = i * 150;
// 			rect.fills = [{type: 'SOLID', color: {r: 1, g: 0.5, b: 0}}];
// 			figma.currentPage.appendChild(rect);
// 			nodes.push(rect);
// 		}
// 		figma.currentPage.selection = nodes;
// 		figma.viewport.scrollAndZoomIntoView(nodes);
// 	}
// 	figma.closePlugin();
// };
// -----------------

var styleGuidePage = figma.root.findOne(function (n) {
  return n.type === 'PAGE' && n.name === "Style Guide";
});
console.log('--> styleGuidePage', styleGuidePage);
console.log('--> typeof styleGuidePage', _typeof(styleGuidePage));

if (!styleGuidePage) {
  styleGuidePage = figma.createPage();
  styleGuidePage.name = 'Style Guide';
}

figma.currentPage = styleGuidePage; // switch to the new page

var tFrame = styleGuidePage.findChild(function (n) {
  return n.type === 'FRAME' && n.name === "Template - Text Styles";
});
console.log('--> tFrame', tFrame); // console.log('--> tFrame JSON', serialize(tFrame))
// if (!tFrame) {
// 	const tFrame = figma.createFrame()
// 	tFrame.name = 'Text Styles'
// }
// figma.viewport.scrollAndZoomIntoView([tFrame])
// const textStyles = figma.getLocalTextStyles()
// let textBlocksNextY = 40
// textStyles.forEach(async (textStyle) => {
// 	console.log('---------------------')
// 	// console.log(textNode)
// 	console.log('name', textStyle.name)
// 	console.log('fontName.family', textStyle.fontName.family)
// 	console.log('fontName.style', textStyle.fontName.style)
// 	// console.log('fontSize', textStyle.fontSize)
// 	// console.log('letterSpacing.unit', textStyle.letterSpacing.unit)
// 	// console.log('letterSpacing.value', textStyle.letterSpacing.value)
// 	// console.log('lineHeight.unit', textStyle.lineHeight.unit)
// 	// console.log('lineHeight.value', textStyle.lineHeight.value)
// 	// console.log('paragraphIndent', textStyle.paragraphIndent)
// 	// console.log('paragraphSpacing', textStyle.paragraphSpacing)
// 	// console.log('textCase', textStyle.textCase)
// 	// console.log('textDecoration', textStyle.textDecoration)
// 	await figma.loadFontAsync({
// 		family: textStyle.fontName.family,
// 		style: textStyle.fontName.style
// 	})
// 	const newTextStylePreview = figma.createText()
// 	tFrame.appendChild(newTextStylePreview)
// 	newTextStylePreview.textStyleId = textStyle.id
// 	newTextStylePreview.characters = textStyle.name
// 	newTextStylePreview.x = 40
// 	newTextStylePreview.y = textBlocksNextY
// 	textBlocksNextY += newTextStylePreview.height + 100
// 	tFrame.resize(800, textBlocksNextY)
// })
// const paintStyles = figma.getLocalPaintStyles()
// paintStyles.forEach((paintStyle) => {
// 	console.log('---------------------')
// 	// console.log(paintNode)
// 	console.log('name', paintStyle.name)
// 	// paintNode.paints (Array - Can be multiple)
// 	console.log('type', paintStyle.paints[0].type) // SOLID
// 	console.log('blendMode', paintStyle.paints[0].blendMode) // NORMAL
// 	console.log('visible', paintStyle.paints[0].visible)
// 	console.log('r', paintStyle.paints[0].color.r)
// 	console.log('g', paintStyle.paints[0].color.g)
// 	console.log('b', paintStyle.paints[0].color.b)
// 	console.log('opacity', paintStyle.paints[0].opacity)
// 	// need to see the types for the gradient and other types like background image
// })
// figma.closePlugin()

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9ub2RlLXNlcmlhbGl6ZS9saWIvc2VyaWFsaXplLmpzIiwid2VicGFjazovLy8uL3NyYy9jb2RlLmpzIl0sIm5hbWVzIjpbIkZVTkNGTEFHIiwiQ0lSQ1VMQVJGTEFHIiwiS0VZUEFUSFNFUEFSQVRPUiIsIklTTkFUSVZFRlVOQyIsImdldEtleVBhdGgiLCJvYmoiLCJwYXRoIiwic3BsaXQiLCJjdXJyZW50T2JqIiwiZm9yRWFjaCIsInAiLCJpbmRleCIsImV4cG9ydHMiLCJzZXJpYWxpemUiLCJpZ25vcmVOYXRpdmVGdW5jIiwib3V0cHV0T2JqIiwiY2FjaGUiLCJrZXkiLCJoYXNPd25Qcm9wZXJ0eSIsInN1YktleSIsImZvdW5kIiwiZnVuY1N0ciIsInRvU3RyaW5nIiwidGVzdCIsIkVycm9yIiwiSlNPTiIsInN0cmluZ2lmeSIsInVuc2VyaWFsaXplIiwib3JpZ2luT2JqIiwiaXNJbmRleCIsInBhcnNlIiwiY2lyY3VsYXJUYXNrcyIsImluZGV4T2YiLCJldmFsIiwic3Vic3RyaW5nIiwibGVuZ3RoIiwicHVzaCIsInRhc2siLCJzdHlsZUd1aWRlUGFnZSIsImZpZ21hIiwicm9vdCIsImZpbmRPbmUiLCJuIiwidHlwZSIsIm5hbWUiLCJjb25zb2xlIiwibG9nIiwiY3JlYXRlUGFnZSIsImN1cnJlbnRQYWdlIiwidEZyYW1lIiwiZmluZENoaWxkIl0sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFr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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQSxzQiIsImZpbGUiOiJjb2RlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvY29kZS5qc1wiKTtcbiIsInZhciBGVU5DRkxBRyA9ICdfJCRORF9GVU5DJCRfJztcbnZhciBDSVJDVUxBUkZMQUcgPSAnXyQkTkRfQ0MkJF8nO1xudmFyIEtFWVBBVEhTRVBBUkFUT1IgPSAnXyQkLiQkXyc7XG52YXIgSVNOQVRJVkVGVU5DID0gL15mdW5jdGlvblxccypbXihdKlxcKC4qXFwpXFxzKlxce1xccypcXFtuYXRpdmUgY29kZVxcXVxccypcXH0kLztcblxudmFyIGdldEtleVBhdGggPSBmdW5jdGlvbihvYmosIHBhdGgpIHtcbiAgcGF0aCA9IHBhdGguc3BsaXQoS0VZUEFUSFNFUEFSQVRPUik7XG4gIHZhciBjdXJyZW50T2JqID0gb2JqO1xuICBwYXRoLmZvckVhY2goZnVuY3Rpb24ocCwgaW5kZXgpIHtcbiAgICBpZiAoaW5kZXgpIHtcbiAgICAgIGN1cnJlbnRPYmogPSBjdXJyZW50T2JqW3BdO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiBjdXJyZW50T2JqO1xufTtcblxuZXhwb3J0cy5zZXJpYWxpemUgPSBmdW5jdGlvbihvYmosIGlnbm9yZU5hdGl2ZUZ1bmMsIG91dHB1dE9iaiwgY2FjaGUsIHBhdGgpIHtcbiAgcGF0aCA9IHBhdGggfHwgJyQnO1xuICBjYWNoZSA9IGNhY2hlIHx8IHt9O1xuICBjYWNoZVtwYXRoXSA9IG9iajtcbiAgb3V0cHV0T2JqID0gb3V0cHV0T2JqIHx8IHt9O1xuXG4gIHZhciBrZXk7XG4gIGZvcihrZXkgaW4gb2JqKSB7XG4gICAgaWYob2JqLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgIGlmKHR5cGVvZiBvYmpba2V5XSA9PT0gJ29iamVjdCcgJiYgb2JqW2tleV0gIT09IG51bGwpIHtcbiAgICAgICAgdmFyIHN1YktleTtcbiAgICAgICAgdmFyIGZvdW5kID0gZmFsc2U7XG4gICAgICAgIGZvcihzdWJLZXkgaW4gY2FjaGUpIHtcbiAgICAgICAgICBpZiAoY2FjaGUuaGFzT3duUHJvcGVydHkoc3ViS2V5KSkge1xuICAgICAgICAgICAgaWYgKGNhY2hlW3N1YktleV0gPT09IG9ialtrZXldKSB7XG4gICAgICAgICAgICAgIG91dHB1dE9ialtrZXldID0gQ0lSQ1VMQVJGTEFHICsgc3ViS2V5O1xuICAgICAgICAgICAgICBmb3VuZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICghZm91bmQpIHtcbiAgICAgICAgICBvdXRwdXRPYmpba2V5XSA9IGV4cG9ydHMuc2VyaWFsaXplKG9ialtrZXldLCBpZ25vcmVOYXRpdmVGdW5jLCBvdXRwdXRPYmpba2V5XSwgY2FjaGUsIHBhdGggKyBLRVlQQVRIU0VQQVJBVE9SICsga2V5KTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmKHR5cGVvZiBvYmpba2V5XSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB2YXIgZnVuY1N0ciA9IG9ialtrZXldLnRvU3RyaW5nKCk7XG4gICAgICAgIGlmKElTTkFUSVZFRlVOQy50ZXN0KGZ1bmNTdHIpKSB7XG4gICAgICAgICAgaWYoaWdub3JlTmF0aXZlRnVuYykge1xuICAgICAgICAgICAgZnVuY1N0ciA9ICdmdW5jdGlvbigpIHt0aHJvdyBuZXcgRXJyb3IoXCJDYWxsIGEgbmF0aXZlIGZ1bmN0aW9uIHVuc2VyaWFsaXplZFwiKX0nO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NhblxcJ3Qgc2VyaWFsaXplIGEgb2JqZWN0IHdpdGggYSBuYXRpdmUgZnVuY3Rpb24gcHJvcGVydHkuIFVzZSBzZXJpYWxpemUob2JqLCB0cnVlKSB0byBpZ25vcmUgdGhlIGVycm9yLicpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBvdXRwdXRPYmpba2V5XSA9IEZVTkNGTEFHICsgZnVuY1N0cjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG91dHB1dE9ialtrZXldID0gb2JqW2tleV07XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIChwYXRoID09PSAnJCcpID8gSlNPTi5zdHJpbmdpZnkob3V0cHV0T2JqKSA6IG91dHB1dE9iajtcbn07XG5cbmV4cG9ydHMudW5zZXJpYWxpemUgPSBmdW5jdGlvbihvYmosIG9yaWdpbk9iaikge1xuICB2YXIgaXNJbmRleDtcbiAgaWYgKHR5cGVvZiBvYmogPT09ICdzdHJpbmcnKSB7XG4gICAgb2JqID0gSlNPTi5wYXJzZShvYmopO1xuICAgIGlzSW5kZXggPSB0cnVlO1xuICB9XG4gIG9yaWdpbk9iaiA9IG9yaWdpbk9iaiB8fCBvYmo7XG5cbiAgdmFyIGNpcmN1bGFyVGFza3MgPSBbXTtcbiAgdmFyIGtleTtcbiAgZm9yKGtleSBpbiBvYmopIHtcbiAgICBpZihvYmouaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgaWYodHlwZW9mIG9ialtrZXldID09PSAnb2JqZWN0Jykge1xuICAgICAgICBvYmpba2V5XSA9IGV4cG9ydHMudW5zZXJpYWxpemUob2JqW2tleV0sIG9yaWdpbk9iaik7XG4gICAgICB9IGVsc2UgaWYodHlwZW9mIG9ialtrZXldID09PSAnc3RyaW5nJykge1xuICAgICAgICBpZihvYmpba2V5XS5pbmRleE9mKEZVTkNGTEFHKSA9PT0gMCkge1xuICAgICAgICAgIG9ialtrZXldID0gZXZhbCgnKCcgKyBvYmpba2V5XS5zdWJzdHJpbmcoRlVOQ0ZMQUcubGVuZ3RoKSArICcpJyk7XG4gICAgICAgIH0gZWxzZSBpZihvYmpba2V5XS5pbmRleE9mKENJUkNVTEFSRkxBRykgPT09IDApIHtcbiAgICAgICAgICBvYmpba2V5XSA9IG9ialtrZXldLnN1YnN0cmluZyhDSVJDVUxBUkZMQUcubGVuZ3RoKTtcbiAgICAgICAgICBjaXJjdWxhclRhc2tzLnB1c2goe29iajogb2JqLCBrZXk6IGtleX0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaWYgKGlzSW5kZXgpIHtcbiAgICBjaXJjdWxhclRhc2tzLmZvckVhY2goZnVuY3Rpb24odGFzaykge1xuICAgICAgdGFzay5vYmpbdGFzay5rZXldID0gZ2V0S2V5UGF0aChvcmlnaW5PYmosIHRhc2sub2JqW3Rhc2sua2V5XSk7XG4gICAgfSk7XG4gIH1cbiAgcmV0dXJuIG9iajtcbn07XG5cbiIsImltcG9ydCBzZXJpYWxpemUgZnJvbSAnbm9kZS1zZXJpYWxpemUnXG5cbi8vIGZpZ21hLnNob3dVSShfX2h0bWxfXyk7XG5cbi8qXG5cbkFjY2Vzc2luZyBkb2N1bWVudFxuXHRyb290IGRvY3VtZW50IG9iamVjdDpcblx0XHRmaWdtYS5yb290XG5cdHBhZ2VzOlxuXHRcdGZpZ21hLnJvb3QuY2hpbGRyZW5bMF1cblx0Y3VycmVudCBwYWdlOlxuXHRcdGZpZ21hLmN1cnJlbnRQYWdlXG5cblBhZ2Ugbm9kZSBwcm9wczpcblx0bmFtZVxuXHRjaGlsZHJlblxuXG5hcGkgbWV0aG9kcyB0byBjcmVhdGUgc3R1ZmZcblx0aHR0cHM6Ly93d3cuZmlnbWEuY29tL3BsdWdpbi1kb2NzL2FwaS9wcm9wZXJ0aWVzL2ZpZ21hLWNyZWF0ZXJlY3RhbmdsZVxuXHRodHRwczovL3d3dy5maWdtYS5jb20vcGx1Z2luLWRvY3MvYXBpL3Byb3BlcnRpZXMvZmlnbWEtY3JlYXRlZWxsaXBzZVxuXHRodHRwczovL3d3dy5maWdtYS5jb20vcGx1Z2luLWRvY3MvYXBpL3Byb3BlcnRpZXMvZmlnbWEtY3JlYXRldGV4dFxuXHRodHRwczovL3d3dy5maWdtYS5jb20vcGx1Z2luLWRvY3MvYXBpL3Byb3BlcnRpZXMvZmlnbWEtY3JlYXRlZnJhbWVcblx0aHR0cHM6Ly93d3cuZmlnbWEuY29tL3BsdWdpbi1kb2NzL2FwaS9wcm9wZXJ0aWVzL2ZpZ21hLWNyZWF0ZXBhZ2VcblxuXG4qL1xuXG4vLyBjb25zb2xlLmxvZygnLS0+IGZpZ21hLnJvb3QnLCBmaWdtYS5yb290KVxuLy8gY29uc29sZS5sb2coJy0tPiBmaWdtYS5jdXJyZW50UGFnZScsIGZpZ21hLmN1cnJlbnRQYWdlKVxuXG4vLyBjb25zb2xlLmxvZygnLS0+IGZpZ21hLmdldExvY2FsVGV4dFN0eWxlcygpJywgZmlnbWEuZ2V0TG9jYWxUZXh0U3R5bGVzKCkpXG4vLyBjb25zb2xlLmxvZygnLS0+IGZpZ21hLmdldExvY2FsUGFpbnRTdHlsZXMoKScsIGZpZ21hLmdldExvY2FsUGFpbnRTdHlsZXMoKSlcbi8vIGNvbnNvbGUubG9nKCctLT4gZmlnbWEuZ2V0TG9jYWxFZmZlY3RTdHlsZXMoKScsIGZpZ21hLmdldExvY2FsRWZmZWN0U3R5bGVzKCkpXG4vLyBjb25zb2xlLmxvZygnLS0+IGZpZ21hLmdldExvY2FsR3JpZFN0eWxlcygpJywgZmlnbWEuZ2V0TG9jYWxHcmlkU3R5bGVzKCkpXG5cblxuLy8gLS0tLS0gV0FMSyBUSEUgTk9ERVMgQU5EIFNFQVJDSCAtLS0tLS0tLS1cblxuLy8gY29uc3QgYWxsTm9kZXMgPSBbXVxuLy8gY29uc3QgdGV4dFN0eWxlcyA9IFtdXG5cbi8vIGZ1bmN0aW9uIHdhbGtUcmVlKG5vZGUpIHtcbi8vIFx0YWxsTm9kZXMucHVzaChub2RlKVxuLy8gXHRpZiAobm9kZS5jaGlsZHJlbikgbm9kZS5jaGlsZHJlbi5mb3JFYWNoKHdhbGtUcmVlKVxuLy8gfVxuXG4vLyB3YWxrVHJlZShmaWdtYS5jdXJyZW50UGFnZSlcblxuLy8gLy8gY29uc29sZS5sb2coYWxsTm9kZXMpXG5cbi8vIGFsbE5vZGVzLmZvckVhY2goKG5vZGUpID0+IHtcbi8vIFx0aWYgKG5vZGUudHlwZSA9PT0gJ1RFWFQnKSB7XG4vLyBcdFx0Y29uc29sZS5sb2cobm9kZSlcbi8vIFx0fVxuLy8gfSlcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4vLyBmaWdtYS51aS5vbm1lc3NhZ2UgPSBtc2cgPT4ge1xuLy8gXHRpZiAobXNnLnR5cGUgPT09ICdjcmVhdGUtcmVjdGFuZ2xlcycpIHtcbi8vIFx0XHRjb25zdCBub2RlczogU2NlbmVOb2RlW10gPSBbXTtcbi8vIFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IG1zZy5jb3VudDsgaSsrKSB7XG4vLyBcdFx0XHRjb25zdCByZWN0ID0gZmlnbWEuY3JlYXRlUmVjdGFuZ2xlKCk7XG4vLyBcdFx0XHRyZWN0LnggPSBpICogMTUwO1xuLy8gXHRcdFx0cmVjdC5maWxscyA9IFt7dHlwZTogJ1NPTElEJywgY29sb3I6IHtyOiAxLCBnOiAwLjUsIGI6IDB9fV07XG4vLyBcdFx0XHRmaWdtYS5jdXJyZW50UGFnZS5hcHBlbmRDaGlsZChyZWN0KTtcbi8vIFx0XHRcdG5vZGVzLnB1c2gocmVjdCk7XG4vLyBcdFx0fVxuLy8gXHRcdGZpZ21hLmN1cnJlbnRQYWdlLnNlbGVjdGlvbiA9IG5vZGVzO1xuLy8gXHRcdGZpZ21hLnZpZXdwb3J0LnNjcm9sbEFuZFpvb21JbnRvVmlldyhub2Rlcyk7XG4vLyBcdH1cblxuLy8gXHRmaWdtYS5jbG9zZVBsdWdpbigpO1xuLy8gfTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS1cblxuXG5sZXQgc3R5bGVHdWlkZVBhZ2UgPSBmaWdtYS5yb290LmZpbmRPbmUoKG4pID0+IHsgcmV0dXJuIChuLnR5cGUgPT09ICdQQUdFJyAmJiBuLm5hbWUgPT09IFwiU3R5bGUgR3VpZGVcIikgfSlcbmNvbnNvbGUubG9nKCctLT4gc3R5bGVHdWlkZVBhZ2UnLCBzdHlsZUd1aWRlUGFnZSlcbmNvbnNvbGUubG9nKCctLT4gdHlwZW9mIHN0eWxlR3VpZGVQYWdlJywgdHlwZW9mIHN0eWxlR3VpZGVQYWdlKVxuXG5pZiAoIXN0eWxlR3VpZGVQYWdlKSB7XG5cdHN0eWxlR3VpZGVQYWdlID0gZmlnbWEuY3JlYXRlUGFnZSgpXG5cdHN0eWxlR3VpZGVQYWdlLm5hbWUgPSAnU3R5bGUgR3VpZGUnXG59XG5cbmZpZ21hLmN1cnJlbnRQYWdlID0gc3R5bGVHdWlkZVBhZ2UgLy8gc3dpdGNoIHRvIHRoZSBuZXcgcGFnZVxuXG5sZXQgdEZyYW1lID0gc3R5bGVHdWlkZVBhZ2UuZmluZENoaWxkKChuKSA9PiB7IHJldHVybiAobi50eXBlID09PSAnRlJBTUUnICYmIG4ubmFtZSA9PT0gXCJUZW1wbGF0ZSAtIFRleHQgU3R5bGVzXCIpIH0pXG5jb25zb2xlLmxvZygnLS0+IHRGcmFtZScsIHRGcmFtZSlcbi8vIGNvbnNvbGUubG9nKCctLT4gdEZyYW1lIEpTT04nLCBzZXJpYWxpemUodEZyYW1lKSlcblxuLy8gaWYgKCF0RnJhbWUpIHtcbi8vIFx0Y29uc3QgdEZyYW1lID0gZmlnbWEuY3JlYXRlRnJhbWUoKVxuLy8gXHR0RnJhbWUubmFtZSA9ICdUZXh0IFN0eWxlcydcbi8vIH1cblxuLy8gZmlnbWEudmlld3BvcnQuc2Nyb2xsQW5kWm9vbUludG9WaWV3KFt0RnJhbWVdKVxuXG4vLyBjb25zdCB0ZXh0U3R5bGVzID0gZmlnbWEuZ2V0TG9jYWxUZXh0U3R5bGVzKClcblxuLy8gbGV0IHRleHRCbG9ja3NOZXh0WSA9IDQwXG4vLyB0ZXh0U3R5bGVzLmZvckVhY2goYXN5bmMgKHRleHRTdHlsZSkgPT4ge1xuLy8gXHRjb25zb2xlLmxvZygnLS0tLS0tLS0tLS0tLS0tLS0tLS0tJylcbi8vIFx0Ly8gY29uc29sZS5sb2codGV4dE5vZGUpXG4vLyBcdGNvbnNvbGUubG9nKCduYW1lJywgdGV4dFN0eWxlLm5hbWUpXG4vLyBcdGNvbnNvbGUubG9nKCdmb250TmFtZS5mYW1pbHknLCB0ZXh0U3R5bGUuZm9udE5hbWUuZmFtaWx5KVxuLy8gXHRjb25zb2xlLmxvZygnZm9udE5hbWUuc3R5bGUnLCB0ZXh0U3R5bGUuZm9udE5hbWUuc3R5bGUpXG4vLyBcdC8vIGNvbnNvbGUubG9nKCdmb250U2l6ZScsIHRleHRTdHlsZS5mb250U2l6ZSlcbi8vIFx0Ly8gY29uc29sZS5sb2coJ2xldHRlclNwYWNpbmcudW5pdCcsIHRleHRTdHlsZS5sZXR0ZXJTcGFjaW5nLnVuaXQpXG4vLyBcdC8vIGNvbnNvbGUubG9nKCdsZXR0ZXJTcGFjaW5nLnZhbHVlJywgdGV4dFN0eWxlLmxldHRlclNwYWNpbmcudmFsdWUpXG4vLyBcdC8vIGNvbnNvbGUubG9nKCdsaW5lSGVpZ2h0LnVuaXQnLCB0ZXh0U3R5bGUubGluZUhlaWdodC51bml0KVxuLy8gXHQvLyBjb25zb2xlLmxvZygnbGluZUhlaWdodC52YWx1ZScsIHRleHRTdHlsZS5saW5lSGVpZ2h0LnZhbHVlKVxuLy8gXHQvLyBjb25zb2xlLmxvZygncGFyYWdyYXBoSW5kZW50JywgdGV4dFN0eWxlLnBhcmFncmFwaEluZGVudClcbi8vIFx0Ly8gY29uc29sZS5sb2coJ3BhcmFncmFwaFNwYWNpbmcnLCB0ZXh0U3R5bGUucGFyYWdyYXBoU3BhY2luZylcbi8vIFx0Ly8gY29uc29sZS5sb2coJ3RleHRDYXNlJywgdGV4dFN0eWxlLnRleHRDYXNlKVxuLy8gXHQvLyBjb25zb2xlLmxvZygndGV4dERlY29yYXRpb24nLCB0ZXh0U3R5bGUudGV4dERlY29yYXRpb24pXG5cdFxuLy8gXHRhd2FpdCBmaWdtYS5sb2FkRm9udEFzeW5jKHtcbi8vIFx0XHRmYW1pbHk6IHRleHRTdHlsZS5mb250TmFtZS5mYW1pbHksXG4vLyBcdFx0c3R5bGU6IHRleHRTdHlsZS5mb250TmFtZS5zdHlsZVxuLy8gXHR9KVxuXG4vLyBcdGNvbnN0IG5ld1RleHRTdHlsZVByZXZpZXcgPSBmaWdtYS5jcmVhdGVUZXh0KClcbi8vIFx0dEZyYW1lLmFwcGVuZENoaWxkKG5ld1RleHRTdHlsZVByZXZpZXcpXG4vLyBcdG5ld1RleHRTdHlsZVByZXZpZXcudGV4dFN0eWxlSWQgPSB0ZXh0U3R5bGUuaWRcbi8vIFx0bmV3VGV4dFN0eWxlUHJldmlldy5jaGFyYWN0ZXJzID0gdGV4dFN0eWxlLm5hbWVcbi8vIFx0bmV3VGV4dFN0eWxlUHJldmlldy54ID0gNDBcbi8vIFx0bmV3VGV4dFN0eWxlUHJldmlldy55ID0gdGV4dEJsb2Nrc05leHRZXG5cbi8vIFx0dGV4dEJsb2Nrc05leHRZICs9IG5ld1RleHRTdHlsZVByZXZpZXcuaGVpZ2h0ICsgMTAwXG5cbi8vIFx0dEZyYW1lLnJlc2l6ZSg4MDAsIHRleHRCbG9ja3NOZXh0WSlcbi8vIH0pXG5cbi8vIGNvbnN0IHBhaW50U3R5bGVzID0gZmlnbWEuZ2V0TG9jYWxQYWludFN0eWxlcygpXG5cbi8vIHBhaW50U3R5bGVzLmZvckVhY2goKHBhaW50U3R5bGUpID0+IHtcbi8vIFx0Y29uc29sZS5sb2coJy0tLS0tLS0tLS0tLS0tLS0tLS0tLScpXG4vLyBcdC8vIGNvbnNvbGUubG9nKHBhaW50Tm9kZSlcbi8vIFx0Y29uc29sZS5sb2coJ25hbWUnLCBwYWludFN0eWxlLm5hbWUpXG4vLyBcdC8vIHBhaW50Tm9kZS5wYWludHMgKEFycmF5IC0gQ2FuIGJlIG11bHRpcGxlKVxuLy8gXHRjb25zb2xlLmxvZygndHlwZScsIHBhaW50U3R5bGUucGFpbnRzWzBdLnR5cGUpIC8vIFNPTElEXG4vLyBcdGNvbnNvbGUubG9nKCdibGVuZE1vZGUnLCBwYWludFN0eWxlLnBhaW50c1swXS5ibGVuZE1vZGUpIC8vIE5PUk1BTFxuLy8gXHRjb25zb2xlLmxvZygndmlzaWJsZScsIHBhaW50U3R5bGUucGFpbnRzWzBdLnZpc2libGUpXG4vLyBcdGNvbnNvbGUubG9nKCdyJywgcGFpbnRTdHlsZS5wYWludHNbMF0uY29sb3Iucilcbi8vIFx0Y29uc29sZS5sb2coJ2cnLCBwYWludFN0eWxlLnBhaW50c1swXS5jb2xvci5nKVxuLy8gXHRjb25zb2xlLmxvZygnYicsIHBhaW50U3R5bGUucGFpbnRzWzBdLmNvbG9yLmIpXG4vLyBcdGNvbnNvbGUubG9nKCdvcGFjaXR5JywgcGFpbnRTdHlsZS5wYWludHNbMF0ub3BhY2l0eSlcbi8vIFx0Ly8gbmVlZCB0byBzZWUgdGhlIHR5cGVzIGZvciB0aGUgZ3JhZGllbnQgYW5kIG90aGVyIHR5cGVzIGxpa2UgYmFja2dyb3VuZCBpbWFnZVxuLy8gfSlcblxuLy8gZmlnbWEuY2xvc2VQbHVnaW4oKVxuIl0sInNvdXJjZVJvb3QiOiIifQ==