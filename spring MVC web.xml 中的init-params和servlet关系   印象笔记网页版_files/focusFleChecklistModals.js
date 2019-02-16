define("focusFleChecklistModals", ["react","stringAffixer"], function(__WEBPACK_EXTERNAL_MODULE_8__, __WEBPACK_EXTERNAL_MODULE_23__) { return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 500);
/******/ })
/************************************************************************/
/******/ ({

/***/ 107:
/***/ (function(module, exports) {

module.exports = "<svg width=\"48px\" height=\"48px\" viewBox=\"0 0 48 48\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n    <defs></defs>\n    <g stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\">\n        <g transform=\"translate(-2500.000000, -250.000000)\">\n            <g transform=\"translate(2500.000000, 250.000000)\">\n                <polygon fill-opacity=\"0\" fill=\"#FFCF57\" points=\"0 0 48 0 48 48 0 48\"></polygon>\n                <path d=\"M38.728,11.394 L26.122,24 L38.728,36.606 C39.314,37.192 39.314,38.142 38.728,38.728 C38.142,39.314 37.192,39.314 36.606,38.728 L24,26.122 L11.394,38.728 C10.808,39.314 9.858,39.314 9.272,38.728 C8.686,38.142 8.686,37.192 9.272,36.606 L21.878,24 L9.272,11.394 C8.686,10.808 8.686,9.858 9.272,9.272 C9.858,8.686 10.808,8.686 11.394,9.272 L24,21.878 L36.606,9.272 C37.192,8.686 38.142,8.686 38.728,9.272 C39.314,9.858 39.314,10.808 38.728,11.394 L38.728,11.394 Z\" fill=\"#000000\"></path>\n            </g>\n        </g>\n    </g>\n</svg>\n"

/***/ }),

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

/***/ 161:
/***/ (function(module, exports) {

module.exports = "/web-frontend/81bec76c847db4d00eecd1a38a2c3970.svg";

/***/ }),

/***/ 175:
/***/ (function(module, exports) {

module.exports = "/web-frontend/eb3cac46a44fadd01d3eb362b246fc0a.png";

/***/ }),

/***/ 176:
/***/ (function(module, exports) {

module.exports = "/web-frontend/90eb237d252f7d992cd5bbd3bd7bfdd0.png";

/***/ }),

/***/ 177:
/***/ (function(module, exports) {

module.exports = "/web-frontend/e144e1e48d45274df1f946de25947848.png";

/***/ }),

/***/ 178:
/***/ (function(module, exports) {

module.exports = "/web-frontend/7b1fc5d69b0e4d8c20dc893f83657a2e.png";

/***/ }),

/***/ 190:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = AppStoreBadge;

var _react = __webpack_require__(8);

var _react2 = _interopRequireDefault(_react);

var _stringAffixer = __webpack_require__(23);

__webpack_require__(449);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cssPrefixed = (0, _stringAffixer.getCssPrefixer)('AppStoreBadge');

/**
 * Localizable app store badges for Apple or Google. Badges are rendered at 135x40.
 */
/* eslint-env browser */

function AppStoreBadge(props) {
  function getLocale() {
    // Try to get the locale from a meta tag added to all Evernote service pages.
    var metaLocale = typeof document !== 'undefined' && document.querySelector('meta[name="en:locale"]');
    return metaLocale && metaLocale.content || props.locale || 'en';
  }

  var className = cssPrefixed('badge', props.storeType, getLocale());
  return _react2.default.createElement('div', { className: className, onClick: function onClick(e) {
      return props.onClick && props.onClick(e);
    } });
}

AppStoreBadge.propTypes = {
  /* If empty, the component will check for an "en:locale" meta tag. Failing that, it will
   * default to English. */
  locale: _react2.default.PropTypes.string,
  onClick: _react2.default.PropTypes.func,
  storeType: _react2.default.PropTypes.oneOf(['apple', 'google']).isRequired
};
module.exports = exports['default'];

/***/ }),

/***/ 23:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_23__;

/***/ }),

