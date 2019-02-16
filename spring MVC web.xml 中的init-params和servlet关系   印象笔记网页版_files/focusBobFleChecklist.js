define("focusBobFleChecklist", ["react","react-dom"], function(__WEBPACK_EXTERNAL_MODULE_8__, __WEBPACK_EXTERNAL_MODULE_96__) { return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 495);
/******/ })
/************************************************************************/
/******/ ({

/***/ 12:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* eslint-env browser */


var _plurr = __webpack_require__(40);

var _plurr2 = _interopRequireDefault(_plurr);

var _webI18nResources = __webpack_require__(30);

var WebI18nResources = _interopRequireWildcard(_webI18nResources);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var evernoteToPlurrLocale = function evernoteToPlurrLocale(evernoteLocale) {
  if (!evernoteLocale || evernoteLocale === 'en_XA') {
    return 'en';
  } else if (evernoteLocale.startsWith('zh_')) {
    return 'zh';
  } else if (evernoteLocale === 'in') {
    return 'id';
  } else if (evernoteLocale === 'pt_BR') {
    return 'pt-br';
  } else {
    return evernoteLocale;
  }
};

var I18n = function () {
  function I18n(messages, locale) {
    _classCallCheck(this, I18n);

    this.messages = messages;
    this.plurr = new _plurr2.default({ locale: evernoteToPlurrLocale(locale) });
  }

  _createClass(I18n, [{
    key: 'localize',
    value: function localize(key, plurrParams) {
      var msg = this.messages[key];
      if (!msg) {
        // Not translated yet.
        console.error('Untranslated string', key);
        return '';
      }

      /* Our makeJsI18n.pl script replaces all instances of "{N}" with "{{ N }}" during
       * compilation. Undo this work here at runtime for plurr only. */
      msg = this.messages[key].replace(/\{\{ /g, '{').replace(/ \}\}/g, '}');

      try {
        return this.plurr.format(msg, plurrParams || {});
      } catch (e) {
        console.error('Required plurr replacement variable probably not found for', key, '\n', e);
        return '';
      }
    }

    /**
     * A `localize` alias for compatibility with ported web/web modules.
     */

  }, {
    key: 'L',
    value: function L(key, plurrParams) {
      return this.localize(key, plurrParams);
    }
  }]);

  return I18n;
}();

var createWebI18n = function createWebI18n() {
  return new I18n(WebI18nResources.getMessages(), WebI18nResources.getLocale());
};

var i18n = createWebI18n();

exports.default = i18n;
module.exports = exports['default'];

/***/ }),

/***/ 14:
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function() {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		var result = [];
		for(var i = 0; i < this.length; i++) {
			var item = this[i];
			if(item[2]) {
				result.push("@media " + item[2] + "{" + item[1] + "}");
			} else {
				result.push(item[1]);
			}
		}
		return result.join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};


/***/ }),

/***/ 15:
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var stylesInDom = {},
	memoize = function(fn) {
		var memo;
		return function () {
			if (typeof memo === "undefined") memo = fn.apply(this, arguments);
			return memo;
		};
	},
	isOldIE = memoize(function() {
		return /msie [6-9]\b/.test(self.navigator.userAgent.toLowerCase());
	}),
	getHeadElement = memoize(function () {
		return document.head || document.getElementsByTagName("head")[0];
	}),
	singletonElement = null,
	singletonCounter = 0,
	styleElementsInsertedAtTop = [];

module.exports = function(list, options) {
	if(typeof DEBUG !== "undefined" && DEBUG) {
		if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};
	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (typeof options.singleton === "undefined") options.singleton = isOldIE();

	// By default, add <style> tags to the bottom of <head>.
	if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

	var styles = listToStyles(list);
	addStylesToDom(styles, options);

	return function update(newList) {
		var mayRemove = [];
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			domStyle.refs--;
			mayRemove.push(domStyle);
		}
		if(newList) {
			var newStyles = listToStyles(newList);
			addStylesToDom(newStyles, options);
		}
		for(var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];
			if(domStyle.refs === 0) {
				for(var j = 0; j < domStyle.parts.length; j++)
					domStyle.parts[j]();
				delete stylesInDom[domStyle.id];
			}
		}
	};
}

function addStylesToDom(styles, options) {
	for(var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];
		if(domStyle) {
			domStyle.refs++;
			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}
			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];
			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}
			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles(list) {
	var styles = [];
	var newStyles = {};
	for(var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};
		if(!newStyles[id])
			styles.push(newStyles[id] = {id: id, parts: [part]});
		else
			newStyles[id].parts.push(part);
	}
	return styles;
}

