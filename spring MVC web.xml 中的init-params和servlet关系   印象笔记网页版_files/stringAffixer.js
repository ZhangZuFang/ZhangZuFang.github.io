define("stringAffixer", [], function() { return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 540);
/******/ })
/************************************************************************/
/******/ ({

/***/ 540:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getI18nPrefixer = exports.getClassNamesPrefixer = exports.getCssPrefixer = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /* eslint-env browser */


var _classnames = __webpack_require__(87);

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * A collection of methods that add prefixes or suffixes to strings. Useful for cases such
 * as repetitively constructing CSS strings that must be prefixed by some value.
 */

/**
 * Gets a closure that prefixes a list of strings with some CSS prefix. The resulting
 * list is separated by spaces, and includes the prefix as its own class name at the
 * start of the string.
 *
 * For example, if you created a closure with a prefix of "MyModule", and you passed
 * in an array containing "foo" and "bar" to the closure, then the closure would
 * return the string "MyModule MyModule-foo MyModule-bar". And similarly, if you
 * provided an empty list to the closure, the resulting string would simply be the
 * prefix, "MyModule".
 *
 * This is useful for namespacing your CSS, and to easily style HTML elements
 * (e.g. h1, p, button) without bleeding styles to other modules.
 *
 * @param {string} cssPrefix  a prefix to add to each provided CSS class name
 * @return {function(): string} a closure that can take a variable list of strings and
 *     returns a single class string
 */
var getCssPrefixer = exports.getCssPrefixer = function getCssPrefixer(cssPrefix) {
  return function () {
    for (var _len = arguments.length, names = Array(_len), _key = 0; _key < _len; _key++) {
      names[_key] = arguments[_key];
    }

    return names.reduce(function (previousClasses, currentClass) {
      return previousClasses + ' ' + cssPrefix + '-' + currentClass;
    }, cssPrefix);
  };
};

/**
 * Gets a closure that intercepts all string keys and prefixes them with the provided CSS
 * prefix before passing them to the classnames library. The resulting closure can be used
 * with the same syntax as the classnames library, e.g. it may take in strings and objects
 * in arbitrary order.
 */
var getClassNamesPrefixer = exports.getClassNamesPrefixer = function getClassNamesPrefixer(cssPrefix) {
  return function () {
    for (var _len2 = arguments.length, params = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      params[_key2] = arguments[_key2];
    }

    var prefixString = function prefixString(s) {
      return cssPrefix + '-' + s;
    };

    var prefixParam = function prefixParam(param) {
      if (typeof param === 'string') {
        return prefixString(param);
      } else if (Array.isArray(param)) {
        var originalArray = param;
        return originalArray.map(prefixParam);
      } else if ((typeof param === 'undefined' ? 'undefined' : _typeof(param)) === 'object') {
        var originalObject = param;
        var prefixedObject = {};
        for (var key in originalObject) {
          prefixedObject[prefixString(key)] = originalObject[key];
        }
        return prefixedObject;
      } else {
        return param;
      }
    };

    return (0, _classnames2.default)(params.map(prefixParam));
  };
};

/**
 * Gets a closure that prefixes an i18n key with some fixed i18n prefix.
 *
 * @param {string} i18nPrefix  a prefix to add to the provided i18n key
 * @return {function(): string} a closure that takes a partial i18n key and returns a
 *     complete one
 */
var getI18nPrefixer = exports.getI18nPrefixer = function getI18nPrefixer(i18nPrefix) {
  return function (key) {
    return i18nPrefix + '.' + key;
  };
};

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


/***/ })

/******/ })});;