/***/ 262:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(335);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(15)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/less-loader/index.js?{\"relativeUrls\":false}!./fleChecklistModals.less", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/less-loader/index.js?{\"relativeUrls\":false}!./fleChecklistModals.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 297:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(14)();
// imports


// module
exports.push([module.i, ".a11y-only {\n  /* http://www.coolfields.co.uk/2016/05/text-for-screen-readers-only-updated/ */\n  clip: rect(1px, 1px, 1px, 1px);\n  height: 1px;\n  width: 1px;\n  overflow: hidden;\n  position: absolute !important;\n}\n.AppStoreBadge-badge {\n  background-repeat: no-repeat;\n  width: 135px;\n  height: 40px;\n}\n.AppStoreBadge-badge.AppStoreBadge-apple {\n  background-image: url(" + __webpack_require__(347) + ");\n  background-size: 135px 40px;\n}\n.AppStoreBadge-badge.AppStoreBadge-apple.AppStoreBadge-ar {\n  background-image: url(" + __webpack_require__(343) + ");\n}\n.AppStoreBadge-badge.AppStoreBadge-apple.AppStoreBadge-cs {\n  background-image: url(" + __webpack_require__(344) + ");\n}\n.AppStoreBadge-badge.AppStoreBadge-apple.AppStoreBadge-da {\n  background-image: url(" + __webpack_require__(345) + ");\n}\n.AppStoreBadge-badge.AppStoreBadge-apple.AppStoreBadge-de {\n  background-image: url(" + __webpack_require__(346) + ");\n}\n.AppStoreBadge-badge.AppStoreBadge-apple.AppStoreBadge-es {\n  background-image: url(" + __webpack_require__(348) + ");\n}\n.AppStoreBadge-badge.AppStoreBadge-apple.AppStoreBadge-fi {\n  background-image: url(" + __webpack_require__(349) + ");\n}\n.AppStoreBadge-badge.AppStoreBadge-apple.AppStoreBadge-fr {\n  background-image: url(" + __webpack_require__(350) + ");\n}\n.AppStoreBadge-badge.AppStoreBadge-apple.AppStoreBadge-in {\n  background-image: url(" + __webpack_require__(351) + ");\n}\n.AppStoreBadge-badge.AppStoreBadge-apple.AppStoreBadge-it {\n  background-image: url(" + __webpack_require__(352) + ");\n}\n.AppStoreBadge-badge.AppStoreBadge-apple.AppStoreBadge-ja {\n  background-image: url(" + __webpack_require__(353) + ");\n}\n.AppStoreBadge-badge.AppStoreBadge-apple.AppStoreBadge-ko {\n  background-image: url(" + __webpack_require__(354) + ");\n}\n.AppStoreBadge-badge.AppStoreBadge-apple.AppStoreBadge-ms {\n  background-image: url(" + __webpack_require__(355) + ");\n}\n.AppStoreBadge-badge.AppStoreBadge-apple.AppStoreBadge-nl {\n  background-image: url(" + __webpack_require__(356) + ");\n}\n.AppStoreBadge-badge.AppStoreBadge-apple.AppStoreBadge-no {\n  background-image: url(" + __webpack_require__(357) + ");\n}\n.AppStoreBadge-badge.AppStoreBadge-apple.AppStoreBadge-pl {\n  background-image: url(" + __webpack_require__(358) + ");\n}\n.AppStoreBadge-badge.AppStoreBadge-apple.AppStoreBadge-pt {\n  background-image: url(" + __webpack_require__(359) + ");\n}\n.AppStoreBadge-badge.AppStoreBadge-apple.AppStoreBadge-pt_BR {\n  background-image: url(" + __webpack_require__(360) + ");\n}\n.AppStoreBadge-badge.AppStoreBadge-apple.AppStoreBadge-ru {\n  background-image: url(" + __webpack_require__(361) + ");\n}\n.AppStoreBadge-badge.AppStoreBadge-apple.AppStoreBadge-sv {\n  background-image: url(" + __webpack_require__(362) + ");\n}\n.AppStoreBadge-badge.AppStoreBadge-apple.AppStoreBadge-th {\n  background-image: url(" + __webpack_require__(363) + ");\n}\n.AppStoreBadge-badge.AppStoreBadge-apple.AppStoreBadge-tr {\n  background-image: url(" + __webpack_require__(364) + ");\n}\n.AppStoreBadge-badge.AppStoreBadge-apple.AppStoreBadge-vi {\n  background-image: url(" + __webpack_require__(365) + ");\n}\n.AppStoreBadge-badge.AppStoreBadge-apple.AppStoreBadge-zh_CN {\n  background-image: url(" + __webpack_require__(161) + ");\n}\n.AppStoreBadge-badge.AppStoreBadge-apple.AppStoreBadge-zh_CN_evernoteChina {\n  background-image: url(" + __webpack_require__(161) + ");\n}\n.AppStoreBadge-badge.AppStoreBadge-apple.AppStoreBadge-zh_TW {\n  background-image: url(" + __webpack_require__(366) + ");\n}\n.AppStoreBadge-badge.AppStoreBadge-google {\n  background-image: url(" + __webpack_require__(371) + ");\n  background-size: 155px 60px;\n  background-position: -10px -10px;\n}\n.AppStoreBadge-badge.AppStoreBadge-google.AppStoreBadge-ar {\n  background-image: url(" + __webpack_require__(367) + ");\n}\n.AppStoreBadge-badge.AppStoreBadge-google.AppStoreBadge-cs {\n  background-image: url(" + __webpack_require__(368) + ");\n}\n.AppStoreBadge-badge.AppStoreBadge-google.AppStoreBadge-da {\n  background-image: url(" + __webpack_require__(369) + ");\n}\n.AppStoreBadge-badge.AppStoreBadge-google.AppStoreBadge-de {\n  background-image: url(" + __webpack_require__(370) + ");\n}\n.AppStoreBadge-badge.AppStoreBadge-google.AppStoreBadge-es {\n  background-image: url(" + __webpack_require__(372) + ");\n}\n.AppStoreBadge-badge.AppStoreBadge-google.AppStoreBadge-fr {\n  background-image: url(" + __webpack_require__(373) + ");\n}\n.AppStoreBadge-badge.AppStoreBadge-google.AppStoreBadge-in {\n  background-image: url(" + __webpack_require__(374) + ");\n}\n.AppStoreBadge-badge.AppStoreBadge-google.AppStoreBadge-it {\n  background-image: url(" + __webpack_require__(375) + ");\n}\n.AppStoreBadge-badge.AppStoreBadge-google.AppStoreBadge-ja {\n  background-image: url(" + __webpack_require__(376) + ");\n}\n.AppStoreBadge-badge.AppStoreBadge-google.AppStoreBadge-ko {\n  background-image: url(" + __webpack_require__(377) + ");\n}\n.AppStoreBadge-badge.AppStoreBadge-google.AppStoreBadge-ms {\n  background-image: url(" + __webpack_require__(378) + ");\n}\n.AppStoreBadge-badge.AppStoreBadge-google.AppStoreBadge-nl {\n  background-image: url(" + __webpack_require__(379) + ");\n}\n.AppStoreBadge-badge.AppStoreBadge-google.AppStoreBadge-no {\n  background-image: url(" + __webpack_require__(380) + ");\n}\n.AppStoreBadge-badge.AppStoreBadge-google.AppStoreBadge-pl {\n  background-image: url(" + __webpack_require__(381) + ");\n}\n.AppStoreBadge-badge.AppStoreBadge-google.AppStoreBadge-pt,\n.AppStoreBadge-badge.AppStoreBadge-google.AppStoreBadge-pt_BR {\n  background-image: url(" + __webpack_require__(382) + ");\n}\n.AppStoreBadge-badge.AppStoreBadge-google.AppStoreBadge-ru {\n  background-image: url(" + __webpack_require__(383) + ");\n}\n.AppStoreBadge-badge.AppStoreBadge-google.AppStoreBadge-sv {\n  background-image: url(" + __webpack_require__(384) + ");\n}\n.AppStoreBadge-badge.AppStoreBadge-google.AppStoreBadge-th {\n  background-image: url(" + __webpack_require__(385) + ");\n}\n.AppStoreBadge-badge.AppStoreBadge-google.AppStoreBadge-tr {\n  background-image: url(" + __webpack_require__(386) + ");\n}\n.AppStoreBadge-badge.AppStoreBadge-google.AppStoreBadge-vi {\n  background-image: url(" + __webpack_require__(387) + ");\n}\n.AppStoreBadge-badge.AppStoreBadge-google.AppStoreBadge-zh_CN {\n  background-image: url(" + __webpack_require__(388) + ");\n}\n.AppStoreBadge-badge.AppStoreBadge-google.AppStoreBadge-zh_CN_evernoteChina {\n  background-image: url(" + __webpack_require__(389) + ");\n  background-size: 135px 40px;\n  background-position: 0 0;\n}\n.AppStoreBadge-badge.AppStoreBadge-google.AppStoreBadge-zh_TW {\n  background-image: url(" + __webpack_require__(390) + ");\n}\n", ""]);

// exports


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

/***/ 335:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(14)();
// imports


// module
exports.push([module.i, ".a11y-only {\n  /* http://www.coolfields.co.uk/2016/05/text-for-screen-readers-only-updated/ */\n  clip: rect(1px, 1px, 1px, 1px);\n  height: 1px;\n  width: 1px;\n  overflow: hidden;\n  position: absolute !important;\n}\n/* \"Evernote Green\" */\n.FleChecklistModals-root {\n  position: relative;\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  text-align: center;\n  color: #383838;\n  background-image: linear-gradient(180deg, #f8f8f8, #f8f8f8 57%, white 57%);\n}\n.FleChecklistModals-root .FleChecklistModals-close {\n  position: absolute;\n  top: 20px;\n  right: 20px;\n  width: 20px;\n  height: 20px;\n  cursor: pointer;\n}\n.FleChecklistModals-root .FleChecklistModals-close svg {\n  width: 20px;\n  height: 20px;\n}\n.FleChecklistModals-root .FleChecklistModals-close path {\n  fill: #4a4a4a;\n}\n.FleChecklistModals-root h1 {\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  font-family: caecilia, times, serif;\n  font-size: 28px;\n  font-weight: 300;\n  line-height: 32px;\n  color: #2dbe60;\n  margin: 64px 16px 0;\n}\n.FleChecklistModals-root p {\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  font-family: gotham, helvetica, arial, sans-serif;\n  font-weight: 400;\n  font-size: 15px;\n  line-height: 21px;\n  margin: 13px 16px 0;\n}\n.FleChecklistModals-root h4 {\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  font-family: gotham, helvetica, arial, sans-serif;\n  font-weight: 400;\n  font-size: 15px;\n  line-height: 21px;\n  margin: 20px 32px 0;\n  min-height: 64px;\n}\n.FleChecklistModals-root button {\n  min-width: 190px;\n  background-color: #2dbe60;\n  border: none;\n  border-radius: 5px;\n  outline: none;\n  padding: 0 14px;\n  color: white;\n  line-height: 38px;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  font-family: gotham, helvetica, arial, sans-serif;\n  font-size: 13px;\n  font-weight: 500;\n  cursor: pointer;\n}\n.FleChecklistModals-root button:hover {\n  background-color: #28a955;\n}\n.FleChecklistModals-root button:active {\n  background-color: #23944b;\n}\n.FleChecklistModals-root .FleChecklistModals-options {\n  display: flex;\n  justify-content: space-around;\n  position: absolute;\n  top: 57%;\n  right: 16px;\n  left: 16px;\n}\n.FleChecklistModals-root .FleChecklistModals-options > div {\n  position: relative;\n  top: -150px;\n  max-width: 370px;\n  min-width: 300px;\n}\n.FleChecklistModals-root .FleChecklistModals-badges {\n  display: flex;\n  justify-content: center;\n}\n.FleChecklistModals-root .FleChecklistModals-badges > div {\n  cursor: pointer;\n  margin: 0 2px;\n}\n.FleChecklistModals-root .FleChecklistModals-reminders-step-one {\n  height: 150px;\n}\n@media all {\n  .FleChecklistModals-root .FleChecklistModals-reminders-step-one {\n    background:  url(" + __webpack_require__(435) + ") center no-repeat;\n    background-size: 300px 150px;\n  }\n}\n@media all and (-moz-min-device-pixel-ratio: 1.5), all and (-o-min-device-pixel-ratio: 3/2), all and (-webkit-min-device-pixel-ratio: 1.5), all and (min-device-pixel-ratio: 1.5), all and (min-resolution: 1.5dppx) {\n  .FleChecklistModals-root .FleChecklistModals-reminders-step-one {\n    background:  url(" + __webpack_require__(177) + ") center no-repeat;\n    background-size: 300px 150px;\n  }\n}\n@media all and (-moz-min-device-pixel-ratio: 1.5), all and (-o-min-device-pixel-ratio: 3/2), all and (-webkit-min-device-pixel-ratio: 1.5), all and (min-device-pixel-ratio: 1.5), all and (min-resolution: 1.5dppx) and (-moz-min-device-pixel-ratio: 1.5), all and (-moz-min-device-pixel-ratio: 1.5), all and (-o-min-device-pixel-ratio: 3/2), all and (-webkit-min-device-pixel-ratio: 1.5), all and (min-device-pixel-ratio: 1.5), all and (min-resolution: 1.5dppx) and (-o-min-device-pixel-ratio: 3/2), all and (-moz-min-device-pixel-ratio: 1.5), all and (-o-min-device-pixel-ratio: 3/2), all and (-webkit-min-device-pixel-ratio: 1.5), all and (min-device-pixel-ratio: 1.5), all and (min-resolution: 1.5dppx) and (-webkit-min-device-pixel-ratio: 1.5), all and (-moz-min-device-pixel-ratio: 1.5), all and (-o-min-device-pixel-ratio: 3/2), all and (-webkit-min-device-pixel-ratio: 1.5), all and (min-device-pixel-ratio: 1.5), all and (min-resolution: 1.5dppx) and (min-device-pixel-ratio: 1.5), all and (-moz-min-device-pixel-ratio: 1.5), all and (-o-min-device-pixel-ratio: 3/2), all and (-webkit-min-device-pixel-ratio: 1.5), all and (min-device-pixel-ratio: 1.5), all and (min-resolution: 1.5dppx) and (min-resolution: 1.5dppx) {\n  .FleChecklistModals-root .FleChecklistModals-reminders-step-one {\n    background:  url(" + __webpack_require__(177) + ") center no-repeat;\n    background-size: 300px 150px;\n  }\n}\n.FleChecklistModals-root .FleChecklistModals-reminders-step-two {\n  height: 150px;\n}\n@media all {\n  .FleChecklistModals-root .FleChecklistModals-reminders-step-two {\n    background:  url(" + __webpack_require__(436) + ") center no-repeat;\n    background-size: 300px 150px;\n  }\n}\n@media all and (-moz-min-device-pixel-ratio: 1.5), all and (-o-min-device-pixel-ratio: 3/2), all and (-webkit-min-device-pixel-ratio: 1.5), all and (min-device-pixel-ratio: 1.5), all and (min-resolution: 1.5dppx) {\n  .FleChecklistModals-root .FleChecklistModals-reminders-step-two {\n    background:  url(" + __webpack_require__(178) + ") center no-repeat;\n    background-size: 300px 150px;\n  }\n}\n@media all and (-moz-min-device-pixel-ratio: 1.5), all and (-o-min-device-pixel-ratio: 3/2), all and (-webkit-min-device-pixel-ratio: 1.5), all and (min-device-pixel-ratio: 1.5), all and (min-resolution: 1.5dppx) and (-moz-min-device-pixel-ratio: 1.5), all and (-moz-min-device-pixel-ratio: 1.5), all and (-o-min-device-pixel-ratio: 3/2), all and (-webkit-min-device-pixel-ratio: 1.5), all and (min-device-pixel-ratio: 1.5), all and (min-resolution: 1.5dppx) and (-o-min-device-pixel-ratio: 3/2), all and (-moz-min-device-pixel-ratio: 1.5), all and (-o-min-device-pixel-ratio: 3/2), all and (-webkit-min-device-pixel-ratio: 1.5), all and (min-device-pixel-ratio: 1.5), all and (min-resolution: 1.5dppx) and (-webkit-min-device-pixel-ratio: 1.5), all and (-moz-min-device-pixel-ratio: 1.5), all and (-o-min-device-pixel-ratio: 3/2), all and (-webkit-min-device-pixel-ratio: 1.5), all and (min-device-pixel-ratio: 1.5), all and (min-resolution: 1.5dppx) and (min-device-pixel-ratio: 1.5), all and (-moz-min-device-pixel-ratio: 1.5), all and (-o-min-device-pixel-ratio: 3/2), all and (-webkit-min-device-pixel-ratio: 1.5), all and (min-device-pixel-ratio: 1.5), all and (min-resolution: 1.5dppx) and (min-resolution: 1.5dppx) {\n  .FleChecklistModals-root .FleChecklistModals-reminders-step-two {\n    background:  url(" + __webpack_require__(178) + ") center no-repeat;\n    background-size: 300px 150px;\n  }\n}\n.FleChecklistModals-root .FleChecklistModals-native-option-desktop {\n  height: 150px;\n}\n@media all {\n  .FleChecklistModals-root .FleChecklistModals-native-option-desktop {\n    background:  url(" + __webpack_require__(433) + ") center no-repeat;\n    background-size: 300px 150px;\n  }\n}\n@media all and (-moz-min-device-pixel-ratio: 1.5), all and (-o-min-device-pixel-ratio: 3/2), all and (-webkit-min-device-pixel-ratio: 1.5), all and (min-device-pixel-ratio: 1.5), all and (min-resolution: 1.5dppx) {\n  .FleChecklistModals-root .FleChecklistModals-native-option-desktop {\n    background:  url(" + __webpack_require__(175) + ") center no-repeat;\n    background-size: 300px 150px;\n  }\n}\n@media all and (-moz-min-device-pixel-ratio: 1.5), all and (-o-min-device-pixel-ratio: 3/2), all and (-webkit-min-device-pixel-ratio: 1.5), all and (min-device-pixel-ratio: 1.5), all and (min-resolution: 1.5dppx) and (-moz-min-device-pixel-ratio: 1.5), all and (-moz-min-device-pixel-ratio: 1.5), all and (-o-min-device-pixel-ratio: 3/2), all and (-webkit-min-device-pixel-ratio: 1.5), all and (min-device-pixel-ratio: 1.5), all and (min-resolution: 1.5dppx) and (-o-min-device-pixel-ratio: 3/2), all and (-moz-min-device-pixel-ratio: 1.5), all and (-o-min-device-pixel-ratio: 3/2), all and (-webkit-min-device-pixel-ratio: 1.5), all and (min-device-pixel-ratio: 1.5), all and (min-resolution: 1.5dppx) and (-webkit-min-device-pixel-ratio: 1.5), all and (-moz-min-device-pixel-ratio: 1.5), all and (-o-min-device-pixel-ratio: 3/2), all and (-webkit-min-device-pixel-ratio: 1.5), all and (min-device-pixel-ratio: 1.5), all and (min-resolution: 1.5dppx) and (min-device-pixel-ratio: 1.5), all and (-moz-min-device-pixel-ratio: 1.5), all and (-o-min-device-pixel-ratio: 3/2), all and (-webkit-min-device-pixel-ratio: 1.5), all and (min-device-pixel-ratio: 1.5), all and (min-resolution: 1.5dppx) and (min-resolution: 1.5dppx) {\n  .FleChecklistModals-root .FleChecklistModals-native-option-desktop {\n    background:  url(" + __webpack_require__(175) + ") center no-repeat;\n    background-size: 300px 150px;\n  }\n}\n.FleChecklistModals-root .FleChecklistModals-native-option-mobile {\n  height: 150px;\n}\n@media all {\n  .FleChecklistModals-root .FleChecklistModals-native-option-mobile {\n    background:  url(" + __webpack_require__(434) + ") center no-repeat;\n    background-size: 300px 150px;\n  }\n}\n@media all and (-moz-min-device-pixel-ratio: 1.5), all and (-o-min-device-pixel-ratio: 3/2), all and (-webkit-min-device-pixel-ratio: 1.5), all and (min-device-pixel-ratio: 1.5), all and (min-resolution: 1.5dppx) {\n  .FleChecklistModals-root .FleChecklistModals-native-option-mobile {\n    background:  url(" + __webpack_require__(176) + ") center no-repeat;\n    background-size: 300px 150px;\n  }\n}\n@media all and (-moz-min-device-pixel-ratio: 1.5), all and (-o-min-device-pixel-ratio: 3/2), all and (-webkit-min-device-pixel-ratio: 1.5), all and (min-device-pixel-ratio: 1.5), all and (min-resolution: 1.5dppx) and (-moz-min-device-pixel-ratio: 1.5), all and (-moz-min-device-pixel-ratio: 1.5), all and (-o-min-device-pixel-ratio: 3/2), all and (-webkit-min-device-pixel-ratio: 1.5), all and (min-device-pixel-ratio: 1.5), all and (min-resolution: 1.5dppx) and (-o-min-device-pixel-ratio: 3/2), all and (-moz-min-device-pixel-ratio: 1.5), all and (-o-min-device-pixel-ratio: 3/2), all and (-webkit-min-device-pixel-ratio: 1.5), all and (min-device-pixel-ratio: 1.5), all and (min-resolution: 1.5dppx) and (-webkit-min-device-pixel-ratio: 1.5), all and (-moz-min-device-pixel-ratio: 1.5), all and (-o-min-device-pixel-ratio: 3/2), all and (-webkit-min-device-pixel-ratio: 1.5), all and (min-device-pixel-ratio: 1.5), all and (min-resolution: 1.5dppx) and (min-device-pixel-ratio: 1.5), all and (-moz-min-device-pixel-ratio: 1.5), all and (-o-min-device-pixel-ratio: 3/2), all and (-webkit-min-device-pixel-ratio: 1.5), all and (min-device-pixel-ratio: 1.5), all and (min-resolution: 1.5dppx) and (min-resolution: 1.5dppx) {\n  .FleChecklistModals-root .FleChecklistModals-native-option-mobile {\n    background:  url(" + __webpack_require__(176) + ") center no-repeat;\n    background-size: 300px 150px;\n  }\n}\n", ""]);

// exports


/***/ }),