function insertStyleElement(options, styleElement) {
	var head = getHeadElement();
	var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
	if (options.insertAt === "top") {
		if(!lastStyleElementInsertedAtTop) {
			head.insertBefore(styleElement, head.firstChild);
		} else if(lastStyleElementInsertedAtTop.nextSibling) {
			head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			head.appendChild(styleElement);
		}
		styleElementsInsertedAtTop.push(styleElement);
	} else if (options.insertAt === "bottom") {
		head.appendChild(styleElement);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement(styleElement) {
	styleElement.parentNode.removeChild(styleElement);
	var idx = styleElementsInsertedAtTop.indexOf(styleElement);
	if(idx >= 0) {
		styleElementsInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement(options) {
	var styleElement = document.createElement("style");
	styleElement.type = "text/css";
	insertStyleElement(options, styleElement);
	return styleElement;
}

function createLinkElement(options) {
	var linkElement = document.createElement("link");
	linkElement.rel = "stylesheet";
	insertStyleElement(options, linkElement);
	return linkElement;
}

function addStyle(obj, options) {
	var styleElement, update, remove;

	if (options.singleton) {
		var styleIndex = singletonCounter++;
		styleElement = singletonElement || (singletonElement = createStyleElement(options));
		update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
		remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
	} else if(obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function") {
		styleElement = createLinkElement(options);
		update = updateLink.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
			if(styleElement.href)
				URL.revokeObjectURL(styleElement.href);
		};
	} else {
		styleElement = createStyleElement(options);
		update = applyToTag.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
		};
	}

	update(obj);

	return function updateStyle(newObj) {
		if(newObj) {
			if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
				return;
			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;
		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag(styleElement, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (styleElement.styleSheet) {
		styleElement.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = styleElement.childNodes;
		if (childNodes[index]) styleElement.removeChild(childNodes[index]);
		if (childNodes.length) {
			styleElement.insertBefore(cssNode, childNodes[index]);
		} else {
			styleElement.appendChild(cssNode);
		}
	}
}

function applyToTag(styleElement, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		styleElement.setAttribute("media", media)
	}

	if(styleElement.styleSheet) {
		styleElement.styleSheet.cssText = css;
	} else {
		while(styleElement.firstChild) {
			styleElement.removeChild(styleElement.firstChild);
		}
		styleElement.appendChild(document.createTextNode(css));
	}
}

function updateLink(linkElement, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	if(sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = linkElement.href;

	linkElement.href = URL.createObjectURL(blob);

	if(oldSrc)
		URL.revokeObjectURL(oldSrc);
}


/***/ }),

/***/ 173:
/***/ (function(module, exports) {

module.exports = "/web-frontend/d790516f085da3be12c7319cac8f95d5.png";

/***/ }),

/***/ 174:
/***/ (function(module, exports) {

module.exports = "/web-frontend/2e2e6c09e6507f1a17a637ecd77d68e4.png";

/***/ }),

/***/ 245:
/***/ (function(module, exports) {

module.exports = "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"no\"?>\n<svg width=\"12px\" height=\"12px\" viewBox=\"0 0 12 12\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n    <!-- Generator: sketchtool 3.8.3 (29802) - http://www.bohemiancoding.com/sketch -->\n    <title>6466045F-626A-479A-B4D2-21329A9DECDD</title>\n    <desc>Created with sketchtool.</desc>\n    <defs></defs>\n    <g id=\"Web\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\">\n        <g id=\"WEB_ICONS\" transform=\"translate(-500.000000, -3350.000000)\">\n            <g id=\"Web_Close_12\" transform=\"translate(500.000000, 3350.000000)\">\n                <polygon id=\"footprint\" fill-opacity=\"0\" fill=\"#FFCF57\" points=\"0 0 12 0 12 12 0 12\"></polygon>\n                <path d=\"M6.677,5.985 L10.829,10.137 C11.02,10.328 11.02,10.637 10.829,10.829 C10.637,11.02 10.328,11.02 10.137,10.829 L5.985,6.677 L1.833,10.829 C1.642,11.02 1.332,11.02 1.141,10.829 C0.95,10.637 0.95,10.328 1.141,10.137 L5.293,5.985 L1.141,1.833 C0.95,1.642 0.95,1.332 1.141,1.141 C1.332,0.95 1.642,0.95 1.833,1.141 L5.985,5.293 L10.137,1.141 C10.328,0.95 10.637,0.95 10.829,1.141 C11.02,1.332 11.02,1.642 10.829,1.833 L6.677,5.985 L6.677,5.985 Z\" id=\"icon\" fill=\"#000000\"></path>\n            </g>\n        </g>\n    </g>\n</svg>"

/***/ }),

/***/ 258:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(331);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(15)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/less-loader/index.js?{\"relativeUrls\":false}!./bobFleChecklist.less", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/less-loader/index.js?{\"relativeUrls\":false}!./bobFleChecklist.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 30:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.getLocale = getLocale;
exports.getMessages = getMessages;
/* eslint-env browser */
var DEFAULT_LOCALE = 'en';

function getLocale() {
  var metaLocale = typeof document !== 'undefined' && document.querySelector('meta[name="en:locale"]');
  if (metaLocale && typeof metaLocale.content === 'string') {
    return metaLocale.content;
  } else {
    return DEFAULT_LOCALE;
  }
}

function getMessages() {
  if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) !== 'object' || _typeof(window.__EVERNOTE_I18N__) !== 'object') {
    // We may be inside of a unit test.
    return {};
  } else {
    return window.__EVERNOTE_I18N__;
  }
}

/***/ }),

/***/ 331:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(14)();
// imports


// module
exports.push([module.i, ".a11y-only {\n  /* http://www.coolfields.co.uk/2016/05/text-for-screen-readers-only-updated/ */\n  clip: rect(1px, 1px, 1px, 1px);\n  height: 1px;\n  width: 1px;\n  overflow: hidden;\n  position: absolute !important;\n}\n/* \"Evernote Green\" */\n.BobFleChecklist-DisclosableHeader-header {\n  position: relative;\n  cursor: pointer;\n  height: 40px;\n}\n.BobFleChecklist-DisclosableHeader-title {\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  font-family: gotham, helvetica, arial, sans-serif;\n  font-size: 13px;\n  font-weight: 500;\n  text-transform: uppercase;\n  letter-spacing: 1px;\n  padding-left: 24px;\n  line-height: 40px;\n}\n.BobFleChecklist-DisclosableHeader-title::before {\n  margin: 2px 8px 0 4px;\n  width: 5px;\n  height: 9px;\n  display: inline-block;\n  content: '';\n  vertical-align: text-top;\n}\n@media all {\n  .BobFleChecklist-DisclosableHeader-title::before {\n    background:  url(" + __webpack_require__(432) + ") center;\n    background-size: 5px 9px;\n  }\n}\n@media all and (-moz-min-device-pixel-ratio: 1.5), all and (-o-min-device-pixel-ratio: 3/2), all and (-webkit-min-device-pixel-ratio: 1.5), all and (min-device-pixel-ratio: 1.5), all and (min-resolution: 1.5dppx) {\n  .BobFleChecklist-DisclosableHeader-title::before {\n    background:  url(" + __webpack_require__(174) + ") center;\n    background-size: 5px 9px;\n  }\n}\n@media all and (-moz-min-device-pixel-ratio: 1.5), all and (-o-min-device-pixel-ratio: 3/2), all and (-webkit-min-device-pixel-ratio: 1.5), all and (min-device-pixel-ratio: 1.5), all and (min-resolution: 1.5dppx) and (-moz-min-device-pixel-ratio: 1.5), all and (-moz-min-device-pixel-ratio: 1.5), all and (-o-min-device-pixel-ratio: 3/2), all and (-webkit-min-device-pixel-ratio: 1.5), all and (min-device-pixel-ratio: 1.5), all and (min-resolution: 1.5dppx) and (-o-min-device-pixel-ratio: 3/2), all and (-moz-min-device-pixel-ratio: 1.5), all and (-o-min-device-pixel-ratio: 3/2), all and (-webkit-min-device-pixel-ratio: 1.5), all and (min-device-pixel-ratio: 1.5), all and (min-resolution: 1.5dppx) and (-webkit-min-device-pixel-ratio: 1.5), all and (-moz-min-device-pixel-ratio: 1.5), all and (-o-min-device-pixel-ratio: 3/2), all and (-webkit-min-device-pixel-ratio: 1.5), all and (min-device-pixel-ratio: 1.5), all and (min-resolution: 1.5dppx) and (min-device-pixel-ratio: 1.5), all and (-moz-min-device-pixel-ratio: 1.5), all and (-o-min-device-pixel-ratio: 3/2), all and (-webkit-min-device-pixel-ratio: 1.5), all and (min-device-pixel-ratio: 1.5), all and (min-resolution: 1.5dppx) and (min-resolution: 1.5dppx) {\n  .BobFleChecklist-DisclosableHeader-title::before {\n    background:  url(" + __webpack_require__(174) + ") center;\n    background-size: 5px 9px;\n  }\n}\n.BobFleChecklist-DisclosableHeader-expanded .BobFleChecklist-DisclosableHeader-title::before {\n  margin: 5px 8px 0 0;\n  width: 9px;\n  height: 5px;\n}\n@media all {\n  .BobFleChecklist-DisclosableHeader-expanded .BobFleChecklist-DisclosableHeader-title::before {\n    background:  url(" + __webpack_require__(431) + ") center;\n    background-size: 9px 5px;\n  }\n}\n@media all and (-moz-min-device-pixel-ratio: 1.5), all and (-o-min-device-pixel-ratio: 3/2), all and (-webkit-min-device-pixel-ratio: 1.5), all and (min-device-pixel-ratio: 1.5), all and (min-resolution: 1.5dppx) {\n  .BobFleChecklist-DisclosableHeader-expanded .BobFleChecklist-DisclosableHeader-title::before {\n    background:  url(" + __webpack_require__(173) + ") center;\n    background-size: 9px 5px;\n  }\n}\n@media all and (-moz-min-device-pixel-ratio: 1.5), all and (-o-min-device-pixel-ratio: 3/2), all and (-webkit-min-device-pixel-ratio: 1.5), all and (min-device-pixel-ratio: 1.5), all and (min-resolution: 1.5dppx) and (-moz-min-device-pixel-ratio: 1.5), all and (-moz-min-device-pixel-ratio: 1.5), all and (-o-min-device-pixel-ratio: 3/2), all and (-webkit-min-device-pixel-ratio: 1.5), all and (min-device-pixel-ratio: 1.5), all and (min-resolution: 1.5dppx) and (-o-min-device-pixel-ratio: 3/2), all and (-moz-min-device-pixel-ratio: 1.5), all and (-o-min-device-pixel-ratio: 3/2), all and (-webkit-min-device-pixel-ratio: 1.5), all and (min-device-pixel-ratio: 1.5), all and (min-resolution: 1.5dppx) and (-webkit-min-device-pixel-ratio: 1.5), all and (-moz-min-device-pixel-ratio: 1.5), all and (-o-min-device-pixel-ratio: 3/2), all and (-webkit-min-device-pixel-ratio: 1.5), all and (min-device-pixel-ratio: 1.5), all and (min-resolution: 1.5dppx) and (min-device-pixel-ratio: 1.5), all and (-moz-min-device-pixel-ratio: 1.5), all and (-o-min-device-pixel-ratio: 3/2), all and (-webkit-min-device-pixel-ratio: 1.5), all and (min-device-pixel-ratio: 1.5), all and (min-resolution: 1.5dppx) and (min-resolution: 1.5dppx) {\n  .BobFleChecklist-DisclosableHeader-expanded .BobFleChecklist-DisclosableHeader-title::before {\n    background:  url(" + __webpack_require__(173) + ") center;\n    background-size: 9px 5px;\n  }\n}\n.BobFleChecklist-root {\n  border-bottom: 1px solid #ececec;\n}\n.BobFleChecklist-root .BobFleChecklist-close {\n  position: absolute;\n  top: 0;\n  right: 23px;\n  margin-top: 5px;\n}\n.BobFleChecklist-root .BobFleChecklist-close > svg {\n  height: 20px;\n}\n.BobFleChecklist-root .BobFleChecklist-close > svg path {\n  fill: #878787;\n}\n.BobFleChecklist-root h1 {\n  margin-right: 20px;\n  margin-left: 24px;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  font-family: gotham, helvetica, arial, sans-serif;\n  font-size: 18px;\n  line-height: 22px;\n  font-weight: 400;\n  color: #4a4a4a;\n  margin-bottom: 5px;\n}\n.BobFleChecklist-root h3 {\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  font-family: gotham, helvetica, arial, sans-serif;\n  font-size: 13px;\n  font-weight: 400;\n  color: #878787;\n  margin: 0 20px 12px 41px;\n}\n.BobFleChecklist-root p {\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  font-family: gotham, helvetica, arial, sans-serif;\n  font-size: 13px;\n  font-weight: 400;\n  color: #878787;\n}\n.BobFleChecklist-root ul {\n  list-style: none;\n  padding-left: 0;\n  counter-reset: checklistStep;\n}\n.BobFleChecklist-root ul li {\n  position: relative;\n  counter-increment: checklistStep;\n}\n.BobFleChecklist-root ul li:after {\n  position: absolute;\n  content: counter(checklistStep);\n  top: 0px;\n  left: 22px;\n  border: 1px solid #ababab;\n  border-radius: 50%;\n  width: 25px;\n  height: 25px;\n  background-color: white;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  font-family: gotham, helvetica, arial, sans-serif;\n  font-size: 11px;\n  font-weight: 500;\n  line-height: 24px;\n  color: #ababab;\n  text-align: center;\n  cursor: default;\n}\n.BobFleChecklist-root ul li.BobFleChecklist-complete:after {\n  content: \"\";\n  background-image: url(" + __webpack_require__(412) + ");\n  background-size: 12px 11px;\n  background-repeat: no-repeat;\n  background-position: 6px 8px;\n}\n.BobFleChecklist-root ul li:before {\n  content: \"\";\n  position: absolute;\n  border-left: 1px solid #ababab;\n  height: 100%;\n  width: 1px;\n  left: 35px;\n  top: 24px;\n}\n.BobFleChecklist-root ul li:last-child:before {\n  content: none;\n}\n.BobFleChecklist-root .BobFleChecklist-description {\n  margin-right: 20px;\n  margin-left: 24px;\n  line-height: 16px;\n  margin-bottom: 15px;\n}\n.BobFleChecklist-root .BobFleChecklist-meter {\n  margin-right: 20px;\n  margin-left: 24px;\n  display: flex;\n  height: 22px;\n  border: 1px solid #d1d1d1;\n  border-radius: 11px;\n  margin-bottom: 20px;\n}\n.BobFleChecklist-root .BobFleChecklist-meter > .BobFleChecklist-step {\n  flex: 1;\n  border-top: 2px solid white;\n  border-right: 2px solid white;\n  border-bottom: 2px solid white;\n}\n.BobFleChecklist-root .BobFleChecklist-meter > .BobFleChecklist-step:first-child {\n  border-left: 2px solid white;\n  border-top-left-radius: 11px;\n  border-bottom-left-radius: 11px;\n}\n.BobFleChecklist-root .BobFleChecklist-meter > .BobFleChecklist-step:last-child {\n  border-top-right-radius: 11px;\n  border-bottom-right-radius: 11px;\n}\n.BobFleChecklist-root .BobFleChecklist-meter > .BobFleChecklist-ratio-text {\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  font-family: gotham, helvetica, arial, sans-serif;\n  font-size: 13px;\n  font-weight: 400;\n  color: #d1d1d1;\n  flex: 1;\n  line-height: 22px;\n  text-align: center;\n}\n.BobFleChecklist-root .BobFleChecklist-checklist-item {\n  position: relative;\n  margin: 0 10px 18px 48px;\n}\n.BobFleChecklist-root .BobFleChecklist-checklist-item h2 {\n  padding-top: 5px;\n  margin-left: 10px;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  font-family: gotham, helvetica, arial, sans-serif;\n  font-size: 13px;\n  font-weight: 400;\n  color: #4a4a4a;\n  text-decoration: underline;\n}\n.BobFleChecklist-root .BobFleChecklist-checklist-item h2.BobFleChecklist-complete {\n  color: #878787;\n}\n.BobFleChecklist-root .BobFleChecklist-checklist-item h2 span {\n  cursor: pointer;\n}\n.BobFleChecklist-root .BobFleChecklist-checklist-item p {\n  margin-top: 10px;\n  margin-left: 10px;\n}\n.BobFleChecklist-root .BobFleChecklist-checklist-item .BobFleChecklist-tryIt {\n  width: 90px;\n  height: 25px;\n  border-radius: 3px;\n  background-color: #2dbe60;\n  cursor: pointer;\n  text-align: center;\n  vertical-align: middle;\n  line-height: 25px;\n}\n.BobFleChecklist-root .BobFleChecklist-checklist-item .BobFleChecklist-tryIt span {\n  color: #ffffff;\n}\n", ""]);

// exports


/***/ }),

