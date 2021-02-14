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

/***/ "./src/code.js":
/*!*********************!*\
  !*** ./src/code.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

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
var pageMaxX = function pageMaxX() {
  var maxX = 0;

  if (figma.currentPage.children) {
    figma.currentPage.children.forEach(function (node) {
      if (node.x + node.width > maxX) {
        maxX = node.x + node.width;
      }
    });
  }

  return maxX;
};

var createTextStylesTemplateFrame = function createTextStylesTemplateFrame() {
  var tFrame = figma.createFrame();
  tFrame.name = 'Template - Text Styles'; // ...
  // TODO: Create whole template format via code here...
};

var setTextStylePropertyValue = function setTextStylePropertyValue(propsNode, name, value, isDefault) {
  var propGroupNode = propsNode.findOne(function (n) {
    return n.name === name;
  });

  if (propGroupNode) {
    var shouldRemoveNode = true;
    var propValueNode = propGroupNode.findChild(function (n) {
      return n.name === 'Value';
    });

    if (propValueNode && isDefault !== true) {
      propValueNode.characters = '' + value;
      shouldRemoveNode = false;
    }

    if (shouldRemoveNode) {
      propGroupNode.remove();
    }
  }
};

var generateTextStylesFrame = function generateTextStylesFrame(templateTextStylesFrame) {
  var textStylesRenderedFrameName = 'Text Styles';
  var textStylesRenderedFrameX = 0;
  var existingTextStylesRenderedFrame = figma.currentPage.findOne(function (n) {
    return n.type === 'FRAME' && n.name === textStylesRenderedFrameName;
  });

  if (existingTextStylesRenderedFrame) {
    // replace existing canvas
    textStylesRenderedFrameX = existingTextStylesRenderedFrame.x;
    existingTextStylesRenderedFrame.remove();
  } else {
    // new frame in the canvas
    textStylesRenderedFrameX = pageMaxX() + 100;
  }

  var generatedTFrame = templateTextStylesFrame.clone();
  generatedTFrame.name = textStylesRenderedFrameName;
  generatedTFrame.x = textStylesRenderedFrameX;
  var textStyleBlock = generatedTFrame.findOne(function (n) {
    return n.type === 'GROUP' && n.name === 'Text Style';
  }); // console.log('--> textStyleBlock', textStyleBlock)

  var textStyles = figma.getLocalTextStyles(); // let textStyle

  var tsPromises = [];

  var _loop = function _loop(i) {
    var textStyle = textStyles[i]; // console.log('---------------------')
    // console.log(textStyle)

    tsPromises.push(new Promise(function (resolve, reject) {
      figma.loadFontAsync({
        family: textStyle.fontName.family,
        style: textStyle.fontName.style
      }).then(function () {
        var newStyle = textStyleBlock.clone();
        var previewTextNode = newStyle.findChild(function (n) {
          return n.name === 'Preview';
        });
        previewTextNode.textStyleId = textStyle.id;
        previewTextNode.characters = textStyle.name;
        var propertiesGroup = newStyle.findChild(function (n) {
          return n.name === 'Properties';
        });

        if (propertiesGroup) {
          setTextStylePropertyValue(propertiesGroup, 'Font Family', textStyle.fontName.family);
          setTextStylePropertyValue(propertiesGroup, 'Font Style', textStyle.fontName.style);
          setTextStylePropertyValue(propertiesGroup, 'Font Size', textStyle.fontSize);
          setTextStylePropertyValue(propertiesGroup, 'Letter Spacing', textStyle.letterSpacing.value + ' ' + textStyle.letterSpacing.unit, textStyle.letterSpacing.value === 0);
          setTextStylePropertyValue(propertiesGroup, 'Line Height', textStyle.lineHeight.value + ' ' + textStyle.lineHeight.unit, typeof textStyle.lineHeight.value === 'undefined' || textStyle.lineHeight.value === 0);
          setTextStylePropertyValue(propertiesGroup, 'Paragraph Indent', textStyle.paragraphIndent, textStyle.paragraphIndent === 0);
          setTextStylePropertyValue(propertiesGroup, 'Paragraph Spacing', textStyle.paragraphSpacing, textStyle.paragraphSpacing === 0);
          setTextStylePropertyValue(propertiesGroup, 'Text Case', textStyle.textCase, textStyle.textCase === 'ORIGINAL');
          setTextStylePropertyValue(propertiesGroup, 'Text Decoration', textStyle.textDecoration, textStyle.textDecoration === 'NONE');
        }

        generatedTFrame.appendChild(newStyle);
        resolve();
      })["catch"](function (e) {
        return reject(e);
      });
    }));
  };

  for (var i = 0; i < textStyles.length; i += 1) {
    _loop(i);
  }

  Promise.all(tsPromises).then(function () {
    // console.log('All done!')
    textStyleBlock.remove();
    figma.viewport.scrollAndZoomIntoView([generatedTFrame]);
    figma.closePlugin();
  });
};

var styleGuidePage = figma.root.findOne(function (n) {
  return n.type === 'PAGE' && n.name === 'Style Guide';
}); // console.log('--> styleGuidePage', styleGuidePage)

if (!styleGuidePage) {
  styleGuidePage = figma.createPage();
  styleGuidePage.name = 'Style Guide';
}

figma.currentPage = styleGuidePage; // switch to the new page

var templateTextStylesFrame = styleGuidePage.findChild(function (n) {
  return n.type === 'FRAME' && n.name === 'Template - Text Styles';
}); // console.log('--> tFrame', tFrame)

if (!templateTextStylesFrame) createTextStylesTemplateFrame();
figma.loadFontAsync({
  // load font for the labels we will be updating
  family: 'Helvetica',
  style: 'Regular'
}).then(function () {
  generateTextStylesFrame(templateTextStylesFrame);
}); // const paintStyles = figma.getLocalPaintStyles()
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvZGUuanMiXSwibmFtZXMiOlsicGFnZU1heFgiLCJtYXhYIiwiZmlnbWEiLCJjdXJyZW50UGFnZSIsImNoaWxkcmVuIiwiZm9yRWFjaCIsIm5vZGUiLCJ4Iiwid2lkdGgiLCJjcmVhdGVUZXh0U3R5bGVzVGVtcGxhdGVGcmFtZSIsInRGcmFtZSIsImNyZWF0ZUZyYW1lIiwibmFtZSIsInNldFRleHRTdHlsZVByb3BlcnR5VmFsdWUiLCJwcm9wc05vZGUiLCJ2YWx1ZSIsImlzRGVmYXVsdCIsInByb3BHcm91cE5vZGUiLCJmaW5kT25lIiwibiIsInNob3VsZFJlbW92ZU5vZGUiLCJwcm9wVmFsdWVOb2RlIiwiZmluZENoaWxkIiwiY2hhcmFjdGVycyIsInJlbW92ZSIsImdlbmVyYXRlVGV4dFN0eWxlc0ZyYW1lIiwidGVtcGxhdGVUZXh0U3R5bGVzRnJhbWUiLCJ0ZXh0U3R5bGVzUmVuZGVyZWRGcmFtZU5hbWUiLCJ0ZXh0U3R5bGVzUmVuZGVyZWRGcmFtZVgiLCJleGlzdGluZ1RleHRTdHlsZXNSZW5kZXJlZEZyYW1lIiwidHlwZSIsImdlbmVyYXRlZFRGcmFtZSIsImNsb25lIiwidGV4dFN0eWxlQmxvY2siLCJ0ZXh0U3R5bGVzIiwiZ2V0TG9jYWxUZXh0U3R5bGVzIiwidHNQcm9taXNlcyIsImkiLCJ0ZXh0U3R5bGUiLCJwdXNoIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJsb2FkRm9udEFzeW5jIiwiZmFtaWx5IiwiZm9udE5hbWUiLCJzdHlsZSIsInRoZW4iLCJuZXdTdHlsZSIsInByZXZpZXdUZXh0Tm9kZSIsInRleHRTdHlsZUlkIiwiaWQiLCJwcm9wZXJ0aWVzR3JvdXAiLCJmb250U2l6ZSIsImxldHRlclNwYWNpbmciLCJ1bml0IiwibGluZUhlaWdodCIsInBhcmFncmFwaEluZGVudCIsInBhcmFncmFwaFNwYWNpbmciLCJ0ZXh0Q2FzZSIsInRleHREZWNvcmF0aW9uIiwiYXBwZW5kQ2hpbGQiLCJlIiwibGVuZ3RoIiwiYWxsIiwidmlld3BvcnQiLCJzY3JvbGxBbmRab29tSW50b1ZpZXciLCJjbG9zZVBsdWdpbiIsInN0eWxlR3VpZGVQYWdlIiwicm9vdCIsImNyZWF0ZVBhZ2UiXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7OztBQ2pGQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF3QkE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFHQSxJQUFNQSxRQUFRLEdBQUcsU0FBWEEsUUFBVyxHQUFNO0FBQ3RCLE1BQUlDLElBQUksR0FBRyxDQUFYOztBQUNBLE1BQUlDLEtBQUssQ0FBQ0MsV0FBTixDQUFrQkMsUUFBdEIsRUFBZ0M7QUFDL0JGLFNBQUssQ0FBQ0MsV0FBTixDQUFrQkMsUUFBbEIsQ0FBMkJDLE9BQTNCLENBQW1DLFVBQUNDLElBQUQsRUFBVTtBQUM1QyxVQUFLQSxJQUFJLENBQUNDLENBQUwsR0FBU0QsSUFBSSxDQUFDRSxLQUFmLEdBQXdCUCxJQUE1QixFQUFrQztBQUNqQ0EsWUFBSSxHQUFJSyxJQUFJLENBQUNDLENBQUwsR0FBU0QsSUFBSSxDQUFDRSxLQUF0QjtBQUNBO0FBQ0QsS0FKRDtBQUtBOztBQUNELFNBQU9QLElBQVA7QUFDQSxDQVZEOztBQVlBLElBQU1RLDZCQUE2QixHQUFHLFNBQWhDQSw2QkFBZ0MsR0FBTTtBQUMzQyxNQUFNQyxNQUFNLEdBQUdSLEtBQUssQ0FBQ1MsV0FBTixFQUFmO0FBQ0FELFFBQU0sQ0FBQ0UsSUFBUCxHQUFjLHdCQUFkLENBRjJDLENBRzNDO0FBQ0E7QUFDQSxDQUxEOztBQU9BLElBQU1DLHlCQUF5QixHQUFHLFNBQTVCQSx5QkFBNEIsQ0FBQ0MsU0FBRCxFQUFZRixJQUFaLEVBQWtCRyxLQUFsQixFQUF5QkMsU0FBekIsRUFBdUM7QUFDeEUsTUFBTUMsYUFBYSxHQUFHSCxTQUFTLENBQUNJLE9BQVYsQ0FBa0IsVUFBQ0MsQ0FBRDtBQUFBLFdBQU9BLENBQUMsQ0FBQ1AsSUFBRixLQUFXQSxJQUFsQjtBQUFBLEdBQWxCLENBQXRCOztBQUNBLE1BQUlLLGFBQUosRUFBbUI7QUFDbEIsUUFBSUcsZ0JBQWdCLEdBQUcsSUFBdkI7QUFDQSxRQUFNQyxhQUFhLEdBQUdKLGFBQWEsQ0FBQ0ssU0FBZCxDQUF3QixVQUFDSCxDQUFEO0FBQUEsYUFBT0EsQ0FBQyxDQUFDUCxJQUFGLEtBQVcsT0FBbEI7QUFBQSxLQUF4QixDQUF0Qjs7QUFDQSxRQUFJUyxhQUFhLElBQUlMLFNBQVMsS0FBSyxJQUFuQyxFQUF5QztBQUN4Q0ssbUJBQWEsQ0FBQ0UsVUFBZCxHQUEyQixLQUFLUixLQUFoQztBQUNBSyxzQkFBZ0IsR0FBRyxLQUFuQjtBQUNBOztBQUNELFFBQUlBLGdCQUFKLEVBQXNCO0FBQ3JCSCxtQkFBYSxDQUFDTyxNQUFkO0FBQ0E7QUFDRDtBQUNELENBYkQ7O0FBZUEsSUFBTUMsdUJBQXVCLEdBQUcsU0FBMUJBLHVCQUEwQixDQUFDQyx1QkFBRCxFQUE2QjtBQUM1RCxNQUFNQywyQkFBMkIsR0FBRyxhQUFwQztBQUNBLE1BQUlDLHdCQUF3QixHQUFHLENBQS9CO0FBRUEsTUFBTUMsK0JBQStCLEdBQUczQixLQUFLLENBQUNDLFdBQU4sQ0FBa0JlLE9BQWxCLENBQTBCLFVBQUNDLENBQUQsRUFBTztBQUFFLFdBQVFBLENBQUMsQ0FBQ1csSUFBRixLQUFXLE9BQVgsSUFBc0JYLENBQUMsQ0FBQ1AsSUFBRixLQUFXZSwyQkFBekM7QUFBdUUsR0FBMUcsQ0FBeEM7O0FBQ0EsTUFBSUUsK0JBQUosRUFBcUM7QUFBRTtBQUN0Q0QsNEJBQXdCLEdBQUdDLCtCQUErQixDQUFDdEIsQ0FBM0Q7QUFDQXNCLG1DQUErQixDQUFDTCxNQUFoQztBQUNBLEdBSEQsTUFJSztBQUFFO0FBQ05JLDRCQUF3QixHQUFHNUIsUUFBUSxLQUFLLEdBQXhDO0FBQ0E7O0FBRUQsTUFBTStCLGVBQWUsR0FBR0wsdUJBQXVCLENBQUNNLEtBQXhCLEVBQXhCO0FBQ0FELGlCQUFlLENBQUNuQixJQUFoQixHQUF1QmUsMkJBQXZCO0FBQ0FJLGlCQUFlLENBQUN4QixDQUFoQixHQUFvQnFCLHdCQUFwQjtBQUVBLE1BQU1LLGNBQWMsR0FBR0YsZUFBZSxDQUFDYixPQUFoQixDQUF3QixVQUFDQyxDQUFELEVBQU87QUFBRSxXQUFRQSxDQUFDLENBQUNXLElBQUYsS0FBVyxPQUFYLElBQXNCWCxDQUFDLENBQUNQLElBQUYsS0FBVyxZQUF6QztBQUF3RCxHQUF6RixDQUF2QixDQWpCNEQsQ0FrQjVEOztBQUVBLE1BQU1zQixVQUFVLEdBQUdoQyxLQUFLLENBQUNpQyxrQkFBTixFQUFuQixDQXBCNEQsQ0FxQjVEOztBQUNBLE1BQU1DLFVBQVUsR0FBRyxFQUFuQjs7QUF0QjRELDZCQXVCcERDLENBdkJvRDtBQXdCM0QsUUFBTUMsU0FBUyxHQUFHSixVQUFVLENBQUNHLENBQUQsQ0FBNUIsQ0F4QjJELENBeUIzRDtBQUNBOztBQUVBRCxjQUFVLENBQUNHLElBQVgsQ0FBZ0IsSUFBSUMsT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFxQjtBQUNoRHhDLFdBQUssQ0FBQ3lDLGFBQU4sQ0FBb0I7QUFDbkJDLGNBQU0sRUFBRU4sU0FBUyxDQUFDTyxRQUFWLENBQW1CRCxNQURSO0FBRW5CRSxhQUFLLEVBQUVSLFNBQVMsQ0FBQ08sUUFBVixDQUFtQkM7QUFGUCxPQUFwQixFQUlFQyxJQUpGLENBSU8sWUFBTTtBQUNYLFlBQU1DLFFBQVEsR0FBR2YsY0FBYyxDQUFDRCxLQUFmLEVBQWpCO0FBRUEsWUFBTWlCLGVBQWUsR0FBR0QsUUFBUSxDQUFDMUIsU0FBVCxDQUFtQixVQUFDSCxDQUFEO0FBQUEsaUJBQU9BLENBQUMsQ0FBQ1AsSUFBRixLQUFXLFNBQWxCO0FBQUEsU0FBbkIsQ0FBeEI7QUFDQXFDLHVCQUFlLENBQUNDLFdBQWhCLEdBQThCWixTQUFTLENBQUNhLEVBQXhDO0FBQ0FGLHVCQUFlLENBQUMxQixVQUFoQixHQUE2QmUsU0FBUyxDQUFDMUIsSUFBdkM7QUFFQSxZQUFNd0MsZUFBZSxHQUFHSixRQUFRLENBQUMxQixTQUFULENBQW1CLFVBQUNILENBQUQ7QUFBQSxpQkFBT0EsQ0FBQyxDQUFDUCxJQUFGLEtBQVcsWUFBbEI7QUFBQSxTQUFuQixDQUF4Qjs7QUFDQSxZQUFJd0MsZUFBSixFQUFxQjtBQUNwQnZDLG1DQUF5QixDQUFDdUMsZUFBRCxFQUFrQixhQUFsQixFQUFpQ2QsU0FBUyxDQUFDTyxRQUFWLENBQW1CRCxNQUFwRCxDQUF6QjtBQUNBL0IsbUNBQXlCLENBQUN1QyxlQUFELEVBQWtCLFlBQWxCLEVBQWdDZCxTQUFTLENBQUNPLFFBQVYsQ0FBbUJDLEtBQW5ELENBQXpCO0FBQ0FqQyxtQ0FBeUIsQ0FBQ3VDLGVBQUQsRUFBa0IsV0FBbEIsRUFBK0JkLFNBQVMsQ0FBQ2UsUUFBekMsQ0FBekI7QUFDQXhDLG1DQUF5QixDQUFDdUMsZUFBRCxFQUFrQixnQkFBbEIsRUFBb0NkLFNBQVMsQ0FBQ2dCLGFBQVYsQ0FBd0J2QyxLQUF4QixHQUFnQyxHQUFoQyxHQUFzQ3VCLFNBQVMsQ0FBQ2dCLGFBQVYsQ0FBd0JDLElBQWxHLEVBQXdHakIsU0FBUyxDQUFDZ0IsYUFBVixDQUF3QnZDLEtBQXhCLEtBQWtDLENBQTFJLENBQXpCO0FBQ0FGLG1DQUF5QixDQUFDdUMsZUFBRCxFQUFrQixhQUFsQixFQUFpQ2QsU0FBUyxDQUFDa0IsVUFBVixDQUFxQnpDLEtBQXJCLEdBQTZCLEdBQTdCLEdBQW1DdUIsU0FBUyxDQUFDa0IsVUFBVixDQUFxQkQsSUFBekYsRUFBK0YsT0FBT2pCLFNBQVMsQ0FBQ2tCLFVBQVYsQ0FBcUJ6QyxLQUE1QixLQUFzQyxXQUF0QyxJQUFxRHVCLFNBQVMsQ0FBQ2tCLFVBQVYsQ0FBcUJ6QyxLQUFyQixLQUErQixDQUFuTCxDQUF6QjtBQUNBRixtQ0FBeUIsQ0FBQ3VDLGVBQUQsRUFBa0Isa0JBQWxCLEVBQXNDZCxTQUFTLENBQUNtQixlQUFoRCxFQUFpRW5CLFNBQVMsQ0FBQ21CLGVBQVYsS0FBOEIsQ0FBL0YsQ0FBekI7QUFDQTVDLG1DQUF5QixDQUFDdUMsZUFBRCxFQUFrQixtQkFBbEIsRUFBdUNkLFNBQVMsQ0FBQ29CLGdCQUFqRCxFQUFtRXBCLFNBQVMsQ0FBQ29CLGdCQUFWLEtBQStCLENBQWxHLENBQXpCO0FBQ0E3QyxtQ0FBeUIsQ0FBQ3VDLGVBQUQsRUFBa0IsV0FBbEIsRUFBK0JkLFNBQVMsQ0FBQ3FCLFFBQXpDLEVBQW1EckIsU0FBUyxDQUFDcUIsUUFBVixLQUF1QixVQUExRSxDQUF6QjtBQUNBOUMsbUNBQXlCLENBQUN1QyxlQUFELEVBQWtCLGlCQUFsQixFQUFxQ2QsU0FBUyxDQUFDc0IsY0FBL0MsRUFBK0R0QixTQUFTLENBQUNzQixjQUFWLEtBQTZCLE1BQTVGLENBQXpCO0FBQ0E7O0FBRUQ3Qix1QkFBZSxDQUFDOEIsV0FBaEIsQ0FBNEJiLFFBQTVCO0FBQ0FQLGVBQU87QUFDUCxPQTFCRixXQTJCUSxVQUFDcUIsQ0FBRDtBQUFBLGVBQU9wQixNQUFNLENBQUNvQixDQUFELENBQWI7QUFBQSxPQTNCUjtBQTRCQSxLQTdCZSxDQUFoQjtBQTVCMkQ7O0FBdUI1RCxPQUFJLElBQUl6QixDQUFDLEdBQUcsQ0FBWixFQUFlQSxDQUFDLEdBQUdILFVBQVUsQ0FBQzZCLE1BQTlCLEVBQXNDMUIsQ0FBQyxJQUFJLENBQTNDLEVBQThDO0FBQUEsVUFBdENBLENBQXNDO0FBbUM3Qzs7QUFFREcsU0FBTyxDQUFDd0IsR0FBUixDQUFZNUIsVUFBWixFQUNFVyxJQURGLENBQ08sWUFBTTtBQUNYO0FBQ0FkLGtCQUFjLENBQUNULE1BQWY7QUFDQXRCLFNBQUssQ0FBQytELFFBQU4sQ0FBZUMscUJBQWYsQ0FBcUMsQ0FBQ25DLGVBQUQsQ0FBckM7QUFDQTdCLFNBQUssQ0FBQ2lFLFdBQU47QUFDQSxHQU5GO0FBT0EsQ0FuRUQ7O0FBc0VBLElBQUlDLGNBQWMsR0FBR2xFLEtBQUssQ0FBQ21FLElBQU4sQ0FBV25ELE9BQVgsQ0FBbUIsVUFBQ0MsQ0FBRCxFQUFPO0FBQUUsU0FBUUEsQ0FBQyxDQUFDVyxJQUFGLEtBQVcsTUFBWCxJQUFxQlgsQ0FBQyxDQUFDUCxJQUFGLEtBQVcsYUFBeEM7QUFBd0QsQ0FBcEYsQ0FBckIsQyxDQUNBOztBQUVBLElBQUksQ0FBQ3dELGNBQUwsRUFBcUI7QUFDcEJBLGdCQUFjLEdBQUdsRSxLQUFLLENBQUNvRSxVQUFOLEVBQWpCO0FBQ0FGLGdCQUFjLENBQUN4RCxJQUFmLEdBQXNCLGFBQXRCO0FBQ0E7O0FBRURWLEtBQUssQ0FBQ0MsV0FBTixHQUFvQmlFLGNBQXBCLEMsQ0FBbUM7O0FBRW5DLElBQUkxQyx1QkFBdUIsR0FBRzBDLGNBQWMsQ0FBQzlDLFNBQWYsQ0FBeUIsVUFBQ0gsQ0FBRCxFQUFPO0FBQUUsU0FBUUEsQ0FBQyxDQUFDVyxJQUFGLEtBQVcsT0FBWCxJQUFzQlgsQ0FBQyxDQUFDUCxJQUFGLEtBQVcsd0JBQXpDO0FBQW9FLENBQXRHLENBQTlCLEMsQ0FDQTs7QUFDQSxJQUFJLENBQUNjLHVCQUFMLEVBQThCakIsNkJBQTZCO0FBRTNEUCxLQUFLLENBQUN5QyxhQUFOLENBQW9CO0FBQUU7QUFDckJDLFFBQU0sRUFBRSxXQURXO0FBRW5CRSxPQUFLLEVBQUU7QUFGWSxDQUFwQixFQUlFQyxJQUpGLENBSU8sWUFBTTtBQUNYdEIseUJBQXVCLENBQUNDLHVCQUFELENBQXZCO0FBQ0EsQ0FORixFLENBUUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUEsc0IiLCJmaWxlIjoiY29kZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2NvZGUuanNcIik7XG4iLCJcbi8vIGZpZ21hLnNob3dVSShfX2h0bWxfXyk7XG5cbi8qXG5cbkFjY2Vzc2luZyBkb2N1bWVudFxuXHRyb290IGRvY3VtZW50IG9iamVjdDpcblx0XHRmaWdtYS5yb290XG5cdHBhZ2VzOlxuXHRcdGZpZ21hLnJvb3QuY2hpbGRyZW5bMF1cblx0Y3VycmVudCBwYWdlOlxuXHRcdGZpZ21hLmN1cnJlbnRQYWdlXG5cblBhZ2Ugbm9kZSBwcm9wczpcblx0bmFtZVxuXHRjaGlsZHJlblxuXG5hcGkgbWV0aG9kcyB0byBjcmVhdGUgc3R1ZmZcblx0aHR0cHM6Ly93d3cuZmlnbWEuY29tL3BsdWdpbi1kb2NzL2FwaS9wcm9wZXJ0aWVzL2ZpZ21hLWNyZWF0ZXJlY3RhbmdsZVxuXHRodHRwczovL3d3dy5maWdtYS5jb20vcGx1Z2luLWRvY3MvYXBpL3Byb3BlcnRpZXMvZmlnbWEtY3JlYXRlZWxsaXBzZVxuXHRodHRwczovL3d3dy5maWdtYS5jb20vcGx1Z2luLWRvY3MvYXBpL3Byb3BlcnRpZXMvZmlnbWEtY3JlYXRldGV4dFxuXHRodHRwczovL3d3dy5maWdtYS5jb20vcGx1Z2luLWRvY3MvYXBpL3Byb3BlcnRpZXMvZmlnbWEtY3JlYXRlZnJhbWVcblx0aHR0cHM6Ly93d3cuZmlnbWEuY29tL3BsdWdpbi1kb2NzL2FwaS9wcm9wZXJ0aWVzL2ZpZ21hLWNyZWF0ZXBhZ2VcblxuXG4qL1xuXG4vLyBjb25zb2xlLmxvZygnLS0+IGZpZ21hLnJvb3QnLCBmaWdtYS5yb290KVxuLy8gY29uc29sZS5sb2coJy0tPiBmaWdtYS5jdXJyZW50UGFnZScsIGZpZ21hLmN1cnJlbnRQYWdlKVxuXG4vLyBjb25zb2xlLmxvZygnLS0+IGZpZ21hLmdldExvY2FsVGV4dFN0eWxlcygpJywgZmlnbWEuZ2V0TG9jYWxUZXh0U3R5bGVzKCkpXG4vLyBjb25zb2xlLmxvZygnLS0+IGZpZ21hLmdldExvY2FsUGFpbnRTdHlsZXMoKScsIGZpZ21hLmdldExvY2FsUGFpbnRTdHlsZXMoKSlcbi8vIGNvbnNvbGUubG9nKCctLT4gZmlnbWEuZ2V0TG9jYWxFZmZlY3RTdHlsZXMoKScsIGZpZ21hLmdldExvY2FsRWZmZWN0U3R5bGVzKCkpXG4vLyBjb25zb2xlLmxvZygnLS0+IGZpZ21hLmdldExvY2FsR3JpZFN0eWxlcygpJywgZmlnbWEuZ2V0TG9jYWxHcmlkU3R5bGVzKCkpXG5cblxuLy8gLS0tLS0gV0FMSyBUSEUgTk9ERVMgQU5EIFNFQVJDSCAtLS0tLS0tLS1cblxuLy8gY29uc3QgYWxsTm9kZXMgPSBbXVxuLy8gY29uc3QgdGV4dFN0eWxlcyA9IFtdXG5cbi8vIGZ1bmN0aW9uIHdhbGtUcmVlKG5vZGUpIHtcbi8vIFx0YWxsTm9kZXMucHVzaChub2RlKVxuLy8gXHRpZiAobm9kZS5jaGlsZHJlbikgbm9kZS5jaGlsZHJlbi5mb3JFYWNoKHdhbGtUcmVlKVxuLy8gfVxuXG4vLyB3YWxrVHJlZShmaWdtYS5jdXJyZW50UGFnZSlcblxuLy8gLy8gY29uc29sZS5sb2coYWxsTm9kZXMpXG5cbi8vIGFsbE5vZGVzLmZvckVhY2goKG5vZGUpID0+IHtcbi8vIFx0aWYgKG5vZGUudHlwZSA9PT0gJ1RFWFQnKSB7XG4vLyBcdFx0Y29uc29sZS5sb2cobm9kZSlcbi8vIFx0fVxuLy8gfSlcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4vLyBmaWdtYS51aS5vbm1lc3NhZ2UgPSBtc2cgPT4ge1xuLy8gXHRpZiAobXNnLnR5cGUgPT09ICdjcmVhdGUtcmVjdGFuZ2xlcycpIHtcbi8vIFx0XHRjb25zdCBub2RlczogU2NlbmVOb2RlW10gPSBbXTtcbi8vIFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IG1zZy5jb3VudDsgaSsrKSB7XG4vLyBcdFx0XHRjb25zdCByZWN0ID0gZmlnbWEuY3JlYXRlUmVjdGFuZ2xlKCk7XG4vLyBcdFx0XHRyZWN0LnggPSBpICogMTUwO1xuLy8gXHRcdFx0cmVjdC5maWxscyA9IFt7dHlwZTogJ1NPTElEJywgY29sb3I6IHtyOiAxLCBnOiAwLjUsIGI6IDB9fV07XG4vLyBcdFx0XHRmaWdtYS5jdXJyZW50UGFnZS5hcHBlbmRDaGlsZChyZWN0KTtcbi8vIFx0XHRcdG5vZGVzLnB1c2gocmVjdCk7XG4vLyBcdFx0fVxuLy8gXHRcdGZpZ21hLmN1cnJlbnRQYWdlLnNlbGVjdGlvbiA9IG5vZGVzO1xuLy8gXHRcdGZpZ21hLnZpZXdwb3J0LnNjcm9sbEFuZFpvb21JbnRvVmlldyhub2Rlcyk7XG4vLyBcdH1cblxuLy8gXHRmaWdtYS5jbG9zZVBsdWdpbigpO1xuLy8gfTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS1cblxuXG5jb25zdCBwYWdlTWF4WCA9ICgpID0+IHtcblx0bGV0IG1heFggPSAwXG5cdGlmIChmaWdtYS5jdXJyZW50UGFnZS5jaGlsZHJlbikge1xuXHRcdGZpZ21hLmN1cnJlbnRQYWdlLmNoaWxkcmVuLmZvckVhY2goKG5vZGUpID0+IHtcblx0XHRcdGlmICgobm9kZS54ICsgbm9kZS53aWR0aCkgPiBtYXhYKSB7XG5cdFx0XHRcdG1heFggPSAobm9kZS54ICsgbm9kZS53aWR0aClcblx0XHRcdH1cblx0XHR9KVxuXHR9XG5cdHJldHVybiBtYXhYXG59XG5cbmNvbnN0IGNyZWF0ZVRleHRTdHlsZXNUZW1wbGF0ZUZyYW1lID0gKCkgPT4ge1xuXHRjb25zdCB0RnJhbWUgPSBmaWdtYS5jcmVhdGVGcmFtZSgpXG5cdHRGcmFtZS5uYW1lID0gJ1RlbXBsYXRlIC0gVGV4dCBTdHlsZXMnXG5cdC8vIC4uLlxuXHQvLyBUT0RPOiBDcmVhdGUgd2hvbGUgdGVtcGxhdGUgZm9ybWF0IHZpYSBjb2RlIGhlcmUuLi5cbn1cblxuY29uc3Qgc2V0VGV4dFN0eWxlUHJvcGVydHlWYWx1ZSA9IChwcm9wc05vZGUsIG5hbWUsIHZhbHVlLCBpc0RlZmF1bHQpID0+IHtcblx0Y29uc3QgcHJvcEdyb3VwTm9kZSA9IHByb3BzTm9kZS5maW5kT25lKChuKSA9PiBuLm5hbWUgPT09IG5hbWUpXG5cdGlmIChwcm9wR3JvdXBOb2RlKSB7XG5cdFx0bGV0IHNob3VsZFJlbW92ZU5vZGUgPSB0cnVlXG5cdFx0Y29uc3QgcHJvcFZhbHVlTm9kZSA9IHByb3BHcm91cE5vZGUuZmluZENoaWxkKChuKSA9PiBuLm5hbWUgPT09ICdWYWx1ZScpXG5cdFx0aWYgKHByb3BWYWx1ZU5vZGUgJiYgaXNEZWZhdWx0ICE9PSB0cnVlKSB7XG5cdFx0XHRwcm9wVmFsdWVOb2RlLmNoYXJhY3RlcnMgPSAnJyArIHZhbHVlXG5cdFx0XHRzaG91bGRSZW1vdmVOb2RlID0gZmFsc2Vcblx0XHR9XG5cdFx0aWYgKHNob3VsZFJlbW92ZU5vZGUpIHtcblx0XHRcdHByb3BHcm91cE5vZGUucmVtb3ZlKClcblx0XHR9XG5cdH1cbn1cblxuY29uc3QgZ2VuZXJhdGVUZXh0U3R5bGVzRnJhbWUgPSAodGVtcGxhdGVUZXh0U3R5bGVzRnJhbWUpID0+IHtcblx0Y29uc3QgdGV4dFN0eWxlc1JlbmRlcmVkRnJhbWVOYW1lID0gJ1RleHQgU3R5bGVzJ1xuXHRsZXQgdGV4dFN0eWxlc1JlbmRlcmVkRnJhbWVYID0gMFxuXG5cdGNvbnN0IGV4aXN0aW5nVGV4dFN0eWxlc1JlbmRlcmVkRnJhbWUgPSBmaWdtYS5jdXJyZW50UGFnZS5maW5kT25lKChuKSA9PiB7IHJldHVybiAobi50eXBlID09PSAnRlJBTUUnICYmIG4ubmFtZSA9PT0gdGV4dFN0eWxlc1JlbmRlcmVkRnJhbWVOYW1lKSB9KVxuXHRpZiAoZXhpc3RpbmdUZXh0U3R5bGVzUmVuZGVyZWRGcmFtZSkgeyAvLyByZXBsYWNlIGV4aXN0aW5nIGNhbnZhc1xuXHRcdHRleHRTdHlsZXNSZW5kZXJlZEZyYW1lWCA9IGV4aXN0aW5nVGV4dFN0eWxlc1JlbmRlcmVkRnJhbWUueFxuXHRcdGV4aXN0aW5nVGV4dFN0eWxlc1JlbmRlcmVkRnJhbWUucmVtb3ZlKClcblx0fVxuXHRlbHNlIHsgLy8gbmV3IGZyYW1lIGluIHRoZSBjYW52YXNcblx0XHR0ZXh0U3R5bGVzUmVuZGVyZWRGcmFtZVggPSBwYWdlTWF4WCgpICsgMTAwXG5cdH1cblxuXHRjb25zdCBnZW5lcmF0ZWRURnJhbWUgPSB0ZW1wbGF0ZVRleHRTdHlsZXNGcmFtZS5jbG9uZSgpXG5cdGdlbmVyYXRlZFRGcmFtZS5uYW1lID0gdGV4dFN0eWxlc1JlbmRlcmVkRnJhbWVOYW1lXG5cdGdlbmVyYXRlZFRGcmFtZS54ID0gdGV4dFN0eWxlc1JlbmRlcmVkRnJhbWVYXG5cblx0Y29uc3QgdGV4dFN0eWxlQmxvY2sgPSBnZW5lcmF0ZWRURnJhbWUuZmluZE9uZSgobikgPT4geyByZXR1cm4gKG4udHlwZSA9PT0gJ0dST1VQJyAmJiBuLm5hbWUgPT09ICdUZXh0IFN0eWxlJykgfSlcblx0Ly8gY29uc29sZS5sb2coJy0tPiB0ZXh0U3R5bGVCbG9jaycsIHRleHRTdHlsZUJsb2NrKVxuXHRcblx0Y29uc3QgdGV4dFN0eWxlcyA9IGZpZ21hLmdldExvY2FsVGV4dFN0eWxlcygpXG5cdC8vIGxldCB0ZXh0U3R5bGVcblx0Y29uc3QgdHNQcm9taXNlcyA9IFtdXG5cdGZvcihsZXQgaSA9IDA7IGkgPCB0ZXh0U3R5bGVzLmxlbmd0aDsgaSArPSAxKSB7XG5cdFx0Y29uc3QgdGV4dFN0eWxlID0gdGV4dFN0eWxlc1tpXVxuXHRcdC8vIGNvbnNvbGUubG9nKCctLS0tLS0tLS0tLS0tLS0tLS0tLS0nKVxuXHRcdC8vIGNvbnNvbGUubG9nKHRleHRTdHlsZSlcblx0XHRcblx0XHR0c1Byb21pc2VzLnB1c2gobmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0ZmlnbWEubG9hZEZvbnRBc3luYyh7XG5cdFx0XHRcdGZhbWlseTogdGV4dFN0eWxlLmZvbnROYW1lLmZhbWlseSxcblx0XHRcdFx0c3R5bGU6IHRleHRTdHlsZS5mb250TmFtZS5zdHlsZVxuXHRcdFx0fSlcblx0XHRcdFx0LnRoZW4oKCkgPT4ge1xuXHRcdFx0XHRcdGNvbnN0IG5ld1N0eWxlID0gdGV4dFN0eWxlQmxvY2suY2xvbmUoKVxuXG5cdFx0XHRcdFx0Y29uc3QgcHJldmlld1RleHROb2RlID0gbmV3U3R5bGUuZmluZENoaWxkKChuKSA9PiBuLm5hbWUgPT09ICdQcmV2aWV3Jylcblx0XHRcdFx0XHRwcmV2aWV3VGV4dE5vZGUudGV4dFN0eWxlSWQgPSB0ZXh0U3R5bGUuaWRcblx0XHRcdFx0XHRwcmV2aWV3VGV4dE5vZGUuY2hhcmFjdGVycyA9IHRleHRTdHlsZS5uYW1lXG5cblx0XHRcdFx0XHRjb25zdCBwcm9wZXJ0aWVzR3JvdXAgPSBuZXdTdHlsZS5maW5kQ2hpbGQoKG4pID0+IG4ubmFtZSA9PT0gJ1Byb3BlcnRpZXMnKVxuXHRcdFx0XHRcdGlmIChwcm9wZXJ0aWVzR3JvdXApIHtcblx0XHRcdFx0XHRcdHNldFRleHRTdHlsZVByb3BlcnR5VmFsdWUocHJvcGVydGllc0dyb3VwLCAnRm9udCBGYW1pbHknLCB0ZXh0U3R5bGUuZm9udE5hbWUuZmFtaWx5KVxuXHRcdFx0XHRcdFx0c2V0VGV4dFN0eWxlUHJvcGVydHlWYWx1ZShwcm9wZXJ0aWVzR3JvdXAsICdGb250IFN0eWxlJywgdGV4dFN0eWxlLmZvbnROYW1lLnN0eWxlKVxuXHRcdFx0XHRcdFx0c2V0VGV4dFN0eWxlUHJvcGVydHlWYWx1ZShwcm9wZXJ0aWVzR3JvdXAsICdGb250IFNpemUnLCB0ZXh0U3R5bGUuZm9udFNpemUpXG5cdFx0XHRcdFx0XHRzZXRUZXh0U3R5bGVQcm9wZXJ0eVZhbHVlKHByb3BlcnRpZXNHcm91cCwgJ0xldHRlciBTcGFjaW5nJywgdGV4dFN0eWxlLmxldHRlclNwYWNpbmcudmFsdWUgKyAnICcgKyB0ZXh0U3R5bGUubGV0dGVyU3BhY2luZy51bml0LCB0ZXh0U3R5bGUubGV0dGVyU3BhY2luZy52YWx1ZSA9PT0gMClcblx0XHRcdFx0XHRcdHNldFRleHRTdHlsZVByb3BlcnR5VmFsdWUocHJvcGVydGllc0dyb3VwLCAnTGluZSBIZWlnaHQnLCB0ZXh0U3R5bGUubGluZUhlaWdodC52YWx1ZSArICcgJyArIHRleHRTdHlsZS5saW5lSGVpZ2h0LnVuaXQsIHR5cGVvZiB0ZXh0U3R5bGUubGluZUhlaWdodC52YWx1ZSA9PT0gJ3VuZGVmaW5lZCcgfHwgdGV4dFN0eWxlLmxpbmVIZWlnaHQudmFsdWUgPT09IDApXG5cdFx0XHRcdFx0XHRzZXRUZXh0U3R5bGVQcm9wZXJ0eVZhbHVlKHByb3BlcnRpZXNHcm91cCwgJ1BhcmFncmFwaCBJbmRlbnQnLCB0ZXh0U3R5bGUucGFyYWdyYXBoSW5kZW50LCB0ZXh0U3R5bGUucGFyYWdyYXBoSW5kZW50ID09PSAwKVxuXHRcdFx0XHRcdFx0c2V0VGV4dFN0eWxlUHJvcGVydHlWYWx1ZShwcm9wZXJ0aWVzR3JvdXAsICdQYXJhZ3JhcGggU3BhY2luZycsIHRleHRTdHlsZS5wYXJhZ3JhcGhTcGFjaW5nLCB0ZXh0U3R5bGUucGFyYWdyYXBoU3BhY2luZyA9PT0gMClcblx0XHRcdFx0XHRcdHNldFRleHRTdHlsZVByb3BlcnR5VmFsdWUocHJvcGVydGllc0dyb3VwLCAnVGV4dCBDYXNlJywgdGV4dFN0eWxlLnRleHRDYXNlLCB0ZXh0U3R5bGUudGV4dENhc2UgPT09ICdPUklHSU5BTCcpXG5cdFx0XHRcdFx0XHRzZXRUZXh0U3R5bGVQcm9wZXJ0eVZhbHVlKHByb3BlcnRpZXNHcm91cCwgJ1RleHQgRGVjb3JhdGlvbicsIHRleHRTdHlsZS50ZXh0RGVjb3JhdGlvbiwgdGV4dFN0eWxlLnRleHREZWNvcmF0aW9uID09PSAnTk9ORScpXG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0Z2VuZXJhdGVkVEZyYW1lLmFwcGVuZENoaWxkKG5ld1N0eWxlKVxuXHRcdFx0XHRcdHJlc29sdmUoKVxuXHRcdFx0XHR9KVxuXHRcdFx0XHQuY2F0Y2goKGUpID0+IHJlamVjdChlKSlcblx0XHR9KSlcblx0fVxuXG5cdFByb21pc2UuYWxsKHRzUHJvbWlzZXMpXG5cdFx0LnRoZW4oKCkgPT4ge1xuXHRcdFx0Ly8gY29uc29sZS5sb2coJ0FsbCBkb25lIScpXG5cdFx0XHR0ZXh0U3R5bGVCbG9jay5yZW1vdmUoKVxuXHRcdFx0ZmlnbWEudmlld3BvcnQuc2Nyb2xsQW5kWm9vbUludG9WaWV3KFtnZW5lcmF0ZWRURnJhbWVdKVxuXHRcdFx0ZmlnbWEuY2xvc2VQbHVnaW4oKVxuXHRcdH0pXG59XG5cblxubGV0IHN0eWxlR3VpZGVQYWdlID0gZmlnbWEucm9vdC5maW5kT25lKChuKSA9PiB7IHJldHVybiAobi50eXBlID09PSAnUEFHRScgJiYgbi5uYW1lID09PSAnU3R5bGUgR3VpZGUnKSB9KVxuLy8gY29uc29sZS5sb2coJy0tPiBzdHlsZUd1aWRlUGFnZScsIHN0eWxlR3VpZGVQYWdlKVxuXG5pZiAoIXN0eWxlR3VpZGVQYWdlKSB7XG5cdHN0eWxlR3VpZGVQYWdlID0gZmlnbWEuY3JlYXRlUGFnZSgpXG5cdHN0eWxlR3VpZGVQYWdlLm5hbWUgPSAnU3R5bGUgR3VpZGUnXG59XG5cbmZpZ21hLmN1cnJlbnRQYWdlID0gc3R5bGVHdWlkZVBhZ2UgLy8gc3dpdGNoIHRvIHRoZSBuZXcgcGFnZVxuXG5sZXQgdGVtcGxhdGVUZXh0U3R5bGVzRnJhbWUgPSBzdHlsZUd1aWRlUGFnZS5maW5kQ2hpbGQoKG4pID0+IHsgcmV0dXJuIChuLnR5cGUgPT09ICdGUkFNRScgJiYgbi5uYW1lID09PSAnVGVtcGxhdGUgLSBUZXh0IFN0eWxlcycpIH0pXG4vLyBjb25zb2xlLmxvZygnLS0+IHRGcmFtZScsIHRGcmFtZSlcbmlmICghdGVtcGxhdGVUZXh0U3R5bGVzRnJhbWUpIGNyZWF0ZVRleHRTdHlsZXNUZW1wbGF0ZUZyYW1lKClcblxuZmlnbWEubG9hZEZvbnRBc3luYyh7IC8vIGxvYWQgZm9udCBmb3IgdGhlIGxhYmVscyB3ZSB3aWxsIGJlIHVwZGF0aW5nXG5cdGZhbWlseTogJ0hlbHZldGljYScsXG5cdHN0eWxlOiAnUmVndWxhcidcbn0pXG5cdC50aGVuKCgpID0+IHtcblx0XHRnZW5lcmF0ZVRleHRTdHlsZXNGcmFtZSh0ZW1wbGF0ZVRleHRTdHlsZXNGcmFtZSlcblx0fSlcblxuLy8gY29uc3QgcGFpbnRTdHlsZXMgPSBmaWdtYS5nZXRMb2NhbFBhaW50U3R5bGVzKClcblxuLy8gcGFpbnRTdHlsZXMuZm9yRWFjaCgocGFpbnRTdHlsZSkgPT4ge1xuLy8gXHRjb25zb2xlLmxvZygnLS0tLS0tLS0tLS0tLS0tLS0tLS0tJylcbi8vIFx0Ly8gY29uc29sZS5sb2cocGFpbnROb2RlKVxuLy8gXHRjb25zb2xlLmxvZygnbmFtZScsIHBhaW50U3R5bGUubmFtZSlcbi8vIFx0Ly8gcGFpbnROb2RlLnBhaW50cyAoQXJyYXkgLSBDYW4gYmUgbXVsdGlwbGUpXG4vLyBcdGNvbnNvbGUubG9nKCd0eXBlJywgcGFpbnRTdHlsZS5wYWludHNbMF0udHlwZSkgLy8gU09MSURcbi8vIFx0Y29uc29sZS5sb2coJ2JsZW5kTW9kZScsIHBhaW50U3R5bGUucGFpbnRzWzBdLmJsZW5kTW9kZSkgLy8gTk9STUFMXG4vLyBcdGNvbnNvbGUubG9nKCd2aXNpYmxlJywgcGFpbnRTdHlsZS5wYWludHNbMF0udmlzaWJsZSlcbi8vIFx0Y29uc29sZS5sb2coJ3InLCBwYWludFN0eWxlLnBhaW50c1swXS5jb2xvci5yKVxuLy8gXHRjb25zb2xlLmxvZygnZycsIHBhaW50U3R5bGUucGFpbnRzWzBdLmNvbG9yLmcpXG4vLyBcdGNvbnNvbGUubG9nKCdiJywgcGFpbnRTdHlsZS5wYWludHNbMF0uY29sb3IuYilcbi8vIFx0Y29uc29sZS5sb2coJ29wYWNpdHknLCBwYWludFN0eWxlLnBhaW50c1swXS5vcGFjaXR5KVxuLy8gXHQvLyBuZWVkIHRvIHNlZSB0aGUgdHlwZXMgZm9yIHRoZSBncmFkaWVudCBhbmQgb3RoZXIgdHlwZXMgbGlrZSBiYWNrZ3JvdW5kIGltYWdlXG4vLyB9KVxuXG4vLyBmaWdtYS5jbG9zZVBsdWdpbigpXG4iXSwic291cmNlUm9vdCI6IiJ9