/***/ 343:
/***/ (function(module, exports) {

module.exports = "/web-frontend/4df3050615f2b21effdd2ea60259be81.svg";

/***/ }),

/***/ 344:
/***/ (function(module, exports) {

module.exports = "/web-frontend/5d7381f70bec074012d1e510417df0c9.svg";

/***/ }),

/***/ 345:
/***/ (function(module, exports) {

module.exports = "/web-frontend/58b9ffaa60527a1b4b912f5c7aa09c2f.svg";

/***/ }),

/***/ 346:
/***/ (function(module, exports) {

module.exports = "/web-frontend/2a4095583f8ec37cd7e7deb63c46aa83.svg";

/***/ }),

/***/ 347:
/***/ (function(module, exports) {

module.exports = "/web-frontend/d0558d91063038236b60e3ef71fdc1fd.svg";

/***/ }),

/***/ 348:
/***/ (function(module, exports) {

module.exports = "/web-frontend/74bc8c62232b4ec930dddbde06649f71.svg";

/***/ }),

/***/ 349:
/***/ (function(module, exports) {

module.exports = "/web-frontend/cfb5c72929ccecdc7d87fae19e1aad1c.svg";

/***/ }),

/***/ 350:
/***/ (function(module, exports) {

module.exports = "/web-frontend/fabed2f9a81147a5270fdd54b8b67db9.svg";

/***/ }),