/***/ 40:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// Copyright (C) 2012-2016 Igor Afanasyev, https://github.com/iafan/Plurr
// Version: 1.0.2

(function (root, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.Plurr = factory();
  }
}(this, function () {
  function addMissingOptions (opt, defaults) {
    for (prop in defaults) {
      if (!opt.hasOwnProperty(prop)) {
        opt[prop] = defaults[prop];
      }
    }
  }


  var _PLURAL = '_PLURAL';


  function Plurr(options) {
    //
    // Initialize object
    //

    var defaultOptions = options || {};
    addMissingOptions(defaultOptions, {
      locale: 'en',
      autoPlurals: true,
      strict: true
    });

    //
    // list of plural equations taken from
    // http://translate.sourceforge.net/wiki/l10n/pluralforms
    //
    var pluralEquations = {
      'ach': function(n) { return 0; }, // Acholi
      'af': function(n) { return (n!=1) ? 1 : 0; }, // Afrikaans
      'ak': function(n) { return (n>1) ? 1 : 0; }, // Akan
      'am': function(n) { return (n>1) ? 1 : 0; }, // Amharic
      'an': function(n) { return (n!=1) ? 1 : 0; }, // Aragonese
      'ar': function(n) { return n==0 ? 0 : n==1 ? 1 : n==2 ? 2 : n%100>=3 && n%100<=10 ? 3 : n%100>=11 ? 4 : 5; }, // Arabic
      'arn': function(n) { return (n>1) ? 1 : 0; }, // Mapudungun
      'ast': function(n) { return (n!=1) ? 1 : 0; }, // Asturian
      'ay': function(n) { return 0; }, // Aymara
      'az': function(n) { return (n!=1) ? 1 : 0; }, // Azerbaijani

      'be': function(n) { return (n%10==1 && n%100!=11 ? 0 : n%10>=2 && n%10<=4 && (n%100<10 || n%100>=20) ? 1 : 2); }, // Belarusian
      'bg': function(n) { return (n!=1) ? 1 : 0; }, // Bulgarian
      'bn': function(n) { return (n!=1) ? 1 : 0; }, // Bengali
      'bo': function(n) { return 0; }, // Tibetan
      'br': function(n) { return (n>1) ? 1 : 0; }, // Breton
      'bs': function(n) { return (n%10==1 && n%100!=11 ? 0 : n%10>=2 && n%10<=4 && (n%100<10 || n%100>=20) ? 1 : 2); }, // Bosnian

      'ca': function(n) { return (n!=1) ? 1 : 0; }, // Catalan
      'cgg': function(n) { return 0; }, // Chiga
      'cs': function(n) { return (n==1) ? 0 : (n>=2 && n<=4) ? 1 : 2; }, // Czech
      'csb': function(n) { return n==1 ? 0 : n%10>=2 && n%10<=4 && (n%100<10 || n%100>=20) ? 1 : 2; }, // Kashubian
      'cy': function(n) { return (n==1) ? 0 : (n==2) ? 1 : (n!=8 && n!=11) ? 2 : 3; }, // Welsh

      'da': function(n) { return (n!=1) ? 1 : 0; }, // Danish
      'de': function(n) { return (n!=1) ? 1 : 0; }, // German
      'dz': function(n) { return 0; }, // Dzongkha

      'el': function(n) { return (n!=1) ? 1 : 0; }, // Greek
      'en': function(n) { return (n!=1) ? 1 : 0; }, // English
      'eo': function(n) { return (n!=1) ? 1 : 0; }, // Esperanto
      'es': function(n) { return (n!=1) ? 1 : 0; }, // Spanish
      'es-ar': function(n) { return (n!=1) ? 1 : 0; }, // Argentinean Spanish
      'et': function(n) { return (n!=1) ? 1 : 0; }, // Estonian
      'eu': function(n) { return (n!=1) ? 1 : 0; }, // Basque

      'fa': function(n) { return 0; }, // Persian
      'fi': function(n) { return (n!=1) ? 1 : 0; }, // Finnish
      'fil': function(n) { return (n>1) ? 1 : 0; }, // Filipino
      'fo': function(n) { return (n!=1) ? 1 : 0; }, // Faroese
      'fr': function(n) { return (n>1) ? 1 : 0; }, // French
      'fur': function(n) { return (n!=1) ? 1 : 0; }, // Friulian
      'fy': function(n) { return (n!=1) ? 1 : 0; }, // Frisian

      'ga': function(n) { return n==1 ? 0 : n==2 ? 1 : n<7 ? 2 : n<11 ? 3 : 4; }, // Irish
      'gl': function(n) { return (n!=1) ? 1 : 0; }, // Galician
      'gu': function(n) { return (n!=1) ? 1 : 0; }, // Gujarati
      'gun': function(n) { return (n>1) ? 1 : 0; }, // Gun

      'ha': function(n) { return (n!=1) ? 1 : 0; }, // Hausa
      'he': function(n) { return (n!=1) ? 1 : 0; }, // Hebrew
      'hi': function(n) { return (n!=1) ? 1 : 0; }, // Hindi
      'hy': function(n) { return 0; }, // Armenian
      'hr': function(n) { return (n%10==1 && n%100!=11 ? 0 : n%10>=2 && n%10<=4 && (n%100<10 || n%100>=20) ? 1 : 2); }, // Croatian
      'hu': function(n) { return (n!=1) ? 1 : 0; }, // Hungarian

      'ia': function(n) { return (n!=1) ? 1 : 0; }, // Interlingua
      'id': function(n) { return 0; }, // Indonesian
      'is': function(n) { return (n%10!=1 || n%100==11); }, // Icelandic
      'it': function(n) { return (n!=1) ? 1 : 0; }, // Italian

      'ja': function(n) { return 0; }, // Japanese
      'jv': function(n) { return (n!=0) ? 1 : 0; }, // Javanese

      'ka': function(n) { return 0; }, // Georgian
      'kk': function(n) { return 0; }, // Kazakh
      'km': function(n) { return 0; }, // Khmer
      'kn': function(n) { return (n!=1) ? 1 : 0; }, // Kannada
      'ko': function(n) { return 0; }, // Korean
      'ku': function(n) { return (n!=1) ? 1 : 0; }, // Kurdish
      'kw': function(n) { return (n==1) ? 0 : (n==2) ? 1 : (n==3) ? 2 : 3; }, // Cornish
      'ky': function(n) { return 0; }, // Kyrgyz

      'lb': function(n) { return (n!=1); }, // Letzeburgesch
      'ln': function(n) { return (n>1) ? 1 : 0; }, // Lingala
      'lo': function(n) { return 0; }, // Lao
      'lt': function(n) { return (n%10==1 && n%100!=11 ? 0 : n%10>=2 && (n%100<10 || n%100>=20) ? 1 : 2); }, // Lithuanian
      'lv': function(n) { return (n%10==1 && n%100!=11 ? 0 : n!=0 ? 1 : 2); }, // Latvian

      'mfe': function(n) { return (n>1) ? 1 : 0; }, // Mauritian Creole
      'mg': function(n) { return (n>1) ? 1 : 0; }, // Malagasy
      'mi': function(n) { return (n>1) ? 1 : 0; }, // Maori
      'mk': function(n) { return n==1 || n%10==1 ? 0 : 1; }, // Macedonian
      'ml': function(n) { return (n!=1) ? 1 : 0; }, // Malayalam
      'mn': function(n) { return (n!=1) ? 1 : 0; }, // Mongolian
      'mr': function(n) { return (n!=1) ? 1 : 0; }, // Marathi
      'ms': function(n) { return 0; }, // Malay
      'mt': function(n) { return (n==1 ? 0 : n==0 || ( n%100>1 && n%100<11) ? 1 : (n%100>10 && n%100<20 ) ? 2 : 3); }, // Maltese

      'nah': function(n) { return (n!=1) ? 1 : 0; }, // Nahuatl
      'nap': function(n) { return (n!=1) ? 1 : 0; }, // Neapolitan
      'nb': function(n) { return (n!=1) ? 1 : 0; }, // Norwegian Bokmal
      'ne': function(n) { return (n!=1) ? 1 : 0; }, // Nepali
      'nl': function(n) { return (n!=1) ? 1 : 0; }, // Dutch
      'se': function(n) { return (n!=1) ? 1 : 0; }, // Northern Sami
      'nn': function(n) { return (n!=1) ? 1 : 0; }, // Norwegian Nynorsk
      'no': function(n) { return (n!=1) ? 1 : 0; }, // Norwegian (old code)
      'nso': function(n) { return (n!=1) ? 1 : 0; }, // Northern Sotho

      'oc': function(n) { return (n>1) ? 1 : 0; }, // Occitan
      'or': function(n) { return (n!=1) ? 1 : 0; }, // Oriya

      'ps': function(n) { return (n!=1) ? 1 : 0; }, // Pashto
      'pa': function(n) { return (n!=1) ? 1 : 0; }, // Punjabi
      'pap': function(n) { return (n!=1) ? 1 : 0; }, // Papiamento
      'pl': function(n) { return (n==1 ? 0 : n%10>=2 && n%10<=4 && (n%100<10 || n%100>=20) ? 1 : 2); }, // Polish
      'pms': function(n) { return (n!=1) ? 1 : 0; }, // Piemontese
      'pt': function(n) { return (n!=1) ? 1 : 0; }, // Portuguese
      'pt-br': function(n) { return (n>1) ? 1 : 0; }, // Brazilian Portuguese

      'rm': function(n) { return (n!=1); }, // Romansh
      'ro': function(n) { return (n==1 ? 0 : (n==0 || (n%100>0 && n%100<20)) ? 1 : 2); }, // Romanian
      'ru': function(n) { return (n%10==1 && n%100!=11 ? 0 : n%10>=2 && n%10<=4 && (n%100<10 || n%100>=20) ? 1 : 2); }, // Russian

      'sco': function(n) { return (n!=1) ? 1 : 0; }, // Scots
      'si': function(n) { return (n!=1) ? 1 : 0; }, // Sinhala
      'sk': function(n) { return (n==1) ? 0 : (n>=2 && n<=4) ? 1 : 2; }, // Slovak
      'sl': function(n) { return (n%100==1 ? 1 : n%100==2 ? 2 : n%100==3 || n%100==4 ? 3 : 0); }, // Slovenian
      'so': function(n) { return (n!=1) ? 1 : 0; }, // Somali
      'son': function(n) { return 0; }, // Songhay
      'sq': function(n) { return (n!=1) ? 1 : 0; }, // Albanian
      'sr': function(n) { return (n%10==1 && n%100!=11 ? 0 : n%10>=2 && n%10<=4 && (n%100<10 || n%100>=20) ? 1 : 2); }, // Serbian
      'su': function(n) { return 0; }, // Sundanese
      'sw': function(n) { return (n!=1) ? 1 : 0; }, // Swahili
      'sv': function(n) { return (n!=1) ? 1 : 0; }, // Swedish

      'ta': function(n) { return (n!=1) ? 1 : 0; }, // Tamil
      'te': function(n) { return (n!=1) ? 1 : 0; }, // Telugu
      'tg': function(n) { return (n!=1) ? 1 : 0; }, // Tajik
      'ti': function(n) { return (n>1) ? 1 : 0; }, // Tigrinya
      'th': function(n) { return 0; }, // Thai
      'tk': function(n) { return (n!=1) ? 1 : 0; }, // Turkmen
      'tr': function(n) { return 0; }, // Turkish
      'tt': function(n) { return 0; }, // Tatar

      'ug': function(n) { return 0; }, // Uyghur
      'uk': function(n) { return (n%10==1 && n%100!=11 ? 0 : n%10>=2 && n%10<=4 && (n%100<10 || n%100>=20) ? 1 : 2); }, // Ukrainian
      'ur': function(n) { return (n!=1) ? 1 : 0; }, // Urdu
      'uz': function(n) { return 0; }, // Uzbek

      'vi': function(n) { return 0; }, // Vietnamese

      'wa': function(n) { return (n>1) ? 1 : 0; }, // Walloon

      'zh': function(n) { return 0; }, // Chinese
      'zh-personal': function(n) { return (n>1) ? 1 : 0; } // Chinese, used in special cases when dealing with personal pronoun
    };

    //
    // Choose the plural function based on locale name
    //
    this.setLocale = function(locale) {
      this.plural = pluralEquations[locale];
    }; // function locale

    this.format = function(s, params, options) {
      if (typeof params != 'object') {
        throw new TypeError("'params' is not a hash");
      }

      if ((typeof options != 'undefined') && (typeof options != 'object')) {
        throw new TypeError("'options' is not a hash");
      }

      options = options || {};

      var pluralFunc = "locale" in options ?
        pluralEquations[options.locale] || pluralEquations.en :
        this.plural;

      addMissingOptions(options, defaultOptions);

      var strict = !!options.strict;
      var autoPlurals = !!options.autoPlurals;
      var callback = options.callback;

      var chunks = s.split(/([\{\}])/);
      var blocks = [''];
      var bracketCount = 0;
      for (var i = 0, chLen = chunks.length; i < chLen; i++) {
        var chunk = chunks[i];

        if (chunk == '{') {
          bracketCount++;
          blocks.push('');
          continue;
        }

        if (chunk == '}') {
          bracketCount--;
          if (bracketCount < 0) {
            throw new SyntaxError('Unmatched } found');
          }
          var block = blocks.pop();
          var colonPos = block.indexOf(':');

          if (strict && (colonPos == 0)) {
            throw new TypeError('Empty placeholder name');
          }

          var name;

          if (colonPos == -1) { // simple placeholder
            name = block;
          } else { // multiple choices
            name = block.substr(0, colonPos);
          }

          if (!(name in params)) {
            var pPos = name.indexOf(_PLURAL);
            if (autoPlurals && (pPos != -1) && (pPos == (name.length - _PLURAL.length))) {
              var prefix = name.substr(0, pPos);
              if (!(prefix in params)) {
                if (callback) {
                  params[prefix] = callback(prefix);
                } else if (strict) {
                  throw new TypeError(
                    "Neither '" + name + "' nor '" + prefix + "' are defined"
                  );
                }
              }

              var prefixValue = parseInt(params[prefix]);
              if (prefixValue != params[prefix] || (prefixValue < 0)) {
                if (strict) {
                  throw new RangeError(
                    "Value of '" + prefix + "' is not a zero or positive integer number"
                  );
                }
                prefixValue = 0;
              }

              params[name] = pluralFunc(prefixValue);
            } else {
              if (callback) {
                params[name] = callback(name);
              } else if (strict) {
                throw new TypeError("'" + name + "' not defined");
              }
            }
          }

          var result;

          if (colonPos == -1) { // simple placeholder
            result = params[name];
          } else { // multiple choices
            var blockLen = block.length;

            if (strict && (colonPos == blockLen - 1)) {
              throw new TypeError('Empty list of variants');
            }

            var choiceIdx = parseInt(params[name]);
            if (choiceIdx != params[name] || (choiceIdx < 0)) {
              if (strict) {
                throw new RangeError(
                  "Value of '" + name + "' is not a zero or positive integer number"
                );
              }
              choiceIdx = 0;
            }
            var n = 0;
            var choiceStart = colonPos + 1;
            var choiceEnd = blockLen;
            var j = -1;

            while ((j = block.indexOf('|', j + 1)) != -1) {
              n++;
              if (n <= choiceIdx) {
                choiceStart = j + 1;
              } else if (n == choiceIdx + 1) {
                choiceEnd = j;
              }
            }
            result = block.substr(choiceStart, choiceEnd - choiceStart);
          }

          blocks[blocks.length - 1] += result;
          continue;
        }
        blocks[blocks.length - 1] += chunk;
      }

      if (bracketCount > 0) {
        throw new SyntaxError('Unmatched { found');
      }

      return blocks[0];
    }; // function format

    // initialize with the provided or default locale ('en')
    this.setLocale(defaultOptions.locale || 'en');
  }

  return Plurr;
}));


