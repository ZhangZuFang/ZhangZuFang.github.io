define("focusBusinessJoinFleDialog", ["react","stringAffixer"], function(__WEBPACK_EXTERNAL_MODULE_8__, __WEBPACK_EXTERNAL_MODULE_23__) { return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 497);
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

/***/ 23:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_23__;

/***/ }),

/***/ 260:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(333);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(15)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/less-loader/index.js?{\"relativeUrls\":false}!./businessJoinFleDialog.less", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/less-loader/index.js?{\"relativeUrls\":false}!./businessJoinFleDialog.less");
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

/***/ 333:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(14)();
// imports


// module
exports.push([module.i, ".a11y-only {\n  /* http://www.coolfields.co.uk/2016/05/text-for-screen-readers-only-updated/ */\n  clip: rect(1px, 1px, 1px, 1px);\n  height: 1px;\n  width: 1px;\n  overflow: hidden;\n  position: absolute !important;\n}\n/* \"Evernote Green\" */\n.FocusBusinessJoinFleDialog-container {\n  width: 100%;\n  text-align: center;\n  position: absolute;\n  background-color: #FFFFFF;\n}\n.FocusBusinessJoinFleDialog-container h1 {\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  font-family: caecilia, times, serif;\n  font-size: 28px;\n  font-weight: 300;\n  line-height: 32px;\n  color: #2dbe60;\n  margin: 64px 16px 0;\n  font-weight: 400;\n  color: #4a4a4a;\n  margin: 20px 0;\n}\n.FocusBusinessJoinFleDialog-container p {\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  font-family: gotham, helvetica, arial, sans-serif;\n  font-weight: 400;\n  font-size: 15px;\n  line-height: 21px;\n  margin: 13px 16px 0;\n  color: #606060;\n  margin: 20px 0;\n  padding: 0px 20px;\n}\n.FocusBusinessJoinFleDialog-container button {\n  min-width: 190px;\n  background-color: #2dbe60;\n  border: none;\n  border-radius: 5px;\n  outline: none;\n  padding: 0 14px;\n  color: white;\n  line-height: 38px;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  font-family: gotham, helvetica, arial, sans-serif;\n  font-size: 13px;\n  font-weight: 500;\n  cursor: pointer;\n  border-radius: 3px;\n  padding: 0 50px;\n  margin: 30px 0;\n}\n.FocusBusinessJoinFleDialog-container button:hover {\n  background-color: #28a955;\n}\n.FocusBusinessJoinFleDialog-container button:active {\n  background-color: #23944b;\n}\n.FocusBusinessJoinFleDialog-container .FocusBusinessJoinFleDialog-office-space-business {\n  height: 190px;\n  margin-top: 20px;\n}\n@media all {\n  .FocusBusinessJoinFleDialog-container .FocusBusinessJoinFleDialog-office-space-business {\n    background:  url(" + __webpack_require__(428) + ") center no-repeat;\n    background-size: 420px 220px;\n  }\n}\n@media all and (-moz-min-device-pixel-ratio: 1.5), all and (-o-min-device-pixel-ratio: 3/2), all and (-webkit-min-device-pixel-ratio: 1.5), all and (min-device-pixel-ratio: 1.5), all and (min-resolution: 1.5dppx) {\n  .FocusBusinessJoinFleDialog-container .FocusBusinessJoinFleDialog-office-space-business {\n    background:  url(" + __webpack_require__(429) + ") center no-repeat;\n    background-size: 420px 220px;\n  }\n}\n@media all and (-moz-min-device-pixel-ratio: 1.5), all and (-o-min-device-pixel-ratio: 3/2), all and (-webkit-min-device-pixel-ratio: 1.5), all and (min-device-pixel-ratio: 1.5), all and (min-resolution: 1.5dppx) and (-moz-min-device-pixel-ratio: 1.5), all and (-moz-min-device-pixel-ratio: 1.5), all and (-o-min-device-pixel-ratio: 3/2), all and (-webkit-min-device-pixel-ratio: 1.5), all and (min-device-pixel-ratio: 1.5), all and (min-resolution: 1.5dppx) and (-o-min-device-pixel-ratio: 3/2), all and (-moz-min-device-pixel-ratio: 1.5), all and (-o-min-device-pixel-ratio: 3/2), all and (-webkit-min-device-pixel-ratio: 1.5), all and (min-device-pixel-ratio: 1.5), all and (min-resolution: 1.5dppx) and (-webkit-min-device-pixel-ratio: 1.5), all and (-moz-min-device-pixel-ratio: 1.5), all and (-o-min-device-pixel-ratio: 3/2), all and (-webkit-min-device-pixel-ratio: 1.5), all and (min-device-pixel-ratio: 1.5), all and (min-resolution: 1.5dppx) and (min-device-pixel-ratio: 1.5), all and (-moz-min-device-pixel-ratio: 1.5), all and (-o-min-device-pixel-ratio: 3/2), all and (-webkit-min-device-pixel-ratio: 1.5), all and (min-device-pixel-ratio: 1.5), all and (min-resolution: 1.5dppx) and (min-resolution: 1.5dppx) {\n  .FocusBusinessJoinFleDialog-container .FocusBusinessJoinFleDialog-office-space-business {\n    background:  url(" + __webpack_require__(430) + ") center no-repeat;\n    background-size: 420px 220px;\n  }\n}\n", ""]);

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

/***/ 428:
/***/ (function(module, exports) {

module.exports = "/web-frontend/9f920c5369cfe1e230411b2eb126816e.png";

/***/ }),

/***/ 429:
/***/ (function(module, exports) {

module.exports = "/web-frontend/f9fa81e3c0c8560cf1de7480f5d11f35.png";

/***/ }),

/***/ 430:
/***/ (function(module, exports) {

module.exports = "/web-frontend/fdb37313c557f6834bf9edd34e6d9995.png";

/***/ }),

/***/ 497:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = BusinessJoinFleDialog;

var _react = __webpack_require__(8);

var _react2 = _interopRequireDefault(_react);

var _i18n = __webpack_require__(12);

var _i18n2 = _interopRequireDefault(_i18n);

var _stringAffixer = __webpack_require__(23);

__webpack_require__(260);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cssPrefixed = (0, _stringAffixer.getCssPrefixer)('FocusBusinessJoinFleDialog');

/**
 * A dialog presented to a user after they have successfully joined a business.
 */
function BusinessJoinFleDialog(props) {
  var existingUser = !!props.personalAccountEmail;
  var dialogText = existingUser ? _i18n2.default.localize('Focus.businessFirstLaunchDialogView.existingUser.text', [props.businessAccountEmail, props.personalAccountEmail]) : _i18n2.default.localize('Focus.businessFirstLaunchDialogView.newUser.text');
  var btnText = existingUser ? _i18n2.default.localize('Focus.businessFirstLaunchDialogView.existingUser.continue', [props.businessAccountEmail, props.personalAccountEmail]) : _i18n2.default.localize('Focus.businessFirstLaunchDialogView.newUser.continue');

  return _react2.default.createElement(
    'div',
    { className: cssPrefixed('container') },
    _react2.default.createElement('div', { className: cssPrefixed('office-space-business') }),
    _react2.default.createElement(
      'h1',
      null,
      _i18n2.default.localize('Focus.businessFirstLaunchDialogView.welcomeHeader')
    ),
    _react2.default.createElement(
      'p',
      null,
      dialogText
    ),
    _react2.default.createElement(
      'button',
      { onClick: props.onClose },
      btnText
    )
  );
}

BusinessJoinFleDialog.propTypes = {
  businessAccountEmail: _react2.default.PropTypes.string,
  onClose: _react2.default.PropTypes.func.isRequired,
  personalAccountEmail: _react2.default.PropTypes.string
};
module.exports = exports['default'];

/***/ }),

/***/ 8:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_8__;

/***/ })

/******/ })});;