/***/ 351:
/***/ (function(module, exports) {

module.exports = "/web-frontend/2b81bc7c5025bd845e7afbed0950434f.svg";

/***/ }),

/***/ 352:
/***/ (function(module, exports) {

module.exports = "/web-frontend/54f1aeb5fbce03ddad426faa4f533b71.svg";

/***/ }),

/***/ 353:
/***/ (function(module, exports) {

module.exports = "/web-frontend/d555c481aa4d0c5d0257f23c64cec4dc.svg";

/***/ }),

/***/ 354:
/***/ (function(module, exports) {

module.exports = "/web-frontend/56984e897b9d58a94eea83363668dbbb.svg";

/***/ }),

/***/ 355:
/***/ (function(module, exports) {

module.exports = "/web-frontend/7d70edcb521f1af4205b3aa1e566a9bb.svg";

/***/ }),

/***/ 356:
/***/ (function(module, exports) {

module.exports = "/web-frontend/c9c5d9ad654fe5c5c05522e20c04601d.svg";

/***/ }),

/***/ 357:
/***/ (function(module, exports) {

module.exports = "/web-frontend/4da6bc877ef3145efd8df973e9d2c064.svg";

/***/ }),

/***/ 358:
/***/ (function(module, exports) {

module.exports = "/web-frontend/209deba56cfd51d35ef78b50dfe79a2e.svg";

/***/ }),