/***/ }),

/***/ 412:
/***/ (function(module, exports) {

module.exports = "/web-frontend/35835432f9b74ee59619d0cdf0afba5a.svg";

/***/ }),

/***/ 431:
/***/ (function(module, exports) {

module.exports = "/web-frontend/dcedde68dba5e27c8808fcebd353e941.png";

/***/ }),

/***/ 432:
/***/ (function(module, exports) {

module.exports = "/web-frontend/27919a6ae8d6199c85574ab22f31e9da.png";

/***/ }),

/***/ 495:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _classnames = __webpack_require__(87);

var _classnames2 = _interopRequireDefault(_classnames);

var _react = __webpack_require__(8);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(96);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _i18n = __webpack_require__(12);

var _i18n2 = _interopRequireDefault(_i18n);

__webpack_require__(258);

var _close = __webpack_require__(245);

var _close2 = _interopRequireDefault(_close);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * A meter with equal-sized blocks showing progress. If the meter is empty, then it
 * shows progress text like "0/4".
 */
var Meter = function Meter(props) {
  var getMeterSteps = function getMeterSteps() {
    var colors = ['#75d996', '#5fd183', '#42c76a', '#20c05c'];

    return [].concat(_toConsumableArray(Array(props.total).keys())).map(function (i) {
      // Fill in completed blocks, left to right.
      if (i < props.numFilled) {
        // This step has been completed - fill it.
        return colors[i % colors.length];
      } else {
        // Unfilled block - leave it "blank".
        return '#fff';
      }
    }).map(function (backgroundColor, index) {
      return _react2.default.createElement('div', { key: index, style: { backgroundColor: backgroundColor }, className: 'BobFleChecklist-step' });
    });
  };

  var content = void 0;
  if (props.numFilled) {
    content = getMeterSteps();
  } else {
    var ratioString = '0/' + props.total;
    content = _react2.default.createElement(
      'div',
      { className: 'BobFleChecklist-ratio-text' },
      ratioString
    );
  }

  return _react2.default.createElement(
    'div',
    { className: 'BobFleChecklist-meter' },
    content
  );
};

Meter.propTypes = {
  numFilled: _react2.default.PropTypes.number.isRequired,
  total: _react2.default.PropTypes.number.isRequired
};

/**
 * An item in the checklist. Each item has a click handler and a "strikethrough" state.
 */
var ChecklistItem = function ChecklistItem(props) {
  var headingClasses = (0, _classnames2.default)({
    'BobFleChecklist-complete': props.complete
  });
  var getTryItButton = function getTryItButton() {
    if (props.upNext) {
      return _react2.default.createElement(
        'p',
        { className: 'BobFleChecklist-tryIt', onClick: props.onClick },
        _react2.default.createElement(
          'span',
          null,
          _i18n2.default.localize('Focus.bobFleChecklist.tryIt')
        )
      );
    } else {
      return null;
    }
  };

  return _react2.default.createElement(
    'li',
    { className: headingClasses },
    _react2.default.createElement(
      'div',
      { className: 'BobFleChecklist-checklist-item' },
      _react2.default.createElement(
        'h2',
        { className: headingClasses, onClick: props.onClick },
        _react2.default.createElement(
          'span',
          null,
          props.header
        )
      ),
      _react2.default.createElement(
        'p',
        null,
        props.description
      ),
      getTryItButton()
    )
  );
};

ChecklistItem.propTypes = {
  complete: _react2.default.PropTypes.bool.isRequired,
  description: _react2.default.PropTypes.string.isRequired,
  header: _react2.default.PropTypes.string.isRequired,
  onClick: _react2.default.PropTypes.func.isRequired,
  stepNumber: _react2.default.PropTypes.number.isRequired,
  upNext: _react2.default.PropTypes.bool.isRequired
};