/***/ 359:
/***/ (function(module, exports) {

module.exports = "/web-frontend/a46635d16d6ee55d5d07d8d6383d51c9.svg";

/***/ }),

/***/ 360:
/***/ (function(module, exports) {

module.exports = "/web-frontend/fdfc5304d9819be57b4783c6bef2e118.svg";

/***/ }),

/***/ 361:
/***/ (function(module, exports) {

module.exports = "/web-frontend/fac54184e6deda739c82999ebe0779a5.svg";

/***/ }),

/***/ 362:
/***/ (function(module, exports) {

module.exports = "/web-frontend/4950171c0d18c642340d289549baade2.svg";

/***/ }),

/***/ 363:
/***/ (function(module, exports) {

module.exports = "/web-frontend/6be298df2cc954fcd61bcef42662a6f9.svg";

/***/ }),

/***/ 364:
/***/ (function(module, exports) {

module.exports = "/web-frontend/44db0f3f0e6cf66bd60301c6c6b2859f.svg";

/***/ }),

/***/ 365:
/***/ (function(module, exports) {

module.exports = "/web-frontend/822fd72c01cf792b628be23b2bb99978.svg";

/***/ }),

/***/ 366:
/***/ (function(module, exports) {

module.exports = "/web-frontend/07b1ff45f56a3df5292304542321d433.svg";

/***/ }),