var DisclosableHeader = function DisclosableHeader(props) {
  var headerClasses = (0, _classnames2.default)('BobFleChecklist-DisclosableHeader-header', {
    'BobFleChecklist-DisclosableHeader-expanded': props.expanded
  });

  var onDismiss = function onDismiss(event) {
    props.onDismiss();
    event.stopPropagation();
  };

  var getDismissButton = function getDismissButton() {
    if (props.showDismiss) {
      return _react2.default.createElement('div', {
        className: 'BobFleChecklist-close',
        onClick: function onClick(e) {
          return onDismiss(e);
        },
        dangerouslySetInnerHTML: { __html: _close2.default }
      });
    } else {
      return null;
    }
  };

  return _react2.default.createElement(
    'div',
    { className: headerClasses, onClick: function onClick() {
        return props.onToggleHidden();
      } },
    _react2.default.createElement(
      'div',
      { className: 'BobFleChecklist-DisclosableHeader-title' },
      _i18n2.default.localize('Focus.bobFleChecklist.sectionHeader'),
      getDismissButton()
    )
  );
};

DisclosableHeader.propTypes = {
  expanded: _react2.default.PropTypes.bool.isRequired,
  onDismiss: _react2.default.PropTypes.func.isRequired,
  onToggleHidden: _react2.default.PropTypes.func.isRequired,
  showDismiss: _react2.default.PropTypes.bool.isRequired
};

/**
 * A checklist that BoB users can interact with to learn more about the webclient
 * and Evernote.
 */

var BobFleChecklist = function (_React$Component) {
  _inherits(BobFleChecklist, _React$Component);

  function BobFleChecklist(props) {
    _classCallCheck(this, BobFleChecklist);

    var _this = _possibleConstructorReturn(this, (BobFleChecklist.__proto__ || Object.getPrototypeOf(BobFleChecklist)).call(this, props));

    _this.state = {
      minimized: false
    };
    return _this;
  }

  _createClass(BobFleChecklist, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.reportHeight();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.reportHeight();
    }
  }, {
    key: 'reportHeight',
    value: function reportHeight() {
      var node = _reactDom2.default.findDOMNode(this);
      if (node) {
        this.props.onHeightUpdated(node.offsetHeight);
      }
    }
  }, {
    key: 'toggleHidden',
    value: function toggleHidden() {
      var minimized = !this.state.minimized;
      if (minimized) {
        this.props.onMinimize();
      } else {
        this.props.onExpand();
      }
      this.setState({ minimized: minimized });
    }
  }, {
    key: 'getDisclosableHeader',
    value: function getDisclosableHeader() {
      var _this2 = this;

      return _react2.default.createElement(DisclosableHeader, {
        expanded: !this.state.minimized,
        onDismiss: function onDismiss() {
          return _this2.props.onDismiss();
        },
        onToggleHidden: function onToggleHidden() {
          return _this2.toggleHidden();
        },
        showDismiss: this.getNumStepsDone() >= this.props.steps.length
      });
    }
  }, {
    key: 'getNumStepsDone',
    value: function getNumStepsDone() {
      var boolToNum = function boolToNum(bool) {
        return bool ? 1 : 0;
      };
      return this.props.steps.reduce(function (done, step) {
        return done + boolToNum(step.done);
      }, 0);
    }
  }, {
    key: 'getMinimizedMessage',
    value: function getMinimizedMessage() {
      var baseKey = 'Focus.bobFleChecklist.minimized.upNext';
      // Must not use a for-of loop for GWT compatibility - see ENB-1446.
      for (var i = 0; i < this.props.steps.length; i++) {
        var step = this.props.steps[i];
        if (!step.done) {
          return _i18n2.default.localize(baseKey, [_i18n2.default.localize(step.headerKey)]);
        }
      }
      return _i18n2.default.localize('Focus.bobFleChecklist.minimized.complete');
    }
  }, {
    key: 'getHeaderMessage',
    value: function getHeaderMessage() {
      if (this.getNumStepsDone() >= this.props.steps.length) {
        return _i18n2.default.localize(this.props.headerCompleteKey);
      } else {
        return _i18n2.default.localize(this.props.headerKey);
      }
    }
  }, {
    key: 'getNextTask',
    value: function getNextTask() {
      for (var i = 0; i < this.props.steps.length; i++) {
        if (!this.props.steps[i].done) {
          return i;
        }
      }
      return -1;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var meter = _react2.default.createElement(Meter, { numFilled: this.getNumStepsDone(), total: this.props.steps.length });

      if (this.state.minimized) {
        return _react2.default.createElement(
          'div',
          { className: 'BobFleChecklist-root' },
          this.getDisclosableHeader(),
          _react2.default.createElement(
            'h3',
            null,
            this.getMinimizedMessage()
          ),
          meter
        );
      } else {
        var upNext = this.getNextTask();
        var listItems = this.props.steps.map(function (step, index) {
          return _react2.default.createElement(ChecklistItem, {
            complete: step.done,
            description: _i18n2.default.localize(step.descriptionKey),
            header: _i18n2.default.localize(step.headerKey),
            onClick: function onClick() {
              _this3.props.onStartStep(index);
              step.onClick();
            },
            stepNumber: index + 1,
            upNext: index === upNext,
            key: (index + 1).toString()
          });
        });
        return _react2.default.createElement(
          'div',
          { className: 'BobFleChecklist-root' },
          this.getDisclosableHeader(),
          _react2.default.createElement(
            'h1',
            null,
            this.getHeaderMessage()
          ),
          meter,
          _react2.default.createElement(
            'ul',
            null,
            listItems
          )
        );
      }
    }
  }]);

  return BobFleChecklist;
}(_react2.default.Component);