/***/ 367:
/***/ (function(module, exports) {

module.exports = "/web-frontend/e1eb54eca8bc7a735f0d77ee50f545ec.svg";

/***/ }),

/***/ 368:
/***/ (function(module, exports) {

module.exports = "/web-frontend/550e140bc4100aeaf46623bdf46b6cac.svg";

/***/ }),

/***/ 369:
/***/ (function(module, exports) {

module.exports = "/web-frontend/2b3d8b7c87bc4904f9d6bc56afcc2691.svg";

/***/ }),

/***/ 370:
/***/ (function(module, exports) {

module.exports = "/web-frontend/49a557f66a9ac88341990ce4693f7cd8.svg";

/***/ }),

/***/ 371:
/***/ (function(module, exports) {

module.exports = "/web-frontend/fca69ad95ebb5365139bad73931ff9d0.svg";

/***/ }),

/***/ 372:
/***/ (function(module, exports) {

module.exports = "/web-frontend/0a60f031335936e29e88ede0d916ca53.svg";

/***/ }),

/***/ 373:
/***/ (function(module, exports) {

module.exports = "/web-frontend/136dafb31e3919344bf687c60399f8d1.svg";

/***/ }),

/***/ 374:
/***/ (function(module, exports) {

module.exports = "/web-frontend/e6b384d38928ab6182f1819db4d0c959.svg";

/***/ }),