BobFleChecklist.propTypes = {
  headerCompleteKey: _react2.default.PropTypes.string.isRequired,
  headerKey: _react2.default.PropTypes.string.isRequired,
  onDismiss: _react2.default.PropTypes.func.isRequired,
  onExpand: _react2.default.PropTypes.func.isRequired,
  onHeightUpdated: _react2.default.PropTypes.func.isRequired,
  onMinimize: _react2.default.PropTypes.func.isRequired,
  onStartStep: _react2.default.PropTypes.func.isRequired,
  steps: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.shape({
    onClick: _react2.default.PropTypes.func.isRequired,
    done: _react2.default.PropTypes.bool.isRequired,
    descriptionKey: _react2.default.PropTypes.string.isRequired,
    headerKey: _react2.default.PropTypes.string.isRequired
  })).isRequired
};
exports.default = BobFleChecklist;
module.exports = exports['default'];

/***/ }),

/***/ 8:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_8__;

/***/ }),

/***/ 87:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
  Copyright (c) 2016 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	'use strict';

	var hasOwn = {}.hasOwnProperty;

	function classNames () {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg)) {
				classes.push(classNames.apply(null, arg));
			} else if (argType === 'object') {
				for (var key in arg) {
					if (hasOwn.call(arg, key) && arg[key]) {
						classes.push(key);
					}
				}
			}
		}

		return classes.join(' ');
	}

	if (typeof module !== 'undefined' && module.exports) {
		module.exports = classNames;
	} else if (true) {
		// register as 'classnames', consistent with npm package name
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
			return classNames;
		}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {
		window.classNames = classNames;
	}
}());


/***/ }),

/***/ 96:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_96__;

/***/ })

/******/ })});;