/***/ 375:
/***/ (function(module, exports) {

module.exports = "/web-frontend/59708c44face90885a971a92c322db5a.svg";

/***/ }),

/***/ 376:
/***/ (function(module, exports) {

module.exports = "/web-frontend/3a681cdfc386eda61f06a22c21db6610.svg";

/***/ }),

/***/ 377:
/***/ (function(module, exports) {

module.exports = "/web-frontend/7c7b424345295272e65e5966dbbc006f.svg";

/***/ }),

/***/ 378:
/***/ (function(module, exports) {

module.exports = "/web-frontend/96f8fbf1eb23df92890cf41dd6cc6188.svg";

/***/ }),

/***/ 379:
/***/ (function(module, exports) {

module.exports = "/web-frontend/5b74feac7d6f5131fb58b42c26cba43a.svg";

/***/ }),

/***/ 380:
/***/ (function(module, exports) {

module.exports = "/web-frontend/7aa8dcfdb9348a6bf750cf486d4a7e3e.svg";

/***/ }),

/***/ 381:
/***/ (function(module, exports) {

module.exports = "/web-frontend/d173571f77f8720fcb0f4fb51358d8cc.svg";

/***/ }),

/***/ 382:
/***/ (function(module, exports) {

module.exports = "/web-frontend/2451d7c985d9cc89085e3a2d0ce8c116.svg";

/***/ }),

/***/ 383:
/***/ (function(module, exports) {

module.exports = "/web-frontend/47f5c7aa6ef9be2d3bfcca057c3e2af9.svg";

/***/ }),

/***/ 384:
/***/ (function(module, exports) {

module.exports = "/web-frontend/20af4758251242fb24c639e4d33ed8d6.svg";

/***/ }),

/***/ 385:
/***/ (function(module, exports) {

module.exports = "/web-frontend/d308e9d408144b968756adac068342f3.svg";

/***/ }),

/***/ 386:
/***/ (function(module, exports) {

module.exports = "/web-frontend/74a26be47c116ecc0bfc67329ebe1694.svg";

/***/ }),

/***/ 387:
/***/ (function(module, exports) {

module.exports = "/web-frontend/34502314393c443d1fd563f1588fefac.svg";

/***/ }),

/***/ 388:
/***/ (function(module, exports) {

module.exports = "/web-frontend/28613639ecd498eacd3604c2d8bd35c3.svg";

/***/ }),

/***/ 389:
/***/ (function(module, exports) {

module.exports = "/web-frontend/2e1db7babcd394d639cde2e6d6d2cf59.svg";

/***/ }),

/***/ 390:
/***/ (function(module, exports) {

module.exports = "/web-frontend/d0f23dce197428da4ecdde7ef6b000b6.svg";

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

/***/ 433:
/***/ (function(module, exports) {

module.exports = "/web-frontend/e8fc44c253aabd64358cb9d6af049c54.png";

/***/ }),

/***/ 434:
/***/ (function(module, exports) {

module.exports = "/web-frontend/db084f6997ff8c17a9c01d8c8cd9c37d.png";

/***/ }),

/***/ 435:
/***/ (function(module, exports) {

module.exports = "/web-frontend/a2c00a4215b4b4ac935c637c8602125d.png";

/***/ }),

/***/ 436:
/***/ (function(module, exports) {

module.exports = "/web-frontend/ed62068e278fc6d1d0b683d2396982c1.png";

/***/ }),

/***/ 449:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(297);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(15)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/less-loader/index.js?{\"relativeUrls\":false}!./appStoreBadge.less", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/less-loader/index.js?{\"relativeUrls\":false}!./appStoreBadge.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 500:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = FleChecklistModals;

var _react = __webpack_require__(8);

var _react2 = _interopRequireDefault(_react);

var _i18n = __webpack_require__(12);

var _i18n2 = _interopRequireDefault(_i18n);

var _appStoreBadge = __webpack_require__(190);

var _appStoreBadge2 = _interopRequireDefault(_appStoreBadge);

__webpack_require__(262);

var _closeIcon = __webpack_require__(107);

var _closeIcon2 = _interopRequireDefault(_closeIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Different modal messages associated with the FLE checklist.
 */
function FleChecklistModals(props) {
  // TODO: DRY with the modal for second client intro.

  var closeButton = _react2.default.createElement('div', {
    className: 'FleChecklistModals-close',
    onClick: function onClick() {
      return props.onClose();
    },
    dangerouslySetInnerHTML: { __html: _closeIcon2.default }
  });

  if (props.type === 'reminders') {
    return _react2.default.createElement(
      'div',
      { className: 'FleChecklistModals-root' },
      closeButton,
      _react2.default.createElement(
        'h1',
        null,
        _i18n2.default.localize('Focus.fleChecklist.modals.reminders.header')
      ),
      _react2.default.createElement(
        'p',
        null,
        _i18n2.default.localize('Focus.fleChecklist.modals.reminders.description')
      ),
      _react2.default.createElement(
        'div',
        { className: 'FleChecklistModals-options' },
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement('div', { className: 'FleChecklistModals-reminders-step-one' }),
          _react2.default.createElement(
            'h4',
            null,
            _i18n2.default.localize('Focus.fleChecklist.modals.reminders.stepOne')
          )
        ),
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement('div', { className: 'FleChecklistModals-reminders-step-two' }),
          _react2.default.createElement(
            'h4',
            null,
            _i18n2.default.localize('Focus.fleChecklist.modals.reminders.stepTwo')
          )
        )
      )
    );
  } else {
    return _react2.default.createElement(
      'div',
      { className: 'FleChecklistModals-root' },
      closeButton,
      _react2.default.createElement(
        'h1',
        null,
        _i18n2.default.localize('Focus.fleChecklist.modals.native.header')
      ),
      _react2.default.createElement(
        'p',
        null,
        _i18n2.default.localize('Focus.fleChecklist.modals.native.description')
      ),
      _react2.default.createElement(
        'div',
        { className: 'FleChecklistModals-options' },
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement('div', { className: 'FleChecklistModals-native-option-desktop' }),
          _react2.default.createElement(
            'h4',
            null,
            _i18n2.default.localize('Focus.fleChecklist.modals.native.desktop')
          ),
          _react2.default.createElement(
            'button',
            { type: 'button', onClick: function onClick() {
                return props.onDownloadDesktop();
              } },
            _i18n2.default.localize('Focus.fleChecklist.modals.native.download')
          )
        ),
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement('div', { className: 'FleChecklistModals-native-option-mobile' }),
          _react2.default.createElement(
            'h4',
            null,
            _i18n2.default.localize('Focus.fleChecklist.modals.native.mobile')
          ),
          _react2.default.createElement(
            'div',
            { className: 'FleChecklistModals-badges' },
            _react2.default.createElement(_appStoreBadge2.default, { onClick: function onClick() {
                return props.onDownloadIos();
              }, storeType: 'apple' }),
            _react2.default.createElement(_appStoreBadge2.default, {
              onClick: function onClick() {
                return props.onDownloadAndroid();
              },
              storeType: 'google'
            })
          )
        )
      )
    );
  }
}

FleChecklistModals.propTypes = {
  onClose: _react2.default.PropTypes.func.isRequired,
  onDownloadAndroid: _react2.default.PropTypes.func,
  onDownloadDesktop: _react2.default.PropTypes.func,
  onDownloadIos: _react2.default.PropTypes.func,
  type: _react2.default.PropTypes.oneOf(['reminders', 'native']).isRequired
};
module.exports = exports['default'];

/***/ }),

/***/ 8:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_8__;

/***/ })

/******/ })});;