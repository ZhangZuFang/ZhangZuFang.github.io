define("RealTimeMessageService", ["jquery","local-storage","exponential-counter","interwindow-message-queue"], function(__WEBPACK_EXTERNAL_MODULE_85__, __WEBPACK_EXTERNAL_MODULE_134__, __WEBPACK_EXTERNAL_MODULE_278__, __WEBPACK_EXTERNAL_MODULE_281__) { return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 515);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = {

  Thrift: __webpack_require__(10),

  // Transport
  ArrayBufferSerializerTransport: __webpack_require__(52),
  BinaryNativeTransport: __webpack_require__(53),
  JSONNativeTransport: __webpack_require__(54),
  MemBuffer: __webpack_require__(17),
  NodeBinaryHttpTransport: __webpack_require__(55),
  NodeMemBuffer: __webpack_require__(32),
  TBinaryXmlHttpTransport: __webpack_require__(57),
  TXmlHttpTransport: __webpack_require__(58),

  // Protocol
  BinaryParser: __webpack_require__(31),
  BinaryProtocol: __webpack_require__(49),
  JSONProtocol: __webpack_require__(50),
  NodeBinaryProtocol: __webpack_require__(51)

};


/***/ }),

/***/ 1:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(47)
var ieee754 = __webpack_require__(59)
var isArray = __webpack_require__(33)

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),

/***/ 10:
/***/ (function(module, exports) {

/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements. See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership. The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License. You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

/*
 Description: 'JavaScript bindings for the Apache Thrift RPC system',
 License: 'http://www.apache.org/licenses/LICENSE-2.0',
 Homepage: 'http://thrift.apache.org',
 BugReports: 'https://issues.apache.org/jira/browse/THRIFT',
 Maintainer: 'dev@thrift.apache.org',
 */

/* eslint no-new: 0, no-void: 0, no-constant-condition: 0 */

var Thrift = {
  Version: '0.9.0',

  Type: {
    STOP: 0,
    VOID: 1,
    BOOL: 2,
    BYTE: 3,
    I08: 3,
    DOUBLE: 4,
    I16: 6,
    I32: 8,
    I64: 10,
    STRING: 11,
    UTF7: 11,
    STRUCT: 12,
    EXCEPTION: 12,
    MAP: 13,
    SET: 14,
    LIST: 15,
    UTF8: 16,
    UTF16: 17,
    BINARY: 18
  },

  MessageType: {
    CALL: 1,
    REPLY: 2,
    EXCEPTION: 3
  },

  objectLength: function(obj) {
    'use strict';
    var length = 0;
    for (var k in obj) {
      if (obj.hasOwnProperty(k)) {
        length++;
      }
    }

    return length;
  },

  inherits: function(constructor, superConstructor) {
    // Prototypal Inheritance http://javascript.crockford.com/prototypal.html
    'use strict';
    function F() {}
    F.prototype = superConstructor.prototype;
    constructor.prototype = new F();
  }
};

// Check two Thrift.Type values for equality
// Used to support backwards compatibility for BINARY as STRING
Thrift.equals = function(t1, t2) {
  'use strict';
  return t1 == t2
        || (t1 == Thrift.Type.BINARY && t2 == Thrift.Type.STRING)
        || (t1 == Thrift.Type.STRING && t2 == Thrift.Type.BINARY);
};

// Represent binary types as strings when serialized
// Used to support backwards compatibility for BINARY as STRING
Thrift.serializedType = function(t) {
  'use strict';
  return (t == Thrift.Type.BINARY) ? Thrift.Type.STRING : t;
};

// defaults taken from underscore.js
Thrift.defaults = function(target) {
  'use strict';
  Array.prototype.slice.call(arguments, 1).forEach(function(source) {
    if (source) {
      for (var prop in source) {
        if (target[prop] === void 0) {
          target[prop] = source[prop];
        }
      }
    }
  });
  return target;
};

// extend taken from underscore.js
Thrift.extend = function(target) {
  'use strict';
  Array.prototype.slice.call(arguments, 1).forEach(function(source) {
    if (source) {
      for (var prop in source) {
        target[prop] = source[prop];
      }
    }
  });
  return target;
};

//
// Method
//
Thrift.Method = function(config) {
  'use strict';
  this.alias = config.alias;
  this.args = config.args;
  this.result = config.result;
};

Thrift.Method.define = function(config) {
  'use strict';
  return new Thrift.Method(config);
};

Thrift.Method.noop = function() {
  // do nothing
  'use strict';
};

Thrift.Method.sendException = function(output, seqid, structOrErr, structdef) {
  'use strict';
  var config;

  if (!structdef) {
    if (structOrErr instanceof Thrift.TApplicationException) {
      structdef = Thrift.TApplicationException;
    } else if (structOrErr instanceof Thrift.TException) {
      structdef = Thrift.TException;
    } else {
      structdef = Thrift.TApplicationException;
      config = {};
      if (structOrErr) {
        if (structOrErr.message) {
          config.message = structOrErr.message + '';
        }
        if (structOrErr.code != null && Number.isFinite(config.code)) {
          config.code = structOrErr.code;
        }
      }
      structOrErr = new Thrift.TApplicationException(config);
    }
  }

  output.writeMessageBegin('', Thrift.MessageType.EXCEPTION, seqid);
  structdef.write(output, structOrErr);
  output.writeMessageEnd();
  output.flush();
};

Thrift.Method.prototype.sendRequest = function(output, seqid, struct, callback) {
  'use strict';
  output.writeMessageBegin(this.alias, Thrift.MessageType.CALL, seqid);
  this.args.write(output, struct);
  output.writeMessageEnd();
  output.flush(function(err, response) {
    if (err) {
      callback(err);
    } else {
      this.processResponse(response, callback);
    }
  }.bind(this));
};

Thrift.Method.prototype.sendResponse = function(output, seqid, struct) {
  'use strict';
  output.writeMessageBegin(this.alias, Thrift.MessageType.REPLY, seqid);
  this.result.write(output, struct);
  output.writeMessageEnd();
  output.flush();
};

Thrift.Method.prototype.processResponse = function(response, callback) {
  'use strict';
  var header;
  var result;
  var err;
  var index;

  callback = callback || Thrift.Method.noop;

  header = response.readMessageBegin();
  if (header.mtype == Thrift.MessageType.EXCEPTION) {
    err = Thrift.TApplicationException.read(response);
    response.readMessageEnd();
    callback(err);
    return;
  }

  if (header.mtype != Thrift.MessageType.REPLY) {
    err = Error('Client expects REPLY but received unsupported message type: ' + header.mtype);
    callback(err);
    return;
  }

  if (this.alias != header.fname) {
    err = Error('Unrecognized method name. Expected [' + this.alias + '] Received [' + header.fname + ']');
    callback(err);
    return;
  }

  result = this.result.read(response);
  response.readMessageEnd();

  // Exceptions are in fields
  for (index in this.result.fields) {
    if (index != 0 && result[this.result.fields[index].alias]) {
      err = result[this.result.fields[index].alias];
      callback(err);
      return;
    }
  }

  callback(null, result.returnValue);
};


//
// List
//
Thrift.List = {};

Thrift.List.define = function(name, type, def) {
  'use strict';
  var ThriftList = function() {
    return [];
  };

  // Name param is optional to allow anonymous lists
  if (typeof name !== 'string') {
    def = type;
    type = name;
    name = 'anonymous';
  }

  ThriftList.alias = name;
  ThriftList.type = type;
  ThriftList.def = def;
  ThriftList.read = Thrift.List.read.bind(null, ThriftList);
  ThriftList.write = Thrift.List.write.bind(null, ThriftList);

  return ThriftList;
};

Thrift.List.read = function(listdef, input) {
  'use strict';
  var list = new listdef();
  var header = input.readListBegin();
  Thrift.List.readEntries(listdef, list, input, header.size);
  input.readListEnd();
  return list;
};

Thrift.List.readEntries = function(listdef, list, input, size) {
  'use strict';
  var i;
  for (i = 0; i < size; i++) {
    if (listdef.def != null) {
      list.push(listdef.def.read(input));
    } else {
      list.push(input.readType(listdef.type));
    }
  }
};

Thrift.List.write = function(listdef, output, list) {
  'use strict';
  var val;
  var index;
  var size = list.length;

  output.writeListBegin(listdef.type, size);
  for (index = 0; index < size; index++) {
    val = list[index];
    if (listdef.def) {
      listdef.def.write(output, val);
    } else {
      output.writeType(listdef.type, val);
    }
  }
  output.writeListEnd();
};

//
// Set
//
Thrift.Set = {};

Thrift.Set.define = function(name, type, def) {
  'use strict';
  var ThriftSet = function() {
    return [];
  };

  // Name param is optional to allow anonymous sets
  if (typeof name !== 'string') {
    def = type;
    type = name;
    name = 'anonymous';
  }

  ThriftSet.alias = name;
  ThriftSet.type = type;
  ThriftSet.def = def;
  ThriftSet.read = Thrift.Set.read.bind(null, ThriftSet);
  ThriftSet.write = Thrift.Set.write.bind(null, ThriftSet);

  return ThriftSet;
};

Thrift.Set.read = function(setdef, input) {
  'use strict';
  var set = new setdef();
  var header = input.readSetBegin();
  Thrift.Set.readEntries(setdef, set, input, header.size);
  input.readSetEnd();
  return set;
};

Thrift.Set.readEntries = function(setdef, set, input, size) {
  'use strict';
  var i;
  for (i = 0; i < size; i++) {
    if (setdef.def != null) {
      set.push(setdef.def.read(input));
    } else {
      set.push(input.readType(setdef.type));
    }
  }
};

Thrift.Set.write = function(setdef, output, set) {
  'use strict';
  var val;
  var index;
  var size = set.length;

  output.writeSetBegin(setdef.type, size);
  for (index = 0; index < size; index++) {
    val = set[index];
    if (setdef.def) {
      setdef.def.write(output, val);
    } else {
      output.writeType(setdef.type, val);
    }
  }
  output.writeSetEnd();
};

//
// Map
//
Thrift.Map = {};

Thrift.Map.define = function(name, ktype, vtype, vdef) {
  'use strict';
  var ThriftMap = function() {
    return {};
  };

  // Name param is optional to allow anonymous maps
  if (typeof name !== 'string') {
    vdef = vtype;
    vtype = ktype;
    ktype = name;
    name = 'anonymous';
  }

  ThriftMap.alias = name;
  ThriftMap.ktype = ktype;
  ThriftMap.vtype = vtype;
  ThriftMap.vdef = vdef;
  ThriftMap.read = Thrift.Map.read.bind(null, ThriftMap);
  ThriftMap.write = Thrift.Map.write.bind(null, ThriftMap);

  return ThriftMap;
};

Thrift.Map.read = function(mapdef, input) {
  'use strict';
  var map = new mapdef();
  var header = input.readMapBegin();
  Thrift.Map.readEntries(mapdef, map, input, header.size);
  input.readMapEnd();
  return map;
};

Thrift.Map.readEntries = function(mapdef, map, input, size) {
  'use strict';
  var i;
  var key;
  for (i = 0; i < size; i++) {
    key = input.readType(mapdef.ktype);
    if (mapdef.vdef != null) {
      map[key] = mapdef.vdef.read(input);
    } else {
      map[key] = input.readType(mapdef.vtype);
    }
  }
};

Thrift.Map.write = function(mapdef, output, map) {
  'use strict';
  var keys = Object.keys(map);
  var key;
  var value;
  var index;
  var size = keys.length;

  output.writeMapBegin(mapdef.ktype, mapdef.vtype, size);
  for (index = 0; index < size; index++) {
    key = keys[index];
    output.writeType(mapdef.ktype, key);
    value = map[key];
    if (mapdef.vdef) {
      mapdef.vdef.write(output, value);
    } else {
      output.writeType(mapdef.vtype, value);
    }
  }
  output.writeMapEnd();
};

//
// Struct
//
Thrift.Struct = {};

Thrift.Struct.define = function(name, fields) {
  'use strict';
  var defaultValues = {};
  var fid;
  var field;

  fields = fields || {};

  for (fid in fields) {
    field = fields[fid];
    defaultValues[field.alias] = field.defaultValue || null;
  }

  var ThriftStruct = function(args) {
    // if an object is passed, use its fields as the defaults
    args = typeof args === 'object' ? args : {};
    return Thrift.defaults({}, args, defaultValues);
  };

  ThriftStruct.alias = name;
  ThriftStruct.fields = fields;
  ThriftStruct.defaultValues = defaultValues;
  ThriftStruct.read = Thrift.Struct.read.bind(null, ThriftStruct);
  ThriftStruct.write = Thrift.Struct.write.bind(null, ThriftStruct);
  ThriftStruct.values = Thrift.Struct.values.bind(null, ThriftStruct);
  ThriftStruct.setByDef = Thrift.Struct.setByDef.bind(null, ThriftStruct);

  return ThriftStruct;
};

Thrift.Struct.setByDef = function(structdef, struct, value) {
  'use strict';
  var fid;
  var fields = structdef.fields;
  var field;
  var foundMatch = false;

  for (fid in fields) {
    field = fields[fid];
    if (field.def && value instanceof field.def) {
      struct[field.alias] = value;
      foundMatch = true;
      break;
    }
  }

  return foundMatch;
};

Thrift.Struct.values = function(structdef, struct) {
  'use strict';
  var fields = structdef.fields;
  var keys = Object.keys(structdef.fields);
  var result = new Array(keys.length);
  var fid;
  var index;
  var i;

  for (i = 0; i < keys.length; i++) {
    fid = keys[i];
    index = fields[fid].index;
    if (index != null) {
      result[index] = struct[fields[fid].alias];
    } else {
      result[i] = struct[fields[fid].alias];
    }
  }

  return result;
};

Thrift.Struct.read = function(structdef, input) {
  'use strict';
  var struct = new structdef();
  input.readStructBegin();
  Thrift.Struct.readFields(structdef, input, struct);
  input.readStructEnd();
  return struct;
};

Thrift.Struct.readFields = function(structdef, input, struct) {
  'use strict';
  var header;
  var field;

  while (true) {
    header = input.readFieldBegin();

    if (header.ftype == Thrift.Type.STOP) {
      return;
    }

    field = structdef.fields[header.fid];
    if (field) {
      if (Thrift.equals(header.ftype, field.type)) {
        if (field.def) {
          struct[field.alias] = field.def.read(input);
        } else {
          struct[field.alias] = input.readType(field.type);
        }
      } else {
        input.skip(header.ftype);
      }
    } else {
      input.skip(header.ftype);
    }

    input.readFieldEnd();
  }
};

Thrift.Struct.write = function(structdef, output, struct) {
  'use strict';
  var fid;
  var field;
  var value;
  output.writeStructBegin(structdef.alias);

  for (fid in structdef.fields) {
    field = structdef.fields[fid];
    value = struct[field.alias];
    if (value !== null && value !== undefined) {
      output.writeFieldBegin(field.alias, Thrift.serializedType(field.type), fid);
      if (field.def) {
        new field.def.write(output, value);
      } else {
        output.writeType(field.type, value);
      }
      output.writeFieldEnd();
    }
  }

  output.writeFieldStop();
  output.writeStructEnd();
};

//
// Exceptions
//
Thrift.Exception = {};

Thrift.Exception.define = function(name, fields) {
  'use strict';
  var defaultValues = {};
  var fid;
  var field;

  fields = fields || {};

  for (fid in fields) {
    field = fields[fid];
    defaultValues[field.alias] = field.defaultValue || null;
  }

  var ThriftException = function(messageOrConfig) {
    var config = {};
    if (typeof messageOrConfig === 'object') {
      config = messageOrConfig;
    }
    Thrift.defaults(this, config, defaultValues);
    if (typeof messageOrConfig === 'string') {
      this.message = messageOrConfig;
    } else if (messageOrConfig instanceof Error) {
      this.message = messageOrConfig.message;
    }
  };

  ThriftException.alias = name;
  ThriftException.fields = fields;
  ThriftException.defaultValues = defaultValues;
  ThriftException.read = Thrift.Struct.read.bind(null, ThriftException);
  ThriftException.write = Thrift.Struct.write.bind(null, ThriftException);

  return ThriftException;
};

Thrift.TException = Thrift.Exception.define('TException', {
  1: {alias: 'message', type: Thrift.Type.STRING}
});

Thrift.TApplicationExceptionType = {
  'UNKNOWN': 0,
  'UNKNOWN_METHOD': 1,
  'INVALID_MESSAGE_TYPE': 2,
  'WRONG_METHOD_NAME': 3,
  'BAD_SEQUENCE_ID': 4,
  'MISSING_RESULT': 5,
  'INTERNAL_ERROR': 6,
  'PROTOCOL_ERROR': 7
};

Thrift.TApplicationException = Thrift.Exception.define('TApplicationException', {
  1: {alias: 'message', type: Thrift.Type.STRING},
  2: {alias: 'code', type: Thrift.Type.I32,
            defaultValue: Thrift.TApplicationExceptionType.INTERNAL_ERROR}
});


//
// Processor
//
Thrift.Processor = function() {
  'use strict';
  this.methods = {};
};

Thrift.Processor.prototype.addMethod = function(mdef, fn) {
  'use strict';
  this.methods[mdef.alias] = {
    def: mdef,
    fn: fn
  };
};

Thrift.Processor.prototype.process = function(input, output) {
  'use strict';
  var method;
  var def;
  var result;
  var header;
  var args;

  try {
    header = input.readMessageBegin();
    if (header.mtype != Thrift.MessageType.CALL) {
      throw new Thrift.TException('Server expects CALL but received unsupported message type: ' + header.mtype);
    }

    method = this.methods[header.fname];
    if (method == null) {
      throw new Thrift.TException('Unrecognized method name: ' + header.fname);
    }

    def = method.def;
    args = def.args.read(input);
    result = new def.result();

    method.fn.apply(null, def.args.values(args).concat([
      function(returnValue) {
        result.returnValue = returnValue;
        def.sendResponse(output, header.seqid, result);
      },
      function(err) {
        // console.log(err);
        var seqid = header ? header.seqid : -1;
        if (result && def.result.setByDef(result, err)) {
          def.sendResponse(output, header.seqid, result);
        } else {
          Thrift.Method.sendException(output, seqid, err);
        }
      }
    ]));
  } catch (err) {
    console.log(err);
    var seqid = header ? header.seqid : -1;
    if (result && def.result.setByDef(result, err)) {
      def.sendResponse(output, header.seqid, result);
    } else {
      Thrift.Method.sendException(output, seqid, err);
    }
  }
};

module.exports = Thrift;


/***/ }),

/***/ 13:
/***/ (function(module, exports) {

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      } else {
        // At least give some kind of context to the user
        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
        err.context = er;
        throw err;
      }
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        args = Array.prototype.slice.call(arguments, 1);
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    args = Array.prototype.slice.call(arguments, 1);
    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else if (listeners) {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.prototype.listenerCount = function(type) {
  if (this._events) {
    var evlistener = this._events[type];

    if (isFunction(evlistener))
      return 1;
    else if (evlistener)
      return evlistener.length;
  }
  return 0;
};

EventEmitter.listenerCount = function(emitter, type) {
  return emitter.listenerCount(type);
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}


/***/ }),

/***/ 134:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_134__;

/***/ }),

/***/ 16:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var buffer = __webpack_require__(1);
var Buffer = buffer.Buffer;
var SlowBuffer = buffer.SlowBuffer;
var MAX_LEN = buffer.kMaxLength || 2147483647;
exports.alloc = function alloc(size, fill, encoding) {
  if (typeof Buffer.alloc === 'function') {
    return Buffer.alloc(size, fill, encoding);
  }
  if (typeof encoding === 'number') {
    throw new TypeError('encoding must not be number');
  }
  if (typeof size !== 'number') {
    throw new TypeError('size must be a number');
  }
  if (size > MAX_LEN) {
    throw new RangeError('size is too large');
  }
  var enc = encoding;
  var _fill = fill;
  if (_fill === undefined) {
    enc = undefined;
    _fill = 0;
  }
  var buf = new Buffer(size);
  if (typeof _fill === 'string') {
    var fillBuf = new Buffer(_fill, enc);
    var flen = fillBuf.length;
    var i = -1;
    while (++i < size) {
      buf[i] = fillBuf[i % flen];
    }
  } else {
    buf.fill(_fill);
  }
  return buf;
}
exports.allocUnsafe = function allocUnsafe(size) {
  if (typeof Buffer.allocUnsafe === 'function') {
    return Buffer.allocUnsafe(size);
  }
  if (typeof size !== 'number') {
    throw new TypeError('size must be a number');
  }
  if (size > MAX_LEN) {
    throw new RangeError('size is too large');
  }
  return new Buffer(size);
}
exports.from = function from(value, encodingOrOffset, length) {
  if (typeof Buffer.from === 'function' && (!global.Uint8Array || Uint8Array.from !== Buffer.from)) {
    return Buffer.from(value, encodingOrOffset, length);
  }
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number');
  }
  if (typeof value === 'string') {
    return new Buffer(value, encodingOrOffset);
  }
  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    var offset = encodingOrOffset;
    if (arguments.length === 1) {
      return new Buffer(value);
    }
    if (typeof offset === 'undefined') {
      offset = 0;
    }
    var len = length;
    if (typeof len === 'undefined') {
      len = value.byteLength - offset;
    }
    if (offset >= value.byteLength) {
      throw new RangeError('\'offset\' is out of bounds');
    }
    if (len > value.byteLength - offset) {
      throw new RangeError('\'length\' is out of bounds');
    }
    return new Buffer(value.slice(offset, offset + len));
  }
  if (Buffer.isBuffer(value)) {
    var out = new Buffer(value.length);
    value.copy(out, 0, 0, value.length);
    return out;
  }
  if (value) {
    if (Array.isArray(value) || (typeof ArrayBuffer !== 'undefined' && value.buffer instanceof ArrayBuffer) || 'length' in value) {
      return new Buffer(value);
    }
    if (value.type === 'Buffer' && Array.isArray(value.data)) {
      return new Buffer(value.data);
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ' + 'ArrayBuffer, Array, or array-like object.');
}
exports.allocUnsafeSlow = function allocUnsafeSlow(size) {
  if (typeof Buffer.allocUnsafeSlow === 'function') {
    return Buffer.allocUnsafeSlow(size);
  }
  if (typeof size !== 'number') {
    throw new TypeError('size must be a number');
  }
  if (size >= MAX_LEN) {
    throw new RangeError('size is too large');
  }
  return new SlowBuffer(size);
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),

/***/ 17:
/***/ (function(module, exports) {

function MemBuffer(buffer) {
  'use strict';
  this.queue = [];
  this.buffer = buffer;
  this.offset = 0;
}

MemBuffer.prototype.read = function(len) {
  'use strict';
  var view = new DataView(this.buffer, this.offset, len);
  this.offset += len;
  return view;
};

MemBuffer.prototype.write = function(bytes) {
  'use strict';
  var u8;
  if (bytes.buffer) {
    u8 = bytes instanceof Uint8Array
      ? bytes
      : new Uint8Array(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  } else {
    u8 = new Uint8Array(bytes);
  }
  this.queue.push(u8);
};

MemBuffer.prototype.clear = function() {
  'use strict';
  this.queue = [];
  this.buffer = null;
  this.offset = 0;
};

MemBuffer.prototype.flush = function() {
  'use strict';
  var size = 0;
  var pos = 0;
  var result;

  if (this.buffer) {
    size = this.buffer.byteLength;
  }
  size = this.queue.reduce(function(innerSize, bytes) {
    return innerSize + bytes.byteLength;
  }, size);
  result = new Uint8Array(new ArrayBuffer(size));

  if (this.buffer) {
    result.set(this.buffer);
  }
  this.queue.forEach(function(bytes) {
    result.set(bytes, pos);
    pos += bytes.byteLength;
  });

  this.queue = [];
  this.buffer = result;
};

module.exports = MemBuffer;


/***/ }),

/***/ 18:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

if (!process.version ||
    process.version.indexOf('v0.') === 0 ||
    process.version.indexOf('v1.') === 0 && process.version.indexOf('v1.8.') !== 0) {
  module.exports = nextTick;
} else {
  module.exports = process.nextTick;
}

function nextTick(fn, arg1, arg2, arg3) {
  if (typeof fn !== 'function') {
    throw new TypeError('"callback" argument must be a function');
  }
  var len = arguments.length;
  var args, i;
  switch (len) {
  case 0:
  case 1:
    return process.nextTick(fn);
  case 2:
    return process.nextTick(function afterTickOne() {
      fn.call(null, arg1);
    });
  case 3:
    return process.nextTick(function afterTickTwo() {
      fn.call(null, arg1, arg2);
    });
  case 4:
    return process.nextTick(function afterTickThree() {
      fn.call(null, arg1, arg2, arg3);
    });
  default:
    args = new Array(len - 1);
    i = 0;
    while (i < args.length) {
      args[i++] = arguments[i];
    }
    return process.nextTick(function afterTick() {
      fn.apply(null, args);
    });
  }
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5)))

/***/ }),

/***/ 19:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// a transform stream is a readable/writable stream where you do
// something with the data.  Sometimes it's called a "filter",
// but that's not a great name for it, since that implies a thing where
// some bits pass through, and others are simply ignored.  (That would
// be a valid example of a transform, of course.)
//
// While the output is causally related to the input, it's not a
// necessarily symmetric or synchronous transformation.  For example,
// a zlib stream might take multiple plain-text writes(), and then
// emit a single compressed chunk some time in the future.
//
// Here's how this works:
//
// The Transform stream has all the aspects of the readable and writable
// stream classes.  When you write(chunk), that calls _write(chunk,cb)
// internally, and returns false if there's a lot of pending writes
// buffered up.  When you call read(), that calls _read(n) until
// there's enough pending readable data buffered up.
//
// In a transform stream, the written data is placed in a buffer.  When
// _read(n) is called, it transforms the queued up data, calling the
// buffered _write cb's as it consumes chunks.  If consuming a single
// written chunk would result in multiple output chunks, then the first
// outputted bit calls the readcb, and subsequent chunks just go into
// the read buffer, and will cause it to emit 'readable' if necessary.
//
// This way, back-pressure is actually determined by the reading side,
// since _read has to be called to start processing a new chunk.  However,
// a pathological inflate type of transform can cause excessive buffering
// here.  For example, imagine a stream where every byte of input is
// interpreted as an integer from 0-255, and then results in that many
// bytes of output.  Writing the 4 bytes {ff,ff,ff,ff} would result in
// 1kb of data being output.  In this case, you could write a very small
// amount of input, and end up with a very large amount of output.  In
// such a pathological inflating mechanism, there'd be no way to tell
// the system to stop doing the transform.  A single 4MB write could
// cause the system to run out of memory.
//
// However, even in such a pathological case, only a single written chunk
// would be consumed, and then the rest would wait (un-transformed) until
// the results of the previous transformed chunk were consumed.



module.exports = Transform;

var Duplex = __webpack_require__(6);

/*<replacement>*/
var util = __webpack_require__(9);
util.inherits = __webpack_require__(4);
/*</replacement>*/

util.inherits(Transform, Duplex);

function TransformState(stream) {
  this.afterTransform = function (er, data) {
    return afterTransform(stream, er, data);
  };

  this.needTransform = false;
  this.transforming = false;
  this.writecb = null;
  this.writechunk = null;
  this.writeencoding = null;
}

function afterTransform(stream, er, data) {
  var ts = stream._transformState;
  ts.transforming = false;

  var cb = ts.writecb;

  if (!cb) return stream.emit('error', new Error('no writecb in Transform class'));

  ts.writechunk = null;
  ts.writecb = null;

  if (data !== null && data !== undefined) stream.push(data);

  cb(er);

  var rs = stream._readableState;
  rs.reading = false;
  if (rs.needReadable || rs.length < rs.highWaterMark) {
    stream._read(rs.highWaterMark);
  }
}

function Transform(options) {
  if (!(this instanceof Transform)) return new Transform(options);

  Duplex.call(this, options);

  this._transformState = new TransformState(this);

  var stream = this;

  // start out asking for a readable event once data is transformed.
  this._readableState.needReadable = true;

  // we have implemented the _read method, and done the other things
  // that Readable wants before the first _read call, so unset the
  // sync guard flag.
  this._readableState.sync = false;

  if (options) {
    if (typeof options.transform === 'function') this._transform = options.transform;

    if (typeof options.flush === 'function') this._flush = options.flush;
  }

  // When the writable side finishes, then flush out anything remaining.
  this.once('prefinish', function () {
    if (typeof this._flush === 'function') this._flush(function (er, data) {
      done(stream, er, data);
    });else done(stream);
  });
}

Transform.prototype.push = function (chunk, encoding) {
  this._transformState.needTransform = false;
  return Duplex.prototype.push.call(this, chunk, encoding);
};

// This is the part where you do stuff!
// override this function in implementation classes.
// 'chunk' is an input chunk.
//
// Call `push(newChunk)` to pass along transformed output
// to the readable side.  You may call 'push' zero or more times.
//
// Call `cb(err)` when you are done with this chunk.  If you pass
// an error, then that'll put the hurt on the whole operation.  If you
// never call cb(), then you'll never get another chunk.
Transform.prototype._transform = function (chunk, encoding, cb) {
  throw new Error('_transform() is not implemented');
};

Transform.prototype._write = function (chunk, encoding, cb) {
  var ts = this._transformState;
  ts.writecb = cb;
  ts.writechunk = chunk;
  ts.writeencoding = encoding;
  if (!ts.transforming) {
    var rs = this._readableState;
    if (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark) this._read(rs.highWaterMark);
  }
};

// Doesn't matter what the args are here.
// _transform does all the work.
// That we got here means that the readable side wants more data.
Transform.prototype._read = function (n) {
  var ts = this._transformState;

  if (ts.writechunk !== null && ts.writecb && !ts.transforming) {
    ts.transforming = true;
    this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
  } else {
    // mark that we need a transform, so that any data that comes in
    // will get processed, now that we've asked for it.
    ts.needTransform = true;
  }
};

function done(stream, er, data) {
  if (er) return stream.emit('error', er);

  if (data !== null && data !== undefined) stream.push(data);

  // if there's nothing in the write buffer, then that means
  // that nothing more will ever be provided
  var ws = stream._writableState;
  var ts = stream._transformState;

  if (ws.length) throw new Error('Calling transform done when ws.length != 0');

  if (ts.transforming) throw new Error('Calling transform done when still transforming');

  return stream.push(null);
}

/***/ }),

/***/ 2:
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 20:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process, setImmediate) {// A bit simpler than readable streams.
// Implement an async ._write(chunk, encoding, cb), and it'll handle all
// the drain event emission and buffering.



module.exports = Writable;

/*<replacement>*/
var processNextTick = __webpack_require__(18);
/*</replacement>*/

/*<replacement>*/
var asyncWrite = !process.browser && ['v0.10', 'v0.9.'].indexOf(process.version.slice(0, 5)) > -1 ? setImmediate : processNextTick;
/*</replacement>*/

/*<replacement>*/
var Duplex;
/*</replacement>*/

Writable.WritableState = WritableState;

/*<replacement>*/
var util = __webpack_require__(9);
util.inherits = __webpack_require__(4);
/*</replacement>*/

/*<replacement>*/
var internalUtil = {
  deprecate: __webpack_require__(76)
};
/*</replacement>*/

/*<replacement>*/
var Stream;
(function () {
  try {
    Stream = __webpack_require__(22);
  } catch (_) {} finally {
    if (!Stream) Stream = __webpack_require__(13).EventEmitter;
  }
})();
/*</replacement>*/

var Buffer = __webpack_require__(1).Buffer;
/*<replacement>*/
var bufferShim = __webpack_require__(16);
/*</replacement>*/

util.inherits(Writable, Stream);

function nop() {}

function WriteReq(chunk, encoding, cb) {
  this.chunk = chunk;
  this.encoding = encoding;
  this.callback = cb;
  this.next = null;
}

function WritableState(options, stream) {
  Duplex = Duplex || __webpack_require__(6);

  options = options || {};

  // object stream flag to indicate whether or not this stream
  // contains buffers or objects.
  this.objectMode = !!options.objectMode;

  if (stream instanceof Duplex) this.objectMode = this.objectMode || !!options.writableObjectMode;

  // the point at which write() starts returning false
  // Note: 0 is a valid value, means that we always return false if
  // the entire buffer is not flushed immediately on write()
  var hwm = options.highWaterMark;
  var defaultHwm = this.objectMode ? 16 : 16 * 1024;
  this.highWaterMark = hwm || hwm === 0 ? hwm : defaultHwm;

  // cast to ints.
  this.highWaterMark = ~~this.highWaterMark;

  // drain event flag.
  this.needDrain = false;
  // at the start of calling end()
  this.ending = false;
  // when end() has been called, and returned
  this.ended = false;
  // when 'finish' is emitted
  this.finished = false;

  // should we decode strings into buffers before passing to _write?
  // this is here so that some node-core streams can optimize string
  // handling at a lower level.
  var noDecode = options.decodeStrings === false;
  this.decodeStrings = !noDecode;

  // Crypto is kind of old and crusty.  Historically, its default string
  // encoding is 'binary' so we have to make this configurable.
  // Everything else in the universe uses 'utf8', though.
  this.defaultEncoding = options.defaultEncoding || 'utf8';

  // not an actual buffer we keep track of, but a measurement
  // of how much we're waiting to get pushed to some underlying
  // socket or file.
  this.length = 0;

  // a flag to see when we're in the middle of a write.
  this.writing = false;

  // when true all writes will be buffered until .uncork() call
  this.corked = 0;

  // a flag to be able to tell if the onwrite cb is called immediately,
  // or on a later tick.  We set this to true at first, because any
  // actions that shouldn't happen until "later" should generally also
  // not happen before the first write call.
  this.sync = true;

  // a flag to know if we're processing previously buffered items, which
  // may call the _write() callback in the same tick, so that we don't
  // end up in an overlapped onwrite situation.
  this.bufferProcessing = false;

  // the callback that's passed to _write(chunk,cb)
  this.onwrite = function (er) {
    onwrite(stream, er);
  };

  // the callback that the user supplies to write(chunk,encoding,cb)
  this.writecb = null;

  // the amount that is being written when _write is called.
  this.writelen = 0;

  this.bufferedRequest = null;
  this.lastBufferedRequest = null;

  // number of pending user-supplied write callbacks
  // this must be 0 before 'finish' can be emitted
  this.pendingcb = 0;

  // emit prefinish if the only thing we're waiting for is _write cbs
  // This is relevant for synchronous Transform streams
  this.prefinished = false;

  // True if the error was already emitted and should not be thrown again
  this.errorEmitted = false;

  // count buffered requests
  this.bufferedRequestCount = 0;

  // allocate the first CorkedRequest, there is always
  // one allocated and free to use, and we maintain at most two
  this.corkedRequestsFree = new CorkedRequest(this);
}

WritableState.prototype.getBuffer = function getBuffer() {
  var current = this.bufferedRequest;
  var out = [];
  while (current) {
    out.push(current);
    current = current.next;
  }
  return out;
};

(function () {
  try {
    Object.defineProperty(WritableState.prototype, 'buffer', {
      get: internalUtil.deprecate(function () {
        return this.getBuffer();
      }, '_writableState.buffer is deprecated. Use _writableState.getBuffer ' + 'instead.')
    });
  } catch (_) {}
})();

// Test _writableState for inheritance to account for Duplex streams,
// whose prototype chain only points to Readable.
var realHasInstance;
if (typeof Symbol === 'function' && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] === 'function') {
  realHasInstance = Function.prototype[Symbol.hasInstance];
  Object.defineProperty(Writable, Symbol.hasInstance, {
    value: function (object) {
      if (realHasInstance.call(this, object)) return true;

      return object && object._writableState instanceof WritableState;
    }
  });
} else {
  realHasInstance = function (object) {
    return object instanceof this;
  };
}

function Writable(options) {
  Duplex = Duplex || __webpack_require__(6);

  // Writable ctor is applied to Duplexes, too.
  // `realHasInstance` is necessary because using plain `instanceof`
  // would return false, as no `_writableState` property is attached.

  // Trying to use the custom `instanceof` for Writable here will also break the
  // Node.js LazyTransform implementation, which has a non-trivial getter for
  // `_writableState` that would lead to infinite recursion.
  if (!realHasInstance.call(Writable, this) && !(this instanceof Duplex)) {
    return new Writable(options);
  }

  this._writableState = new WritableState(options, this);

  // legacy.
  this.writable = true;

  if (options) {
    if (typeof options.write === 'function') this._write = options.write;

    if (typeof options.writev === 'function') this._writev = options.writev;
  }

  Stream.call(this);
}

// Otherwise people can pipe Writable streams, which is just wrong.
Writable.prototype.pipe = function () {
  this.emit('error', new Error('Cannot pipe, not readable'));
};

function writeAfterEnd(stream, cb) {
  var er = new Error('write after end');
  // TODO: defer error events consistently everywhere, not just the cb
  stream.emit('error', er);
  processNextTick(cb, er);
}

// Checks that a user-supplied chunk is valid, especially for the particular
// mode the stream is in. Currently this means that `null` is never accepted
// and undefined/non-string values are only allowed in object mode.
function validChunk(stream, state, chunk, cb) {
  var valid = true;
  var er = false;

  if (chunk === null) {
    er = new TypeError('May not write null values to stream');
  } else if (typeof chunk !== 'string' && chunk !== undefined && !state.objectMode) {
    er = new TypeError('Invalid non-string/buffer chunk');
  }
  if (er) {
    stream.emit('error', er);
    processNextTick(cb, er);
    valid = false;
  }
  return valid;
}

Writable.prototype.write = function (chunk, encoding, cb) {
  var state = this._writableState;
  var ret = false;
  var isBuf = Buffer.isBuffer(chunk);

  if (typeof encoding === 'function') {
    cb = encoding;
    encoding = null;
  }

  if (isBuf) encoding = 'buffer';else if (!encoding) encoding = state.defaultEncoding;

  if (typeof cb !== 'function') cb = nop;

  if (state.ended) writeAfterEnd(this, cb);else if (isBuf || validChunk(this, state, chunk, cb)) {
    state.pendingcb++;
    ret = writeOrBuffer(this, state, isBuf, chunk, encoding, cb);
  }

  return ret;
};

Writable.prototype.cork = function () {
  var state = this._writableState;

  state.corked++;
};

Writable.prototype.uncork = function () {
  var state = this._writableState;

  if (state.corked) {
    state.corked--;

    if (!state.writing && !state.corked && !state.finished && !state.bufferProcessing && state.bufferedRequest) clearBuffer(this, state);
  }
};

Writable.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
  // node::ParseEncoding() requires lower case.
  if (typeof encoding === 'string') encoding = encoding.toLowerCase();
  if (!(['hex', 'utf8', 'utf-8', 'ascii', 'binary', 'base64', 'ucs2', 'ucs-2', 'utf16le', 'utf-16le', 'raw'].indexOf((encoding + '').toLowerCase()) > -1)) throw new TypeError('Unknown encoding: ' + encoding);
  this._writableState.defaultEncoding = encoding;
  return this;
};

function decodeChunk(state, chunk, encoding) {
  if (!state.objectMode && state.decodeStrings !== false && typeof chunk === 'string') {
    chunk = bufferShim.from(chunk, encoding);
  }
  return chunk;
}

// if we're already writing something, then just put this
// in the queue, and wait our turn.  Otherwise, call _write
// If we return false, then we need a drain event, so set that flag.
function writeOrBuffer(stream, state, isBuf, chunk, encoding, cb) {
  if (!isBuf) {
    chunk = decodeChunk(state, chunk, encoding);
    if (Buffer.isBuffer(chunk)) encoding = 'buffer';
  }
  var len = state.objectMode ? 1 : chunk.length;

  state.length += len;

  var ret = state.length < state.highWaterMark;
  // we must ensure that previous needDrain will not be reset to false.
  if (!ret) state.needDrain = true;

  if (state.writing || state.corked) {
    var last = state.lastBufferedRequest;
    state.lastBufferedRequest = new WriteReq(chunk, encoding, cb);
    if (last) {
      last.next = state.lastBufferedRequest;
    } else {
      state.bufferedRequest = state.lastBufferedRequest;
    }
    state.bufferedRequestCount += 1;
  } else {
    doWrite(stream, state, false, len, chunk, encoding, cb);
  }

  return ret;
}

function doWrite(stream, state, writev, len, chunk, encoding, cb) {
  state.writelen = len;
  state.writecb = cb;
  state.writing = true;
  state.sync = true;
  if (writev) stream._writev(chunk, state.onwrite);else stream._write(chunk, encoding, state.onwrite);
  state.sync = false;
}

function onwriteError(stream, state, sync, er, cb) {
  --state.pendingcb;
  if (sync) processNextTick(cb, er);else cb(er);

  stream._writableState.errorEmitted = true;
  stream.emit('error', er);
}

function onwriteStateUpdate(state) {
  state.writing = false;
  state.writecb = null;
  state.length -= state.writelen;
  state.writelen = 0;
}

function onwrite(stream, er) {
  var state = stream._writableState;
  var sync = state.sync;
  var cb = state.writecb;

  onwriteStateUpdate(state);

  if (er) onwriteError(stream, state, sync, er, cb);else {
    // Check if we're actually ready to finish, but don't emit yet
    var finished = needFinish(state);

    if (!finished && !state.corked && !state.bufferProcessing && state.bufferedRequest) {
      clearBuffer(stream, state);
    }

    if (sync) {
      /*<replacement>*/
      asyncWrite(afterWrite, stream, state, finished, cb);
      /*</replacement>*/
    } else {
      afterWrite(stream, state, finished, cb);
    }
  }
}

function afterWrite(stream, state, finished, cb) {
  if (!finished) onwriteDrain(stream, state);
  state.pendingcb--;
  cb();
  finishMaybe(stream, state);
}

// Must force callback to be called on nextTick, so that we don't
// emit 'drain' before the write() consumer gets the 'false' return
// value, and has a chance to attach a 'drain' listener.
function onwriteDrain(stream, state) {
  if (state.length === 0 && state.needDrain) {
    state.needDrain = false;
    stream.emit('drain');
  }
}

// if there's something in the buffer waiting, then process it
function clearBuffer(stream, state) {
  state.bufferProcessing = true;
  var entry = state.bufferedRequest;

  if (stream._writev && entry && entry.next) {
    // Fast case, write everything using _writev()
    var l = state.bufferedRequestCount;
    var buffer = new Array(l);
    var holder = state.corkedRequestsFree;
    holder.entry = entry;

    var count = 0;
    while (entry) {
      buffer[count] = entry;
      entry = entry.next;
      count += 1;
    }

    doWrite(stream, state, true, state.length, buffer, '', holder.finish);

    // doWrite is almost always async, defer these to save a bit of time
    // as the hot path ends with doWrite
    state.pendingcb++;
    state.lastBufferedRequest = null;
    if (holder.next) {
      state.corkedRequestsFree = holder.next;
      holder.next = null;
    } else {
      state.corkedRequestsFree = new CorkedRequest(state);
    }
  } else {
    // Slow case, write chunks one-by-one
    while (entry) {
      var chunk = entry.chunk;
      var encoding = entry.encoding;
      var cb = entry.callback;
      var len = state.objectMode ? 1 : chunk.length;

      doWrite(stream, state, false, len, chunk, encoding, cb);
      entry = entry.next;
      // if we didn't call the onwrite immediately, then
      // it means that we need to wait until it does.
      // also, that means that the chunk and cb are currently
      // being processed, so move the buffer counter past them.
      if (state.writing) {
        break;
      }
    }

    if (entry === null) state.lastBufferedRequest = null;
  }

  state.bufferedRequestCount = 0;
  state.bufferedRequest = entry;
  state.bufferProcessing = false;
}

Writable.prototype._write = function (chunk, encoding, cb) {
  cb(new Error('_write() is not implemented'));
};

Writable.prototype._writev = null;

Writable.prototype.end = function (chunk, encoding, cb) {
  var state = this._writableState;

  if (typeof chunk === 'function') {
    cb = chunk;
    chunk = null;
    encoding = null;
  } else if (typeof encoding === 'function') {
    cb = encoding;
    encoding = null;
  }

  if (chunk !== null && chunk !== undefined) this.write(chunk, encoding);

  // .end() fully uncorks
  if (state.corked) {
    state.corked = 1;
    this.uncork();
  }

  // ignore unnecessary end() calls.
  if (!state.ending && !state.finished) endWritable(this, state, cb);
};

function needFinish(state) {
  return state.ending && state.length === 0 && state.bufferedRequest === null && !state.finished && !state.writing;
}

function prefinish(stream, state) {
  if (!state.prefinished) {
    state.prefinished = true;
    stream.emit('prefinish');
  }
}

function finishMaybe(stream, state) {
  var need = needFinish(state);
  if (need) {
    if (state.pendingcb === 0) {
      prefinish(stream, state);
      state.finished = true;
      stream.emit('finish');
    } else {
      prefinish(stream, state);
    }
  }
  return need;
}

function endWritable(stream, state, cb) {
  state.ending = true;
  finishMaybe(stream, state);
  if (cb) {
    if (state.finished) processNextTick(cb);else stream.once('finish', cb);
  }
  state.ended = true;
  stream.writable = false;
}

// It seems a linked list but it is not
// there will be only 2 of these for each stream
function CorkedRequest(state) {
  var _this = this;

  this.next = null;
  this.entry = null;
  this.finish = function (err) {
    var entry = _this.entry;
    _this.entry = null;
    while (entry) {
      var cb = entry.callback;
      state.pendingcb--;
      cb(err);
      entry = entry.next;
    }
    if (state.corkedRequestsFree) {
      state.corkedRequestsFree.next = _this;
    } else {
      state.corkedRequestsFree = _this;
    }
  };
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5), __webpack_require__(73).setImmediate))

/***/ }),

/***/ 205:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Utility functions for converting between strings and array buffers
 *
 * From https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding#Appendix.3A_Decode_a_Base64_string_to_Uint8Array_or_ArrayBuffer
 */
var BinaryUtils = function () {
  function BinaryUtils() {
    _classCallCheck(this, BinaryUtils);
  }

  _createClass(BinaryUtils, [{
    key: "base64StringToUint8Arr",

    /*\
    |*|
    |*|  Base64 / binary data / UTF-8 strings utilities
    |*|
    |*|  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Base64_encoding_and_decoding
    |*|
    \*/

    value: function base64StringToUint8Arr(sBase64, nBlocksSize) {
      return this._base64DecToArr(sBase64, nBlocksSize);
    }
  }, {
    key: "uint8ArrToBase64Str",
    value: function uint8ArrToBase64Str(aBytes) {
      return this._base64EncArr(aBytes);
    }
  }, {
    key: "utf8ArrToStr",
    value: function utf8ArrToStr(aBytes) {
      return this._UTF8ArrToStr(aBytes);
    }
  }, {
    key: "strToUTF8Arr",
    value: function strToUTF8Arr(sDOMStr) {
      return this._strToUTF8Arr(sDOMStr);
    }

    /* Array of bytes to base64 string decoding */

  }, {
    key: "_b64ToUint6",
    value: function _b64ToUint6(nChr) {

      return nChr > 64 && nChr < 91 ? nChr - 65 : nChr > 96 && nChr < 123 ? nChr - 71 : nChr > 47 && nChr < 58 ? nChr + 4 : nChr === 43 ? 62 : nChr === 47 ? 63 : 0;
    }
  }, {
    key: "_base64DecToArr",
    value: function _base64DecToArr(sBase64, nBlocksSize) {

      var sB64Enc = sBase64.replace(/[^A-Za-z0-9\+\/]/g, ""),
          nInLen = sB64Enc.length,
          nOutLen = nBlocksSize ? Math.ceil((nInLen * 3 + 1 >> 2) / nBlocksSize) * nBlocksSize : nInLen * 3 + 1 >> 2,
          taBytes = new Uint8Array(nOutLen);

      for (var nMod3, nMod4, nUint24 = 0, nOutIdx = 0, nInIdx = 0; nInIdx < nInLen; nInIdx++) {
        nMod4 = nInIdx & 3;
        nUint24 |= this._b64ToUint6(sB64Enc.charCodeAt(nInIdx)) << 18 - 6 * nMod4;
        if (nMod4 === 3 || nInLen - nInIdx === 1) {
          for (nMod3 = 0; nMod3 < 3 && nOutIdx < nOutLen; nMod3++, nOutIdx++) {
            taBytes[nOutIdx] = nUint24 >>> (16 >>> nMod3 & 24) & 255;
          }
          nUint24 = 0;
        }
      }

      return taBytes;
    }

    /* Base64 string to array encoding */

  }, {
    key: "_uint6ToB64",
    value: function _uint6ToB64(nUint6) {

      return nUint6 < 26 ? nUint6 + 65 : nUint6 < 52 ? nUint6 + 71 : nUint6 < 62 ? nUint6 - 4 : nUint6 === 62 ? 43 : nUint6 === 63 ? 47 : 65;
    }
  }, {
    key: "_base64EncArr",
    value: function _base64EncArr(aBytes) {

      var nMod3 = 2,
          sB64Enc = "";

      for (var nLen = aBytes.length, nUint24 = 0, nIdx = 0; nIdx < nLen; nIdx++) {
        nMod3 = nIdx % 3;
        if (nIdx > 0 && nIdx * 4 / 3 % 76 === 0) {
          sB64Enc += "\r\n";
        }
        nUint24 |= aBytes[nIdx] << (16 >>> nMod3 & 24);
        if (nMod3 === 2 || aBytes.length - nIdx === 1) {
          sB64Enc += String.fromCharCode(this._uint6ToB64(nUint24 >>> 18 & 63), this._uint6ToB64(nUint24 >>> 12 & 63), this._uint6ToB64(nUint24 >>> 6 & 63), this._uint6ToB64(nUint24 & 63));
          nUint24 = 0;
        }
      }

      return sB64Enc.substr(0, sB64Enc.length - 2 + nMod3) + (nMod3 === 2 ? '' : nMod3 === 1 ? '=' : '==');
    }

    /* UTF-8 array to DOMString and vice versa */

  }, {
    key: "_UTF8ArrToStr",
    value: function _UTF8ArrToStr(aBytes) {

      var sView = "";

      for (var nPart, nLen = aBytes.length, nIdx = 0; nIdx < nLen; nIdx++) {
        nPart = aBytes[nIdx];
        sView += String.fromCharCode(nPart > 251 && nPart < 254 && nIdx + 5 < nLen ? /* six bytes */
        /* (nPart - 252 << 30) may be not so safe in ECMAScript! So...: */
        (nPart - 252) * 1073741824 + (aBytes[++nIdx] - 128 << 24) + (aBytes[++nIdx] - 128 << 18) + (aBytes[++nIdx] - 128 << 12) + (aBytes[++nIdx] - 128 << 6) + aBytes[++nIdx] - 128 : nPart > 247 && nPart < 252 && nIdx + 4 < nLen ? /* five bytes */
        (nPart - 248 << 24) + (aBytes[++nIdx] - 128 << 18) + (aBytes[++nIdx] - 128 << 12) + (aBytes[++nIdx] - 128 << 6) + aBytes[++nIdx] - 128 : nPart > 239 && nPart < 248 && nIdx + 3 < nLen ? /* four bytes */
        (nPart - 240 << 18) + (aBytes[++nIdx] - 128 << 12) + (aBytes[++nIdx] - 128 << 6) + aBytes[++nIdx] - 128 : nPart > 223 && nPart < 240 && nIdx + 2 < nLen ? /* three bytes */
        (nPart - 224 << 12) + (aBytes[++nIdx] - 128 << 6) + aBytes[++nIdx] - 128 : nPart > 191 && nPart < 224 && nIdx + 1 < nLen ? /* two bytes */
        (nPart - 192 << 6) + aBytes[++nIdx] - 128 : /* nPart < 127 ? */ /* one byte */
        nPart);
      }

      return sView;
    }
  }, {
    key: "_strToUTF8Arr",
    value: function _strToUTF8Arr(sDOMStr) {

      var aBytes,
          nChr,
          nStrLen = sDOMStr.length,
          nArrLen = 0;

      /* mapping... */

      for (var nMapIdx = 0; nMapIdx < nStrLen; nMapIdx++) {
        nChr = sDOMStr.charCodeAt(nMapIdx);
        nArrLen += nChr < 0x80 ? 1 : nChr < 0x800 ? 2 : nChr < 0x10000 ? 3 : nChr < 0x200000 ? 4 : nChr < 0x4000000 ? 5 : 6;
      }

      aBytes = new Uint8Array(nArrLen);

      /* transcription... */

      for (var nIdx = 0, nChrIdx = 0; nIdx < nArrLen; nChrIdx++) {
        nChr = sDOMStr.charCodeAt(nChrIdx);
        if (nChr < 128) {
          /* one byte */
          aBytes[nIdx++] = nChr;
        } else if (nChr < 0x800) {
          /* two bytes */
          aBytes[nIdx++] = 192 + (nChr >>> 6);
          aBytes[nIdx++] = 128 + (nChr & 63);
        } else if (nChr < 0x10000) {
          /* three bytes */
          aBytes[nIdx++] = 224 + (nChr >>> 12);
          aBytes[nIdx++] = 128 + (nChr >>> 6 & 63);
          aBytes[nIdx++] = 128 + (nChr & 63);
        } else if (nChr < 0x200000) {
          /* four bytes */
          aBytes[nIdx++] = 240 + (nChr >>> 18);
          aBytes[nIdx++] = 128 + (nChr >>> 12 & 63);
          aBytes[nIdx++] = 128 + (nChr >>> 6 & 63);
          aBytes[nIdx++] = 128 + (nChr & 63);
        } else if (nChr < 0x4000000) {
          /* five bytes */
          aBytes[nIdx++] = 248 + (nChr >>> 24);
          aBytes[nIdx++] = 128 + (nChr >>> 18 & 63);
          aBytes[nIdx++] = 128 + (nChr >>> 12 & 63);
          aBytes[nIdx++] = 128 + (nChr >>> 6 & 63);
          aBytes[nIdx++] = 128 + (nChr & 63);
        } else /* if (nChr <= 0x7fffffff) */{
            /* six bytes */
            aBytes[nIdx++] = 252 + (nChr >>> 30);
            aBytes[nIdx++] = 128 + (nChr >>> 24 & 63);
            aBytes[nIdx++] = 128 + (nChr >>> 18 & 63);
            aBytes[nIdx++] = 128 + (nChr >>> 12 & 63);
            aBytes[nIdx++] = 128 + (nChr >>> 6 & 63);
            aBytes[nIdx++] = 128 + (nChr & 63);
          }
      }

      return aBytes;
    }
  }]);

  return BinaryUtils;
}();

exports.default = new BinaryUtils();
module.exports = exports["default"];

/***/ }),

/***/ 21:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {var Stream = (function (){
  try {
    return __webpack_require__(22); // hack to fix a circular dependency issue when used with browserify
  } catch(_){}
}());
exports = module.exports = __webpack_require__(35);
exports.Stream = Stream || exports;
exports.Readable = exports;
exports.Writable = __webpack_require__(20);
exports.Duplex = __webpack_require__(6);
exports.Transform = __webpack_require__(19);
exports.PassThrough = __webpack_require__(34);

if (!process.browser && process.env.READABLE_STREAM === 'disable' && Stream) {
  module.exports = Stream;
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5)))

/***/ }),

/***/ 22:
/***/ (function(module, exports, __webpack_require__) {

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

module.exports = Stream;

var EE = __webpack_require__(13).EventEmitter;
var inherits = __webpack_require__(4);

inherits(Stream, EE);
Stream.Readable = __webpack_require__(21);
Stream.Writable = __webpack_require__(68);
Stream.Duplex = __webpack_require__(64);
Stream.Transform = __webpack_require__(67);
Stream.PassThrough = __webpack_require__(66);

// Backwards-compat with node 0.4.x
Stream.Stream = Stream;



// old-style streams.  Note that the pipe method (the only relevant
// part of this class) is overridden in the Readable class.

function Stream() {
  EE.call(this);
}

Stream.prototype.pipe = function(dest, options) {
  var source = this;

  function ondata(chunk) {
    if (dest.writable) {
      if (false === dest.write(chunk) && source.pause) {
        source.pause();
      }
    }
  }

  source.on('data', ondata);

  function ondrain() {
    if (source.readable && source.resume) {
      source.resume();
    }
  }

  dest.on('drain', ondrain);

  // If the 'end' option is not supplied, dest.end() will be called when
  // source gets the 'end' or 'close' events.  Only dest.end() once.
  if (!dest._isStdio && (!options || options.end !== false)) {
    source.on('end', onend);
    source.on('close', onclose);
  }

  var didOnEnd = false;
  function onend() {
    if (didOnEnd) return;
    didOnEnd = true;

    dest.end();
  }


  function onclose() {
    if (didOnEnd) return;
    didOnEnd = true;

    if (typeof dest.destroy === 'function') dest.destroy();
  }

  // don't leave dangling pipes when there are errors.
  function onerror(er) {
    cleanup();
    if (EE.listenerCount(this, 'error') === 0) {
      throw er; // Unhandled stream error in pipe.
    }
  }

  source.on('error', onerror);
  dest.on('error', onerror);

  // remove all the event listeners that were added.
  function cleanup() {
    source.removeListener('data', ondata);
    dest.removeListener('drain', ondrain);

    source.removeListener('end', onend);
    source.removeListener('close', onclose);

    source.removeListener('error', onerror);
    dest.removeListener('error', onerror);

    source.removeListener('end', cleanup);
    source.removeListener('close', cleanup);

    dest.removeListener('close', cleanup);
  }

  source.on('end', cleanup);
  source.on('close', cleanup);

  dest.on('close', cleanup);

  dest.emit('pipe', source);

  // Allow for unix-like usage: A.pipe(B).pipe(C)
  return dest;
};


/***/ }),

/***/ 24:
/***/ (function(module, exports, __webpack_require__) {

//
// Autogenerated by Thrift Compiler (0.7.0-en-11139b3b5cb61e817408c6e84b0e1c258bf6c6ae)
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//


  // Define types and services

  var Thrift = __webpack_require__(0).Thrift;

  module.exports.EDAM_ATTRIBUTE_LEN_MIN = 1;

  module.exports.EDAM_ATTRIBUTE_LEN_MAX = 4096;

  module.exports.EDAM_ATTRIBUTE_REGEX = '^[^\\p{Cc}\\p{Zl}\\p{Zp}]{1,4096}$';

  module.exports.EDAM_ATTRIBUTE_LIST_MAX = 100;

  module.exports.EDAM_ATTRIBUTE_MAP_MAX = 100;

  module.exports.EDAM_GUID_LEN_MIN = 36;

  module.exports.EDAM_GUID_LEN_MAX = 36;

  module.exports.EDAM_GUID_REGEX = '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$';

  module.exports.EDAM_EMAIL_LEN_MIN = 6;

  module.exports.EDAM_EMAIL_LEN_MAX = 255;

  module.exports.EDAM_EMAIL_LOCAL_REGEX = '^[A-Za-z0-9!#$%&\'*+/=?^_`{|}~-]+(\\.[A-Za-z0-9!#$%&\'*+/=?^_`{|}~-]+)*$';

  module.exports.EDAM_EMAIL_DOMAIN_REGEX = '^[A-Za-z0-9-]*[A-Za-z0-9](\\.[A-Za-z0-9-]*[A-Za-z0-9])*\\.([A-Za-z]{2,})$';

  module.exports.EDAM_EMAIL_REGEX = '^[A-Za-z0-9!#$%&\'*+/=?^_`{|}~-]+(\\.[A-Za-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@[A-Za-z0-9-]*[A-Za-z0-9](\\.[A-Za-z0-9-]*[A-Za-z0-9])*\\.([A-Za-z]{2,})$';

  module.exports.EDAM_VAT_REGEX = '^(AT)?U[0-9]{8}$|^(BE)?0?[0-9]{9}$|^(BG)?[0-9]{9,10}$|^(CY)?[0-9]{8}L$|^(CZ)?[0-9]{8,10}$|^(DE)?[0-9]{9}$|^(DK)?[0-9]{8}$|^(EE)?[0-9]{9}$|^(EL|GR)?[0-9]{9}$|^(ES)?[0-9A-Z][0-9]{7}[0-9A-Z]$|^(FI)?[0-9]{8}$|^(FR)?[0-9A-Z]{2}[0-9]{9}$|^(GB)?([0-9]{9}([0-9]{3})?|[A-Z]{2}[0-9]{3})$|^(HU)?[0-9]{8}$|^(IE)?[0-9]{7}[A-Z]{1,2}$|^(IT)?[0-9]{11}$|^(LT)?([0-9]{9}|[0-9]{12})$|^(LU)?[0-9]{8}$|^(LV)?[0-9]{11}$|^(MT)?[0-9]{8}$|^(NL)?[0-9]{9}B[0-9]{2}$|^(PL)?[0-9]{10}$|^(PT)?[0-9]{9}$|^(RO)?[0-9]{2,10}$|^(SE)?[0-9]{12}$|^(SI)?[0-9]{8}$|^(SK)?[0-9]{10}$|^[0-9]{9}MVA$|^[0-9]{6}$|^CHE[0-9]{9}(TVA|MWST|IVA)$';

  module.exports.EDAM_TIMEZONE_LEN_MIN = 1;

  module.exports.EDAM_TIMEZONE_LEN_MAX = 32;

  module.exports.EDAM_TIMEZONE_REGEX = '^([A-Za-z_-]+(/[A-Za-z_-]+)*)|(GMT(-|\\+)[0-9]{1,2}(:[0-9]{2})?)$';

  module.exports.EDAM_MIME_LEN_MIN = 3;

  module.exports.EDAM_MIME_LEN_MAX = 255;

  module.exports.EDAM_MIME_REGEX = '^[A-Za-z]+/[A-Za-z0-9._+-]+$';

  module.exports.EDAM_MIME_TYPE_GIF = 'image/gif';

  module.exports.EDAM_MIME_TYPE_JPEG = 'image/jpeg';

  module.exports.EDAM_MIME_TYPE_PNG = 'image/png';

  module.exports.EDAM_MIME_TYPE_TIFF = 'image/tiff';

  module.exports.EDAM_MIME_TYPE_BMP = 'image/bmp';

  module.exports.EDAM_MIME_TYPE_WAV = 'audio/wav';

  module.exports.EDAM_MIME_TYPE_MP3 = 'audio/mpeg';

  module.exports.EDAM_MIME_TYPE_AMR = 'audio/amr';

  module.exports.EDAM_MIME_TYPE_AAC = 'audio/aac';

  module.exports.EDAM_MIME_TYPE_M4A = 'audio/mp4';

  module.exports.EDAM_MIME_TYPE_MP4_VIDEO = 'video/mp4';

  module.exports.EDAM_MIME_TYPE_INK = 'application/vnd.evernote.ink';

  module.exports.EDAM_MIME_TYPE_PDF = 'application/pdf';

  module.exports.EDAM_MIME_TYPE_DEFAULT = 'application/octet-stream';

  module.exports.EDAM_MIME_TYPES = ['image/gif','image/jpeg','image/png','audio/wav','audio/mpeg','audio/amr','application/vnd.evernote.ink','application/pdf','video/mp4','audio/aac','audio/mp4'];

  module.exports.EDAM_INDEXABLE_RESOURCE_MIME_TYPES = ['application/msword','application/mspowerpoint','application/excel','application/vnd.ms-word','application/vnd.ms-powerpoint','application/vnd.ms-excel','application/vnd.openxmlformats-officedocument.wordprocessingml.document','application/vnd.openxmlformats-officedocument.presentationml.presentation','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet','application/vnd.apple.pages','application/vnd.apple.numbers','application/vnd.apple.keynote','application/x-iwork-pages-sffpages','application/x-iwork-numbers-sffnumbers','application/x-iwork-keynote-sffkey'];

  module.exports.EDAM_INDEXABLE_PLAINTEXT_MIME_TYPES = ['application/x-sh','application/x-bsh','application/sql','application/x-sql'];

  module.exports.EDAM_COMMERCE_SERVICE_EVERNOTE = 'Evernote';

  module.exports.EDAM_COMMERCE_SERVICE_GOOGLE = 'Google';

  module.exports.EDAM_COMMERCE_SERVICE_PAYPAL = 'Paypal';

  module.exports.EDAM_COMMERCE_SERVICE_PAYPALRT = 'PaypalRT';

  module.exports.EDAM_COMMERCE_SERVICE_GIFT = 'Gift';

  module.exports.EDAM_COMMERCE_SERVICE_TRIALPAY = 'TrialPay';

  module.exports.EDAM_COMMERCE_SERVICE_TRIAL = 'Trial';

  module.exports.EDAM_COMMERCE_SERVICE_GROUP = 'Group';

  module.exports.EDAM_COMMERCE_SERVICE_BUNDLE = 'Bundle';

  module.exports.EDAM_COMMERCE_SERVICE_POINTS = 'Points';

  module.exports.EDAM_COMMERCE_SERVICE_CYBERSOURCE = 'CYBERSRC';

  module.exports.EDAM_COMMERCE_SERVICE_ANDROID = 'ANDROID';

  module.exports.EDAM_COMMERCE_SERVICE_AMAZON = 'AMAZON';

  module.exports.EDAM_COMMERCE_SERVICE_IPHONE = 'ITUNES';

  module.exports.EDAM_COMMERCE_SERVICE_IPHONE_SKITCH = 'ITUNES_S';

  module.exports.EDAM_COMMERCE_SERVICE_MAC = 'ITUNES_X';

  module.exports.EDAM_COMMERCE_SERVICE_BLACKBERRY = 'BB_WORLD';

  module.exports.EDAM_COMMERCE_SERVICE_BUSINESS = 'BUSINESS';

  module.exports.EDAM_COMMERCE_SERVICE_VAULT_CC_ADYEN = 'Biz-CC';

  module.exports.EDAM_COMMERCE_SERVICE_VAULT_CC_CYBERSOURCE = 'BIZ_CYB';

  module.exports.EDAM_COMMERCE_SERVICE_VAULT_INVOICE = 'Biz-INV';

  module.exports.EDAM_COMMERCE_SERVICE_VAULT_BILLY = 'BILLY';

  module.exports.EDAM_COMMERCE_SERVICE_VAULT_TRANSFER = 'TRANSFER';

  module.exports.EDAM_COMMERCE_SERVICE_ADYEN_ALIPAY = 'ALIPAY';

  module.exports.EDAM_COMMERCE_SERVICE_ADYEN_ALIPAY_AUTO_DEBIT = 'AlipayAD';

  module.exports.EDAM_COMMERCE_SERVICE_ALIPAY_DIRECT = 'ALIPAY_D';

  module.exports.EDAM_COMMERCE_SERVICE_ADYEN_BOKU = 'ADY_BOKU';

  module.exports.EDAM_COMMERCE_SERVICE_ADYEN_CREDITCARD = 'ADYEN_CC';

  module.exports.EDAM_COMMERCE_SERVICE_ADYEN_IDEAL = 'IDEAL';

  module.exports.EDAM_COMMERCE_SERVICE_ADYEN_GIROPAY = 'GIROPAY';

  module.exports.EDAM_COMMERCE_SERVICE_ADYEN_SOFORT = 'SOFORT';

  module.exports.EDAM_COMMERCE_SERVICE_ADYEN_PAYPAL = 'ADYEN_PP';

  module.exports.EDAM_COMMERCE_SERVICE_CASH_ON_DELIVERY = 'COD';

  module.exports.EDAM_COMMERCE_SERVICE_REPLACEMENT = 'REPL';

  module.exports.EDAM_COMMERCE_SERVICE_RESELLER = 'RESELLER';

  module.exports.EDAM_COMMERCE_SERVICE_FRIEND_REFERRAL = 'FRND_REF';

  module.exports.EDAM_COMMERCE_DEFAULT_CURRENCY_COUNTRY_CODE = 'USD';

  module.exports.EDAM_SEARCH_QUERY_LEN_MIN = 0;

  module.exports.EDAM_SEARCH_QUERY_LEN_MAX = 1024;

  module.exports.EDAM_SEARCH_QUERY_REGEX = '^[^\\p{Cc}\\p{Zl}\\p{Zp}]{0,1024}$';

  module.exports.EDAM_HASH_LEN = 16;

  module.exports.EDAM_USER_USERNAME_LEN_MIN = 1;

  module.exports.EDAM_USER_USERNAME_LEN_MAX = 64;

  module.exports.EDAM_USER_USERNAME_REGEX = '^[a-z0-9]([a-z0-9_-]{0,62}[a-z0-9])?$';

  module.exports.EDAM_USER_NAME_LEN_MIN = 1;

  module.exports.EDAM_USER_NAME_LEN_MAX = 255;

  module.exports.EDAM_USER_NAME_REGEX = '^[^\\p{Cc}\\p{Zl}\\p{Zp}]{1,255}$';

  module.exports.EDAM_TAG_NAME_LEN_MIN = 1;

  module.exports.EDAM_TAG_NAME_LEN_MAX = 100;

  module.exports.EDAM_TAG_NAME_REGEX = '^[^,\\p{Cc}\\p{Z}]([^,\\p{Cc}\\p{Zl}\\p{Zp}]{0,98}[^,\\p{Cc}\\p{Z}])?$';

  module.exports.EDAM_NOTE_TITLE_LEN_MIN = 1;

  module.exports.EDAM_NOTE_TITLE_LEN_MAX = 255;

  module.exports.EDAM_NOTE_TITLE_REGEX = '^[^\\p{Cc}\\p{Z}]([^\\p{Cc}\\p{Zl}\\p{Zp}]{0,253}[^\\p{Cc}\\p{Z}])?$';

  module.exports.EDAM_NOTE_CONTENT_LEN_MIN = 0;

  module.exports.EDAM_NOTE_CONTENT_LEN_MAX = 5242880;

  module.exports.EDAM_APPLICATIONDATA_NAME_LEN_MIN = 3;

  module.exports.EDAM_APPLICATIONDATA_NAME_LEN_MAX = 32;

  module.exports.EDAM_APPLICATIONDATA_VALUE_LEN_MIN = 0;

  module.exports.EDAM_APPLICATIONDATA_VALUE_LEN_MAX = 4092;

  module.exports.EDAM_APPLICATIONDATA_ENTRY_LEN_MAX = 4095;

  module.exports.EDAM_APPLICATIONDATA_NAME_REGEX = '^[A-Za-z0-9_.-]{3,32}$';

  module.exports.EDAM_APPLICATIONDATA_VALUE_REGEX = '^[\\p{Space}[^\\p{Cc}]]{0,4092}$';

  module.exports.EDAM_NOTEBOOK_NAME_LEN_MIN = 1;

  module.exports.EDAM_NOTEBOOK_NAME_LEN_MAX = 100;

  module.exports.EDAM_NOTEBOOK_NAME_REGEX = '^[^\\p{Cc}\\p{Z}]([^\\p{Cc}\\p{Zl}\\p{Zp}]{0,98}[^\\p{Cc}\\p{Z}])?$';

  module.exports.EDAM_NOTEBOOK_STACK_LEN_MIN = 1;

  module.exports.EDAM_NOTEBOOK_STACK_LEN_MAX = 100;

  module.exports.EDAM_NOTEBOOK_STACK_REGEX = '^[^\\p{Cc}\\p{Z}]([^\\p{Cc}\\p{Zl}\\p{Zp}]{0,98}[^\\p{Cc}\\p{Z}])?$';

  module.exports.EDAM_WORKSPACE_NAME_LEN_MIN = 1;

  module.exports.EDAM_WORKSPACE_NAME_LEN_MAX = 100;

  module.exports.EDAM_WORKSPACE_DESCRIPTION_LEN_MAX = 300;

  module.exports.EDAM_WORKSPACE_NAME_REGEX = '^[^\\p{Cc}\\p{Z}]([^\\p{Cc}\\p{Zl}\\p{Zp}]{0,98}[^\\p{Cc}\\p{Z}])?$';

  module.exports.EDAM_PUBLISHING_URI_LEN_MIN = 1;

  module.exports.EDAM_PUBLISHING_URI_LEN_MAX = 255;

  module.exports.EDAM_PUBLISHING_URI_REGEX = '^[a-zA-Z0-9.~_+-]{1,255}$';

  module.exports.EDAM_PUBLISHING_URI_PROHIBITED = ['.','..'];

  module.exports.EDAM_PUBLISHING_DESCRIPTION_LEN_MIN = 1;

  module.exports.EDAM_PUBLISHING_DESCRIPTION_LEN_MAX = 200;

  module.exports.EDAM_PUBLISHING_DESCRIPTION_REGEX = '^[^\\p{Cc}\\p{Z}]([^\\p{Cc}\\p{Zl}\\p{Zp}]{0,198}[^\\p{Cc}\\p{Z}])?$';

  module.exports.EDAM_SAVED_SEARCH_NAME_LEN_MIN = 1;

  module.exports.EDAM_SAVED_SEARCH_NAME_LEN_MAX = 100;

  module.exports.EDAM_SAVED_SEARCH_NAME_REGEX = '^[^\\p{Cc}\\p{Z}]([^\\p{Cc}\\p{Zl}\\p{Zp}]{0,98}[^\\p{Cc}\\p{Z}])?$';

  module.exports.EDAM_USER_PASSWORD_LEN_MIN = 6;

  module.exports.EDAM_USER_PASSWORD_LEN_MAX = 64;

  module.exports.EDAM_USER_PASSWORD_REGEX = '^[A-Za-z0-9!#$%&\'()*+,./:;<=>?@^_`{|}~\\[\\]\\\\-]{6,64}$';

  module.exports.EDAM_BUSINESS_URI_LEN_MAX = 32;

  module.exports.EDAM_BUSINESS_MARKETING_CODE_REGEX_PATTERN = '[A-Za-z0-9-]{1,128}';

  module.exports.EDAM_NOTE_TAGS_MAX = 100;

  module.exports.EDAM_NOTE_RESOURCES_MAX = 1000;

  module.exports.EDAM_USER_TAGS_MAX = 100000;

  module.exports.EDAM_BUSINESS_TAGS_MAX = 100000;

  module.exports.EDAM_USER_SAVED_SEARCHES_MAX = 100;

  module.exports.EDAM_USER_NOTES_MAX = 100000;

  module.exports.EDAM_BUSINESS_NOTES_MAX = 500000;

  module.exports.EDAM_USER_NOTEBOOKS_MAX = 250;

  module.exports.EDAM_USER_WORKSPACES_MAX = 0;

  module.exports.EDAM_BUSINESS_NOTEBOOKS_MAX = 10000;

  module.exports.EDAM_BUSINESS_WORKSPACES_MAX = 10000;

  module.exports.EDAM_USER_RECENT_MAILED_ADDRESSES_MAX = 10;

  module.exports.EDAM_USER_MAIL_LIMIT_DAILY_FREE = 50;

  module.exports.EDAM_USER_MAIL_LIMIT_DAILY_PREMIUM = 200;

  module.exports.EDAM_USER_UPLOAD_LIMIT_FREE = 62914560;

  module.exports.EDAM_USER_UPLOAD_LIMIT_PREMIUM = 10737418240;

  module.exports.EDAM_USER_UPLOAD_LIMIT_BUSINESS_FIRST_MONTH = 53687091200;

  module.exports.EDAM_USER_UPLOAD_LIMIT_BUSINESS_NEXT_MONTH = 21474836480;

  module.exports.EDAM_USER_UPLOAD_LIMIT_PLUS = 1073741824;

  module.exports.EDAM_USER_UPLOAD_SURVEY_THRESHOLD = 5368709120;

  module.exports.EDAM_USER_UPLOAD_LIMIT_BUSINESS = 10737418240;

  module.exports.EDAM_USER_UPLOAD_LIMIT_BUSINESS_PER_USER = 2147483647;

  module.exports.EDAM_NOTE_SIZE_MAX_FREE = 26214400;

  module.exports.EDAM_NOTE_SIZE_MAX_PREMIUM = 209715200;

  module.exports.EDAM_RESOURCE_SIZE_MAX_FREE = 26214400;

  module.exports.EDAM_RESOURCE_SIZE_MAX_PREMIUM = 209715200;

  module.exports.EDAM_USER_LINKED_NOTEBOOK_MAX = 100;

  module.exports.EDAM_USER_LINKED_NOTEBOOK_MAX_PREMIUM = 500;

  module.exports.EDAM_NOTEBOOK_BUSINESS_SHARED_NOTEBOOK_MAX = 5000;

  module.exports.EDAM_NOTEBOOK_PERSONAL_SHARED_NOTEBOOK_MAX = 500;

  module.exports.EDAM_NOTE_BUSINESS_SHARED_NOTE_MAX = 1000;

  module.exports.EDAM_NOTE_PERSONAL_SHARED_NOTE_MAX = 100;

  module.exports.EDAM_NOTE_CONTENT_CLASS_LEN_MIN = 3;

  module.exports.EDAM_NOTE_CONTENT_CLASS_LEN_MAX = 32;

  module.exports.EDAM_NOTE_CONTENT_CLASS_REGEX = '^[A-Za-z0-9_.-]{3,32}$';

  module.exports.EDAM_HELLO_APP_CONTENT_CLASS_PREFIX = 'evernote.hello.';

  module.exports.EDAM_FOOD_APP_CONTENT_CLASS_PREFIX = 'evernote.food.';

  module.exports.EDAM_CONTENT_CLASS_HELLO_ENCOUNTER = 'evernote.hello.encounter';

  module.exports.EDAM_CONTENT_CLASS_HELLO_PROFILE = 'evernote.hello.profile';

  module.exports.EDAM_CONTENT_CLASS_FOOD_MEAL = 'evernote.food.meal';

  module.exports.EDAM_CONTENT_CLASS_SKITCH_PREFIX = 'evernote.skitch';

  module.exports.EDAM_CONTENT_CLASS_SKITCH = 'evernote.skitch';

  module.exports.EDAM_CONTENT_CLASS_SKITCH_PDF = 'evernote.skitch.pdf';

  module.exports.EDAM_CONTENT_CLASS_PENULTIMATE_PREFIX = 'evernote.penultimate.';

  module.exports.EDAM_CONTENT_CLASS_PENULTIMATE_NOTEBOOK = 'evernote.penultimate.notebook';

  module.exports.EDAM_SOURCE_APPLICATION_POSTIT = 'postit';

  module.exports.EDAM_SOURCE_APPLICATION_MOLESKINE = 'moleskine';

  module.exports.EDAM_SOURCE_APPLICATION_EN_SCANSNAP = 'scanner.scansnap.evernote';

  module.exports.EDAM_SOURCE_APPLICATION_EWC = 'clipncite.web';

  module.exports.EDAM_SOURCE_APPLICATION_ANDROID_SHARE_EXTENSION = 'android.clipper.evernote';

  module.exports.EDAM_SOURCE_APPLICATION_IOS_SHARE_EXTENSION = 'ios.clipper.evernote';

  module.exports.EDAM_SOURCE_APPLICATION_WEB_CLIPPER = 'webclipper.evernote';

  module.exports.EDAM_SOURCE_OUTLOOK_CLIPPER = 'app.ms.outlook';

  module.exports.EDAM_NOTE_TITLE_QUALITY_UNTITLED = 0;

  module.exports.EDAM_NOTE_TITLE_QUALITY_LOW = 1;

  module.exports.EDAM_NOTE_TITLE_QUALITY_MEDIUM = 2;

  module.exports.EDAM_NOTE_TITLE_QUALITY_HIGH = 3;

  module.exports.EDAM_RELATED_PLAINTEXT_LEN_MIN = 1;

  module.exports.EDAM_RELATED_PLAINTEXT_LEN_MAX = 131072;

  module.exports.EDAM_RELATED_MAX_NOTES = 25;

  module.exports.EDAM_RELATED_MAX_NOTEBOOKS = 1;

  module.exports.EDAM_RELATED_MAX_TAGS = 25;

  module.exports.EDAM_RELATED_MAX_EXPERTS = 10;

  module.exports.EDAM_RELATED_MAX_RELATED_CONTENT = 10;

  module.exports.EDAM_BUSINESS_NOTEBOOK_DESCRIPTION_LEN_MIN = 1;

  module.exports.EDAM_BUSINESS_NOTEBOOK_DESCRIPTION_LEN_MAX = 200;

  module.exports.EDAM_BUSINESS_NOTEBOOK_DESCRIPTION_REGEX = '^[^\\p{Cc}\\p{Z}]([^\\p{Cc}\\p{Zl}\\p{Zp}]{0,198}[^\\p{Cc}\\p{Z}])?$';

  module.exports.EDAM_BUSINESS_PHONE_NUMBER_LEN_MAX = 20;

  module.exports.EDAM_PREFERENCE_NAME_LEN_MIN = 3;

  module.exports.EDAM_PREFERENCE_NAME_LEN_MAX = 32;

  module.exports.EDAM_PREFERENCE_VALUE_LEN_MIN = 1;

  module.exports.EDAM_PREFERENCE_VALUE_LEN_MAX = 1024;

  module.exports.EDAM_MAX_PREFERENCES = 100;

  module.exports.EDAM_MAX_VALUES_PER_PREFERENCE = 256;

  module.exports.EDAM_PREFERENCE_ONLY_ONE_VALUE_LEN_MAX = 16384;

  module.exports.EDAM_PREFERENCE_NAME_REGEX = '^[A-Za-z0-9_.-]{3,32}$';

  module.exports.EDAM_PREFERENCE_VALUE_REGEX = '^[^\\p{Cc}]{1,1024}$';

  module.exports.EDAM_PREFERENCE_ONLY_ONE_VALUE_REGEX = '^[^\\p{Cc}]{1,16384}$';

  module.exports.EDAM_PREFERENCE_SHORTCUTS = 'evernote.shortcuts';

  module.exports.EDAM_PREFERENCE_BUSINESS_DEFAULT_NOTEBOOK = 'evernote.business.notebook';

  module.exports.EDAM_PREFERENCE_BUSINESS_QUICKNOTE = 'evernote.business.quicknote';

  module.exports.EDAM_PREFERENCE_SHORTCUTS_MAX_VALUES = 250;

  module.exports.EDAM_DEVICE_ID_LEN_MAX = 32;

  module.exports.EDAM_DEVICE_ID_REGEX = '^[^\\p{Cc}]{1,32}$';

  module.exports.EDAM_DEVICE_DESCRIPTION_LEN_MAX = 64;

  module.exports.EDAM_DEVICE_DESCRIPTION_REGEX = '^[^\\p{Cc}]{1,64}$';

  module.exports.EDAM_SEARCH_SUGGESTIONS_MAX = 10;

  module.exports.EDAM_SEARCH_SUGGESTIONS_PREFIX_LEN_MAX = 1024;

  module.exports.EDAM_SEARCH_SUGGESTIONS_PREFIX_LEN_MIN = 2;

  module.exports.EDAM_FIND_CONTACT_DEFAULT_MAX_RESULTS = 100;

  module.exports.EDAM_FIND_CONTACT_MAX_RESULTS = 256;

  module.exports.EDAM_NOTE_LOCK_VIEWERS_NOTES_MAX = 150;

  module.exports.EDAM_GET_ORDERS_MAX_RESULTS = 2000;

  module.exports.EDAM_MESSAGE_BODY_LEN_MAX = 2048;

  module.exports.EDAM_MESSAGE_BODY_REGEX = '^[^\\p{Cc}\\p{Z}]([^\\p{Cc}\\p{Zl}\\p{Zp}]{0,2046}[^\\p{Cc}\\p{Z}])?$';

  module.exports.EDAM_MESSAGE_RECIPIENTS_MAX = 50;

  module.exports.EDAM_MESSAGE_ATTACHMENTS_MAX = 100;

  module.exports.EDAM_MESSAGE_ATTACHMENT_TITLE_LEN_MAX = 255;

  module.exports.EDAM_MESSAGE_ATTACHMENT_TITLE_REGEX = '^[^\\p{Cc}\\p{Z}]([^\\p{Cc}\\p{Zl}\\p{Zp}]{0,253}[^\\p{Cc}\\p{Z}])?$';

  module.exports.EDAM_MESSAGE_ATTACHMENT_SNIPPET_LEN_MAX = 2048;

  module.exports.EDAM_MESSAGE_ATTACHMENT_SNIPPET_REGEX = '^[^\\p{Cc}\\p{Z}]([\\n[^\\p{Cc}\\p{Zl}\\p{Zp}]]{0,2046}[^\\p{Cc}\\p{Z}])?$';

  module.exports.EDAM_USER_PROFILE_PHOTO_MAX_BYTES = 716800;

  module.exports.EDAM_PROMOTION_ID_LEN_MAX = 32;

  module.exports.EDAM_PROMOTION_ID_REGEX = '^[A-Za-z0-9_.-]{1,32}$';

  module.exports.EDAM_APP_RATING_MIN = 1;

  module.exports.EDAM_APP_RATING_MAX = 5;

  module.exports.EDAM_SNIPPETS_NOTES_MAX = 24;

  module.exports.EDAM_CONNECTED_IDENTITY_REQUEST_MAX = 100;

  module.exports.EDAM_OPEN_ID_ACCESS_TOKEN_MAX = 1000;



/***/ }),

/***/ 278:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_278__;

/***/ }),

/***/ 281:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_281__;

/***/ }),

/***/ 3:
/***/ (function(module, exports, __webpack_require__) {

//
// Autogenerated by Thrift Compiler (0.7.0-en-11139b3b5cb61e817408c6e84b0e1c258bf6c6ae)
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//


  // Define types and services

  var Thrift = __webpack_require__(0).Thrift;
  var Limits = __webpack_require__(24);


  module.exports.PrivilegeLevel = {
    'NORMAL' : 1,
    'PREMIUM' : 3,
    'VIP' : 5,
    'MANAGER' : 7,
    'SUPPORT' : 8,
    'ADMIN' : 9
  };

  module.exports.ServiceLevel = {
    'BASIC' : 1,
    'PLUS' : 2,
    'PREMIUM' : 3,
    'BUSINESS' : 4
  };

  module.exports.SubscriptionPeriod = {
    'MONTHLY' : 1,
    'YEARLY' : 12
  };

  module.exports.QueryFormat = {
    'USER' : 1,
    'SEXP' : 2
  };

  module.exports.NoteSortOrder = {
    'CREATED' : 1,
    'UPDATED' : 2,
    'RELEVANCE' : 3,
    'UPDATE_SEQUENCE_NUMBER' : 4,
    'TITLE' : 5
  };

  module.exports.PremiumOrderStatus = {
    'NONE' : 0,
    'PENDING' : 1,
    'ACTIVE' : 2,
    'FAILED' : 3,
    'CANCELLATION_PENDING' : 4,
    'CANCELED' : 5
  };

  module.exports.SharedNotebookPrivilegeLevel = {
    'READ_NOTEBOOK' : 0,
    'MODIFY_NOTEBOOK_PLUS_ACTIVITY' : 1,
    'READ_NOTEBOOK_PLUS_ACTIVITY' : 2,
    'GROUP' : 3,
    'FULL_ACCESS' : 4,
    'BUSINESS_FULL_ACCESS' : 5
  };

  module.exports.SharedNotePrivilegeLevel = {
    'READ_NOTE' : 0,
    'MODIFY_NOTE' : 1,
    'FULL_ACCESS' : 2
  };

  module.exports.SponsoredGroupRole = {
    'GROUP_MEMBER' : 1,
    'GROUP_ADMIN' : 2,
    'GROUP_OWNER' : 3
  };

  module.exports.BusinessUserRole = {
    'ADMIN' : 1,
    'NORMAL' : 2
  };

  module.exports.BusinessUserStatus = {
    'ACTIVE' : 1,
    'DEACTIVATED' : 2
  };

  module.exports.SharedNotebookInstanceRestrictions = {
    'ASSIGNED' : 1,
    'NO_SHARED_NOTEBOOKS' : 2
  };

  module.exports.ReminderEmailConfig = {
    'DO_NOT_SEND' : 1,
    'SEND_DAILY_EMAIL' : 2
  };

  module.exports.BusinessInvitationStatus = {
    'APPROVED' : 0,
    'REQUESTED' : 1,
    'REDEEMED' : 2
  };

  module.exports.ContactType = {
    'EVERNOTE' : 1,
    'SMS' : 2,
    'FACEBOOK' : 3,
    'EMAIL' : 4,
    'TWITTER' : 5,
    'LINKEDIN' : 6
  };

  module.exports.EntityType = {
    'NOTE' : 1,
    'NOTEBOOK' : 2,
    'WORKSPACE' : 3
  };

  module.exports.FeatureVersion = {
    'GNOME_AWARE' : 1,
    'PRE_SPACY' : 2,
    'SPACY' : 3
  };

  module.exports.IdentityState = {
    'ACTIVE' : 1,
    'ACTIVE_OPTOUT' : 2,
    'EXPIRED' : 3,
    'EXPIRED_OPTOUT' : 4,
    'CONTACT_DISASSOCIATED' : 5,
    'CONTACT_TRANSFER' : 6
  };

  module.exports.RecipientStatus = {
    'NOT_IN_MY_LIST' : 1,
    'IN_MY_LIST' : 2,
    'IN_MY_LIST_AND_DEFAULT_NOTEBOOK' : 3
  };

  module.exports.CanMoveToContainerStatus = {
    'CAN_BE_MOVED' : 1,
    'INSUFFICIENT_ENTITY_PRIVILEGE' : 2,
    'INSUFFICIENT_CONTAINER_PRIVILEGE' : 3
  };

  module.exports.RelatedContentType = {
    'NEWS_ARTICLE' : 1,
    'PROFILE_PERSON' : 2,
    'PROFILE_ORGANIZATION' : 3,
    'REFERENCE_MATERIAL' : 4
  };

  module.exports.RelatedContentAccess = {
    'NOT_ACCESSIBLE' : 0,
    'DIRECT_LINK_ACCESS_OK' : 1,
    'DIRECT_LINK_LOGIN_REQUIRED' : 2,
    'DIRECT_LINK_EMBEDDED_VIEW' : 3
  };

  module.exports.UserIdentityType = {
    'EVERNOTE_USERID' : 1,
    'EMAIL' : 2,
    'IDENTITYID' : 3
  };

  module.exports.CLASSIFICATION_RECIPE_USER_NON_RECIPE = '000';

  module.exports.CLASSIFICATION_RECIPE_USER_RECIPE = '001';

  module.exports.CLASSIFICATION_RECIPE_SERVICE_RECIPE = '002';

  module.exports.EDAM_NOTE_SOURCE_WEB_CLIP = 'web.clip';

  module.exports.EDAM_NOTE_SOURCE_WEB_CLIP_SIMPLIFIED = 'Clearly';

  module.exports.EDAM_NOTE_SOURCE_MAIL_CLIP = 'mail.clip';

  module.exports.EDAM_NOTE_SOURCE_MAIL_SMTP_GATEWAY = 'mail.smtp';

  module.exports.Data = Thrift.Struct.define('Data',  {
    1: { alias: 'bodyHash', type: Thrift.Type.BINARY },
    2: { alias: 'size', type: Thrift.Type.I32 },
    3: { alias: 'body', type: Thrift.Type.BINARY }
  });

  module.exports.UserAttributes = Thrift.Struct.define('UserAttributes',  {
    1: { alias: 'defaultLocationName', type: Thrift.Type.STRING },
    2: { alias: 'defaultLatitude', type: Thrift.Type.DOUBLE },
    3: { alias: 'defaultLongitude', type: Thrift.Type.DOUBLE },
    4: { alias: 'preactivation', type: Thrift.Type.BOOL },
    5: { alias: 'viewedPromotions', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRING)  },
    6: { alias: 'incomingEmailAddress', type: Thrift.Type.STRING },
    7: { alias: 'recentMailedAddresses', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRING)  },
    9: { alias: 'comments', type: Thrift.Type.STRING },
    11: { alias: 'dateAgreedToTermsOfService', type: Thrift.Type.I64 },
    12: { alias: 'maxReferrals', type: Thrift.Type.I32 },
    13: { alias: 'referralCount', type: Thrift.Type.I32 },
    14: { alias: 'refererCode', type: Thrift.Type.STRING },
    15: { alias: 'sentEmailDate', type: Thrift.Type.I64 },
    16: { alias: 'sentEmailCount', type: Thrift.Type.I32 },
    17: { alias: 'dailyEmailLimit', type: Thrift.Type.I32 },
    18: { alias: 'emailOptOutDate', type: Thrift.Type.I64 },
    19: { alias: 'partnerEmailOptInDate', type: Thrift.Type.I64 },
    20: { alias: 'preferredLanguage', type: Thrift.Type.STRING },
    21: { alias: 'preferredCountry', type: Thrift.Type.STRING },
    22: { alias: 'clipFullPage', type: Thrift.Type.BOOL },
    23: { alias: 'twitterUserName', type: Thrift.Type.STRING },
    24: { alias: 'twitterId', type: Thrift.Type.STRING },
    25: { alias: 'groupName', type: Thrift.Type.STRING },
    26: { alias: 'recognitionLanguage', type: Thrift.Type.STRING },
    28: { alias: 'referralProof', type: Thrift.Type.STRING },
    29: { alias: 'educationalDiscount', type: Thrift.Type.BOOL },
    30: { alias: 'businessAddress', type: Thrift.Type.STRING },
    31: { alias: 'hideSponsorBilling', type: Thrift.Type.BOOL },
    32: { alias: 'taxExempt', type: Thrift.Type.BOOL },
    33: { alias: 'useEmailAutoFiling', type: Thrift.Type.BOOL },
    34: { alias: 'reminderEmailConfig', type: Thrift.Type.I32 },
    35: { alias: 'emailAddressLastConfirmed', type: Thrift.Type.I64 },
    36: { alias: 'passwordUpdated', type: Thrift.Type.I64 },
    37: { alias: 'salesforcePushEnabled', type: Thrift.Type.BOOL },
    38: { alias: 'shouldLogClientEvent', type: Thrift.Type.BOOL },
    39: { alias: 'optOutMachineLearning', type: Thrift.Type.BOOL }
  });

  module.exports.BusinessUserAttributes = Thrift.Struct.define('BusinessUserAttributes',  {
    1: { alias: 'title', type: Thrift.Type.STRING },
    2: { alias: 'location', type: Thrift.Type.STRING },
    3: { alias: 'department', type: Thrift.Type.STRING },
    4: { alias: 'mobilePhone', type: Thrift.Type.STRING },
    5: { alias: 'linkedInProfileUrl', type: Thrift.Type.STRING },
    6: { alias: 'workPhone', type: Thrift.Type.STRING },
    7: { alias: 'companyStartDate', type: Thrift.Type.I64 }
  });

  module.exports.BusinessUserFilter = Thrift.Struct.define('BusinessUserFilter',  {
    1: { alias: 'roles', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.I32)  },
    2: { alias: 'createdBefore', type: Thrift.Type.I64 },
    3: { alias: 'statuses', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.I32)  }
  });

  module.exports.BackupPaymentInfo = Thrift.Struct.define('BackupPaymentInfo',  {
    1: { alias: 'premiumCommerceService', type: Thrift.Type.STRING },
    2: { alias: 'premiumServiceSKU', type: Thrift.Type.STRING },
    3: { alias: 'currency', type: Thrift.Type.STRING },
    4: { alias: 'unitPrice', type: Thrift.Type.I32 },
    5: { alias: 'paymentMethodId', type: Thrift.Type.I32 },
    6: { alias: 'orderNumber', type: Thrift.Type.STRING }
  });

  module.exports.Accounting = Thrift.Struct.define('Accounting',  {
    1: { alias: 'uploadLimit', type: Thrift.Type.I64 },
    2: { alias: 'uploadLimitEnd', type: Thrift.Type.I64 },
    3: { alias: 'uploadLimitNextMonth', type: Thrift.Type.I64 },
    4: { alias: 'premiumServiceStatus', type: Thrift.Type.I32 },
    5: { alias: 'premiumOrderNumber', type: Thrift.Type.STRING },
    6: { alias: 'premiumCommerceService', type: Thrift.Type.STRING },
    7: { alias: 'premiumServiceStart', type: Thrift.Type.I64 },
    8: { alias: 'premiumServiceSKU', type: Thrift.Type.STRING },
    9: { alias: 'lastSuccessfulCharge', type: Thrift.Type.I64 },
    10: { alias: 'lastFailedCharge', type: Thrift.Type.I64 },
    11: { alias: 'lastFailedChargeReason', type: Thrift.Type.STRING },
    12: { alias: 'nextPaymentDue', type: Thrift.Type.I64 },
    13: { alias: 'premiumLockUntil', type: Thrift.Type.I64 },
    14: { alias: 'updated', type: Thrift.Type.I64 },
    16: { alias: 'premiumSubscriptionNumber', type: Thrift.Type.STRING },
    17: { alias: 'lastRequestedCharge', type: Thrift.Type.I64 },
    18: { alias: 'currency', type: Thrift.Type.STRING },
    19: { alias: 'unitPrice', type: Thrift.Type.I32 },
    20: { alias: 'businessId', type: Thrift.Type.I32 },
    21: { alias: 'businessName', type: Thrift.Type.STRING },
    22: { alias: 'businessRole', type: Thrift.Type.I32 },
    23: { alias: 'unitDiscount', type: Thrift.Type.I32 },
    24: { alias: 'nextChargeDate', type: Thrift.Type.I64 },
    25: { alias: 'availablePoints', type: Thrift.Type.I32 },
    26: { alias: 'backupPaymentInfo', type: Thrift.Type.STRUCT, def: module.exports.BackupPaymentInfo }
  });

  module.exports.BusinessUserInfo = Thrift.Struct.define('BusinessUserInfo',  {
    1: { alias: 'businessId', type: Thrift.Type.I32 },
    2: { alias: 'businessName', type: Thrift.Type.STRING },
    3: { alias: 'role', type: Thrift.Type.I32 },
    4: { alias: 'email', type: Thrift.Type.STRING },
    5: { alias: 'updated', type: Thrift.Type.I64 }
  });

  module.exports.AccountLimits = Thrift.Struct.define('AccountLimits',  {
    1: { alias: 'userMailLimitDaily', type: Thrift.Type.I32 },
    2: { alias: 'noteSizeMax', type: Thrift.Type.I64 },
    3: { alias: 'resourceSizeMax', type: Thrift.Type.I64 },
    4: { alias: 'userLinkedNotebookMax', type: Thrift.Type.I32 },
    5: { alias: 'uploadLimit', type: Thrift.Type.I64 },
    6: { alias: 'userNoteCountMax', type: Thrift.Type.I32 },
    7: { alias: 'userNotebookCountMax', type: Thrift.Type.I32 },
    8: { alias: 'userTagCountMax', type: Thrift.Type.I32 },
    9: { alias: 'noteTagCountMax', type: Thrift.Type.I32 },
    10: { alias: 'userSavedSearchesMax', type: Thrift.Type.I32 },
    11: { alias: 'noteResourceCountMax', type: Thrift.Type.I32 },
    12: { alias: 'userDeviceLimit', type: Thrift.Type.I32 },
    13: { alias: 'userAdvertisedDeviceLimit', type: Thrift.Type.I32 },
    14: { alias: 'userWorkspaceCountMax', type: Thrift.Type.I32 }
  });

  module.exports.PricingModel = Thrift.Struct.define('PricingModel',  {
    1: { alias: 'gnomeActive', type: Thrift.Type.BOOL },
    2: { alias: 'gnomeWarmingPeriod', type: Thrift.Type.BOOL },
    3: { alias: 'pricingModelStart', type: Thrift.Type.I64 }
  });

  module.exports.PremiumInfo = Thrift.Struct.define('PremiumInfo',  {
    1: { alias: 'currentTime', type: Thrift.Type.I64 },
    2: { alias: 'premium', type: Thrift.Type.BOOL },
    3: { alias: 'premiumRecurring', type: Thrift.Type.BOOL },
    4: { alias: 'premiumExpirationDate', type: Thrift.Type.I64 },
    5: { alias: 'premiumExtendable', type: Thrift.Type.BOOL },
    6: { alias: 'premiumPending', type: Thrift.Type.BOOL },
    7: { alias: 'premiumCancellationPending', type: Thrift.Type.BOOL },
    8: { alias: 'canPurchaseUploadAllowance', type: Thrift.Type.BOOL },
    9: { alias: 'sponsoredGroupName', type: Thrift.Type.STRING },
    10: { alias: 'sponsoredGroupRole', type: Thrift.Type.I32 },
    11: { alias: 'premiumUpgradable', type: Thrift.Type.BOOL }
  });

  module.exports.SubscriptionInfo = Thrift.Struct.define('SubscriptionInfo',  {
    1: { alias: 'currentTime', type: Thrift.Type.I64 },
    2: { alias: 'currentlySubscribed', type: Thrift.Type.BOOL },
    3: { alias: 'subscriptionRecurring', type: Thrift.Type.BOOL },
    4: { alias: 'subscriptionExpirationDate', type: Thrift.Type.I64 },
    5: { alias: 'subscriptionPending', type: Thrift.Type.BOOL },
    6: { alias: 'subscriptionCancellationPending', type: Thrift.Type.BOOL },
    7: { alias: 'serviceLevelsEligibleForPurchase', type: Thrift.Type.SET, def: Thrift.Set.define(Thrift.Type.I32) },
    8: { alias: 'currentSku', type: Thrift.Type.STRING },
    9: { alias: 'validUntil', type: Thrift.Type.I64 },
    10: { alias: 'itunesReceiptRequested', type: Thrift.Type.BOOL }
  });

  module.exports.User = Thrift.Struct.define('User',  {
    1: { alias: 'id', type: Thrift.Type.I32 },
    2: { alias: 'username', type: Thrift.Type.STRING },
    3: { alias: 'email', type: Thrift.Type.STRING },
    4: { alias: 'name', type: Thrift.Type.STRING },
    6: { alias: 'timezone', type: Thrift.Type.STRING },
    7: { alias: 'privilege', type: Thrift.Type.I32 },
    21: { alias: 'serviceLevel', type: Thrift.Type.I32 },
    9: { alias: 'created', type: Thrift.Type.I64 },
    10: { alias: 'updated', type: Thrift.Type.I64 },
    11: { alias: 'deleted', type: Thrift.Type.I64 },
    13: { alias: 'active', type: Thrift.Type.BOOL },
    14: { alias: 'shardId', type: Thrift.Type.STRING },
    15: { alias: 'attributes', type: Thrift.Type.STRUCT, def: module.exports.UserAttributes },
    16: { alias: 'accounting', type: Thrift.Type.STRUCT, def: module.exports.Accounting },
    17: { alias: 'premiumInfo', type: Thrift.Type.STRUCT, def: module.exports.PremiumInfo },
    18: { alias: 'businessUserInfo', type: Thrift.Type.STRUCT, def: module.exports.BusinessUserInfo },
    19: { alias: 'photoUrl', type: Thrift.Type.STRING },
    20: { alias: 'photoLastUpdated', type: Thrift.Type.I64 },
    22: { alias: 'accountLimits', type: Thrift.Type.STRUCT, def: module.exports.AccountLimits },
    23: { alias: 'subscriptionInfo', type: Thrift.Type.STRUCT, def: module.exports.SubscriptionInfo },
    24: { alias: 'pricingModel', type: Thrift.Type.STRUCT, def: module.exports.PricingModel }
  });

  module.exports.Contact = Thrift.Struct.define('Contact',  {
    1: { alias: 'name', type: Thrift.Type.STRING },
    2: { alias: 'id', type: Thrift.Type.STRING },
    3: { alias: 'type', type: Thrift.Type.I32 },
    4: { alias: 'photoUrl', type: Thrift.Type.STRING },
    5: { alias: 'photoLastUpdated', type: Thrift.Type.I64 },
    6: { alias: 'messagingPermit', type: Thrift.Type.BINARY },
    7: { alias: 'messagingPermitExpires', type: Thrift.Type.I64 }
  });

  module.exports.Identity = Thrift.Struct.define('Identity',  {
    1: { alias: 'id', type: Thrift.Type.I64 },
    2: { alias: 'contact', type: Thrift.Type.STRUCT, def: module.exports.Contact },
    3: { alias: 'userId', type: Thrift.Type.I32 },
    4: { alias: 'deactivated', type: Thrift.Type.BOOL },
    5: { alias: 'sameBusiness', type: Thrift.Type.BOOL },
    6: { alias: 'blocked', type: Thrift.Type.BOOL },
    7: { alias: 'userConnected', type: Thrift.Type.BOOL },
    8: { alias: 'eventId', type: Thrift.Type.I64 }
  });

  module.exports.IdentityForAdmin = Thrift.Struct.define('IdentityForAdmin',  {
    1: { alias: 'identity', type: Thrift.Type.STRUCT, def: module.exports.Identity },
    2: { alias: 'state', type: Thrift.Type.I32 },
    3: { alias: 'stateChanged', type: Thrift.Type.I64 }
  });

  module.exports.Tag = Thrift.Struct.define('Tag',  {
    1: { alias: 'guid', type: Thrift.Type.STRING },
    2: { alias: 'name', type: Thrift.Type.STRING },
    3: { alias: 'parentGuid', type: Thrift.Type.STRING },
    4: { alias: 'updateSequenceNum', type: Thrift.Type.I32 }
  });

  module.exports.LazyMap = Thrift.Struct.define('LazyMap',  {
    1: { alias: 'keysOnly', type: Thrift.Type.SET, def: Thrift.Set.define(Thrift.Type.STRING) },
    2: { alias: 'fullMap', type: Thrift.Type.MAP, def: Thrift.Map.define(Thrift.Type.STRING, Thrift.Type.STRING )  }
  });

  module.exports.ResourceAttributes = Thrift.Struct.define('ResourceAttributes',  {
    1: { alias: 'sourceURL', type: Thrift.Type.STRING },
    2: { alias: 'timestamp', type: Thrift.Type.I64 },
    3: { alias: 'latitude', type: Thrift.Type.DOUBLE },
    4: { alias: 'longitude', type: Thrift.Type.DOUBLE },
    5: { alias: 'altitude', type: Thrift.Type.DOUBLE },
    6: { alias: 'cameraMake', type: Thrift.Type.STRING },
    7: { alias: 'cameraModel', type: Thrift.Type.STRING },
    8: { alias: 'clientWillIndex', type: Thrift.Type.BOOL },
    9: { alias: 'recoType', type: Thrift.Type.STRING },
    10: { alias: 'fileName', type: Thrift.Type.STRING },
    11: { alias: 'attachment', type: Thrift.Type.BOOL },
    12: { alias: 'applicationData', type: Thrift.Type.STRUCT, def: module.exports.LazyMap }
  });

  module.exports.Resource = Thrift.Struct.define('Resource',  {
    1: { alias: 'guid', type: Thrift.Type.STRING },
    2: { alias: 'noteGuid', type: Thrift.Type.STRING },
    3: { alias: 'data', type: Thrift.Type.STRUCT, def: module.exports.Data },
    4: { alias: 'mime', type: Thrift.Type.STRING },
    5: { alias: 'width', type: Thrift.Type.I16 },
    6: { alias: 'height', type: Thrift.Type.I16 },
    7: { alias: 'duration', type: Thrift.Type.I16 },
    8: { alias: 'active', type: Thrift.Type.BOOL },
    9: { alias: 'recognition', type: Thrift.Type.STRUCT, def: module.exports.Data },
    11: { alias: 'attributes', type: Thrift.Type.STRUCT, def: module.exports.ResourceAttributes },
    12: { alias: 'updateSequenceNum', type: Thrift.Type.I32 },
    13: { alias: 'alternateData', type: Thrift.Type.STRUCT, def: module.exports.Data }
  });

  module.exports.NoteAttributes = Thrift.Struct.define('NoteAttributes',  {
    1: { alias: 'subjectDate', type: Thrift.Type.I64 },
    10: { alias: 'latitude', type: Thrift.Type.DOUBLE },
    11: { alias: 'longitude', type: Thrift.Type.DOUBLE },
    12: { alias: 'altitude', type: Thrift.Type.DOUBLE },
    13: { alias: 'author', type: Thrift.Type.STRING },
    14: { alias: 'source', type: Thrift.Type.STRING },
    15: { alias: 'sourceURL', type: Thrift.Type.STRING },
    16: { alias: 'sourceApplication', type: Thrift.Type.STRING },
    17: { alias: 'shareDate', type: Thrift.Type.I64 },
    18: { alias: 'reminderOrder', type: Thrift.Type.I64 },
    19: { alias: 'reminderDoneTime', type: Thrift.Type.I64 },
    20: { alias: 'reminderTime', type: Thrift.Type.I64 },
    21: { alias: 'placeName', type: Thrift.Type.STRING },
    22: { alias: 'contentClass', type: Thrift.Type.STRING },
    23: { alias: 'applicationData', type: Thrift.Type.STRUCT, def: module.exports.LazyMap },
    24: { alias: 'lastEditedBy', type: Thrift.Type.STRING },
    26: { alias: 'classifications', type: Thrift.Type.MAP, def: Thrift.Map.define(Thrift.Type.STRING, Thrift.Type.STRING )  },
    27: { alias: 'creatorId', type: Thrift.Type.I32 },
    28: { alias: 'lastEditorId', type: Thrift.Type.I32 },
    29: { alias: 'sharedWithBusiness', type: Thrift.Type.BOOL },
    30: { alias: 'conflictSourceNoteGuid', type: Thrift.Type.STRING },
    31: { alias: 'noteTitleQuality', type: Thrift.Type.I32 }
  });

  module.exports.SharedNote = Thrift.Struct.define('SharedNote',  {
    1: { alias: 'sharerUserID', type: Thrift.Type.I32 },
    2: { alias: 'recipientIdentity', type: Thrift.Type.STRUCT, def: module.exports.Identity },
    3: { alias: 'privilege', type: Thrift.Type.I32 },
    4: { alias: 'serviceCreated', type: Thrift.Type.I64 },
    5: { alias: 'serviceUpdated', type: Thrift.Type.I64 },
    6: { alias: 'serviceAssigned', type: Thrift.Type.I64 }
  });

  module.exports.NoteRestrictions = Thrift.Struct.define('NoteRestrictions',  {
    1: { alias: 'noUpdateTitle', type: Thrift.Type.BOOL },
    2: { alias: 'noUpdateContent', type: Thrift.Type.BOOL },
    3: { alias: 'noEmail', type: Thrift.Type.BOOL },
    4: { alias: 'noShare', type: Thrift.Type.BOOL },
    5: { alias: 'noSharePublicly', type: Thrift.Type.BOOL }
  });

  module.exports.NoteLimits = Thrift.Struct.define('NoteLimits',  {
    1: { alias: 'noteResourceCountMax', type: Thrift.Type.I32 },
    2: { alias: 'uploadLimit', type: Thrift.Type.I64 },
    3: { alias: 'resourceSizeMax', type: Thrift.Type.I64 },
    4: { alias: 'noteSizeMax', type: Thrift.Type.I64 },
    5: { alias: 'uploaded', type: Thrift.Type.I64 }
  });

  module.exports.Note = Thrift.Struct.define('Note',  {
    1: { alias: 'guid', type: Thrift.Type.STRING },
    2: { alias: 'title', type: Thrift.Type.STRING },
    3: { alias: 'content', type: Thrift.Type.STRING },
    4: { alias: 'contentHash', type: Thrift.Type.BINARY },
    5: { alias: 'contentLength', type: Thrift.Type.I32 },
    6: { alias: 'created', type: Thrift.Type.I64 },
    7: { alias: 'updated', type: Thrift.Type.I64 },
    8: { alias: 'deleted', type: Thrift.Type.I64 },
    9: { alias: 'active', type: Thrift.Type.BOOL },
    10: { alias: 'updateSequenceNum', type: Thrift.Type.I32 },
    11: { alias: 'notebookGuid', type: Thrift.Type.STRING },
    12: { alias: 'tagGuids', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRING)  },
    13: { alias: 'resources', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, module.exports.Resource)  },
    14: { alias: 'attributes', type: Thrift.Type.STRUCT, def: module.exports.NoteAttributes },
    15: { alias: 'tagNames', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRING)  },
    16: { alias: 'sharedNotes', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, module.exports.SharedNote)  },
    17: { alias: 'restrictions', type: Thrift.Type.STRUCT, def: module.exports.NoteRestrictions },
    18: { alias: 'limits', type: Thrift.Type.STRUCT, def: module.exports.NoteLimits }
  });

  module.exports.Publishing = Thrift.Struct.define('Publishing',  {
    1: { alias: 'uri', type: Thrift.Type.STRING },
    2: { alias: 'order', type: Thrift.Type.I32 },
    3: { alias: 'ascending', type: Thrift.Type.BOOL },
    4: { alias: 'publicDescription', type: Thrift.Type.STRING }
  });

  module.exports.BusinessNotebook = Thrift.Struct.define('BusinessNotebook',  {
    1: { alias: 'notebookDescription', type: Thrift.Type.STRING },
    2: { alias: 'privilege', type: Thrift.Type.I32 },
    3: { alias: 'recommended', type: Thrift.Type.BOOL }
  });

  module.exports.SavedSearchScope = Thrift.Struct.define('SavedSearchScope',  {
    1: { alias: 'includeAccount', type: Thrift.Type.BOOL },
    2: { alias: 'includePersonalLinkedNotebooks', type: Thrift.Type.BOOL },
    3: { alias: 'includeBusinessLinkedNotebooks', type: Thrift.Type.BOOL }
  });

  module.exports.SavedSearch = Thrift.Struct.define('SavedSearch',  {
    1: { alias: 'guid', type: Thrift.Type.STRING },
    2: { alias: 'name', type: Thrift.Type.STRING },
    3: { alias: 'query', type: Thrift.Type.STRING },
    4: { alias: 'format', type: Thrift.Type.I32 },
    5: { alias: 'updateSequenceNum', type: Thrift.Type.I32 },
    6: { alias: 'scope', type: Thrift.Type.STRUCT, def: module.exports.SavedSearchScope }
  });

  module.exports.Ad = Thrift.Struct.define('Ad',  {
    1: { alias: 'id', type: Thrift.Type.I32 },
    2: { alias: 'width', type: Thrift.Type.I16 },
    3: { alias: 'height', type: Thrift.Type.I16 },
    4: { alias: 'advertiserName', type: Thrift.Type.STRING },
    5: { alias: 'imageUrl', type: Thrift.Type.STRING },
    6: { alias: 'destinationUrl', type: Thrift.Type.STRING },
    7: { alias: 'displaySeconds', type: Thrift.Type.I16 },
    8: { alias: 'score', type: Thrift.Type.DOUBLE },
    9: { alias: 'image', type: Thrift.Type.BINARY },
    10: { alias: 'imageMime', type: Thrift.Type.STRING },
    11: { alias: 'html', type: Thrift.Type.STRING },
    12: { alias: 'displayFrequency', type: Thrift.Type.DOUBLE },
    13: { alias: 'openInTrunk', type: Thrift.Type.BOOL }
  });

  module.exports.SharedNotebookRecipientSettings = Thrift.Struct.define('SharedNotebookRecipientSettings',  {
    1: { alias: 'reminderNotifyEmail', type: Thrift.Type.BOOL },
    2: { alias: 'reminderNotifyInApp', type: Thrift.Type.BOOL }
  });

  module.exports.NotebookRecipientSettings = Thrift.Struct.define('NotebookRecipientSettings',  {
    1: { alias: 'reminderNotifyEmail', type: Thrift.Type.BOOL },
    2: { alias: 'reminderNotifyInApp', type: Thrift.Type.BOOL },
    3: { alias: 'inMyList', type: Thrift.Type.BOOL },
    4: { alias: 'stack', type: Thrift.Type.STRING },
    5: { alias: 'recipientStatus', type: Thrift.Type.I32 }
  });

  module.exports.SharedNotebook = Thrift.Struct.define('SharedNotebook',  {
    1: { alias: 'id', type: Thrift.Type.I64 },
    2: { alias: 'userId', type: Thrift.Type.I32 },
    3: { alias: 'notebookGuid', type: Thrift.Type.STRING },
    4: { alias: 'email', type: Thrift.Type.STRING },
    18: { alias: 'recipientIdentityId', type: Thrift.Type.I64 },
    5: { alias: 'notebookModifiable', type: Thrift.Type.BOOL },
    7: { alias: 'serviceCreated', type: Thrift.Type.I64 },
    10: { alias: 'serviceUpdated', type: Thrift.Type.I64 },
    8: { alias: 'globalId', type: Thrift.Type.STRING },
    9: { alias: 'username', type: Thrift.Type.STRING },
    11: { alias: 'privilege', type: Thrift.Type.I32 },
    13: { alias: 'recipientSettings', type: Thrift.Type.STRUCT, def: module.exports.SharedNotebookRecipientSettings },
    14: { alias: 'sharerUserId', type: Thrift.Type.I32 },
    15: { alias: 'recipientUsername', type: Thrift.Type.STRING },
    17: { alias: 'recipientUserId', type: Thrift.Type.I32 },
    16: { alias: 'serviceAssigned', type: Thrift.Type.I64 }
  });

  module.exports.CanMoveToContainerRestrictions = Thrift.Struct.define('CanMoveToContainerRestrictions',  {
    1: { alias: 'canMoveToContainer', type: Thrift.Type.I32 }
  });

  module.exports.NotebookRestrictions = Thrift.Struct.define('NotebookRestrictions',  {
    1: { alias: 'noReadNotes', type: Thrift.Type.BOOL },
    2: { alias: 'noCreateNotes', type: Thrift.Type.BOOL },
    3: { alias: 'noUpdateNotes', type: Thrift.Type.BOOL },
    4: { alias: 'noExpungeNotes', type: Thrift.Type.BOOL },
    5: { alias: 'noShareNotes', type: Thrift.Type.BOOL },
    6: { alias: 'noEmailNotes', type: Thrift.Type.BOOL },
    7: { alias: 'noSendMessageToRecipients', type: Thrift.Type.BOOL },
    8: { alias: 'noUpdateNotebook', type: Thrift.Type.BOOL },
    9: { alias: 'noExpungeNotebook', type: Thrift.Type.BOOL },
    10: { alias: 'noSetDefaultNotebook', type: Thrift.Type.BOOL },
    11: { alias: 'noSetNotebookStack', type: Thrift.Type.BOOL },
    12: { alias: 'noPublishToPublic', type: Thrift.Type.BOOL },
    13: { alias: 'noPublishToBusinessLibrary', type: Thrift.Type.BOOL },
    14: { alias: 'noCreateTags', type: Thrift.Type.BOOL },
    15: { alias: 'noUpdateTags', type: Thrift.Type.BOOL },
    16: { alias: 'noExpungeTags', type: Thrift.Type.BOOL },
    17: { alias: 'noSetParentTag', type: Thrift.Type.BOOL },
    18: { alias: 'noCreateSharedNotebooks', type: Thrift.Type.BOOL },
    19: { alias: 'updateWhichSharedNotebookRestrictions', type: Thrift.Type.I32 },
    20: { alias: 'expungeWhichSharedNotebookRestrictions', type: Thrift.Type.I32 },
    21: { alias: 'noShareNotesWithBusiness', type: Thrift.Type.BOOL },
    22: { alias: 'noRenameNotebook', type: Thrift.Type.BOOL },
    23: { alias: 'noSetInMyList', type: Thrift.Type.BOOL },
    24: { alias: 'noChangeContact', type: Thrift.Type.BOOL },
    26: { alias: 'canMoveToContainerRestrictions', type: Thrift.Type.STRUCT, def: module.exports.CanMoveToContainerRestrictions },
    27: { alias: 'noSetReminderNotifyEmail', type: Thrift.Type.BOOL },
    28: { alias: 'noSetReminderNotifyInApp', type: Thrift.Type.BOOL },
    29: { alias: 'noSetRecipientSettingsStack', type: Thrift.Type.BOOL },
    30: { alias: 'noCanMoveNote', type: Thrift.Type.BOOL }
  });

  module.exports.Notebook = Thrift.Struct.define('Notebook',  {
    1: { alias: 'guid', type: Thrift.Type.STRING },
    2: { alias: 'name', type: Thrift.Type.STRING },
    5: { alias: 'updateSequenceNum', type: Thrift.Type.I32 },
    6: { alias: 'defaultNotebook', type: Thrift.Type.BOOL },
    7: { alias: 'serviceCreated', type: Thrift.Type.I64 },
    8: { alias: 'serviceUpdated', type: Thrift.Type.I64 },
    10: { alias: 'publishing', type: Thrift.Type.STRUCT, def: module.exports.Publishing },
    11: { alias: 'published', type: Thrift.Type.BOOL },
    12: { alias: 'stack', type: Thrift.Type.STRING },
    13: { alias: 'sharedNotebookIds', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.I64)  },
    14: { alias: 'sharedNotebooks', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, module.exports.SharedNotebook)  },
    15: { alias: 'businessNotebook', type: Thrift.Type.STRUCT, def: module.exports.BusinessNotebook },
    16: { alias: 'contact', type: Thrift.Type.STRUCT, def: module.exports.User },
    17: { alias: 'restrictions', type: Thrift.Type.STRUCT, def: module.exports.NotebookRestrictions },
    18: { alias: 'recipientSettings', type: Thrift.Type.STRUCT, def: module.exports.NotebookRecipientSettings },
    19: { alias: 'workspaceGuid', type: Thrift.Type.STRING },
    20: { alias: 'inWorkspace', type: Thrift.Type.BOOL }
  });

  module.exports.LinkedNotebook = Thrift.Struct.define('LinkedNotebook',  {
    2: { alias: 'shareName', type: Thrift.Type.STRING },
    3: { alias: 'username', type: Thrift.Type.STRING },
    4: { alias: 'shardId', type: Thrift.Type.STRING },
    5: { alias: 'sharedNotebookGlobalId', type: Thrift.Type.STRING },
    6: { alias: 'uri', type: Thrift.Type.STRING },
    7: { alias: 'guid', type: Thrift.Type.STRING },
    8: { alias: 'updateSequenceNum', type: Thrift.Type.I32 },
    9: { alias: 'noteStoreUrl', type: Thrift.Type.STRING },
    10: { alias: 'webApiUrlPrefix', type: Thrift.Type.STRING },
    11: { alias: 'stack', type: Thrift.Type.STRING },
    12: { alias: 'businessId', type: Thrift.Type.I32 }
  });

  module.exports.NotebookDescriptor = Thrift.Struct.define('NotebookDescriptor',  {
    1: { alias: 'guid', type: Thrift.Type.STRING },
    2: { alias: 'notebookDisplayName', type: Thrift.Type.STRING },
    3: { alias: 'contactName', type: Thrift.Type.STRING },
    4: { alias: 'hasSharedNotebook', type: Thrift.Type.BOOL },
    5: { alias: 'joinedUserCount', type: Thrift.Type.I32 }
  });

  module.exports.UserProfile = Thrift.Struct.define('UserProfile',  {
    1: { alias: 'id', type: Thrift.Type.I32 },
    2: { alias: 'name', type: Thrift.Type.STRING },
    3: { alias: 'email', type: Thrift.Type.STRING },
    4: { alias: 'username', type: Thrift.Type.STRING },
    5: { alias: 'attributes', type: Thrift.Type.STRUCT, def: module.exports.BusinessUserAttributes },
    6: { alias: 'joined', type: Thrift.Type.I64 },
    7: { alias: 'photoLastUpdated', type: Thrift.Type.I64 },
    8: { alias: 'photoUrl', type: Thrift.Type.STRING },
    9: { alias: 'role', type: Thrift.Type.I32 },
    10: { alias: 'status', type: Thrift.Type.I32 }
  });

  module.exports.RelatedContentImage = Thrift.Struct.define('RelatedContentImage',  {
    1: { alias: 'url', type: Thrift.Type.STRING },
    2: { alias: 'width', type: Thrift.Type.I32 },
    3: { alias: 'height', type: Thrift.Type.I32 },
    4: { alias: 'pixelRatio', type: Thrift.Type.DOUBLE },
    5: { alias: 'fileSize', type: Thrift.Type.I32 }
  });

  module.exports.RelatedContent = Thrift.Struct.define('RelatedContent',  {
    1: { alias: 'contentId', type: Thrift.Type.STRING },
    2: { alias: 'title', type: Thrift.Type.STRING },
    3: { alias: 'url', type: Thrift.Type.STRING },
    4: { alias: 'sourceId', type: Thrift.Type.STRING },
    5: { alias: 'sourceUrl', type: Thrift.Type.STRING },
    6: { alias: 'sourceFaviconUrl', type: Thrift.Type.STRING },
    7: { alias: 'sourceName', type: Thrift.Type.STRING },
    8: { alias: 'date', type: Thrift.Type.I64 },
    9: { alias: 'teaser', type: Thrift.Type.STRING },
    10: { alias: 'thumbnails', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, module.exports.RelatedContentImage)  },
    11: { alias: 'contentType', type: Thrift.Type.I32 },
    12: { alias: 'accessType', type: Thrift.Type.I32 },
    13: { alias: 'visibleUrl', type: Thrift.Type.STRING },
    14: { alias: 'clipUrl', type: Thrift.Type.STRING },
    15: { alias: 'contact', type: Thrift.Type.STRUCT, def: module.exports.Contact },
    16: { alias: 'authors', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRING)  }
  });

  module.exports.BusinessInvitation = Thrift.Struct.define('BusinessInvitation',  {
    1: { alias: 'businessId', type: Thrift.Type.I32 },
    2: { alias: 'email', type: Thrift.Type.STRING },
    3: { alias: 'role', type: Thrift.Type.I32 },
    4: { alias: 'status', type: Thrift.Type.I32 },
    5: { alias: 'requesterId', type: Thrift.Type.I32 },
    6: { alias: 'fromWorkChat', type: Thrift.Type.BOOL },
    7: { alias: 'created', type: Thrift.Type.I64 },
    8: { alias: 'mostRecentReminder', type: Thrift.Type.I64 }
  });

  module.exports.UserIdentity = Thrift.Struct.define('UserIdentity',  {
    1: { alias: 'type', type: Thrift.Type.I32 },
    2: { alias: 'stringIdentifier', type: Thrift.Type.STRING },
    3: { alias: 'longIdentifier', type: Thrift.Type.I64 }
  });

  module.exports.ClientAccessEntry = Thrift.Struct.define('ClientAccessEntry',  {
    1: { alias: 'accessTime', type: Thrift.Type.I64 },
    2: { alias: 'appName', type: Thrift.Type.STRING },
    3: { alias: 'deviceName', type: Thrift.Type.STRING },
    4: { alias: 'ipAddress', type: Thrift.Type.STRING },
    5: { alias: 'location', type: Thrift.Type.STRING },
    6: { alias: 'browserType', type: Thrift.Type.I32 },
    7: { alias: 'apiKeyId', type: Thrift.Type.I32 },
    8: { alias: 'longSessionCreated', type: Thrift.Type.I64 },
    9: { alias: 'userId', type: Thrift.Type.I32 },
    10: { alias: 'authenticatedClientUserId', type: Thrift.Type.I32 },
    11: { alias: 'businessAdmin', type: Thrift.Type.BOOL }
  });

  module.exports.ServiceAccessEntry = Thrift.Struct.define('ServiceAccessEntry',  {
    1: { alias: 'accessTime', type: Thrift.Type.I64 },
    2: { alias: 'serviceName', type: Thrift.Type.STRING },
    3: { alias: 'userId', type: Thrift.Type.I32 },
    4: { alias: 'authenticatedClientUserId', type: Thrift.Type.I32 },
    5: { alias: 'apiKeyId', type: Thrift.Type.I32 },
    6: { alias: 'businessAdmin', type: Thrift.Type.BOOL }
  });

  module.exports.NoncancelableSubscription = Thrift.Struct.define('NoncancelableSubscription',  {
    1: { alias: 'subscriptionId', type: Thrift.Type.I32 },
    2: { alias: 'user', type: Thrift.Type.STRUCT, def: module.exports.User },
    3: { alias: 'premiumServiceStatus', type: Thrift.Type.I32 },
    4: { alias: 'premiumCommerceService', type: Thrift.Type.STRING },
    5: { alias: 'itunesReceiptData', type: Thrift.Type.STRING },
    6: { alias: 'amazonUserId', type: Thrift.Type.STRING },
    7: { alias: 'amazonPurchaseToken', type: Thrift.Type.STRING },
    8: { alias: 'premiumServiceSku', type: Thrift.Type.STRING },
    9: { alias: 'nextPaymentDue', type: Thrift.Type.I64 },
    10: { alias: 'premiumLockUntil', type: Thrift.Type.I64 },
    11: { alias: 'currency', type: Thrift.Type.STRING },
    12: { alias: 'unitPrice', type: Thrift.Type.I32 },
    13: { alias: 'itunesOriginalTransactionId', type: Thrift.Type.STRING }
  });

  module.exports.LinkedAccount = Thrift.Struct.define('LinkedAccount',  {
    1: { alias: 'inAccountUserId', type: Thrift.Type.I32 },
    2: { alias: 'shardId', type: Thrift.Type.STRING },
    3: { alias: 'guid', type: Thrift.Type.STRING },
    4: { alias: 'updateSequenceNum', type: Thrift.Type.I32 },
    5: { alias: 'noteStoreUrl', type: Thrift.Type.STRING },
    6: { alias: 'webApiUrlPrefix', type: Thrift.Type.STRING }
  });



/***/ }),

/***/ 31:
/***/ (function(module, exports) {

var BinaryParser = {};

BinaryParser.fromByte = function(b) {
  'use strict';
  var buffer = new ArrayBuffer(1);
  new DataView(buffer).setInt8(0, b);
  return buffer;
};

BinaryParser.fromShort = function(i16) {
  'use strict';
  i16 = parseInt(i16);
  var buffer = new ArrayBuffer(2);
  new DataView(buffer).setInt16(0, i16);
  return buffer;
};

BinaryParser.fromInt = function(i32) {
  'use strict';
  i32 = parseInt(i32);
  var buffer = new ArrayBuffer(4);
  new DataView(buffer).setInt32(0, i32);
  return buffer;
};

BinaryParser.fromLong = function(n) {
  'use strict';
  n = parseInt(n);
  if (Math.abs(n) >= Math.pow(2, 53)) {
    throw new Error('Unable to accurately transfer numbers larger than 2^53 - 1 as integers. '
      + 'Number provided was ' + n);
  }

  var bits = (Array(64).join('0') + Math.abs(n).toString(2)).slice(-64);
  if (n < 0) {
    bits = this.twosCompliment(bits);
  }

  var buffer = new ArrayBuffer(8);
  var dataview = new DataView(buffer);
  for (var i = 0; i < 8; i++) {
    var uint8 = parseInt(bits.substr(8 * i, 8), 2);
    dataview.setUint8(i, uint8);
  }

  return buffer;
};

BinaryParser.twosCompliment = function(bits) {
    // Convert to two's compliment using string manipulation because bitwise operator is limited to 32 bit numbers
  'use strict';
  var smallestOne = bits.lastIndexOf('1');
  var left = bits.substring(0, smallestOne).
      replace(/1/g, 'x').
      replace(/0/g, '1').
      replace(/x/g, '0');
  bits = left + bits.substring(smallestOne);
  return bits;
};

BinaryParser.fromDouble = function(d) {
  'use strict';
  var buffer = new ArrayBuffer(8);
  new DataView(buffer).setFloat64(0, d);
  return buffer;
};

BinaryParser.fromString = function(s) {
  'use strict';
  var i;
  var utf8 = unescape(encodeURIComponent(s));
  var len = utf8.length;
  var bytes = new Uint8Array(len);

  for (i = 0; i < len; i++) {
    bytes[i] = utf8.charCodeAt(i);
  }
  return bytes.buffer;
};

BinaryParser.toByte = function(dataview) {
  'use strict';
  return dataview.getUint8(0);
};

BinaryParser.toBytes = function(dataview) {
  'use strict';
  var len = dataview.byteLength;
  var array = new Uint8Array(len);
  var i;
  for (i = 0; i < len; i++) {
    array[i] = dataview.getUint8(i);
  }
  return array;
};

BinaryParser.toShort = function(dataview) {
  'use strict';
  return dataview.getInt16(0);
};

BinaryParser.toInt = function(dataview) {
  'use strict';
  return dataview.getInt32(0);
};

BinaryParser.toLong = function(dataview) {
  // Javascript does not support 64-bit integers. Only decode values up to 2^53 - 1.
  'use strict';
  var sign = 1;
  var bits = '';
  for (var i = 0; i < 8; i++) {
    bits += (Array(8).join('0') + dataview.getUint8(i).toString(2)).slice(-8);
  }

  if (bits[0] === '1') {
    sign = -1;
    bits = this.twosCompliment(bits);
  }
  var largestOne = bits.indexOf('1');
  if (largestOne !== -1 && largestOne < 64 - 54) {
    throw new Error('Unable to receive number larger than 2^53 - 1 as an integer');
  }

  return parseInt(bits, 2) * sign;
};

BinaryParser.toDouble = function(dataview) {
  'use strict';
  return dataview.getFloat64(0);
};

BinaryParser.toString = function(dataview) {
  'use strict';
  var s = '';
  var i;
  var len = dataview.byteLength;
  var hex;

  for (i = 0; i < len; i++) {
    hex = dataview.getUint8(i).toString(16);
    if (hex.length == 1) {
      hex = '0' + hex;
    }
    s += '%' + hex;
  }

  s = decodeURIComponent(s);
  return s;
};

module.exports = BinaryParser;


/***/ }),

/***/ 32:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {function MemBuffer(buffer) {
  'use strict';
  this.queue = [];
  this.offset = 0;
  this.buffer = buffer;
}

MemBuffer.prototype.read = function(len) {
  'use strict';
  if (this.offset + len > this.buffer.length) {
    throw Error('MemBuffer overrun');
  }
  // console.log('MemBuffer.read len: ' + len + ' buffer.length: ' + this.buffer.length + ' offset: ' + this.offset);
  var buffer = this.buffer.slice(this.offset, this.offset + len);
  this.offset += len;
  return buffer;
};

MemBuffer.prototype.write = function(buffer) {
  'use strict';
  if (Buffer.isBuffer(buffer)) {
    this.queue.push(buffer);
  } else {
    throw Error('Unsupported type sent to MemBuffer.write. Accepts Buffer.');
  }
};

MemBuffer.prototype.clear = function() {
  'use strict';
  this.queue = [];
  this.buffer = null;
  this.offset = 0;
};

MemBuffer.prototype.flush = function() {
  'use strict';
  if (this.buffer) {
    this.queue.unshift(this.buffer);
  }
  this.buffer = Buffer.concat(this.queue);
  this.queue = [];
};

module.exports = MemBuffer;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1).Buffer))

/***/ }),

/***/ 33:
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),

/***/ 34:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// a passthrough stream.
// basically just the most minimal sort of Transform stream.
// Every written chunk gets output as-is.



module.exports = PassThrough;

var Transform = __webpack_require__(19);

/*<replacement>*/
var util = __webpack_require__(9);
util.inherits = __webpack_require__(4);
/*</replacement>*/

util.inherits(PassThrough, Transform);

function PassThrough(options) {
  if (!(this instanceof PassThrough)) return new PassThrough(options);

  Transform.call(this, options);
}

PassThrough.prototype._transform = function (chunk, encoding, cb) {
  cb(null, chunk);
};

/***/ }),

/***/ 35:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

module.exports = Readable;

/*<replacement>*/
var processNextTick = __webpack_require__(18);
/*</replacement>*/

/*<replacement>*/
var isArray = __webpack_require__(33);
/*</replacement>*/

/*<replacement>*/
var Duplex;
/*</replacement>*/

Readable.ReadableState = ReadableState;

/*<replacement>*/
var EE = __webpack_require__(13).EventEmitter;

var EElistenerCount = function (emitter, type) {
  return emitter.listeners(type).length;
};
/*</replacement>*/

/*<replacement>*/
var Stream;
(function () {
  try {
    Stream = __webpack_require__(22);
  } catch (_) {} finally {
    if (!Stream) Stream = __webpack_require__(13).EventEmitter;
  }
})();
/*</replacement>*/

var Buffer = __webpack_require__(1).Buffer;
/*<replacement>*/
var bufferShim = __webpack_require__(16);
/*</replacement>*/

/*<replacement>*/
var util = __webpack_require__(9);
util.inherits = __webpack_require__(4);
/*</replacement>*/

/*<replacement>*/
var debugUtil = __webpack_require__(79);
var debug = void 0;
if (debugUtil && debugUtil.debuglog) {
  debug = debugUtil.debuglog('stream');
} else {
  debug = function () {};
}
/*</replacement>*/

var BufferList = __webpack_require__(65);
var StringDecoder;

util.inherits(Readable, Stream);

function prependListener(emitter, event, fn) {
  // Sadly this is not cacheable as some libraries bundle their own
  // event emitter implementation with them.
  if (typeof emitter.prependListener === 'function') {
    return emitter.prependListener(event, fn);
  } else {
    // This is a hack to make sure that our error handler is attached before any
    // userland ones.  NEVER DO THIS. This is here only because this code needs
    // to continue to work with older versions of Node.js that do not include
    // the prependListener() method. The goal is to eventually remove this hack.
    if (!emitter._events || !emitter._events[event]) emitter.on(event, fn);else if (isArray(emitter._events[event])) emitter._events[event].unshift(fn);else emitter._events[event] = [fn, emitter._events[event]];
  }
}

function ReadableState(options, stream) {
  Duplex = Duplex || __webpack_require__(6);

  options = options || {};

  // object stream flag. Used to make read(n) ignore n and to
  // make all the buffer merging and length checks go away
  this.objectMode = !!options.objectMode;

  if (stream instanceof Duplex) this.objectMode = this.objectMode || !!options.readableObjectMode;

  // the point at which it stops calling _read() to fill the buffer
  // Note: 0 is a valid value, means "don't call _read preemptively ever"
  var hwm = options.highWaterMark;
  var defaultHwm = this.objectMode ? 16 : 16 * 1024;
  this.highWaterMark = hwm || hwm === 0 ? hwm : defaultHwm;

  // cast to ints.
  this.highWaterMark = ~~this.highWaterMark;

  // A linked list is used to store data chunks instead of an array because the
  // linked list can remove elements from the beginning faster than
  // array.shift()
  this.buffer = new BufferList();
  this.length = 0;
  this.pipes = null;
  this.pipesCount = 0;
  this.flowing = null;
  this.ended = false;
  this.endEmitted = false;
  this.reading = false;

  // a flag to be able to tell if the onwrite cb is called immediately,
  // or on a later tick.  We set this to true at first, because any
  // actions that shouldn't happen until "later" should generally also
  // not happen before the first write call.
  this.sync = true;

  // whenever we return null, then we set a flag to say
  // that we're awaiting a 'readable' event emission.
  this.needReadable = false;
  this.emittedReadable = false;
  this.readableListening = false;
  this.resumeScheduled = false;

  // Crypto is kind of old and crusty.  Historically, its default string
  // encoding is 'binary' so we have to make this configurable.
  // Everything else in the universe uses 'utf8', though.
  this.defaultEncoding = options.defaultEncoding || 'utf8';

  // when piping, we only care about 'readable' events that happen
  // after read()ing all the bytes and not getting any pushback.
  this.ranOut = false;

  // the number of writers that are awaiting a drain event in .pipe()s
  this.awaitDrain = 0;

  // if true, a maybeReadMore has been scheduled
  this.readingMore = false;

  this.decoder = null;
  this.encoding = null;
  if (options.encoding) {
    if (!StringDecoder) StringDecoder = __webpack_require__(37).StringDecoder;
    this.decoder = new StringDecoder(options.encoding);
    this.encoding = options.encoding;
  }
}

function Readable(options) {
  Duplex = Duplex || __webpack_require__(6);

  if (!(this instanceof Readable)) return new Readable(options);

  this._readableState = new ReadableState(options, this);

  // legacy
  this.readable = true;

  if (options && typeof options.read === 'function') this._read = options.read;

  Stream.call(this);
}

// Manually shove something into the read() buffer.
// This returns true if the highWaterMark has not been hit yet,
// similar to how Writable.write() returns true if you should
// write() some more.
Readable.prototype.push = function (chunk, encoding) {
  var state = this._readableState;

  if (!state.objectMode && typeof chunk === 'string') {
    encoding = encoding || state.defaultEncoding;
    if (encoding !== state.encoding) {
      chunk = bufferShim.from(chunk, encoding);
      encoding = '';
    }
  }

  return readableAddChunk(this, state, chunk, encoding, false);
};

// Unshift should *always* be something directly out of read()
Readable.prototype.unshift = function (chunk) {
  var state = this._readableState;
  return readableAddChunk(this, state, chunk, '', true);
};

Readable.prototype.isPaused = function () {
  return this._readableState.flowing === false;
};

function readableAddChunk(stream, state, chunk, encoding, addToFront) {
  var er = chunkInvalid(state, chunk);
  if (er) {
    stream.emit('error', er);
  } else if (chunk === null) {
    state.reading = false;
    onEofChunk(stream, state);
  } else if (state.objectMode || chunk && chunk.length > 0) {
    if (state.ended && !addToFront) {
      var e = new Error('stream.push() after EOF');
      stream.emit('error', e);
    } else if (state.endEmitted && addToFront) {
      var _e = new Error('stream.unshift() after end event');
      stream.emit('error', _e);
    } else {
      var skipAdd;
      if (state.decoder && !addToFront && !encoding) {
        chunk = state.decoder.write(chunk);
        skipAdd = !state.objectMode && chunk.length === 0;
      }

      if (!addToFront) state.reading = false;

      // Don't add to the buffer if we've decoded to an empty string chunk and
      // we're not in object mode
      if (!skipAdd) {
        // if we want the data now, just emit it.
        if (state.flowing && state.length === 0 && !state.sync) {
          stream.emit('data', chunk);
          stream.read(0);
        } else {
          // update the buffer info.
          state.length += state.objectMode ? 1 : chunk.length;
          if (addToFront) state.buffer.unshift(chunk);else state.buffer.push(chunk);

          if (state.needReadable) emitReadable(stream);
        }
      }

      maybeReadMore(stream, state);
    }
  } else if (!addToFront) {
    state.reading = false;
  }

  return needMoreData(state);
}

// if it's past the high water mark, we can push in some more.
// Also, if we have no data yet, we can stand some
// more bytes.  This is to work around cases where hwm=0,
// such as the repl.  Also, if the push() triggered a
// readable event, and the user called read(largeNumber) such that
// needReadable was set, then we ought to push more, so that another
// 'readable' event will be triggered.
function needMoreData(state) {
  return !state.ended && (state.needReadable || state.length < state.highWaterMark || state.length === 0);
}

// backwards compatibility.
Readable.prototype.setEncoding = function (enc) {
  if (!StringDecoder) StringDecoder = __webpack_require__(37).StringDecoder;
  this._readableState.decoder = new StringDecoder(enc);
  this._readableState.encoding = enc;
  return this;
};

// Don't raise the hwm > 8MB
var MAX_HWM = 0x800000;
function computeNewHighWaterMark(n) {
  if (n >= MAX_HWM) {
    n = MAX_HWM;
  } else {
    // Get the next highest power of 2 to prevent increasing hwm excessively in
    // tiny amounts
    n--;
    n |= n >>> 1;
    n |= n >>> 2;
    n |= n >>> 4;
    n |= n >>> 8;
    n |= n >>> 16;
    n++;
  }
  return n;
}

// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function howMuchToRead(n, state) {
  if (n <= 0 || state.length === 0 && state.ended) return 0;
  if (state.objectMode) return 1;
  if (n !== n) {
    // Only flow one buffer at a time
    if (state.flowing && state.length) return state.buffer.head.data.length;else return state.length;
  }
  // If we're asking for more than the current hwm, then raise the hwm.
  if (n > state.highWaterMark) state.highWaterMark = computeNewHighWaterMark(n);
  if (n <= state.length) return n;
  // Don't have enough
  if (!state.ended) {
    state.needReadable = true;
    return 0;
  }
  return state.length;
}

// you can override either this method, or the async _read(n) below.
Readable.prototype.read = function (n) {
  debug('read', n);
  n = parseInt(n, 10);
  var state = this._readableState;
  var nOrig = n;

  if (n !== 0) state.emittedReadable = false;

  // if we're doing read(0) to trigger a readable event, but we
  // already have a bunch of data in the buffer, then just trigger
  // the 'readable' event and move on.
  if (n === 0 && state.needReadable && (state.length >= state.highWaterMark || state.ended)) {
    debug('read: emitReadable', state.length, state.ended);
    if (state.length === 0 && state.ended) endReadable(this);else emitReadable(this);
    return null;
  }

  n = howMuchToRead(n, state);

  // if we've ended, and we're now clear, then finish it up.
  if (n === 0 && state.ended) {
    if (state.length === 0) endReadable(this);
    return null;
  }

  // All the actual chunk generation logic needs to be
  // *below* the call to _read.  The reason is that in certain
  // synthetic stream cases, such as passthrough streams, _read
  // may be a completely synchronous operation which may change
  // the state of the read buffer, providing enough data when
  // before there was *not* enough.
  //
  // So, the steps are:
  // 1. Figure out what the state of things will be after we do
  // a read from the buffer.
  //
  // 2. If that resulting state will trigger a _read, then call _read.
  // Note that this may be asynchronous, or synchronous.  Yes, it is
  // deeply ugly to write APIs this way, but that still doesn't mean
  // that the Readable class should behave improperly, as streams are
  // designed to be sync/async agnostic.
  // Take note if the _read call is sync or async (ie, if the read call
  // has returned yet), so that we know whether or not it's safe to emit
  // 'readable' etc.
  //
  // 3. Actually pull the requested chunks out of the buffer and return.

  // if we need a readable event, then we need to do some reading.
  var doRead = state.needReadable;
  debug('need readable', doRead);

  // if we currently have less than the highWaterMark, then also read some
  if (state.length === 0 || state.length - n < state.highWaterMark) {
    doRead = true;
    debug('length less than watermark', doRead);
  }

  // however, if we've ended, then there's no point, and if we're already
  // reading, then it's unnecessary.
  if (state.ended || state.reading) {
    doRead = false;
    debug('reading or ended', doRead);
  } else if (doRead) {
    debug('do read');
    state.reading = true;
    state.sync = true;
    // if the length is currently zero, then we *need* a readable event.
    if (state.length === 0) state.needReadable = true;
    // call internal read method
    this._read(state.highWaterMark);
    state.sync = false;
    // If _read pushed data synchronously, then `reading` will be false,
    // and we need to re-evaluate how much data we can return to the user.
    if (!state.reading) n = howMuchToRead(nOrig, state);
  }

  var ret;
  if (n > 0) ret = fromList(n, state);else ret = null;

  if (ret === null) {
    state.needReadable = true;
    n = 0;
  } else {
    state.length -= n;
  }

  if (state.length === 0) {
    // If we have nothing in the buffer, then we want to know
    // as soon as we *do* get something into the buffer.
    if (!state.ended) state.needReadable = true;

    // If we tried to read() past the EOF, then emit end on the next tick.
    if (nOrig !== n && state.ended) endReadable(this);
  }

  if (ret !== null) this.emit('data', ret);

  return ret;
};

function chunkInvalid(state, chunk) {
  var er = null;
  if (!Buffer.isBuffer(chunk) && typeof chunk !== 'string' && chunk !== null && chunk !== undefined && !state.objectMode) {
    er = new TypeError('Invalid non-string/buffer chunk');
  }
  return er;
}

function onEofChunk(stream, state) {
  if (state.ended) return;
  if (state.decoder) {
    var chunk = state.decoder.end();
    if (chunk && chunk.length) {
      state.buffer.push(chunk);
      state.length += state.objectMode ? 1 : chunk.length;
    }
  }
  state.ended = true;

  // emit 'readable' now to make sure it gets picked up.
  emitReadable(stream);
}

// Don't emit readable right away in sync mode, because this can trigger
// another read() call => stack overflow.  This way, it might trigger
// a nextTick recursion warning, but that's not so bad.
function emitReadable(stream) {
  var state = stream._readableState;
  state.needReadable = false;
  if (!state.emittedReadable) {
    debug('emitReadable', state.flowing);
    state.emittedReadable = true;
    if (state.sync) processNextTick(emitReadable_, stream);else emitReadable_(stream);
  }
}

function emitReadable_(stream) {
  debug('emit readable');
  stream.emit('readable');
  flow(stream);
}

// at this point, the user has presumably seen the 'readable' event,
// and called read() to consume some data.  that may have triggered
// in turn another _read(n) call, in which case reading = true if
// it's in progress.
// However, if we're not ended, or reading, and the length < hwm,
// then go ahead and try to read some more preemptively.
function maybeReadMore(stream, state) {
  if (!state.readingMore) {
    state.readingMore = true;
    processNextTick(maybeReadMore_, stream, state);
  }
}

function maybeReadMore_(stream, state) {
  var len = state.length;
  while (!state.reading && !state.flowing && !state.ended && state.length < state.highWaterMark) {
    debug('maybeReadMore read 0');
    stream.read(0);
    if (len === state.length)
      // didn't get any data, stop spinning.
      break;else len = state.length;
  }
  state.readingMore = false;
}

// abstract method.  to be overridden in specific implementation classes.
// call cb(er, data) where data is <= n in length.
// for virtual (non-string, non-buffer) streams, "length" is somewhat
// arbitrary, and perhaps not very meaningful.
Readable.prototype._read = function (n) {
  this.emit('error', new Error('_read() is not implemented'));
};

Readable.prototype.pipe = function (dest, pipeOpts) {
  var src = this;
  var state = this._readableState;

  switch (state.pipesCount) {
    case 0:
      state.pipes = dest;
      break;
    case 1:
      state.pipes = [state.pipes, dest];
      break;
    default:
      state.pipes.push(dest);
      break;
  }
  state.pipesCount += 1;
  debug('pipe count=%d opts=%j', state.pipesCount, pipeOpts);

  var doEnd = (!pipeOpts || pipeOpts.end !== false) && dest !== process.stdout && dest !== process.stderr;

  var endFn = doEnd ? onend : cleanup;
  if (state.endEmitted) processNextTick(endFn);else src.once('end', endFn);

  dest.on('unpipe', onunpipe);
  function onunpipe(readable) {
    debug('onunpipe');
    if (readable === src) {
      cleanup();
    }
  }

  function onend() {
    debug('onend');
    dest.end();
  }

  // when the dest drains, it reduces the awaitDrain counter
  // on the source.  This would be more elegant with a .once()
  // handler in flow(), but adding and removing repeatedly is
  // too slow.
  var ondrain = pipeOnDrain(src);
  dest.on('drain', ondrain);

  var cleanedUp = false;
  function cleanup() {
    debug('cleanup');
    // cleanup event handlers once the pipe is broken
    dest.removeListener('close', onclose);
    dest.removeListener('finish', onfinish);
    dest.removeListener('drain', ondrain);
    dest.removeListener('error', onerror);
    dest.removeListener('unpipe', onunpipe);
    src.removeListener('end', onend);
    src.removeListener('end', cleanup);
    src.removeListener('data', ondata);

    cleanedUp = true;

    // if the reader is waiting for a drain event from this
    // specific writer, then it would cause it to never start
    // flowing again.
    // So, if this is awaiting a drain, then we just call it now.
    // If we don't know, then assume that we are waiting for one.
    if (state.awaitDrain && (!dest._writableState || dest._writableState.needDrain)) ondrain();
  }

  // If the user pushes more data while we're writing to dest then we'll end up
  // in ondata again. However, we only want to increase awaitDrain once because
  // dest will only emit one 'drain' event for the multiple writes.
  // => Introduce a guard on increasing awaitDrain.
  var increasedAwaitDrain = false;
  src.on('data', ondata);
  function ondata(chunk) {
    debug('ondata');
    increasedAwaitDrain = false;
    var ret = dest.write(chunk);
    if (false === ret && !increasedAwaitDrain) {
      // If the user unpiped during `dest.write()`, it is possible
      // to get stuck in a permanently paused state if that write
      // also returned false.
      // => Check whether `dest` is still a piping destination.
      if ((state.pipesCount === 1 && state.pipes === dest || state.pipesCount > 1 && indexOf(state.pipes, dest) !== -1) && !cleanedUp) {
        debug('false write response, pause', src._readableState.awaitDrain);
        src._readableState.awaitDrain++;
        increasedAwaitDrain = true;
      }
      src.pause();
    }
  }

  // if the dest has an error, then stop piping into it.
  // however, don't suppress the throwing behavior for this.
  function onerror(er) {
    debug('onerror', er);
    unpipe();
    dest.removeListener('error', onerror);
    if (EElistenerCount(dest, 'error') === 0) dest.emit('error', er);
  }

  // Make sure our error handler is attached before userland ones.
  prependListener(dest, 'error', onerror);

  // Both close and finish should trigger unpipe, but only once.
  function onclose() {
    dest.removeListener('finish', onfinish);
    unpipe();
  }
  dest.once('close', onclose);
  function onfinish() {
    debug('onfinish');
    dest.removeListener('close', onclose);
    unpipe();
  }
  dest.once('finish', onfinish);

  function unpipe() {
    debug('unpipe');
    src.unpipe(dest);
  }

  // tell the dest that it's being piped to
  dest.emit('pipe', src);

  // start the flow if it hasn't been started already.
  if (!state.flowing) {
    debug('pipe resume');
    src.resume();
  }

  return dest;
};

function pipeOnDrain(src) {
  return function () {
    var state = src._readableState;
    debug('pipeOnDrain', state.awaitDrain);
    if (state.awaitDrain) state.awaitDrain--;
    if (state.awaitDrain === 0 && EElistenerCount(src, 'data')) {
      state.flowing = true;
      flow(src);
    }
  };
}

Readable.prototype.unpipe = function (dest) {
  var state = this._readableState;

  // if we're not piping anywhere, then do nothing.
  if (state.pipesCount === 0) return this;

  // just one destination.  most common case.
  if (state.pipesCount === 1) {
    // passed in one, but it's not the right one.
    if (dest && dest !== state.pipes) return this;

    if (!dest) dest = state.pipes;

    // got a match.
    state.pipes = null;
    state.pipesCount = 0;
    state.flowing = false;
    if (dest) dest.emit('unpipe', this);
    return this;
  }

  // slow case. multiple pipe destinations.

  if (!dest) {
    // remove all.
    var dests = state.pipes;
    var len = state.pipesCount;
    state.pipes = null;
    state.pipesCount = 0;
    state.flowing = false;

    for (var i = 0; i < len; i++) {
      dests[i].emit('unpipe', this);
    }return this;
  }

  // try to find the right one.
  var index = indexOf(state.pipes, dest);
  if (index === -1) return this;

  state.pipes.splice(index, 1);
  state.pipesCount -= 1;
  if (state.pipesCount === 1) state.pipes = state.pipes[0];

  dest.emit('unpipe', this);

  return this;
};

// set up data events if they are asked for
// Ensure readable listeners eventually get something
Readable.prototype.on = function (ev, fn) {
  var res = Stream.prototype.on.call(this, ev, fn);

  if (ev === 'data') {
    // Start flowing on next tick if stream isn't explicitly paused
    if (this._readableState.flowing !== false) this.resume();
  } else if (ev === 'readable') {
    var state = this._readableState;
    if (!state.endEmitted && !state.readableListening) {
      state.readableListening = state.needReadable = true;
      state.emittedReadable = false;
      if (!state.reading) {
        processNextTick(nReadingNextTick, this);
      } else if (state.length) {
        emitReadable(this, state);
      }
    }
  }

  return res;
};
Readable.prototype.addListener = Readable.prototype.on;

function nReadingNextTick(self) {
  debug('readable nexttick read 0');
  self.read(0);
}

// pause() and resume() are remnants of the legacy readable stream API
// If the user uses them, then switch into old mode.
Readable.prototype.resume = function () {
  var state = this._readableState;
  if (!state.flowing) {
    debug('resume');
    state.flowing = true;
    resume(this, state);
  }
  return this;
};

function resume(stream, state) {
  if (!state.resumeScheduled) {
    state.resumeScheduled = true;
    processNextTick(resume_, stream, state);
  }
}

function resume_(stream, state) {
  if (!state.reading) {
    debug('resume read 0');
    stream.read(0);
  }

  state.resumeScheduled = false;
  state.awaitDrain = 0;
  stream.emit('resume');
  flow(stream);
  if (state.flowing && !state.reading) stream.read(0);
}

Readable.prototype.pause = function () {
  debug('call pause flowing=%j', this._readableState.flowing);
  if (false !== this._readableState.flowing) {
    debug('pause');
    this._readableState.flowing = false;
    this.emit('pause');
  }
  return this;
};

function flow(stream) {
  var state = stream._readableState;
  debug('flow', state.flowing);
  while (state.flowing && stream.read() !== null) {}
}

// wrap an old-style stream as the async data source.
// This is *not* part of the readable stream interface.
// It is an ugly unfortunate mess of history.
Readable.prototype.wrap = function (stream) {
  var state = this._readableState;
  var paused = false;

  var self = this;
  stream.on('end', function () {
    debug('wrapped end');
    if (state.decoder && !state.ended) {
      var chunk = state.decoder.end();
      if (chunk && chunk.length) self.push(chunk);
    }

    self.push(null);
  });

  stream.on('data', function (chunk) {
    debug('wrapped data');
    if (state.decoder) chunk = state.decoder.write(chunk);

    // don't skip over falsy values in objectMode
    if (state.objectMode && (chunk === null || chunk === undefined)) return;else if (!state.objectMode && (!chunk || !chunk.length)) return;

    var ret = self.push(chunk);
    if (!ret) {
      paused = true;
      stream.pause();
    }
  });

  // proxy all the other methods.
  // important when wrapping filters and duplexes.
  for (var i in stream) {
    if (this[i] === undefined && typeof stream[i] === 'function') {
      this[i] = function (method) {
        return function () {
          return stream[method].apply(stream, arguments);
        };
      }(i);
    }
  }

  // proxy certain important events.
  var events = ['error', 'close', 'destroy', 'pause', 'resume'];
  forEach(events, function (ev) {
    stream.on(ev, self.emit.bind(self, ev));
  });

  // when we try to consume some more bytes, simply unpause the
  // underlying stream.
  self._read = function (n) {
    debug('wrapped _read', n);
    if (paused) {
      paused = false;
      stream.resume();
    }
  };

  return self;
};

// exposed for testing purposes only.
Readable._fromList = fromList;

// Pluck off n bytes from an array of buffers.
// Length is the combined lengths of all the buffers in the list.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function fromList(n, state) {
  // nothing buffered
  if (state.length === 0) return null;

  var ret;
  if (state.objectMode) ret = state.buffer.shift();else if (!n || n >= state.length) {
    // read it all, truncate the list
    if (state.decoder) ret = state.buffer.join('');else if (state.buffer.length === 1) ret = state.buffer.head.data;else ret = state.buffer.concat(state.length);
    state.buffer.clear();
  } else {
    // read part of list
    ret = fromListPartial(n, state.buffer, state.decoder);
  }

  return ret;
}

// Extracts only enough buffered data to satisfy the amount requested.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function fromListPartial(n, list, hasStrings) {
  var ret;
  if (n < list.head.data.length) {
    // slice is the same for buffers and strings
    ret = list.head.data.slice(0, n);
    list.head.data = list.head.data.slice(n);
  } else if (n === list.head.data.length) {
    // first chunk is a perfect match
    ret = list.shift();
  } else {
    // result spans more than one buffer
    ret = hasStrings ? copyFromBufferString(n, list) : copyFromBuffer(n, list);
  }
  return ret;
}

// Copies a specified amount of characters from the list of buffered data
// chunks.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function copyFromBufferString(n, list) {
  var p = list.head;
  var c = 1;
  var ret = p.data;
  n -= ret.length;
  while (p = p.next) {
    var str = p.data;
    var nb = n > str.length ? str.length : n;
    if (nb === str.length) ret += str;else ret += str.slice(0, n);
    n -= nb;
    if (n === 0) {
      if (nb === str.length) {
        ++c;
        if (p.next) list.head = p.next;else list.head = list.tail = null;
      } else {
        list.head = p;
        p.data = str.slice(nb);
      }
      break;
    }
    ++c;
  }
  list.length -= c;
  return ret;
}

// Copies a specified amount of bytes from the list of buffered data chunks.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function copyFromBuffer(n, list) {
  var ret = bufferShim.allocUnsafe(n);
  var p = list.head;
  var c = 1;
  p.data.copy(ret);
  n -= p.data.length;
  while (p = p.next) {
    var buf = p.data;
    var nb = n > buf.length ? buf.length : n;
    buf.copy(ret, ret.length - n, 0, nb);
    n -= nb;
    if (n === 0) {
      if (nb === buf.length) {
        ++c;
        if (p.next) list.head = p.next;else list.head = list.tail = null;
      } else {
        list.head = p;
        p.data = buf.slice(nb);
      }
      break;
    }
    ++c;
  }
  list.length -= c;
  return ret;
}

function endReadable(stream) {
  var state = stream._readableState;

  // If we get here before consuming all the bytes, then that is a
  // bug in node.  Should never happen.
  if (state.length > 0) throw new Error('"endReadable()" called on non-empty stream');

  if (!state.endEmitted) {
    state.ended = true;
    processNextTick(endReadableNT, state, stream);
  }
}

function endReadableNT(state, stream) {
  // Check that we didn't get one last unshift.
  if (!state.endEmitted && state.length === 0) {
    state.endEmitted = true;
    stream.readable = false;
    stream.emit('end');
  }
}

function forEach(xs, f) {
  for (var i = 0, l = xs.length; i < l; i++) {
    f(xs[i], i);
  }
}

function indexOf(xs, x) {
  for (var i = 0, l = xs.length; i < l; i++) {
    if (xs[i] === x) return i;
  }
  return -1;
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5)))

/***/ }),

/***/ 36:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {exports.fetch = isFunction(global.fetch) && isFunction(global.ReadableStream)

exports.blobConstructor = false
try {
	new Blob([new ArrayBuffer(1)])
	exports.blobConstructor = true
} catch (e) {}

// The xhr request to example.com may violate some restrictive CSP configurations,
// so if we're running in a browser that supports `fetch`, avoid calling getXHR()
// and assume support for certain features below.
var xhr
function getXHR () {
	// Cache the xhr value
	if (xhr !== undefined) return xhr

	if (global.XMLHttpRequest) {
		xhr = new global.XMLHttpRequest()
		// If XDomainRequest is available (ie only, where xhr might not work
		// cross domain), use the page location. Otherwise use example.com
		// Note: this doesn't actually make an http request.
		try {
			xhr.open('GET', global.XDomainRequest ? '/' : 'https://example.com')
		} catch(e) {
			xhr = null
		}
	} else {
		// Service workers don't have XHR
		xhr = null
	}
	return xhr
}

function checkTypeSupport (type) {
	var xhr = getXHR()
	if (!xhr) return false
	try {
		xhr.responseType = type
		return xhr.responseType === type
	} catch (e) {}
	return false
}

// For some strange reason, Safari 7.0 reports typeof global.ArrayBuffer === 'object'.
// Safari 7.1 appears to have fixed this bug.
var haveArrayBuffer = typeof global.ArrayBuffer !== 'undefined'
var haveSlice = haveArrayBuffer && isFunction(global.ArrayBuffer.prototype.slice)

// If fetch is supported, then arraybuffer will be supported too. Skip calling
// checkTypeSupport(), since that calls getXHR().
exports.arraybuffer = exports.fetch || (haveArrayBuffer && checkTypeSupport('arraybuffer'))

// These next two tests unavoidably show warnings in Chrome. Since fetch will always
// be used if it's available, just return false for these to avoid the warnings.
exports.msstream = !exports.fetch && haveSlice && checkTypeSupport('ms-stream')
exports.mozchunkedarraybuffer = !exports.fetch && haveArrayBuffer &&
	checkTypeSupport('moz-chunked-arraybuffer')

// If fetch is supported, then overrideMimeType will be supported too. Skip calling
// getXHR().
exports.overrideMimeType = exports.fetch || (getXHR() ? isFunction(getXHR().overrideMimeType) : false)

exports.vbArray = isFunction(global.VBArray)

function isFunction (value) {
	return typeof value === 'function'
}

xhr = null // Help gc

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),

/***/ 37:
/***/ (function(module, exports, __webpack_require__) {

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var Buffer = __webpack_require__(1).Buffer;

var isBufferEncoding = Buffer.isEncoding
  || function(encoding) {
       switch (encoding && encoding.toLowerCase()) {
         case 'hex': case 'utf8': case 'utf-8': case 'ascii': case 'binary': case 'base64': case 'ucs2': case 'ucs-2': case 'utf16le': case 'utf-16le': case 'raw': return true;
         default: return false;
       }
     }


function assertEncoding(encoding) {
  if (encoding && !isBufferEncoding(encoding)) {
    throw new Error('Unknown encoding: ' + encoding);
  }
}

// StringDecoder provides an interface for efficiently splitting a series of
// buffers into a series of JS strings without breaking apart multi-byte
// characters. CESU-8 is handled as part of the UTF-8 encoding.
//
// @TODO Handling all encodings inside a single object makes it very difficult
// to reason about this code, so it should be split up in the future.
// @TODO There should be a utf8-strict encoding that rejects invalid UTF-8 code
// points as used by CESU-8.
var StringDecoder = exports.StringDecoder = function(encoding) {
  this.encoding = (encoding || 'utf8').toLowerCase().replace(/[-_]/, '');
  assertEncoding(encoding);
  switch (this.encoding) {
    case 'utf8':
      // CESU-8 represents each of Surrogate Pair by 3-bytes
      this.surrogateSize = 3;
      break;
    case 'ucs2':
    case 'utf16le':
      // UTF-16 represents each of Surrogate Pair by 2-bytes
      this.surrogateSize = 2;
      this.detectIncompleteChar = utf16DetectIncompleteChar;
      break;
    case 'base64':
      // Base-64 stores 3 bytes in 4 chars, and pads the remainder.
      this.surrogateSize = 3;
      this.detectIncompleteChar = base64DetectIncompleteChar;
      break;
    default:
      this.write = passThroughWrite;
      return;
  }

  // Enough space to store all bytes of a single character. UTF-8 needs 4
  // bytes, but CESU-8 may require up to 6 (3 bytes per surrogate).
  this.charBuffer = new Buffer(6);
  // Number of bytes received for the current incomplete multi-byte character.
  this.charReceived = 0;
  // Number of bytes expected for the current incomplete multi-byte character.
  this.charLength = 0;
};


// write decodes the given buffer and returns it as JS string that is
// guaranteed to not contain any partial multi-byte characters. Any partial
// character found at the end of the buffer is buffered up, and will be
// returned when calling write again with the remaining bytes.
//
// Note: Converting a Buffer containing an orphan surrogate to a String
// currently works, but converting a String to a Buffer (via `new Buffer`, or
// Buffer#write) will replace incomplete surrogates with the unicode
// replacement character. See https://codereview.chromium.org/121173009/ .
StringDecoder.prototype.write = function(buffer) {
  var charStr = '';
  // if our last write ended with an incomplete multibyte character
  while (this.charLength) {
    // determine how many remaining bytes this buffer has to offer for this char
    var available = (buffer.length >= this.charLength - this.charReceived) ?
        this.charLength - this.charReceived :
        buffer.length;

    // add the new bytes to the char buffer
    buffer.copy(this.charBuffer, this.charReceived, 0, available);
    this.charReceived += available;

    if (this.charReceived < this.charLength) {
      // still not enough chars in this buffer? wait for more ...
      return '';
    }

    // remove bytes belonging to the current character from the buffer
    buffer = buffer.slice(available, buffer.length);

    // get the character that was split
    charStr = this.charBuffer.slice(0, this.charLength).toString(this.encoding);

    // CESU-8: lead surrogate (D800-DBFF) is also the incomplete character
    var charCode = charStr.charCodeAt(charStr.length - 1);
    if (charCode >= 0xD800 && charCode <= 0xDBFF) {
      this.charLength += this.surrogateSize;
      charStr = '';
      continue;
    }
    this.charReceived = this.charLength = 0;

    // if there are no more bytes in this buffer, just emit our char
    if (buffer.length === 0) {
      return charStr;
    }
    break;
  }

  // determine and set charLength / charReceived
  this.detectIncompleteChar(buffer);

  var end = buffer.length;
  if (this.charLength) {
    // buffer the incomplete character bytes we got
    buffer.copy(this.charBuffer, 0, buffer.length - this.charReceived, end);
    end -= this.charReceived;
  }

  charStr += buffer.toString(this.encoding, 0, end);

  var end = charStr.length - 1;
  var charCode = charStr.charCodeAt(end);
  // CESU-8: lead surrogate (D800-DBFF) is also the incomplete character
  if (charCode >= 0xD800 && charCode <= 0xDBFF) {
    var size = this.surrogateSize;
    this.charLength += size;
    this.charReceived += size;
    this.charBuffer.copy(this.charBuffer, size, 0, size);
    buffer.copy(this.charBuffer, 0, 0, size);
    return charStr.substring(0, end);
  }

  // or just emit the charStr
  return charStr;
};

// detectIncompleteChar determines if there is an incomplete UTF-8 character at
// the end of the given buffer. If so, it sets this.charLength to the byte
// length that character, and sets this.charReceived to the number of bytes
// that are available for this character.
StringDecoder.prototype.detectIncompleteChar = function(buffer) {
  // determine how many bytes we have to check at the end of this buffer
  var i = (buffer.length >= 3) ? 3 : buffer.length;

  // Figure out if one of the last i bytes of our buffer announces an
  // incomplete char.
  for (; i > 0; i--) {
    var c = buffer[buffer.length - i];

    // See http://en.wikipedia.org/wiki/UTF-8#Description

    // 110XXXXX
    if (i == 1 && c >> 5 == 0x06) {
      this.charLength = 2;
      break;
    }

    // 1110XXXX
    if (i <= 2 && c >> 4 == 0x0E) {
      this.charLength = 3;
      break;
    }

    // 11110XXX
    if (i <= 3 && c >> 3 == 0x1E) {
      this.charLength = 4;
      break;
    }
  }
  this.charReceived = i;
};

StringDecoder.prototype.end = function(buffer) {
  var res = '';
  if (buffer && buffer.length)
    res = this.write(buffer);

  if (this.charReceived) {
    var cr = this.charReceived;
    var buf = this.charBuffer;
    var enc = this.encoding;
    res += buf.slice(0, cr).toString(enc);
  }

  return res;
};

function passThroughWrite(buffer) {
  return buffer.toString(this.encoding);
}

function utf16DetectIncompleteChar(buffer) {
  this.charReceived = buffer.length % 2;
  this.charLength = this.charReceived ? 2 : 0;
}

function base64DetectIncompleteChar(buffer) {
  this.charReceived = buffer.length % 3;
  this.charLength = this.charReceived ? 3 : 0;
}


/***/ }),

/***/ 38:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var punycode = __webpack_require__(60);
var util = __webpack_require__(75);

exports.parse = urlParse;
exports.resolve = urlResolve;
exports.resolveObject = urlResolveObject;
exports.format = urlFormat;

exports.Url = Url;

function Url() {
  this.protocol = null;
  this.slashes = null;
  this.auth = null;
  this.host = null;
  this.port = null;
  this.hostname = null;
  this.hash = null;
  this.search = null;
  this.query = null;
  this.pathname = null;
  this.path = null;
  this.href = null;
}

// Reference: RFC 3986, RFC 1808, RFC 2396

// define these here so at least they only have to be
// compiled once on the first module load.
var protocolPattern = /^([a-z0-9.+-]+:)/i,
    portPattern = /:[0-9]*$/,

    // Special case for a simple path URL
    simplePathPattern = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,

    // RFC 2396: characters reserved for delimiting URLs.
    // We actually just auto-escape these.
    delims = ['<', '>', '"', '`', ' ', '\r', '\n', '\t'],

    // RFC 2396: characters not allowed for various reasons.
    unwise = ['{', '}', '|', '\\', '^', '`'].concat(delims),

    // Allowed by RFCs, but cause of XSS attacks.  Always escape these.
    autoEscape = ['\''].concat(unwise),
    // Characters that are never ever allowed in a hostname.
    // Note that any invalid chars are also handled, but these
    // are the ones that are *expected* to be seen, so we fast-path
    // them.
    nonHostChars = ['%', '/', '?', ';', '#'].concat(autoEscape),
    hostEndingChars = ['/', '?', '#'],
    hostnameMaxLen = 255,
    hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/,
    hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
    // protocols that can allow "unsafe" and "unwise" chars.
    unsafeProtocol = {
      'javascript': true,
      'javascript:': true
    },
    // protocols that never have a hostname.
    hostlessProtocol = {
      'javascript': true,
      'javascript:': true
    },
    // protocols that always contain a // bit.
    slashedProtocol = {
      'http': true,
      'https': true,
      'ftp': true,
      'gopher': true,
      'file': true,
      'http:': true,
      'https:': true,
      'ftp:': true,
      'gopher:': true,
      'file:': true
    },
    querystring = __webpack_require__(63);

function urlParse(url, parseQueryString, slashesDenoteHost) {
  if (url && util.isObject(url) && url instanceof Url) return url;

  var u = new Url;
  u.parse(url, parseQueryString, slashesDenoteHost);
  return u;
}

Url.prototype.parse = function(url, parseQueryString, slashesDenoteHost) {
  if (!util.isString(url)) {
    throw new TypeError("Parameter 'url' must be a string, not " + typeof url);
  }

  // Copy chrome, IE, opera backslash-handling behavior.
  // Back slashes before the query string get converted to forward slashes
  // See: https://code.google.com/p/chromium/issues/detail?id=25916
  var queryIndex = url.indexOf('?'),
      splitter =
          (queryIndex !== -1 && queryIndex < url.indexOf('#')) ? '?' : '#',
      uSplit = url.split(splitter),
      slashRegex = /\\/g;
  uSplit[0] = uSplit[0].replace(slashRegex, '/');
  url = uSplit.join(splitter);

  var rest = url;

  // trim before proceeding.
  // This is to support parse stuff like "  http://foo.com  \n"
  rest = rest.trim();

  if (!slashesDenoteHost && url.split('#').length === 1) {
    // Try fast path regexp
    var simplePath = simplePathPattern.exec(rest);
    if (simplePath) {
      this.path = rest;
      this.href = rest;
      this.pathname = simplePath[1];
      if (simplePath[2]) {
        this.search = simplePath[2];
        if (parseQueryString) {
          this.query = querystring.parse(this.search.substr(1));
        } else {
          this.query = this.search.substr(1);
        }
      } else if (parseQueryString) {
        this.search = '';
        this.query = {};
      }
      return this;
    }
  }

  var proto = protocolPattern.exec(rest);
  if (proto) {
    proto = proto[0];
    var lowerProto = proto.toLowerCase();
    this.protocol = lowerProto;
    rest = rest.substr(proto.length);
  }

  // figure out if it's got a host
  // user@server is *always* interpreted as a hostname, and url
  // resolution will treat //foo/bar as host=foo,path=bar because that's
  // how the browser resolves relative URLs.
  if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
    var slashes = rest.substr(0, 2) === '//';
    if (slashes && !(proto && hostlessProtocol[proto])) {
      rest = rest.substr(2);
      this.slashes = true;
    }
  }

  if (!hostlessProtocol[proto] &&
      (slashes || (proto && !slashedProtocol[proto]))) {

    // there's a hostname.
    // the first instance of /, ?, ;, or # ends the host.
    //
    // If there is an @ in the hostname, then non-host chars *are* allowed
    // to the left of the last @ sign, unless some host-ending character
    // comes *before* the @-sign.
    // URLs are obnoxious.
    //
    // ex:
    // http://a@b@c/ => user:a@b host:c
    // http://a@b?@c => user:a host:c path:/?@c

    // v0.12 TODO(isaacs): This is not quite how Chrome does things.
    // Review our test case against browsers more comprehensively.

    // find the first instance of any hostEndingChars
    var hostEnd = -1;
    for (var i = 0; i < hostEndingChars.length; i++) {
      var hec = rest.indexOf(hostEndingChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
        hostEnd = hec;
    }

    // at this point, either we have an explicit point where the
    // auth portion cannot go past, or the last @ char is the decider.
    var auth, atSign;
    if (hostEnd === -1) {
      // atSign can be anywhere.
      atSign = rest.lastIndexOf('@');
    } else {
      // atSign must be in auth portion.
      // http://a@b/c@d => host:b auth:a path:/c@d
      atSign = rest.lastIndexOf('@', hostEnd);
    }

    // Now we have a portion which is definitely the auth.
    // Pull that off.
    if (atSign !== -1) {
      auth = rest.slice(0, atSign);
      rest = rest.slice(atSign + 1);
      this.auth = decodeURIComponent(auth);
    }

    // the host is the remaining to the left of the first non-host char
    hostEnd = -1;
    for (var i = 0; i < nonHostChars.length; i++) {
      var hec = rest.indexOf(nonHostChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
        hostEnd = hec;
    }
    // if we still have not hit it, then the entire thing is a host.
    if (hostEnd === -1)
      hostEnd = rest.length;

    this.host = rest.slice(0, hostEnd);
    rest = rest.slice(hostEnd);

    // pull out port.
    this.parseHost();

    // we've indicated that there is a hostname,
    // so even if it's empty, it has to be present.
    this.hostname = this.hostname || '';

    // if hostname begins with [ and ends with ]
    // assume that it's an IPv6 address.
    var ipv6Hostname = this.hostname[0] === '[' &&
        this.hostname[this.hostname.length - 1] === ']';

    // validate a little.
    if (!ipv6Hostname) {
      var hostparts = this.hostname.split(/\./);
      for (var i = 0, l = hostparts.length; i < l; i++) {
        var part = hostparts[i];
        if (!part) continue;
        if (!part.match(hostnamePartPattern)) {
          var newpart = '';
          for (var j = 0, k = part.length; j < k; j++) {
            if (part.charCodeAt(j) > 127) {
              // we replace non-ASCII char with a temporary placeholder
              // we need this to make sure size of hostname is not
              // broken by replacing non-ASCII by nothing
              newpart += 'x';
            } else {
              newpart += part[j];
            }
          }
          // we test again with ASCII char only
          if (!newpart.match(hostnamePartPattern)) {
            var validParts = hostparts.slice(0, i);
            var notHost = hostparts.slice(i + 1);
            var bit = part.match(hostnamePartStart);
            if (bit) {
              validParts.push(bit[1]);
              notHost.unshift(bit[2]);
            }
            if (notHost.length) {
              rest = '/' + notHost.join('.') + rest;
            }
            this.hostname = validParts.join('.');
            break;
          }
        }
      }
    }

    if (this.hostname.length > hostnameMaxLen) {
      this.hostname = '';
    } else {
      // hostnames are always lower case.
      this.hostname = this.hostname.toLowerCase();
    }

    if (!ipv6Hostname) {
      // IDNA Support: Returns a punycoded representation of "domain".
      // It only converts parts of the domain name that
      // have non-ASCII characters, i.e. it doesn't matter if
      // you call it with a domain that already is ASCII-only.
      this.hostname = punycode.toASCII(this.hostname);
    }

    var p = this.port ? ':' + this.port : '';
    var h = this.hostname || '';
    this.host = h + p;
    this.href += this.host;

    // strip [ and ] from the hostname
    // the host field still retains them, though
    if (ipv6Hostname) {
      this.hostname = this.hostname.substr(1, this.hostname.length - 2);
      if (rest[0] !== '/') {
        rest = '/' + rest;
      }
    }
  }

  // now rest is set to the post-host stuff.
  // chop off any delim chars.
  if (!unsafeProtocol[lowerProto]) {

    // First, make 100% sure that any "autoEscape" chars get
    // escaped, even if encodeURIComponent doesn't think they
    // need to be.
    for (var i = 0, l = autoEscape.length; i < l; i++) {
      var ae = autoEscape[i];
      if (rest.indexOf(ae) === -1)
        continue;
      var esc = encodeURIComponent(ae);
      if (esc === ae) {
        esc = escape(ae);
      }
      rest = rest.split(ae).join(esc);
    }
  }


  // chop off from the tail first.
  var hash = rest.indexOf('#');
  if (hash !== -1) {
    // got a fragment string.
    this.hash = rest.substr(hash);
    rest = rest.slice(0, hash);
  }
  var qm = rest.indexOf('?');
  if (qm !== -1) {
    this.search = rest.substr(qm);
    this.query = rest.substr(qm + 1);
    if (parseQueryString) {
      this.query = querystring.parse(this.query);
    }
    rest = rest.slice(0, qm);
  } else if (parseQueryString) {
    // no query string, but parseQueryString still requested
    this.search = '';
    this.query = {};
  }
  if (rest) this.pathname = rest;
  if (slashedProtocol[lowerProto] &&
      this.hostname && !this.pathname) {
    this.pathname = '/';
  }

  //to support http.request
  if (this.pathname || this.search) {
    var p = this.pathname || '';
    var s = this.search || '';
    this.path = p + s;
  }

  // finally, reconstruct the href based on what has been validated.
  this.href = this.format();
  return this;
};

// format a parsed object into a url string
function urlFormat(obj) {
  // ensure it's an object, and not a string url.
  // If it's an obj, this is a no-op.
  // this way, you can call url_format() on strings
  // to clean up potentially wonky urls.
  if (util.isString(obj)) obj = urlParse(obj);
  if (!(obj instanceof Url)) return Url.prototype.format.call(obj);
  return obj.format();
}

Url.prototype.format = function() {
  var auth = this.auth || '';
  if (auth) {
    auth = encodeURIComponent(auth);
    auth = auth.replace(/%3A/i, ':');
    auth += '@';
  }

  var protocol = this.protocol || '',
      pathname = this.pathname || '',
      hash = this.hash || '',
      host = false,
      query = '';

  if (this.host) {
    host = auth + this.host;
  } else if (this.hostname) {
    host = auth + (this.hostname.indexOf(':') === -1 ?
        this.hostname :
        '[' + this.hostname + ']');
    if (this.port) {
      host += ':' + this.port;
    }
  }

  if (this.query &&
      util.isObject(this.query) &&
      Object.keys(this.query).length) {
    query = querystring.stringify(this.query);
  }

  var search = this.search || (query && ('?' + query)) || '';

  if (protocol && protocol.substr(-1) !== ':') protocol += ':';

  // only the slashedProtocols get the //.  Not mailto:, xmpp:, etc.
  // unless they had them to begin with.
  if (this.slashes ||
      (!protocol || slashedProtocol[protocol]) && host !== false) {
    host = '//' + (host || '');
    if (pathname && pathname.charAt(0) !== '/') pathname = '/' + pathname;
  } else if (!host) {
    host = '';
  }

  if (hash && hash.charAt(0) !== '#') hash = '#' + hash;
  if (search && search.charAt(0) !== '?') search = '?' + search;

  pathname = pathname.replace(/[?#]/g, function(match) {
    return encodeURIComponent(match);
  });
  search = search.replace('#', '%23');

  return protocol + host + pathname + search + hash;
};

function urlResolve(source, relative) {
  return urlParse(source, false, true).resolve(relative);
}

Url.prototype.resolve = function(relative) {
  return this.resolveObject(urlParse(relative, false, true)).format();
};

function urlResolveObject(source, relative) {
  if (!source) return relative;
  return urlParse(source, false, true).resolveObject(relative);
}

Url.prototype.resolveObject = function(relative) {
  if (util.isString(relative)) {
    var rel = new Url();
    rel.parse(relative, false, true);
    relative = rel;
  }

  var result = new Url();
  var tkeys = Object.keys(this);
  for (var tk = 0; tk < tkeys.length; tk++) {
    var tkey = tkeys[tk];
    result[tkey] = this[tkey];
  }

  // hash is always overridden, no matter what.
  // even href="" will remove it.
  result.hash = relative.hash;

  // if the relative url is empty, then there's nothing left to do here.
  if (relative.href === '') {
    result.href = result.format();
    return result;
  }

  // hrefs like //foo/bar always cut to the protocol.
  if (relative.slashes && !relative.protocol) {
    // take everything except the protocol from relative
    var rkeys = Object.keys(relative);
    for (var rk = 0; rk < rkeys.length; rk++) {
      var rkey = rkeys[rk];
      if (rkey !== 'protocol')
        result[rkey] = relative[rkey];
    }

    //urlParse appends trailing / to urls like http://www.example.com
    if (slashedProtocol[result.protocol] &&
        result.hostname && !result.pathname) {
      result.path = result.pathname = '/';
    }

    result.href = result.format();
    return result;
  }

  if (relative.protocol && relative.protocol !== result.protocol) {
    // if it's a known url protocol, then changing
    // the protocol does weird things
    // first, if it's not file:, then we MUST have a host,
    // and if there was a path
    // to begin with, then we MUST have a path.
    // if it is file:, then the host is dropped,
    // because that's known to be hostless.
    // anything else is assumed to be absolute.
    if (!slashedProtocol[relative.protocol]) {
      var keys = Object.keys(relative);
      for (var v = 0; v < keys.length; v++) {
        var k = keys[v];
        result[k] = relative[k];
      }
      result.href = result.format();
      return result;
    }

    result.protocol = relative.protocol;
    if (!relative.host && !hostlessProtocol[relative.protocol]) {
      var relPath = (relative.pathname || '').split('/');
      while (relPath.length && !(relative.host = relPath.shift()));
      if (!relative.host) relative.host = '';
      if (!relative.hostname) relative.hostname = '';
      if (relPath[0] !== '') relPath.unshift('');
      if (relPath.length < 2) relPath.unshift('');
      result.pathname = relPath.join('/');
    } else {
      result.pathname = relative.pathname;
    }
    result.search = relative.search;
    result.query = relative.query;
    result.host = relative.host || '';
    result.auth = relative.auth;
    result.hostname = relative.hostname || relative.host;
    result.port = relative.port;
    // to support http.request
    if (result.pathname || result.search) {
      var p = result.pathname || '';
      var s = result.search || '';
      result.path = p + s;
    }
    result.slashes = result.slashes || relative.slashes;
    result.href = result.format();
    return result;
  }

  var isSourceAbs = (result.pathname && result.pathname.charAt(0) === '/'),
      isRelAbs = (
          relative.host ||
          relative.pathname && relative.pathname.charAt(0) === '/'
      ),
      mustEndAbs = (isRelAbs || isSourceAbs ||
                    (result.host && relative.pathname)),
      removeAllDots = mustEndAbs,
      srcPath = result.pathname && result.pathname.split('/') || [],
      relPath = relative.pathname && relative.pathname.split('/') || [],
      psychotic = result.protocol && !slashedProtocol[result.protocol];

  // if the url is a non-slashed url, then relative
  // links like ../.. should be able
  // to crawl up to the hostname, as well.  This is strange.
  // result.protocol has already been set by now.
  // Later on, put the first path part into the host field.
  if (psychotic) {
    result.hostname = '';
    result.port = null;
    if (result.host) {
      if (srcPath[0] === '') srcPath[0] = result.host;
      else srcPath.unshift(result.host);
    }
    result.host = '';
    if (relative.protocol) {
      relative.hostname = null;
      relative.port = null;
      if (relative.host) {
        if (relPath[0] === '') relPath[0] = relative.host;
        else relPath.unshift(relative.host);
      }
      relative.host = null;
    }
    mustEndAbs = mustEndAbs && (relPath[0] === '' || srcPath[0] === '');
  }

  if (isRelAbs) {
    // it's absolute.
    result.host = (relative.host || relative.host === '') ?
                  relative.host : result.host;
    result.hostname = (relative.hostname || relative.hostname === '') ?
                      relative.hostname : result.hostname;
    result.search = relative.search;
    result.query = relative.query;
    srcPath = relPath;
    // fall through to the dot-handling below.
  } else if (relPath.length) {
    // it's relative
    // throw away the existing file, and take the new path instead.
    if (!srcPath) srcPath = [];
    srcPath.pop();
    srcPath = srcPath.concat(relPath);
    result.search = relative.search;
    result.query = relative.query;
  } else if (!util.isNullOrUndefined(relative.search)) {
    // just pull out the search.
    // like href='?foo'.
    // Put this after the other two cases because it simplifies the booleans
    if (psychotic) {
      result.hostname = result.host = srcPath.shift();
      //occationaly the auth can get stuck only in host
      //this especially happens in cases like
      //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
      var authInHost = result.host && result.host.indexOf('@') > 0 ?
                       result.host.split('@') : false;
      if (authInHost) {
        result.auth = authInHost.shift();
        result.host = result.hostname = authInHost.shift();
      }
    }
    result.search = relative.search;
    result.query = relative.query;
    //to support http.request
    if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
      result.path = (result.pathname ? result.pathname : '') +
                    (result.search ? result.search : '');
    }
    result.href = result.format();
    return result;
  }

  if (!srcPath.length) {
    // no path at all.  easy.
    // we've already handled the other stuff above.
    result.pathname = null;
    //to support http.request
    if (result.search) {
      result.path = '/' + result.search;
    } else {
      result.path = null;
    }
    result.href = result.format();
    return result;
  }

  // if a url ENDs in . or .., then it must get a trailing slash.
  // however, if it ends in anything else non-slashy,
  // then it must NOT get a trailing slash.
  var last = srcPath.slice(-1)[0];
  var hasTrailingSlash = (
      (result.host || relative.host || srcPath.length > 1) &&
      (last === '.' || last === '..') || last === '');

  // strip single dots, resolve double dots to parent dir
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = srcPath.length; i >= 0; i--) {
    last = srcPath[i];
    if (last === '.') {
      srcPath.splice(i, 1);
    } else if (last === '..') {
      srcPath.splice(i, 1);
      up++;
    } else if (up) {
      srcPath.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (!mustEndAbs && !removeAllDots) {
    for (; up--; up) {
      srcPath.unshift('..');
    }
  }

  if (mustEndAbs && srcPath[0] !== '' &&
      (!srcPath[0] || srcPath[0].charAt(0) !== '/')) {
    srcPath.unshift('');
  }

  if (hasTrailingSlash && (srcPath.join('/').substr(-1) !== '/')) {
    srcPath.push('');
  }

  var isAbsolute = srcPath[0] === '' ||
      (srcPath[0] && srcPath[0].charAt(0) === '/');

  // put the host back
  if (psychotic) {
    result.hostname = result.host = isAbsolute ? '' :
                                    srcPath.length ? srcPath.shift() : '';
    //occationaly the auth can get stuck only in host
    //this especially happens in cases like
    //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
    var authInHost = result.host && result.host.indexOf('@') > 0 ?
                     result.host.split('@') : false;
    if (authInHost) {
      result.auth = authInHost.shift();
      result.host = result.hostname = authInHost.shift();
    }
  }

  mustEndAbs = mustEndAbs || (result.host && srcPath.length);

  if (mustEndAbs && !isAbsolute) {
    srcPath.unshift('');
  }

  if (!srcPath.length) {
    result.pathname = null;
    result.path = null;
  } else {
    result.pathname = srcPath.join('/');
  }

  //to support request.http
  if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
    result.path = (result.pathname ? result.pathname : '') +
                  (result.search ? result.search : '');
  }
  result.auth = relative.auth || result.auth;
  result.slashes = result.slashes || relative.slashes;
  result.href = result.format();
  return result;
};

Url.prototype.parseHost = function() {
  var host = this.host;
  var port = portPattern.exec(host);
  if (port) {
    port = port[0];
    if (port !== ':') {
      this.port = port.substr(1);
    }
    host = host.substr(0, host.length - port.length);
  }
  if (host) this.hostname = host;
};


/***/ }),

/***/ 39:
/***/ (function(module, exports, __webpack_require__) {

//
// Autogenerated by Thrift Compiler (0.7.0-en-11139b3b5cb61e817408c6e84b0e1c258bf6c6ae)
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//


  // Define types and services

  var Thrift = __webpack_require__(0).Thrift;
  var Errors = __webpack_require__(7);
  var Types = __webpack_require__(3);
  var MembershipService = __webpack_require__(45);


  module.exports.WorkspaceType = {
    'INVITE_ONLY' : 1,
    'DISCOVERABLE' : 2,
    'OPEN' : 3
  };

  module.exports.WorkspacePrivilegeLevel = {
    'READ' : 1,
    'EDIT' : 2,
    'EDIT_AND_MANAGE' : 3
  };

  module.exports.WorkspaceRestrictions = Thrift.Struct.define('WorkspaceRestrictions',  {
    1: { alias: 'noUpdateName', type: Thrift.Type.BOOL },
    3: { alias: 'noCreateNotebooks', type: Thrift.Type.BOOL },
    6: { alias: 'noManageShares', type: Thrift.Type.BOOL },
    7: { alias: 'noCanMoveNotebook', type: Thrift.Type.BOOL },
    8: { alias: 'noUpdateType', type: Thrift.Type.BOOL },
    9: { alias: 'noUpdateDescription', type: Thrift.Type.BOOL }
  });

  module.exports.Workspace = Thrift.Struct.define('Workspace',  {
    1: { alias: 'guid', type: Thrift.Type.STRING },
    2: { alias: 'contactId', type: Thrift.Type.I32 },
    3: { alias: 'name', type: Thrift.Type.STRING },
    5: { alias: 'backingNotebookGuid', type: Thrift.Type.STRING },
    6: { alias: 'serviceCreated', type: Thrift.Type.I64 },
    7: { alias: 'serviceUpdated', type: Thrift.Type.I64 },
    8: { alias: 'userId', type: Thrift.Type.I32 },
    9: { alias: 'updateSequenceNum', type: Thrift.Type.I32 },
    10: { alias: 'sharingUpdateCounter', type: Thrift.Type.I32 },
    11: { alias: 'descriptionText', type: Thrift.Type.STRING },
    12: { alias: 'workspaceType', type: Thrift.Type.I32 },
    13: { alias: 'defaultPrivilegeLevel', type: Thrift.Type.I32 },
    14: { alias: 'sample', type: Thrift.Type.BOOL }
  });

  module.exports.WorkspaceInvitation = Thrift.Struct.define('WorkspaceInvitation',  {
    1: { alias: 'common', type: Thrift.Type.STRUCT, def: MembershipService.InvitationCommon },
    2: { alias: 'workspaceGuid', type: Thrift.Type.STRING },
    3: { alias: 'privilege', type: Thrift.Type.I32 },
    4: { alias: 'contact', type: Thrift.Type.STRUCT, def: Types.Contact }
  });

  module.exports.WorkspaceMembership = Thrift.Struct.define('WorkspaceMembership',  {
    1: { alias: 'common', type: Thrift.Type.STRUCT, def: MembershipService.MembershipCommon },
    2: { alias: 'workspaceGuid', type: Thrift.Type.STRING },
    3: { alias: 'privilege', type: Thrift.Type.I32 }
  });

  module.exports.ManageWorkspaceSharingRequest = Thrift.Struct.define('ManageWorkspaceSharingRequest',  {
    1: { alias: 'workspaceGuid', type: Thrift.Type.STRING },
    2: { alias: 'membershipsToUpdate', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, module.exports.WorkspaceMembership)  },
    3: { alias: 'invitationsToCreateOrUpdate', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, module.exports.WorkspaceInvitation)  },
    4: { alias: 'membershipsToRemove', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRING)  }
  });

  module.exports.ErrorResponse = Thrift.Struct.define('ErrorResponse',  {
    1: { alias: 'noErrors', type: Thrift.Type.BOOL },
    2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
    3: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
    4: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
  });

  module.exports.ManageWorkspaceMembershipResponse = Thrift.Struct.define('ManageWorkspaceMembershipResponse',  {
    1: { alias: 'membership', type: Thrift.Type.STRUCT, def: module.exports.WorkspaceMembership },
    2: { alias: 'errorResponse', type: Thrift.Type.STRUCT, def: module.exports.ErrorResponse }
  });

  module.exports.ManageWorkspaceInvitationResponse = Thrift.Struct.define('ManageWorkspaceInvitationResponse',  {
    1: { alias: 'invitation', type: Thrift.Type.STRUCT, def: module.exports.WorkspaceInvitation },
    2: { alias: 'membership', type: Thrift.Type.STRUCT, def: module.exports.WorkspaceMembership },
    3: { alias: 'identity', type: Thrift.Type.STRUCT, def: Types.Identity },
    4: { alias: 'errorResponse', type: Thrift.Type.STRUCT, def: module.exports.ErrorResponse }
  });

  module.exports.ManageWorkspaceRemoveResponse = Thrift.Struct.define('ManageWorkspaceRemoveResponse',  {
    1: { alias: 'guid', type: Thrift.Type.STRING },
    3: { alias: 'membership', type: Thrift.Type.STRUCT, def: module.exports.WorkspaceMembership },
    2: { alias: 'errorResponse', type: Thrift.Type.STRUCT, def: module.exports.ErrorResponse }
  });

  module.exports.ManageWorkspaceSharingResponse = Thrift.Struct.define('ManageWorkspaceSharingResponse',  {
    1: { alias: 'containsNoErrors', type: Thrift.Type.BOOL },
    2: { alias: 'membershipsToUpdateResponse', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, module.exports.ManageWorkspaceMembershipResponse)  },
    3: { alias: 'invitationsToCreateOrUpdateResponse', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, module.exports.ManageWorkspaceInvitationResponse)  },
    4: { alias: 'membershipsToRemoveResponse', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, module.exports.ManageWorkspaceRemoveResponse)  }
  });

  module.exports.GetWorkspaceResponseSpec = Thrift.Struct.define('GetWorkspaceResponseSpec',  {
    1: { alias: 'includeInvitations', type: Thrift.Type.BOOL },
    2: { alias: 'includeIdentityByInvitationsGuid', type: Thrift.Type.BOOL },
    3: { alias: 'includeMemberships', type: Thrift.Type.BOOL },
    4: { alias: 'includeWorkspaceRestrictions', type: Thrift.Type.BOOL },
    6: { alias: 'includeNotebookGuids', type: Thrift.Type.BOOL },
    7: { alias: 'includeAccessInfo', type: Thrift.Type.BOOL },
    8: { alias: 'includeNotebookRestrictions', type: Thrift.Type.BOOL },
    9: { alias: 'includeDiscoverableWorkspaces', type: Thrift.Type.BOOL },
    10: { alias: 'includeAggregations', type: Thrift.Type.BOOL },
    11: { alias: 'includeOpenWorkspaces', type: Thrift.Type.BOOL }
  });

  module.exports.WorkspaceFilter = Thrift.Struct.define('WorkspaceFilter',  {
    1: { alias: 'includeTypes', type: Thrift.Type.SET, def: Thrift.Set.define(Thrift.Type.I32) },
    2: { alias: 'includeWorkspacesWithoutMembership', type: Thrift.Type.BOOL }
  });

  module.exports.WorkspaceAggregations = Thrift.Struct.define('WorkspaceAggregations',  {
    1: { alias: 'notebooksCount', type: Thrift.Type.I32 },
    2: { alias: 'notesCount', type: Thrift.Type.I32 },
    3: { alias: 'maxServiceUpdated', type: Thrift.Type.I64 }
  });

  module.exports.AccessInfo = Thrift.Struct.define('AccessInfo',  {
    1: { alias: 'viewed', type: Thrift.Type.BOOL },
    2: { alias: 'viewedTimestamp', type: Thrift.Type.I64 },
    3: { alias: 'accessRequestedTimestamp', type: Thrift.Type.I64 }
  });

  module.exports.GetWorkspaceResponse = Thrift.Struct.define('GetWorkspaceResponse',  {
    1: { alias: 'workspace', type: Thrift.Type.STRUCT, def: module.exports.Workspace },
    2: { alias: 'invitations', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, module.exports.WorkspaceInvitation)  },
    3: { alias: 'identityByInvitationsGuid', type: Thrift.Type.MAP, def: Thrift.Map.define(Thrift.Type.STRING, Thrift.Type.STRUCT, Types.Identity)  },
    4: { alias: 'memberships', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, module.exports.WorkspaceMembership)  },
    6: { alias: 'workspaceRestrictions', type: Thrift.Type.STRUCT, def: module.exports.WorkspaceRestrictions },
    7: { alias: 'notebookGuids', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRING)  },
    8: { alias: 'accessInfo', type: Thrift.Type.STRUCT, def: module.exports.AccessInfo },
    9: { alias: 'notebookRestrictions', type: Thrift.Type.STRUCT, def: Types.NotebookRestrictions },
    10: { alias: 'aggregations', type: Thrift.Type.STRUCT, def: module.exports.WorkspaceAggregations },
    11: { alias: 'member', type: Thrift.Type.BOOL }
  });



/***/ }),

/***/ 4:
/***/ (function(module, exports) {

if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}


/***/ }),

/***/ 41:
/***/ (function(module, exports, __webpack_require__) {

//
// Autogenerated by Thrift Compiler (0.7.0-en-11139b3b5cb61e817408c6e84b0e1c258bf6c6ae)
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//


  // Define types and services

  var Thrift = __webpack_require__(0).Thrift;

  module.exports.Result = {
    'SUCCESS' : 1,
    'UNKNOWN_OPENID' : 2,
    'USER_EXISTS' : 3,
    'OPENID_CONFLICT' : 4
  };

  module.exports.ServiceProvider = {
    'GOOGLE' : 0,
    'FACEBOOK' : 1
  };

  module.exports.OpenIdCredential = Thrift.Struct.define('OpenIdCredential',  {
    1: { alias: 'tokenPayload', type: Thrift.Type.STRING },
    2: { alias: 'serviceProvider', type: Thrift.Type.I32 }
  });

  module.exports.PlainCredential = Thrift.Struct.define('PlainCredential',  {
    1: { alias: 'userId', type: Thrift.Type.I32 },
    2: { alias: 'password', type: Thrift.Type.STRING }
  });

  module.exports.AuthenticationRequestResult = Thrift.Struct.define('AuthenticationRequestResult',  {
    1: { alias: 'userId', type: Thrift.Type.I32 },
    2: { alias: 'userEmail', type: Thrift.Type.STRING },
    3: { alias: 'result', type: Thrift.Type.I32 }
  });

  module.exports.RegistrationRequestResult = Thrift.Struct.define('RegistrationRequestResult',  {
    1: { alias: 'refreshToken', type: Thrift.Type.STRING },
    2: { alias: 'userEmail', type: Thrift.Type.STRING },
    3: { alias: 'result', type: Thrift.Type.I32 },
    4: { alias: 'name', type: Thrift.Type.STRING }
  });



/***/ }),

/***/ 42:
/***/ (function(module, exports, __webpack_require__) {

//
// Autogenerated by Thrift Compiler (0.7.0-en-11139b3b5cb61e817408c6e84b0e1c258bf6c6ae)
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//


  // Define types and services

  var Thrift = __webpack_require__(0).Thrift;
  var UserStore = __webpack_require__(46);
  var SpaceService = __webpack_require__(39);
  var Types = __webpack_require__(3);
  var Errors = __webpack_require__(7);
  var Limits = __webpack_require__(24);


  module.exports.UserSetting = {
    'RECEIVE_REMINDER_EMAIL' : 1,
    'TIMEZONE' : 2
  };

  module.exports.ShareRelationshipPrivilegeLevel = {
    'READ_NOTEBOOK' : 0,
    'READ_NOTEBOOK_PLUS_ACTIVITY' : 10,
    'MODIFY_NOTEBOOK_PLUS_ACTIVITY' : 20,
    'FULL_ACCESS' : 30
  };

  module.exports.SearchScope = {
    'PERSONAL' : 0,
    'BUSINESS' : 1
  };

  module.exports.NoteAccessType = {
    'PERSONAL' : 0,
    'SHARED' : 1,
    'PUBLIC' : 2,
    'BUSINESS' : 3,
    'SHARED_NOTE' : 4
  };

  module.exports.ClientSyncRateConfig = Thrift.Struct.define('ClientSyncRateConfig',  {
    1: { alias: 'syncStateIntervalMillis', type: Thrift.Type.I64 },
    2: { alias: 'updateNoteWhenIdleForMillis', type: Thrift.Type.I64 },
    3: { alias: 'updateNoteDuringEditIntervalMillis', type: Thrift.Type.I64 }
  });

  module.exports.SyncState = Thrift.Struct.define('SyncState',  {
    1: { alias: 'currentTime', type: Thrift.Type.I64 },
    2: { alias: 'fullSyncBefore', type: Thrift.Type.I64 },
    3: { alias: 'updateCount', type: Thrift.Type.I32 },
    4: { alias: 'uploaded', type: Thrift.Type.I64 },
    5: { alias: 'userLastUpdated', type: Thrift.Type.I64 },
    6: { alias: 'userMaxMessageEventId', type: Thrift.Type.I64 },
    7: { alias: 'businessSummaryUpdated', type: Thrift.Type.I64 },
    8: { alias: 'communicationEngineUpdateId', type: Thrift.Type.I32 },
    9: { alias: 'currentDevicesUsed', type: Thrift.Type.I32 },
    10: { alias: 'showChoiceScreen', type: Thrift.Type.BOOL },
    11: { alias: 'clientSyncRateConfig', type: Thrift.Type.STRUCT, def: module.exports.ClientSyncRateConfig },
    12: { alias: 'businessUsersUpdateCount', type: Thrift.Type.I64 }
  });

  module.exports.Preferences = Thrift.Struct.define('Preferences',  {
    1: { alias: 'updateSequenceNum', type: Thrift.Type.I32 },
    2: { alias: 'preferences', type: Thrift.Type.MAP, def: Thrift.Map.define(Thrift.Type.STRING, Thrift.Type.LIST, Thrift.List.define(Thrift.Type.STRING) )  }
  });

  module.exports.SyncChunk = Thrift.Struct.define('SyncChunk',  {
    1: { alias: 'currentTime', type: Thrift.Type.I64 },
    2: { alias: 'chunkHighUSN', type: Thrift.Type.I32 },
    3: { alias: 'updateCount', type: Thrift.Type.I32 },
    4: { alias: 'notes', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, Types.Note)  },
    5: { alias: 'notebooks', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, Types.Notebook)  },
    19: { alias: 'workspaces', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, SpaceService.GetWorkspaceResponse)  },
    6: { alias: 'tags', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, Types.Tag)  },
    7: { alias: 'searches', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, Types.SavedSearch)  },
    8: { alias: 'resources', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, Types.Resource)  },
    9: { alias: 'expungedNotes', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRING)  },
    10: { alias: 'expungedNotebooks', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRING)  },
    20: { alias: 'expungedWorkspaces', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRING)  },
    11: { alias: 'expungedTags', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRING)  },
    12: { alias: 'expungedSearches', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRING)  },
    13: { alias: 'linkedNotebooks', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, Types.LinkedNotebook)  },
    14: { alias: 'expungedLinkedNotebooks', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRING)  },
    15: { alias: 'preferences', type: Thrift.Type.STRUCT, def: module.exports.Preferences },
    16: { alias: 'notesNoLongerSharedWithMe', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRING)  },
    17: { alias: 'linkedAccounts', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, Types.LinkedAccount)  },
    18: { alias: 'expungedLinkedAccounts', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRING)  }
  });

  module.exports.SyncChunkFilter = Thrift.Struct.define('SyncChunkFilter',  {
    1: { alias: 'includeNotes', type: Thrift.Type.BOOL },
    2: { alias: 'includeNoteResources', type: Thrift.Type.BOOL },
    3: { alias: 'includeNoteAttributes', type: Thrift.Type.BOOL },
    4: { alias: 'includeNotebooks', type: Thrift.Type.BOOL },
    5: { alias: 'includeTags', type: Thrift.Type.BOOL },
    6: { alias: 'includeSearches', type: Thrift.Type.BOOL },
    7: { alias: 'includeResources', type: Thrift.Type.BOOL },
    8: { alias: 'includeLinkedNotebooks', type: Thrift.Type.BOOL },
    9: { alias: 'includeExpunged', type: Thrift.Type.BOOL },
    10: { alias: 'includeNoteApplicationDataFullMap', type: Thrift.Type.BOOL },
    12: { alias: 'includeResourceApplicationDataFullMap', type: Thrift.Type.BOOL },
    13: { alias: 'includeNoteResourceApplicationDataFullMap', type: Thrift.Type.BOOL },
    14: { alias: 'includePreferences', type: Thrift.Type.BOOL },
    17: { alias: 'includeSharedNotes', type: Thrift.Type.BOOL },
    18: { alias: 'includeNotesSharedWithMe', type: Thrift.Type.BOOL },
    20: { alias: 'includeLinkedAccounts', type: Thrift.Type.BOOL },
    16: { alias: 'omitSharedNotebooks', type: Thrift.Type.BOOL },
    11: { alias: 'requireNoteContentClass', type: Thrift.Type.STRING },
    15: { alias: 'notebookGuids', type: Thrift.Type.SET, def: Thrift.Set.define(Thrift.Type.STRING) },
    19: { alias: 'inAccountUserId', type: Thrift.Type.I32 },
    22: { alias: 'includeWorkspaces', type: Thrift.Type.BOOL },
    21: { alias: 'includeWorkspacesContent', type: Thrift.Type.BOOL },
    24: { alias: 'includeWorkspacesWithoutMembership', type: Thrift.Type.BOOL },
    23: { alias: 'workspaceGuids', type: Thrift.Type.SET, def: Thrift.Set.define(Thrift.Type.STRING) }
  });

  module.exports.ResultFilter = Thrift.Struct.define('ResultFilter',  {
    1: { alias: 'type', type: Thrift.Type.STRING },
    2: { alias: 'value', type: Thrift.Type.STRING },
    3: { alias: 'displayValue', type: Thrift.Type.STRING }
  });

  module.exports.ContainerInfo = Thrift.Struct.define('ContainerInfo',  {
    1: { alias: 'guid', type: Thrift.Type.STRING },
    2: { alias: 'type', type: Thrift.Type.I32 }
  });

  module.exports.NoteFilter = Thrift.Struct.define('NoteFilter',  {
    1: { alias: 'order', type: Thrift.Type.I32 },
    2: { alias: 'ascending', type: Thrift.Type.BOOL },
    3: { alias: 'words', type: Thrift.Type.STRING },
    4: { alias: 'notebookGuid', type: Thrift.Type.STRING },
    5: { alias: 'tagGuids', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRING)  },
    6: { alias: 'timeZone', type: Thrift.Type.STRING },
    7: { alias: 'inactive', type: Thrift.Type.BOOL },
    8: { alias: 'emphasized', type: Thrift.Type.STRING },
    9: { alias: 'includeAllReadableNotebooks', type: Thrift.Type.BOOL },
    15: { alias: 'includeAllReadableWorkspaces', type: Thrift.Type.BOOL },
    10: { alias: 'context', type: Thrift.Type.STRING },
    11: { alias: 'rawWords', type: Thrift.Type.STRING },
    12: { alias: 'searchContextBytes', type: Thrift.Type.BINARY },
    13: { alias: 'selectedFilters', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, module.exports.ResultFilter)  },
    14: { alias: 'scope', type: Thrift.Type.STRUCT, def: module.exports.ContainerInfo }
  });

  module.exports.FilteredSearchRequest = Thrift.Struct.define('FilteredSearchRequest',  {
    1: { alias: 'searchContextBytes', type: Thrift.Type.BINARY },
    2: { alias: 'processedQuery', type: Thrift.Type.STRING },
    3: { alias: 'rawQuery', type: Thrift.Type.STRING },
    4: { alias: 'notebookGuid', type: Thrift.Type.STRING },
    5: { alias: 'tagGuids', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRING)  },
    6: { alias: 'timeZone', type: Thrift.Type.STRING },
    7: { alias: 'inactive', type: Thrift.Type.BOOL },
    8: { alias: 'includeAllReadableNotebooks', type: Thrift.Type.BOOL },
    9: { alias: 'offset', type: Thrift.Type.I32 },
    10: { alias: 'maxResults', type: Thrift.Type.I32 },
    11: { alias: 'selectedFilters', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, module.exports.ResultFilter)  },
    12: { alias: 'order', type: Thrift.Type.I32 },
    13: { alias: 'ascending', type: Thrift.Type.BOOL }
  });

  module.exports.NoteList = Thrift.Struct.define('NoteList',  {
    1: { alias: 'startIndex', type: Thrift.Type.I32 },
    2: { alias: 'totalNotes', type: Thrift.Type.I32 },
    3: { alias: 'notes', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, Types.Note)  },
    4: { alias: 'stoppedWords', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRING)  },
    5: { alias: 'searchedWords', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRING)  },
    6: { alias: 'updateCount', type: Thrift.Type.I32 },
    7: { alias: 'searchContextBytes', type: Thrift.Type.BINARY },
    8: { alias: 'debugInfo', type: Thrift.Type.STRING }
  });

  module.exports.NoteMetadata = Thrift.Struct.define('NoteMetadata',  {
    1: { alias: 'guid', type: Thrift.Type.STRING },
    2: { alias: 'title', type: Thrift.Type.STRING },
    5: { alias: 'contentLength', type: Thrift.Type.I32 },
    6: { alias: 'created', type: Thrift.Type.I64 },
    7: { alias: 'updated', type: Thrift.Type.I64 },
    8: { alias: 'deleted', type: Thrift.Type.I64 },
    10: { alias: 'updateSequenceNum', type: Thrift.Type.I32 },
    11: { alias: 'notebookGuid', type: Thrift.Type.STRING },
    12: { alias: 'tagGuids', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRING)  },
    14: { alias: 'attributes', type: Thrift.Type.STRUCT, def: Types.NoteAttributes },
    20: { alias: 'largestResourceMime', type: Thrift.Type.STRING },
    21: { alias: 'largestResourceSize', type: Thrift.Type.I32 }
  });

  module.exports.NotesMetadataList = Thrift.Struct.define('NotesMetadataList',  {
    1: { alias: 'startIndex', type: Thrift.Type.I32 },
    2: { alias: 'totalNotes', type: Thrift.Type.I32 },
    3: { alias: 'notes', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, module.exports.NoteMetadata)  },
    4: { alias: 'stoppedWords', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRING)  },
    5: { alias: 'searchedWords', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRING)  },
    6: { alias: 'updateCount', type: Thrift.Type.I32 },
    7: { alias: 'searchContextBytes', type: Thrift.Type.BINARY },
    8: { alias: 'suggestedFilters', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, module.exports.ResultFilter)  },
    9: { alias: 'debugInfo', type: Thrift.Type.STRING }
  });

  module.exports.FilteredSearchResult = Thrift.Struct.define('FilteredSearchResult',  {
    1: { alias: 'searchContextBytes', type: Thrift.Type.BINARY },
    2: { alias: 'startIndex', type: Thrift.Type.I32 },
    3: { alias: 'totalNotes', type: Thrift.Type.I32 },
    4: { alias: 'notes', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, module.exports.NoteMetadata)  },
    5: { alias: 'stoppedWords', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRING)  },
    6: { alias: 'searchedWords', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRING)  },
    7: { alias: 'suggestedFilters', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, module.exports.ResultFilter)  },
    8: { alias: 'updateCount', type: Thrift.Type.I32 }
  });

  module.exports.NotesMetadataResultSpec = Thrift.Struct.define('NotesMetadataResultSpec',  {
    2: { alias: 'includeTitle', type: Thrift.Type.BOOL },
    5: { alias: 'includeContentLength', type: Thrift.Type.BOOL },
    6: { alias: 'includeCreated', type: Thrift.Type.BOOL },
    7: { alias: 'includeUpdated', type: Thrift.Type.BOOL },
    8: { alias: 'includeDeleted', type: Thrift.Type.BOOL },
    10: { alias: 'includeUpdateSequenceNum', type: Thrift.Type.BOOL },
    11: { alias: 'includeNotebookGuid', type: Thrift.Type.BOOL },
    12: { alias: 'includeTagGuids', type: Thrift.Type.BOOL },
    14: { alias: 'includeAttributes', type: Thrift.Type.BOOL },
    20: { alias: 'includeLargestResourceMime', type: Thrift.Type.BOOL },
    21: { alias: 'includeLargestResourceSize', type: Thrift.Type.BOOL }
  });

  module.exports.NoteCollectionCounts = Thrift.Struct.define('NoteCollectionCounts',  {
    1: { alias: 'notebookCounts', type: Thrift.Type.MAP, def: Thrift.Map.define(Thrift.Type.STRING, Thrift.Type.I32 )  },
    2: { alias: 'tagCounts', type: Thrift.Type.MAP, def: Thrift.Map.define(Thrift.Type.STRING, Thrift.Type.I32 )  },
    3: { alias: 'trashCount', type: Thrift.Type.I32 }
  });

  module.exports.NoteResultSpec = Thrift.Struct.define('NoteResultSpec',  {
    1: { alias: 'includeContent', type: Thrift.Type.BOOL },
    2: { alias: 'includeResourcesData', type: Thrift.Type.BOOL },
    3: { alias: 'includeResourcesRecognition', type: Thrift.Type.BOOL },
    4: { alias: 'includeResourcesAlternateData', type: Thrift.Type.BOOL },
    5: { alias: 'includeSharedNotes', type: Thrift.Type.BOOL },
    6: { alias: 'includeNoteAppDataValues', type: Thrift.Type.BOOL },
    7: { alias: 'includeResourceAppDataValues', type: Thrift.Type.BOOL },
    8: { alias: 'includeAccountLimits', type: Thrift.Type.BOOL }
  });

  module.exports.AdImpressions = Thrift.Struct.define('AdImpressions',  {
    1: { alias: 'adId', type: Thrift.Type.I32 },
    2: { alias: 'impressionCount', type: Thrift.Type.I32 },
    3: { alias: 'impressionTime', type: Thrift.Type.I32 }
  });

  module.exports.AdParameters = Thrift.Struct.define('AdParameters',  {
    2: { alias: 'clientLanguage', type: Thrift.Type.STRING },
    4: { alias: 'impressions', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, module.exports.AdImpressions)  },
    5: { alias: 'supportHtml', type: Thrift.Type.BOOL },
    6: { alias: 'clientProperties', type: Thrift.Type.MAP, def: Thrift.Map.define(Thrift.Type.STRING, Thrift.Type.STRING )  }
  });

  module.exports.NoteEmailParameters = Thrift.Struct.define('NoteEmailParameters',  {
    1: { alias: 'guid', type: Thrift.Type.STRING },
    2: { alias: 'note', type: Thrift.Type.STRUCT, def: Types.Note },
    3: { alias: 'toAddresses', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRING)  },
    4: { alias: 'ccAddresses', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRING)  },
    5: { alias: 'subject', type: Thrift.Type.STRING },
    6: { alias: 'message', type: Thrift.Type.STRING }
  });

  module.exports.NoteVersionId = Thrift.Struct.define('NoteVersionId',  {
    1: { alias: 'updateSequenceNum', type: Thrift.Type.I32 },
    2: { alias: 'updated', type: Thrift.Type.I64 },
    3: { alias: 'saved', type: Thrift.Type.I64 },
    4: { alias: 'title', type: Thrift.Type.STRING },
    5: { alias: 'lastEditorId', type: Thrift.Type.I32 }
  });

  module.exports.ClientUsageMetrics = Thrift.Struct.define('ClientUsageMetrics',  {
    1: { alias: 'sessions', type: Thrift.Type.I32 },
    2: { alias: 'subjectConsumerKey', type: Thrift.Type.STRING },
    3: { alias: 'subjectConsumerSecret', type: Thrift.Type.STRING }
  });

  module.exports.RelatedQuery = Thrift.Struct.define('RelatedQuery',  {
    1: { alias: 'noteGuid', type: Thrift.Type.STRING },
    2: { alias: 'plainText', type: Thrift.Type.STRING },
    3: { alias: 'filter', type: Thrift.Type.STRUCT, def: module.exports.NoteFilter },
    4: { alias: 'referenceUri', type: Thrift.Type.STRING },
    5: { alias: 'context', type: Thrift.Type.STRING },
    6: { alias: 'cacheKey', type: Thrift.Type.STRING }
  });

  module.exports.RelatedResult = Thrift.Struct.define('RelatedResult',  {
    1: { alias: 'notes', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, Types.Note)  },
    2: { alias: 'notebooks', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, Types.Notebook)  },
    3: { alias: 'tags', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, Types.Tag)  },
    4: { alias: 'containingNotebooks', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, Types.NotebookDescriptor)  },
    5: { alias: 'debugInfo', type: Thrift.Type.STRING },
    6: { alias: 'experts', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, Types.UserProfile)  },
    7: { alias: 'relatedContent', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, Types.RelatedContent)  },
    8: { alias: 'cacheKey', type: Thrift.Type.STRING },
    9: { alias: 'cacheExpires', type: Thrift.Type.I32 }
  });

  module.exports.RelatedResultSpec = Thrift.Struct.define('RelatedResultSpec',  {
    1: { alias: 'maxNotes', type: Thrift.Type.I32 },
    2: { alias: 'maxNotebooks', type: Thrift.Type.I32 },
    3: { alias: 'maxTags', type: Thrift.Type.I32 },
    4: { alias: 'writableNotebooksOnly', type: Thrift.Type.BOOL },
    5: { alias: 'includeContainingNotebooks', type: Thrift.Type.BOOL },
    6: { alias: 'includeDebugInfo', type: Thrift.Type.BOOL },
    7: { alias: 'maxExperts', type: Thrift.Type.I32 },
    8: { alias: 'maxRelatedContent', type: Thrift.Type.I32 },
    9: { alias: 'relatedContentTypes', type: Thrift.Type.SET, def: Thrift.Set.define(Thrift.Type.I32) }
  });

  module.exports.SearchSuggestionQuery = Thrift.Struct.define('SearchSuggestionQuery',  {
    1: { alias: 'prefix', type: Thrift.Type.STRING },
    2: { alias: 'contextFilter', type: Thrift.Type.STRUCT, def: module.exports.NoteFilter }
  });

  module.exports.CustomAttribute = Thrift.Struct.define('CustomAttribute',  {
    1: { alias: 'name', type: Thrift.Type.STRING },
    2: { alias: 'value', type: Thrift.Type.STRING }
  });

  module.exports.SearchSuggestionQueryV2 = Thrift.Struct.define('SearchSuggestionQueryV2',  {
    1: { alias: 'query', type: Thrift.Type.STRING },
    2: { alias: 'maxResults', type: Thrift.Type.I32 },
    3: { alias: 'contextFilter', type: Thrift.Type.STRUCT, def: module.exports.NoteFilter },
    4: { alias: 'customAttributes', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, module.exports.CustomAttribute)  }
  });

  module.exports.SearchSuggestionResultSpec = Thrift.Struct.define('SearchSuggestionResultSpec',  {
    1: { alias: 'maxTypeAheadSuggestions', type: Thrift.Type.I32 }
  });

  module.exports.SearchSuggestion = Thrift.Struct.define('SearchSuggestion',  {
    1: { alias: 'suggestionText', type: Thrift.Type.STRING }
  });

  module.exports.SuggestionObject = Thrift.Struct.define('SuggestionObject',  {
    1: { alias: 'type', type: Thrift.Type.STRING },
    2: { alias: 'value', type: Thrift.Type.STRING },
    3: { alias: 'displayValue', type: Thrift.Type.STRING },
    4: { alias: 'score', type: Thrift.Type.DOUBLE },
    5: { alias: 'objectGuid', type: Thrift.Type.STRING }
  });

  module.exports.SearchSuggestionResult = Thrift.Struct.define('SearchSuggestionResult',  {
    1: { alias: 'typeAheadSuggestions', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, module.exports.SearchSuggestion)  }
  });

  module.exports.SearchSuggestionResultV2 = Thrift.Struct.define('SearchSuggestionResultV2',  {
    1: { alias: 'suggestions', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, module.exports.SuggestionObject)  },
    2: { alias: 'customAttributes', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, module.exports.CustomAttribute)  }
  });

  module.exports.TimeZone = Thrift.Struct.define('TimeZone',  {
    1: { alias: 'id', type: Thrift.Type.STRING },
    2: { alias: 'displayName', type: Thrift.Type.STRING },
    3: { alias: 'rawUTCOffsetMillis', type: Thrift.Type.I32 },
    4: { alias: 'dstSavingsAdjustmentMillis', type: Thrift.Type.I32 },
    5: { alias: 'nextEnterDaylightSavings', type: Thrift.Type.I64 },
    6: { alias: 'nextLeaveDaylightSavings', type: Thrift.Type.I64 }
  });

  module.exports.TimeZoneSpec = Thrift.Struct.define('TimeZoneSpec',  {
    1: { alias: 'id', type: Thrift.Type.STRING },
    2: { alias: 'rawUTCOffsetMillis', type: Thrift.Type.I32 },
    3: { alias: 'dstSavingsAdjustmentMillis', type: Thrift.Type.I32 },
    4: { alias: 'nextEnterDaylightSavings', type: Thrift.Type.I64 },
    5: { alias: 'nextLeaveDaylightSavings', type: Thrift.Type.I64 }
  });

  module.exports.ContactsQuery = Thrift.Struct.define('ContactsQuery',  {
    1: { alias: 'maxEntries', type: Thrift.Type.I32 },
    2: { alias: 'prefix', type: Thrift.Type.STRING }
  });

  module.exports.BusinessQuery = Thrift.Struct.define('BusinessQuery',  {
    1: { alias: 'filter', type: Thrift.Type.STRUCT, def: module.exports.NoteFilter },
    2: { alias: 'numExperts', type: Thrift.Type.I32 },
    3: { alias: 'includeNotebooks', type: Thrift.Type.BOOL },
    4: { alias: 'includeNotesCounts', type: Thrift.Type.BOOL }
  });

  module.exports.BusinessQueryResult = Thrift.Struct.define('BusinessQueryResult',  {
    1: { alias: 'totalNotebooks', type: Thrift.Type.I32 },
    2: { alias: 'totalNotesByNotebook', type: Thrift.Type.MAP, def: Thrift.Map.define(Thrift.Type.STRING, Thrift.Type.I32 )  },
    3: { alias: 'experts', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, Types.UserProfile)  },
    4: { alias: 'matchingNotebooks', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, Types.Notebook)  }
  });

  module.exports.NoteLockStatus = Thrift.Struct.define('NoteLockStatus',  {
    1: { alias: 'noteUpdateSequenceNumber', type: Thrift.Type.I32 },
    2: { alias: 'lockHolderUserId', type: Thrift.Type.I32 },
    3: { alias: 'lockRenewBy', type: Thrift.Type.I64 },
    4: { alias: 'viewingUserIds', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.I32)  },
    5: { alias: 'viewIdleExpiration', type: Thrift.Type.I32 },
    6: { alias: 'unknownUsers', type: Thrift.Type.MAP, def: Thrift.Map.define(Thrift.Type.I32, Thrift.Type.STRUCT, Types.Contact)  },
    7: { alias: 'currentTime', type: Thrift.Type.I64 }
  });

  module.exports.UpdateNoteIfUsnMatchesResult = Thrift.Struct.define('UpdateNoteIfUsnMatchesResult',  {
    1: { alias: 'note', type: Thrift.Type.STRUCT, def: Types.Note },
    2: { alias: 'updated', type: Thrift.Type.BOOL }
  });

  module.exports.ShareRelationshipRestrictions = Thrift.Struct.define('ShareRelationshipRestrictions',  {
    1: { alias: 'noSetReadOnly', type: Thrift.Type.BOOL },
    2: { alias: 'noSetReadPlusActivity', type: Thrift.Type.BOOL },
    3: { alias: 'noSetModify', type: Thrift.Type.BOOL },
    4: { alias: 'noSetFullAccess', type: Thrift.Type.BOOL }
  });

  module.exports.InvitationShareRelationship = Thrift.Struct.define('InvitationShareRelationship',  {
    1: { alias: 'displayName', type: Thrift.Type.STRING },
    2: { alias: 'recipientUserIdentity', type: Thrift.Type.STRUCT, def: Types.UserIdentity },
    3: { alias: 'privilege', type: Thrift.Type.I32 },
    5: { alias: 'sharerUserId', type: Thrift.Type.I32 }
  });

  module.exports.MemberShareRelationship = Thrift.Struct.define('MemberShareRelationship',  {
    1: { alias: 'displayName', type: Thrift.Type.STRING },
    2: { alias: 'recipientUserId', type: Thrift.Type.I32 },
    3: { alias: 'bestPrivilege', type: Thrift.Type.I32 },
    4: { alias: 'individualPrivilege', type: Thrift.Type.I32 },
    5: { alias: 'restrictions', type: Thrift.Type.STRUCT, def: module.exports.ShareRelationshipRestrictions },
    6: { alias: 'sharerUserId', type: Thrift.Type.I32 }
  });

  module.exports.ShareRelationships = Thrift.Struct.define('ShareRelationships',  {
    1: { alias: 'invitations', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, module.exports.InvitationShareRelationship)  },
    2: { alias: 'memberships', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, module.exports.MemberShareRelationship)  },
    3: { alias: 'invitationRestrictions', type: Thrift.Type.STRUCT, def: module.exports.ShareRelationshipRestrictions }
  });

  module.exports.ManageNotebookSharesParameters = Thrift.Struct.define('ManageNotebookSharesParameters',  {
    1: { alias: 'notebookGuid', type: Thrift.Type.STRING },
    2: { alias: 'inviteMessage', type: Thrift.Type.STRING },
    3: { alias: 'membershipsToUpdate', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, module.exports.MemberShareRelationship)  },
    4: { alias: 'invitationsToCreateOrUpdate', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, module.exports.InvitationShareRelationship)  },
    5: { alias: 'unshares', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, Types.UserIdentity)  }
  });

  module.exports.ManageNotebookSharesError = Thrift.Struct.define('ManageNotebookSharesError',  {
    1: { alias: 'userIdentity', type: Thrift.Type.STRUCT, def: Types.UserIdentity },
    2: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
    3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
  });

  module.exports.ManageNotebookSharesResult = Thrift.Struct.define('ManageNotebookSharesResult',  {
    1: { alias: 'errors', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, module.exports.ManageNotebookSharesError)  }
  });

  module.exports.SharedNoteTemplate = Thrift.Struct.define('SharedNoteTemplate',  {
    1: { alias: 'noteGuid', type: Thrift.Type.STRING },
    4: { alias: 'recipientThreadId', type: Thrift.Type.I64 },
    2: { alias: 'recipientContacts', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, Types.Contact)  },
    3: { alias: 'privilege', type: Thrift.Type.I32 }
  });

  module.exports.NotebookShareTemplate = Thrift.Struct.define('NotebookShareTemplate',  {
    1: { alias: 'notebookGuid', type: Thrift.Type.STRING },
    4: { alias: 'recipientThreadId', type: Thrift.Type.I64 },
    2: { alias: 'recipientContacts', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, Types.Contact)  },
    3: { alias: 'privilege', type: Thrift.Type.I32 }
  });

  module.exports.CreateOrUpdateNotebookSharesResult = Thrift.Struct.define('CreateOrUpdateNotebookSharesResult',  {
    1: { alias: 'updateSequenceNum', type: Thrift.Type.I32 },
    2: { alias: 'matchingShares', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, Types.SharedNotebook)  }
  });

  module.exports.NoteShareRelationshipRestrictions = Thrift.Struct.define('NoteShareRelationshipRestrictions',  {
    1: { alias: 'noSetReadNote', type: Thrift.Type.BOOL },
    2: { alias: 'noSetModifyNote', type: Thrift.Type.BOOL },
    3: { alias: 'noSetFullAccess', type: Thrift.Type.BOOL }
  });

  module.exports.NoteMemberShareRelationship = Thrift.Struct.define('NoteMemberShareRelationship',  {
    1: { alias: 'displayName', type: Thrift.Type.STRING },
    2: { alias: 'recipientUserId', type: Thrift.Type.I32 },
    3: { alias: 'privilege', type: Thrift.Type.I32 },
    4: { alias: 'restrictions', type: Thrift.Type.STRUCT, def: module.exports.NoteShareRelationshipRestrictions },
    5: { alias: 'sharerUserId', type: Thrift.Type.I32 }
  });

  module.exports.NoteInvitationShareRelationship = Thrift.Struct.define('NoteInvitationShareRelationship',  {
    1: { alias: 'displayName', type: Thrift.Type.STRING },
    2: { alias: 'recipientIdentityId', type: Thrift.Type.I64 },
    3: { alias: 'privilege', type: Thrift.Type.I32 },
    5: { alias: 'sharerUserId', type: Thrift.Type.I32 }
  });

  module.exports.NoteShareRelationships = Thrift.Struct.define('NoteShareRelationships',  {
    1: { alias: 'invitations', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, module.exports.NoteInvitationShareRelationship)  },
    2: { alias: 'memberships', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, module.exports.NoteMemberShareRelationship)  },
    3: { alias: 'invitationRestrictions', type: Thrift.Type.STRUCT, def: module.exports.NoteShareRelationshipRestrictions }
  });

  module.exports.ManageNoteSharesParameters = Thrift.Struct.define('ManageNoteSharesParameters',  {
    1: { alias: 'noteGuid', type: Thrift.Type.STRING },
    2: { alias: 'membershipsToUpdate', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, module.exports.NoteMemberShareRelationship)  },
    3: { alias: 'invitationsToUpdate', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, module.exports.NoteInvitationShareRelationship)  },
    4: { alias: 'membershipsToUnshare', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.I32)  },
    5: { alias: 'invitationsToUnshare', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.I64)  }
  });

  module.exports.ManageNoteSharesError = Thrift.Struct.define('ManageNoteSharesError',  {
    1: { alias: 'identityID', type: Thrift.Type.I64 },
    2: { alias: 'userID', type: Thrift.Type.I32 },
    3: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
    4: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
  });

  module.exports.ManageNoteSharesResult = Thrift.Struct.define('ManageNoteSharesResult',  {
    1: { alias: 'errors', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, module.exports.ManageNoteSharesError)  }
  });

  module.exports.SearchRecord = Thrift.Struct.define('SearchRecord',  {
    1: { alias: 'userQuery', type: Thrift.Type.STRING },
    2: { alias: 'noteFilter', type: Thrift.Type.STRUCT, def: module.exports.NoteFilter },
    3: { alias: 'searchScope', type: Thrift.Type.I32 },
    4: { alias: 'searchTime', type: Thrift.Type.I64 },
    5: { alias: 'selectedNoteGUID', type: Thrift.Type.STRING },
    6: { alias: 'selectTime', type: Thrift.Type.I64 },
    7: { alias: 'noteRank', type: Thrift.Type.I32 },
    8: { alias: 'noteCount', type: Thrift.Type.I32 }
  });

  module.exports.SearchSelectInfo = Thrift.Struct.define('SearchSelectInfo',  {
    1: { alias: 'searchContextBytes', type: Thrift.Type.BINARY },
    2: { alias: 'selectedNoteGUID', type: Thrift.Type.STRING },
    3: { alias: 'selectTime', type: Thrift.Type.I64 },
    4: { alias: 'noteRank', type: Thrift.Type.I32 },
    5: { alias: 'autoSelected', type: Thrift.Type.BOOL },
    6: { alias: 'userQuery', type: Thrift.Type.STRING }
  });

  module.exports.SearchExitInfo = Thrift.Struct.define('SearchExitInfo',  {
    1: { alias: 'searchContextBytes', type: Thrift.Type.BINARY },
    2: { alias: 'exitTime', type: Thrift.Type.I64 }
  });

  module.exports.LogRequestProperty = Thrift.Struct.define('LogRequestProperty',  {
    1: { alias: 'name', type: Thrift.Type.STRING },
    2: { alias: 'value', type: Thrift.Type.STRING }
  });

  module.exports.LogRequestEvent = Thrift.Struct.define('LogRequestEvent',  {
    1: { alias: 'eventType', type: Thrift.Type.STRING },
    2: { alias: 'properties', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, module.exports.LogRequestProperty)  },
    3: { alias: 'sensitiveProperties', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, module.exports.LogRequestProperty)  }
  });

  module.exports.LogRequest = Thrift.Struct.define('LogRequest',  {
    1: { alias: 'searchRecord', type: Thrift.Type.STRUCT, def: module.exports.SearchRecord },
    2: { alias: 'selectInfo', type: Thrift.Type.STRUCT, def: module.exports.SearchSelectInfo },
    3: { alias: 'exitInfo', type: Thrift.Type.STRUCT, def: module.exports.SearchExitInfo },
    4: { alias: 'logRequestEvent', type: Thrift.Type.STRUCT, def: module.exports.LogRequestEvent }
  });

  module.exports.LogResponse = Thrift.Struct.define('LogResponse');

  module.exports.NoteAuthenticationResult = Thrift.Struct.define('NoteAuthenticationResult',  {
    1: { alias: 'authenticationToken', type: Thrift.Type.STRING },
    2: { alias: 'sharedNotebookGlobalId', type: Thrift.Type.STRING },
    3: { alias: 'noteAccessType', type: Thrift.Type.I32 }
  });

  module.exports.NotebookResultSpec = Thrift.Struct.define('NotebookResultSpec',  {
    1: { alias: 'includeSharedNotebooks', type: Thrift.Type.BOOL },
    2: { alias: 'includeNotebookRestrictions', type: Thrift.Type.BOOL },
    3: { alias: 'includeNotebookRecipientSettings', type: Thrift.Type.BOOL }
  });

  var NoteStore = module.exports.NoteStore = {};

  NoteStore.getSyncState = Thrift.Method.define({
    alias: 'getSyncState',
    args: Thrift.Struct.define('getSyncStateArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 }
    }),
    result: Thrift.Struct.define('getSyncStateResult', {
      0: { alias: 'returnValue',type: Thrift.Type.STRUCT, def: module.exports.SyncState },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
    })
  });

  NoteStore.getSyncStateWithMetrics = Thrift.Method.define({
    alias: 'getSyncStateWithMetrics',
    args: Thrift.Struct.define('getSyncStateWithMetricsArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'clientMetrics', type: Thrift.Type.STRUCT, def: module.exports.ClientUsageMetrics, index: 1 }
    }),
    result: Thrift.Struct.define('getSyncStateWithMetricsResult', {
      0: { alias: 'returnValue',type: Thrift.Type.STRUCT, def: module.exports.SyncState },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
    })
  });

  NoteStore.getSyncChunk = Thrift.Method.define({
    alias: 'getSyncChunk',
    args: Thrift.Struct.define('getSyncChunkArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'afterUSN', type: Thrift.Type.I32, index: 1 },
      3: { alias: 'maxEntries', type: Thrift.Type.I32, index: 2 },
      4: { alias: 'fullSyncOnly', type: Thrift.Type.BOOL, index: 3 }
    }),
    result: Thrift.Struct.define('getSyncChunkResult', {
      0: { alias: 'returnValue',type: Thrift.Type.STRUCT, def: module.exports.SyncChunk },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
    })
  });

  NoteStore.getFilteredSyncChunk = Thrift.Method.define({
    alias: 'getFilteredSyncChunk',
    args: Thrift.Struct.define('getFilteredSyncChunkArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'afterUSN', type: Thrift.Type.I32, index: 1 },
      3: { alias: 'maxEntries', type: Thrift.Type.I32, index: 2 },
      4: { alias: 'filter', type: Thrift.Type.STRUCT, def: module.exports.SyncChunkFilter, index: 3 }
    }),
    result: Thrift.Struct.define('getFilteredSyncChunkResult', {
      0: { alias: 'returnValue',type: Thrift.Type.STRUCT, def: module.exports.SyncChunk },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
    })
  });

  NoteStore.getLinkedNotebookSyncState = Thrift.Method.define({
    alias: 'getLinkedNotebookSyncState',
    args: Thrift.Struct.define('getLinkedNotebookSyncStateArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'linkedNotebook', type: Thrift.Type.STRUCT, def: Types.LinkedNotebook, index: 1 }
    }),
    result: Thrift.Struct.define('getLinkedNotebookSyncStateResult', {
      0: { alias: 'returnValue',type: Thrift.Type.STRUCT, def: module.exports.SyncState },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
    })
  });

  NoteStore.getLinkedNotebookSyncChunk = Thrift.Method.define({
    alias: 'getLinkedNotebookSyncChunk',
    args: Thrift.Struct.define('getLinkedNotebookSyncChunkArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'linkedNotebook', type: Thrift.Type.STRUCT, def: Types.LinkedNotebook, index: 1 },
      3: { alias: 'afterUSN', type: Thrift.Type.I32, index: 2 },
      4: { alias: 'maxEntries', type: Thrift.Type.I32, index: 3 },
      5: { alias: 'fullSyncOnly', type: Thrift.Type.BOOL, index: 4 }
    }),
    result: Thrift.Struct.define('getLinkedNotebookSyncChunkResult', {
      0: { alias: 'returnValue',type: Thrift.Type.STRUCT, def: module.exports.SyncChunk },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
    })
  });

  NoteStore.listNotebooks = Thrift.Method.define({
    alias: 'listNotebooks',
    args: Thrift.Struct.define('listNotebooksArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 }
    }),
    result: Thrift.Struct.define('listNotebooksResult', {
      0: { alias: 'returnValue',type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, Types.Notebook)  },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
    })
  });

  NoteStore.listPublishedBusinessNotebooks = Thrift.Method.define({
    alias: 'listPublishedBusinessNotebooks',
    args: Thrift.Struct.define('listPublishedBusinessNotebooksArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 }
    }),
    result: Thrift.Struct.define('listPublishedBusinessNotebooksResult', {
      0: { alias: 'returnValue',type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, Types.Notebook)  },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
    })
  });

  NoteStore.listAccessibleBusinessNotebooks = Thrift.Method.define({
    alias: 'listAccessibleBusinessNotebooks',
    args: Thrift.Struct.define('listAccessibleBusinessNotebooksArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'resultSpec', type: Thrift.Type.STRUCT, def: module.exports.NotebookResultSpec, index: 1 }
    }),
    result: Thrift.Struct.define('listAccessibleBusinessNotebooksResult', {
      0: { alias: 'returnValue',type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, Types.Notebook)  },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
    })
  });

  NoteStore.getNotebook = Thrift.Method.define({
    alias: 'getNotebook',
    args: Thrift.Struct.define('getNotebookArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'guid', type: Thrift.Type.STRING, index: 1 }
    }),
    result: Thrift.Struct.define('getNotebookResult', {
      0: { alias: 'returnValue',type: Thrift.Type.STRUCT, def: Types.Notebook },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
    })
  });

  NoteStore.getDefaultNotebook = Thrift.Method.define({
    alias: 'getDefaultNotebook',
    args: Thrift.Struct.define('getDefaultNotebookArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 }
    }),
    result: Thrift.Struct.define('getDefaultNotebookResult', {
      0: { alias: 'returnValue',type: Thrift.Type.STRUCT, def: Types.Notebook },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
    })
  });

  NoteStore.getUserNotebook = Thrift.Method.define({
    alias: 'getUserNotebook',
    args: Thrift.Struct.define('getUserNotebookArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 }
    }),
    result: Thrift.Struct.define('getUserNotebookResult', {
      0: { alias: 'returnValue',type: Thrift.Type.STRUCT, def: Types.Notebook },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
    })
  });

  NoteStore.createNotebook = Thrift.Method.define({
    alias: 'createNotebook',
    args: Thrift.Struct.define('createNotebookArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'notebook', type: Thrift.Type.STRUCT, def: Types.Notebook, index: 1 }
    }),
    result: Thrift.Struct.define('createNotebookResult', {
      0: { alias: 'returnValue',type: Thrift.Type.STRUCT, def: Types.Notebook },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
    })
  });

  NoteStore.updateNotebook = Thrift.Method.define({
    alias: 'updateNotebook',
    args: Thrift.Struct.define('updateNotebookArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'notebook', type: Thrift.Type.STRUCT, def: Types.Notebook, index: 1 }
    }),
    result: Thrift.Struct.define('updateNotebookResult', {
      0: { alias: 'returnValue',type: Thrift.Type.I32 },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
    })
  });

  NoteStore.updateNotebookWithResultSpec = Thrift.Method.define({
    alias: 'updateNotebookWithResultSpec',
    args: Thrift.Struct.define('updateNotebookWithResultSpecArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'notebook', type: Thrift.Type.STRUCT, def: Types.Notebook, index: 1 },
      3: { alias: 'resultSpec', type: Thrift.Type.STRUCT, def: module.exports.NotebookResultSpec, index: 2 }
    }),
    result: Thrift.Struct.define('updateNotebookWithResultSpecResult', {
      0: { alias: 'returnValue',type: Thrift.Type.STRUCT, def: Types.Notebook },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
    })
  });

  NoteStore.expungeNotebook = Thrift.Method.define({
    alias: 'expungeNotebook',
    args: Thrift.Struct.define('expungeNotebookArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'guid', type: Thrift.Type.STRING, index: 1 }
    }),
    result: Thrift.Struct.define('expungeNotebookResult', {
      0: { alias: 'returnValue',type: Thrift.Type.I32 },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
    })
  });

  NoteStore.listTags = Thrift.Method.define({
    alias: 'listTags',
    args: Thrift.Struct.define('listTagsArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 }
    }),
    result: Thrift.Struct.define('listTagsResult', {
      0: { alias: 'returnValue',type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, Types.Tag)  },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
    })
  });

  NoteStore.listTagsByNotebook = Thrift.Method.define({
    alias: 'listTagsByNotebook',
    args: Thrift.Struct.define('listTagsByNotebookArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'notebookGuid', type: Thrift.Type.STRING, index: 1 }
    }),
    result: Thrift.Struct.define('listTagsByNotebookResult', {
      0: { alias: 'returnValue',type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, Types.Tag)  },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
    })
  });

  NoteStore.getTag = Thrift.Method.define({
    alias: 'getTag',
    args: Thrift.Struct.define('getTagArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'guid', type: Thrift.Type.STRING, index: 1 }
    }),
    result: Thrift.Struct.define('getTagResult', {
      0: { alias: 'returnValue',type: Thrift.Type.STRUCT, def: Types.Tag },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
    })
  });

  NoteStore.createTag = Thrift.Method.define({
    alias: 'createTag',
    args: Thrift.Struct.define('createTagArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'tag', type: Thrift.Type.STRUCT, def: Types.Tag, index: 1 }
    }),
    result: Thrift.Struct.define('createTagResult', {
      0: { alias: 'returnValue',type: Thrift.Type.STRUCT, def: Types.Tag },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
    })
  });

  NoteStore.updateTag = Thrift.Method.define({
    alias: 'updateTag',
    args: Thrift.Struct.define('updateTagArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'tag', type: Thrift.Type.STRUCT, def: Types.Tag, index: 1 }
    }),
    result: Thrift.Struct.define('updateTagResult', {
      0: { alias: 'returnValue',type: Thrift.Type.I32 },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
    })
  });

  NoteStore.untagAll = Thrift.Method.define({
    alias: 'untagAll',
    args: Thrift.Struct.define('untagAllArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'guid', type: Thrift.Type.STRING, index: 1 }
    }),
    result: Thrift.Struct.define('untagAllResult', {
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
    })
  });

  NoteStore.expungeTag = Thrift.Method.define({
    alias: 'expungeTag',
    args: Thrift.Struct.define('expungeTagArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'guid', type: Thrift.Type.STRING, index: 1 }
    }),
    result: Thrift.Struct.define('expungeTagResult', {
      0: { alias: 'returnValue',type: Thrift.Type.I32 },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
    })
  });

  NoteStore.listSearches = Thrift.Method.define({
    alias: 'listSearches',
    args: Thrift.Struct.define('listSearchesArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 }
    }),
    result: Thrift.Struct.define('listSearchesResult', {
      0: { alias: 'returnValue',type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, Types.SavedSearch)  },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
    })
  });

  NoteStore.getSearch = Thrift.Method.define({
    alias: 'getSearch',
    args: Thrift.Struct.define('getSearchArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'guid', type: Thrift.Type.STRING, index: 1 }
    }),
    result: Thrift.Struct.define('getSearchResult', {
      0: { alias: 'returnValue',type: Thrift.Type.STRUCT, def: Types.SavedSearch },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
    })
  });

  NoteStore.createSearch = Thrift.Method.define({
    alias: 'createSearch',
    args: Thrift.Struct.define('createSearchArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'search', type: Thrift.Type.STRUCT, def: Types.SavedSearch, index: 1 }
    }),
    result: Thrift.Struct.define('createSearchResult', {
      0: { alias: 'returnValue',type: Thrift.Type.STRUCT, def: Types.SavedSearch },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
    })
  });

  NoteStore.updateSearch = Thrift.Method.define({
    alias: 'updateSearch',
    args: Thrift.Struct.define('updateSearchArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'search', type: Thrift.Type.STRUCT, def: Types.SavedSearch, index: 1 }
    }),
    result: Thrift.Struct.define('updateSearchResult', {
      0: { alias: 'returnValue',type: Thrift.Type.I32 },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
    })
  });

  NoteStore.expungeSearch = Thrift.Method.define({
    alias: 'expungeSearch',
    args: Thrift.Struct.define('expungeSearchArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'guid', type: Thrift.Type.STRING, index: 1 }
    }),
    result: Thrift.Struct.define('expungeSearchResult', {
      0: { alias: 'returnValue',type: Thrift.Type.I32 },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
    })
  });

  NoteStore.findNotes = Thrift.Method.define({
    alias: 'findNotes',
    args: Thrift.Struct.define('findNotesArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'filter', type: Thrift.Type.STRUCT, def: module.exports.NoteFilter, index: 1 },
      3: { alias: 'offset', type: Thrift.Type.I32, index: 2 },
      4: { alias: 'maxNotes', type: Thrift.Type.I32, index: 3 }
    }),
    result: Thrift.Struct.define('findNotesResult', {
      0: { alias: 'returnValue',type: Thrift.Type.STRUCT, def: module.exports.NoteList },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
    })
  });

  NoteStore.findNoteOffset = Thrift.Method.define({
    alias: 'findNoteOffset',
    args: Thrift.Struct.define('findNoteOffsetArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'filter', type: Thrift.Type.STRUCT, def: module.exports.NoteFilter, index: 1 },
      3: { alias: 'guid', type: Thrift.Type.STRING, index: 2 }
    }),
    result: Thrift.Struct.define('findNoteOffsetResult', {
      0: { alias: 'returnValue',type: Thrift.Type.I32 },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
    })
  });

  NoteStore.findNotesMetadata = Thrift.Method.define({
    alias: 'findNotesMetadata',
    args: Thrift.Struct.define('findNotesMetadataArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'filter', type: Thrift.Type.STRUCT, def: module.exports.NoteFilter, index: 1 },
      3: { alias: 'offset', type: Thrift.Type.I32, index: 2 },
      4: { alias: 'maxNotes', type: Thrift.Type.I32, index: 3 },
      5: { alias: 'resultSpec', type: Thrift.Type.STRUCT, def: module.exports.NotesMetadataResultSpec, index: 4 }
    }),
    result: Thrift.Struct.define('findNotesMetadataResult', {
      0: { alias: 'returnValue',type: Thrift.Type.STRUCT, def: module.exports.NotesMetadataList },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
    })
  });

  NoteStore.filteredSearch = Thrift.Method.define({
    alias: 'filteredSearch',
    args: Thrift.Struct.define('filteredSearchArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'request', type: Thrift.Type.STRUCT, def: module.exports.FilteredSearchRequest, index: 1 },
      3: { alias: 'resultSpec', type: Thrift.Type.STRUCT, def: module.exports.NotesMetadataResultSpec, index: 2 }
    }),
    result: Thrift.Struct.define('filteredSearchResult', {
      0: { alias: 'returnValue',type: Thrift.Type.STRUCT, def: module.exports.FilteredSearchResult },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
    })
  });

  NoteStore.getNoteSnippets = Thrift.Method.define({
    alias: 'getNoteSnippets',
    args: Thrift.Struct.define('getNoteSnippetsArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'noteGuids', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRING) , index: 1 },
      3: { alias: 'maxSnippetLength', type: Thrift.Type.I32, index: 2 }
    }),
    result: Thrift.Struct.define('getNoteSnippetsResult', {
      0: { alias: 'returnValue',type: Thrift.Type.MAP, def: Thrift.Map.define(Thrift.Type.STRING, Thrift.Type.STRING )  },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
    })
  });

  NoteStore.findNoteCounts = Thrift.Method.define({
    alias: 'findNoteCounts',
    args: Thrift.Struct.define('findNoteCountsArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'filter', type: Thrift.Type.STRUCT, def: module.exports.NoteFilter, index: 1 },
      3: { alias: 'withTrash', type: Thrift.Type.BOOL, index: 2 }
    }),
    result: Thrift.Struct.define('findNoteCountsResult', {
      0: { alias: 'returnValue',type: Thrift.Type.STRUCT, def: module.exports.NoteCollectionCounts },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
    })
  });

  NoteStore.getNoteWithResultSpec = Thrift.Method.define({
    alias: 'getNoteWithResultSpec',
    args: Thrift.Struct.define('getNoteWithResultSpecArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'guid', type: Thrift.Type.STRING, index: 1 },
      3: { alias: 'resultSpec', type: Thrift.Type.STRUCT, def: module.exports.NoteResultSpec, index: 2 }
    }),
    result: Thrift.Struct.define('getNoteWithResultSpecResult', {
      0: { alias: 'returnValue',type: Thrift.Type.STRUCT, def: Types.Note },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
    })
  });

  NoteStore.getNote = Thrift.Method.define({
    alias: 'getNote',
    args: Thrift.Struct.define('getNoteArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'guid', type: Thrift.Type.STRING, index: 1 },
      3: { alias: 'withContent', type: Thrift.Type.BOOL, index: 2 },
      4: { alias: 'withResourcesData', type: Thrift.Type.BOOL, index: 3 },
      5: { alias: 'withResourcesRecognition', type: Thrift.Type.BOOL, index: 4 },
      6: { alias: 'withResourcesAlternateData', type: Thrift.Type.BOOL, index: 5 }
    }),
    result: Thrift.Struct.define('getNoteResult', {
      0: { alias: 'returnValue',type: Thrift.Type.STRUCT, def: Types.Note },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
    })
  });

  NoteStore.getPreferences = Thrift.Method.define({
    alias: 'getPreferences',
    args: Thrift.Struct.define('getPreferencesArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'preferenceNames', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRING) , index: 1 }
    }),
    result: Thrift.Struct.define('getPreferencesResult', {
      0: { alias: 'returnValue',type: Thrift.Type.STRUCT, def: module.exports.Preferences },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
    })
  });

  NoteStore.updatePreferences = Thrift.Method.define({
    alias: 'updatePreferences',
    args: Thrift.Struct.define('updatePreferencesArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'preferencesToUpdate', type: Thrift.Type.MAP, def: Thrift.Map.define(Thrift.Type.STRING, Thrift.Type.LIST, Thrift.List.define(Thrift.Type.STRING) ) , index: 1 }
    }),
    result: Thrift.Struct.define('updatePreferencesResult', {
      0: { alias: 'returnValue',type: Thrift.Type.I32 },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
    })
  });

  NoteStore.getNoteApplicationData = Thrift.Method.define({
    alias: 'getNoteApplicationData',
    args: Thrift.Struct.define('getNoteApplicationDataArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'guid', type: Thrift.Type.STRING, index: 1 }
    }),
    result: Thrift.Struct.define('getNoteApplicationDataResult', {
      0: { alias: 'returnValue',type: Thrift.Type.STRUCT, def: Types.LazyMap },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
    })
  });

  NoteStore.getNoteApplicationDataEntry = Thrift.Method.define({
    alias: 'getNoteApplicationDataEntry',
    args: Thrift.Struct.define('getNoteApplicationDataEntryArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'guid', type: Thrift.Type.STRING, index: 1 },
      3: { alias: 'key', type: Thrift.Type.STRING, index: 2 }
    }),
    result: Thrift.Struct.define('getNoteApplicationDataEntryResult', {
      0: { alias: 'returnValue',type: Thrift.Type.STRING },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
    })
  });

  NoteStore.setNoteApplicationDataEntry = Thrift.Method.define({
    alias: 'setNoteApplicationDataEntry',
    args: Thrift.Struct.define('setNoteApplicationDataEntryArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'guid', type: Thrift.Type.STRING, index: 1 },
      3: { alias: 'key', type: Thrift.Type.STRING, index: 2 },
      4: { alias: 'value', type: Thrift.Type.STRING, index: 3 }
    }),
    result: Thrift.Struct.define('setNoteApplicationDataEntryResult', {
      0: { alias: 'returnValue',type: Thrift.Type.I32 },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
    })
  });

  NoteStore.unsetNoteApplicationDataEntry = Thrift.Method.define({
    alias: 'unsetNoteApplicationDataEntry',
    args: Thrift.Struct.define('unsetNoteApplicationDataEntryArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'guid', type: Thrift.Type.STRING, index: 1 },
      3: { alias: 'key', type: Thrift.Type.STRING, index: 2 }
    }),
    result: Thrift.Struct.define('unsetNoteApplicationDataEntryResult', {
      0: { alias: 'returnValue',type: Thrift.Type.I32 },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
    })
  });

  NoteStore.getNoteContent = Thrift.Method.define({
    alias: 'getNoteContent',
    args: Thrift.Struct.define('getNoteContentArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'guid', type: Thrift.Type.STRING, index: 1 }
    }),
    result: Thrift.Struct.define('getNoteContentResult', {
      0: { alias: 'returnValue',type: Thrift.Type.STRING },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
    })
  });

  NoteStore.getNoteSearchText = Thrift.Method.define({
    alias: 'getNoteSearchText',
    args: Thrift.Struct.define('getNoteSearchTextArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'guid', type: Thrift.Type.STRING, index: 1 },
      3: { alias: 'noteOnly', type: Thrift.Type.BOOL, index: 2 },
      4: { alias: 'tokenizeForIndexing', type: Thrift.Type.BOOL, index: 3 }
    }),
    result: Thrift.Struct.define('getNoteSearchTextResult', {
      0: { alias: 'returnValue',type: Thrift.Type.STRING },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
    })
  });

  NoteStore.getResourceSearchText = Thrift.Method.define({
    alias: 'getResourceSearchText',
    args: Thrift.Struct.define('getResourceSearchTextArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'guid', type: Thrift.Type.STRING, index: 1 }
    }),
    result: Thrift.Struct.define('getResourceSearchTextResult', {
      0: { alias: 'returnValue',type: Thrift.Type.STRING },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
    })
  });

  NoteStore.getNoteTagNames = Thrift.Method.define({
    alias: 'getNoteTagNames',
    args: Thrift.Struct.define('getNoteTagNamesArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'guid', type: Thrift.Type.STRING, index: 1 }
    }),
    result: Thrift.Struct.define('getNoteTagNamesResult', {
      0: { alias: 'returnValue',type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRING)  },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
    })
  });

  NoteStore.createNote = Thrift.Method.define({
    alias: 'createNote',
    args: Thrift.Struct.define('createNoteArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'note', type: Thrift.Type.STRUCT, def: Types.Note, index: 1 }
    }),
    result: Thrift.Struct.define('createNoteResult', {
      0: { alias: 'returnValue',type: Thrift.Type.STRUCT, def: Types.Note },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
    })
  });

  NoteStore.updateNote = Thrift.Method.define({
    alias: 'updateNote',
    args: Thrift.Struct.define('updateNoteArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'note', type: Thrift.Type.STRUCT, def: Types.Note, index: 1 }
    }),
    result: Thrift.Struct.define('updateNoteResult', {
      0: { alias: 'returnValue',type: Thrift.Type.STRUCT, def: Types.Note },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
    })
  });

  NoteStore.deleteNote = Thrift.Method.define({
    alias: 'deleteNote',
    args: Thrift.Struct.define('deleteNoteArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'guid', type: Thrift.Type.STRING, index: 1 }
    }),
    result: Thrift.Struct.define('deleteNoteResult', {
      0: { alias: 'returnValue',type: Thrift.Type.I32 },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
    })
  });

  NoteStore.expungeNote = Thrift.Method.define({
    alias: 'expungeNote',
    args: Thrift.Struct.define('expungeNoteArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'guid', type: Thrift.Type.STRING, index: 1 }
    }),
    result: Thrift.Struct.define('expungeNoteResult', {
      0: { alias: 'returnValue',type: Thrift.Type.I32 },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
    })
  });

  NoteStore.expungeNotes = Thrift.Method.define({
    alias: 'expungeNotes',
    args: Thrift.Struct.define('expungeNotesArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'noteGuids', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRING) , index: 1 }
    }),
    result: Thrift.Struct.define('expungeNotesResult', {
      0: { alias: 'returnValue',type: Thrift.Type.I32 },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
    })
  });

  NoteStore.expungeInactiveNotes = Thrift.Method.define({
    alias: 'expungeInactiveNotes',
    args: Thrift.Struct.define('expungeInactiveNotesArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 }
    }),
    result: Thrift.Struct.define('expungeInactiveNotesResult', {
      0: { alias: 'returnValue',type: Thrift.Type.I32 },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
    })
  });

  NoteStore.copyNote = Thrift.Method.define({
    alias: 'copyNote',
    args: Thrift.Struct.define('copyNoteArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'noteGuid', type: Thrift.Type.STRING, index: 1 },
      3: { alias: 'toNotebookGuid', type: Thrift.Type.STRING, index: 2 }
    }),
    result: Thrift.Struct.define('copyNoteResult', {
      0: { alias: 'returnValue',type: Thrift.Type.STRUCT, def: Types.Note },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
    })
  });

  NoteStore.listNoteVersions = Thrift.Method.define({
    alias: 'listNoteVersions',
    args: Thrift.Struct.define('listNoteVersionsArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'noteGuid', type: Thrift.Type.STRING, index: 1 }
    }),
    result: Thrift.Struct.define('listNoteVersionsResult', {
      0: { alias: 'returnValue',type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, module.exports.NoteVersionId)  },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
    })
  });

  NoteStore.getNoteVersion = Thrift.Method.define({
    alias: 'getNoteVersion',
    args: Thrift.Struct.define('getNoteVersionArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'noteGuid', type: Thrift.Type.STRING, index: 1 },
      3: { alias: 'updateSequenceNum', type: Thrift.Type.I32, index: 2 },
      4: { alias: 'withResourcesData', type: Thrift.Type.BOOL, index: 3 },
      5: { alias: 'withResourcesRecognition', type: Thrift.Type.BOOL, index: 4 },
      6: { alias: 'withResourcesAlternateData', type: Thrift.Type.BOOL, index: 5 }
    }),
    result: Thrift.Struct.define('getNoteVersionResult', {
      0: { alias: 'returnValue',type: Thrift.Type.STRUCT, def: Types.Note },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
    })
  });

  NoteStore.getResource = Thrift.Method.define({
    alias: 'getResource',
    args: Thrift.Struct.define('getResourceArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'guid', type: Thrift.Type.STRING, index: 1 },
      3: { alias: 'withData', type: Thrift.Type.BOOL, index: 2 },
      4: { alias: 'withRecognition', type: Thrift.Type.BOOL, index: 3 },
      5: { alias: 'withAttributes', type: Thrift.Type.BOOL, index: 4 },
      6: { alias: 'withAlternateData', type: Thrift.Type.BOOL, index: 5 }
    }),
    result: Thrift.Struct.define('getResourceResult', {
      0: { alias: 'returnValue',type: Thrift.Type.STRUCT, def: Types.Resource },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
    })
  });

  NoteStore.getResourceApplicationData = Thrift.Method.define({
    alias: 'getResourceApplicationData',
    args: Thrift.Struct.define('getResourceApplicationDataArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'guid', type: Thrift.Type.STRING, index: 1 }
    }),
    result: Thrift.Struct.define('getResourceApplicationDataResult', {
      0: { alias: 'returnValue',type: Thrift.Type.STRUCT, def: Types.LazyMap },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
    })
  });

  NoteStore.getResourceApplicationDataEntry = Thrift.Method.define({
    alias: 'getResourceApplicationDataEntry',
    args: Thrift.Struct.define('getResourceApplicationDataEntryArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'guid', type: Thrift.Type.STRING, index: 1 },
      3: { alias: 'key', type: Thrift.Type.STRING, index: 2 }
    }),
    result: Thrift.Struct.define('getResourceApplicationDataEntryResult', {
      0: { alias: 'returnValue',type: Thrift.Type.STRING },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
    })
  });

  NoteStore.setResourceApplicationDataEntry = Thrift.Method.define({
    alias: 'setResourceApplicationDataEntry',
    args: Thrift.Struct.define('setResourceApplicationDataEntryArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'guid', type: Thrift.Type.STRING, index: 1 },
      3: { alias: 'key', type: Thrift.Type.STRING, index: 2 },
      4: { alias: 'value', type: Thrift.Type.STRING, index: 3 }
    }),
    result: Thrift.Struct.define('setResourceApplicationDataEntryResult', {
      0: { alias: 'returnValue',type: Thrift.Type.I32 },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
    })
  });

  NoteStore.unsetResourceApplicationDataEntry = Thrift.Method.define({
    alias: 'unsetResourceApplicationDataEntry',
    args: Thrift.Struct.define('unsetResourceApplicationDataEntryArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'guid', type: Thrift.Type.STRING, index: 1 },
      3: { alias: 'key', type: Thrift.Type.STRING, index: 2 }
    }),
    result: Thrift.Struct.define('unsetResourceApplicationDataEntryResult', {
      0: { alias: 'returnValue',type: Thrift.Type.I32 },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
    })
  });

  NoteStore.updateResource = Thrift.Method.define({
    alias: 'updateResource',
    args: Thrift.Struct.define('updateResourceArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'resource', type: Thrift.Type.STRUCT, def: Types.Resource, index: 1 }
    }),
    result: Thrift.Struct.define('updateResourceResult', {
      0: { alias: 'returnValue',type: Thrift.Type.I32 },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
    })
  });

  NoteStore.getResourceData = Thrift.Method.define({
    alias: 'getResourceData',
    args: Thrift.Struct.define('getResourceDataArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'guid', type: Thrift.Type.STRING, index: 1 }
    }),
    result: Thrift.Struct.define('getResourceDataResult', {
      0: { alias: 'returnValue',type: Thrift.Type.BINARY },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
    })
  });

  NoteStore.getResourceByHash = Thrift.Method.define({
    alias: 'getResourceByHash',
    args: Thrift.Struct.define('getResourceByHashArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'noteGuid', type: Thrift.Type.STRING, index: 1 },
      3: { alias: 'contentHash', type: Thrift.Type.BINARY, index: 2 },
      4: { alias: 'withData', type: Thrift.Type.BOOL, index: 3 },
      5: { alias: 'withRecognition', type: Thrift.Type.BOOL, index: 4 },
      6: { alias: 'withAlternateData', type: Thrift.Type.BOOL, index: 5 }
    }),
    result: Thrift.Struct.define('getResourceByHashResult', {
      0: { alias: 'returnValue',type: Thrift.Type.STRUCT, def: Types.Resource },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
    })
  });

  NoteStore.getResourceRecognition = Thrift.Method.define({
    alias: 'getResourceRecognition',
    args: Thrift.Struct.define('getResourceRecognitionArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'guid', type: Thrift.Type.STRING, index: 1 }
    }),
    result: Thrift.Struct.define('getResourceRecognitionResult', {
      0: { alias: 'returnValue',type: Thrift.Type.BINARY },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
    })
  });

  NoteStore.getResourceAlternateData = Thrift.Method.define({
    alias: 'getResourceAlternateData',
    args: Thrift.Struct.define('getResourceAlternateDataArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'guid', type: Thrift.Type.STRING, index: 1 }
    }),
    result: Thrift.Struct.define('getResourceAlternateDataResult', {
      0: { alias: 'returnValue',type: Thrift.Type.BINARY },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
    })
  });

  NoteStore.getResourceAttributes = Thrift.Method.define({
    alias: 'getResourceAttributes',
    args: Thrift.Struct.define('getResourceAttributesArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'guid', type: Thrift.Type.STRING, index: 1 }
    }),
    result: Thrift.Struct.define('getResourceAttributesResult', {
      0: { alias: 'returnValue',type: Thrift.Type.STRUCT, def: Types.ResourceAttributes },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
    })
  });

  NoteStore.getAds = Thrift.Method.define({
    alias: 'getAds',
    args: Thrift.Struct.define('getAdsArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'adParameters', type: Thrift.Type.STRUCT, def: module.exports.AdParameters, index: 1 }
    }),
    result: Thrift.Struct.define('getAdsResult', {
      0: { alias: 'returnValue',type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, Types.Ad)  },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
    })
  });

  NoteStore.getRandomAd = Thrift.Method.define({
    alias: 'getRandomAd',
    args: Thrift.Struct.define('getRandomAdArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'adParameters', type: Thrift.Type.STRUCT, def: module.exports.AdParameters, index: 1 }
    }),
    result: Thrift.Struct.define('getRandomAdResult', {
      0: { alias: 'returnValue',type: Thrift.Type.STRUCT, def: Types.Ad },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
    })
  });

  NoteStore.getPublicNotebook = Thrift.Method.define({
    alias: 'getPublicNotebook',
    args: Thrift.Struct.define('getPublicNotebookArgs', {
      1: { alias: 'userId', type: Thrift.Type.I32, index: 0 },
      2: { alias: 'publicUri', type: Thrift.Type.STRING, index: 1 }
    }),
    result: Thrift.Struct.define('getPublicNotebookResult', {
      0: { alias: 'returnValue',type: Thrift.Type.STRUCT, def: Types.Notebook },
      1: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      2: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
    })
  });

  NoteStore.createSharedNotebook = Thrift.Method.define({
    alias: 'createSharedNotebook',
    args: Thrift.Struct.define('createSharedNotebookArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'sharedNotebook', type: Thrift.Type.STRUCT, def: Types.SharedNotebook, index: 1 }
    }),
    result: Thrift.Struct.define('createSharedNotebookResult', {
      0: { alias: 'returnValue',type: Thrift.Type.STRUCT, def: Types.SharedNotebook },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException },
      3: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
    })
  });

  NoteStore.shareNotebook = Thrift.Method.define({
    alias: 'shareNotebook',
    args: Thrift.Struct.define('shareNotebookArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'sharedNotebook', type: Thrift.Type.STRUCT, def: Types.SharedNotebook, index: 1 },
      3: { alias: 'message', type: Thrift.Type.STRING, index: 2 }
    }),
    result: Thrift.Struct.define('shareNotebookResult', {
      0: { alias: 'returnValue',type: Thrift.Type.STRUCT, def: Types.SharedNotebook },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException },
      3: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
    })
  });

  NoteStore.createOrUpdateNotebookShares = Thrift.Method.define({
    alias: 'createOrUpdateNotebookShares',
    args: Thrift.Struct.define('createOrUpdateNotebookSharesArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'shareTemplate', type: Thrift.Type.STRUCT, def: module.exports.NotebookShareTemplate, index: 1 }
    }),
    result: Thrift.Struct.define('createOrUpdateNotebookSharesResult', {
      0: { alias: 'returnValue',type: Thrift.Type.STRUCT, def: module.exports.CreateOrUpdateNotebookSharesResult },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException },
      3: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      4: { alias: 'invalidContactsException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMInvalidContactsException }
    })
  });

  NoteStore.updateSharedNotebook = Thrift.Method.define({
    alias: 'updateSharedNotebook',
    args: Thrift.Struct.define('updateSharedNotebookArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'sharedNotebook', type: Thrift.Type.STRUCT, def: Types.SharedNotebook, index: 1 }
    }),
    result: Thrift.Struct.define('updateSharedNotebookResult', {
      0: { alias: 'returnValue',type: Thrift.Type.I32 },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException },
      3: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
    })
  });

  NoteStore.setSharedNotebookRecipientSettings = Thrift.Method.define({
    alias: 'setSharedNotebookRecipientSettings',
    args: Thrift.Struct.define('setSharedNotebookRecipientSettingsArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'sharedNotebookId', type: Thrift.Type.I64, index: 1 },
      3: { alias: 'recipientSettings', type: Thrift.Type.STRUCT, def: Types.SharedNotebookRecipientSettings, index: 2 }
    }),
    result: Thrift.Struct.define('setSharedNotebookRecipientSettingsResult', {
      0: { alias: 'returnValue',type: Thrift.Type.I32 },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException },
      3: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
    })
  });

  NoteStore.setNotebookRecipientSettings = Thrift.Method.define({
    alias: 'setNotebookRecipientSettings',
    args: Thrift.Struct.define('setNotebookRecipientSettingsArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'notebookGuid', type: Thrift.Type.STRING, index: 1 },
      3: { alias: 'recipientSettings', type: Thrift.Type.STRUCT, def: Types.NotebookRecipientSettings, index: 2 }
    }),
    result: Thrift.Struct.define('setNotebookRecipientSettingsResult', {
      0: { alias: 'returnValue',type: Thrift.Type.STRUCT, def: Types.Notebook },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException },
      3: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
    })
  });

  NoteStore.sendMessageToSharedNotebookMembers = Thrift.Method.define({
    alias: 'sendMessageToSharedNotebookMembers',
    args: Thrift.Struct.define('sendMessageToSharedNotebookMembersArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'notebookGuid', type: Thrift.Type.STRING, index: 1 },
      3: { alias: 'messageText', type: Thrift.Type.STRING, index: 2 },
      4: { alias: 'recipients', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRING) , index: 3 }
    }),
    result: Thrift.Struct.define('sendMessageToSharedNotebookMembersResult', {
      0: { alias: 'returnValue',type: Thrift.Type.I32 },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException },
      3: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
    })
  });

  NoteStore.listSharedNotebooks = Thrift.Method.define({
    alias: 'listSharedNotebooks',
    args: Thrift.Struct.define('listSharedNotebooksArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 }
    }),
    result: Thrift.Struct.define('listSharedNotebooksResult', {
      0: { alias: 'returnValue',type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, Types.SharedNotebook)  },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException },
      3: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
    })
  });

  NoteStore.expungeSharedNotebooks = Thrift.Method.define({
    alias: 'expungeSharedNotebooks',
    args: Thrift.Struct.define('expungeSharedNotebooksArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'sharedNotebookIds', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.I64) , index: 1 }
    }),
    result: Thrift.Struct.define('expungeSharedNotebooksResult', {
      0: { alias: 'returnValue',type: Thrift.Type.I32 },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException },
      3: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
    })
  });

  NoteStore.createLinkedNotebook = Thrift.Method.define({
    alias: 'createLinkedNotebook',
    args: Thrift.Struct.define('createLinkedNotebookArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'linkedNotebook', type: Thrift.Type.STRUCT, def: Types.LinkedNotebook, index: 1 }
    }),
    result: Thrift.Struct.define('createLinkedNotebookResult', {
      0: { alias: 'returnValue',type: Thrift.Type.STRUCT, def: Types.LinkedNotebook },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException },
      3: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
    })
  });

  NoteStore.updateLinkedNotebook = Thrift.Method.define({
    alias: 'updateLinkedNotebook',
    args: Thrift.Struct.define('updateLinkedNotebookArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'linkedNotebook', type: Thrift.Type.STRUCT, def: Types.LinkedNotebook, index: 1 }
    }),
    result: Thrift.Struct.define('updateLinkedNotebookResult', {
      0: { alias: 'returnValue',type: Thrift.Type.I32 },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException },
      3: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
    })
  });

  NoteStore.listLinkedNotebooks = Thrift.Method.define({
    alias: 'listLinkedNotebooks',
    args: Thrift.Struct.define('listLinkedNotebooksArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 }
    }),
    result: Thrift.Struct.define('listLinkedNotebooksResult', {
      0: { alias: 'returnValue',type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, Types.LinkedNotebook)  },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException },
      3: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
    })
  });

  NoteStore.expungeLinkedNotebook = Thrift.Method.define({
    alias: 'expungeLinkedNotebook',
    args: Thrift.Struct.define('expungeLinkedNotebookArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'guid', type: Thrift.Type.STRING, index: 1 }
    }),
    result: Thrift.Struct.define('expungeLinkedNotebookResult', {
      0: { alias: 'returnValue',type: Thrift.Type.I32 },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException },
      3: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
    })
  });

  NoteStore.authenticateToSharedNotebook = Thrift.Method.define({
    alias: 'authenticateToSharedNotebook',
    args: Thrift.Struct.define('authenticateToSharedNotebookArgs', {
      1: { alias: 'shareKeyOrGlobalId', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 1 }
    }),
    result: Thrift.Struct.define('authenticateToSharedNotebookResult', {
      0: { alias: 'returnValue',type: Thrift.Type.STRUCT, def: UserStore.AuthenticationResult },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException },
      3: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
    })
  });

  NoteStore.getSharedNotebookByAuth = Thrift.Method.define({
    alias: 'getSharedNotebookByAuth',
    args: Thrift.Struct.define('getSharedNotebookByAuthArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 }
    }),
    result: Thrift.Struct.define('getSharedNotebookByAuthResult', {
      0: { alias: 'returnValue',type: Thrift.Type.STRUCT, def: Types.SharedNotebook },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException },
      3: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
    })
  });

  NoteStore.emailNote = Thrift.Method.define({
    alias: 'emailNote',
    args: Thrift.Struct.define('emailNoteArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'parameters', type: Thrift.Type.STRUCT, def: module.exports.NoteEmailParameters, index: 1 }
    }),
    result: Thrift.Struct.define('emailNoteResult', {
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException },
      3: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
    })
  });

  NoteStore.shareNote = Thrift.Method.define({
    alias: 'shareNote',
    args: Thrift.Struct.define('shareNoteArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'guid', type: Thrift.Type.STRING, index: 1 }
    }),
    result: Thrift.Struct.define('shareNoteResult', {
      0: { alias: 'returnValue',type: Thrift.Type.STRING },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException },
      3: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
    })
  });

  NoteStore.stopSharingNote = Thrift.Method.define({
    alias: 'stopSharingNote',
    args: Thrift.Struct.define('stopSharingNoteArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'guid', type: Thrift.Type.STRING, index: 1 }
    }),
    result: Thrift.Struct.define('stopSharingNoteResult', {
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException },
      3: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
    })
  });

  NoteStore.stopSharingNoteWithRecipients = Thrift.Method.define({
    alias: 'stopSharingNoteWithRecipients',
    args: Thrift.Struct.define('stopSharingNoteWithRecipientsArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'guid', type: Thrift.Type.STRING, index: 1 }
    }),
    result: Thrift.Struct.define('stopSharingNoteWithRecipientsResult', {
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException },
      3: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
    })
  });

  NoteStore.authenticateToSharedNote = Thrift.Method.define({
    alias: 'authenticateToSharedNote',
    args: Thrift.Struct.define('authenticateToSharedNoteArgs', {
      1: { alias: 'guid', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'noteKey', type: Thrift.Type.STRING, index: 1 },
      3: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 2 }
    }),
    result: Thrift.Struct.define('authenticateToSharedNoteResult', {
      0: { alias: 'returnValue',type: Thrift.Type.STRUCT, def: UserStore.AuthenticationResult },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException },
      3: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
    })
  });

  NoteStore.createOrUpdateSharedNotes = Thrift.Method.define({
    alias: 'createOrUpdateSharedNotes',
    args: Thrift.Struct.define('createOrUpdateSharedNotesArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'shareTemplate', type: Thrift.Type.STRUCT, def: module.exports.SharedNoteTemplate, index: 1 }
    }),
    result: Thrift.Struct.define('createOrUpdateSharedNotesResult', {
      0: { alias: 'returnValue',type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, Types.SharedNote)  },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException },
      3: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      4: { alias: 'invalidContactsException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMInvalidContactsException }
    })
  });

  NoteStore.findRelated = Thrift.Method.define({
    alias: 'findRelated',
    args: Thrift.Struct.define('findRelatedArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'query', type: Thrift.Type.STRUCT, def: module.exports.RelatedQuery, index: 1 },
      3: { alias: 'resultSpec', type: Thrift.Type.STRUCT, def: module.exports.RelatedResultSpec, index: 2 }
    }),
    result: Thrift.Struct.define('findRelatedResult', {
      0: { alias: 'returnValue',type: Thrift.Type.STRUCT, def: module.exports.RelatedResult },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
    })
  });

  NoteStore.findSearchSuggestions = Thrift.Method.define({
    alias: 'findSearchSuggestions',
    args: Thrift.Struct.define('findSearchSuggestionsArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'query', type: Thrift.Type.STRUCT, def: module.exports.SearchSuggestionQuery, index: 1 },
      3: { alias: 'resultSpec', type: Thrift.Type.STRUCT, def: module.exports.SearchSuggestionResultSpec, index: 2 }
    }),
    result: Thrift.Struct.define('findSearchSuggestionsResult', {
      0: { alias: 'returnValue',type: Thrift.Type.STRUCT, def: module.exports.SearchSuggestionResult },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
    })
  });

  NoteStore.findSearchSuggestionsV2 = Thrift.Method.define({
    alias: 'findSearchSuggestionsV2',
    args: Thrift.Struct.define('findSearchSuggestionsV2Args', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'request', type: Thrift.Type.STRUCT, def: module.exports.SearchSuggestionQueryV2, index: 1 }
    }),
    result: Thrift.Struct.define('findSearchSuggestionsV2Result', {
      0: { alias: 'returnValue',type: Thrift.Type.STRUCT, def: module.exports.SearchSuggestionResultV2 },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
    })
  });

  NoteStore.updateUserSetting = Thrift.Method.define({
    alias: 'updateUserSetting',
    args: Thrift.Struct.define('updateUserSettingArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'setting', type: Thrift.Type.I32, index: 1 },
      3: { alias: 'value', type: Thrift.Type.STRING, index: 2 }
    }),
    result: Thrift.Struct.define('updateUserSettingResult', {
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
    })
  });

  NoteStore.findTimeZones = Thrift.Method.define({
    alias: 'findTimeZones',
    args: Thrift.Struct.define('findTimeZonesArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'timeZoneSpec', type: Thrift.Type.STRUCT, def: module.exports.TimeZoneSpec, index: 1 },
      3: { alias: 'maxTimeZones', type: Thrift.Type.I32, index: 2 }
    }),
    result: Thrift.Struct.define('findTimeZonesResult', {
      0: { alias: 'returnValue',type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, module.exports.TimeZone)  },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
    })
  });

  NoteStore.findContacts = Thrift.Method.define({
    alias: 'findContacts',
    args: Thrift.Struct.define('findContactsArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'query', type: Thrift.Type.STRUCT, def: module.exports.ContactsQuery, index: 1 }
    }),
    result: Thrift.Struct.define('findContactsResult', {
      0: { alias: 'returnValue',type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, Types.Contact)  },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
    })
  });

  NoteStore.findInBusiness = Thrift.Method.define({
    alias: 'findInBusiness',
    args: Thrift.Struct.define('findInBusinessArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'query', type: Thrift.Type.STRUCT, def: module.exports.BusinessQuery, index: 1 }
    }),
    result: Thrift.Struct.define('findInBusinessResult', {
      0: { alias: 'returnValue',type: Thrift.Type.STRUCT, def: module.exports.BusinessQueryResult },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
    })
  });

  NoteStore.shareNoteWithBusiness = Thrift.Method.define({
    alias: 'shareNoteWithBusiness',
    args: Thrift.Struct.define('shareNoteWithBusinessArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'noteGuid', type: Thrift.Type.STRING, index: 1 }
    }),
    result: Thrift.Struct.define('shareNoteWithBusinessResult', {
      0: { alias: 'returnValue',type: Thrift.Type.I32 },
      1: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      2: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
    })
  });

  NoteStore.stopSharingNoteWithBusiness = Thrift.Method.define({
    alias: 'stopSharingNoteWithBusiness',
    args: Thrift.Struct.define('stopSharingNoteWithBusinessArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'noteGuid', type: Thrift.Type.STRING, index: 1 }
    }),
    result: Thrift.Struct.define('stopSharingNoteWithBusinessResult', {
      0: { alias: 'returnValue',type: Thrift.Type.I32 },
      1: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      2: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
    })
  });

  NoteStore.requestAccessToNotebook = Thrift.Method.define({
    alias: 'requestAccessToNotebook',
    args: Thrift.Struct.define('requestAccessToNotebookArgs', {
      1: { alias: 'authToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'notebookGuid', type: Thrift.Type.STRING, index: 1 },
      3: { alias: 'privilegeLevel', type: Thrift.Type.I32, index: 2 }
    }),
    result: Thrift.Struct.define('requestAccessToNotebookResult', {
      1: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      2: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
    })
  });

  NoteStore.getNoteLockStatus = Thrift.Method.define({
    alias: 'getNoteLockStatus',
    args: Thrift.Struct.define('getNoteLockStatusArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'noteGuid', type: Thrift.Type.STRING, index: 1 }
    }),
    result: Thrift.Struct.define('getNoteLockStatusResult', {
      0: { alias: 'returnValue',type: Thrift.Type.STRUCT, def: module.exports.NoteLockStatus },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException },
      3: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
    })
  });

  NoteStore.acquireNoteLock = Thrift.Method.define({
    alias: 'acquireNoteLock',
    args: Thrift.Struct.define('acquireNoteLockArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'noteGuid', type: Thrift.Type.STRING, index: 1 }
    }),
    result: Thrift.Struct.define('acquireNoteLockResult', {
      0: { alias: 'returnValue',type: Thrift.Type.STRUCT, def: module.exports.NoteLockStatus },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException },
      3: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
    })
  });

  NoteStore.releaseNoteLock = Thrift.Method.define({
    alias: 'releaseNoteLock',
    args: Thrift.Struct.define('releaseNoteLockArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'noteGuid', type: Thrift.Type.STRING, index: 1 }
    }),
    result: Thrift.Struct.define('releaseNoteLockResult', {
      0: { alias: 'returnValue',type: Thrift.Type.STRUCT, def: module.exports.NoteLockStatus },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException },
      3: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
    })
  });

  NoteStore.getViewersForNotes = Thrift.Method.define({
    alias: 'getViewersForNotes',
    args: Thrift.Struct.define('getViewersForNotesArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'noteGuids', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRING) , index: 1 }
    }),
    result: Thrift.Struct.define('getViewersForNotesResult', {
      0: { alias: 'returnValue',type: Thrift.Type.MAP, def: Thrift.Map.define(Thrift.Type.STRING, Thrift.Type.STRUCT, module.exports.NoteLockStatus)  },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
    })
  });

  NoteStore.updateNoteIfUsnMatches = Thrift.Method.define({
    alias: 'updateNoteIfUsnMatches',
    args: Thrift.Struct.define('updateNoteIfUsnMatchesArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'note', type: Thrift.Type.STRUCT, def: Types.Note, index: 1 }
    }),
    result: Thrift.Struct.define('updateNoteIfUsnMatchesResult', {
      0: { alias: 'returnValue',type: Thrift.Type.STRUCT, def: module.exports.UpdateNoteIfUsnMatchesResult },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException },
      3: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
    })
  });

  NoteStore.manageNotebookShares = Thrift.Method.define({
    alias: 'manageNotebookShares',
    args: Thrift.Struct.define('manageNotebookSharesArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'parameters', type: Thrift.Type.STRUCT, def: module.exports.ManageNotebookSharesParameters, index: 1 }
    }),
    result: Thrift.Struct.define('manageNotebookSharesResult', {
      0: { alias: 'returnValue',type: Thrift.Type.STRUCT, def: module.exports.ManageNotebookSharesResult },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException },
      3: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
    })
  });

  NoteStore.getNotebookShares = Thrift.Method.define({
    alias: 'getNotebookShares',
    args: Thrift.Struct.define('getNotebookSharesArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'notebookGuid', type: Thrift.Type.STRING, index: 1 }
    }),
    result: Thrift.Struct.define('getNotebookSharesResult', {
      0: { alias: 'returnValue',type: Thrift.Type.STRUCT, def: module.exports.ShareRelationships },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException },
      3: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
    })
  });

  NoteStore.getNoteShares = Thrift.Method.define({
    alias: 'getNoteShares',
    args: Thrift.Struct.define('getNoteSharesArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'noteGuid', type: Thrift.Type.STRING, index: 1 }
    }),
    result: Thrift.Struct.define('getNoteSharesResult', {
      0: { alias: 'returnValue',type: Thrift.Type.STRUCT, def: module.exports.NoteShareRelationships },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException },
      3: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
    })
  });

  NoteStore.manageNoteShares = Thrift.Method.define({
    alias: 'manageNoteShares',
    args: Thrift.Struct.define('manageNoteSharesArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'parameters', type: Thrift.Type.STRUCT, def: module.exports.ManageNoteSharesParameters, index: 1 }
    }),
    result: Thrift.Struct.define('manageNoteSharesResult', {
      0: { alias: 'returnValue',type: Thrift.Type.STRUCT, def: module.exports.ManageNoteSharesResult },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException },
      3: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
    })
  });

  NoteStore.joinPublishedBusinessNotebook = Thrift.Method.define({
    alias: 'joinPublishedBusinessNotebook',
    args: Thrift.Struct.define('joinPublishedBusinessNotebookArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'notebookGuid', type: Thrift.Type.STRING, index: 1 }
    }),
    result: Thrift.Struct.define('joinPublishedBusinessNotebookResult', {
      0: { alias: 'returnValue',type: Thrift.Type.STRUCT, def: Types.SharedNotebook },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException },
      3: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
    })
  });

  NoteStore.unpublishNotebook = Thrift.Method.define({
    alias: 'unpublishNotebook',
    args: Thrift.Struct.define('unpublishNotebookArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'notebookGuid', type: Thrift.Type.STRING, index: 1 },
      3: { alias: 'convertGroupSharesToIndividual', type: Thrift.Type.BOOL, index: 2 }
    }),
    result: Thrift.Struct.define('unpublishNotebookResult', {
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
    })
  });

  NoteStore.getNotebookSharesEmailAddresses = Thrift.Method.define({
    alias: 'getNotebookSharesEmailAddresses',
    args: Thrift.Struct.define('getNotebookSharesEmailAddressesArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'notebookGuid', type: Thrift.Type.STRING, index: 1 },
      3: { alias: 'identities', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, Types.UserIdentity) , index: 2 },
      4: { alias: 'skipUnknownUserIdentities', type: Thrift.Type.BOOL, index: 3 }
    }),
    result: Thrift.Struct.define('getNotebookSharesEmailAddressesResult', {
      0: { alias: 'returnValue',type: Thrift.Type.SET, def: Thrift.Set.define(Thrift.Type.STRING) },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException },
      3: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
    })
  });

  NoteStore.renameNotebook = Thrift.Method.define({
    alias: 'renameNotebook',
    args: Thrift.Struct.define('renameNotebookArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'notebookGuid', type: Thrift.Type.STRING, index: 1 },
      3: { alias: 'name', type: Thrift.Type.STRING, index: 2 }
    }),
    result: Thrift.Struct.define('renameNotebookResult', {
      0: { alias: 'returnValue',type: Thrift.Type.I32 },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException },
      3: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
    })
  });

  NoteStore.sendLogRequest = Thrift.Method.define({
    alias: 'sendLogRequest',
    args: Thrift.Struct.define('sendLogRequestArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'logRequest', type: Thrift.Type.STRUCT, def: module.exports.LogRequest, index: 1 }
    }),
    result: Thrift.Struct.define('sendLogRequestResult', {
      0: { alias: 'returnValue',type: Thrift.Type.STRUCT, def: module.exports.LogResponse },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException },
      3: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
    })
  });

  NoteStore.getLinkedAccountSyncState = Thrift.Method.define({
    alias: 'getLinkedAccountSyncState',
    args: Thrift.Struct.define('getLinkedAccountSyncStateArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'linkedAccount', type: Thrift.Type.STRUCT, def: Types.LinkedAccount, index: 1 }
    }),
    result: Thrift.Struct.define('getLinkedAccountSyncStateResult', {
      0: { alias: 'returnValue',type: Thrift.Type.STRUCT, def: module.exports.SyncState },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
    })
  });

  NoteStore.authenticateToNote = Thrift.Method.define({
    alias: 'authenticateToNote',
    args: Thrift.Struct.define('authenticateToNoteArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'noteGuid', type: Thrift.Type.STRING, index: 1 }
    }),
    result: Thrift.Struct.define('authenticateToNoteResult', {
      0: { alias: 'returnValue',type: Thrift.Type.STRUCT, def: module.exports.NoteAuthenticationResult },
      1: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      2: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
    })
  });

  // Define NoteStore Client

  function NoteStoreClient(output) {
    this.output = output;
    this.seqid = 0;
  }

  NoteStoreClient.prototype.getSyncState = function(authenticationToken, callback) {
    var mdef = NoteStore.getSyncState;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  NoteStoreClient.prototype.getSyncStateWithMetrics = function(authenticationToken, clientMetrics, callback) {
    var mdef = NoteStore.getSyncStateWithMetrics;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.clientMetrics = clientMetrics;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  NoteStoreClient.prototype.getSyncChunk = function(authenticationToken, afterUSN, maxEntries, fullSyncOnly, callback) {
    var mdef = NoteStore.getSyncChunk;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.afterUSN = afterUSN;
    args.maxEntries = maxEntries;
    args.fullSyncOnly = fullSyncOnly;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  NoteStoreClient.prototype.getFilteredSyncChunk = function(authenticationToken, afterUSN, maxEntries, filter, callback) {
    var mdef = NoteStore.getFilteredSyncChunk;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.afterUSN = afterUSN;
    args.maxEntries = maxEntries;
    args.filter = filter;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  NoteStoreClient.prototype.getLinkedNotebookSyncState = function(authenticationToken, linkedNotebook, callback) {
    var mdef = NoteStore.getLinkedNotebookSyncState;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.linkedNotebook = linkedNotebook;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  NoteStoreClient.prototype.getLinkedNotebookSyncChunk = function(authenticationToken, linkedNotebook, afterUSN, maxEntries, fullSyncOnly, callback) {
    var mdef = NoteStore.getLinkedNotebookSyncChunk;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.linkedNotebook = linkedNotebook;
    args.afterUSN = afterUSN;
    args.maxEntries = maxEntries;
    args.fullSyncOnly = fullSyncOnly;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  NoteStoreClient.prototype.listNotebooks = function(authenticationToken, callback) {
    var mdef = NoteStore.listNotebooks;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  NoteStoreClient.prototype.listPublishedBusinessNotebooks = function(authenticationToken, callback) {
    var mdef = NoteStore.listPublishedBusinessNotebooks;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  NoteStoreClient.prototype.listAccessibleBusinessNotebooks = function(authenticationToken, resultSpec, callback) {
    var mdef = NoteStore.listAccessibleBusinessNotebooks;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.resultSpec = resultSpec;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  NoteStoreClient.prototype.getNotebook = function(authenticationToken, guid, callback) {
    var mdef = NoteStore.getNotebook;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.guid = guid;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  NoteStoreClient.prototype.getDefaultNotebook = function(authenticationToken, callback) {
    var mdef = NoteStore.getDefaultNotebook;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  NoteStoreClient.prototype.getUserNotebook = function(authenticationToken, callback) {
    var mdef = NoteStore.getUserNotebook;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  NoteStoreClient.prototype.createNotebook = function(authenticationToken, notebook, callback) {
    var mdef = NoteStore.createNotebook;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.notebook = notebook;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  NoteStoreClient.prototype.updateNotebook = function(authenticationToken, notebook, callback) {
    var mdef = NoteStore.updateNotebook;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.notebook = notebook;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  NoteStoreClient.prototype.updateNotebookWithResultSpec = function(authenticationToken, notebook, resultSpec, callback) {
    var mdef = NoteStore.updateNotebookWithResultSpec;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.notebook = notebook;
    args.resultSpec = resultSpec;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  NoteStoreClient.prototype.expungeNotebook = function(authenticationToken, guid, callback) {
    var mdef = NoteStore.expungeNotebook;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.guid = guid;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  NoteStoreClient.prototype.listTags = function(authenticationToken, callback) {
    var mdef = NoteStore.listTags;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  NoteStoreClient.prototype.listTagsByNotebook = function(authenticationToken, notebookGuid, callback) {
    var mdef = NoteStore.listTagsByNotebook;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.notebookGuid = notebookGuid;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  NoteStoreClient.prototype.getTag = function(authenticationToken, guid, callback) {
    var mdef = NoteStore.getTag;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.guid = guid;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  NoteStoreClient.prototype.createTag = function(authenticationToken, tag, callback) {
    var mdef = NoteStore.createTag;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.tag = tag;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  NoteStoreClient.prototype.updateTag = function(authenticationToken, tag, callback) {
    var mdef = NoteStore.updateTag;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.tag = tag;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  NoteStoreClient.prototype.untagAll = function(authenticationToken, guid, callback) {
    var mdef = NoteStore.untagAll;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.guid = guid;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  NoteStoreClient.prototype.expungeTag = function(authenticationToken, guid, callback) {
    var mdef = NoteStore.expungeTag;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.guid = guid;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  NoteStoreClient.prototype.listSearches = function(authenticationToken, callback) {
    var mdef = NoteStore.listSearches;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  NoteStoreClient.prototype.getSearch = function(authenticationToken, guid, callback) {
    var mdef = NoteStore.getSearch;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.guid = guid;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  NoteStoreClient.prototype.createSearch = function(authenticationToken, search, callback) {
    var mdef = NoteStore.createSearch;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.search = search;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  NoteStoreClient.prototype.updateSearch = function(authenticationToken, search, callback) {
    var mdef = NoteStore.updateSearch;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.search = search;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  NoteStoreClient.prototype.expungeSearch = function(authenticationToken, guid, callback) {
    var mdef = NoteStore.expungeSearch;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.guid = guid;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  NoteStoreClient.prototype.findNotes = function(authenticationToken, filter, offset, maxNotes, callback) {
    var mdef = NoteStore.findNotes;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.filter = filter;
    args.offset = offset;
    args.maxNotes = maxNotes;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  NoteStoreClient.prototype.findNoteOffset = function(authenticationToken, filter, guid, callback) {
    var mdef = NoteStore.findNoteOffset;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.filter = filter;
    args.guid = guid;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  NoteStoreClient.prototype.findNotesMetadata = function(authenticationToken, filter, offset, maxNotes, resultSpec, callback) {
    var mdef = NoteStore.findNotesMetadata;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.filter = filter;
    args.offset = offset;
    args.maxNotes = maxNotes;
    args.resultSpec = resultSpec;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  NoteStoreClient.prototype.filteredSearch = function(authenticationToken, request, resultSpec, callback) {
    var mdef = NoteStore.filteredSearch;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.request = request;
    args.resultSpec = resultSpec;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  NoteStoreClient.prototype.getNoteSnippets = function(authenticationToken, noteGuids, maxSnippetLength, callback) {
    var mdef = NoteStore.getNoteSnippets;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.noteGuids = noteGuids;
    args.maxSnippetLength = maxSnippetLength;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  NoteStoreClient.prototype.findNoteCounts = function(authenticationToken, filter, withTrash, callback) {
    var mdef = NoteStore.findNoteCounts;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.filter = filter;
    args.withTrash = withTrash;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  NoteStoreClient.prototype.getNoteWithResultSpec = function(authenticationToken, guid, resultSpec, callback) {
    var mdef = NoteStore.getNoteWithResultSpec;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.guid = guid;
    args.resultSpec = resultSpec;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  NoteStoreClient.prototype.getNote = function(authenticationToken, guid, withContent, withResourcesData, withResourcesRecognition, withResourcesAlternateData, callback) {
    var mdef = NoteStore.getNote;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.guid = guid;
    args.withContent = withContent;
    args.withResourcesData = withResourcesData;
    args.withResourcesRecognition = withResourcesRecognition;
    args.withResourcesAlternateData = withResourcesAlternateData;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  NoteStoreClient.prototype.getPreferences = function(authenticationToken, preferenceNames, callback) {
    var mdef = NoteStore.getPreferences;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.preferenceNames = preferenceNames;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  NoteStoreClient.prototype.updatePreferences = function(authenticationToken, preferencesToUpdate, callback) {
    var mdef = NoteStore.updatePreferences;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.preferencesToUpdate = preferencesToUpdate;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  NoteStoreClient.prototype.getNoteApplicationData = function(authenticationToken, guid, callback) {
    var mdef = NoteStore.getNoteApplicationData;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.guid = guid;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  NoteStoreClient.prototype.getNoteApplicationDataEntry = function(authenticationToken, guid, key, callback) {
    var mdef = NoteStore.getNoteApplicationDataEntry;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.guid = guid;
    args.key = key;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  NoteStoreClient.prototype.setNoteApplicationDataEntry = function(authenticationToken, guid, key, value, callback) {
    var mdef = NoteStore.setNoteApplicationDataEntry;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.guid = guid;
    args.key = key;
    args.value = value;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  NoteStoreClient.prototype.unsetNoteApplicationDataEntry = function(authenticationToken, guid, key, callback) {
    var mdef = NoteStore.unsetNoteApplicationDataEntry;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.guid = guid;
    args.key = key;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  NoteStoreClient.prototype.getNoteContent = function(authenticationToken, guid, callback) {
    var mdef = NoteStore.getNoteContent;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.guid = guid;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  NoteStoreClient.prototype.getNoteSearchText = function(authenticationToken, guid, noteOnly, tokenizeForIndexing, callback) {
    var mdef = NoteStore.getNoteSearchText;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.guid = guid;
    args.noteOnly = noteOnly;
    args.tokenizeForIndexing = tokenizeForIndexing;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  NoteStoreClient.prototype.getResourceSearchText = function(authenticationToken, guid, callback) {
    var mdef = NoteStore.getResourceSearchText;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.guid = guid;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  NoteStoreClient.prototype.getNoteTagNames = function(authenticationToken, guid, callback) {
    var mdef = NoteStore.getNoteTagNames;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.guid = guid;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  NoteStoreClient.prototype.createNote = function(authenticationToken, note, callback) {
    var mdef = NoteStore.createNote;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.note = note;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  NoteStoreClient.prototype.updateNote = function(authenticationToken, note, callback) {
    var mdef = NoteStore.updateNote;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.note = note;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  NoteStoreClient.prototype.deleteNote = function(authenticationToken, guid, callback) {
    var mdef = NoteStore.deleteNote;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.guid = guid;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  NoteStoreClient.prototype.expungeNote = function(authenticationToken, guid, callback) {
    var mdef = NoteStore.expungeNote;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.guid = guid;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  NoteStoreClient.prototype.expungeNotes = function(authenticationToken, noteGuids, callback) {
    var mdef = NoteStore.expungeNotes;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.noteGuids = noteGuids;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  NoteStoreClient.prototype.expungeInactiveNotes = function(authenticationToken, callback) {
    var mdef = NoteStore.expungeInactiveNotes;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  NoteStoreClient.prototype.copyNote = function(authenticationToken, noteGuid, toNotebookGuid, callback) {
    var mdef = NoteStore.copyNote;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.noteGuid = noteGuid;
    args.toNotebookGuid = toNotebookGuid;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  NoteStoreClient.prototype.listNoteVersions = function(authenticationToken, noteGuid, callback) {
    var mdef = NoteStore.listNoteVersions;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.noteGuid = noteGuid;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  NoteStoreClient.prototype.getNoteVersion = function(authenticationToken, noteGuid, updateSequenceNum, withResourcesData, withResourcesRecognition, withResourcesAlternateData, callback) {
    var mdef = NoteStore.getNoteVersion;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.noteGuid = noteGuid;
    args.updateSequenceNum = updateSequenceNum;
    args.withResourcesData = withResourcesData;
    args.withResourcesRecognition = withResourcesRecognition;
    args.withResourcesAlternateData = withResourcesAlternateData;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  NoteStoreClient.prototype.getResource = function(authenticationToken, guid, withData, withRecognition, withAttributes, withAlternateData, callback) {
    var mdef = NoteStore.getResource;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.guid = guid;
    args.withData = withData;
    args.withRecognition = withRecognition;
    args.withAttributes = withAttributes;
    args.withAlternateData = withAlternateData;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  NoteStoreClient.prototype.getResourceApplicationData = function(authenticationToken, guid, callback) {
    var mdef = NoteStore.getResourceApplicationData;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.guid = guid;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  NoteStoreClient.prototype.getResourceApplicationDataEntry = function(authenticationToken, guid, key, callback) {
    var mdef = NoteStore.getResourceApplicationDataEntry;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.guid = guid;
    args.key = key;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  NoteStoreClient.prototype.setResourceApplicationDataEntry = function(authenticationToken, guid, key, value, callback) {
    var mdef = NoteStore.setResourceApplicationDataEntry;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.guid = guid;
    args.key = key;
    args.value = value;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  NoteStoreClient.prototype.unsetResourceApplicationDataEntry = function(authenticationToken, guid, key, callback) {
    var mdef = NoteStore.unsetResourceApplicationDataEntry;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.guid = guid;
    args.key = key;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  NoteStoreClient.prototype.updateResource = function(authenticationToken, resource, callback) {
    var mdef = NoteStore.updateResource;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.resource = resource;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  NoteStoreClient.prototype.getResourceData = function(authenticationToken, guid, callback) {
    var mdef = NoteStore.getResourceData;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.guid = guid;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  NoteStoreClient.prototype.getResourceByHash = function(authenticationToken, noteGuid, contentHash, withData, withRecognition, withAlternateData, callback) {
    var mdef = NoteStore.getResourceByHash;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.noteGuid = noteGuid;
    args.contentHash = contentHash;
    args.withData = withData;
    args.withRecognition = withRecognition;
    args.withAlternateData = withAlternateData;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  NoteStoreClient.prototype.getResourceRecognition = function(authenticationToken, guid, callback) {
    var mdef = NoteStore.getResourceRecognition;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.guid = guid;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  NoteStoreClient.prototype.getResourceAlternateData = function(authenticationToken, guid, callback) {
    var mdef = NoteStore.getResourceAlternateData;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.guid = guid;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  NoteStoreClient.prototype.getResourceAttributes = function(authenticationToken, guid, callback) {
    var mdef = NoteStore.getResourceAttributes;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.guid = guid;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  NoteStoreClient.prototype.getAds = function(authenticationToken, adParameters, callback) {
    var mdef = NoteStore.getAds;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.adParameters = adParameters;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  NoteStoreClient.prototype.getRandomAd = function(authenticationToken, adParameters, callback) {
    var mdef = NoteStore.getRandomAd;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.adParameters = adParameters;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  NoteStoreClient.prototype.getPublicNotebook = function(userId, publicUri, callback) {
    var mdef = NoteStore.getPublicNotebook;
    var args = new mdef.args();
    args.userId = userId;
    args.publicUri = publicUri;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  NoteStoreClient.prototype.createSharedNotebook = function(authenticationToken, sharedNotebook, callback) {
    var mdef = NoteStore.createSharedNotebook;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.sharedNotebook = sharedNotebook;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  NoteStoreClient.prototype.shareNotebook = function(authenticationToken, sharedNotebook, message, callback) {
    var mdef = NoteStore.shareNotebook;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.sharedNotebook = sharedNotebook;
    args.message = message;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  NoteStoreClient.prototype.createOrUpdateNotebookShares = function(authenticationToken, shareTemplate, callback) {
    var mdef = NoteStore.createOrUpdateNotebookShares;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.shareTemplate = shareTemplate;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  NoteStoreClient.prototype.updateSharedNotebook = function(authenticationToken, sharedNotebook, callback) {
    var mdef = NoteStore.updateSharedNotebook;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.sharedNotebook = sharedNotebook;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  NoteStoreClient.prototype.setSharedNotebookRecipientSettings = function(authenticationToken, sharedNotebookId, recipientSettings, callback) {
    var mdef = NoteStore.setSharedNotebookRecipientSettings;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.sharedNotebookId = sharedNotebookId;
    args.recipientSettings = recipientSettings;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  NoteStoreClient.prototype.setNotebookRecipientSettings = function(authenticationToken, notebookGuid, recipientSettings, callback) {
    var mdef = NoteStore.setNotebookRecipientSettings;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.notebookGuid = notebookGuid;
    args.recipientSettings = recipientSettings;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  NoteStoreClient.prototype.sendMessageToSharedNotebookMembers = function(authenticationToken, notebookGuid, messageText, recipients, callback) {
    var mdef = NoteStore.sendMessageToSharedNotebookMembers;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.notebookGuid = notebookGuid;
    args.messageText = messageText;
    args.recipients = recipients;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  NoteStoreClient.prototype.listSharedNotebooks = function(authenticationToken, callback) {
    var mdef = NoteStore.listSharedNotebooks;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  NoteStoreClient.prototype.expungeSharedNotebooks = function(authenticationToken, sharedNotebookIds, callback) {
    var mdef = NoteStore.expungeSharedNotebooks;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.sharedNotebookIds = sharedNotebookIds;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  NoteStoreClient.prototype.createLinkedNotebook = function(authenticationToken, linkedNotebook, callback) {
    var mdef = NoteStore.createLinkedNotebook;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.linkedNotebook = linkedNotebook;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  NoteStoreClient.prototype.updateLinkedNotebook = function(authenticationToken, linkedNotebook, callback) {
    var mdef = NoteStore.updateLinkedNotebook;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.linkedNotebook = linkedNotebook;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  NoteStoreClient.prototype.listLinkedNotebooks = function(authenticationToken, callback) {
    var mdef = NoteStore.listLinkedNotebooks;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  NoteStoreClient.prototype.expungeLinkedNotebook = function(authenticationToken, guid, callback) {
    var mdef = NoteStore.expungeLinkedNotebook;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.guid = guid;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  NoteStoreClient.prototype.authenticateToSharedNotebook = function(shareKeyOrGlobalId, authenticationToken, callback) {
    var mdef = NoteStore.authenticateToSharedNotebook;
    var args = new mdef.args();
    args.shareKeyOrGlobalId = shareKeyOrGlobalId;
    args.authenticationToken = authenticationToken;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  NoteStoreClient.prototype.getSharedNotebookByAuth = function(authenticationToken, callback) {
    var mdef = NoteStore.getSharedNotebookByAuth;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  NoteStoreClient.prototype.emailNote = function(authenticationToken, parameters, callback) {
    var mdef = NoteStore.emailNote;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.parameters = parameters;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  NoteStoreClient.prototype.shareNote = function(authenticationToken, guid, callback) {
    var mdef = NoteStore.shareNote;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.guid = guid;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  NoteStoreClient.prototype.stopSharingNote = function(authenticationToken, guid, callback) {
    var mdef = NoteStore.stopSharingNote;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.guid = guid;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  NoteStoreClient.prototype.stopSharingNoteWithRecipients = function(authenticationToken, guid, callback) {
    var mdef = NoteStore.stopSharingNoteWithRecipients;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.guid = guid;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  NoteStoreClient.prototype.authenticateToSharedNote = function(guid, noteKey, authenticationToken, callback) {
    var mdef = NoteStore.authenticateToSharedNote;
    var args = new mdef.args();
    args.guid = guid;
    args.noteKey = noteKey;
    args.authenticationToken = authenticationToken;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  NoteStoreClient.prototype.createOrUpdateSharedNotes = function(authenticationToken, shareTemplate, callback) {
    var mdef = NoteStore.createOrUpdateSharedNotes;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.shareTemplate = shareTemplate;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  NoteStoreClient.prototype.findRelated = function(authenticationToken, query, resultSpec, callback) {
    var mdef = NoteStore.findRelated;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.query = query;
    args.resultSpec = resultSpec;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  NoteStoreClient.prototype.findSearchSuggestions = function(authenticationToken, query, resultSpec, callback) {
    var mdef = NoteStore.findSearchSuggestions;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.query = query;
    args.resultSpec = resultSpec;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  NoteStoreClient.prototype.findSearchSuggestionsV2 = function(authenticationToken, request, callback) {
    var mdef = NoteStore.findSearchSuggestionsV2;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.request = request;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  NoteStoreClient.prototype.updateUserSetting = function(authenticationToken, setting, value, callback) {
    var mdef = NoteStore.updateUserSetting;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.setting = setting;
    args.value = value;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  NoteStoreClient.prototype.findTimeZones = function(authenticationToken, timeZoneSpec, maxTimeZones, callback) {
    var mdef = NoteStore.findTimeZones;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.timeZoneSpec = timeZoneSpec;
    args.maxTimeZones = maxTimeZones;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  NoteStoreClient.prototype.findContacts = function(authenticationToken, query, callback) {
    var mdef = NoteStore.findContacts;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.query = query;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  NoteStoreClient.prototype.findInBusiness = function(authenticationToken, query, callback) {
    var mdef = NoteStore.findInBusiness;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.query = query;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  NoteStoreClient.prototype.shareNoteWithBusiness = function(authenticationToken, noteGuid, callback) {
    var mdef = NoteStore.shareNoteWithBusiness;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.noteGuid = noteGuid;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  NoteStoreClient.prototype.stopSharingNoteWithBusiness = function(authenticationToken, noteGuid, callback) {
    var mdef = NoteStore.stopSharingNoteWithBusiness;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.noteGuid = noteGuid;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  NoteStoreClient.prototype.requestAccessToNotebook = function(authToken, notebookGuid, privilegeLevel, callback) {
    var mdef = NoteStore.requestAccessToNotebook;
    var args = new mdef.args();
    args.authToken = authToken;
    args.notebookGuid = notebookGuid;
    args.privilegeLevel = privilegeLevel;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  NoteStoreClient.prototype.getNoteLockStatus = function(authenticationToken, noteGuid, callback) {
    var mdef = NoteStore.getNoteLockStatus;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.noteGuid = noteGuid;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  NoteStoreClient.prototype.acquireNoteLock = function(authenticationToken, noteGuid, callback) {
    var mdef = NoteStore.acquireNoteLock;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.noteGuid = noteGuid;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  NoteStoreClient.prototype.releaseNoteLock = function(authenticationToken, noteGuid, callback) {
    var mdef = NoteStore.releaseNoteLock;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.noteGuid = noteGuid;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  NoteStoreClient.prototype.getViewersForNotes = function(authenticationToken, noteGuids, callback) {
    var mdef = NoteStore.getViewersForNotes;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.noteGuids = noteGuids;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  NoteStoreClient.prototype.updateNoteIfUsnMatches = function(authenticationToken, note, callback) {
    var mdef = NoteStore.updateNoteIfUsnMatches;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.note = note;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  NoteStoreClient.prototype.manageNotebookShares = function(authenticationToken, parameters, callback) {
    var mdef = NoteStore.manageNotebookShares;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.parameters = parameters;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  NoteStoreClient.prototype.getNotebookShares = function(authenticationToken, notebookGuid, callback) {
    var mdef = NoteStore.getNotebookShares;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.notebookGuid = notebookGuid;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  NoteStoreClient.prototype.getNoteShares = function(authenticationToken, noteGuid, callback) {
    var mdef = NoteStore.getNoteShares;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.noteGuid = noteGuid;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  NoteStoreClient.prototype.manageNoteShares = function(authenticationToken, parameters, callback) {
    var mdef = NoteStore.manageNoteShares;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.parameters = parameters;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  NoteStoreClient.prototype.joinPublishedBusinessNotebook = function(authenticationToken, notebookGuid, callback) {
    var mdef = NoteStore.joinPublishedBusinessNotebook;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.notebookGuid = notebookGuid;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  NoteStoreClient.prototype.unpublishNotebook = function(authenticationToken, notebookGuid, convertGroupSharesToIndividual, callback) {
    var mdef = NoteStore.unpublishNotebook;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.notebookGuid = notebookGuid;
    args.convertGroupSharesToIndividual = convertGroupSharesToIndividual;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  NoteStoreClient.prototype.getNotebookSharesEmailAddresses = function(authenticationToken, notebookGuid, identities, skipUnknownUserIdentities, callback) {
    var mdef = NoteStore.getNotebookSharesEmailAddresses;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.notebookGuid = notebookGuid;
    args.identities = identities;
    args.skipUnknownUserIdentities = skipUnknownUserIdentities;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  NoteStoreClient.prototype.renameNotebook = function(authenticationToken, notebookGuid, name, callback) {
    var mdef = NoteStore.renameNotebook;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.notebookGuid = notebookGuid;
    args.name = name;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  NoteStoreClient.prototype.sendLogRequest = function(authenticationToken, logRequest, callback) {
    var mdef = NoteStore.sendLogRequest;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.logRequest = logRequest;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  NoteStoreClient.prototype.getLinkedAccountSyncState = function(authenticationToken, linkedAccount, callback) {
    var mdef = NoteStore.getLinkedAccountSyncState;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.linkedAccount = linkedAccount;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  NoteStoreClient.prototype.authenticateToNote = function(authenticationToken, noteGuid, callback) {
    var mdef = NoteStore.authenticateToNote;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.noteGuid = noteGuid;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  module.exports.NoteStore.Client = NoteStoreClient;

  // Define NoteStore Server

  function NoteStoreServer(service, stransport, Protocol) {
    var methodName;
      this.service = service;
      this.stransport = stransport;
      this.processor = new Thrift.Processor();
      for (methodName in NoteStore) {
        if (service[methodName]) {
          this.processor.addMethod(NoteStore[methodName], service[methodName].bind(service));
        }
      }
      this.stransport.process = function (input, output, noop) {
      var inprot = new Protocol(input);
      var outprot = new Protocol(output);
      this.processor.process(inprot, outprot, noop);
    }.bind(this);
  }

  NoteStoreServer.prototype.start = function () {
    this.stransport.listen();
  };
  NoteStoreServer.prototype.stop = function () {
    this.stransport.close();
  };

  module.exports.NoteStore.Server = NoteStoreServer;



/***/ }),

/***/ 43:
/***/ (function(module, exports, __webpack_require__) {

//
// Autogenerated by Thrift Compiler (0.7.0-en-11139b3b5cb61e817408c6e84b0e1c258bf6c6ae)
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//


  // Define types and services

  var Thrift = __webpack_require__(0).Thrift;

  module.exports.Priority = {
    'IMMEDIATE' : 0,
    'SUITABLE' : 1
  };

  module.exports.Placement = {
    'FULLSCREEN' : 0,
    'BANNER' : 1,
    'CARD' : 2
  };

  module.exports.TriggerType = {
    'PASTE' : 0,
    'UNDO' : 1,
    'PICTURE' : 2
  };

  module.exports.Events = Thrift.Struct.define('Events',  {
    1: { alias: 'show', type: Thrift.Type.STRING },
    2: { alias: 'dismiss', type: Thrift.Type.STRING }
  });

  module.exports.Event = Thrift.Struct.define('Event',  {
    1: { alias: 'name', type: Thrift.Type.STRING },
    2: { alias: 'time', type: Thrift.Type.I64 },
    3: { alias: 'messageKey', type: Thrift.Type.STRING }
  });

  module.exports.MessageContent = Thrift.Struct.define('MessageContent',  {
    1: { alias: 'html', type: Thrift.Type.STRING },
    2: { alias: 'version', type: Thrift.Type.I64 }
  });

  module.exports.Trigger = Thrift.Struct.define('Trigger',  {
    1: { alias: 'kind', type: Thrift.Type.I32 },
    2: { alias: 'criteria', type: Thrift.Type.MAP, def: Thrift.Map.define(Thrift.Type.STRING, Thrift.Type.STRING )  }
  });

  module.exports.InAppMessage = Thrift.Struct.define('InAppMessage',  {
    1: { alias: 'key', type: Thrift.Type.STRING },
    2: { alias: 'priority', type: Thrift.Type.I32 },
    3: { alias: 'events', type: Thrift.Type.STRUCT, def: module.exports.Events },
    4: { alias: 'content', type: Thrift.Type.STRUCT, def: module.exports.MessageContent },
    5: { alias: 'placement', type: Thrift.Type.I32 },
    6: { alias: 'trigger', type: Thrift.Type.STRUCT, def: module.exports.Trigger }
  });

  module.exports.InAppMessageIdentifier = Thrift.Struct.define('InAppMessageIdentifier',  {
    1: { alias: 'key', type: Thrift.Type.STRING },
    2: { alias: 'version', type: Thrift.Type.I64 }
  });

  module.exports.MessageResponse = Thrift.Struct.define('MessageResponse',  {
    1: { alias: 'messages', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, module.exports.InAppMessage)  }
  });

  module.exports.MessageRequest = Thrift.Struct.define('MessageRequest',  {
    1: { alias: 'knownMessages', type: Thrift.Type.SET, def: Thrift.Set.define(Thrift.Type.STRUCT, module.exports.InAppMessageIdentifier) },
    2: { alias: 'supportedTriggers', type: Thrift.Type.SET, def: Thrift.Set.define(Thrift.Type.I32) },
    3: { alias: 'supportedPlacements', type: Thrift.Type.SET, def: Thrift.Set.define(Thrift.Type.I32) },
    4: { alias: 'events', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, module.exports.Event)  },
    5: { alias: 'locale', type: Thrift.Type.STRING },
    6: { alias: 'clientVersion', type: Thrift.Type.STRING }
  });



/***/ }),

/***/ 44:
/***/ (function(module, exports, __webpack_require__) {

//
// Autogenerated by Thrift Compiler (0.7.0-en-11139b3b5cb61e817408c6e84b0e1c258bf6c6ae)
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//


  // Define types and services

  var Thrift = __webpack_require__(0).Thrift;

  module.exports.CommEnginePlacement = {
    'FULLSCREEN' : 0,
    'BANNER' : 1,
    'CARD' : 2
  };

  module.exports.CommEnginePriority = {
    'IMMEDIATE' : 0,
    'SUITABLE' : 1
  };

  module.exports.CommEngineEventType = {
    'SHOW' : 0,
    'DISMISS' : 1,
    'TRACK' : 2,
    'ERROREVENT' : 3
  };

  module.exports.CommEngineClientType = {
    'MAC' : 0,
    'WINDOWS' : 1,
    'IOS' : 2,
    'ANDROID' : 3,
    'WEB' : 4,
    'CLIPPER' : 5,
    'ION' : 6
  };

  module.exports.Event = Thrift.Struct.define('Event',  {
    1: { alias: 'type', type: Thrift.Type.I32 },
    2: { alias: 'timeOccurred', type: Thrift.Type.I64 },
    3: { alias: 'messageKey', type: Thrift.Type.STRING },
    4: { alias: 'label', type: Thrift.Type.STRING }
  });

  module.exports.MessageContent = Thrift.Struct.define('MessageContent',  {
    1: { alias: 'templateUri', type: Thrift.Type.STRING },
    2: { alias: 'contentVariablesJson', type: Thrift.Type.STRING }
  });

  module.exports.InAppMessage = Thrift.Struct.define('InAppMessage',  {
    1: { alias: 'key', type: Thrift.Type.STRING },
    2: { alias: 'priority', type: Thrift.Type.I32 },
    3: { alias: 'content', type: Thrift.Type.STRUCT, def: module.exports.MessageContent },
    4: { alias: 'placement', type: Thrift.Type.I32 },
    5: { alias: 'offline', type: Thrift.Type.BOOL },
    6: { alias: 'expires', type: Thrift.Type.I64 }
  });

  module.exports.InAppMessageIdentifier = Thrift.Struct.define('InAppMessageIdentifier',  {
    1: { alias: 'key', type: Thrift.Type.STRING }
  });

  module.exports.Config = Thrift.Struct.define('Config',  {
    1: { alias: 'cooldownPeriodMillis', type: Thrift.Type.I64 }
  });

  module.exports.AnalyticsEvent = Thrift.Struct.define('AnalyticsEvent',  {
    1: { alias: 'category', type: Thrift.Type.STRING },
    2: { alias: 'action', type: Thrift.Type.STRING },
    3: { alias: 'label', type: Thrift.Type.STRING }
  });

  module.exports.MessageResponse = Thrift.Struct.define('MessageResponse',  {
    1: { alias: 'messages', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, module.exports.InAppMessage)  },
    2: { alias: 'messageRequestGuid', type: Thrift.Type.STRING },
    3: { alias: 'config', type: Thrift.Type.STRUCT, def: module.exports.Config }
  });

  module.exports.MessageRequest = Thrift.Struct.define('MessageRequest',  {
    1: { alias: 'guid', type: Thrift.Type.STRING },
    2: { alias: 'knownMessages', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, module.exports.InAppMessageIdentifier)  },
    3: { alias: 'supportedPlacements', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.I32)  },
    4: { alias: 'events', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, module.exports.Event)  },
    5: { alias: 'locale', type: Thrift.Type.STRING },
    6: { alias: 'commEngineJsVersion', type: Thrift.Type.I32 },
    7: { alias: 'nativeClientVersion', type: Thrift.Type.I32 },
    8: { alias: 'clientType', type: Thrift.Type.I32 },
    9: { alias: 'uiLanguage', type: Thrift.Type.STRING }
  });

  module.exports.DebugParams = Thrift.Struct.define('DebugParams',  {
    1: { alias: 'apiLogging', type: Thrift.Type.BOOL },
    2: { alias: 'dataLogging', type: Thrift.Type.BOOL },
    3: { alias: 'stateLogging', type: Thrift.Type.BOOL },
    4: { alias: 'syncLogging', type: Thrift.Type.BOOL },
    5: { alias: 'frequentSyncs', type: Thrift.Type.BOOL },
    6: { alias: 'cooldownPeriodMillis', type: Thrift.Type.I64 },
    7: { alias: 'alwaysProcessServerResponse', type: Thrift.Type.BOOL }
  });

  module.exports.InitializeRequest = Thrift.Struct.define('InitializeRequest',  {
    1: { alias: 'clientType', type: Thrift.Type.I32 },
    2: { alias: 'supportedPlacements', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.I32)  },
    3: { alias: 'savedState', type: Thrift.Type.BINARY },
    4: { alias: 'locale', type: Thrift.Type.STRING },
    5: { alias: 'nativeClientVersion', type: Thrift.Type.I32 },
    6: { alias: 'debugParams', type: Thrift.Type.STRUCT, def: module.exports.DebugParams },
    7: { alias: 'uiLanguage', type: Thrift.Type.STRING }
  });

  module.exports.ShowRequest = Thrift.Struct.define('ShowRequest',  {
    1: { alias: 'placement', type: Thrift.Type.I32 },
    2: { alias: 'html', type: Thrift.Type.STRING },
    3: { alias: 'priority', type: Thrift.Type.I32 }
  });



/***/ }),

/***/ 45:
/***/ (function(module, exports, __webpack_require__) {

//
// Autogenerated by Thrift Compiler (0.7.0-en-11139b3b5cb61e817408c6e84b0e1c258bf6c6ae)
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//


  // Define types and services

  var Thrift = __webpack_require__(0).Thrift;
  var Types = __webpack_require__(3);


  module.exports.RecipientType = {
    'USER' : 1,
    'BUSINESS' : 2
  };

  module.exports.EntityPrivilegeLevel = {
    'READ' : 1,
    'EDIT' : 2
  };

  module.exports.PrivilegeSharing = {
    'MANAGE' : 1
  };

  module.exports.PrivilegeValues = Thrift.Struct.define('PrivilegeValues',  {
    1: { alias: 'level', type: Thrift.Type.I32 },
    2: { alias: 'sharing', type: Thrift.Type.I32 }
  });

  module.exports.InvitationCommon = Thrift.Struct.define('InvitationCommon',  {
    1: { alias: 'guid', type: Thrift.Type.STRING },
    2: { alias: 'entityOwnerId', type: Thrift.Type.I32 },
    3: { alias: 'sharerUserId', type: Thrift.Type.I32 },
    4: { alias: 'serviceCreated', type: Thrift.Type.I64 },
    5: { alias: 'serviceUpdated', type: Thrift.Type.I64 },
    6: { alias: 'serviceAssigned', type: Thrift.Type.I64 },
    7: { alias: 'membershipGuid', type: Thrift.Type.STRING }
  });

  module.exports.InternalInvitation = Thrift.Struct.define('InternalInvitation',  {
    1: { alias: 'common', type: Thrift.Type.STRUCT, def: module.exports.InvitationCommon },
    2: { alias: 'entityType', type: Thrift.Type.I32 },
    3: { alias: 'entityId', type: Thrift.Type.I64 },
    4: { alias: 'privilegeValues', type: Thrift.Type.STRUCT, def: module.exports.PrivilegeValues },
    5: { alias: 'identity', type: Thrift.Type.STRUCT, def: Types.Identity }
  });

  module.exports.MembershipCommon = Thrift.Struct.define('MembershipCommon',  {
    1: { alias: 'guid', type: Thrift.Type.STRING },
    2: { alias: 'recipientType', type: Thrift.Type.I32 },
    3: { alias: 'recipientId', type: Thrift.Type.I64 },
    4: { alias: 'sharerUserId', type: Thrift.Type.I32 },
    7: { alias: 'entityOwnerId', type: Thrift.Type.I32 },
    9: { alias: 'serviceCreated', type: Thrift.Type.I64 },
    10: { alias: 'serviceUpdated', type: Thrift.Type.I64 }
  });

  module.exports.InternalMembership = Thrift.Struct.define('InternalMembership',  {
    1: { alias: 'common', type: Thrift.Type.STRUCT, def: module.exports.MembershipCommon },
    2: { alias: 'entityType', type: Thrift.Type.I32 },
    3: { alias: 'entityId', type: Thrift.Type.I64 },
    4: { alias: 'privilegeValues', type: Thrift.Type.STRUCT, def: module.exports.PrivilegeValues }
  });

  module.exports.CreateOrGetInternalInvitationResponse = Thrift.Struct.define('CreateOrGetInternalInvitationResponse',  {
    1: { alias: 'invitation', type: Thrift.Type.STRUCT, def: module.exports.InternalInvitation },
    2: { alias: 'created', type: Thrift.Type.BOOL }
  });



/***/ }),

/***/ 46:
/***/ (function(module, exports, __webpack_require__) {

//
// Autogenerated by Thrift Compiler (0.7.0-en-11139b3b5cb61e817408c6e84b0e1c258bf6c6ae)
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//


  // Define types and services

  var Thrift = __webpack_require__(0).Thrift;
  var Types = __webpack_require__(3);
  var Errors = __webpack_require__(7);
  var AuthenticationTypes = __webpack_require__(41);


  module.exports.LoginStatus = {
    'UNKNOWN' : 0,
    'INVALID_FORMAT' : 1,
    'NOT_FOUND' : 2,
    'INVITE_PENDING' : 3,
    'PASSWORD_RESET' : 4,
    'PASSWORD' : 5,
    'SSO' : 6
  };

  module.exports.BusinessUserType = {
    'UNKNOWN' : 0,
    'PERSONAL_ONLY' : 1,
    'LEGACY' : 2,
    'BUSINESS_ONLY' : 3
  };

  module.exports.EDAM_VERSION_MAJOR = 1;

  module.exports.EDAM_VERSION_MINOR = 28;

  module.exports.PublicUserInfo = Thrift.Struct.define('PublicUserInfo',  {
    1: { alias: 'userId', type: Thrift.Type.I32 },
    2: { alias: 'shardId', type: Thrift.Type.STRING },
    3: { alias: 'privilege', type: Thrift.Type.I32 },
    7: { alias: 'serviceLevel', type: Thrift.Type.I32 },
    4: { alias: 'username', type: Thrift.Type.STRING },
    5: { alias: 'noteStoreUrl', type: Thrift.Type.STRING },
    6: { alias: 'webApiUrlPrefix', type: Thrift.Type.STRING }
  });

  module.exports.UserUrls = Thrift.Struct.define('UserUrls',  {
    1: { alias: 'noteStoreUrl', type: Thrift.Type.STRING },
    2: { alias: 'webApiUrlPrefix', type: Thrift.Type.STRING },
    3: { alias: 'userStoreUrl', type: Thrift.Type.STRING },
    4: { alias: 'utilityUrl', type: Thrift.Type.STRING },
    5: { alias: 'messageStoreUrl', type: Thrift.Type.STRING },
    6: { alias: 'userWebSocketUrl', type: Thrift.Type.STRING },
    7: { alias: 'communicationEngineUrl', type: Thrift.Type.STRING },
    8: { alias: 'workspaceDashboardUrl', type: Thrift.Type.STRING },
    9: { alias: 'workspaceDirectoryUrl', type: Thrift.Type.STRING }
  });

  module.exports.AuthenticationResult = Thrift.Struct.define('AuthenticationResult',  {
    1: { alias: 'currentTime', type: Thrift.Type.I64 },
    2: { alias: 'authenticationToken', type: Thrift.Type.STRING },
    3: { alias: 'expiration', type: Thrift.Type.I64 },
    4: { alias: 'user', type: Thrift.Type.STRUCT, def: Types.User },
    5: { alias: 'publicUserInfo', type: Thrift.Type.STRUCT, def: module.exports.PublicUserInfo },
    6: { alias: 'noteStoreUrl', type: Thrift.Type.STRING },
    7: { alias: 'webApiUrlPrefix', type: Thrift.Type.STRING },
    8: { alias: 'secondFactorRequired', type: Thrift.Type.BOOL },
    9: { alias: 'secondFactorDeliveryHint', type: Thrift.Type.STRING },
    10: { alias: 'urls', type: Thrift.Type.STRUCT, def: module.exports.UserUrls }
  });

  module.exports.BootstrapSettings = Thrift.Struct.define('BootstrapSettings',  {
    1: { alias: 'serviceHost', type: Thrift.Type.STRING },
    2: { alias: 'marketingUrl', type: Thrift.Type.STRING },
    3: { alias: 'supportUrl', type: Thrift.Type.STRING },
    4: { alias: 'accountEmailDomain', type: Thrift.Type.STRING },
    14: { alias: 'cardscanUrl', type: Thrift.Type.STRING },
    15: { alias: 'announcementsUrl', type: Thrift.Type.STRING },
    5: { alias: 'enableFacebookSharing', type: Thrift.Type.BOOL },
    6: { alias: 'enableGiftSubscriptions', type: Thrift.Type.BOOL },
    7: { alias: 'enableSupportTickets', type: Thrift.Type.BOOL },
    8: { alias: 'enableSharedNotebooks', type: Thrift.Type.BOOL },
    9: { alias: 'enableSingleNoteSharing', type: Thrift.Type.BOOL },
    10: { alias: 'enableSponsoredAccounts', type: Thrift.Type.BOOL },
    11: { alias: 'enableTwitterSharing', type: Thrift.Type.BOOL },
    12: { alias: 'enableLinkedInSharing', type: Thrift.Type.BOOL },
    13: { alias: 'enablePublicNotebooks', type: Thrift.Type.BOOL },
    16: { alias: 'enableGoogle', type: Thrift.Type.BOOL }
  });

  module.exports.BootstrapProfile = Thrift.Struct.define('BootstrapProfile',  {
    1: { alias: 'name', type: Thrift.Type.STRING },
    2: { alias: 'settings', type: Thrift.Type.STRUCT, def: module.exports.BootstrapSettings }
  });

  module.exports.BootstrapInfo = Thrift.Struct.define('BootstrapInfo',  {
    1: { alias: 'profiles', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, module.exports.BootstrapProfile)  }
  });

  module.exports.PushNotificationCredentials = Thrift.Struct.define('PushNotificationCredentials',  {
    1: { alias: 'iosDeviceToken', type: Thrift.Type.BINARY },
    2: { alias: 'gcmRegistrationId', type: Thrift.Type.STRING }
  });

  module.exports.RegisterForSyncPushNotificationsResult = Thrift.Struct.define('RegisterForSyncPushNotificationsResult',  {
    1: { alias: 'sharedSecret', type: Thrift.Type.BINARY }
  });

  module.exports.MultiRegisterForSyncPushNotificationsResult = Thrift.Struct.define('MultiRegisterForSyncPushNotificationsResult',  {
    1: { alias: 'userId', type: Thrift.Type.STRING },
    2: { alias: 'sharedSecret', type: Thrift.Type.BINARY }
  });

  module.exports.AuthenticationParameters = Thrift.Struct.define('AuthenticationParameters',  {
    1: { alias: 'usernameOrEmail', type: Thrift.Type.STRING },
    2: { alias: 'password', type: Thrift.Type.STRING },
    3: { alias: 'ssoLoginToken', type: Thrift.Type.STRING },
    4: { alias: 'consumerKey', type: Thrift.Type.STRING },
    5: { alias: 'consumerSecret', type: Thrift.Type.STRING },
    6: { alias: 'deviceIdentifier', type: Thrift.Type.STRING },
    7: { alias: 'deviceDescription', type: Thrift.Type.STRING },
    8: { alias: 'supportsTwoFactor', type: Thrift.Type.BOOL },
    9: { alias: 'supportsBusinessOnlyAccounts', type: Thrift.Type.BOOL },
    10: { alias: 'openIdCredential', type: Thrift.Type.STRUCT, def: AuthenticationTypes.OpenIdCredential }
  });

  module.exports.BusinessInviteInfo = Thrift.Struct.define('BusinessInviteInfo',  {
    1: { alias: 'businessId', type: Thrift.Type.I32 }
  });

  module.exports.GetLoginInfoRequest = Thrift.Struct.define('GetLoginInfoRequest',  {
    1: { alias: 'usernameOrEmail', type: Thrift.Type.STRING },
    2: { alias: 'openIdCredential', type: Thrift.Type.STRUCT, def: AuthenticationTypes.OpenIdCredential }
  });

  module.exports.LoginInfo = Thrift.Struct.define('LoginInfo',  {
    1: { alias: 'loginStatus', type: Thrift.Type.I32 },
    2: { alias: 'pendingInvites', type: Thrift.Type.SET, def: Thrift.Set.define(Thrift.Type.STRUCT, module.exports.BusinessInviteInfo) },
    3: { alias: 'businessUserType', type: Thrift.Type.I32 }
  });

  var UserStore = module.exports.UserStore = {};

  UserStore.checkVersion = Thrift.Method.define({
    alias: 'checkVersion',
    args: Thrift.Struct.define('checkVersionArgs', {
      1: { alias: 'clientName', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'edamVersionMajor', type: Thrift.Type.I16, index: 1 },
      3: { alias: 'edamVersionMinor', type: Thrift.Type.I16, index: 2 }
    }),
    result: Thrift.Struct.define('checkVersionResult', {
      0: { alias: 'returnValue',type: Thrift.Type.BOOL }
    })
  });

  UserStore.getBootstrapInfo = Thrift.Method.define({
    alias: 'getBootstrapInfo',
    args: Thrift.Struct.define('getBootstrapInfoArgs', {
      1: { alias: 'locale', type: Thrift.Type.STRING, index: 0 }
    }),
    result: Thrift.Struct.define('getBootstrapInfoResult', {
      0: { alias: 'returnValue',type: Thrift.Type.STRUCT, def: module.exports.BootstrapInfo }
    })
  });

  UserStore.authenticate = Thrift.Method.define({
    alias: 'authenticate',
    args: Thrift.Struct.define('authenticateArgs', {
      1: { alias: 'username', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'password', type: Thrift.Type.STRING, index: 1 },
      3: { alias: 'consumerKey', type: Thrift.Type.STRING, index: 2 },
      4: { alias: 'consumerSecret', type: Thrift.Type.STRING, index: 3 },
      5: { alias: 'supportsTwoFactor', type: Thrift.Type.BOOL, index: 4 }
    }),
    result: Thrift.Struct.define('authenticateResult', {
      0: { alias: 'returnValue',type: Thrift.Type.STRUCT, def: module.exports.AuthenticationResult },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
    })
  });

  UserStore.authenticateOpenID = Thrift.Method.define({
    alias: 'authenticateOpenID',
    args: Thrift.Struct.define('authenticateOpenIDArgs', {
      1: { alias: 'credential', type: Thrift.Type.STRUCT, def: AuthenticationTypes.OpenIdCredential, index: 0 },
      2: { alias: 'consumerKey', type: Thrift.Type.STRING, index: 1 },
      3: { alias: 'consumerSecret', type: Thrift.Type.STRING, index: 2 },
      4: { alias: 'deviceIdentifier', type: Thrift.Type.STRING, index: 3 },
      5: { alias: 'deviceDescription', type: Thrift.Type.STRING, index: 4 },
      6: { alias: 'authLongSession', type: Thrift.Type.BOOL, index: 5 },
      7: { alias: 'supportsTwoFactor', type: Thrift.Type.BOOL, index: 6 }
    }),
    result: Thrift.Struct.define('authenticateOpenIDResult', {
      0: { alias: 'returnValue',type: Thrift.Type.STRUCT, def: module.exports.AuthenticationResult },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
    })
  });

  UserStore.authenticateLongSession = Thrift.Method.define({
    alias: 'authenticateLongSession',
    args: Thrift.Struct.define('authenticateLongSessionArgs', {
      1: { alias: 'username', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'password', type: Thrift.Type.STRING, index: 1 },
      3: { alias: 'consumerKey', type: Thrift.Type.STRING, index: 2 },
      4: { alias: 'consumerSecret', type: Thrift.Type.STRING, index: 3 },
      5: { alias: 'deviceIdentifier', type: Thrift.Type.STRING, index: 4 },
      6: { alias: 'deviceDescription', type: Thrift.Type.STRING, index: 5 },
      7: { alias: 'supportsTwoFactor', type: Thrift.Type.BOOL, index: 6 }
    }),
    result: Thrift.Struct.define('authenticateLongSessionResult', {
      0: { alias: 'returnValue',type: Thrift.Type.STRUCT, def: module.exports.AuthenticationResult },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
    })
  });

  UserStore.authenticateLongSessionV2 = Thrift.Method.define({
    alias: 'authenticateLongSessionV2',
    args: Thrift.Struct.define('authenticateLongSessionV2Args', {
      1: { alias: 'authParams', type: Thrift.Type.STRUCT, def: module.exports.AuthenticationParameters, index: 0 }
    }),
    result: Thrift.Struct.define('authenticateLongSessionV2Result', {
      0: { alias: 'returnValue',type: Thrift.Type.STRUCT, def: module.exports.AuthenticationResult },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
    })
  });

  UserStore.completeTwoFactorAuthentication = Thrift.Method.define({
    alias: 'completeTwoFactorAuthentication',
    args: Thrift.Struct.define('completeTwoFactorAuthenticationArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'oneTimeCode', type: Thrift.Type.STRING, index: 1 },
      3: { alias: 'deviceIdentifier', type: Thrift.Type.STRING, index: 2 },
      4: { alias: 'deviceDescription', type: Thrift.Type.STRING, index: 3 }
    }),
    result: Thrift.Struct.define('completeTwoFactorAuthenticationResult', {
      0: { alias: 'returnValue',type: Thrift.Type.STRUCT, def: module.exports.AuthenticationResult },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
    })
  });

  UserStore.revokeLongSession = Thrift.Method.define({
    alias: 'revokeLongSession',
    args: Thrift.Struct.define('revokeLongSessionArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 }
    }),
    result: Thrift.Struct.define('revokeLongSessionResult', {
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
    })
  });

  UserStore.authenticateToBusiness = Thrift.Method.define({
    alias: 'authenticateToBusiness',
    args: Thrift.Struct.define('authenticateToBusinessArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 }
    }),
    result: Thrift.Struct.define('authenticateToBusinessResult', {
      0: { alias: 'returnValue',type: Thrift.Type.STRUCT, def: module.exports.AuthenticationResult },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
    })
  });

  UserStore.refreshAuthentication = Thrift.Method.define({
    alias: 'refreshAuthentication',
    args: Thrift.Struct.define('refreshAuthenticationArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 }
    }),
    result: Thrift.Struct.define('refreshAuthenticationResult', {
      0: { alias: 'returnValue',type: Thrift.Type.STRUCT, def: module.exports.AuthenticationResult },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
    })
  });

  UserStore.getUser = Thrift.Method.define({
    alias: 'getUser',
    args: Thrift.Struct.define('getUserArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 }
    }),
    result: Thrift.Struct.define('getUserResult', {
      0: { alias: 'returnValue',type: Thrift.Type.STRUCT, def: Types.User },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
    })
  });

  UserStore.getPublicUserInfo = Thrift.Method.define({
    alias: 'getPublicUserInfo',
    args: Thrift.Struct.define('getPublicUserInfoArgs', {
      1: { alias: 'username', type: Thrift.Type.STRING, index: 0 }
    }),
    result: Thrift.Struct.define('getPublicUserInfoResult', {
      0: { alias: 'returnValue',type: Thrift.Type.STRUCT, def: module.exports.PublicUserInfo },
      1: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      3: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException }
    })
  });

  UserStore.getPremiumInfo = Thrift.Method.define({
    alias: 'getPremiumInfo',
    args: Thrift.Struct.define('getPremiumInfoArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 }
    }),
    result: Thrift.Struct.define('getPremiumInfoResult', {
      0: { alias: 'returnValue',type: Thrift.Type.STRUCT, def: Types.PremiumInfo },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
    })
  });

  UserStore.getSubscriptionInfo = Thrift.Method.define({
    alias: 'getSubscriptionInfo',
    args: Thrift.Struct.define('getSubscriptionInfoArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 }
    }),
    result: Thrift.Struct.define('getSubscriptionInfoResult', {
      0: { alias: 'returnValue',type: Thrift.Type.STRUCT, def: Types.SubscriptionInfo },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
    })
  });

  UserStore.getNoteStoreUrl = Thrift.Method.define({
    alias: 'getNoteStoreUrl',
    args: Thrift.Struct.define('getNoteStoreUrlArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 }
    }),
    result: Thrift.Struct.define('getNoteStoreUrlResult', {
      0: { alias: 'returnValue',type: Thrift.Type.STRING },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
    })
  });

  UserStore.getUserUrls = Thrift.Method.define({
    alias: 'getUserUrls',
    args: Thrift.Struct.define('getUserUrlsArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 }
    }),
    result: Thrift.Struct.define('getUserUrlsResult', {
      0: { alias: 'returnValue',type: Thrift.Type.STRUCT, def: module.exports.UserUrls },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
    })
  });

  UserStore.inviteToBusiness = Thrift.Method.define({
    alias: 'inviteToBusiness',
    args: Thrift.Struct.define('inviteToBusinessArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'emailAddress', type: Thrift.Type.STRING, index: 1 }
    }),
    result: Thrift.Struct.define('inviteToBusinessResult', {
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
    })
  });

  UserStore.removeFromBusiness = Thrift.Method.define({
    alias: 'removeFromBusiness',
    args: Thrift.Struct.define('removeFromBusinessArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'emailAddress', type: Thrift.Type.STRING, index: 1 }
    }),
    result: Thrift.Struct.define('removeFromBusinessResult', {
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
    })
  });

  UserStore.updateBusinessUserIdentifier = Thrift.Method.define({
    alias: 'updateBusinessUserIdentifier',
    args: Thrift.Struct.define('updateBusinessUserIdentifierArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'oldEmailAddress', type: Thrift.Type.STRING, index: 1 },
      3: { alias: 'newEmailAddress', type: Thrift.Type.STRING, index: 2 }
    }),
    result: Thrift.Struct.define('updateBusinessUserIdentifierResult', {
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
    })
  });

  UserStore.listBusinessUsers = Thrift.Method.define({
    alias: 'listBusinessUsers',
    args: Thrift.Struct.define('listBusinessUsersArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'businessUserFilter', type: Thrift.Type.STRUCT, def: Types.BusinessUserFilter, index: 1 }
    }),
    result: Thrift.Struct.define('listBusinessUsersResult', {
      0: { alias: 'returnValue',type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, Types.UserProfile)  },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
    })
  });

  UserStore.listBusinessInvitations = Thrift.Method.define({
    alias: 'listBusinessInvitations',
    args: Thrift.Struct.define('listBusinessInvitationsArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'includeRequestedInvitations', type: Thrift.Type.BOOL, index: 1 }
    }),
    result: Thrift.Struct.define('listBusinessInvitationsResult', {
      0: { alias: 'returnValue',type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, Types.BusinessInvitation)  },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
    })
  });

  UserStore.registerForSyncPushNotifications = Thrift.Method.define({
    alias: 'registerForSyncPushNotifications',
    args: Thrift.Struct.define('registerForSyncPushNotificationsArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'credentials', type: Thrift.Type.STRUCT, def: module.exports.PushNotificationCredentials, index: 1 }
    }),
    result: Thrift.Struct.define('registerForSyncPushNotificationsResult', {
      0: { alias: 'returnValue',type: Thrift.Type.STRUCT, def: module.exports.RegisterForSyncPushNotificationsResult },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
    })
  });

  UserStore.multiRegisterForSyncPushNotifications = Thrift.Method.define({
    alias: 'multiRegisterForSyncPushNotifications',
    args: Thrift.Struct.define('multiRegisterForSyncPushNotificationsArgs', {
      1: { alias: 'authenticationTokens', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRING) , index: 0 },
      2: { alias: 'credentials', type: Thrift.Type.STRUCT, def: module.exports.PushNotificationCredentials, index: 1 }
    }),
    result: Thrift.Struct.define('multiRegisterForSyncPushNotificationsResult', {
      0: { alias: 'returnValue',type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, module.exports.MultiRegisterForSyncPushNotificationsResult)  },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
    })
  });

  UserStore.unregisterForSyncPushNotifications = Thrift.Method.define({
    alias: 'unregisterForSyncPushNotifications',
    args: Thrift.Struct.define('unregisterForSyncPushNotificationsArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 }
    }),
    result: Thrift.Struct.define('unregisterForSyncPushNotificationsResult', {
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
    })
  });

  UserStore.createSessionAuthenticationToken = Thrift.Method.define({
    alias: 'createSessionAuthenticationToken',
    args: Thrift.Struct.define('createSessionAuthenticationTokenArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 }
    }),
    result: Thrift.Struct.define('createSessionAuthenticationTokenResult', {
      0: { alias: 'returnValue',type: Thrift.Type.STRING },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
    })
  });

  UserStore.getAccountLimits = Thrift.Method.define({
    alias: 'getAccountLimits',
    args: Thrift.Struct.define('getAccountLimitsArgs', {
      1: { alias: 'serviceLevel', type: Thrift.Type.I32, index: 0 }
    }),
    result: Thrift.Struct.define('getAccountLimitsResult', {
      0: { alias: 'returnValue',type: Thrift.Type.STRUCT, def: Types.AccountLimits },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException }
    })
  });

  UserStore.getConnectedIdentities = Thrift.Method.define({
    alias: 'getConnectedIdentities',
    args: Thrift.Struct.define('getConnectedIdentitiesArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'identityIds', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.I64) , index: 1 }
    }),
    result: Thrift.Struct.define('getConnectedIdentitiesResult', {
      0: { alias: 'returnValue',type: Thrift.Type.MAP, def: Thrift.Map.define(Thrift.Type.I64, Thrift.Type.STRUCT, Types.Identity)  },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
    })
  });

  UserStore.getLoginInfo = Thrift.Method.define({
    alias: 'getLoginInfo',
    args: Thrift.Struct.define('getLoginInfoArgs', {
      1: { alias: 'getLoginInfoRequest', type: Thrift.Type.STRUCT, def: module.exports.GetLoginInfoRequest, index: 0 }
    }),
    result: Thrift.Struct.define('getLoginInfoResult', {
      0: { alias: 'returnValue',type: Thrift.Type.STRUCT, def: module.exports.LoginInfo },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
    })
  });

  // Define UserStore Client

  function UserStoreClient(output) {
    this.output = output;
    this.seqid = 0;
  }

  UserStoreClient.prototype.checkVersion = function(clientName, edamVersionMajor, edamVersionMinor, callback) {
    var mdef = UserStore.checkVersion;
    var args = new mdef.args();
    args.clientName = clientName;
    args.edamVersionMajor = edamVersionMajor;
    args.edamVersionMinor = edamVersionMinor;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  UserStoreClient.prototype.getBootstrapInfo = function(locale, callback) {
    var mdef = UserStore.getBootstrapInfo;
    var args = new mdef.args();
    args.locale = locale;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  UserStoreClient.prototype.authenticate = function(username, password, consumerKey, consumerSecret, supportsTwoFactor, callback) {
    var mdef = UserStore.authenticate;
    var args = new mdef.args();
    args.username = username;
    args.password = password;
    args.consumerKey = consumerKey;
    args.consumerSecret = consumerSecret;
    args.supportsTwoFactor = supportsTwoFactor;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  UserStoreClient.prototype.authenticateOpenID = function(credential, consumerKey, consumerSecret, deviceIdentifier, deviceDescription, authLongSession, supportsTwoFactor, callback) {
    var mdef = UserStore.authenticateOpenID;
    var args = new mdef.args();
    args.credential = credential;
    args.consumerKey = consumerKey;
    args.consumerSecret = consumerSecret;
    args.deviceIdentifier = deviceIdentifier;
    args.deviceDescription = deviceDescription;
    args.authLongSession = authLongSession;
    args.supportsTwoFactor = supportsTwoFactor;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  UserStoreClient.prototype.authenticateLongSession = function(username, password, consumerKey, consumerSecret, deviceIdentifier, deviceDescription, supportsTwoFactor, callback) {
    var mdef = UserStore.authenticateLongSession;
    var args = new mdef.args();
    args.username = username;
    args.password = password;
    args.consumerKey = consumerKey;
    args.consumerSecret = consumerSecret;
    args.deviceIdentifier = deviceIdentifier;
    args.deviceDescription = deviceDescription;
    args.supportsTwoFactor = supportsTwoFactor;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  UserStoreClient.prototype.authenticateLongSessionV2 = function(authParams, callback) {
    var mdef = UserStore.authenticateLongSessionV2;
    var args = new mdef.args();
    args.authParams = authParams;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  UserStoreClient.prototype.completeTwoFactorAuthentication = function(authenticationToken, oneTimeCode, deviceIdentifier, deviceDescription, callback) {
    var mdef = UserStore.completeTwoFactorAuthentication;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.oneTimeCode = oneTimeCode;
    args.deviceIdentifier = deviceIdentifier;
    args.deviceDescription = deviceDescription;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  UserStoreClient.prototype.revokeLongSession = function(authenticationToken, callback) {
    var mdef = UserStore.revokeLongSession;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  UserStoreClient.prototype.authenticateToBusiness = function(authenticationToken, callback) {
    var mdef = UserStore.authenticateToBusiness;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  UserStoreClient.prototype.refreshAuthentication = function(authenticationToken, callback) {
    var mdef = UserStore.refreshAuthentication;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  UserStoreClient.prototype.getUser = function(authenticationToken, callback) {
    var mdef = UserStore.getUser;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  UserStoreClient.prototype.getPublicUserInfo = function(username, callback) {
    var mdef = UserStore.getPublicUserInfo;
    var args = new mdef.args();
    args.username = username;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  UserStoreClient.prototype.getPremiumInfo = function(authenticationToken, callback) {
    var mdef = UserStore.getPremiumInfo;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  UserStoreClient.prototype.getSubscriptionInfo = function(authenticationToken, callback) {
    var mdef = UserStore.getSubscriptionInfo;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  UserStoreClient.prototype.getNoteStoreUrl = function(authenticationToken, callback) {
    var mdef = UserStore.getNoteStoreUrl;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  UserStoreClient.prototype.getUserUrls = function(authenticationToken, callback) {
    var mdef = UserStore.getUserUrls;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  UserStoreClient.prototype.inviteToBusiness = function(authenticationToken, emailAddress, callback) {
    var mdef = UserStore.inviteToBusiness;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.emailAddress = emailAddress;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  UserStoreClient.prototype.removeFromBusiness = function(authenticationToken, emailAddress, callback) {
    var mdef = UserStore.removeFromBusiness;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.emailAddress = emailAddress;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  UserStoreClient.prototype.updateBusinessUserIdentifier = function(authenticationToken, oldEmailAddress, newEmailAddress, callback) {
    var mdef = UserStore.updateBusinessUserIdentifier;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.oldEmailAddress = oldEmailAddress;
    args.newEmailAddress = newEmailAddress;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  UserStoreClient.prototype.listBusinessUsers = function(authenticationToken, businessUserFilter, callback) {
    var mdef = UserStore.listBusinessUsers;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.businessUserFilter = businessUserFilter;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  UserStoreClient.prototype.listBusinessInvitations = function(authenticationToken, includeRequestedInvitations, callback) {
    var mdef = UserStore.listBusinessInvitations;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.includeRequestedInvitations = includeRequestedInvitations;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  UserStoreClient.prototype.registerForSyncPushNotifications = function(authenticationToken, credentials, callback) {
    var mdef = UserStore.registerForSyncPushNotifications;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.credentials = credentials;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  UserStoreClient.prototype.multiRegisterForSyncPushNotifications = function(authenticationTokens, credentials, callback) {
    var mdef = UserStore.multiRegisterForSyncPushNotifications;
    var args = new mdef.args();
    args.authenticationTokens = authenticationTokens;
    args.credentials = credentials;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  UserStoreClient.prototype.unregisterForSyncPushNotifications = function(authenticationToken, callback) {
    var mdef = UserStore.unregisterForSyncPushNotifications;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  UserStoreClient.prototype.createSessionAuthenticationToken = function(authenticationToken, callback) {
    var mdef = UserStore.createSessionAuthenticationToken;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  UserStoreClient.prototype.getAccountLimits = function(serviceLevel, callback) {
    var mdef = UserStore.getAccountLimits;
    var args = new mdef.args();
    args.serviceLevel = serviceLevel;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  UserStoreClient.prototype.getConnectedIdentities = function(authenticationToken, identityIds, callback) {
    var mdef = UserStore.getConnectedIdentities;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.identityIds = identityIds;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  UserStoreClient.prototype.getLoginInfo = function(getLoginInfoRequest, callback) {
    var mdef = UserStore.getLoginInfo;
    var args = new mdef.args();
    args.getLoginInfoRequest = getLoginInfoRequest;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  module.exports.UserStore.Client = UserStoreClient;

  // Define UserStore Server

  function UserStoreServer(service, stransport, Protocol) {
    var methodName;
      this.service = service;
      this.stransport = stransport;
      this.processor = new Thrift.Processor();
      for (methodName in UserStore) {
        if (service[methodName]) {
          this.processor.addMethod(UserStore[methodName], service[methodName].bind(service));
        }
      }
      this.stransport.process = function (input, output, noop) {
      var inprot = new Protocol(input);
      var outprot = new Protocol(output);
      this.processor.process(inprot, outprot, noop);
    }.bind(this);
  }

  UserStoreServer.prototype.start = function () {
    this.stransport.listen();
  };
  UserStoreServer.prototype.stop = function () {
    this.stransport.close();
  };

  module.exports.UserStore.Server = UserStoreServer;



/***/ }),

/***/ 47:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function placeHoldersCount (b64) {
  var len = b64.length
  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // the number of equal signs (place holders)
  // if there are two placeholders, than the two characters before it
  // represent one byte
  // if there is only one, then the three characters before it represent 2 bytes
  // this is just a cheap hack to not do indexOf twice
  return b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0
}

function byteLength (b64) {
  // base64 is 4/3 + up to two characters of the original data
  return b64.length * 3 / 4 - placeHoldersCount(b64)
}

function toByteArray (b64) {
  var i, j, l, tmp, placeHolders, arr
  var len = b64.length
  placeHolders = placeHoldersCount(b64)

  arr = new Arr(len * 3 / 4 - placeHolders)

  // if there are placeholders, only get up to the last complete 4 chars
  l = placeHolders > 0 ? len - 4 : len

  var L = 0

  for (i = 0, j = 0; i < l; i += 4, j += 3) {
    tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)]
    arr[L++] = (tmp >> 16) & 0xFF
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  if (placeHolders === 2) {
    tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[L++] = tmp & 0xFF
  } else if (placeHolders === 1) {
    tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var output = ''
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    output += lookup[tmp >> 2]
    output += lookup[(tmp << 4) & 0x3F]
    output += '=='
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + (uint8[len - 1])
    output += lookup[tmp >> 10]
    output += lookup[(tmp >> 4) & 0x3F]
    output += lookup[(tmp << 2) & 0x3F]
    output += '='
  }

  parts.push(output)

  return parts.join('')
}


/***/ }),

/***/ 48:
/***/ (function(module, exports) {

module.exports = {
  "100": "Continue",
  "101": "Switching Protocols",
  "102": "Processing",
  "200": "OK",
  "201": "Created",
  "202": "Accepted",
  "203": "Non-Authoritative Information",
  "204": "No Content",
  "205": "Reset Content",
  "206": "Partial Content",
  "207": "Multi-Status",
  "208": "Already Reported",
  "226": "IM Used",
  "300": "Multiple Choices",
  "301": "Moved Permanently",
  "302": "Found",
  "303": "See Other",
  "304": "Not Modified",
  "305": "Use Proxy",
  "307": "Temporary Redirect",
  "308": "Permanent Redirect",
  "400": "Bad Request",
  "401": "Unauthorized",
  "402": "Payment Required",
  "403": "Forbidden",
  "404": "Not Found",
  "405": "Method Not Allowed",
  "406": "Not Acceptable",
  "407": "Proxy Authentication Required",
  "408": "Request Timeout",
  "409": "Conflict",
  "410": "Gone",
  "411": "Length Required",
  "412": "Precondition Failed",
  "413": "Payload Too Large",
  "414": "URI Too Long",
  "415": "Unsupported Media Type",
  "416": "Range Not Satisfiable",
  "417": "Expectation Failed",
  "418": "I'm a teapot",
  "421": "Misdirected Request",
  "422": "Unprocessable Entity",
  "423": "Locked",
  "424": "Failed Dependency",
  "425": "Unordered Collection",
  "426": "Upgrade Required",
  "428": "Precondition Required",
  "429": "Too Many Requests",
  "431": "Request Header Fields Too Large",
  "451": "Unavailable For Legal Reasons",
  "500": "Internal Server Error",
  "501": "Not Implemented",
  "502": "Bad Gateway",
  "503": "Service Unavailable",
  "504": "Gateway Timeout",
  "505": "HTTP Version Not Supported",
  "506": "Variant Also Negotiates",
  "507": "Insufficient Storage",
  "508": "Loop Detected",
  "509": "Bandwidth Limit Exceeded",
  "510": "Not Extended",
  "511": "Network Authentication Required"
}


/***/ }),

/***/ 49:
/***/ (function(module, exports, __webpack_require__) {

var Thrift = __webpack_require__(10);
var BinaryParser = __webpack_require__(31);
var Type = Thrift.Type;

// NastyHaxx. JavaScript forces hex constants to be
// positive, converting this into a long. If we hardcode the int value
// instead it'll stay in 32 bit-land.

var VERSION_MASK = -65536; // 0xffff0000
var VERSION_1 = -2147418112; // 0x80010000
var TYPE_MASK = 0x000000ff;

function BinaryProtocol(trans, strictRead, strictWrite) {
  'use strict';
  this.transport = this.trans = trans;
  this.strictRead = (strictRead !== undefined ? strictRead : false);
  this.strictWrite = (strictWrite !== undefined ? strictWrite : true);
}

BinaryProtocol.prototype.flush = function(callback) {
  'use strict';
  var wrapTransport;

  if (callback) {
    wrapTransport = function(err, transport) {
      var protocol;
      if (transport) {
        protocol = new BinaryProtocol(transport);
      }
      return callback(err, protocol);
    };
  }

  return this.trans.flush(wrapTransport);
};

BinaryProtocol.prototype.writeMessageBegin = function(name, type, seqid) {
  'use strict';
  if (this.strictWrite) {
    this.writeI32(VERSION_1 | type);
    this.writeString(name);
    this.writeI32(seqid);
  } else {
    this.writeString(name);
    this.writeByte(type);
    this.writeI32(seqid);
  }
};

BinaryProtocol.prototype.writeMessageEnd = function() {
  'use strict';
};

BinaryProtocol.prototype.writeStructBegin = function(name) {
  'use strict';
};

BinaryProtocol.prototype.writeStructEnd = function() {
  'use strict';
};

BinaryProtocol.prototype.writeFieldBegin = function(name, type, id) {
  'use strict';
  this.writeByte(type);
  this.writeI16(id);
};

BinaryProtocol.prototype.writeFieldEnd = function() {
  'use strict';
};

BinaryProtocol.prototype.writeFieldStop = function() {
  'use strict';
  this.writeByte(Type.STOP);
};

BinaryProtocol.prototype.writeMapBegin = function(ktype, vtype, size) {
  'use strict';
  this.writeByte(ktype);
  this.writeByte(vtype);
  this.writeI32(size);
};

BinaryProtocol.prototype.writeMapEnd = function() {
  'use strict';
};

BinaryProtocol.prototype.writeListBegin = function(etype, size) {
  'use strict';
  this.writeByte(etype);
  this.writeI32(size);
};

BinaryProtocol.prototype.writeListEnd = function() {
  'use strict';
};

BinaryProtocol.prototype.writeSetBegin = function(etype, size) {
  'use strict';
  this.writeByte(etype);
  this.writeI32(size);
};

BinaryProtocol.prototype.writeSetEnd = function() {
  'use strict';
};

BinaryProtocol.prototype.writeBool = function(bool) {
  'use strict';
  if (bool) {
    this.writeByte(1);
  } else {
    this.writeByte(0);
  }
};

BinaryProtocol.prototype.writeByte = function(b) {
  'use strict';
  this.trans.write(BinaryParser.fromByte(b));
};

BinaryProtocol.prototype.writeBinary = function(bytes) {
  'use strict';
  if (typeof bytes === 'string') {
    bytes = BinaryParser.fromString(bytes);
  }
  if (bytes.byteLength != null) {
    this.writeI32(bytes.byteLength);
  } else {
    throw Error('Cannot read length of binary data');
  }
  this.trans.write(bytes);
};

BinaryProtocol.prototype.writeI16 = function(i16) {
  'use strict';
  this.trans.write(BinaryParser.fromShort(i16));
};

BinaryProtocol.prototype.writeI32 = function(i32) {
  'use strict';
  this.trans.write(BinaryParser.fromInt(i32));
};

BinaryProtocol.prototype.writeI64 = function(i64) {
  'use strict';
  this.trans.write(BinaryParser.fromLong(i64));
};

BinaryProtocol.prototype.writeDouble = function(dub) {
  'use strict';
  this.trans.write(BinaryParser.fromDouble(dub));
};

BinaryProtocol.prototype.writeString = function(str) {
  'use strict';
  var bytes = BinaryParser.fromString(str);
  this.writeI32(bytes.byteLength);
  this.trans.write(bytes);
};

BinaryProtocol.prototype.writeType = function(type, value) {
  'use strict';
  switch (type) {
    case Type.BOOL:
      return this.writeBool(value);
    case Type.BYTE:
      return this.writeByte(value);
    case Type.I16:
      return this.writeI16(value);
    case Type.I32:
      return this.writeI32(value);
    case Type.I64:
      return this.writeI64(value);
    case Type.DOUBLE:
      return this.writeDouble(value);
    case Type.STRING:
      return this.writeString(value);
    case Type.BINARY:
      return this.writeBinary(value);
    // case Type.STRUCT:
    // case Type.MAP:
    // case Type.SET:
    // case Type.LIST:
    default:
      throw Error('Invalid type: ' + type);
  }
};

BinaryProtocol.prototype.readMessageBegin = function() {
  'use strict';
  var size = this.readI32();
  var signature = {
    mtype: null,
    fname: null,
    seqid: null
  };

  if (size < 0) {
    // size written at server: -2147418110 == 0x80010002
    var version = size & VERSION_MASK;
    if (version != VERSION_1) {
      console.log('BAD: ' + version);
      throw Error('Bad version in readMessageBegin: ' + size);
    }
    signature.mtype = size & TYPE_MASK;
    signature.fname = this.readString();
    signature.seqid = this.readI32();
  } else {
    if (this.strictRead) {
      throw Error('No protocol version header');
    }

    signature.fname = this.trans.read(size);
    signature.mtype = this.readByte();
    signature.seqid = this.readI32();
  }

  return signature;
};

BinaryProtocol.prototype.readMessageEnd = function() {
  // Do nothing
  'use strict';
};

BinaryProtocol.prototype.readStructBegin = function() {
  'use strict';
  return {fname: ''}; // Where is this return value used? Can it be removed?
};

BinaryProtocol.prototype.readStructEnd = function() {
  // Do nothing
  'use strict';
};

BinaryProtocol.prototype.readFieldBegin = function() {
  'use strict';
  var type = this.readByte();
  var field = {
    fname: null,
    ftype: type,
    fid: 0
  };

  if (type != Type.STOP) {
    field.fid = this.readI16();
  }

  return field;
};

BinaryProtocol.prototype.readFieldEnd = function() {
  // Do nothing
  'use strict';
};

BinaryProtocol.prototype.readMapBegin = function() {
  // Add variables required by thrift generated js code but not needed for BinaryHttpTransport
  'use strict';
  var result = {
    ktype: null,
    vtype: null,
    size: null
  };

  result.ktype = this.readByte();
  result.vtype = this.readByte();
  result.size = this.readI32();

  return result;
};

BinaryProtocol.prototype.readMapEnd = function() {
  // Do nothing
  'use strict';
};

BinaryProtocol.prototype.readListBegin = function() {
  'use strict';
  var result = {
    etype: null,
    size: null
  };
  result.etype = this.readByte();
  result.size = this.readI32();
  return result;
};

BinaryProtocol.prototype.readListEnd = function() {
  // Do nothing
  'use strict';
};

BinaryProtocol.prototype.readSetBegin = function() {
  'use strict';
  var result = {
    etype: null,
    size: null
  };
  result.etype = this.readByte();
  result.size = this.readI32();
  return result;
};

BinaryProtocol.prototype.readSetEnd = function() {
  // Do nothing
  'use strict';
};

BinaryProtocol.prototype.readBool = function() {
  'use strict';
  var b = this.readByte();
  return (b == 1);
};

// ThriftJS expects values to be wrapped in an object with a prop named "value"
BinaryProtocol.prototype.readByte = function() {
  'use strict';
  var dataview = this.trans.read(1);
  var result = BinaryParser.toByte(dataview);
  return result;
};

BinaryProtocol.prototype.readI16 = function() {
  'use strict';
  var dataview = this.trans.read(2);
  var result = BinaryParser.toShort(dataview);
  return result;
};

BinaryProtocol.prototype.readI32 = function() {
  'use strict';
  var dataview = this.trans.read(4);
  var result = BinaryParser.toInt(dataview);
  return result;
};

BinaryProtocol.prototype.readI64 = function() {
  'use strict';
  var dataview = this.trans.read(8);
  var result = BinaryParser.toLong(dataview);
  return result;
};

BinaryProtocol.prototype.readDouble = function() {
  'use strict';
  var dataview = this.trans.read(8);
  var result = BinaryParser.toDouble(dataview);
  return result;
};

BinaryProtocol.prototype.readBinary = function() {
  'use strict';
  var len = this.readI32();
  var dataview = this.trans.read(len);
  var result = BinaryParser.toBytes(dataview);
  return result;
};

BinaryProtocol.prototype.readString = function() {
  'use strict';
  var len = this.readI32();
  var dataview = this.trans.read(len);
  var result = BinaryParser.toString(dataview);
  return result;
};

BinaryProtocol.prototype.readType = function(type) {
  'use strict';
  switch (type) {
    case Type.BOOL:
      return this.readBool();
    case Type.BYTE:
      return this.readByte();
    case Type.I16:
      return this.readI16();
    case Type.I32:
      return this.readI32();
    case Type.I64:
      return this.readI64();
    case Type.DOUBLE:
      return this.readDouble();
    case Type.STRING:
      return this.readString();
    case Type.BINARY:
      return this.readBinary();
    // case Type.STRUCT:
    // case Type.MAP:
    // case Type.SET:
    // case Type.LIST:
    default:
      throw new Error('Invalid type: ' + type);
  }
};

BinaryProtocol.prototype.getTransport = function() {
  'use strict';
  return this.trans;
};

BinaryProtocol.prototype.skipStruct = function() {
  'use strict';
  this.readStructBegin();
  this.skipFields();
  this.readStructEnd();
};

BinaryProtocol.prototype.skipFields = function() {
  'use strict';
  var r = this.readFieldBegin();
  if (r.ftype === Type.STOP) {
    return;
  }

  this.skip(r.ftype);
  this.readFieldEnd();
  this.skipFields();
};

BinaryProtocol.prototype.skipMap = function() {
  'use strict';
  var i = 0;
  var map = this.readMapBegin();
  for (i = 0; i < map.size; i++) {
    this.skip(map.ktype);
    this.skip(map.vtype);
  }
  this.readMapEnd();
};

BinaryProtocol.prototype.skipSet = function() {
  'use strict';
  var i = 0;
  var set = this.readSetBegin();
  for (i = 0; i < set.size; i++) {
    this.skip(set.etype);
  }
  this.readSetEnd();
};

BinaryProtocol.prototype.skipList = function() {
  'use strict';
  var i = 0;
  var list = this.readListBegin();
  for (i = 0; i < list.size; i++) {
    this.skip(list.etype);
  }
  this.readListEnd();
};

BinaryProtocol.prototype.skip = function(type) {
  'use strict';
  // console.log("skip: " + type);
  switch (type) {
    case Type.STOP:
      return;
    case Type.BOOL:
      return this.readBool();
    case Type.BYTE:
      return this.readByte();
    case Type.I16:
      return this.readI16();
    case Type.I32:
      return this.readI32();
    case Type.I64:
      return this.readI64();
    case Type.DOUBLE:
      return this.readDouble();
    case Type.STRING:
      return this.readString();
    case Type.STRUCT:
      return this.skipStruct();
    case Type.MAP:
      return this.skipMap();
    case Type.SET:
      return this.skipSet();
    case Type.LIST:
      return this.skipList();
    case Type.BINARY:
      return this.readBinary();
    default:
      throw Error('Invalid type: ' + type);
  }
};

module.exports = BinaryProtocol;


/***/ }),

/***/ 5:
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ 50:
/***/ (function(module, exports, __webpack_require__) {

/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements. See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership. The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License. You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

/* global jQuery:true */

var Thrift = __webpack_require__(10);
var Type = Thrift.Type;

var Protocol = function(transport) {
  'use strict';
  this.transport = transport;
};

Protocol.Type = {};
Protocol.Type[Type.BOOL] = '"tf"';
Protocol.Type[Type.BYTE] = '"i8"';
Protocol.Type[Type.I16] = '"i16"';
Protocol.Type[Type.I32] = '"i32"';
Protocol.Type[Type.I64] = '"i64"';
Protocol.Type[Type.DOUBLE] = '"dbl"';
Protocol.Type[Type.STRUCT] = '"rec"';
Protocol.Type[Type.STRING] = '"str"';
Protocol.Type[Type.MAP] = '"map"';
Protocol.Type[Type.LIST] = '"lst"';
Protocol.Type[Type.SET] = '"set"';

Protocol.RType = {};
Protocol.RType.tf = Type.BOOL;
Protocol.RType.i8 = Type.BYTE;
Protocol.RType.i16 = Type.I16;
Protocol.RType.i32 = Type.I32;
Protocol.RType.i64 = Type.I64;
Protocol.RType.dbl = Type.DOUBLE;
Protocol.RType.rec = Type.STRUCT;
Protocol.RType.str = Type.STRING;
Protocol.RType.map = Type.MAP;
Protocol.RType.lst = Type.LIST;
Protocol.RType.set = Type.SET;

Protocol.Version = 1;

Protocol.prototype = {
  getTransport: function() {
    'use strict';
    return this.transport;
  },

  // Write functions
  writeType: function(type, value) {
    'use strict';
    switch (type) {
      case Type.BOOL:
        return this.writeBool(value);
      case Type.BYTE:
        return this.writeByte(value);
      case Type.I16:
        return this.writeI16(value);
      case Type.I32:
        return this.writeI32(value);
      case Type.I64:
        return this.writeI64(value);
      case Type.DOUBLE:
        return this.writeDouble(value);
      case Type.STRING:
        return this.writeString(value);
      case Type.BINARY:
        return this.writeBinary(value);
       // case Type.STRUCT:
       // case Type.MAP:
       // case Type.SET:
       // case Type.LIST:
      default:
        throw Error('Invalid type: ' + type);
    }
  },

  writeMessageBegin: function(name, messageType, seqid) {
    'use strict';
    this.tstack = [];
    this.tpos = [];

    this.tstack.push([Protocol.Version, '"'
        + name + '"', messageType, seqid]);
  },

  writeMessageEnd: function() {
    'use strict';
    var obj = this.tstack.pop();

    this.wobj = this.tstack.pop();
    this.wobj.push(obj);

    this.wbuf = '[' + this.wobj.join(',') + ']';

    this.transport.write(this.wbuf);
  },


  writeStructBegin: function(name) {
    'use strict';
    this.tpos.push(this.tstack.length);
    this.tstack.push({});
  },

  writeStructEnd: function() {
    'use strict';
    var p = this.tpos.pop();
    var struct = this.tstack[p];
    var str = '{';
    var first = true;
    for (var key in struct) {
      if (first) {
        first = false;
      } else {
        str += ',';
      }

      str += key + ':' + struct[key];
    }

    str += '}';
    this.tstack[p] = str;
  },

  writeFieldBegin: function(name, fieldType, fieldId) {
    'use strict';
    this.tpos.push(this.tstack.length);
    this.tstack.push({'fieldId': '"'
        + fieldId + '"', 'fieldType': Protocol.Type[fieldType]
    });
  },

  writeFieldEnd: function() {
    'use strict';
    var value = this.tstack.pop();
    var fieldInfo = this.tstack.pop();

    this.tstack[this.tstack.length - 1][fieldInfo.fieldId] = '{'
        + fieldInfo.fieldType + ':' + value + '}';
    this.tpos.pop();
  },

  writeFieldStop: function() {
    // na
    'use strict';
  },

  writeMapBegin: function(keyType, valType, size) {
    // size is invalid, we'll set it on end.
    'use strict';
    this.tpos.push(this.tstack.length);
    this.tstack.push([Protocol.Type[keyType],
          Protocol.Type[valType], 0]);
  },

  writeMapEnd: function() {
    'use strict';
    var p = this.tpos.pop();

    if (p == this.tstack.length) {
      return;
    }

    if ((this.tstack.length - p - 1) % 2 !== 0) {
      this.tstack.push('');
    }

    var size = (this.tstack.length - p - 1) / 2;

    this.tstack[p][this.tstack[p].length - 1] = size;

    var map = '}';
    var first = true;
    while (this.tstack.length > p + 1) {
      var v = this.tstack.pop();
      var k = this.tstack.pop();
      if (first) {
        first = false;
      } else {
        map = ',' + map;
      }

      if (!isNaN(k)) {
        k = '"' + k + '"'; // json "keys" need to be strings
      }
      map = k + ':' + v + map;
    }
    map = '{' + map;

    this.tstack[p].push(map);
    this.tstack[p] = '[' + this.tstack[p].join(',') + ']';
  },

  writeListBegin: function(elemType, size) {
    'use strict';
    this.tpos.push(this.tstack.length);
    this.tstack.push([Protocol.Type[elemType], size]);
  },

  writeListEnd: function() {
    'use strict';
    var p = this.tpos.pop();

    while (this.tstack.length > p + 1) {
      var tmpVal = this.tstack[p + 1];
      this.tstack.splice(p + 1, 1);
      this.tstack[p].push(tmpVal);
    }

    this.tstack[p] = '[' + this.tstack[p].join(',') + ']';
  },

  writeSetBegin: function(elemType, size) {
    'use strict';
    this.tpos.push(this.tstack.length);
    this.tstack.push([Protocol.Type[elemType], size]);
  },

  writeSetEnd: function() {
    'use strict';
    var p = this.tpos.pop();

    while (this.tstack.length > p + 1) {
      var tmpVal = this.tstack[p + 1];
      this.tstack.splice(p + 1, 1);
      this.tstack[p].push(tmpVal);
    }

    this.tstack[p] = '[' + this.tstack[p].join(',') + ']';
  },

  writeBool: function(value) {
    'use strict';
    this.tstack.push(value ? 1 : 0);
  },

  writeByte: function(i8) {
    'use strict';
    this.tstack.push(i8);
  },

  writeI16: function(i16) {
    'use strict';
    this.tstack.push(i16);
  },

  writeI32: function(i32) {
    'use strict';
    this.tstack.push(i32);
  },

  writeI64: function(i64) {
    'use strict';
    this.tstack.push(i64);
  },

  writeDouble: function(dbl) {
    'use strict';
    this.tstack.push(dbl);
  },

  writeString: function(str) {
    // We do not encode uri components for wire transfer:
    'use strict';
    if (str === null) {
      this.tstack.push(null);
    } else {
      // concat may be slower than building a byte buffer
      var escapedString = '';
      for (var i = 0; i < str.length; i++) {
        var ch = str.charAt(i);      // a single double quote: "
        if (ch === '\"') {
          escapedString += '\\\"'; // write out as: \"
        } else if (ch === '\\') {    // a single backslash: \
          escapedString += '\\\\'; // write out as: \\
            /* Currently escaped forward slashes break TJSONProtocol.
             * As it stands, we can simply pass forward slashes into
             * our strings across the wire without being escaped.
             * I think this is the protocol's bug, not thrift.js
             * } else if(ch === '/') {   // a single forward slash: /
             *  escapedString += '\\/';  // write out as \/
             * }
             */
        } else if (ch === '\b') {    // a single backspace: invisible
          escapedString += '\\b';  // write out as: \b"
        } else if (ch === '\f') {    // a single formfeed: invisible
          escapedString += '\\f';  // write out as: \f"
        } else if (ch === '\n') {    // a single newline: invisible
          escapedString += '\\n';  // write out as: \n"
        } else if (ch === '\r') {    // a single return: invisible
          escapedString += '\\r';  // write out as: \r"
        } else if (ch === '\t') {    // a single tab: invisible
          escapedString += '\\t';  // write out as: \t"
        } else {
          escapedString += ch;     // Else it need not be escaped
        }
      }
      this.tstack.push('"' + escapedString + '"');
    }
  },

  writeBinary: function(str) {
    'use strict';
    this.writeString(str);
  },


  // Reading functions
  readType: function(type) {
    'use strict';
    var valueWrapper;
    switch (type) {
      case Type.BOOL:
        valueWrapper = this.readBool();
        break;
      case Type.BYTE:
        valueWrapper = this.readByte();
        break;
      case Type.I16:
        valueWrapper = this.readI16();
        break;
      case Type.I32:
        valueWrapper = this.readI32();
        break;
      case Type.I64:
        valueWrapper = this.readI64();
        break;
      case Type.DOUBLE:
        valueWrapper = this.readDouble();
        break;
      case Type.STRING:
        valueWrapper = this.readString();
        break;
      case Type.BINARY:
        valueWrapper = this.readBinary();
        break;
       // case Type.STRUCT:
       // case Type.MAP:
       // case Type.SET:
       // case Type.LIST:
      default:
        throw new Error('Invalid type: ' + type);
    }
    if (typeof valueWrapper === 'object') {
      return valueWrapper.value;
    }
  },

  readMessageBegin: function(name, messageType, seqid) {
    'use strict';
    this.rstack = [];
    this.rpos = [];

    this.robj = this.transport.readAll();
    if (typeof this.robj === 'string') {
      if (typeof jQuery !== 'undefined') {
        this.robj = jQuery.parseJSON(this.robj);
      } else if (JSON) {
        this.robj = JSON.parse(this.robj);
      } else {
        throw new Error('Could not find a JSON-parsing library');
      }
    }

    var r = {};
    var version = this.robj.shift();

    if (version != Protocol.Version) {
      throw Error('Wrong thrift protocol version: ' + version);
    }

    r.fname = this.robj.shift();
    r.mtype = this.robj.shift();
    r.rseqid = this.robj.shift();


    // get to the main obj
    this.rstack.push(this.robj.shift());

    return r;
  },

  readMessageEnd: function() {
    'use strict';
  },

  readStructBegin: function(name) {
    'use strict';
    var r = {};
    r.fname = '';

    // incase this is an array of structs
    if (this.rstack[this.rstack.length - 1] instanceof Array) {
      this.rstack.push(this.rstack[this.rstack.length - 1].shift());
    }

    return r;
  },

  readStructEnd: function() {
    'use strict';
    if (this.rstack[this.rstack.length - 2] instanceof Array) {
      this.rstack.pop();
    }
  },

  readFieldBegin: function() {
    'use strict';
    var r = {};

    var fid = -1;
    var ftype = Type.STOP;

    // get a fieldId
    for (var f in (this.rstack[this.rstack.length - 1])) {
      if (f === null) {
        continue;
      }

      fid = parseInt(f, 10);
      this.rpos.push(this.rstack.length);

      var field = this.rstack[this.rstack.length - 1][fid];

      // remove so we don't see it again
      delete this.rstack[this.rstack.length - 1][fid];

      this.rstack.push(field);

      break;
    }

    if (fid != -1) {

      // should only be 1 of these but this is the only
      // way to match a key
      for (var i in (this.rstack[this.rstack.length - 1])) {
        if (Protocol.RType[i] === null) {
          continue;
        }

        ftype = Protocol.RType[i];
        this.rstack[this.rstack.length - 1] =
            this.rstack[this.rstack.length - 1][i];
      }
    }

    r.fname = '';
    r.ftype = ftype;
    r.fid = fid;

    return r;
  },

  readFieldEnd: function() {
    'use strict';
    var pos = this.rpos.pop();

    // get back to the right place in the stack
    while (this.rstack.length > pos) {
      this.rstack.pop();
    }

  },

  readMapBegin: function(keyType, valType, size) {
    'use strict';
    var map = this.rstack.pop();

    var r = {};
    r.ktype = Protocol.RType[map.shift()];
    r.vtype = Protocol.RType[map.shift()];
    r.size = map.shift();


    this.rpos.push(this.rstack.length);
    this.rstack.push(map.shift());

    return r;
  },

  readMapEnd: function() {
    'use strict';
    this.readFieldEnd();
  },

  readListBegin: function(elemType, size) {
    'use strict';
    var list = this.rstack[this.rstack.length - 1];

    var r = {};
    r.etype = Protocol.RType[list.shift()];
    r.size = list.shift();

    this.rpos.push(this.rstack.length);
    this.rstack.push(list);

    return r;
  },

  readListEnd: function() {
    'use strict';
    this.readFieldEnd();
  },

  readSetBegin: function(elemType, size) {
    'use strict';
    return this.readListBegin(elemType, size);
  },

  readSetEnd: function() {
    'use strict';
    return this.readListEnd();
  },

  readBool: function() {
    'use strict';
    var r = this.readI32();

    if (r !== null && r.value == '1') {
      r.value = true;
    } else {
      r.value = false;
    }

    return r;
  },

  readByte: function() {
    'use strict';
    return this.readI32();
  },

  readI16: function() {
    'use strict';
    return this.readI32();
  },

  readI32: function(f) {
    'use strict';
    if (f === undefined) {
      f = this.rstack[this.rstack.length - 1];
    }

    var r = {};

    if (f instanceof Array) {
      if (f.length === 0) {
        r.value = undefined;
      } else {
        r.value = f.shift();
      }
    } else if (f instanceof Object) {
      for (var i in f) {
        if (i === null) {
          continue;
        }
        this.rstack.push(f[i]);
        delete f[i];

        r.value = i;
        break;
      }
    } else {
      r.value = f;
      this.rstack.pop();
    }

    return r;
  },

  readI64: function() {
    'use strict';
    return this.readI32();
  },

  readDouble: function() {
    'use strict';
    return this.readI32();
  },

  readString: function() {
    'use strict';
    var r = this.readI32();
    return r;
  },

  readBinary: function() {
    'use strict';
    return this.readString();
  },


  // Method to arbitrarily skip over data.
  skip: function(type) {
    'use strict';
    throw Error('skip not supported yet');
  },

  flush: function(callback) {
    'use strict';
    var wrapTransport;

    if (callback) {
      wrapTransport = function(err, trans) {
        var protocol;
        if (trans) {
          protocol = new Protocol(trans);
        }
        return callback(err, protocol);
      };
    }

    return this.transport.flush(wrapTransport);
  }
};

module.exports = Protocol;


/***/ }),

/***/ 51:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {var Thrift = __webpack_require__(10);
var Type = Thrift.Type;

var BinaryParser = {};

// NastyHaxx. JavaScript forces hex constants to be
// positive, converting this into a long. If we hardcode the int value
// instead it'll stay in 32 bit-land.

var VERSION_MASK = -65536; // 0xffff0000
var VERSION_1 = -2147418112; // 0x80010000
var TYPE_MASK = 0x000000ff;

function BinaryProtocol(trans, strictRead, strictWrite) {
  'use strict';
  this.transport = this.trans = trans;
  this.strictRead = (strictRead !== undefined ? strictRead : false);
  this.strictWrite = (strictWrite !== undefined ? strictWrite : true);
}

BinaryProtocol.prototype.flush = function(callback) {
  'use strict';
  var wrapTransport;
  if (callback) {
    wrapTransport = function(err, transport) {
      var protocol;
      if (transport) {
        protocol = new BinaryProtocol(transport);
      }
      return callback(err, protocol);
    };
  }

  return this.trans.flush(wrapTransport);
};

BinaryProtocol.prototype.writeMessageBegin = function(name, type, seqid) {
  'use strict';
  if (this.strictWrite) {
    this.writeI32(VERSION_1 | type);
    this.writeString(name);
    this.writeI32(seqid);
  } else {
    this.writeString(name);
    this.writeByte(type);
    this.writeI32(seqid);
  }
};

BinaryProtocol.prototype.writeMessageEnd = function() {
  'use strict';
};

BinaryProtocol.prototype.writeStructBegin = function(name) {
  'use strict';
};

BinaryProtocol.prototype.writeStructEnd = function() {
  'use strict';
};

BinaryProtocol.prototype.writeFieldBegin = function(name, type, id) {
  'use strict';
  this.writeByte(type);
  this.writeI16(id);
};

BinaryProtocol.prototype.writeFieldEnd = function() {
  'use strict';
};

BinaryProtocol.prototype.writeFieldStop = function() {
  'use strict';
  this.writeByte(Type.STOP);
};

BinaryProtocol.prototype.writeMapBegin = function(ktype, vtype, size) {
  'use strict';
  this.writeByte(ktype);
  this.writeByte(vtype);
  this.writeI32(size);
};

BinaryProtocol.prototype.writeMapEnd = function() {
  'use strict';
};

BinaryProtocol.prototype.writeListBegin = function(etype, size) {
  'use strict';
  this.writeByte(etype);
  this.writeI32(size);
};

BinaryProtocol.prototype.writeListEnd = function() {
  'use strict';
};

BinaryProtocol.prototype.writeSetBegin = function(etype, size) {
  'use strict';
  this.writeByte(etype);
  this.writeI32(size);
};

BinaryProtocol.prototype.writeSetEnd = function() {
  'use strict';
};

BinaryProtocol.prototype.writeBool = function(bool) {
  'use strict';
  if (bool) {
    this.writeByte(1);
  } else {
    this.writeByte(0);
  }
};

BinaryProtocol.prototype.writeByte = function(b) {
  'use strict';
  this.trans.write(BinaryParser.fromByte(b));
};

BinaryProtocol.prototype.writeBinary = function(bytes) {
  'use strict';
  if (typeof bytes === 'string') {
    bytes = BinaryParser.fromString(bytes);
  }
  if (bytes.length != null) {
    this.writeI32(bytes.length);
  } else {
    throw Error('Cannot read length of binary data');
  }
  this.trans.write(bytes);
};

BinaryProtocol.prototype.writeI16 = function(i16) {
  'use strict';
  this.trans.write(BinaryParser.fromShort(i16));
};

BinaryProtocol.prototype.writeI32 = function(i32) {
  'use strict';
  this.trans.write(BinaryParser.fromInt(i32));
};

BinaryProtocol.prototype.writeI64 = function(i64) {
  'use strict';
  var buffer = BinaryParser.fromLong(i64);
  this.trans.write(buffer);
};

BinaryProtocol.prototype.writeDouble = function(dub) {
  'use strict';
  this.trans.write(BinaryParser.fromDouble(dub));
};

BinaryProtocol.prototype.writeString = function(str) {
  'use strict';
  var bytes = BinaryParser.fromString(str);
  this.writeI32(bytes.length);
  this.trans.write(bytes);
};

BinaryProtocol.prototype.writeType = function(type, value) {
  'use strict';
  switch (type) {
    case Type.BOOL:
      return this.writeBool(value);
    case Type.BYTE:
      return this.writeByte(value);
    case Type.I16:
      return this.writeI16(value);
    case Type.I32:
      return this.writeI32(value);
    case Type.I64:
      return this.writeI64(value);
    case Type.DOUBLE:
      return this.writeDouble(value);
    case Type.STRING:
      return this.writeString(value);
    case Type.BINARY:
      return this.writeBinary(value);
    // case Type.STRUCT:
    // case Type.MAP:
    // case Type.SET:
    // case Type.LIST:
    default:
      throw Error('Invalid type: ' + type);
  }
};

BinaryProtocol.prototype.readMessageBegin = function() {
  'use strict';
  var size = this.readI32();
  var signature = {
    mtype: null,
    fname: null,
    seqid: null
  };

  if (size < 0) {
    // size written at server: -2147418110 == 0x80010002
    var version = size & VERSION_MASK;
    if (version != VERSION_1) {
      console.log('BAD: ' + version);
      throw Error('Bad version in readMessageBegin: ' + size);
    }
    signature.mtype = size & TYPE_MASK;
    signature.fname = this.readString();
    signature.seqid = this.readI32();
  } else {
    if (this.strictRead) {
      throw Error('No protocol version header');
    }

    signature.fname = this.trans.read(size);
    signature.mtype = this.readByte();
    signature.seqid = this.readI32();
  }

  return signature;
};

BinaryProtocol.prototype.readMessageEnd = function() {
  'use strict';
  // Do nothing
};

BinaryProtocol.prototype.readStructBegin = function() {
  'use strict';
  return {fname: ''}; // Where is this return value used? Can it be removed?
};

BinaryProtocol.prototype.readStructEnd = function() {
  'use strict';
  // Do nothing
};

BinaryProtocol.prototype.readFieldBegin = function() {
  'use strict';
  var type = this.readByte();
  var field = {
    fname: null,
    ftype: type,
    fid: 0
  };

  if (type != Type.STOP) {
    field.fid = this.readI16();
  }

  return field;
};

BinaryProtocol.prototype.readFieldEnd = function() {
  'use strict';
  // Do nothing
};

BinaryProtocol.prototype.readMapBegin = function() {
  'use strict';
  // Add variables required by thrift generated js code but not needed for BinaryHttpTransport
  var result = {
    ktype: null,
    vtype: null,
    size: null
  };

  result.ktype = this.readByte();
  result.vtype = this.readByte();
  result.size = this.readI32();

  return result;
};

BinaryProtocol.prototype.readMapEnd = function() {
  'use strict';
  // Do nothing
};

BinaryProtocol.prototype.readListBegin = function() {
  'use strict';
  var result = {
    etype: null,
    size: null
  };
  result.etype = this.readByte();
  result.size = this.readI32();
  return result;
};

BinaryProtocol.prototype.readListEnd = function() {
  'use strict';
  // Do nothing
};

BinaryProtocol.prototype.readSetBegin = function() {
  'use strict';
  var result = {
    etype: null,
    size: null
  };
  result.etype = this.readByte();
  result.size = this.readI32();
  return result;
};

BinaryProtocol.prototype.readSetEnd = function() {
  'use strict';
  // Do nothing
};

BinaryProtocol.prototype.readBool = function() {
  'use strict';
  var b = this.readByte();
  return (b == 1);
};

// ThriftJS expects values to be wrapped in an object with a prop named "value"
BinaryProtocol.prototype.readByte = function() {
  'use strict';
  var buffer = this.trans.read(1);
  var result = buffer.readUInt8(0);
  return result;
};

BinaryProtocol.prototype.readI16 = function() {
  'use strict';
  var buffer = this.trans.read(2);
  var result = buffer.readInt16BE(0);
  return result;
};

BinaryProtocol.prototype.readI32 = function() {
  'use strict';
  var buffer = this.trans.read(4);
  var result = buffer.readInt32BE(0);
  return result;
};

BinaryProtocol.prototype.readI64 = function() {
  'use strict';
  var buffer = this.trans.read(8);
  var result = BinaryParser.toLong(buffer);
  return result;
};

BinaryProtocol.prototype.readDouble = function() {
  'use strict';
  var buffer = this.trans.read(8);
  var result = buffer.readDoubleBE(0);
  return result;
};

BinaryProtocol.prototype.readBinary = function() {
  'use strict';
  var len = this.readI32();
  var buffer = this.trans.read(len);
  return buffer;
};

BinaryProtocol.prototype.readString = function() {
  'use strict';
  var len = this.readI32();
  var buffer = this.trans.read(len);
  var result = buffer.toString();
  return result;
};

BinaryProtocol.prototype.readType = function(type) {
  'use strict';
  switch (type) {
    case Type.BOOL:
      return this.readBool();
    case Type.BYTE:
      return this.readByte();
    case Type.I16:
      return this.readI16();
    case Type.I32:
      return this.readI32();
    case Type.I64:
      return this.readI64();
    case Type.DOUBLE:
      return this.readDouble();
    case Type.STRING:
      return this.readString();
    case Type.BINARY:
      return this.readBinary();
    // case Type.STRUCT:
    // case Type.MAP:
    // case Type.SET:
    // case Type.LIST:
    default:
      throw new Error('Invalid type: ' + type);
  }
};

BinaryProtocol.prototype.getTransport = function() {
  'use strict';
  return this.trans;
};

BinaryProtocol.prototype.skipStruct = function() {
  'use strict';
  this.readStructBegin();
  this.skipFields();
  this.readStructEnd();
};

BinaryProtocol.prototype.skipFields = function() {
  'use strict';
  var r = this.readFieldBegin();
  if (r.ftype === Type.STOP) {
    return;
  }

  this.skip(r.ftype);
  this.readFieldEnd();
  this.skipFields();
};

BinaryProtocol.prototype.skipMap = function() {
  'use strict';
  var i = 0;
  var map = this.readMapBegin();
  for (i = 0; i < map.size; i++) {
    this.skip(map.ktype);
    this.skip(map.vtype);
  }
  this.readMapEnd();
};

BinaryProtocol.prototype.skipSet = function() {
  'use strict';
  var i = 0;
  var set = this.readSetBegin();
  for (i = 0; i < set.size; i++) {
    this.skip(set.etype);
  }
  this.readSetEnd();
};

BinaryProtocol.prototype.skipList = function() {
  'use strict';
  var i = 0;
  var list = this.readListBegin();
  for (i = 0; i < list.size; i++) {
    this.skip(list.etype);
  }
  this.readListEnd();
};

BinaryProtocol.prototype.skip = function(type) {
  'use strict';
  // console.log("skip: " + type);
  switch (type) {
    case Type.STOP:
      return;
    case Type.BOOL:
      return this.readBool();
    case Type.BYTE:
      return this.readByte();
    case Type.I16:
      return this.readI16();
    case Type.I32:
      return this.readI32();
    case Type.I64:
      return this.readI64();
    case Type.DOUBLE:
      return this.readDouble();
    case Type.STRING:
      return this.readString();
    case Type.STRUCT:
      return this.skipStruct();
    case Type.MAP:
      return this.skipMap();
    case Type.SET:
      return this.skipSet();
    case Type.LIST:
      return this.skipList();
    case Type.BINARY:
      return this.readBinary();
    default:
      throw Error('Invalid type: ' + type);
  }
};

BinaryParser.fromByte = function(b) {
  'use strict';
  var buffer = new Buffer(1);
  buffer.writeInt8(b, 0);
  return buffer;
};

BinaryParser.fromShort = function(i16) {
  'use strict';
  i16 = parseInt(i16);
  var buffer = new Buffer(2);
  buffer.writeInt16BE(i16, 0);
  return buffer;
};

BinaryParser.fromInt = function(i32) {
  'use strict';
  i32 = parseInt(i32);
  var buffer = new Buffer(4);
  buffer.writeInt32BE(i32, 0);
  return buffer;
};

BinaryParser.fromLong = function(n) {
  'use strict';
  n = parseInt(n);
  if (Math.abs(n) >= Math.pow(2, 53)) {
    throw new Error('Unable to accurately transfer numbers larger than 2^53 - 1 as integers. '
        + 'Number provided was ' + n);
  }

  var bits = (Array(64).join('0') + Math.abs(n).toString(2)).slice(-64);
  if (n < 0) {
    bits = this.twosCompliment(bits);
  }

  var buffer = new Buffer(8);
  for (var i = 0; i < 8; i++) {
    var uint8 = parseInt(bits.substr(8 * i, 8), 2);
    buffer.writeUInt8(uint8, i);
  }
  return buffer;
};

BinaryParser.twosCompliment = function(bits) {
  'use strict';
  // Convert to two's compliment using string manipulation because bitwise operator is limited to 32 bit numbers
  var smallestOne = bits.lastIndexOf('1');
  var left = bits.substring(0, smallestOne).
      replace(/1/g, 'x').
      replace(/0/g, '1').
      replace(/x/g, '0');
  bits = left + bits.substring(smallestOne);
  return bits;
};

BinaryParser.fromDouble = function(d) {
  'use strict';
  var buffer = new Buffer(8);
  buffer.writeDoubleBE(d, 0);
  return buffer;
};

BinaryParser.fromString = function(s) {
  'use strict';
  var len = Buffer.byteLength(s);
  var buffer = new Buffer(len);
  buffer.write(s);
  return buffer;
};

BinaryParser.toLong = function(buffer) {
  'use strict';
  // Javascript does not support 64-bit integers. Only decode values up to 2^53 - 1.
  var sign = 1;
  var bits = '';
  for (var i = 0; i < 8; i++) {
    bits += (Array(8).join('0') + buffer.readUInt8(i).toString(2)).slice(-8);
  }

  if (bits[0] === '1') {
    sign = -1;
    bits = this.twosCompliment(bits);
  }
  var largestOne = bits.indexOf('1');
  if (largestOne !== -1 && largestOne < 64 - 54) {
    throw new Error('Unable to receive number larger than 2^53 - 1 as an integer');
  }

  return parseInt(bits, 2) * sign;
};

module.exports = BinaryProtocol;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1).Buffer))

/***/ }),

/***/ 515:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jquery = __webpack_require__(85);

var _jquery2 = _interopRequireDefault(_jquery);

var _exponentialCounter = __webpack_require__(278);

var _exponentialCounter2 = _interopRequireDefault(_exponentialCounter);

var _localStorage = __webpack_require__(134);

var _localStorage2 = _interopRequireDefault(_localStorage);

var _evernoteThrift = __webpack_require__(0);

var _interwindowMessageQueue = __webpack_require__(281);

var _interwindowMessageQueue2 = _interopRequireDefault(_interwindowMessageQueue);

var _binaryUtils = __webpack_require__(205);

var _binaryUtils2 = _interopRequireDefault(_binaryUtils);

var _enThriftInternal = __webpack_require__(81);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* eslint-env browser */
/* eslint eqeqeq: 0 */
/**
 * Implementation of WebSocket-based realtime notification API
 *
 * @author bkepner
 */
// Aliases for Thrift types that we use
var RealTimeAuthentication = _enThriftInternal.Utility.RealTimeAuthentication;
var RealTimeNotification = _enThriftInternal.Utility.RealTimeNotification;
var RealTimePing = _enThriftInternal.Utility.RealTimePing;
var RealTimeRequest = _enThriftInternal.Utility.RealTimeRequest;

// interwindow message queue topics
var ATTEMPT_CONNECT_TOPIC = 'RTMS_AttemptConnect';
var REAL_TIME_EVENT_TOPIC = 'RTMS_MessageEvents';
var SOCKET_HOLDER_HEARTBEAT_TOPIC = 'RTMS_SocketHeartbeat';
var SOCKET_LOCK_KEY = 'RTMS_SocketLock';

var SOCKET_HOLDER_HEARTBEAT_INTERVAL_MILLIS = 1000;
var SOCKET_HOLDER_HEARTBEAT_TIMEOUT_MILLIS = 3000;

var WINDOW_ID = '' + Math.random() + new Date().getTime();

// The time in milliseconds to wait to recieve a pong (or any
// other message) after sending a ping before we will assume that
// the websocket is not actually open and will attempt to reconnect.
var PONG_TIMEOUT_MILLIS = 15 * 1000;

// The reason code passed to close when a pong timeout occurs
var PONG_TIMEOUT_CLOSE_REASON = 'pong_timeout';

// The reason code passed to close when the service closes our
// connection because another websocket was subsequently opened for
// the same auth token
var SESSION_REPLACED_REASON = 'AuthenticationToken.sessionReplaced';

// Setup a thrift transport/protocol stack for serialization and
// deserialization of realtime messages
var transport = new _evernoteThrift.ArrayBufferSerializerTransport();
var protocol = new _evernoteThrift.BinaryProtocol(transport, true, true);

var RealTimeMessageService = function () {
  /**
   * Create a new RealTimeMessageService.
   *
   * config should include:
   *
   * @param config.hostName
   *          the host name that requests should be sent to
   * @param config.shardId
   *          The shard id of the user
   * @param config.secure
   *          Whether to use the secure protocol to connect the web socket.
   *          Defaults to true
   * @param config.realTimeAuthHandler
   *          A callback to be called when a RealTimeAuthenticationResult is
   *          received. The first argument passed to the function will be
   *          the RealTimeAuthenticationResult struct
   * @param config.messageNotificationHandler
   *          A callback to be called when a MessageNotification is
   *          received. The first argument passed to the function will be
   *          the MessageNotification struct
   * @param config.rawNotificationHandler
   *          A callback to be called when any RealtimeNotification is
   *          received. The first argument passed to the function will be an
   *          ArrayBuffer of the notification bytes
   * @param config.closeHandler
   *          A callback to be called when the underlying socket connection
   *          is closed
   */
  function RealTimeMessageService(config) {
    _classCallCheck(this, RealTimeMessageService);

    var self = this;
    self._config = config;
    // set the url of the realtime notification endpoint
    self._url = config.websocketUrl;

    if (typeof config.realTimeAuthHandler === 'function') {
      self._onRealTimeAuth = config.realTimeAuthHandler;
    }
    if (typeof config.messageNotificationHandler === 'function') {
      self._onMessageNotification = config.messageNotificationHandler;
    }
    if (typeof config.rawNotificationHandler === 'function') {
      self._onNotification = config.rawNotificationHandler;
    }

    // Set up / reset the counter that tracks how long to wait before
    // attempting to reconnect the transport after a recoverable failure
    self._reconnectCounter = new _exponentialCounter2.default(1000, 1000, 100000);

    _interwindowMessageQueue2.default.subscribe(REAL_TIME_EVENT_TOPIC, function (stringEncodedMessageBytes) {
      // Convert the string to a Uint8Array and get the underlying array buffer
      var bytes = _binaryUtils2.default.base64StringToUint8Arr(stringEncodedMessageBytes).buffer;
      self._onMessage({ data: bytes });
    });

    _interwindowMessageQueue2.default.subscribe(SOCKET_HOLDER_HEARTBEAT_TOPIC, function () {
      // Whenever we receive a heartbeat message we delay attempting to
      // acquire the lock ourselves since the lock holder is still
      // active

      self._resetAttemptAcquireLockTimer();
    });

    _interwindowMessageQueue2.default.subscribe(ATTEMPT_CONNECT_TOPIC, function () {
      // if we currently hold the socket, force an immediate connect attempt
      // we check explicitly here to see if we hold the socket lock to
      // prevent reentry and an infinite publishing loop on the
      // ATTEMPT_CONNECT_TOPIC
      if (self._holdsSocketLock) {
        self._connect();
      }
    });

    if (!_interwindowMessageQueue2.default.peek(SOCKET_HOLDER_HEARTBEAT_TOPIC)) {
      // No one else has claimed the socket lock yet, so initiate an attempt immediately
      self._attemptToAcquireLock();
    } else {
      // setup the attempt acquire lock timer
      self._resetAttemptAcquireLockTimer();
    }

    // close the RTMS if the user navigates away from this window
    (0, _jquery2.default)(window).on('unload', function () {
      self.close();
    });

    // setup sleep recovery check
    setInterval(function () {
      if (self.isConnected() && !self._isWaitingForPong() && self._pingFrequencyMillis != null && self._lastMessageReceivedTimestamp != null && new Date().getTime() - self._lastMessageReceivedTimestamp > self._pingFrequencyMillis + PONG_TIMEOUT_MILLIS) {
        // If the computer goes to sleep, most browsers will reset any
        // pending timers to run 'period' milliseconds from when the
        // computer wakes up, which means that any pending pings will be
        // significantly delayed. In many browsers there is a bug where the
        // socket will appear open when the computer wakes up even
        // though it is actually closed. To compensate for this, if it
        // looks like we are connected but haven't received any kind of
        // message within the maximum window for a ping and pong
        // response we will trigger an immediate ping and see if we get
        // a pong back within the pong timeout or not. We should never
        // end up in this circumstance if we are not waking up from
        // sleep or something equivalent because the ping task should
        // have been pinging and receiving pongs significanly more often
        // than this situation would indicate.
        self._sendPing();
      }
    }, 7000);

    // setup and open the transport
    self._connect();
  }

  /*
   * Setup and open a connection on a new WebSocket
   */


  _createClass(RealTimeMessageService, [{
    key: '_connect',
    value: function _connect() {
      var self = this;

      /*
       * The WebSocket where we'll receive our realtime notifications
       */
      self._socket = null;

      if (!self._holdsSocketLock) {
        // If we don't hold the socket lock, tell the socket holder to
        // attempt to connect if they are note currently connected,
        // but do not attempt to connect ourselves.
        _interwindowMessageQueue2.default.publish(ATTEMPT_CONNECT_TOPIC, '');
        return;
      }

      if (self.isConnected()) {
        // Don't attempt to connect if we are already connected or in the
        // process of connecting.
        return;
      }

      self._logMessage('Attempting to connect', true);

      // This construction should always 'succeed' (insofar as it won't
      // throw an exception or stop execution) so long as we don't construct
      // it in a fundamentally invalid way (nonsense TCP port, nonsense or
      // invalid URL, etc.).
      self._socket = new WebSocket(self._url);
      // send and receive binary data as ArrayBuffers
      self._socket.binaryType = 'arraybuffer';
      // setup callback for when socket is ready we define this inline so we
      // don't have to keep a reference to the auth token.
      self._socket.onopen = function () {
        self._logMessage('RTMS open', true);
        // Reset the counter that tracks how long to wait before
        // attempting to reconnect
        self._reconnectCounter.reset();

        // authenticate ourselves
        var authRequest = new RealTimeRequest({
          realTimeAuthentication: new RealTimeAuthentication()
        });
        var realtimeAuthBytes = self._serializeThriftStruct(RealTimeRequest, authRequest);
        // send our authentication request
        self._socket.send(realtimeAuthBytes);
      };
      // Setup demultiplexing message handler
      self._socket.onmessage = function (message) {
        // If we receive a message we know that we have the active WebSocket
        // (only one window in a given browser will have it). Since that is
        // the case, we publish the message to any other windows that may be
        // listening but not have an active socket
        var stringEncodedMessageData = _binaryUtils2.default.uint8ArrToBase64Str(new Uint8Array(message.data));
        _interwindowMessageQueue2.default.publish(REAL_TIME_EVENT_TOPIC, stringEncodedMessageData);

        self._onMessage(message);
      };
      // set up close handler
      // If anything actually goes wrong with this socket, the handler will
      // be called.
      self._socket.onclose = function (closeEvent) {
        self._logMessage('RTMS closing. ', true, closeEvent);
        self._onClose(closeEvent);

        if (typeof self._config.closeHandler === 'function') {
          try {
            self._config.closeHandler(closeEvent);
          } catch (e) {
            self._logMessage(e, true);
          }
        }
      };
    }

    /**
     * Log a message
     *
     * @message the message to log
     * @logState whether to include the current socket state in the
     *           message
     * @infoObj an optional additional javascript object that will
     *          be logged for inspection
     */

  }, {
    key: '_logMessage',
    value: function _logMessage(message, logState, infoObj) {
      var self = this;
      var logMessage = new Date().toString() + ': ' + message;
      if (logState) {
        var readyState = self._socket ? self._socket.readyState : -1;
        logMessage += ' ::: readyState=' + readyState;
      }
      if (window.console && typeof window.console.log === 'function') {
        window.console.log(logMessage);
        if (infoObj) {
          window.console.log(infoObj);
        }
      }
    }

    /*
     * Handle socket closing
     */

  }, {
    key: '_onClose',
    value: function _onClose(closeEvent) {
      var self = this;
      self._logMessage('Socket closing', false, closeEvent);

      function reconnectAfterDelay() {
        var delay = self._reconnectCounter.value;
        self._reconnectCounter.increment();
        setTimeout(function () {
          self._connect();
        }, delay);
      }

      /*
       * The connection was closed because another tab opened a
       * websocket connection. This happens sometimes in browsers
       * where there is no storage lock (e.g. Chrome); we handle it by
       * 'releasing' the socket lock (which we never actually had),
       * essentially allowing the server to act as a backup
       * synchronization source.
       */
      function releaseSocketLock() {
        self._holdsSocketLock = false;
      }

      /*
       * Not a recoverable condition, so log failure code / reason then stop.
       * Note that for cases other than closing because of a subsequent
       * auth (see reconnectAfterDelay()) we will not release the socket lock.
       * This is to prevent other tabs from attempting to start a connection and
       * retry in a situation where we should not continue to attempt to
       * reconnect.
       */
      function unrecoverableClose() {
        self.close();
        self._error = closeEvent;
        self._logMessage('Unrecoverable close condition, not retrying');
        // call any attached close handler and stop the keep-alive handler
        clearInterval(self._nextPing);
        if (typeof self._config.closeHandler === 'function') {
          self._config.closeHandler(closeEvent);
        }
      }

      /*
       * Examine the close reason so we can decide if it's worth trying to
       * restart the connection. See
       * https://developer.mozilla.org/en-US/docs/Web/API/CloseEvent for a
       * full description of close codes
       */
      switch (closeEvent.code) {
        case 4900:
          /* 4900 is our code for pong timeout, which is recoverable.
           * Attempt to recover; space out retries according to the
           * exponential backoff counter. */
          reconnectAfterDelay();
          break;
        case 1000:
          /*
           * 1000 is a 'normal' close, but the only reason the remote will
           * ever return this code is if another socket is opened for this
           * auth token. The service limits the number of websockets open to
           * 1-per-auth-token. If we attempt to re-open the connection here,
           * then 2 browser windows with an RTMS-supporting page open will
           * continually close each others' web socket. To avoid thrashing we
           * do not attempt to reconnect here, and assume that the last page
           * that was opened is the one that should get to have the websocket
           * connection.
           *
           * However, we use a special app-specific close code to indicate an
           * app-layer ping timeout. Chrome and Firefox (and maybe others)
           * will pass 1000 as the code to the socket onclose handler
           * regardless of what code we close the socket with, so we check the
           * reason in our onclose handler, and maybe treat 1000 as a
           * recoverable close.
           */
          if (closeEvent.reason == PONG_TIMEOUT_CLOSE_REASON) {
            reconnectAfterDelay();
          } else if (closeEvent.reason == SESSION_REPLACED_REASON) {
            releaseSocketLock();
            unrecoverableClose();
          } else {
            // For safety - this case should not be triggered.
            unrecoverableClose();
          }
          break;
        case 1005:
          /*
           * 1005 should be 'close no status', but IE 11 returns it in place of any
           * close code we try to pass [1]. We need to be careful not to attempt a
           * reconnect, lest we let two IE 11 browsers spam the service while fighting
           * over a socket lock.
           *
           * [1] https://connect.microsoft.com/IE/Feedback/Details/1462265
           */
          if (closeEvent.reason == SESSION_REPLACED_REASON) {
            releaseSocketLock();
            unrecoverableClose();
          } else {
            unrecoverableClose();
          }
          break;
        case 1001:
        case 1002:
        case 1003:
        case 1006:
        case 1007:
        case 1008:
        case 1009:
        case 1010:
        case 1011:
        case 1015:
        default:
          unrecoverableClose();
          break;
      }
    }

    /*
     * Called with the raw ArrayBuffer of any notification received
     */

  }, {
    key: '_onNotification',
    value: function _onNotification(unusedNotificationBytes) {}

    /*
     * Placeholder for the realtime auth message handler
     */

  }, {
    key: '_onRealTimeAuth',
    value: function _onRealTimeAuth(authResult) {
      var self = this;
      self._logMessage('RealtimeAuthResult', true, authResult);
    }

    /*
     * Placeholder for the messaging notification message handler
     */

  }, {
    key: '_onMessageNotification',
    value: function _onMessageNotification(unusedMessageNotification) {}

    /*
     * Called whenever we recieve a websocket message. Attempt to figure out
     * what type of object we've received and call the appropriate
     * registered handler.
     */

  }, {
    key: '_onMessage',
    value: function _onMessage(message) {
      var self = this;
      var notification = void 0,
          data = message.data;

      // try to deserialize data into a RealTimeAuthenticationResult
      try {
        notification = self._deserializeThriftStruct(RealTimeNotification, data);
      } catch (e) {
        // doesn't seem to be a RealTimeNotification
        console.log('Unable to deserialize received bytes as a RealTimeNotification');
        throw e;
      }

      // update the last time we received a message on the socket
      self._lastMessageReceivedTimestamp = new Date().getTime();

      // invoke all handlers in their own try/catch so they don't
      // interfere with each other or the RTMS if they fail
      // Handle the different kinds of messages we can recieve
      if (notification.realTimePing) {
        // this is a ping response, reschedule the pong expected timer and
        // don't notify the app
        self._pongReceived();
        return;
      } else if (notification.authenticationResult) {
        try {
          self._pingFrequencyMillis = notification.authenticationResult.pingFrequency * 1000;
          self._onRealTimeAuth(notification.authenticationResult);
        } catch (e) {
          self._logMessage('Error in _onRealTimeAuth.', true, e);
        }
      } else if (notification.messageNotification) {
        try {
          self._onMessageNotification(notification.messageNotification);
        } catch (e) {
          self._logMessage('Error in _onMessageNotification.', true, e);
        }
      } else {
        // Unknown message type. Log and ignore.
        self._logMessage('Unknown message type, unable to deserialize. You may need to' + ' update RealTimeMessageService to support new message types.', true);
      }

      // fire the raw notification handler
      try {
        self._onNotification(data);
      } catch (e) {
        self._logMessage('Error in _onNotification: ' + e, true);
      }

      // we received a message, reset the keep-alive timers
      self._schedulePing();
      self._pongReceived();
    }

    /**
     * Schedule a repeating task to keep-alive the connection by sending
     * RealTimePings. If such a task is currently scheduled, it will be
     * cancelled and a new task will be scheduled to execute after
     * this._pingFrequencyMillis.
     */

  }, {
    key: '_schedulePing',
    value: function _schedulePing() {
      var self = this;
      if (!self._pingFrequencyMillis || !self._holdsSocketLock) {
        // either we haven't received an auth result yet or we are not the
        // holder of the socket, so no need to set up the
        // ping task
        return;
      }

      // Clear any currently-scheduled pinger
      if (self._nextPing) {
        clearInterval(self._nextPing);
      }

      // reschedule the pinger
      self._nextPing = setInterval(function () {
        self._sendPing();
      }, self._pingFrequencyMillis);
    }

    /*
     * Send a RealTimePing to keep connection alive If
     * the underlying websocket is closed, it will attempt to restart the
     * connection.
     */

  }, {
    key: '_sendPing',
    value: function _sendPing() {
      var self = this;
      // if connection is open, send ping
      if (!self.isConnected()) {
        return;
      }

      var request = new RealTimeRequest({
        realTimePing: new RealTimePing()
      });
      var reqBytes = self._serializeThriftStruct(RealTimeRequest, request);
      self._socket.send(reqBytes);

      self._logMessage('ping');

      // schedule a timeout checker to close the socket
      // explicitly if we don't get a response within the
      // timeout window
      self._scheduleNextPongExpected();
    }
  }, {
    key: '_scheduleNextPongExpected',
    value: function _scheduleNextPongExpected() {
      var self = this;

      // Make sure we only ever have 1 nextPongExpected timer
      // going at a time
      if (self._nextPongExpected) {
        return;
      }

      self._nextPongExpected = setTimeout(function () {
        if (self.isConnected()) {
          // use a special app-specific close code to indicate an
          // app-layer ping timeout. Note that Chrome and Firefox
          // (and maybe others) will pass 1000 as the code to the
          // socket onclose handler regardless of what code we close
          // the socket with, so we check the reason in our onclose
          // handler. IF YOU CHANGE THE REASON, YOU MUST ALSO UPDATE
          // THE ONCLOSE HANDLER
          self.close(4900, PONG_TIMEOUT_CLOSE_REASON);
        }
      }, PONG_TIMEOUT_MILLIS);
    }
  }, {
    key: '_pongReceived',
    value: function _pongReceived() {
      var self = this;
      if (self._nextPongExpected) {
        clearTimeout(self._nextPongExpected);
        self._nextPongExpected = null;
      }
    }

    /*
     * Return whether we are currently expecting a pending pong response
     * from the server
     */

  }, {
    key: '_isWaitingForPong',
    value: function _isWaitingForPong() {
      var self = this;
      return !!self._nextPongExpected;
    }

    /*
     * Read serialized struct data in an ArrayBuffer into a thrift js object
     */

  }, {
    key: '_deserializeThriftStruct',
    value: function _deserializeThriftStruct(type, data) {
      transport.write(data);
      var struct = _evernoteThrift.Thrift.Struct.read(type, protocol);
      transport.reset();
      return struct;
    }

    /*
     * Write a js thrift object to an ArrayBuffer
     */

  }, {
    key: '_serializeThriftStruct',
    value: function _serializeThriftStruct(type, struct) {
      _evernoteThrift.Thrift.Struct.write(type, protocol, struct);
      var bytes = transport.getBytes();
      transport.reset();
      return bytes;
    }

    /**
     * Cancel any existing timer and schedule a new timer to attempt to
     * acquire the socket lock in SOCKET_HOLDER_HEARTBEAT_TIMEOUT_MILLIS
     * milliseconds.
     */

  }, {
    key: '_resetAttemptAcquireLockTimer',
    value: function _resetAttemptAcquireLockTimer() {
      var self = this;

      if (self._nextAttemptAcquireLock) {
        // cancel any pending lock acquisition attempt
        clearTimeout(self._nextAttemptAcquireLock);
      }

      // schedule a new lock acquisition attempt
      self._nextAttemptAcquireLock = setTimeout(function () {
        self._attemptToAcquireLock();
      }, SOCKET_HOLDER_HEARTBEAT_TIMEOUT_MILLIS);
    }

    /*
     * Attempt to acquire the socket lock and (if successful) open a
     * websocket in this window.
     *
     * The process of attempting to acquire the lock is:
     *
     * 1. Check the current value of the lock in local storage. If the timestamp
     *    is less than SOCKET_HOLDER_HEARTBEAT_TIMEOUT_MILLIS ago, bail out.
     * 2. Set this window's unique ID and the current timestamp
     *    as the value of the lock key in local storage
     * 3. Wait for the execution context refresh to flush any other windows'
     *    updates to the lock value
     * 4. Check the lock value again, if it is our value, we have the lock,
     *    otherwise another window has the lock.
     */

  }, {
    key: '_attemptToAcquireLock',
    value: function _attemptToAcquireLock() {
      var self = this;
      self._logMessage('Attempting to acquire socket lock', true);
      var rawValue = _localStorage2.default.getItem(SOCKET_LOCK_KEY);
      var currentValue = rawValue ? JSON.parse(rawValue) : null;
      var now = new Date().getTime();
      if (!currentValue || now - currentValue.time > SOCKET_HOLDER_HEARTBEAT_TIMEOUT_MILLIS) {
        // Set our own value and check back on it later. In some browsers
        // (Safari, Firefox), we have acquired the global storage lock, and
        // so could check immediately. In other cases (Chrome?, IE11?) there is
        // no storage lock. For simplicity, in both cases we add a random
        // delay to the wait before checking to see if our value is present
        // to make it less likely that two windows both attempt to claim the
        // socket lock. Credit for this idea goes to
        // http://blog.fastmail.com/2012/11/26/inter-tab-communication-using-local-storage/
        var delay = 10 + Math.floor(Math.random() * 250);
        _localStorage2.default.setItem(SOCKET_LOCK_KEY, JSON.stringify({ id: WINDOW_ID, time: now }));
        setTimeout(function () {
          // check to see if the lock key is the value we wrote before
          // sleeping. If it is, then we will claim the lock
          var value = JSON.parse(_localStorage2.default.getItem(SOCKET_LOCK_KEY));
          if (value.id == WINDOW_ID) {
            // we have the lock
            self._lockAcquired();
          } else {
            // schedule the next lock acquisition attempt
            // note that we will only ever see this log message in browsers that don't
            // have a storage lock
            self._logMessage('Failed to acquire socket lock');
            self._resetAttemptAcquireLockTimer();
          }
        }, delay);
      }
      // someone else already claimed the lock
      // schedule the next lock acquisition attempt
      self._resetAttemptAcquireLockTimer();
    }
  }, {
    key: '_lockAcquired',
    value: function _lockAcquired() {
      var self = this;
      self._logMessage('Acquired socket lock');
      self._holdsSocketLock = true;

      // immediately send a heartbeat
      _interwindowMessageQueue2.default.publish(SOCKET_HOLDER_HEARTBEAT_TOPIC, WINDOW_ID);

      // start sending regular heartbeats
      self._nextSocketHolderHeartbeat = setInterval(function () {
        if (self._holdsSocketLock) {
          _interwindowMessageQueue2.default.publish(SOCKET_HOLDER_HEARTBEAT_TOPIC, WINDOW_ID);
        } else {
          clearInterval(self._nextSocketHolderHeartbeat);
        }
      }, SOCKET_HOLDER_HEARTBEAT_INTERVAL_MILLIS);

      // we have the lock, so cancel any attempt to acquire it
      clearTimeout(self._nextAttemptAcquireLock);
      self._nextAttemptAcquireLock = null;

      // open the websocket
      self._connect();
    }

    /**
     * Make sure that the underlying transport is connected. Trigger an
     * immediate connect attempt if we are not connected.
     */

  }, {
    key: 'ensureConnected',
    value: function ensureConnected() {
      var self = this;
      self._connect();
    }

    /**
     * Close the transport for this service if it is open
     * @param closeCode The close code to close the socket with (default 1000)
     * @param reason The reason to close the socket with (default client_requested)
     */

  }, {
    key: 'close',
    value: function close(closeCode, reason) {
      var self = this;
      if (self.isConnected()) {
        // close socket
        closeCode = closeCode || 1000;
        reason = reason || 'client_requested';
        self._socket.close(closeCode, reason);
      }
      self._socket = null;
      self._pingFrequencyMillis = null;
      if (self._holdsSocketLock) {
        _localStorage2.default.removeItem(SOCKET_LOCK_KEY);
      }

      // clear any pong checker
      if (self._nextPongExpected) {
        clearTimeout(self._nextPongExpected);
        self._nextPongExpected = null;
      }
    }

    /**
     * Return whether the transport layer is currently connected
     */

  }, {
    key: 'isConnected',
    value: function isConnected() {
      var self = this;
      return !!self._socket && (self._socket.readyState == WebSocket.OPEN || self._socket.readyState == WebSocket.CONNECTING);
    }

    /*
     * Check if realtime notifications are supported on this browser. This
     * currently is simply a check to see if WebSockets and ArrayBuffer are
     * supported in this browser.
     *
     * We currently do not support MozWebSocket, which is a pre-Firefox-7
     * implementation of WebSockets and is not entirely compatible with the
     * current API.
     */

  }, {
    key: 'isSupported',
    value: function isSupported() {
      return window.WebSocket !== undefined && window.ArrayBuffer !== undefined && _localStorage2.default.isAvailable();
    }
  }]);

  return RealTimeMessageService;
}();

exports.default = RealTimeMessageService;
module.exports = exports['default'];

/***/ }),

/***/ 52:
/***/ (function(module, exports, __webpack_require__) {

/**
 * A transport which captures the serialized result of a thrift call and saves
 * it.
 */
__webpack_require__(10);

var Transport = function() {
  this.buffer = [];
  this.readOffset = 0;
};

(function(p) {
  p.reset = function() {
    this.buffer = [];
    this.readOffset = 0;
  };

  p.getBytes = function() {
    var bufferSize = this.buffer.reduce(function(size, bytes) {
      return size + bytes.byteLength;
    }, 0);

    var allbytes = new Uint8Array(new ArrayBuffer(bufferSize));
    var pos = 0;
    this.buffer.forEach(function(bytes) {
      var view = null;
      if (bytes.buffer) {
        view = (bytes instanceof Uint8Array) ? bytes : new Uint8Array(
            bytes.buffer, bytes.byteOffset, bytes.byteLength);
      } else {
        view = new Uint8Array(bytes);
      }

      allbytes.set(view, pos);
      pos += bytes.byteLength;
    });

    return allbytes;
  };

  p.open = function() {
  };

  p.close = function() {
  };

  p.read = function(len) {
    var view = new DataView(this.getBytes().buffer, this.readOffset, len);
    this.readOffset += len;
    return view;
  };

  p.write = function(bytes) {
    this.buffer.push(bytes);
  };

  p.flush = function(async) {
  };

  p.send = function(client, postData, args, recvMethod) {
  };

}(Transport.prototype));

module.exports = Transport;


/***/ }),

/***/ 53:
/***/ (function(module, exports, __webpack_require__) {

var MemBuffer = __webpack_require__(17);

var Transport = function(notify) {
  'use strict';
  this.notify = notify;
  this.received = new MemBuffer();
  this.input = new MemBuffer();
};

(function(p) {
  'use strict';
  p.reset = function() {
    this.received.clear();
    this.input.clear();
  };

  p.open = function() {
  };

  p.close = function() {
  };

  p.read = function(len) {
    return this.received.read(len);
  };
  p.readAll = function() {
    return this.received.buffer;
  };
  p.write = function(bytes) {
    this.input.write(bytes);
  };

  p.flush = function(async) {
    this.input.flush();
    /* Build the string manually rather than calling String.fromCharCode.apply to
     * prevent RangeError issues - see
     * https://github.com/manuels/texlive.js/issues/18. */
    var buffer = this.input.buffer;
    var bufferLength = buffer.length;
    var chars = [];
    for (var i = 0; i < bufferLength; i++) {
      chars.push(String.fromCharCode(buffer[i]));
    }
    this.notify(window.btoa(chars.join('')));
    this.reset();
  };

  p.send = function(client, postData, args, recvMethod) {
  };

  p.receive = function(base64) {
    var binaryString = window.atob(base64);
    var len = binaryString.length;
    var bytes = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    this.received = new MemBuffer(bytes.buffer);
  };
}(Transport.prototype));

module.exports = Transport;


/***/ }),

/***/ 54:
/***/ (function(module, exports) {

var Transport = function(notify) {
  'use strict';
  this.notify = notify;
  this.received = '';
  this.pos = 0;
};

(function(p) {
  'use strict';
  p.reset = function() {
    this.received = '';
    this.pos = 0;
  };

  p.open = function() {
  };

  p.close = function() {
  };

  p.read = function(len) {
    var d = this.received.substring(this.pos, this.pos + len);
    this.pos += len;
    return d;
  };
  p.readAll = function() {
    return this.received;
  };
  p.write = function(json) {
    this.notify(JSON.stringify(json));
  };

  p.flush = function(async) {
  };

  p.send = function(client, postData, args, recvMethod) {
  };

  p.receive = function(s) {
    this.received = s;
    this.pos = 0;
  };
}(Transport.prototype));

module.exports = Transport;


/***/ }),

/***/ 55:
/***/ (function(module, exports, __webpack_require__) {

var MemBuffer = __webpack_require__(32);
var http = __webpack_require__(70);
var url = __webpack_require__(38);

function BinaryHttpTransport(serviceUrl, quiet) {
  'use strict';
  var parsedUrl = url.parse(serviceUrl);
  this.hostname = parsedUrl.hostname;
  this.port = parsedUrl.port;
  this.path = parsedUrl.path;
  this.url = parsedUrl.href;
  this.quiet = quiet;

  this.input = new MemBuffer();
}

BinaryHttpTransport.prototype.open = function() {
  'use strict';
};

BinaryHttpTransport.prototype.close = function() {
  'use strict';
};

BinaryHttpTransport.prototype.read = function(len) {
  'use strict';
  throw Error('BinaryHttpTransport object does not support reads');
};

BinaryHttpTransport.prototype.write = function(bytes) {
  'use strict';
  this.input.write(bytes);
};

BinaryHttpTransport.prototype.clear = function() {
  'use strict';
  this.input.clear();
};

BinaryHttpTransport.prototype.flush = function(callback) {
  'use strict';
  var self = this;
  var options = {
    hostname: this.hostname,
    port: this.port,
    path: this.path,
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-thrift',
      'Accept': 'application/x-thrift'
    }
  };
  var req = http.request(options, function(res) {
    var chunkCount = 0;
    if (res.statusCode !== 200) {
      self.log('Error in Thrift HTTP response: ' + res.statusCode);
      if (callback) {
        callback(res);
      }
    }
    res.on('data', function(chunk) {
      if (++chunkCount > 1) {
        throw Error('Multiple chunks not supported in BinaryHttpTransport');
      }
      if (callback) {
        callback(null, new MemBuffer(chunk));
      }
    });
  });

  req.on('error', function(err) {
    self.log('Error making Thrift HTTP request: ' + err);
    if (callback) {
      callback(err);
    }
  });

  this.input.flush();
  req.write(this.input.buffer);
  req.end();
  this.clear();
};

BinaryHttpTransport.prototype.log = function(msg) {
  'use strict';
  if (this.quiet) {
    return;
  }
  console.log(msg);
};

module.exports = BinaryHttpTransport;


/***/ }),

/***/ 56:
/***/ (function(module, exports) {

function TextBuffer(buffer) {
  'use strict';
  this.queue = [];
  this.buffer = buffer;
  this.offset = 0;
}

TextBuffer.prototype.read = function(len) {
  'use strict';
  this.flush();
  var view = this.buffer.slice(this.offset, this.offset + len);
  this.offset += len;
  return view;
};

TextBuffer.prototype.readAll = function() {
  'use strict';
  this.flush();
  var remainingLen = this.buffer.length - this.offset;
  return this.read(remainingLen);
};

TextBuffer.prototype.write = function(str) {
  'use strict';
  this.queue.push(str);
};

TextBuffer.prototype.clear = function() {
  'use strict';
  this.queue = [];
  this.buffer = null;
  this.offset = 0;
};

TextBuffer.prototype.flush = function() {
  'use strict';
  var result = this.buffer ? this.buffer : '';

  result += this.queue.join('');
  this.queue = [];
  this.buffer = result;
};

module.exports = TextBuffer;


/***/ }),

/***/ 57:
/***/ (function(module, exports, __webpack_require__) {

var MemBuffer = __webpack_require__(17);

function BinaryHttpTransport(url) {
  this.input = new MemBuffer();
  this.url = url;
}

BinaryHttpTransport.prototype.open = function() {
};

BinaryHttpTransport.prototype.close = function() {
};

BinaryHttpTransport.prototype.read = function(len) {
  throw Error('BinaryHttpTransport object does not support reads');
};

BinaryHttpTransport.prototype.write = function(bytes) {
  this.input.write(bytes);
};

BinaryHttpTransport.prototype.clear = function() {
  this.input.clear();
};

BinaryHttpTransport.prototype.flush = function(callback) {
  var xhr;

  xhr = new XMLHttpRequest();
  xhr.open('POST', this.url, /* async */ true);
  xhr.withCredentials = true;
  xhr.setRequestHeader('Content-Type', 'application/x-thrift');
  xhr.setRequestHeader('Accept', 'application/x-thrift');
  xhr.responseType = 'arraybuffer';

  xhr.onload = function(evt) {
    if (callback) {
      callback(null, new MemBuffer(xhr.response));
    }
  };

  xhr.onerror = function(evt) {
    if (callback) {
      callback(evt);
    }
  };

  this.input.flush();
  /**
   * Older browsers (CEF 1 in the win-client) XHR don't support send(ArrayBufferView)
   * so we use the older, more widely supported send(ArrayBuffer).
   *
   * this usecase used to be deprecated, but is no longer:
   * https://www.w3.org/Bugs/Public/show_bug.cgi?id=26153#c1
   */
  xhr.send(this.input.buffer.buffer);
  this.clear();
};

module.exports = BinaryHttpTransport;


/***/ }),

/***/ 58:
/***/ (function(module, exports, __webpack_require__) {

/* global ActiveXObject */
var MemBuffer = __webpack_require__(56);

function TextHttpTransport(url) {
  this.input = new MemBuffer();
  this.url = url;
}

TextHttpTransport.prototype.open = function() {
};

TextHttpTransport.prototype.close = function() {
};

TextHttpTransport.prototype.read = function(len) {
  throw Error('TextHttpTransport object does not support reads');
};

TextHttpTransport.prototype.write = function(bytes) {
  this.input.write(bytes);
};

TextHttpTransport.prototype.clear = function() {
  this.input.clear();
};

var getXmlHttpRequestObject = function() {
  try {
    return new XMLHttpRequest();
  } catch (e1) {
    /* do nothing */
  }
  try {
    return new ActiveXObject('Msxml2.XMLHTTP');
  } catch (e2) {
    /* do nothing */
  }
  try {
    return new ActiveXObject('Microsoft.XMLHTTP');
  } catch (e3) {
    /* do nothing */
  }

  throw Error('Your browser doesn\'t support the XmlHttpRequest object.');
};

TextHttpTransport.prototype.flush = function(callback) {
  var xhr;

  xhr = getXmlHttpRequestObject();
  if (xhr.overrideMimeType) {
    xhr.overrideMimeType('application/json');
  }

  xhr.open('POST', this.url, /* async */ true);
  xhr.withCredentials = true;
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.setRequestHeader('Accept', 'application/json');
  xhr.responseType = 'application/json';

  /**
   * In IE8/9, the XMLHttpRequest 1 spec does not have a rich
   * set of callbacks - it only offers 'onreadystatechange'.
   */
  if (Object.prototype.hasOwnProperty.call(xhr, 'onload')
      && Object.prototype.hasOwnProperty.call(xhr, 'onerror')) {

    xhr.onload = function(evt) {
      if (callback) {
        callback(null, new MemBuffer(xhr.response));
      }
    };

    xhr.onerror = function(evt) {
      if (callback) {
        callback(evt);
      }
    };

  } else {

    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && callback) {
        if (xhr.status === 200) {
          callback(null, new MemBuffer(xhr.responseText));
        } else {
          callback(new Error('unexpected status: ' + xhr.status));
        }
      }
    };
  }

  this.input.flush();
  xhr.send(this.input.buffer);
  this.clear();
};

module.exports = TextHttpTransport;


/***/ }),

/***/ 59:
/***/ (function(module, exports) {

exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ }),

/***/ 6:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// a duplex stream is just a stream that is both readable and writable.
// Since JS doesn't have multiple prototypal inheritance, this class
// prototypally inherits from Readable, and then parasitically from
// Writable.



/*<replacement>*/

var objectKeys = Object.keys || function (obj) {
  var keys = [];
  for (var key in obj) {
    keys.push(key);
  }return keys;
};
/*</replacement>*/

module.exports = Duplex;

/*<replacement>*/
var processNextTick = __webpack_require__(18);
/*</replacement>*/

/*<replacement>*/
var util = __webpack_require__(9);
util.inherits = __webpack_require__(4);
/*</replacement>*/

var Readable = __webpack_require__(35);
var Writable = __webpack_require__(20);

util.inherits(Duplex, Readable);

var keys = objectKeys(Writable.prototype);
for (var v = 0; v < keys.length; v++) {
  var method = keys[v];
  if (!Duplex.prototype[method]) Duplex.prototype[method] = Writable.prototype[method];
}

function Duplex(options) {
  if (!(this instanceof Duplex)) return new Duplex(options);

  Readable.call(this, options);
  Writable.call(this, options);

  if (options && options.readable === false) this.readable = false;

  if (options && options.writable === false) this.writable = false;

  this.allowHalfOpen = true;
  if (options && options.allowHalfOpen === false) this.allowHalfOpen = false;

  this.once('end', onend);
}

// the no-half-open enforcer
function onend() {
  // if we allow half-open state, or if the writable side ended,
  // then we're ok.
  if (this.allowHalfOpen || this._writableState.ended) return;

  // no more data can be written.
  // But allow more writes to happen in this tick.
  processNextTick(onEndNT, this);
}

function onEndNT(self) {
  self.end();
}

function forEach(xs, f) {
  for (var i = 0, l = xs.length; i < l; i++) {
    f(xs[i], i);
  }
}

/***/ }),

/***/ 60:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module, global) {var __WEBPACK_AMD_DEFINE_RESULT__;/*! https://mths.be/punycode v1.4.1 by @mathias */
;(function(root) {

	/** Detect free variables */
	var freeExports = typeof exports == 'object' && exports &&
		!exports.nodeType && exports;
	var freeModule = typeof module == 'object' && module &&
		!module.nodeType && module;
	var freeGlobal = typeof global == 'object' && global;
	if (
		freeGlobal.global === freeGlobal ||
		freeGlobal.window === freeGlobal ||
		freeGlobal.self === freeGlobal
	) {
		root = freeGlobal;
	}

	/**
	 * The `punycode` object.
	 * @name punycode
	 * @type Object
	 */
	var punycode,

	/** Highest positive signed 32-bit float value */
	maxInt = 2147483647, // aka. 0x7FFFFFFF or 2^31-1

	/** Bootstring parameters */
	base = 36,
	tMin = 1,
	tMax = 26,
	skew = 38,
	damp = 700,
	initialBias = 72,
	initialN = 128, // 0x80
	delimiter = '-', // '\x2D'

	/** Regular expressions */
	regexPunycode = /^xn--/,
	regexNonASCII = /[^\x20-\x7E]/, // unprintable ASCII chars + non-ASCII chars
	regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g, // RFC 3490 separators

	/** Error messages */
	errors = {
		'overflow': 'Overflow: input needs wider integers to process',
		'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
		'invalid-input': 'Invalid input'
	},

	/** Convenience shortcuts */
	baseMinusTMin = base - tMin,
	floor = Math.floor,
	stringFromCharCode = String.fromCharCode,

	/** Temporary variable */
	key;

	/*--------------------------------------------------------------------------*/

	/**
	 * A generic error utility function.
	 * @private
	 * @param {String} type The error type.
	 * @returns {Error} Throws a `RangeError` with the applicable error message.
	 */
	function error(type) {
		throw new RangeError(errors[type]);
	}

	/**
	 * A generic `Array#map` utility function.
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} callback The function that gets called for every array
	 * item.
	 * @returns {Array} A new array of values returned by the callback function.
	 */
	function map(array, fn) {
		var length = array.length;
		var result = [];
		while (length--) {
			result[length] = fn(array[length]);
		}
		return result;
	}

	/**
	 * A simple `Array#map`-like wrapper to work with domain name strings or email
	 * addresses.
	 * @private
	 * @param {String} domain The domain name or email address.
	 * @param {Function} callback The function that gets called for every
	 * character.
	 * @returns {Array} A new string of characters returned by the callback
	 * function.
	 */
	function mapDomain(string, fn) {
		var parts = string.split('@');
		var result = '';
		if (parts.length > 1) {
			// In email addresses, only the domain name should be punycoded. Leave
			// the local part (i.e. everything up to `@`) intact.
			result = parts[0] + '@';
			string = parts[1];
		}
		// Avoid `split(regex)` for IE8 compatibility. See #17.
		string = string.replace(regexSeparators, '\x2E');
		var labels = string.split('.');
		var encoded = map(labels, fn).join('.');
		return result + encoded;
	}

	/**
	 * Creates an array containing the numeric code points of each Unicode
	 * character in the string. While JavaScript uses UCS-2 internally,
	 * this function will convert a pair of surrogate halves (each of which
	 * UCS-2 exposes as separate characters) into a single code point,
	 * matching UTF-16.
	 * @see `punycode.ucs2.encode`
	 * @see <https://mathiasbynens.be/notes/javascript-encoding>
	 * @memberOf punycode.ucs2
	 * @name decode
	 * @param {String} string The Unicode input string (UCS-2).
	 * @returns {Array} The new array of code points.
	 */
	function ucs2decode(string) {
		var output = [],
		    counter = 0,
		    length = string.length,
		    value,
		    extra;
		while (counter < length) {
			value = string.charCodeAt(counter++);
			if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
				// high surrogate, and there is a next character
				extra = string.charCodeAt(counter++);
				if ((extra & 0xFC00) == 0xDC00) { // low surrogate
					output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
				} else {
					// unmatched surrogate; only append this code unit, in case the next
					// code unit is the high surrogate of a surrogate pair
					output.push(value);
					counter--;
				}
			} else {
				output.push(value);
			}
		}
		return output;
	}

	/**
	 * Creates a string based on an array of numeric code points.
	 * @see `punycode.ucs2.decode`
	 * @memberOf punycode.ucs2
	 * @name encode
	 * @param {Array} codePoints The array of numeric code points.
	 * @returns {String} The new Unicode string (UCS-2).
	 */
	function ucs2encode(array) {
		return map(array, function(value) {
			var output = '';
			if (value > 0xFFFF) {
				value -= 0x10000;
				output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
				value = 0xDC00 | value & 0x3FF;
			}
			output += stringFromCharCode(value);
			return output;
		}).join('');
	}

	/**
	 * Converts a basic code point into a digit/integer.
	 * @see `digitToBasic()`
	 * @private
	 * @param {Number} codePoint The basic numeric code point value.
	 * @returns {Number} The numeric value of a basic code point (for use in
	 * representing integers) in the range `0` to `base - 1`, or `base` if
	 * the code point does not represent a value.
	 */
	function basicToDigit(codePoint) {
		if (codePoint - 48 < 10) {
			return codePoint - 22;
		}
		if (codePoint - 65 < 26) {
			return codePoint - 65;
		}
		if (codePoint - 97 < 26) {
			return codePoint - 97;
		}
		return base;
	}

	/**
	 * Converts a digit/integer into a basic code point.
	 * @see `basicToDigit()`
	 * @private
	 * @param {Number} digit The numeric value of a basic code point.
	 * @returns {Number} The basic code point whose value (when used for
	 * representing integers) is `digit`, which needs to be in the range
	 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
	 * used; else, the lowercase form is used. The behavior is undefined
	 * if `flag` is non-zero and `digit` has no uppercase form.
	 */
	function digitToBasic(digit, flag) {
		//  0..25 map to ASCII a..z or A..Z
		// 26..35 map to ASCII 0..9
		return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
	}

	/**
	 * Bias adaptation function as per section 3.4 of RFC 3492.
	 * https://tools.ietf.org/html/rfc3492#section-3.4
	 * @private
	 */
	function adapt(delta, numPoints, firstTime) {
		var k = 0;
		delta = firstTime ? floor(delta / damp) : delta >> 1;
		delta += floor(delta / numPoints);
		for (/* no initialization */; delta > baseMinusTMin * tMax >> 1; k += base) {
			delta = floor(delta / baseMinusTMin);
		}
		return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
	}

	/**
	 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
	 * symbols.
	 * @memberOf punycode
	 * @param {String} input The Punycode string of ASCII-only symbols.
	 * @returns {String} The resulting string of Unicode symbols.
	 */
	function decode(input) {
		// Don't use UCS-2
		var output = [],
		    inputLength = input.length,
		    out,
		    i = 0,
		    n = initialN,
		    bias = initialBias,
		    basic,
		    j,
		    index,
		    oldi,
		    w,
		    k,
		    digit,
		    t,
		    /** Cached calculation results */
		    baseMinusT;

		// Handle the basic code points: let `basic` be the number of input code
		// points before the last delimiter, or `0` if there is none, then copy
		// the first basic code points to the output.

		basic = input.lastIndexOf(delimiter);
		if (basic < 0) {
			basic = 0;
		}

		for (j = 0; j < basic; ++j) {
			// if it's not a basic code point
			if (input.charCodeAt(j) >= 0x80) {
				error('not-basic');
			}
			output.push(input.charCodeAt(j));
		}

		// Main decoding loop: start just after the last delimiter if any basic code
		// points were copied; start at the beginning otherwise.

		for (index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */) {

			// `index` is the index of the next character to be consumed.
			// Decode a generalized variable-length integer into `delta`,
			// which gets added to `i`. The overflow checking is easier
			// if we increase `i` as we go, then subtract off its starting
			// value at the end to obtain `delta`.
			for (oldi = i, w = 1, k = base; /* no condition */; k += base) {

				if (index >= inputLength) {
					error('invalid-input');
				}

				digit = basicToDigit(input.charCodeAt(index++));

				if (digit >= base || digit > floor((maxInt - i) / w)) {
					error('overflow');
				}

				i += digit * w;
				t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);

				if (digit < t) {
					break;
				}

				baseMinusT = base - t;
				if (w > floor(maxInt / baseMinusT)) {
					error('overflow');
				}

				w *= baseMinusT;

			}

			out = output.length + 1;
			bias = adapt(i - oldi, out, oldi == 0);

			// `i` was supposed to wrap around from `out` to `0`,
			// incrementing `n` each time, so we'll fix that now:
			if (floor(i / out) > maxInt - n) {
				error('overflow');
			}

			n += floor(i / out);
			i %= out;

			// Insert `n` at position `i` of the output
			output.splice(i++, 0, n);

		}

		return ucs2encode(output);
	}

	/**
	 * Converts a string of Unicode symbols (e.g. a domain name label) to a
	 * Punycode string of ASCII-only symbols.
	 * @memberOf punycode
	 * @param {String} input The string of Unicode symbols.
	 * @returns {String} The resulting Punycode string of ASCII-only symbols.
	 */
	function encode(input) {
		var n,
		    delta,
		    handledCPCount,
		    basicLength,
		    bias,
		    j,
		    m,
		    q,
		    k,
		    t,
		    currentValue,
		    output = [],
		    /** `inputLength` will hold the number of code points in `input`. */
		    inputLength,
		    /** Cached calculation results */
		    handledCPCountPlusOne,
		    baseMinusT,
		    qMinusT;

		// Convert the input in UCS-2 to Unicode
		input = ucs2decode(input);

		// Cache the length
		inputLength = input.length;

		// Initialize the state
		n = initialN;
		delta = 0;
		bias = initialBias;

		// Handle the basic code points
		for (j = 0; j < inputLength; ++j) {
			currentValue = input[j];
			if (currentValue < 0x80) {
				output.push(stringFromCharCode(currentValue));
			}
		}

		handledCPCount = basicLength = output.length;

		// `handledCPCount` is the number of code points that have been handled;
		// `basicLength` is the number of basic code points.

		// Finish the basic string - if it is not empty - with a delimiter
		if (basicLength) {
			output.push(delimiter);
		}

		// Main encoding loop:
		while (handledCPCount < inputLength) {

			// All non-basic code points < n have been handled already. Find the next
			// larger one:
			for (m = maxInt, j = 0; j < inputLength; ++j) {
				currentValue = input[j];
				if (currentValue >= n && currentValue < m) {
					m = currentValue;
				}
			}

			// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
			// but guard against overflow
			handledCPCountPlusOne = handledCPCount + 1;
			if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
				error('overflow');
			}

			delta += (m - n) * handledCPCountPlusOne;
			n = m;

			for (j = 0; j < inputLength; ++j) {
				currentValue = input[j];

				if (currentValue < n && ++delta > maxInt) {
					error('overflow');
				}

				if (currentValue == n) {
					// Represent delta as a generalized variable-length integer
					for (q = delta, k = base; /* no condition */; k += base) {
						t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
						if (q < t) {
							break;
						}
						qMinusT = q - t;
						baseMinusT = base - t;
						output.push(
							stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
						);
						q = floor(qMinusT / baseMinusT);
					}

					output.push(stringFromCharCode(digitToBasic(q, 0)));
					bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
					delta = 0;
					++handledCPCount;
				}
			}

			++delta;
			++n;

		}
		return output.join('');
	}

	/**
	 * Converts a Punycode string representing a domain name or an email address
	 * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
	 * it doesn't matter if you call it on a string that has already been
	 * converted to Unicode.
	 * @memberOf punycode
	 * @param {String} input The Punycoded domain name or email address to
	 * convert to Unicode.
	 * @returns {String} The Unicode representation of the given Punycode
	 * string.
	 */
	function toUnicode(input) {
		return mapDomain(input, function(string) {
			return regexPunycode.test(string)
				? decode(string.slice(4).toLowerCase())
				: string;
		});
	}

	/**
	 * Converts a Unicode string representing a domain name or an email address to
	 * Punycode. Only the non-ASCII parts of the domain name will be converted,
	 * i.e. it doesn't matter if you call it with a domain that's already in
	 * ASCII.
	 * @memberOf punycode
	 * @param {String} input The domain name or email address to convert, as a
	 * Unicode string.
	 * @returns {String} The Punycode representation of the given domain name or
	 * email address.
	 */
	function toASCII(input) {
		return mapDomain(input, function(string) {
			return regexNonASCII.test(string)
				? 'xn--' + encode(string)
				: string;
		});
	}

	/*--------------------------------------------------------------------------*/

	/** Define the public API */
	punycode = {
		/**
		 * A string representing the current Punycode.js version number.
		 * @memberOf punycode
		 * @type String
		 */
		'version': '1.4.1',
		/**
		 * An object of methods to convert from JavaScript's internal character
		 * representation (UCS-2) to Unicode code points, and back.
		 * @see <https://mathiasbynens.be/notes/javascript-encoding>
		 * @memberOf punycode
		 * @type Object
		 */
		'ucs2': {
			'decode': ucs2decode,
			'encode': ucs2encode
		},
		'decode': decode,
		'encode': encode,
		'toASCII': toASCII,
		'toUnicode': toUnicode
	};

	/** Expose `punycode` */
	// Some AMD build optimizers, like r.js, check for specific condition patterns
	// like the following:
	if (
		true
	) {
		!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
			return punycode;
		}.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else if (freeExports && freeModule) {
		if (module.exports == freeExports) {
			// in Node.js, io.js, or RingoJS v0.8.0+
			freeModule.exports = punycode;
		} else {
			// in Narwhal or RingoJS v0.7.0-
			for (key in punycode) {
				punycode.hasOwnProperty(key) && (freeExports[key] = punycode[key]);
			}
		}
	} else {
		// in Rhino or a web browser
		root.punycode = punycode;
	}

}(this));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(77)(module), __webpack_require__(2)))

/***/ }),

/***/ 61:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



// If obj.hasOwnProperty has been overridden, then calling
// obj.hasOwnProperty(prop) will break.
// See: https://github.com/joyent/node/issues/1707
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

module.exports = function(qs, sep, eq, options) {
  sep = sep || '&';
  eq = eq || '=';
  var obj = {};

  if (typeof qs !== 'string' || qs.length === 0) {
    return obj;
  }

  var regexp = /\+/g;
  qs = qs.split(sep);

  var maxKeys = 1000;
  if (options && typeof options.maxKeys === 'number') {
    maxKeys = options.maxKeys;
  }

  var len = qs.length;
  // maxKeys <= 0 means that we should not limit keys count
  if (maxKeys > 0 && len > maxKeys) {
    len = maxKeys;
  }

  for (var i = 0; i < len; ++i) {
    var x = qs[i].replace(regexp, '%20'),
        idx = x.indexOf(eq),
        kstr, vstr, k, v;

    if (idx >= 0) {
      kstr = x.substr(0, idx);
      vstr = x.substr(idx + 1);
    } else {
      kstr = x;
      vstr = '';
    }

    k = decodeURIComponent(kstr);
    v = decodeURIComponent(vstr);

    if (!hasOwnProperty(obj, k)) {
      obj[k] = v;
    } else if (isArray(obj[k])) {
      obj[k].push(v);
    } else {
      obj[k] = [obj[k], v];
    }
  }

  return obj;
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};


/***/ }),

/***/ 62:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var stringifyPrimitive = function(v) {
  switch (typeof v) {
    case 'string':
      return v;

    case 'boolean':
      return v ? 'true' : 'false';

    case 'number':
      return isFinite(v) ? v : '';

    default:
      return '';
  }
};

module.exports = function(obj, sep, eq, name) {
  sep = sep || '&';
  eq = eq || '=';
  if (obj === null) {
    obj = undefined;
  }

  if (typeof obj === 'object') {
    return map(objectKeys(obj), function(k) {
      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
      if (isArray(obj[k])) {
        return map(obj[k], function(v) {
          return ks + encodeURIComponent(stringifyPrimitive(v));
        }).join(sep);
      } else {
        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
      }
    }).join(sep);

  }

  if (!name) return '';
  return encodeURIComponent(stringifyPrimitive(name)) + eq +
         encodeURIComponent(stringifyPrimitive(obj));
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

function map (xs, f) {
  if (xs.map) return xs.map(f);
  var res = [];
  for (var i = 0; i < xs.length; i++) {
    res.push(f(xs[i], i));
  }
  return res;
}

var objectKeys = Object.keys || function (obj) {
  var res = [];
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
  }
  return res;
};


/***/ }),

/***/ 63:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.decode = exports.parse = __webpack_require__(61);
exports.encode = exports.stringify = __webpack_require__(62);


/***/ }),

/***/ 64:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(6)


/***/ }),

/***/ 65:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Buffer = __webpack_require__(1).Buffer;
/*<replacement>*/
var bufferShim = __webpack_require__(16);
/*</replacement>*/

module.exports = BufferList;

function BufferList() {
  this.head = null;
  this.tail = null;
  this.length = 0;
}

BufferList.prototype.push = function (v) {
  var entry = { data: v, next: null };
  if (this.length > 0) this.tail.next = entry;else this.head = entry;
  this.tail = entry;
  ++this.length;
};

BufferList.prototype.unshift = function (v) {
  var entry = { data: v, next: this.head };
  if (this.length === 0) this.tail = entry;
  this.head = entry;
  ++this.length;
};

BufferList.prototype.shift = function () {
  if (this.length === 0) return;
  var ret = this.head.data;
  if (this.length === 1) this.head = this.tail = null;else this.head = this.head.next;
  --this.length;
  return ret;
};

BufferList.prototype.clear = function () {
  this.head = this.tail = null;
  this.length = 0;
};

BufferList.prototype.join = function (s) {
  if (this.length === 0) return '';
  var p = this.head;
  var ret = '' + p.data;
  while (p = p.next) {
    ret += s + p.data;
  }return ret;
};

BufferList.prototype.concat = function (n) {
  if (this.length === 0) return bufferShim.alloc(0);
  if (this.length === 1) return this.head.data;
  var ret = bufferShim.allocUnsafe(n >>> 0);
  var p = this.head;
  var i = 0;
  while (p) {
    p.data.copy(ret, i);
    i += p.data.length;
    p = p.next;
  }
  return ret;
};

/***/ }),

/***/ 66:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(34)


/***/ }),

/***/ 67:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(19)


/***/ }),

/***/ 68:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(20)


/***/ }),

/***/ 69:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2), __webpack_require__(5)))

/***/ }),

/***/ 7:
/***/ (function(module, exports, __webpack_require__) {

//
// Autogenerated by Thrift Compiler (0.7.0-en-11139b3b5cb61e817408c6e84b0e1c258bf6c6ae)
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//


  // Define types and services

  var Thrift = __webpack_require__(0).Thrift;
  var Types = __webpack_require__(3);


  module.exports.EDAMErrorCode = {
    'UNKNOWN' : 1,
    'BAD_DATA_FORMAT' : 2,
    'PERMISSION_DENIED' : 3,
    'INTERNAL_ERROR' : 4,
    'DATA_REQUIRED' : 5,
    'LIMIT_REACHED' : 6,
    'QUOTA_REACHED' : 7,
    'INVALID_AUTH' : 8,
    'AUTH_EXPIRED' : 9,
    'DATA_CONFLICT' : 10,
    'ENML_VALIDATION' : 11,
    'SHARD_UNAVAILABLE' : 12,
    'LEN_TOO_SHORT' : 13,
    'LEN_TOO_LONG' : 14,
    'TOO_FEW' : 15,
    'TOO_MANY' : 16,
    'UNSUPPORTED_OPERATION' : 17,
    'TAKEN_DOWN' : 18,
    'RATE_LIMIT_REACHED' : 19,
    'BUSINESS_SECURITY_LOGIN_REQUIRED' : 20,
    'DEVICE_LIMIT_REACHED' : 21,
    'OPENID_ALREADY_TAKEN' : 22,
    'INVALID_OPENID_TOKEN' : 23,
    'USER_NOT_ASSOCIATED' : 24,
    'USER_NOT_REGISTERED' : 25,
    'USER_ALREADY_ASSOCIATED' : 26,
    'ACCOUNT_CLEAR' : 27,
    'SSO_AUTHENTICATION_REQUIRED' : 28
  };

  module.exports.EDAMInvalidContactReason = {
    'BAD_ADDRESS' : 0,
    'DUPLICATE_CONTACT' : 1,
    'NO_CONNECTION' : 2
  };

  module.exports.EDAMUserException = Thrift.Exception.define('EDAMUserException',  {
    1: { alias: 'errorCode', type: Thrift.Type.I32 },
    2: { alias: 'parameter', type: Thrift.Type.STRING }
  });

  module.exports.EDAMSystemException = Thrift.Exception.define('EDAMSystemException',  {
    1: { alias: 'errorCode', type: Thrift.Type.I32 },
    2: { alias: 'message', type: Thrift.Type.STRING },
    3: { alias: 'rateLimitDuration', type: Thrift.Type.I32 }
  });

  module.exports.EDAMNotFoundException = Thrift.Exception.define('EDAMNotFoundException',  {
    1: { alias: 'identifier', type: Thrift.Type.STRING },
    2: { alias: 'key', type: Thrift.Type.STRING }
  });

  module.exports.EDAMInvalidContactsException = Thrift.Exception.define('EDAMInvalidContactsException',  {
    1: { alias: 'contacts', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, Types.Contact)  },
    2: { alias: 'parameter', type: Thrift.Type.STRING },
    3: { alias: 'reasons', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.I32)  }
  });



/***/ }),

/***/ 70:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var ClientRequest = __webpack_require__(71)
var extend = __webpack_require__(78)
var statusCodes = __webpack_require__(48)
var url = __webpack_require__(38)

var http = exports

http.request = function (opts, cb) {
	if (typeof opts === 'string')
		opts = url.parse(opts)
	else
		opts = extend(opts)

	// Normally, the page is loaded from http or https, so not specifying a protocol
	// will result in a (valid) protocol-relative url. However, this won't work if
	// the protocol is something else, like 'file:'
	var defaultProtocol = global.location.protocol.search(/^https?:$/) === -1 ? 'http:' : ''

	var protocol = opts.protocol || defaultProtocol
	var host = opts.hostname || opts.host
	var port = opts.port
	var path = opts.path || '/'

	// Necessary for IPv6 addresses
	if (host && host.indexOf(':') !== -1)
		host = '[' + host + ']'

	// This may be a relative url. The browser should always be able to interpret it correctly.
	opts.url = (host ? (protocol + '//' + host) : '') + (port ? ':' + port : '') + path
	opts.method = (opts.method || 'GET').toUpperCase()
	opts.headers = opts.headers || {}

	// Also valid opts.auth, opts.mode

	var req = new ClientRequest(opts)
	if (cb)
		req.on('response', cb)
	return req
}

http.get = function get (opts, cb) {
	var req = http.request(opts, cb)
	req.end()
	return req
}

http.Agent = function () {}
http.Agent.defaultMaxSockets = 4

http.STATUS_CODES = statusCodes

http.METHODS = [
	'CHECKOUT',
	'CONNECT',
	'COPY',
	'DELETE',
	'GET',
	'HEAD',
	'LOCK',
	'M-SEARCH',
	'MERGE',
	'MKACTIVITY',
	'MKCOL',
	'MOVE',
	'NOTIFY',
	'OPTIONS',
	'PATCH',
	'POST',
	'PROPFIND',
	'PROPPATCH',
	'PURGE',
	'PUT',
	'REPORT',
	'SEARCH',
	'SUBSCRIBE',
	'TRACE',
	'UNLOCK',
	'UNSUBSCRIBE'
]
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),

/***/ 71:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer, global, process) {var capability = __webpack_require__(36)
var inherits = __webpack_require__(4)
var response = __webpack_require__(72)
var stream = __webpack_require__(21)
var toArrayBuffer = __webpack_require__(74)

var IncomingMessage = response.IncomingMessage
var rStates = response.readyStates

function decideMode (preferBinary, useFetch) {
	if (capability.fetch && useFetch) {
		return 'fetch'
	} else if (capability.mozchunkedarraybuffer) {
		return 'moz-chunked-arraybuffer'
	} else if (capability.msstream) {
		return 'ms-stream'
	} else if (capability.arraybuffer && preferBinary) {
		return 'arraybuffer'
	} else if (capability.vbArray && preferBinary) {
		return 'text:vbarray'
	} else {
		return 'text'
	}
}

var ClientRequest = module.exports = function (opts) {
	var self = this
	stream.Writable.call(self)

	self._opts = opts
	self._body = []
	self._headers = {}
	if (opts.auth)
		self.setHeader('Authorization', 'Basic ' + new Buffer(opts.auth).toString('base64'))
	Object.keys(opts.headers).forEach(function (name) {
		self.setHeader(name, opts.headers[name])
	})

	var preferBinary
	var useFetch = true
	if (opts.mode === 'disable-fetch' || 'timeout' in opts) {
		// If the use of XHR should be preferred and includes preserving the 'content-type' header.
		// Force XHR to be used since the Fetch API does not yet support timeouts.
		useFetch = false
		preferBinary = true
	} else if (opts.mode === 'prefer-streaming') {
		// If streaming is a high priority but binary compatibility and
		// the accuracy of the 'content-type' header aren't
		preferBinary = false
	} else if (opts.mode === 'allow-wrong-content-type') {
		// If streaming is more important than preserving the 'content-type' header
		preferBinary = !capability.overrideMimeType
	} else if (!opts.mode || opts.mode === 'default' || opts.mode === 'prefer-fast') {
		// Use binary if text streaming may corrupt data or the content-type header, or for speed
		preferBinary = true
	} else {
		throw new Error('Invalid value for opts.mode')
	}
	self._mode = decideMode(preferBinary, useFetch)

	self.on('finish', function () {
		self._onFinish()
	})
}

inherits(ClientRequest, stream.Writable)

ClientRequest.prototype.setHeader = function (name, value) {
	var self = this
	var lowerName = name.toLowerCase()
	// This check is not necessary, but it prevents warnings from browsers about setting unsafe
	// headers. To be honest I'm not entirely sure hiding these warnings is a good thing, but
	// http-browserify did it, so I will too.
	if (unsafeHeaders.indexOf(lowerName) !== -1)
		return

	self._headers[lowerName] = {
		name: name,
		value: value
	}
}

ClientRequest.prototype.getHeader = function (name) {
	var self = this
	return self._headers[name.toLowerCase()].value
}

ClientRequest.prototype.removeHeader = function (name) {
	var self = this
	delete self._headers[name.toLowerCase()]
}

ClientRequest.prototype._onFinish = function () {
	var self = this

	if (self._destroyed)
		return
	var opts = self._opts

	var headersObj = self._headers
	var body = null
	if (opts.method === 'POST' || opts.method === 'PUT' || opts.method === 'PATCH' || opts.method === 'MERGE') {
		if (capability.blobConstructor) {
			body = new global.Blob(self._body.map(function (buffer) {
				return toArrayBuffer(buffer)
			}), {
				type: (headersObj['content-type'] || {}).value || ''
			})
		} else {
			// get utf8 string
			body = Buffer.concat(self._body).toString()
		}
	}

	if (self._mode === 'fetch') {
		var headers = Object.keys(headersObj).map(function (name) {
			return [headersObj[name].name, headersObj[name].value]
		})

		global.fetch(self._opts.url, {
			method: self._opts.method,
			headers: headers,
			body: body || undefined,
			mode: 'cors',
			credentials: opts.withCredentials ? 'include' : 'same-origin'
		}).then(function (response) {
			self._fetchResponse = response
			self._connect()
		}, function (reason) {
			self.emit('error', reason)
		})
	} else {
		var xhr = self._xhr = new global.XMLHttpRequest()
		try {
			xhr.open(self._opts.method, self._opts.url, true)
		} catch (err) {
			process.nextTick(function () {
				self.emit('error', err)
			})
			return
		}

		// Can't set responseType on really old browsers
		if ('responseType' in xhr)
			xhr.responseType = self._mode.split(':')[0]

		if ('withCredentials' in xhr)
			xhr.withCredentials = !!opts.withCredentials

		if (self._mode === 'text' && 'overrideMimeType' in xhr)
			xhr.overrideMimeType('text/plain; charset=x-user-defined')

		if ('timeout' in opts) {
			xhr.timeout = opts.timeout
			xhr.ontimeout = function () {
				self.emit('timeout')
			}
		}

		Object.keys(headersObj).forEach(function (name) {
			xhr.setRequestHeader(headersObj[name].name, headersObj[name].value)
		})

		self._response = null
		xhr.onreadystatechange = function () {
			switch (xhr.readyState) {
				case rStates.LOADING:
				case rStates.DONE:
					self._onXHRProgress()
					break
			}
		}
		// Necessary for streaming in Firefox, since xhr.response is ONLY defined
		// in onprogress, not in onreadystatechange with xhr.readyState = 3
		if (self._mode === 'moz-chunked-arraybuffer') {
			xhr.onprogress = function () {
				self._onXHRProgress()
			}
		}

		xhr.onerror = function () {
			if (self._destroyed)
				return
			self.emit('error', new Error('XHR error'))
		}

		try {
			xhr.send(body)
		} catch (err) {
			process.nextTick(function () {
				self.emit('error', err)
			})
			return
		}
	}
}

/**
 * Checks if xhr.status is readable and non-zero, indicating no error.
 * Even though the spec says it should be available in readyState 3,
 * accessing it throws an exception in IE8
 */
function statusValid (xhr) {
	try {
		var status = xhr.status
		return (status !== null && status !== 0)
	} catch (e) {
		return false
	}
}

ClientRequest.prototype._onXHRProgress = function () {
	var self = this

	if (!statusValid(self._xhr) || self._destroyed)
		return

	if (!self._response)
		self._connect()

	self._response._onXHRProgress()
}

ClientRequest.prototype._connect = function () {
	var self = this

	if (self._destroyed)
		return

	self._response = new IncomingMessage(self._xhr, self._fetchResponse, self._mode)
	self._response.on('error', function(err) {
		self.emit('error', err)
	})

	self.emit('response', self._response)
}

ClientRequest.prototype._write = function (chunk, encoding, cb) {
	var self = this

	self._body.push(chunk)
	cb()
}

ClientRequest.prototype.abort = ClientRequest.prototype.destroy = function () {
	var self = this
	self._destroyed = true
	if (self._response)
		self._response._destroyed = true
	if (self._xhr)
		self._xhr.abort()
	// Currently, there isn't a way to truly abort a fetch.
	// If you like bikeshedding, see https://github.com/whatwg/fetch/issues/27
}

ClientRequest.prototype.end = function (data, encoding, cb) {
	var self = this
	if (typeof data === 'function') {
		cb = data
		data = undefined
	}

	stream.Writable.prototype.end.call(self, data, encoding, cb)
}

ClientRequest.prototype.flushHeaders = function () {}
ClientRequest.prototype.setTimeout = function () {}
ClientRequest.prototype.setNoDelay = function () {}
ClientRequest.prototype.setSocketKeepAlive = function () {}

// Taken from http://www.w3.org/TR/XMLHttpRequest/#the-setrequestheader%28%29-method
var unsafeHeaders = [
	'accept-charset',
	'accept-encoding',
	'access-control-request-headers',
	'access-control-request-method',
	'connection',
	'content-length',
	'cookie',
	'cookie2',
	'date',
	'dnt',
	'expect',
	'host',
	'keep-alive',
	'origin',
	'referer',
	'te',
	'trailer',
	'transfer-encoding',
	'upgrade',
	'user-agent',
	'via'
]

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1).Buffer, __webpack_require__(2), __webpack_require__(5)))

/***/ }),

/***/ 72:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process, Buffer, global) {var capability = __webpack_require__(36)
var inherits = __webpack_require__(4)
var stream = __webpack_require__(21)

var rStates = exports.readyStates = {
	UNSENT: 0,
	OPENED: 1,
	HEADERS_RECEIVED: 2,
	LOADING: 3,
	DONE: 4
}

var IncomingMessage = exports.IncomingMessage = function (xhr, response, mode) {
	var self = this
	stream.Readable.call(self)

	self._mode = mode
	self.headers = {}
	self.rawHeaders = []
	self.trailers = {}
	self.rawTrailers = []

	// Fake the 'close' event, but only once 'end' fires
	self.on('end', function () {
		// The nextTick is necessary to prevent the 'request' module from causing an infinite loop
		process.nextTick(function () {
			self.emit('close')
		})
	})

	if (mode === 'fetch') {
		self._fetchResponse = response

		self.url = response.url
		self.statusCode = response.status
		self.statusMessage = response.statusText
		
		response.headers.forEach(function(header, key){
			self.headers[key.toLowerCase()] = header
			self.rawHeaders.push(key, header)
		})


		// TODO: this doesn't respect backpressure. Once WritableStream is available, this can be fixed
		var reader = response.body.getReader()
		function read () {
			reader.read().then(function (result) {
				if (self._destroyed)
					return
				if (result.done) {
					self.push(null)
					return
				}
				self.push(new Buffer(result.value))
				read()
			}).catch(function(err) {
				self.emit('error', err)
			})
		}
		read()

	} else {
		self._xhr = xhr
		self._pos = 0

		self.url = xhr.responseURL
		self.statusCode = xhr.status
		self.statusMessage = xhr.statusText
		var headers = xhr.getAllResponseHeaders().split(/\r?\n/)
		headers.forEach(function (header) {
			var matches = header.match(/^([^:]+):\s*(.*)/)
			if (matches) {
				var key = matches[1].toLowerCase()
				if (key === 'set-cookie') {
					if (self.headers[key] === undefined) {
						self.headers[key] = []
					}
					self.headers[key].push(matches[2])
				} else if (self.headers[key] !== undefined) {
					self.headers[key] += ', ' + matches[2]
				} else {
					self.headers[key] = matches[2]
				}
				self.rawHeaders.push(matches[1], matches[2])
			}
		})

		self._charset = 'x-user-defined'
		if (!capability.overrideMimeType) {
			var mimeType = self.rawHeaders['mime-type']
			if (mimeType) {
				var charsetMatch = mimeType.match(/;\s*charset=([^;])(;|$)/)
				if (charsetMatch) {
					self._charset = charsetMatch[1].toLowerCase()
				}
			}
			if (!self._charset)
				self._charset = 'utf-8' // best guess
		}
	}
}

inherits(IncomingMessage, stream.Readable)

IncomingMessage.prototype._read = function () {}

IncomingMessage.prototype._onXHRProgress = function () {
	var self = this

	var xhr = self._xhr

	var response = null
	switch (self._mode) {
		case 'text:vbarray': // For IE9
			if (xhr.readyState !== rStates.DONE)
				break
			try {
				// This fails in IE8
				response = new global.VBArray(xhr.responseBody).toArray()
			} catch (e) {}
			if (response !== null) {
				self.push(new Buffer(response))
				break
			}
			// Falls through in IE8	
		case 'text':
			try { // This will fail when readyState = 3 in IE9. Switch mode and wait for readyState = 4
				response = xhr.responseText
			} catch (e) {
				self._mode = 'text:vbarray'
				break
			}
			if (response.length > self._pos) {
				var newData = response.substr(self._pos)
				if (self._charset === 'x-user-defined') {
					var buffer = new Buffer(newData.length)
					for (var i = 0; i < newData.length; i++)
						buffer[i] = newData.charCodeAt(i) & 0xff

					self.push(buffer)
				} else {
					self.push(newData, self._charset)
				}
				self._pos = response.length
			}
			break
		case 'arraybuffer':
			if (xhr.readyState !== rStates.DONE || !xhr.response)
				break
			response = xhr.response
			self.push(new Buffer(new Uint8Array(response)))
			break
		case 'moz-chunked-arraybuffer': // take whole
			response = xhr.response
			if (xhr.readyState !== rStates.LOADING || !response)
				break
			self.push(new Buffer(new Uint8Array(response)))
			break
		case 'ms-stream':
			response = xhr.response
			if (xhr.readyState !== rStates.LOADING)
				break
			var reader = new global.MSStreamReader()
			reader.onprogress = function () {
				if (reader.result.byteLength > self._pos) {
					self.push(new Buffer(new Uint8Array(reader.result.slice(self._pos))))
					self._pos = reader.result.byteLength
				}
			}
			reader.onload = function () {
				self.push(null)
			}
			// reader.onerror = ??? // TODO: this
			reader.readAsArrayBuffer(response)
			break
	}

	// The ms-stream case handles end separately in reader.onload()
	if (self._xhr.readyState === rStates.DONE && self._mode !== 'ms-stream') {
		self.push(null)
	}
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5), __webpack_require__(1).Buffer, __webpack_require__(2)))

/***/ }),

/***/ 73:
/***/ (function(module, exports, __webpack_require__) {

var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(window, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(69);
exports.setImmediate = setImmediate;
exports.clearImmediate = clearImmediate;


/***/ }),

/***/ 74:
/***/ (function(module, exports, __webpack_require__) {

var Buffer = __webpack_require__(1).Buffer

module.exports = function (buf) {
	// If the buffer is backed by a Uint8Array, a faster version will work
	if (buf instanceof Uint8Array) {
		// If the buffer isn't a subarray, return the underlying ArrayBuffer
		if (buf.byteOffset === 0 && buf.byteLength === buf.buffer.byteLength) {
			return buf.buffer
		} else if (typeof buf.buffer.slice === 'function') {
			// Otherwise we need to get a proper copy
			return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength)
		}
	}

	if (Buffer.isBuffer(buf)) {
		// This is the slow version that will work with any Buffer
		// implementation (even in old browsers)
		var arrayCopy = new Uint8Array(buf.length)
		var len = buf.length
		for (var i = 0; i < len; i++) {
			arrayCopy[i] = buf[i]
		}
		return arrayCopy.buffer
	} else {
		throw new Error('Argument must be a Buffer')
	}
}


/***/ }),

/***/ 75:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  isString: function(arg) {
    return typeof(arg) === 'string';
  },
  isObject: function(arg) {
    return typeof(arg) === 'object' && arg !== null;
  },
  isNull: function(arg) {
    return arg === null;
  },
  isNullOrUndefined: function(arg) {
    return arg == null;
  }
};


/***/ }),

/***/ 76:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {
/**
 * Module exports.
 */

module.exports = deprecate;

/**
 * Mark that a method should not be used.
 * Returns a modified function which warns once by default.
 *
 * If `localStorage.noDeprecation = true` is set, then it is a no-op.
 *
 * If `localStorage.throwDeprecation = true` is set, then deprecated functions
 * will throw an Error when invoked.
 *
 * If `localStorage.traceDeprecation = true` is set, then deprecated functions
 * will invoke `console.trace()` instead of `console.error()`.
 *
 * @param {Function} fn - the function to deprecate
 * @param {String} msg - the string to print to the console when `fn` is invoked
 * @returns {Function} a new "deprecated" version of `fn`
 * @api public
 */

function deprecate (fn, msg) {
  if (config('noDeprecation')) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (config('throwDeprecation')) {
        throw new Error(msg);
      } else if (config('traceDeprecation')) {
        console.trace(msg);
      } else {
        console.warn(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
}

/**
 * Checks `localStorage` for boolean values for the given `name`.
 *
 * @param {String} name
 * @returns {Boolean}
 * @api private
 */

function config (name) {
  // accessing global.localStorage can trigger a DOMException in sandboxed iframes
  try {
    if (!global.localStorage) return false;
  } catch (_) {
    return false;
  }
  var val = global.localStorage[name];
  if (null == val) return false;
  return String(val).toLowerCase() === 'true';
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),

/***/ 77:
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),

/***/ 78:
/***/ (function(module, exports) {

module.exports = extend

var hasOwnProperty = Object.prototype.hasOwnProperty;

function extend() {
    var target = {}

    for (var i = 0; i < arguments.length; i++) {
        var source = arguments[i]

        for (var key in source) {
            if (hasOwnProperty.call(source, key)) {
                target[key] = source[key]
            }
        }
    }

    return target
}


/***/ }),

/***/ 79:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 80:
/***/ (function(module, exports, __webpack_require__) {

//
// Autogenerated by Thrift Compiler (0.7.0-en-11139b3b5cb61e817408c6e84b0e1c258bf6c6ae)
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//


  // Define types and services

  var Thrift = __webpack_require__(0).Thrift;
  var Errors = __webpack_require__(7);
  var Types = __webpack_require__(3);


  module.exports.MessageAttachmentType = {
    'NOTE' : 1,
    'NOTEBOOK' : 2
  };

  module.exports.PaginationDirection = {
    'OLDER' : 1,
    'NEWER' : 2
  };

  module.exports.MessageThreadChangeType = {
    'PARTICIPANT_ADDED' : 1,
    'PARTICIPANT_REMOVED' : 2,
    'MESSAGE_THREAD_RENAMED' : 3
  };

  module.exports.EDAM_MESSAGE_NEWEST_MESSAGE_ID = -1;

  module.exports.EDAM_MESSAGE_THREAD_CHANGE_SOMEBODY_USER_ID = 2147483647;

  module.exports.FIND_MESSAGE_FIELD_ID = 'id';

  module.exports.FIND_MESSAGE_FIELD_SENDER_ID = 'senderId';

  module.exports.FIND_MESSAGE_FIELD_THREAD_ID = 'threadId';

  module.exports.FIND_MESSAGE_FIELD_SENT_AT = 'sentAt';

  module.exports.FIND_MESSAGE_FIELD_BODY = 'body';

  module.exports.FIND_MESSAGE_FIELD_RESHARE_MESSAGE = 'reshareMessage';

  module.exports.FIND_MESSAGE_FIELD_DESTINATION_IDENTITY_IDS = 'destinationIdentityIds';

  module.exports.FIND_MESSAGE_FIELD_ATTACHMENT_GUID = 'attachmentGuid';

  module.exports.FIND_MESSAGE_FIELD_ATTACHMENT_SHARD = 'attachmentShardId';

  module.exports.FIND_MESSAGE_FIELD_ATTACHMENT_TYPE = 'attachmentType';

  module.exports.FIND_MESSAGE_FIELD_ATTACHMENT_TITLE = 'attachmentTitle';

  module.exports.FIND_MESSAGE_FIELD_ATTACHMENT_SNIPPET = 'attachmentSnippet';

  module.exports.FIND_MESSAGE_FIELD_ATTACHMENT_USER_ID = 'attachmentUserId';

  module.exports.EDAM_MESSAGE_THREAD_NAME_LEN_MIN = 1;

  module.exports.EDAM_MESSAGE_THREAD_NAME_LEN_MAX = 64;

  module.exports.EDAM_MESSAGE_THREAD_NAME_REGEX = '^[^\\p{Cc}\\p{Z}]([^\\p{Cc}\\p{Zl}\\p{Zp}]{0,62}[^\\p{Cc}\\p{Z}])?$';

  module.exports.FIND_MESSAGE_FIELDS = ['id','senderId','threadId','sentAt','body','attachmentGuid','attachmentShardId','attachmentType','attachmentTitle','attachmentSnippet'];

  module.exports.MessageAttachment = Thrift.Struct.define('MessageAttachment',  {
    1: { alias: 'guid', type: Thrift.Type.STRING },
    2: { alias: 'shardId', type: Thrift.Type.STRING },
    3: { alias: 'type', type: Thrift.Type.I32 },
    4: { alias: 'title', type: Thrift.Type.STRING },
    5: { alias: 'snippet', type: Thrift.Type.STRING },
    6: { alias: 'noteStoreUrl', type: Thrift.Type.STRING },
    7: { alias: 'userId', type: Thrift.Type.I32 },
    8: { alias: 'webApiUrlPrefix', type: Thrift.Type.STRING }
  });

  module.exports.MessageThreadChange = Thrift.Struct.define('MessageThreadChange',  {
    1: { alias: 'id', type: Thrift.Type.I64 },
    2: { alias: 'changeType', type: Thrift.Type.I32 },
    3: { alias: 'messageThreadId', type: Thrift.Type.I64 },
    4: { alias: 'changedByUserId', type: Thrift.Type.I32 },
    5: { alias: 'changedAt', type: Thrift.Type.I64 },
    6: { alias: 'eventId', type: Thrift.Type.I64 },
    7: { alias: 'stringValue', type: Thrift.Type.STRING },
    8: { alias: 'identityValue', type: Thrift.Type.STRUCT, def: Types.Identity }
  });

  module.exports.Message = Thrift.Struct.define('Message',  {
    1: { alias: 'id', type: Thrift.Type.I64 },
    2: { alias: 'senderId', type: Thrift.Type.I32 },
    3: { alias: 'messageThreadId', type: Thrift.Type.I64 },
    4: { alias: 'sentAt', type: Thrift.Type.I64 },
    5: { alias: 'body', type: Thrift.Type.STRING },
    6: { alias: 'attachments', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, module.exports.MessageAttachment)  },
    7: { alias: 'eventId', type: Thrift.Type.I64 },
    8: { alias: 'reshareMessage', type: Thrift.Type.BOOL },
    9: { alias: 'destinationIdentityIds', type: Thrift.Type.SET, def: Thrift.Set.define(Thrift.Type.I64) }
  });

  module.exports.MessageThread = Thrift.Struct.define('MessageThread',  {
    1: { alias: 'id', type: Thrift.Type.I64 },
    2: { alias: 'participantIds', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.I64)  },
    3: { alias: 'snippet', type: Thrift.Type.STRING },
    4: { alias: 'threadMaxMessageId', type: Thrift.Type.I64 },
    5: { alias: 'lastMessageSentAt', type: Thrift.Type.I64 },
    6: { alias: 'name', type: Thrift.Type.STRING },
    8: { alias: 'groupThread', type: Thrift.Type.BOOL },
    9: { alias: 'threadMaxUserMessageId', type: Thrift.Type.I64 }
  });

  module.exports.UserThread = Thrift.Struct.define('UserThread',  {
    1: { alias: 'messageThread', type: Thrift.Type.STRUCT, def: module.exports.MessageThread },
    2: { alias: 'lastReadMessageId', type: Thrift.Type.I64 },
    3: { alias: 'maxDeletedMessageId', type: Thrift.Type.I64 },
    4: { alias: 'eventId', type: Thrift.Type.I64 }
  });

  module.exports.Destination = Thrift.Struct.define('Destination',  {
    1: { alias: 'messageThreadId', type: Thrift.Type.I64 },
    2: { alias: 'recipients', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, Types.Contact)  }
  });

  module.exports.UserMessagingInfo = Thrift.Struct.define('UserMessagingInfo',  {
    1: { alias: 'threads', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, module.exports.UserThread)  },
    2: { alias: 'identities', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, Types.Identity)  }
  });

  module.exports.UserThreadInfo = Thrift.Struct.define('UserThreadInfo',  {
    1: { alias: 'messages', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, module.exports.Message)  },
    2: { alias: 'hasMore', type: Thrift.Type.BOOL },
    3: { alias: 'threadChanges', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, module.exports.MessageThreadChange)  }
  });

  module.exports.MessageFilter = Thrift.Struct.define('MessageFilter',  {
    1: { alias: 'startMessageId', type: Thrift.Type.I64 },
    2: { alias: 'direction', type: Thrift.Type.I32 }
  });

  module.exports.MessageSyncFilter = Thrift.Struct.define('MessageSyncFilter',  {
    1: { alias: 'afterEventId', type: Thrift.Type.I64 }
  });

  module.exports.MessageSyncChunk = Thrift.Struct.define('MessageSyncChunk',  {
    1: { alias: 'chunkMaxEventId', type: Thrift.Type.I64 },
    2: { alias: 'userMaxEventId', type: Thrift.Type.I64 },
    3: { alias: 'threads', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, module.exports.UserThread)  },
    4: { alias: 'messages', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, module.exports.Message)  },
    5: { alias: 'identities', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, Types.Identity)  },
    6: { alias: 'threadChanges', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, module.exports.MessageThreadChange)  }
  });

  module.exports.FindMessagesFilter = Thrift.Struct.define('FindMessagesFilter',  {
    1: { alias: 'query', type: Thrift.Type.STRING },
    2: { alias: 'sortField', type: Thrift.Type.STRING },
    3: { alias: 'reverse', type: Thrift.Type.BOOL },
    4: { alias: 'includeBlocked', type: Thrift.Type.BOOL }
  });

  module.exports.FindMessagesResultSpec = Thrift.Struct.define('FindMessagesResultSpec',  {
    1: { alias: 'includeBody', type: Thrift.Type.BOOL },
    2: { alias: 'includeAttachments', type: Thrift.Type.BOOL },
    3: { alias: 'includeDestinationIdentityIds', type: Thrift.Type.BOOL }
  });

  module.exports.FindMessagesPagination = Thrift.Struct.define('FindMessagesPagination',  {
    1: { alias: 'afterMessageId', type: Thrift.Type.I64 },
    2: { alias: 'afterOffset', type: Thrift.Type.I32 }
  });

  module.exports.FindMessagesResult = Thrift.Struct.define('FindMessagesResult',  {
    1: { alias: 'messages', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, module.exports.Message)  },
    2: { alias: 'totalMatched', type: Thrift.Type.I32 },
    3: { alias: 'nextPagination', type: Thrift.Type.STRUCT, def: module.exports.FindMessagesPagination }
  });

  module.exports.CreateMessageThreadSpec = Thrift.Struct.define('CreateMessageThreadSpec',  {
    1: { alias: 'message', type: Thrift.Type.STRUCT, def: module.exports.Message },
    2: { alias: 'participants', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, Types.Contact)  },
    3: { alias: 'messageThreadName', type: Thrift.Type.STRING },
    4: { alias: 'groupThread', type: Thrift.Type.BOOL }
  });

  module.exports.CreateMessageThreadResult = Thrift.Struct.define('CreateMessageThreadResult',  {
    1: { alias: 'messageId', type: Thrift.Type.I64 },
    2: { alias: 'messageThreadId', type: Thrift.Type.I64 },
    3: { alias: 'participantIds', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.I64)  }
  });

  module.exports.UpdateParticipantsSpec = Thrift.Struct.define('UpdateParticipantsSpec',  {
    1: { alias: 'threadId', type: Thrift.Type.I64 },
    2: { alias: 'participantsToAdd', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, Types.Contact)  },
    3: { alias: 'participantsToRemove', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.I64)  }
  });

  module.exports.UpdateParticipantsResult = Thrift.Struct.define('UpdateParticipantsResult',  {
    1: { alias: 'participantIdsToContact', type: Thrift.Type.MAP, def: Thrift.Map.define(Thrift.Type.I64, Thrift.Type.STRUCT, Types.Contact)  }
  });

  module.exports.ReinviteContactResult = Thrift.Struct.define('ReinviteContactResult',  {
    1: { alias: 'participantIds', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.I64)  }
  });

  var MessageStore = module.exports.MessageStore = {};

  MessageStore.sendMessage = Thrift.Method.define({
    alias: 'sendMessage',
    args: Thrift.Struct.define('sendMessageArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'message', type: Thrift.Type.STRUCT, def: module.exports.Message, index: 1 },
      3: { alias: 'destination', type: Thrift.Type.STRUCT, def: module.exports.Destination, index: 2 }
    }),
    result: Thrift.Struct.define('sendMessageResult', {
      0: { alias: 'returnValue',type: Thrift.Type.STRUCT, def: module.exports.Message },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      3: { alias: 'invalidContactsException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMInvalidContactsException }
    })
  });

  MessageStore.sendMessageToThread = Thrift.Method.define({
    alias: 'sendMessageToThread',
    args: Thrift.Struct.define('sendMessageToThreadArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'message', type: Thrift.Type.STRUCT, def: module.exports.Message, index: 1 }
    }),
    result: Thrift.Struct.define('sendMessageToThreadResult', {
      0: { alias: 'returnValue',type: Thrift.Type.STRUCT, def: module.exports.Message },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
    })
  });

  MessageStore.sendMessageToThreadWithoutEmails = Thrift.Method.define({
    alias: 'sendMessageToThreadWithoutEmails',
    args: Thrift.Struct.define('sendMessageToThreadWithoutEmailsArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'message', type: Thrift.Type.STRUCT, def: module.exports.Message, index: 1 }
    }),
    result: Thrift.Struct.define('sendMessageToThreadWithoutEmailsResult', {
      0: { alias: 'returnValue',type: Thrift.Type.STRUCT, def: module.exports.Message },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
    })
  });

  MessageStore.createMessageThread = Thrift.Method.define({
    alias: 'createMessageThread',
    args: Thrift.Struct.define('createMessageThreadArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'spec', type: Thrift.Type.STRUCT, def: module.exports.CreateMessageThreadSpec, index: 1 }
    }),
    result: Thrift.Struct.define('createMessageThreadResult', {
      0: { alias: 'returnValue',type: Thrift.Type.STRUCT, def: module.exports.CreateMessageThreadResult },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      3: { alias: 'invalidContactsException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMInvalidContactsException }
    })
  });

  MessageStore.createMessageThreadWithoutEmails = Thrift.Method.define({
    alias: 'createMessageThreadWithoutEmails',
    args: Thrift.Struct.define('createMessageThreadWithoutEmailsArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'spec', type: Thrift.Type.STRUCT, def: module.exports.CreateMessageThreadSpec, index: 1 }
    }),
    result: Thrift.Struct.define('createMessageThreadWithoutEmailsResult', {
      0: { alias: 'returnValue',type: Thrift.Type.STRUCT, def: module.exports.CreateMessageThreadResult },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      3: { alias: 'invalidContactsException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMInvalidContactsException }
    })
  });

  MessageStore.updateParticipants = Thrift.Method.define({
    alias: 'updateParticipants',
    args: Thrift.Struct.define('updateParticipantsArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'spec', type: Thrift.Type.STRUCT, def: module.exports.UpdateParticipantsSpec, index: 1 }
    }),
    result: Thrift.Struct.define('updateParticipantsResult', {
      0: { alias: 'returnValue',type: Thrift.Type.STRUCT, def: module.exports.UpdateParticipantsResult },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      3: { alias: 'invalidContactsException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMInvalidContactsException }
    })
  });

  MessageStore.reinviteContact = Thrift.Method.define({
    alias: 'reinviteContact',
    args: Thrift.Struct.define('reinviteContactArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'threadId', type: Thrift.Type.I64, index: 1 },
      3: { alias: 'contact', type: Thrift.Type.STRUCT, def: Types.Contact, index: 2 }
    }),
    result: Thrift.Struct.define('reinviteContactResult', {
      0: { alias: 'returnValue',type: Thrift.Type.STRUCT, def: module.exports.ReinviteContactResult },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      3: { alias: 'invalidContactsException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMInvalidContactsException }
    })
  });

  MessageStore.renameMessageThread = Thrift.Method.define({
    alias: 'renameMessageThread',
    args: Thrift.Struct.define('renameMessageThreadArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'threadId', type: Thrift.Type.I64, index: 1 },
      3: { alias: 'threadName', type: Thrift.Type.STRING, index: 2 }
    }),
    result: Thrift.Struct.define('renameMessageThreadResult', {
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
    })
  });

  MessageStore.updateReadStatus = Thrift.Method.define({
    alias: 'updateReadStatus',
    args: Thrift.Struct.define('updateReadStatusArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'threadId', type: Thrift.Type.I64, index: 1 },
      3: { alias: 'messageId', type: Thrift.Type.I64, index: 2 }
    }),
    result: Thrift.Struct.define('updateReadStatusResult', {
      0: { alias: 'returnValue',type: Thrift.Type.I64 },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
    })
  });

  MessageStore.updateDeleteStatus = Thrift.Method.define({
    alias: 'updateDeleteStatus',
    args: Thrift.Struct.define('updateDeleteStatusArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'threadId', type: Thrift.Type.I64, index: 1 },
      3: { alias: 'messageId', type: Thrift.Type.I64, index: 2 }
    }),
    result: Thrift.Struct.define('updateDeleteStatusResult', {
      0: { alias: 'returnValue',type: Thrift.Type.I64 },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
    })
  });

  MessageStore.getMessages = Thrift.Method.define({
    alias: 'getMessages',
    args: Thrift.Struct.define('getMessagesArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'threadId', type: Thrift.Type.I64, index: 1 },
      3: { alias: 'filter', type: Thrift.Type.STRUCT, def: module.exports.MessageFilter, index: 2 }
    }),
    result: Thrift.Struct.define('getMessagesResult', {
      0: { alias: 'returnValue',type: Thrift.Type.STRUCT, def: module.exports.UserThreadInfo },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
    })
  });

  MessageStore.getThreads = Thrift.Method.define({
    alias: 'getThreads',
    args: Thrift.Struct.define('getThreadsArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 }
    }),
    result: Thrift.Struct.define('getThreadsResult', {
      0: { alias: 'returnValue',type: Thrift.Type.STRUCT, def: module.exports.UserMessagingInfo },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
    })
  });

  MessageStore.getThreadIdWithUser = Thrift.Method.define({
    alias: 'getThreadIdWithUser',
    args: Thrift.Struct.define('getThreadIdWithUserArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'user', type: Thrift.Type.STRUCT, def: Types.User, index: 1 }
    }),
    result: Thrift.Struct.define('getThreadIdWithUserResult', {
      0: { alias: 'returnValue',type: Thrift.Type.I64 },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
    })
  });

  MessageStore.getMessageSyncChunk = Thrift.Method.define({
    alias: 'getMessageSyncChunk',
    args: Thrift.Struct.define('getMessageSyncChunkArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'filter', type: Thrift.Type.STRUCT, def: module.exports.MessageSyncFilter, index: 1 }
    }),
    result: Thrift.Struct.define('getMessageSyncChunkResult', {
      0: { alias: 'returnValue',type: Thrift.Type.STRUCT, def: module.exports.MessageSyncChunk },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
    })
  });

  MessageStore.updateBlockStatus = Thrift.Method.define({
    alias: 'updateBlockStatus',
    args: Thrift.Struct.define('updateBlockStatusArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'userId', type: Thrift.Type.I32, index: 1 },
      3: { alias: 'blockStatus', type: Thrift.Type.BOOL, index: 2 }
    }),
    result: Thrift.Struct.define('updateBlockStatusResult', {
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
    })
  });

  MessageStore.findMessages = Thrift.Method.define({
    alias: 'findMessages',
    args: Thrift.Struct.define('findMessagesArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'filter', type: Thrift.Type.STRUCT, def: module.exports.FindMessagesFilter, index: 1 },
      3: { alias: 'resultSpec', type: Thrift.Type.STRUCT, def: module.exports.FindMessagesResultSpec, index: 2 },
      4: { alias: 'maxMessages', type: Thrift.Type.I32, index: 3 },
      5: { alias: 'pagination', type: Thrift.Type.STRUCT, def: module.exports.FindMessagesPagination, index: 4 }
    }),
    result: Thrift.Struct.define('findMessagesResult', {
      0: { alias: 'returnValue',type: Thrift.Type.STRUCT, def: module.exports.FindMessagesResult },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
    })
  });

  MessageStore.validateRecipients = Thrift.Method.define({
    alias: 'validateRecipients',
    args: Thrift.Struct.define('validateRecipientsArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'contacts', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, Types.Contact) , index: 1 }
    }),
    result: Thrift.Struct.define('validateRecipientsResult', {
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      3: { alias: 'invalidContactsException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMInvalidContactsException }
    })
  });

  MessageStore.validateContacts = Thrift.Method.define({
    alias: 'validateContacts',
    args: Thrift.Struct.define('validateContactsArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'contacts', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, Types.Contact) , index: 1 }
    }),
    result: Thrift.Struct.define('validateContactsResult', {
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      3: { alias: 'invalidContactsException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMInvalidContactsException }
    })
  });

  MessageStore.getAttachmentMessagesReceived = Thrift.Method.define({
    alias: 'getAttachmentMessagesReceived',
    args: Thrift.Struct.define('getAttachmentMessagesReceivedArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 }
    }),
    result: Thrift.Struct.define('getAttachmentMessagesReceivedResult', {
      0: { alias: 'returnValue',type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, module.exports.Message)  },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
    })
  });

  // Define MessageStore Client

  function MessageStoreClient(output) {
    this.output = output;
    this.seqid = 0;
  }

  MessageStoreClient.prototype.sendMessage = function(authenticationToken, message, destination, callback) {
    var mdef = MessageStore.sendMessage;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.message = message;
    args.destination = destination;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  MessageStoreClient.prototype.sendMessageToThread = function(authenticationToken, message, callback) {
    var mdef = MessageStore.sendMessageToThread;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.message = message;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  MessageStoreClient.prototype.sendMessageToThreadWithoutEmails = function(authenticationToken, message, callback) {
    var mdef = MessageStore.sendMessageToThreadWithoutEmails;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.message = message;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  MessageStoreClient.prototype.createMessageThread = function(authenticationToken, spec, callback) {
    var mdef = MessageStore.createMessageThread;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.spec = spec;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  MessageStoreClient.prototype.createMessageThreadWithoutEmails = function(authenticationToken, spec, callback) {
    var mdef = MessageStore.createMessageThreadWithoutEmails;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.spec = spec;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  MessageStoreClient.prototype.updateParticipants = function(authenticationToken, spec, callback) {
    var mdef = MessageStore.updateParticipants;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.spec = spec;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  MessageStoreClient.prototype.reinviteContact = function(authenticationToken, threadId, contact, callback) {
    var mdef = MessageStore.reinviteContact;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.threadId = threadId;
    args.contact = contact;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  MessageStoreClient.prototype.renameMessageThread = function(authenticationToken, threadId, threadName, callback) {
    var mdef = MessageStore.renameMessageThread;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.threadId = threadId;
    args.threadName = threadName;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  MessageStoreClient.prototype.updateReadStatus = function(authenticationToken, threadId, messageId, callback) {
    var mdef = MessageStore.updateReadStatus;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.threadId = threadId;
    args.messageId = messageId;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  MessageStoreClient.prototype.updateDeleteStatus = function(authenticationToken, threadId, messageId, callback) {
    var mdef = MessageStore.updateDeleteStatus;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.threadId = threadId;
    args.messageId = messageId;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  MessageStoreClient.prototype.getMessages = function(authenticationToken, threadId, filter, callback) {
    var mdef = MessageStore.getMessages;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.threadId = threadId;
    args.filter = filter;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  MessageStoreClient.prototype.getThreads = function(authenticationToken, callback) {
    var mdef = MessageStore.getThreads;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  MessageStoreClient.prototype.getThreadIdWithUser = function(authenticationToken, user, callback) {
    var mdef = MessageStore.getThreadIdWithUser;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.user = user;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  MessageStoreClient.prototype.getMessageSyncChunk = function(authenticationToken, filter, callback) {
    var mdef = MessageStore.getMessageSyncChunk;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.filter = filter;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  MessageStoreClient.prototype.updateBlockStatus = function(authenticationToken, userId, blockStatus, callback) {
    var mdef = MessageStore.updateBlockStatus;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.userId = userId;
    args.blockStatus = blockStatus;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  MessageStoreClient.prototype.findMessages = function(authenticationToken, filter, resultSpec, maxMessages, pagination, callback) {
    var mdef = MessageStore.findMessages;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.filter = filter;
    args.resultSpec = resultSpec;
    args.maxMessages = maxMessages;
    args.pagination = pagination;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  MessageStoreClient.prototype.validateRecipients = function(authenticationToken, contacts, callback) {
    var mdef = MessageStore.validateRecipients;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.contacts = contacts;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  MessageStoreClient.prototype.validateContacts = function(authenticationToken, contacts, callback) {
    var mdef = MessageStore.validateContacts;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.contacts = contacts;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  MessageStoreClient.prototype.getAttachmentMessagesReceived = function(authenticationToken, callback) {
    var mdef = MessageStore.getAttachmentMessagesReceived;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  module.exports.MessageStore.Client = MessageStoreClient;

  // Define MessageStore Server

  function MessageStoreServer(service, stransport, Protocol) {
    var methodName;
      this.service = service;
      this.stransport = stransport;
      this.processor = new Thrift.Processor();
      for (methodName in MessageStore) {
        if (service[methodName]) {
          this.processor.addMethod(MessageStore[methodName], service[methodName].bind(service));
        }
      }
      this.stransport.process = function (input, output, noop) {
      var inprot = new Protocol(input);
      var outprot = new Protocol(output);
      this.processor.process(inprot, outprot, noop);
    }.bind(this);
  }

  MessageStoreServer.prototype.start = function () {
    this.stransport.listen();
  };
  MessageStoreServer.prototype.stop = function () {
    this.stransport.close();
  };

  module.exports.MessageStore.Server = MessageStoreServer;



/***/ }),

/***/ 81:
/***/ (function(module, exports, __webpack_require__) {

module.exports = {
  Admin: __webpack_require__(88),
  AuthenticationErrors: __webpack_require__(83),
  AuthenticationService: __webpack_require__(89),
  AuthenticationTypes: __webpack_require__(41),
  BusinessService: __webpack_require__(86),
  CommerceInternal: __webpack_require__(84),
  CommunicationEngine: __webpack_require__(90),
  CommunicationEngineClient: __webpack_require__(91),
  CommunicationEngineClientV2: __webpack_require__(92),
  CommunicationEngineTypes: __webpack_require__(43),
  CommunicationEngineTypesV2: __webpack_require__(44),
  Errors: __webpack_require__(7),
  Limits: __webpack_require__(24),
  MembershipService: __webpack_require__(45),
  MessageStore: __webpack_require__(80),
  NoteStore: __webpack_require__(42),
  SpaceService: __webpack_require__(39),
  TeamSearch: __webpack_require__(93),
  Types: __webpack_require__(3),
  UserStore: __webpack_require__(46),
  Utility: __webpack_require__(82)
}


/***/ }),

/***/ 82:
/***/ (function(module, exports, __webpack_require__) {

//
// Autogenerated by Thrift Compiler (0.7.0-en-11139b3b5cb61e817408c6e84b0e1c258bf6c6ae)
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//


  // Define types and services

  var Thrift = __webpack_require__(0).Thrift;
  var Errors = __webpack_require__(7);
  var Types = __webpack_require__(3);
  var MessageStore = __webpack_require__(80);
  var NoteStore = __webpack_require__(42);
  var AuthenticationTypes = __webpack_require__(41);
  var SpaceService = __webpack_require__(39);


  module.exports.MarketingEmailType = {
    'DESKTOP_UPSELL' : 1,
    'CLIPPER_UPSELL' : 2,
    'MOBILE_UPSELL' : 3
  };

  module.exports.TsdType = {
    'REGULAR_TSD' : 1,
    'TARGETED_UPSELL' : 2
  };

  module.exports.TsdTiming = {
    'SUITABLE' : 1,
    'BEFORE_FLE' : 2,
    'AFTER_FLE' : 3,
    'IMMEDIATELY' : 4,
    'NOTE_CLOSE' : 5
  };

  module.exports.TsdVariation = {
    'DIALOG_VAR1' : 1,
    'FULLSCREEN1BUTTON_DISMISS' : 2,
    'FULLSCREEN1BUTTON_NODISMISS' : 3,
    'FULLSCREEN1BUTTON_TIERPATH' : 4,
    'FULLSCREEN1BUTTON_VAR2' : 5,
    'FULLSCREEN3BUTTONS_DEFAULT' : 6,
    'FULLSCREEN3BUTTONS_DISMISS' : 7,
    'FULLSCREEN3BUTTONS_NODISMISS' : 8,
    'FULLSCREEN3BUTTONS_BEFOREFLE' : 14,
    'MODAL_DEFAULT' : 9,
    'NOTIFICATION_ASPIRATIONAL' : 10,
    'NOTIFICATION_STORAGE' : 11,
    'SHEET_ASPIRATIONAL' : 12,
    'SHEET_STORAGE' : 13,
    'BANNER_LEARNMORE' : 16,
    'BANNER_UPGRADE' : 17,
    'FULLSCREEN_SINGLESDAY' : 18,
    'FULLSCREEN_DISCOUNT' : 19,
    'FULLSCREEN_NEWYEAR' : 20,
    'TEST_UNSUPPORTED' : 15
  };

  module.exports.IncentiveType = {
    'GNOME_FIFTY_PERCENT_OFF' : 1,
    'GNOME_TWENTY_FIVE_PERCENT_OFF' : 2,
    'GNOME_FORTY_PERCENT_OFF' : 3,
    'GNOME_TEN_PERCENT_OFF' : 4,
    'GNOME_ONE_MONTH_TRIAL' : 5,
    'GNOME_THREE_MONTHS_FREE' : 6,
    'GNOME_SIX_MONTHS_FREE' : 7
  };

  module.exports.RelatedContentSourceType = {
    'NEWS' : 1,
    'PROFILE' : 2,
    'REFERENCE' : 3
  };

  module.exports.SurveyEntityType = {
    'NOTE' : 1,
    'NOTEBOOK' : 2
  };

  module.exports.SurveyStatus = {
    'OPEN' : 0,
    'FINALIZED' : 1,
    'CLOSED' : 100
  };

  module.exports.SurveyItemStatus = {
    'OPEN' : 0,
    'FINALIZED' : 1
  };

  module.exports.FeatureKey = {
    'WORKSPACES' : 0,
    'AUDITING' : 1
  };

  module.exports.BetaFeatureEnrollmentStatus = {
    'WAITLISTED' : 0,
    'ENROLLED' : 1,
    'ENABLED' : 2,
    'DISABLED' : 3
  };

  module.exports.PinnedEntityType = {
    'NOTE' : 0,
    'NOTEBOOK' : 1,
    'EXTERNAL' : 2
  };

  module.exports.OAUTH_CREDENTIAL_SERVICE_GOOGLE_CONNECT = 1;

  module.exports.OAUTH_CREDENTIAL_SERVICE_GOOGLE_GLASS = 2;

  module.exports.OAUTH_CREDENTIAL_SERVICE_FACEBOOK = 3;

  module.exports.OAUTH_CREDENTIAL_SERVICE_LINKEDIN = 4;

  module.exports.OAUTH_CREDENTIAL_SERVICE_WSJ = 5;

  module.exports.OAUTH_CREDENTIAL_SERVICE_NIKKEI = 6;

  module.exports.OAUTH_CREDENTIAL_SERVICE_SALESFORCE = 7;

  module.exports.OAUTH_CREDENTIAL_SERVICE_IDS = [1,2,3,4,5,6,7];

  module.exports.OAUTH_CREDENTIAL_SCOPE_GOOGLE_CONTACTS = '/m8/feeds';

  module.exports.OAUTH_CREDENTIAL_SCOPE_GOOGLE_DRIVE = '/auth/drive';

  module.exports.OAUTH_CREDENTIAL_SCOPE_GOOGLE_CALENDAR = '/auth/calendar';

  module.exports.OPENID_SCOPE_GOOGLE_OPENID = 'openid';

  module.exports.OPENID_SCOPE_GOOGLE_EMAIL = 'email';

  module.exports.OPENID_SCOPE_GOOGLE_PROFILE = 'profile';

  module.exports.OAUTH_CREDENTIAL_GOOGLE_SCOPES = ['/m8/feeds','/auth/drive','/auth/calendar'];

  module.exports.OPENID_SCOPES_GOOGLE = ['openid','email','profile'];

  module.exports.EDAM_OAUTH_SCOPE_LEN_MAX = 4096;

  module.exports.EDAM_OAUTH_SCOPE_LEN_MIN = 0;

  module.exports.EDAM_OAUTH_VERSION_1 = 1;

  module.exports.EDAM_OAUTH_VERSION_2 = 2;

  module.exports.EDAM_OAUTH_VERSIONS = [1,2];

  module.exports.MAX_SERVICE_UPDATED_FROM_NOTES_REQUEST_SIZE_LIMIT = 32;

  module.exports.EDAM_CLIENT_TYPE_ION = 'ion';

  module.exports.EDAM_CLIENT_TYPE_DASHBOARDS = 'dashboards';

  module.exports.EDAM_CLIENT_TYPES = ['ion','dashboards'];

  module.exports.SPACE_FLE_VIEW_SPACE_PROMPT = 'onboarding_ViewSpace_Prompt';

  module.exports.SPACE_FLE_VIEW_SPACE_INTRO = 'onboarding_ViewSpace_Intro';

  module.exports.SPACE_FLE_VIEW_DIRECTORY_INTRO = 'onboarding_SpaceDirectory_Intro';

  module.exports.SPACE_FLE_KEYS = ['onboarding_ViewSpace_Prompt','onboarding_ViewSpace_Intro','onboarding_SpaceDirectory_Intro'];

  module.exports.SupportTicket = Thrift.Struct.define('SupportTicket',  {
    1: { alias: 'applicationVersion', type: Thrift.Type.STRING },
    2: { alias: 'contactEmail', type: Thrift.Type.STRING },
    3: { alias: 'osInfo', type: Thrift.Type.STRING },
    4: { alias: 'deviceInfo', type: Thrift.Type.STRING },
    5: { alias: 'carrierInfo', type: Thrift.Type.STRING },
    6: { alias: 'connectionInfo', type: Thrift.Type.STRING },
    7: { alias: 'logFile', type: Thrift.Type.STRUCT, def: Types.Data },
    8: { alias: 'subject', type: Thrift.Type.STRING },
    9: { alias: 'issueDescription', type: Thrift.Type.STRING },
    10: { alias: 'tags', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRING)  }
  });

  module.exports.AppFeedback = Thrift.Struct.define('AppFeedback',  {
    1: { alias: 'rating', type: Thrift.Type.BYTE },
    2: { alias: 'feedback', type: Thrift.Type.STRUCT, def: module.exports.SupportTicket },
    3: { alias: 'requestFollowup', type: Thrift.Type.BOOL },
    4: { alias: 'ratingPerformance', type: Thrift.Type.BYTE },
    5: { alias: 'ratingFeatures', type: Thrift.Type.BYTE },
    6: { alias: 'ratingStability', type: Thrift.Type.BYTE },
    7: { alias: 'ratingEaseOfUse', type: Thrift.Type.BYTE },
    8: { alias: 'ratingTranslation', type: Thrift.Type.BYTE }
  });

  module.exports.MarketingEmailParameters = Thrift.Struct.define('MarketingEmailParameters',  {
    1: { alias: 'marketingEmailType', type: Thrift.Type.I32 }
  });

  module.exports.CrossPromotionInfo = Thrift.Struct.define('CrossPromotionInfo',  {
    1: { alias: 'usesEvernoteWindows', type: Thrift.Type.BOOL },
    2: { alias: 'usesEvernoteMac', type: Thrift.Type.BOOL },
    3: { alias: 'usesEvernoteIOS', type: Thrift.Type.BOOL },
    4: { alias: 'usesEvernoteAndroid', type: Thrift.Type.BOOL },
    5: { alias: 'usesWebClipper', type: Thrift.Type.BOOL },
    6: { alias: 'usesClearly', type: Thrift.Type.BOOL },
    7: { alias: 'usesFoodIOS', type: Thrift.Type.BOOL },
    8: { alias: 'usesFoodAndroid', type: Thrift.Type.BOOL },
    9: { alias: 'usesPenultimateIOS', type: Thrift.Type.BOOL },
    10: { alias: 'usesSkitchWindows', type: Thrift.Type.BOOL },
    11: { alias: 'usesSkitchMac', type: Thrift.Type.BOOL },
    12: { alias: 'usesSkitchIOS', type: Thrift.Type.BOOL },
    13: { alias: 'usesSkitchAndroid', type: Thrift.Type.BOOL },
    14: { alias: 'usesEvernoteSalesforce', type: Thrift.Type.BOOL }
  });

  module.exports.FriendReferral = Thrift.Struct.define('FriendReferral',  {
    1: { alias: 'created', type: Thrift.Type.I64 },
    2: { alias: 'email', type: Thrift.Type.STRING },
    3: { alias: 'referredUserId', type: Thrift.Type.I32 },
    4: { alias: 'pointsEarned', type: Thrift.Type.I32 }
  });

  module.exports.OAuthCredential = Thrift.Struct.define('OAuthCredential',  {
    1: { alias: 'serviceId', type: Thrift.Type.I16 },
    2: { alias: 'oAuthVersion', type: Thrift.Type.I16 },
    3: { alias: 'accessToken', type: Thrift.Type.STRING },
    4: { alias: 'scope', type: Thrift.Type.STRING },
    5: { alias: 'created', type: Thrift.Type.I64 },
    6: { alias: 'updated', type: Thrift.Type.I64 },
    7: { alias: 'expires', type: Thrift.Type.I64 },
    8: { alias: 'refreshAfter', type: Thrift.Type.I64 },
    9: { alias: 'instanceUrl', type: Thrift.Type.STRING }
  });

  module.exports.RelatedContentSourcePreference = Thrift.Struct.define('RelatedContentSourcePreference',  {
    1: { alias: 'sourceId', type: Thrift.Type.STRING },
    2: { alias: 'activated', type: Thrift.Type.BOOL },
    3: { alias: 'sourceName', type: Thrift.Type.STRING },
    4: { alias: 'sourceUrl', type: Thrift.Type.STRING },
    5: { alias: 'faviconUrl', type: Thrift.Type.STRING },
    6: { alias: 'sourceDescription', type: Thrift.Type.STRING },
    7: { alias: 'sourceType', type: Thrift.Type.I32 }
  });

  module.exports.RelatedContentProfile = Thrift.Struct.define('RelatedContentProfile',  {
    1: { alias: 'id', type: Thrift.Type.STRING },
    2: { alias: 'sourceId', type: Thrift.Type.STRING },
    3: { alias: 'userId', type: Thrift.Type.I32 },
    4: { alias: 'type', type: Thrift.Type.I32 },
    5: { alias: 'fullName', type: Thrift.Type.STRING },
    6: { alias: 'callingName', type: Thrift.Type.STRING },
    7: { alias: 'photoUrl', type: Thrift.Type.STRING },
    8: { alias: 'shortDescription', type: Thrift.Type.STRING },
    9: { alias: 'longDescription', type: Thrift.Type.STRING },
    10: { alias: 'contactUrls', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRING)  },
    11: { alias: 'organizations', type: Thrift.Type.MAP, def: Thrift.Map.define(Thrift.Type.STRING, Thrift.Type.STRING )  }
  });

  module.exports.RelatedContentProfilePage = Thrift.Struct.define('RelatedContentProfilePage',  {
    1: { alias: 'relatedContentProfile', type: Thrift.Type.STRUCT, def: module.exports.RelatedContentProfile },
    2: { alias: 'userProfile', type: Thrift.Type.STRUCT, def: Types.UserProfile }
  });

  module.exports.PromotionStatus = Thrift.Struct.define('PromotionStatus',  {
    1: { alias: 'promotionId', type: Thrift.Type.STRING },
    2: { alias: 'optedOut', type: Thrift.Type.BOOL },
    3: { alias: 'shownCount', type: Thrift.Type.I32 },
    4: { alias: 'timeLastShown', type: Thrift.Type.I64 }
  });

  module.exports.RealTimeAuthentication = Thrift.Struct.define('RealTimeAuthentication',  {
    1: { alias: 'authenticationToken', type: Thrift.Type.STRING }
  });

  module.exports.RealTimePing = Thrift.Struct.define('RealTimePing');

  module.exports.RealTimeRequest = Thrift.Struct.define('RealTimeRequest',  {
    1: { alias: 'realTimeAuthentication', type: Thrift.Type.STRUCT, def: module.exports.RealTimeAuthentication },
    2: { alias: 'realTimePing', type: Thrift.Type.STRUCT, def: module.exports.RealTimePing }
  });

  module.exports.RealTimeAuthenticationResult = Thrift.Struct.define('RealTimeAuthenticationResult',  {
    1: { alias: 'pingFrequency', type: Thrift.Type.I16 },
    2: { alias: 'userMaxMessageEventId', type: Thrift.Type.I64 }
  });

  module.exports.RealTimeNotePermissionsResult = Thrift.Struct.define('RealTimeNotePermissionsResult',  {
    1: { alias: 'userId', type: Thrift.Type.I32 },
    2: { alias: 'byOwnerToken', type: Thrift.Type.STRUCT, def: Types.NoteRestrictions },
    3: { alias: 'byBusinessToken', type: Thrift.Type.STRUCT, def: Types.NoteRestrictions }
  });

  module.exports.MessageNotification = Thrift.Struct.define('MessageNotification',  {
    1: { alias: 'syncChunk', type: Thrift.Type.STRUCT, def: MessageStore.MessageSyncChunk },
    2: { alias: 'previousEventId', type: Thrift.Type.I64 }
  });

  module.exports.RealTimeNotification = Thrift.Struct.define('RealTimeNotification',  {
    1: { alias: 'authenticationResult', type: Thrift.Type.STRUCT, def: module.exports.RealTimeAuthenticationResult },
    2: { alias: 'messageNotification', type: Thrift.Type.STRUCT, def: module.exports.MessageNotification },
    3: { alias: 'realTimePing', type: Thrift.Type.STRUCT, def: module.exports.RealTimePing }
  });

  module.exports.MessagingInvitation = Thrift.Struct.define('MessagingInvitation',  {
    1: { alias: 'id', type: Thrift.Type.STRING },
    2: { alias: 'senderUserId', type: Thrift.Type.I32 },
    3: { alias: 'senderFullName', type: Thrift.Type.STRING },
    4: { alias: 'senderPhoto', type: Thrift.Type.BINARY },
    5: { alias: 'invitedIdentityId', type: Thrift.Type.I64 },
    6: { alias: 'invitedContactId', type: Thrift.Type.STRING },
    7: { alias: 'invitedContactType', type: Thrift.Type.I32 },
    8: { alias: 'msgCount', type: Thrift.Type.I32 },
    9: { alias: 'firstMsgSentAt', type: Thrift.Type.I64 },
    10: { alias: 'created', type: Thrift.Type.I64 },
    11: { alias: 'threadId', type: Thrift.Type.I64 }
  });

  module.exports.TeamStarterPackRequest = Thrift.Struct.define('TeamStarterPackRequest',  {
    1: { alias: 'commerceService', type: Thrift.Type.STRING },
    2: { alias: 'appStoreLocale', type: Thrift.Type.STRING }
  });

  module.exports.TeamStarterPackResult = Thrift.Struct.define('TeamStarterPackResult',  {
    1: { alias: 'canPurchaseTeamStarterPack', type: Thrift.Type.BOOL },
    2: { alias: 'sku', type: Thrift.Type.STRING },
    3: { alias: 'seats', type: Thrift.Type.I32 },
    4: { alias: 'months', type: Thrift.Type.I32 }
  });

  module.exports.TierSelectionDisplayEligibilityRequest = Thrift.Struct.define('TierSelectionDisplayEligibilityRequest',  {
    1: { alias: 'numSessionsLast7Days', type: Thrift.Type.I32 },
    2: { alias: 'numSessionsLast30Days', type: Thrift.Type.I32 },
    3: { alias: 'numDaysActiveLast7Days', type: Thrift.Type.I32 },
    4: { alias: 'numDaysActiveLast30Days', type: Thrift.Type.I32 },
    5: { alias: 'teamStarterPackRequest', type: Thrift.Type.STRUCT, def: module.exports.TeamStarterPackRequest }
  });

  module.exports.TierSelectionDisplayEligibilityResult = Thrift.Struct.define('TierSelectionDisplayEligibilityResult',  {
    1: { alias: 'shouldShowTsd', type: Thrift.Type.BOOL },
    2: { alias: 'timeToLive', type: Thrift.Type.I64 },
    3: { alias: 'tsdType', type: Thrift.Type.I32 },
    4: { alias: 'tsdTiming', type: Thrift.Type.SET, def: Thrift.Set.define(Thrift.Type.I32) },
    5: { alias: 'tsdVariation', type: Thrift.Type.I32 },
    6: { alias: 'subscriptionInfo', type: Thrift.Type.STRUCT, def: Types.SubscriptionInfo },
    7: { alias: 'teamStarterPackResult', type: Thrift.Type.STRUCT, def: module.exports.TeamStarterPackResult }
  });

  module.exports.MoveNotebookBetweenAccountsParams = Thrift.Struct.define('MoveNotebookBetweenAccountsParams',  {
    1: { alias: 'sourceNotebookGuid', type: Thrift.Type.STRING }
  });

  module.exports.MoveNotebooksBetweenAccountsParams = Thrift.Struct.define('MoveNotebooksBetweenAccountsParams',  {
    1: { alias: 'sourceNotebookGuids', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRING)  }
  });

  module.exports.MoveNotebooksBetweenAccountsError = Thrift.Struct.define('MoveNotebooksBetweenAccountsError',  {
    1: { alias: 'notebookGuid', type: Thrift.Type.STRING },
    2: { alias: 'errorCode', type: Thrift.Type.I32 },
    3: { alias: 'parameter', type: Thrift.Type.STRING }
  });

  module.exports.MoveNotebooksBetweenAccountsResult = Thrift.Struct.define('MoveNotebooksBetweenAccountsResult',  {
    1: { alias: 'createdNotebooks', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, Types.Notebook)  },
    2: { alias: 'failures', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, module.exports.MoveNotebooksBetweenAccountsError)  }
  });

  module.exports.MoveNoteBetweenAccountsParams = Thrift.Struct.define('MoveNoteBetweenAccountsParams',  {
    1: { alias: 'sourceNoteGuid', type: Thrift.Type.STRING },
    2: { alias: 'targetNotebookGuid', type: Thrift.Type.STRING }
  });

  module.exports.MoveNoteBetweenAccountsResult = Thrift.Struct.define('MoveNoteBetweenAccountsResult',  {
    1: { alias: 'sourceNote', type: Thrift.Type.STRUCT, def: Types.Note },
    2: { alias: 'createdNote', type: Thrift.Type.STRUCT, def: Types.Note }
  });

  module.exports.IncentiveEligibilityResult = Thrift.Struct.define('IncentiveEligibilityResult',  {
    1: { alias: 'eligibleForIncentive', type: Thrift.Type.BOOL },
    2: { alias: 'timeToLive', type: Thrift.Type.I64 },
    3: { alias: 'incentiveType', type: Thrift.Type.I32 },
    4: { alias: 'promoCode', type: Thrift.Type.STRING },
    5: { alias: 'promoSig', type: Thrift.Type.STRING }
  });

  module.exports.ConfigValuesRequest = Thrift.Struct.define('ConfigValuesRequest',  {
    1: { alias: 'keys', type: Thrift.Type.SET, def: Thrift.Set.define(Thrift.Type.STRING) }
  });

  module.exports.SurveyItemRating = Thrift.Struct.define('SurveyItemRating',  {
    1: { alias: 'surveyItemId', type: Thrift.Type.I32 },
    2: { alias: 'userId', type: Thrift.Type.I32 },
    3: { alias: 'created', type: Thrift.Type.I64 },
    4: { alias: 'updated', type: Thrift.Type.I64 },
    5: { alias: 'rating', type: Thrift.Type.I32 },
    6: { alias: 'comment', type: Thrift.Type.STRING }
  });

  module.exports.SurveyItemComment = Thrift.Struct.define('SurveyItemComment',  {
    1: { alias: 'surveyItemId', type: Thrift.Type.I32 },
    2: { alias: 'userId', type: Thrift.Type.I32 },
    3: { alias: 'created', type: Thrift.Type.I64 },
    4: { alias: 'updated', type: Thrift.Type.I64 },
    5: { alias: 'comment', type: Thrift.Type.STRING }
  });

  module.exports.Survey = Thrift.Struct.define('Survey',  {
    1: { alias: 'id', type: Thrift.Type.I32 },
    2: { alias: 'entityType', type: Thrift.Type.I32 },
    3: { alias: 'entityGuid', type: Thrift.Type.STRING },
    4: { alias: 'name', type: Thrift.Type.STRING },
    5: { alias: 'descriptionNoteGuid', type: Thrift.Type.STRING },
    6: { alias: 'isAnonymous', type: Thrift.Type.BOOL },
    7: { alias: 'useNoteForDescription', type: Thrift.Type.BOOL },
    8: { alias: 'openDate', type: Thrift.Type.I64 },
    9: { alias: 'closeDate', type: Thrift.Type.I64 },
    10: { alias: 'status', type: Thrift.Type.I32 },
    11: { alias: 'created', type: Thrift.Type.I64 },
    12: { alias: 'updated', type: Thrift.Type.I64 },
    13: { alias: 'userId', type: Thrift.Type.I32 }
  });

  module.exports.SurveyItem = Thrift.Struct.define('SurveyItem',  {
    1: { alias: 'id', type: Thrift.Type.I32 },
    2: { alias: 'surveyId', type: Thrift.Type.I32 },
    3: { alias: 'entityType', type: Thrift.Type.I32 },
    4: { alias: 'entityGuid', type: Thrift.Type.STRING },
    5: { alias: 'status', type: Thrift.Type.I32 },
    6: { alias: 'sentimentScore', type: Thrift.Type.DOUBLE },
    7: { alias: 'category', type: Thrift.Type.STRING },
    8: { alias: 'ratings', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, module.exports.SurveyItemRating)  },
    9: { alias: 'created', type: Thrift.Type.I64 },
    10: { alias: 'updated', type: Thrift.Type.I64 },
    11: { alias: 'comments', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, module.exports.SurveyItemComment)  }
  });

  module.exports.FeatureAvailability = Thrift.Struct.define('FeatureAvailability',  {
    1: { alias: 'featureKey', type: Thrift.Type.I32 },
    2: { alias: 'isAvailable', type: Thrift.Type.BOOL }
  });

  module.exports.BetaFeature = Thrift.Struct.define('BetaFeature',  {
    1: { alias: 'guid', type: Thrift.Type.STRING },
    2: { alias: 'featureKey', type: Thrift.Type.STRING },
    3: { alias: 'name', type: Thrift.Type.STRING },
    4: { alias: 'featureDescription', type: Thrift.Type.STRING },
    5: { alias: 'help', type: Thrift.Type.STRING },
    6: { alias: 'requireWaitlist', type: Thrift.Type.BOOL }
  });

  module.exports.BetaFeatureEnrollment = Thrift.Struct.define('BetaFeatureEnrollment',  {
    1: { alias: 'guid', type: Thrift.Type.STRING },
    2: { alias: 'featureGuid', type: Thrift.Type.STRING },
    3: { alias: 'featureKey', type: Thrift.Type.STRING },
    4: { alias: 'userId', type: Thrift.Type.I32 },
    5: { alias: 'businessId', type: Thrift.Type.I32 },
    6: { alias: 'status', type: Thrift.Type.I32 },
    7: { alias: 'enrollerName', type: Thrift.Type.STRING },
    8: { alias: 'disabledDate', type: Thrift.Type.I64 }
  });

  module.exports.BetaFeatureEnrollmentMapping = Thrift.Struct.define('BetaFeatureEnrollmentMapping',  {
    1: { alias: 'enrollments', type: Thrift.Type.MAP, def: Thrift.Map.define(Thrift.Type.I32, Thrift.Type.STRUCT, module.exports.BetaFeatureEnrollment)  }
  });

  module.exports.ResourcesUpdateRequest = Thrift.Struct.define('ResourcesUpdateRequest',  {
    1: { alias: 'deactivateResourcesWithBodyHashes', type: Thrift.Type.SET, def: Thrift.Set.define(Thrift.Type.STRING) },
    2: { alias: 'activateResourcesWithBodyHashes', type: Thrift.Type.SET, def: Thrift.Set.define(Thrift.Type.STRING) }
  });

  module.exports.ResourcesCreateRequest = Thrift.Struct.define('ResourcesCreateRequest',  {
    1: { alias: 'activateResourcesWithBodyHashes', type: Thrift.Type.SET, def: Thrift.Set.define(Thrift.Type.STRING) }
  });

  module.exports.NoteCardMetadata = Thrift.Struct.define('NoteCardMetadata',  {
    1: { alias: 'noteGuid', type: Thrift.Type.STRING },
    2: { alias: 'noteTitle', type: Thrift.Type.STRING },
    3: { alias: 'lastEdited', type: Thrift.Type.I64 },
    4: { alias: 'lastEditorName', type: Thrift.Type.STRING },
    5: { alias: 'snippet', type: Thrift.Type.STRING },
    6: { alias: 'lastEditorPhotoUrl', type: Thrift.Type.STRING },
    7: { alias: 'noteThumbnailUrl', type: Thrift.Type.STRING },
    8: { alias: 'notebookGuid', type: Thrift.Type.STRING }
  });

  module.exports.RecommendedNoteCardMetadata = Thrift.Struct.define('RecommendedNoteCardMetadata',  {
    1: { alias: 'noteCard', type: Thrift.Type.STRUCT, def: module.exports.NoteCardMetadata },
    2: { alias: 'jsonReason', type: Thrift.Type.STRING },
    3: { alias: 'connectedBy', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, module.exports.NoteCardMetadata)  },
    4: { alias: 'workspace', type: Thrift.Type.STRUCT, def: SpaceService.Workspace },
    5: { alias: 'isAccessible', type: Thrift.Type.BOOL }
  });

  module.exports.RecommendationRequest = Thrift.Struct.define('RecommendationRequest',  {
    1: { alias: 'workspaceGuid', type: Thrift.Type.STRING },
    2: { alias: 'profile', type: Thrift.Type.STRING }
  });

  module.exports.PinnedContent = Thrift.Struct.define('PinnedContent',  {
    1: { alias: 'workspaceGuid', type: Thrift.Type.STRING },
    2: { alias: 'entityType', type: Thrift.Type.I32 },
    3: { alias: 'entityGuid', type: Thrift.Type.STRING },
    4: { alias: 'entityUri', type: Thrift.Type.STRING },
    5: { alias: 'entityTitle', type: Thrift.Type.STRING },
    6: { alias: 'entityParentGuid', type: Thrift.Type.STRING },
    7: { alias: 'serviceCreated', type: Thrift.Type.I64 },
    8: { alias: 'serviceUpdated', type: Thrift.Type.I64 }
  });

  module.exports.NotebookSummary = Thrift.Struct.define('NotebookSummary',  {
    1: { alias: 'notebookGuid', type: Thrift.Type.STRING },
    2: { alias: 'notebookName', type: Thrift.Type.STRING },
    3: { alias: 'noteCount', type: Thrift.Type.I32 }
  });

  var Utility = module.exports.Utility = {};

  Utility.sendMarketingEmail = Thrift.Method.define({
    alias: 'sendMarketingEmail',
    args: Thrift.Struct.define('sendMarketingEmailArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'parameters', type: Thrift.Type.STRUCT, def: module.exports.MarketingEmailParameters, index: 1 }
    }),
    result: Thrift.Struct.define('sendMarketingEmailResult', {
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
    })
  });

  Utility.fileSupportTicket = Thrift.Method.define({
    alias: 'fileSupportTicket',
    args: Thrift.Struct.define('fileSupportTicketArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'ticket', type: Thrift.Type.STRUCT, def: module.exports.SupportTicket, index: 1 }
    }),
    result: Thrift.Struct.define('fileSupportTicketResult', {
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
    })
  });

  Utility.sendAppFeedback = Thrift.Method.define({
    alias: 'sendAppFeedback',
    args: Thrift.Struct.define('sendAppFeedbackArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'appFeedback', type: Thrift.Type.STRUCT, def: module.exports.AppFeedback, index: 1 }
    }),
    result: Thrift.Struct.define('sendAppFeedbackResult', {
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
    })
  });

  Utility.sendAppFeedbackForDevice = Thrift.Method.define({
    alias: 'sendAppFeedbackForDevice',
    args: Thrift.Struct.define('sendAppFeedbackForDeviceArgs', {
      1: { alias: 'deviceIdentifier', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'apiConsumerKey', type: Thrift.Type.STRING, index: 1 },
      3: { alias: 'apiConsumerSecret', type: Thrift.Type.STRING, index: 2 },
      4: { alias: 'appFeedback', type: Thrift.Type.STRUCT, def: module.exports.AppFeedback, index: 3 }
    }),
    result: Thrift.Struct.define('sendAppFeedbackForDeviceResult', {
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
    })
  });

  Utility.getCrossPromotionInfo = Thrift.Method.define({
    alias: 'getCrossPromotionInfo',
    args: Thrift.Struct.define('getCrossPromotionInfoArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 }
    }),
    result: Thrift.Struct.define('getCrossPromotionInfoResult', {
      0: { alias: 'returnValue',type: Thrift.Type.STRUCT, def: module.exports.CrossPromotionInfo },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
    })
  });

  Utility.referFriends = Thrift.Method.define({
    alias: 'referFriends',
    args: Thrift.Struct.define('referFriendsArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'referredEmails', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRING) , index: 1 }
    }),
    result: Thrift.Struct.define('referFriendsResult', {
      0: { alias: 'returnValue',type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRING)  },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
    })
  });

  Utility.listFriendReferrals = Thrift.Method.define({
    alias: 'listFriendReferrals',
    args: Thrift.Struct.define('listFriendReferralsArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 }
    }),
    result: Thrift.Struct.define('listFriendReferralsResult', {
      0: { alias: 'returnValue',type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, module.exports.FriendReferral)  },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
    })
  });

  Utility.sendVerificationEmail = Thrift.Method.define({
    alias: 'sendVerificationEmail',
    args: Thrift.Struct.define('sendVerificationEmailArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 }
    }),
    result: Thrift.Struct.define('sendVerificationEmailResult', {
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
    })
  });

  Utility.confirmEmailAddress = Thrift.Method.define({
    alias: 'confirmEmailAddress',
    args: Thrift.Struct.define('confirmEmailAddressArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 }
    }),
    result: Thrift.Struct.define('confirmEmailAddressResult', {
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
    })
  });

  Utility.getOAuthCredential = Thrift.Method.define({
    alias: 'getOAuthCredential',
    args: Thrift.Struct.define('getOAuthCredentialArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'serviceId', type: Thrift.Type.I16, index: 1 }
    }),
    result: Thrift.Struct.define('getOAuthCredentialResult', {
      0: { alias: 'returnValue',type: Thrift.Type.STRUCT, def: module.exports.OAuthCredential },
      1: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      2: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException },
      3: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException }
    })
  });

  Utility.hasOAuthCredential = Thrift.Method.define({
    alias: 'hasOAuthCredential',
    args: Thrift.Struct.define('hasOAuthCredentialArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'serviceId', type: Thrift.Type.I16, index: 1 }
    }),
    result: Thrift.Struct.define('hasOAuthCredentialResult', {
      0: { alias: 'returnValue',type: Thrift.Type.BOOL },
      1: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      2: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException }
    })
  });

  Utility.getScopedGoogleOAuthCredential = Thrift.Method.define({
    alias: 'getScopedGoogleOAuthCredential',
    args: Thrift.Struct.define('getScopedGoogleOAuthCredentialArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'googleOAuthScope', type: Thrift.Type.STRING, index: 1 }
    }),
    result: Thrift.Struct.define('getScopedGoogleOAuthCredentialResult', {
      0: { alias: 'returnValue',type: Thrift.Type.STRUCT, def: module.exports.OAuthCredential },
      1: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      2: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException },
      3: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException }
    })
  });

  Utility.hasGoogleOAuthCredential = Thrift.Method.define({
    alias: 'hasGoogleOAuthCredential',
    args: Thrift.Struct.define('hasGoogleOAuthCredentialArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'googleOAuthScope', type: Thrift.Type.STRING, index: 1 }
    }),
    result: Thrift.Struct.define('hasGoogleOAuthCredentialResult', {
      0: { alias: 'returnValue',type: Thrift.Type.BOOL },
      1: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      2: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException }
    })
  });

  Utility.setOAuthCredential = Thrift.Method.define({
    alias: 'setOAuthCredential',
    args: Thrift.Struct.define('setOAuthCredentialArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'oAuthCredential', type: Thrift.Type.STRUCT, def: module.exports.OAuthCredential, index: 1 }
    }),
    result: Thrift.Struct.define('setOAuthCredentialResult', {
      0: { alias: 'returnValue',type: Thrift.Type.STRUCT, def: module.exports.OAuthCredential },
      1: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      2: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
    })
  });

  Utility.deleteOAuthCredential = Thrift.Method.define({
    alias: 'deleteOAuthCredential',
    args: Thrift.Struct.define('deleteOAuthCredentialArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'serviceId', type: Thrift.Type.I16, index: 1 }
    }),
    result: Thrift.Struct.define('deleteOAuthCredentialResult', {
      1: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      3: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException }
    })
  });

  Utility.getUserCardScanningEndDate = Thrift.Method.define({
    alias: 'getUserCardScanningEndDate',
    args: Thrift.Struct.define('getUserCardScanningEndDateArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 }
    }),
    result: Thrift.Struct.define('getUserCardScanningEndDateResult', {
      0: { alias: 'returnValue',type: Thrift.Type.I64 },
      1: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      2: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException },
      3: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException }
    })
  });

  Utility.getPromotionStatus = Thrift.Method.define({
    alias: 'getPromotionStatus',
    args: Thrift.Struct.define('getPromotionStatusArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'promotionIds', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRING) , index: 1 }
    }),
    result: Thrift.Struct.define('getPromotionStatusResult', {
      0: { alias: 'returnValue',type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, module.exports.PromotionStatus)  },
      1: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      2: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException },
      3: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException }
    })
  });

  Utility.promotionsShown = Thrift.Method.define({
    alias: 'promotionsShown',
    args: Thrift.Struct.define('promotionsShownArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'promotionIds', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRING) , index: 1 }
    }),
    result: Thrift.Struct.define('promotionsShownResult', {
      0: { alias: 'returnValue',type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, module.exports.PromotionStatus)  },
      1: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      2: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException },
      3: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException }
    })
  });

  Utility.promotionOptedOut = Thrift.Method.define({
    alias: 'promotionOptedOut',
    args: Thrift.Struct.define('promotionOptedOutArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'promotionId', type: Thrift.Type.STRING, index: 1 }
    }),
    result: Thrift.Struct.define('promotionOptedOutResult', {
      1: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      2: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException },
      3: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException }
    })
  });

  Utility.getRelatedContentSourcePreferences = Thrift.Method.define({
    alias: 'getRelatedContentSourcePreferences',
    args: Thrift.Struct.define('getRelatedContentSourcePreferencesArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 }
    }),
    result: Thrift.Struct.define('getRelatedContentSourcePreferencesResult', {
      0: { alias: 'returnValue',type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, module.exports.RelatedContentSourcePreference)  },
      1: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      2: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException }
    })
  });

  Utility.setRelatedContentSourceActivated = Thrift.Method.define({
    alias: 'setRelatedContentSourceActivated',
    args: Thrift.Struct.define('setRelatedContentSourceActivatedArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'sourceId', type: Thrift.Type.STRING, index: 1 },
      3: { alias: 'activated', type: Thrift.Type.BOOL, index: 2 }
    }),
    result: Thrift.Struct.define('setRelatedContentSourceActivatedResult', {
      1: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      2: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException },
      3: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException }
    })
  });

  Utility.clearRelatedContentProfiles = Thrift.Method.define({
    alias: 'clearRelatedContentProfiles',
    args: Thrift.Struct.define('clearRelatedContentProfilesArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'sourceId', type: Thrift.Type.STRING, index: 1 }
    }),
    result: Thrift.Struct.define('clearRelatedContentProfilesResult', {
      1: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      2: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException }
    })
  });

  Utility.addRelatedContentProfiles = Thrift.Method.define({
    alias: 'addRelatedContentProfiles',
    args: Thrift.Struct.define('addRelatedContentProfilesArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'profiles', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, module.exports.RelatedContentProfile) , index: 1 }
    }),
    result: Thrift.Struct.define('addRelatedContentProfilesResult', {
      1: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      2: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException }
    })
  });

  Utility.updateRelatedContentProfiles = Thrift.Method.define({
    alias: 'updateRelatedContentProfiles',
    args: Thrift.Struct.define('updateRelatedContentProfilesArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'sourceId', type: Thrift.Type.STRING, index: 1 }
    }),
    result: Thrift.Struct.define('updateRelatedContentProfilesResult', {
      1: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      2: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException }
    })
  });

  Utility.getRelatedContentProfilePage = Thrift.Method.define({
    alias: 'getRelatedContentProfilePage',
    args: Thrift.Struct.define('getRelatedContentProfilePageArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'profileId', type: Thrift.Type.STRING, index: 1 }
    }),
    result: Thrift.Struct.define('getRelatedContentProfilePageResult', {
      0: { alias: 'returnValue',type: Thrift.Type.STRUCT, def: module.exports.RelatedContentProfilePage },
      1: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      2: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException }
    })
  });

  Utility.importNotesFromEnex = Thrift.Method.define({
    alias: 'importNotesFromEnex',
    args: Thrift.Struct.define('importNotesFromEnexArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'enexUrl', type: Thrift.Type.STRING, index: 1 },
      3: { alias: 'notebookGuid', type: Thrift.Type.STRING, index: 2 },
      4: { alias: 'importNoteTags', type: Thrift.Type.BOOL, index: 3 },
      5: { alias: 'importNoteCreated', type: Thrift.Type.BOOL, index: 4 },
      6: { alias: 'importNoteUpdated', type: Thrift.Type.BOOL, index: 5 }
    }),
    result: Thrift.Struct.define('importNotesFromEnexResult', {
      1: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      2: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException },
      3: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException }
    })
  });

  Utility.setUserProfilePhoto = Thrift.Method.define({
    alias: 'setUserProfilePhoto',
    args: Thrift.Struct.define('setUserProfilePhotoArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'photo', type: Thrift.Type.BINARY, index: 1 }
    }),
    result: Thrift.Struct.define('setUserProfilePhotoResult', {
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
    })
  });

  Utility.removeUserProfilePhoto = Thrift.Method.define({
    alias: 'removeUserProfilePhoto',
    args: Thrift.Struct.define('removeUserProfilePhotoArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 }
    }),
    result: Thrift.Struct.define('removeUserProfilePhotoResult', {
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
    })
  });

  Utility.setUserFullName = Thrift.Method.define({
    alias: 'setUserFullName',
    args: Thrift.Struct.define('setUserFullNameArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'name', type: Thrift.Type.STRING, index: 1 }
    }),
    result: Thrift.Struct.define('setUserFullNameResult', {
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
    })
  });

  Utility.getMessageInvitation = Thrift.Method.define({
    alias: 'getMessageInvitation',
    args: Thrift.Struct.define('getMessageInvitationArgs', {
      1: { alias: 'messageInvitationId', type: Thrift.Type.STRING, index: 0 }
    }),
    result: Thrift.Struct.define('getMessageInvitationResult', {
      0: { alias: 'returnValue',type: Thrift.Type.STRUCT, def: module.exports.MessagingInvitation },
      1: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      2: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException },
      3: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException }
    })
  });

  Utility.claimMessageInvitation = Thrift.Method.define({
    alias: 'claimMessageInvitation',
    args: Thrift.Struct.define('claimMessageInvitationArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'messageInvitationId', type: Thrift.Type.STRING, index: 1 }
    }),
    result: Thrift.Struct.define('claimMessageInvitationResult', {
      1: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      2: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException },
      3: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException }
    })
  });

  Utility.canPurchaseTeamStarterPack = Thrift.Method.define({
    alias: 'canPurchaseTeamStarterPack',
    args: Thrift.Struct.define('canPurchaseTeamStarterPackArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'request', type: Thrift.Type.STRUCT, def: module.exports.TeamStarterPackRequest, index: 1 }
    }),
    result: Thrift.Struct.define('canPurchaseTeamStarterPackResult', {
      0: { alias: 'returnValue',type: Thrift.Type.STRUCT, def: module.exports.TeamStarterPackResult },
      1: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      2: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException }
    })
  });

  Utility.getTsdEligibility = Thrift.Method.define({
    alias: 'getTsdEligibility',
    args: Thrift.Struct.define('getTsdEligibilityArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'request', type: Thrift.Type.STRUCT, def: module.exports.TierSelectionDisplayEligibilityRequest, index: 1 }
    }),
    result: Thrift.Struct.define('getTsdEligibilityResult', {
      0: { alias: 'returnValue',type: Thrift.Type.STRUCT, def: module.exports.TierSelectionDisplayEligibilityResult },
      1: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      2: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
    })
  });

  Utility.updatePassword = Thrift.Method.define({
    alias: 'updatePassword',
    args: Thrift.Struct.define('updatePasswordArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'oldPassword', type: Thrift.Type.STRING, index: 1 },
      3: { alias: 'newPassword', type: Thrift.Type.STRING, index: 2 }
    }),
    result: Thrift.Struct.define('updatePasswordResult', {
      1: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      2: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
    })
  });

  Utility.getIncentiveEligibility = Thrift.Method.define({
    alias: 'getIncentiveEligibility',
    args: Thrift.Struct.define('getIncentiveEligibilityArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 }
    }),
    result: Thrift.Struct.define('getIncentiveEligibilityResult', {
      0: { alias: 'returnValue',type: Thrift.Type.STRUCT, def: module.exports.IncentiveEligibilityResult },
      1: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      3: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException }
    })
  });

  Utility.invalidateGoogleOauthCredential = Thrift.Method.define({
    alias: 'invalidateGoogleOauthCredential',
    args: Thrift.Struct.define('invalidateGoogleOauthCredentialArgs', {
      1: { alias: 'authToken', type: Thrift.Type.STRING, index: 0 }
    }),
    result: Thrift.Struct.define('invalidateGoogleOauthCredentialResult', {
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
    })
  });

  Utility.associateOpenIDWithUser = Thrift.Method.define({
    alias: 'associateOpenIDWithUser',
    args: Thrift.Struct.define('associateOpenIDWithUserArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'credential', type: Thrift.Type.STRUCT, def: AuthenticationTypes.OpenIdCredential, index: 1 }
    }),
    result: Thrift.Struct.define('associateOpenIDWithUserResult', {
      1: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      2: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
    })
  });

  Utility.dissociateOpenIDFromUser = Thrift.Method.define({
    alias: 'dissociateOpenIDFromUser',
    args: Thrift.Struct.define('dissociateOpenIDFromUserArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'credential', type: Thrift.Type.STRUCT, def: AuthenticationTypes.OpenIdCredential, index: 1 }
    }),
    result: Thrift.Struct.define('dissociateOpenIDFromUserResult', {
      1: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      2: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
    })
  });

  Utility.dissociateAllOpenIDsFromUser = Thrift.Method.define({
    alias: 'dissociateAllOpenIDsFromUser',
    args: Thrift.Struct.define('dissociateAllOpenIDsFromUserArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 }
    }),
    result: Thrift.Struct.define('dissociateAllOpenIDsFromUserResult', {
      1: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      2: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException }
    })
  });

  Utility.moveNotebookBetweenAccounts = Thrift.Method.define({
    alias: 'moveNotebookBetweenAccounts',
    args: Thrift.Struct.define('moveNotebookBetweenAccountsArgs', {
      1: { alias: 'sourceAuthenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'targetAuthenticationToken', type: Thrift.Type.STRING, index: 1 },
      3: { alias: 'parameters', type: Thrift.Type.STRUCT, def: module.exports.MoveNotebookBetweenAccountsParams, index: 2 }
    }),
    result: Thrift.Struct.define('moveNotebookBetweenAccountsResult', {
      0: { alias: 'returnValue',type: Thrift.Type.STRUCT, def: Types.Notebook },
      1: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      2: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
    })
  });

  Utility.moveNotebooksBetweenAccounts = Thrift.Method.define({
    alias: 'moveNotebooksBetweenAccounts',
    args: Thrift.Struct.define('moveNotebooksBetweenAccountsArgs', {
      1: { alias: 'sourceAuthenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'targetAuthenticationToken', type: Thrift.Type.STRING, index: 1 },
      3: { alias: 'parameters', type: Thrift.Type.STRUCT, def: module.exports.MoveNotebooksBetweenAccountsParams, index: 2 }
    }),
    result: Thrift.Struct.define('moveNotebooksBetweenAccountsResult', {
      0: { alias: 'returnValue',type: Thrift.Type.STRUCT, def: module.exports.MoveNotebooksBetweenAccountsResult },
      1: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      2: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
    })
  });

  Utility.moveNoteBetweenAccounts = Thrift.Method.define({
    alias: 'moveNoteBetweenAccounts',
    args: Thrift.Struct.define('moveNoteBetweenAccountsArgs', {
      1: { alias: 'sourceAuthenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'targetAuthenticationToken', type: Thrift.Type.STRING, index: 1 },
      3: { alias: 'parameters', type: Thrift.Type.STRUCT, def: module.exports.MoveNoteBetweenAccountsParams, index: 2 }
    }),
    result: Thrift.Struct.define('moveNoteBetweenAccountsResult', {
      0: { alias: 'returnValue',type: Thrift.Type.STRUCT, def: module.exports.MoveNoteBetweenAccountsResult },
      1: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      2: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
    })
  });

  Utility.findNotesMetadataForIon = Thrift.Method.define({
    alias: 'findNotesMetadataForIon',
    args: Thrift.Struct.define('findNotesMetadataForIonArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'filter', type: Thrift.Type.STRUCT, def: NoteStore.NoteFilter, index: 1 },
      3: { alias: 'offset', type: Thrift.Type.I32, index: 2 },
      4: { alias: 'maxNotes', type: Thrift.Type.I32, index: 3 },
      5: { alias: 'resultSpec', type: Thrift.Type.STRUCT, def: NoteStore.NotesMetadataResultSpec, index: 4 }
    }),
    result: Thrift.Struct.define('findNotesMetadataForIonResult', {
      0: { alias: 'returnValue',type: Thrift.Type.STRUCT, def: NoteStore.NotesMetadataList },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
    })
  });

  Utility.findNotesCardMetadata = Thrift.Method.define({
    alias: 'findNotesCardMetadata',
    args: Thrift.Struct.define('findNotesCardMetadataArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'filter', type: Thrift.Type.STRUCT, def: NoteStore.NoteFilter, index: 1 },
      3: { alias: 'offset', type: Thrift.Type.I32, index: 2 },
      4: { alias: 'maxNotes', type: Thrift.Type.I32, index: 3 },
      5: { alias: 'resultSpec', type: Thrift.Type.STRUCT, def: NoteStore.NotesMetadataResultSpec, index: 4 }
    }),
    result: Thrift.Struct.define('findNotesCardMetadataResult', {
      0: { alias: 'returnValue',type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, module.exports.NoteCardMetadata)  },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
    })
  });

  Utility.createWorkspaceWithResultSpec = Thrift.Method.define({
    alias: 'createWorkspaceWithResultSpec',
    args: Thrift.Struct.define('createWorkspaceWithResultSpecArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'workspace', type: Thrift.Type.STRUCT, def: SpaceService.Workspace, index: 1 },
      3: { alias: 'spec', type: Thrift.Type.STRUCT, def: SpaceService.GetWorkspaceResponseSpec, index: 2 }
    }),
    result: Thrift.Struct.define('createWorkspaceWithResultSpecResult', {
      0: { alias: 'returnValue',type: Thrift.Type.STRUCT, def: SpaceService.GetWorkspaceResponse },
      1: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      2: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException }
    })
  });

  Utility.createWorkspace = Thrift.Method.define({
    alias: 'createWorkspace',
    args: Thrift.Struct.define('createWorkspaceArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'workspace', type: Thrift.Type.STRUCT, def: SpaceService.Workspace, index: 1 }
    }),
    result: Thrift.Struct.define('createWorkspaceResult', {
      0: { alias: 'returnValue',type: Thrift.Type.STRUCT, def: SpaceService.Workspace },
      1: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      2: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException }
    })
  });

  Utility.listSyncingNotebookGuidsInBusinessAccount = Thrift.Method.define({
    alias: 'listSyncingNotebookGuidsInBusinessAccount',
    args: Thrift.Struct.define('listSyncingNotebookGuidsInBusinessAccountArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 }
    }),
    result: Thrift.Struct.define('listSyncingNotebookGuidsInBusinessAccountResult', {
      0: { alias: 'returnValue',type: Thrift.Type.SET, def: Thrift.Set.define(Thrift.Type.STRING) },
      1: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      2: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException }
    })
  });

  Utility.getWorkspace = Thrift.Method.define({
    alias: 'getWorkspace',
    args: Thrift.Struct.define('getWorkspaceArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'workspaceGuid', type: Thrift.Type.STRING, index: 1 },
      3: { alias: 'responseSpec', type: Thrift.Type.STRUCT, def: SpaceService.GetWorkspaceResponseSpec, index: 2 }
    }),
    result: Thrift.Struct.define('getWorkspaceResult', {
      0: { alias: 'returnValue',type: Thrift.Type.STRUCT, def: SpaceService.GetWorkspaceResponse },
      1: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      2: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
    })
  });

  Utility.getWorkspaceIfUserHasPrivilege = Thrift.Method.define({
    alias: 'getWorkspaceIfUserHasPrivilege',
    args: Thrift.Struct.define('getWorkspaceIfUserHasPrivilegeArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'workspaceGuid', type: Thrift.Type.STRING, index: 1 },
      3: { alias: 'responseSpec', type: Thrift.Type.STRUCT, def: SpaceService.GetWorkspaceResponseSpec, index: 2 },
      4: { alias: 'privilegeLevel', type: Thrift.Type.I32, index: 3 }
    }),
    result: Thrift.Struct.define('getWorkspaceIfUserHasPrivilegeResult', {
      0: { alias: 'returnValue',type: Thrift.Type.STRUCT, def: SpaceService.GetWorkspaceResponse },
      1: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      2: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
    })
  });

  Utility.listWorkspaces = Thrift.Method.define({
    alias: 'listWorkspaces',
    args: Thrift.Struct.define('listWorkspacesArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 }
    }),
    result: Thrift.Struct.define('listWorkspacesResult', {
      0: { alias: 'returnValue',type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, SpaceService.Workspace)  },
      1: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      2: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException }
    })
  });

  Utility.listWorkspacesWithResultSpec = Thrift.Method.define({
    alias: 'listWorkspacesWithResultSpec',
    args: Thrift.Struct.define('listWorkspacesWithResultSpecArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'workspaceResponseSpec', type: Thrift.Type.STRUCT, def: SpaceService.GetWorkspaceResponseSpec, index: 1 },
      3: { alias: 'filter', type: Thrift.Type.STRUCT, def: SpaceService.WorkspaceFilter, index: 2 }
    }),
    result: Thrift.Struct.define('listWorkspacesWithResultSpecResult', {
      0: { alias: 'returnValue',type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, SpaceService.GetWorkspaceResponse)  },
      1: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      2: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException }
    })
  });

  Utility.updateWorkspace = Thrift.Method.define({
    alias: 'updateWorkspace',
    args: Thrift.Struct.define('updateWorkspaceArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'workspace', type: Thrift.Type.STRUCT, def: SpaceService.Workspace, index: 1 }
    }),
    result: Thrift.Struct.define('updateWorkspaceResult', {
      0: { alias: 'returnValue',type: Thrift.Type.STRUCT, def: SpaceService.Workspace },
      1: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      2: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
    })
  });

  Utility.moveNotebookToAccount = Thrift.Method.define({
    alias: 'moveNotebookToAccount',
    args: Thrift.Struct.define('moveNotebookToAccountArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'notebookGuid', type: Thrift.Type.STRING, index: 1 }
    }),
    result: Thrift.Struct.define('moveNotebookToAccountResult', {
      1: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      2: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
    })
  });

  Utility.manageWorkspaceSharing = Thrift.Method.define({
    alias: 'manageWorkspaceSharing',
    args: Thrift.Struct.define('manageWorkspaceSharingArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'request', type: Thrift.Type.STRUCT, def: SpaceService.ManageWorkspaceSharingRequest, index: 1 }
    }),
    result: Thrift.Struct.define('manageWorkspaceSharingResult', {
      0: { alias: 'returnValue',type: Thrift.Type.STRUCT, def: SpaceService.ManageWorkspaceSharingResponse },
      1: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      2: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
    })
  });

  Utility.joinWorkspace = Thrift.Method.define({
    alias: 'joinWorkspace',
    args: Thrift.Struct.define('joinWorkspaceArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'workspaceGuid', type: Thrift.Type.STRING, index: 1 }
    }),
    result: Thrift.Struct.define('joinWorkspaceResult', {
      1: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      2: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
    })
  });

  Utility.leaveWorkspace = Thrift.Method.define({
    alias: 'leaveWorkspace',
    args: Thrift.Struct.define('leaveWorkspaceArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'workspaceGuid', type: Thrift.Type.STRING, index: 1 }
    }),
    result: Thrift.Struct.define('leaveWorkspaceResult', {
      1: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      2: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
    })
  });

  Utility.sendWorkspaceViewedEvent = Thrift.Method.define({
    alias: 'sendWorkspaceViewedEvent',
    args: Thrift.Struct.define('sendWorkspaceViewedEventArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'workspaceGuid', type: Thrift.Type.STRING, index: 1 }
    }),
    result: Thrift.Struct.define('sendWorkspaceViewedEventResult', {
      1: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      2: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
    })
  });

  Utility.expungeWorkspace = Thrift.Method.define({
    alias: 'expungeWorkspace',
    args: Thrift.Struct.define('expungeWorkspaceArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'workspaceGuid', type: Thrift.Type.STRING, index: 1 }
    }),
    result: Thrift.Struct.define('expungeWorkspaceResult', {
      1: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      2: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
    })
  });

  Utility.createSurveyNote = Thrift.Method.define({
    alias: 'createSurveyNote',
    args: Thrift.Struct.define('createSurveyNoteArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'note', type: Thrift.Type.STRUCT, def: Types.Note, index: 1 },
      3: { alias: 'surveyId', type: Thrift.Type.I32, index: 2 }
    }),
    result: Thrift.Struct.define('createSurveyNoteResult', {
      0: { alias: 'returnValue',type: Thrift.Type.STRUCT, def: Types.Note },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
    })
  });

  Utility.createSurvey = Thrift.Method.define({
    alias: 'createSurvey',
    args: Thrift.Struct.define('createSurveyArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'survey', type: Thrift.Type.STRUCT, def: module.exports.Survey, index: 1 }
    }),
    result: Thrift.Struct.define('createSurveyResult', {
      0: { alias: 'returnValue',type: Thrift.Type.STRUCT, def: module.exports.Survey },
      1: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      2: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
    })
  });

  Utility.finalizeSurvey = Thrift.Method.define({
    alias: 'finalizeSurvey',
    args: Thrift.Struct.define('finalizeSurveyArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'surveyId', type: Thrift.Type.I32, index: 1 }
    }),
    result: Thrift.Struct.define('finalizeSurveyResult', {
      0: { alias: 'returnValue',type: Thrift.Type.STRUCT, def: module.exports.Survey },
      1: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      2: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
    })
  });

  Utility.cloneSurvey = Thrift.Method.define({
    alias: 'cloneSurvey',
    args: Thrift.Struct.define('cloneSurveyArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'surveyId', type: Thrift.Type.I32, index: 1 },
      3: { alias: 'surveyName', type: Thrift.Type.STRING, index: 2 },
      4: { alias: 'copyRatings', type: Thrift.Type.BOOL, index: 3 },
      5: { alias: 'copyComments', type: Thrift.Type.BOOL, index: 4 }
    }),
    result: Thrift.Struct.define('cloneSurveyResult', {
      0: { alias: 'returnValue',type: Thrift.Type.STRUCT, def: module.exports.Survey },
      1: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      2: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
    })
  });

  Utility.getLastOpenSurveyForEntity = Thrift.Method.define({
    alias: 'getLastOpenSurveyForEntity',
    args: Thrift.Struct.define('getLastOpenSurveyForEntityArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'entityType', type: Thrift.Type.I32, index: 1 },
      3: { alias: 'entityGuid', type: Thrift.Type.STRING, index: 2 }
    }),
    result: Thrift.Struct.define('getLastOpenSurveyForEntityResult', {
      0: { alias: 'returnValue',type: Thrift.Type.STRUCT, def: module.exports.Survey },
      1: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      2: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
    })
  });

  Utility.listSurveysForEntity = Thrift.Method.define({
    alias: 'listSurveysForEntity',
    args: Thrift.Struct.define('listSurveysForEntityArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'entityType', type: Thrift.Type.I32, index: 1 },
      3: { alias: 'entityGuid', type: Thrift.Type.STRING, index: 2 }
    }),
    result: Thrift.Struct.define('listSurveysForEntityResult', {
      0: { alias: 'returnValue',type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, module.exports.Survey)  },
      1: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      2: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
    })
  });

  Utility.getSurveyItemForEntity = Thrift.Method.define({
    alias: 'getSurveyItemForEntity',
    args: Thrift.Struct.define('getSurveyItemForEntityArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'entityType', type: Thrift.Type.I32, index: 1 },
      3: { alias: 'entityGuid', type: Thrift.Type.STRING, index: 2 },
      4: { alias: 'surveyId', type: Thrift.Type.I32, index: 3 }
    }),
    result: Thrift.Struct.define('getSurveyItemForEntityResult', {
      0: { alias: 'returnValue',type: Thrift.Type.STRUCT, def: module.exports.SurveyItem },
      1: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      2: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
    })
  });

  Utility.finalizeEntityForRating = Thrift.Method.define({
    alias: 'finalizeEntityForRating',
    args: Thrift.Struct.define('finalizeEntityForRatingArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'surveyId', type: Thrift.Type.I32, index: 1 },
      3: { alias: 'entityType', type: Thrift.Type.I32, index: 2 },
      4: { alias: 'entityGuid', type: Thrift.Type.STRING, index: 3 },
      5: { alias: 'category', type: Thrift.Type.STRING, index: 4 }
    }),
    result: Thrift.Struct.define('finalizeEntityForRatingResult', {
      0: { alias: 'returnValue',type: Thrift.Type.STRUCT, def: module.exports.SurveyItem },
      1: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      2: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
    })
  });

  Utility.removeSurveyItem = Thrift.Method.define({
    alias: 'removeSurveyItem',
    args: Thrift.Struct.define('removeSurveyItemArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'surveyId', type: Thrift.Type.I32, index: 1 },
      3: { alias: 'surveyItemId', type: Thrift.Type.I32, index: 2 }
    }),
    result: Thrift.Struct.define('removeSurveyItemResult', {
      1: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      2: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
    })
  });

  Utility.saveSurveyItemRating = Thrift.Method.define({
    alias: 'saveSurveyItemRating',
    args: Thrift.Struct.define('saveSurveyItemRatingArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'surveyItemId', type: Thrift.Type.I32, index: 1 },
      3: { alias: 'rating', type: Thrift.Type.I32, index: 2 }
    }),
    result: Thrift.Struct.define('saveSurveyItemRatingResult', {
      0: { alias: 'returnValue',type: Thrift.Type.STRUCT, def: module.exports.SurveyItemRating },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
    })
  });

  Utility.saveSurveyItemComment = Thrift.Method.define({
    alias: 'saveSurveyItemComment',
    args: Thrift.Struct.define('saveSurveyItemCommentArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'surveyItemId', type: Thrift.Type.I32, index: 1 },
      3: { alias: 'comment', type: Thrift.Type.STRING, index: 2 }
    }),
    result: Thrift.Struct.define('saveSurveyItemCommentResult', {
      0: { alias: 'returnValue',type: Thrift.Type.STRUCT, def: module.exports.SurveyItemRating },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
    })
  });

  Utility.addSurveyItemComment = Thrift.Method.define({
    alias: 'addSurveyItemComment',
    args: Thrift.Struct.define('addSurveyItemCommentArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'surveyItemId', type: Thrift.Type.I32, index: 1 },
      3: { alias: 'comment', type: Thrift.Type.STRING, index: 2 }
    }),
    result: Thrift.Struct.define('addSurveyItemCommentResult', {
      0: { alias: 'returnValue',type: Thrift.Type.STRUCT, def: module.exports.SurveyItemComment },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
    })
  });

  Utility.getConfigValuesAsJSON = Thrift.Method.define({
    alias: 'getConfigValuesAsJSON',
    args: Thrift.Struct.define('getConfigValuesAsJSONArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'request', type: Thrift.Type.STRUCT, def: module.exports.ConfigValuesRequest, index: 1 }
    }),
    result: Thrift.Struct.define('getConfigValuesAsJSONResult', {
      0: { alias: 'returnValue',type: Thrift.Type.STRING },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
    })
  });

  Utility.addAllUsersFromBusinessToSpace = Thrift.Method.define({
    alias: 'addAllUsersFromBusinessToSpace',
    args: Thrift.Struct.define('addAllUsersFromBusinessToSpaceArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'spaceGuid', type: Thrift.Type.STRING, index: 1 }
    }),
    result: Thrift.Struct.define('addAllUsersFromBusinessToSpaceResult', {
      0: { alias: 'returnValue',type: Thrift.Type.I32 },
      1: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      2: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
    })
  });

  Utility.listNotebooksForIonOnly = Thrift.Method.define({
    alias: 'listNotebooksForIonOnly',
    args: Thrift.Struct.define('listNotebooksForIonOnlyArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 }
    }),
    result: Thrift.Struct.define('listNotebooksForIonOnlyResult', {
      0: { alias: 'returnValue',type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, Types.Notebook)  },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
    })
  });

  Utility.getMaxServiceUpdatedFromNotes = Thrift.Method.define({
    alias: 'getMaxServiceUpdatedFromNotes',
    args: Thrift.Struct.define('getMaxServiceUpdatedFromNotesArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'notebookGuids', type: Thrift.Type.SET, def: Thrift.Set.define(Thrift.Type.STRING), index: 1 }
    }),
    result: Thrift.Struct.define('getMaxServiceUpdatedFromNotesResult', {
      0: { alias: 'returnValue',type: Thrift.Type.MAP, def: Thrift.Map.define(Thrift.Type.STRING, Thrift.Type.I64 )  },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
    })
  });

  Utility.addResource = Thrift.Method.define({
    alias: 'addResource',
    args: Thrift.Struct.define('addResourceArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'resource', type: Thrift.Type.STRUCT, def: Types.Resource, index: 1 }
    }),
    result: Thrift.Struct.define('addResourceResult', {
      0: { alias: 'returnValue',type: Thrift.Type.STRUCT, def: Types.Resource },
      1: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      2: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
    })
  });

  Utility.updateNoteIfUsnMatches = Thrift.Method.define({
    alias: 'updateNoteIfUsnMatches',
    args: Thrift.Struct.define('updateNoteIfUsnMatchesArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'note', type: Thrift.Type.STRUCT, def: Types.Note, index: 1 },
      3: { alias: 'resourcesUpdateRequest', type: Thrift.Type.STRUCT, def: module.exports.ResourcesUpdateRequest, index: 2 }
    }),
    result: Thrift.Struct.define('updateNoteIfUsnMatchesResult', {
      0: { alias: 'returnValue',type: Thrift.Type.STRUCT, def: NoteStore.UpdateNoteIfUsnMatchesResult },
      1: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      2: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
    })
  });

  Utility.createNote = Thrift.Method.define({
    alias: 'createNote',
    args: Thrift.Struct.define('createNoteArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'note', type: Thrift.Type.STRUCT, def: Types.Note, index: 1 },
      3: { alias: 'resourcesCreateRequest', type: Thrift.Type.STRUCT, def: module.exports.ResourcesCreateRequest, index: 2 }
    }),
    result: Thrift.Struct.define('createNoteResult', {
      0: { alias: 'returnValue',type: Thrift.Type.STRUCT, def: Types.Note },
      1: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      2: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
    })
  });

  Utility.listBetaFeatures = Thrift.Method.define({
    alias: 'listBetaFeatures',
    args: Thrift.Struct.define('listBetaFeaturesArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 }
    }),
    result: Thrift.Struct.define('listBetaFeaturesResult', {
      0: { alias: 'returnValue',type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, module.exports.BetaFeature)  },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException },
      3: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
    })
  });

  Utility.listBetaFeatureEnrollments = Thrift.Method.define({
    alias: 'listBetaFeatureEnrollments',
    args: Thrift.Struct.define('listBetaFeatureEnrollmentsArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 }
    }),
    result: Thrift.Struct.define('listBetaFeatureEnrollmentsResult', {
      0: { alias: 'returnValue',type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, module.exports.BetaFeatureEnrollment)  },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException },
      3: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
    })
  });

  Utility.enrollInBetaFeature = Thrift.Method.define({
    alias: 'enrollInBetaFeature',
    args: Thrift.Struct.define('enrollInBetaFeatureArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'featureKey', type: Thrift.Type.STRING, index: 1 }
    }),
    result: Thrift.Struct.define('enrollInBetaFeatureResult', {
      1: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      2: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
    })
  });

  Utility.enableBetaFeature = Thrift.Method.define({
    alias: 'enableBetaFeature',
    args: Thrift.Struct.define('enableBetaFeatureArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'featureKey', type: Thrift.Type.STRING, index: 1 },
      3: { alias: 'enrollmentGuid', type: Thrift.Type.STRING, index: 2 },
      4: { alias: 'enabled', type: Thrift.Type.BOOL, index: 3 }
    }),
    result: Thrift.Struct.define('enableBetaFeatureResult', {
      1: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      2: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
    })
  });

  Utility.listEnabledFeatures = Thrift.Method.define({
    alias: 'listEnabledFeatures',
    args: Thrift.Struct.define('listEnabledFeaturesArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 }
    }),
    result: Thrift.Struct.define('listEnabledFeaturesResult', {
      0: { alias: 'returnValue',type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRING)  },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException },
      3: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
    })
  });

  Utility.checkEnabledFeatures = Thrift.Method.define({
    alias: 'checkEnabledFeatures',
    args: Thrift.Struct.define('checkEnabledFeaturesArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'featureKeysToCheck', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.I32) , index: 1 }
    }),
    result: Thrift.Struct.define('checkEnabledFeaturesResult', {
      0: { alias: 'returnValue',type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, module.exports.FeatureAvailability)  },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException },
      3: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
    })
  });

  Utility.getNotePermissionsForRTE = Thrift.Method.define({
    alias: 'getNotePermissionsForRTE',
    args: Thrift.Struct.define('getNotePermissionsForRTEArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'noteGuid', type: Thrift.Type.STRING, index: 1 }
    }),
    result: Thrift.Struct.define('getNotePermissionsForRTEResult', {
      0: { alias: 'returnValue',type: Thrift.Type.STRUCT, def: module.exports.RealTimeNotePermissionsResult },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException },
      3: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
    })
  });

  Utility.pinContentToWidget = Thrift.Method.define({
    alias: 'pinContentToWidget',
    args: Thrift.Struct.define('pinContentToWidgetArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'workspaceGuid', type: Thrift.Type.STRING, index: 1 },
      3: { alias: 'entityType', type: Thrift.Type.I32, index: 2 },
      4: { alias: 'entityGuidOrUri', type: Thrift.Type.STRING, index: 3 }
    }),
    result: Thrift.Struct.define('pinContentToWidgetResult', {
      0: { alias: 'returnValue',type: Thrift.Type.STRUCT, def: module.exports.PinnedContent },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException },
      3: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
    })
  });

  Utility.unpinContentFromWidget = Thrift.Method.define({
    alias: 'unpinContentFromWidget',
    args: Thrift.Struct.define('unpinContentFromWidgetArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'workspaceGuid', type: Thrift.Type.STRING, index: 1 },
      3: { alias: 'entityType', type: Thrift.Type.I32, index: 2 },
      4: { alias: 'entityGuidOrUri', type: Thrift.Type.STRING, index: 3 }
    }),
    result: Thrift.Struct.define('unpinContentFromWidgetResult', {
      0: { alias: 'returnValue',type: Thrift.Type.BOOL },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException },
      3: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
    })
  });

  Utility.listPinnedContent = Thrift.Method.define({
    alias: 'listPinnedContent',
    args: Thrift.Struct.define('listPinnedContentArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'workspaceGuid', type: Thrift.Type.STRING, index: 1 }
    }),
    result: Thrift.Struct.define('listPinnedContentResult', {
      0: { alias: 'returnValue',type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, module.exports.PinnedContent)  },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException },
      3: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
    })
  });

  Utility.getWorkspaceNotebookSummary = Thrift.Method.define({
    alias: 'getWorkspaceNotebookSummary',
    args: Thrift.Struct.define('getWorkspaceNotebookSummaryArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'workspaceGuid', type: Thrift.Type.STRING, index: 1 }
    }),
    result: Thrift.Struct.define('getWorkspaceNotebookSummaryResult', {
      0: { alias: 'returnValue',type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, module.exports.NotebookSummary)  },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException },
      3: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
    })
  });

  Utility.updateContentOfPinnedWidget = Thrift.Method.define({
    alias: 'updateContentOfPinnedWidget',
    args: Thrift.Struct.define('updateContentOfPinnedWidgetArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'workspaceGuid', type: Thrift.Type.STRING, index: 1 },
      3: { alias: 'toBePinnedContentList', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, module.exports.PinnedContent) , index: 2 },
      4: { alias: 'toBeUnpinnedContentList', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, module.exports.PinnedContent) , index: 3 }
    }),
    result: Thrift.Struct.define('updateContentOfPinnedWidgetResult', {
      0: { alias: 'returnValue',type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, module.exports.PinnedContent)  },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException },
      3: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
    })
  });

  Utility.replaceAllPinnedContentOfWidget = Thrift.Method.define({
    alias: 'replaceAllPinnedContentOfWidget',
    args: Thrift.Struct.define('replaceAllPinnedContentOfWidgetArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'workspaceGuid', type: Thrift.Type.STRING, index: 1 },
      3: { alias: 'pinnedContentList', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, module.exports.PinnedContent) , index: 2 }
    }),
    result: Thrift.Struct.define('replaceAllPinnedContentOfWidgetResult', {
      0: { alias: 'returnValue',type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, module.exports.PinnedContent)  },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException },
      3: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
    })
  });

  Utility.requestAccessToWorkspace = Thrift.Method.define({
    alias: 'requestAccessToWorkspace',
    args: Thrift.Struct.define('requestAccessToWorkspaceArgs', {
      1: { alias: 'authToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'workspaceGuid', type: Thrift.Type.STRING, index: 1 }
    }),
    result: Thrift.Struct.define('requestAccessToWorkspaceResult', {
      1: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      2: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
    })
  });

  Utility.listRecommendedNotes = Thrift.Method.define({
    alias: 'listRecommendedNotes',
    args: Thrift.Struct.define('listRecommendedNotesArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'request', type: Thrift.Type.STRUCT, def: module.exports.RecommendationRequest, index: 1 },
      3: { alias: 'offset', type: Thrift.Type.I32, index: 2 },
      4: { alias: 'maxNotes', type: Thrift.Type.I32, index: 3 }
    }),
    result: Thrift.Struct.define('listRecommendedNotesResult', {
      0: { alias: 'returnValue',type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, module.exports.RecommendedNoteCardMetadata)  },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException },
      3: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
    })
  });

  // Define Utility Client

  function UtilityClient(output) {
    this.output = output;
    this.seqid = 0;
  }

  UtilityClient.prototype.sendMarketingEmail = function(authenticationToken, parameters, callback) {
    var mdef = Utility.sendMarketingEmail;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.parameters = parameters;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  UtilityClient.prototype.fileSupportTicket = function(authenticationToken, ticket, callback) {
    var mdef = Utility.fileSupportTicket;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.ticket = ticket;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  UtilityClient.prototype.sendAppFeedback = function(authenticationToken, appFeedback, callback) {
    var mdef = Utility.sendAppFeedback;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.appFeedback = appFeedback;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  UtilityClient.prototype.sendAppFeedbackForDevice = function(deviceIdentifier, apiConsumerKey, apiConsumerSecret, appFeedback, callback) {
    var mdef = Utility.sendAppFeedbackForDevice;
    var args = new mdef.args();
    args.deviceIdentifier = deviceIdentifier;
    args.apiConsumerKey = apiConsumerKey;
    args.apiConsumerSecret = apiConsumerSecret;
    args.appFeedback = appFeedback;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  UtilityClient.prototype.getCrossPromotionInfo = function(authenticationToken, callback) {
    var mdef = Utility.getCrossPromotionInfo;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  UtilityClient.prototype.referFriends = function(authenticationToken, referredEmails, callback) {
    var mdef = Utility.referFriends;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.referredEmails = referredEmails;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  UtilityClient.prototype.listFriendReferrals = function(authenticationToken, callback) {
    var mdef = Utility.listFriendReferrals;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  UtilityClient.prototype.sendVerificationEmail = function(authenticationToken, callback) {
    var mdef = Utility.sendVerificationEmail;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  UtilityClient.prototype.confirmEmailAddress = function(authenticationToken, callback) {
    var mdef = Utility.confirmEmailAddress;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  UtilityClient.prototype.getOAuthCredential = function(authenticationToken, serviceId, callback) {
    var mdef = Utility.getOAuthCredential;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.serviceId = serviceId;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  UtilityClient.prototype.hasOAuthCredential = function(authenticationToken, serviceId, callback) {
    var mdef = Utility.hasOAuthCredential;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.serviceId = serviceId;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  UtilityClient.prototype.getScopedGoogleOAuthCredential = function(authenticationToken, googleOAuthScope, callback) {
    var mdef = Utility.getScopedGoogleOAuthCredential;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.googleOAuthScope = googleOAuthScope;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  UtilityClient.prototype.hasGoogleOAuthCredential = function(authenticationToken, googleOAuthScope, callback) {
    var mdef = Utility.hasGoogleOAuthCredential;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.googleOAuthScope = googleOAuthScope;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  UtilityClient.prototype.setOAuthCredential = function(authenticationToken, oAuthCredential, callback) {
    var mdef = Utility.setOAuthCredential;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.oAuthCredential = oAuthCredential;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  UtilityClient.prototype.deleteOAuthCredential = function(authenticationToken, serviceId, callback) {
    var mdef = Utility.deleteOAuthCredential;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.serviceId = serviceId;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  UtilityClient.prototype.getUserCardScanningEndDate = function(authenticationToken, callback) {
    var mdef = Utility.getUserCardScanningEndDate;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  UtilityClient.prototype.getPromotionStatus = function(authenticationToken, promotionIds, callback) {
    var mdef = Utility.getPromotionStatus;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.promotionIds = promotionIds;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  UtilityClient.prototype.promotionsShown = function(authenticationToken, promotionIds, callback) {
    var mdef = Utility.promotionsShown;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.promotionIds = promotionIds;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  UtilityClient.prototype.promotionOptedOut = function(authenticationToken, promotionId, callback) {
    var mdef = Utility.promotionOptedOut;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.promotionId = promotionId;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  UtilityClient.prototype.getRelatedContentSourcePreferences = function(authenticationToken, callback) {
    var mdef = Utility.getRelatedContentSourcePreferences;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  UtilityClient.prototype.setRelatedContentSourceActivated = function(authenticationToken, sourceId, activated, callback) {
    var mdef = Utility.setRelatedContentSourceActivated;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.sourceId = sourceId;
    args.activated = activated;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  UtilityClient.prototype.clearRelatedContentProfiles = function(authenticationToken, sourceId, callback) {
    var mdef = Utility.clearRelatedContentProfiles;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.sourceId = sourceId;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  UtilityClient.prototype.addRelatedContentProfiles = function(authenticationToken, profiles, callback) {
    var mdef = Utility.addRelatedContentProfiles;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.profiles = profiles;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  UtilityClient.prototype.updateRelatedContentProfiles = function(authenticationToken, sourceId, callback) {
    var mdef = Utility.updateRelatedContentProfiles;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.sourceId = sourceId;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  UtilityClient.prototype.getRelatedContentProfilePage = function(authenticationToken, profileId, callback) {
    var mdef = Utility.getRelatedContentProfilePage;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.profileId = profileId;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  UtilityClient.prototype.importNotesFromEnex = function(authenticationToken, enexUrl, notebookGuid, importNoteTags, importNoteCreated, importNoteUpdated, callback) {
    var mdef = Utility.importNotesFromEnex;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.enexUrl = enexUrl;
    args.notebookGuid = notebookGuid;
    args.importNoteTags = importNoteTags;
    args.importNoteCreated = importNoteCreated;
    args.importNoteUpdated = importNoteUpdated;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  UtilityClient.prototype.setUserProfilePhoto = function(authenticationToken, photo, callback) {
    var mdef = Utility.setUserProfilePhoto;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.photo = photo;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  UtilityClient.prototype.removeUserProfilePhoto = function(authenticationToken, callback) {
    var mdef = Utility.removeUserProfilePhoto;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  UtilityClient.prototype.setUserFullName = function(authenticationToken, name, callback) {
    var mdef = Utility.setUserFullName;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.name = name;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  UtilityClient.prototype.getMessageInvitation = function(messageInvitationId, callback) {
    var mdef = Utility.getMessageInvitation;
    var args = new mdef.args();
    args.messageInvitationId = messageInvitationId;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  UtilityClient.prototype.claimMessageInvitation = function(authenticationToken, messageInvitationId, callback) {
    var mdef = Utility.claimMessageInvitation;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.messageInvitationId = messageInvitationId;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  UtilityClient.prototype.canPurchaseTeamStarterPack = function(authenticationToken, request, callback) {
    var mdef = Utility.canPurchaseTeamStarterPack;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.request = request;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  UtilityClient.prototype.getTsdEligibility = function(authenticationToken, request, callback) {
    var mdef = Utility.getTsdEligibility;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.request = request;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  UtilityClient.prototype.updatePassword = function(authenticationToken, oldPassword, newPassword, callback) {
    var mdef = Utility.updatePassword;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.oldPassword = oldPassword;
    args.newPassword = newPassword;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  UtilityClient.prototype.getIncentiveEligibility = function(authenticationToken, callback) {
    var mdef = Utility.getIncentiveEligibility;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  UtilityClient.prototype.invalidateGoogleOauthCredential = function(authToken, callback) {
    var mdef = Utility.invalidateGoogleOauthCredential;
    var args = new mdef.args();
    args.authToken = authToken;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  UtilityClient.prototype.associateOpenIDWithUser = function(authenticationToken, credential, callback) {
    var mdef = Utility.associateOpenIDWithUser;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.credential = credential;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  UtilityClient.prototype.dissociateOpenIDFromUser = function(authenticationToken, credential, callback) {
    var mdef = Utility.dissociateOpenIDFromUser;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.credential = credential;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  UtilityClient.prototype.dissociateAllOpenIDsFromUser = function(authenticationToken, callback) {
    var mdef = Utility.dissociateAllOpenIDsFromUser;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  UtilityClient.prototype.moveNotebookBetweenAccounts = function(sourceAuthenticationToken, targetAuthenticationToken, parameters, callback) {
    var mdef = Utility.moveNotebookBetweenAccounts;
    var args = new mdef.args();
    args.sourceAuthenticationToken = sourceAuthenticationToken;
    args.targetAuthenticationToken = targetAuthenticationToken;
    args.parameters = parameters;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  UtilityClient.prototype.moveNotebooksBetweenAccounts = function(sourceAuthenticationToken, targetAuthenticationToken, parameters, callback) {
    var mdef = Utility.moveNotebooksBetweenAccounts;
    var args = new mdef.args();
    args.sourceAuthenticationToken = sourceAuthenticationToken;
    args.targetAuthenticationToken = targetAuthenticationToken;
    args.parameters = parameters;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  UtilityClient.prototype.moveNoteBetweenAccounts = function(sourceAuthenticationToken, targetAuthenticationToken, parameters, callback) {
    var mdef = Utility.moveNoteBetweenAccounts;
    var args = new mdef.args();
    args.sourceAuthenticationToken = sourceAuthenticationToken;
    args.targetAuthenticationToken = targetAuthenticationToken;
    args.parameters = parameters;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  UtilityClient.prototype.findNotesMetadataForIon = function(authenticationToken, filter, offset, maxNotes, resultSpec, callback) {
    var mdef = Utility.findNotesMetadataForIon;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.filter = filter;
    args.offset = offset;
    args.maxNotes = maxNotes;
    args.resultSpec = resultSpec;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  UtilityClient.prototype.findNotesCardMetadata = function(authenticationToken, filter, offset, maxNotes, resultSpec, callback) {
    var mdef = Utility.findNotesCardMetadata;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.filter = filter;
    args.offset = offset;
    args.maxNotes = maxNotes;
    args.resultSpec = resultSpec;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  UtilityClient.prototype.createWorkspaceWithResultSpec = function(authenticationToken, workspace, spec, callback) {
    var mdef = Utility.createWorkspaceWithResultSpec;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.workspace = workspace;
    args.spec = spec;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  UtilityClient.prototype.createWorkspace = function(authenticationToken, workspace, callback) {
    var mdef = Utility.createWorkspace;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.workspace = workspace;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  UtilityClient.prototype.listSyncingNotebookGuidsInBusinessAccount = function(authenticationToken, callback) {
    var mdef = Utility.listSyncingNotebookGuidsInBusinessAccount;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  UtilityClient.prototype.getWorkspace = function(authenticationToken, workspaceGuid, responseSpec, callback) {
    var mdef = Utility.getWorkspace;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.workspaceGuid = workspaceGuid;
    args.responseSpec = responseSpec;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  UtilityClient.prototype.getWorkspaceIfUserHasPrivilege = function(authenticationToken, workspaceGuid, responseSpec, privilegeLevel, callback) {
    var mdef = Utility.getWorkspaceIfUserHasPrivilege;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.workspaceGuid = workspaceGuid;
    args.responseSpec = responseSpec;
    args.privilegeLevel = privilegeLevel;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  UtilityClient.prototype.listWorkspaces = function(authenticationToken, callback) {
    var mdef = Utility.listWorkspaces;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  UtilityClient.prototype.listWorkspacesWithResultSpec = function(authenticationToken, workspaceResponseSpec, filter, callback) {
    var mdef = Utility.listWorkspacesWithResultSpec;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.workspaceResponseSpec = workspaceResponseSpec;
    args.filter = filter;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  UtilityClient.prototype.updateWorkspace = function(authenticationToken, workspace, callback) {
    var mdef = Utility.updateWorkspace;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.workspace = workspace;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  UtilityClient.prototype.moveNotebookToAccount = function(authenticationToken, notebookGuid, callback) {
    var mdef = Utility.moveNotebookToAccount;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.notebookGuid = notebookGuid;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  UtilityClient.prototype.manageWorkspaceSharing = function(authenticationToken, request, callback) {
    var mdef = Utility.manageWorkspaceSharing;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.request = request;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  UtilityClient.prototype.joinWorkspace = function(authenticationToken, workspaceGuid, callback) {
    var mdef = Utility.joinWorkspace;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.workspaceGuid = workspaceGuid;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  UtilityClient.prototype.leaveWorkspace = function(authenticationToken, workspaceGuid, callback) {
    var mdef = Utility.leaveWorkspace;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.workspaceGuid = workspaceGuid;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  UtilityClient.prototype.sendWorkspaceViewedEvent = function(authenticationToken, workspaceGuid, callback) {
    var mdef = Utility.sendWorkspaceViewedEvent;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.workspaceGuid = workspaceGuid;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  UtilityClient.prototype.expungeWorkspace = function(authenticationToken, workspaceGuid, callback) {
    var mdef = Utility.expungeWorkspace;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.workspaceGuid = workspaceGuid;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  UtilityClient.prototype.createSurveyNote = function(authenticationToken, note, surveyId, callback) {
    var mdef = Utility.createSurveyNote;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.note = note;
    args.surveyId = surveyId;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  UtilityClient.prototype.createSurvey = function(authenticationToken, survey, callback) {
    var mdef = Utility.createSurvey;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.survey = survey;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  UtilityClient.prototype.finalizeSurvey = function(authenticationToken, surveyId, callback) {
    var mdef = Utility.finalizeSurvey;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.surveyId = surveyId;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  UtilityClient.prototype.cloneSurvey = function(authenticationToken, surveyId, surveyName, copyRatings, copyComments, callback) {
    var mdef = Utility.cloneSurvey;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.surveyId = surveyId;
    args.surveyName = surveyName;
    args.copyRatings = copyRatings;
    args.copyComments = copyComments;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  UtilityClient.prototype.getLastOpenSurveyForEntity = function(authenticationToken, entityType, entityGuid, callback) {
    var mdef = Utility.getLastOpenSurveyForEntity;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.entityType = entityType;
    args.entityGuid = entityGuid;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  UtilityClient.prototype.listSurveysForEntity = function(authenticationToken, entityType, entityGuid, callback) {
    var mdef = Utility.listSurveysForEntity;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.entityType = entityType;
    args.entityGuid = entityGuid;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  UtilityClient.prototype.getSurveyItemForEntity = function(authenticationToken, entityType, entityGuid, surveyId, callback) {
    var mdef = Utility.getSurveyItemForEntity;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.entityType = entityType;
    args.entityGuid = entityGuid;
    args.surveyId = surveyId;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  UtilityClient.prototype.finalizeEntityForRating = function(authenticationToken, surveyId, entityType, entityGuid, category, callback) {
    var mdef = Utility.finalizeEntityForRating;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.surveyId = surveyId;
    args.entityType = entityType;
    args.entityGuid = entityGuid;
    args.category = category;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  UtilityClient.prototype.removeSurveyItem = function(authenticationToken, surveyId, surveyItemId, callback) {
    var mdef = Utility.removeSurveyItem;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.surveyId = surveyId;
    args.surveyItemId = surveyItemId;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  UtilityClient.prototype.saveSurveyItemRating = function(authenticationToken, surveyItemId, rating, callback) {
    var mdef = Utility.saveSurveyItemRating;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.surveyItemId = surveyItemId;
    args.rating = rating;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  UtilityClient.prototype.saveSurveyItemComment = function(authenticationToken, surveyItemId, comment, callback) {
    var mdef = Utility.saveSurveyItemComment;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.surveyItemId = surveyItemId;
    args.comment = comment;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  UtilityClient.prototype.addSurveyItemComment = function(authenticationToken, surveyItemId, comment, callback) {
    var mdef = Utility.addSurveyItemComment;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.surveyItemId = surveyItemId;
    args.comment = comment;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  UtilityClient.prototype.getConfigValuesAsJSON = function(authenticationToken, request, callback) {
    var mdef = Utility.getConfigValuesAsJSON;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.request = request;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  UtilityClient.prototype.addAllUsersFromBusinessToSpace = function(authenticationToken, spaceGuid, callback) {
    var mdef = Utility.addAllUsersFromBusinessToSpace;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.spaceGuid = spaceGuid;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  UtilityClient.prototype.listNotebooksForIonOnly = function(authenticationToken, callback) {
    var mdef = Utility.listNotebooksForIonOnly;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  UtilityClient.prototype.getMaxServiceUpdatedFromNotes = function(authenticationToken, notebookGuids, callback) {
    var mdef = Utility.getMaxServiceUpdatedFromNotes;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.notebookGuids = notebookGuids;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  UtilityClient.prototype.addResource = function(authenticationToken, resource, callback) {
    var mdef = Utility.addResource;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.resource = resource;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  UtilityClient.prototype.updateNoteIfUsnMatches = function(authenticationToken, note, resourcesUpdateRequest, callback) {
    var mdef = Utility.updateNoteIfUsnMatches;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.note = note;
    args.resourcesUpdateRequest = resourcesUpdateRequest;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  UtilityClient.prototype.createNote = function(authenticationToken, note, resourcesCreateRequest, callback) {
    var mdef = Utility.createNote;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.note = note;
    args.resourcesCreateRequest = resourcesCreateRequest;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  UtilityClient.prototype.listBetaFeatures = function(authenticationToken, callback) {
    var mdef = Utility.listBetaFeatures;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  UtilityClient.prototype.listBetaFeatureEnrollments = function(authenticationToken, callback) {
    var mdef = Utility.listBetaFeatureEnrollments;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  UtilityClient.prototype.enrollInBetaFeature = function(authenticationToken, featureKey, callback) {
    var mdef = Utility.enrollInBetaFeature;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.featureKey = featureKey;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  UtilityClient.prototype.enableBetaFeature = function(authenticationToken, featureKey, enrollmentGuid, enabled, callback) {
    var mdef = Utility.enableBetaFeature;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.featureKey = featureKey;
    args.enrollmentGuid = enrollmentGuid;
    args.enabled = enabled;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  UtilityClient.prototype.listEnabledFeatures = function(authenticationToken, callback) {
    var mdef = Utility.listEnabledFeatures;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  UtilityClient.prototype.checkEnabledFeatures = function(authenticationToken, featureKeysToCheck, callback) {
    var mdef = Utility.checkEnabledFeatures;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.featureKeysToCheck = featureKeysToCheck;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  UtilityClient.prototype.getNotePermissionsForRTE = function(authenticationToken, noteGuid, callback) {
    var mdef = Utility.getNotePermissionsForRTE;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.noteGuid = noteGuid;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  UtilityClient.prototype.pinContentToWidget = function(authenticationToken, workspaceGuid, entityType, entityGuidOrUri, callback) {
    var mdef = Utility.pinContentToWidget;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.workspaceGuid = workspaceGuid;
    args.entityType = entityType;
    args.entityGuidOrUri = entityGuidOrUri;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  UtilityClient.prototype.unpinContentFromWidget = function(authenticationToken, workspaceGuid, entityType, entityGuidOrUri, callback) {
    var mdef = Utility.unpinContentFromWidget;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.workspaceGuid = workspaceGuid;
    args.entityType = entityType;
    args.entityGuidOrUri = entityGuidOrUri;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  UtilityClient.prototype.listPinnedContent = function(authenticationToken, workspaceGuid, callback) {
    var mdef = Utility.listPinnedContent;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.workspaceGuid = workspaceGuid;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  UtilityClient.prototype.getWorkspaceNotebookSummary = function(authenticationToken, workspaceGuid, callback) {
    var mdef = Utility.getWorkspaceNotebookSummary;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.workspaceGuid = workspaceGuid;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  UtilityClient.prototype.updateContentOfPinnedWidget = function(authenticationToken, workspaceGuid, toBePinnedContentList, toBeUnpinnedContentList, callback) {
    var mdef = Utility.updateContentOfPinnedWidget;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.workspaceGuid = workspaceGuid;
    args.toBePinnedContentList = toBePinnedContentList;
    args.toBeUnpinnedContentList = toBeUnpinnedContentList;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  UtilityClient.prototype.replaceAllPinnedContentOfWidget = function(authenticationToken, workspaceGuid, pinnedContentList, callback) {
    var mdef = Utility.replaceAllPinnedContentOfWidget;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.workspaceGuid = workspaceGuid;
    args.pinnedContentList = pinnedContentList;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  UtilityClient.prototype.requestAccessToWorkspace = function(authToken, workspaceGuid, callback) {
    var mdef = Utility.requestAccessToWorkspace;
    var args = new mdef.args();
    args.authToken = authToken;
    args.workspaceGuid = workspaceGuid;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  UtilityClient.prototype.listRecommendedNotes = function(authenticationToken, request, offset, maxNotes, callback) {
    var mdef = Utility.listRecommendedNotes;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.request = request;
    args.offset = offset;
    args.maxNotes = maxNotes;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  module.exports.Utility.Client = UtilityClient;

  // Define Utility Server

  function UtilityServer(service, stransport, Protocol) {
    var methodName;
      this.service = service;
      this.stransport = stransport;
      this.processor = new Thrift.Processor();
      for (methodName in Utility) {
        if (service[methodName]) {
          this.processor.addMethod(Utility[methodName], service[methodName].bind(service));
        }
      }
      this.stransport.process = function (input, output, noop) {
      var inprot = new Protocol(input);
      var outprot = new Protocol(output);
      this.processor.process(inprot, outprot, noop);
    }.bind(this);
  }

  UtilityServer.prototype.start = function () {
    this.stransport.listen();
  };
  UtilityServer.prototype.stop = function () {
    this.stransport.close();
  };

  module.exports.Utility.Server = UtilityServer;



/***/ }),

/***/ 83:
/***/ (function(module, exports, __webpack_require__) {

//
// Autogenerated by Thrift Compiler (0.6.0-en-exported)
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//


  // Define types and services

  var Thrift = __webpack_require__(0).Thrift;

  module.exports.AuthenticationErrorCode = {
    'UNKNOWN' : 1,
    'BAD_OPENID_FORMAT' : 2,
    'INTERNAL_ERROR' : 3,
    'DATA_REQUIRED' : 4,
    'OPENID_EXPIRED' : 5
  };

  module.exports.UserNotFoundException = Thrift.Exception.define('UserNotFoundException',  {
    1: { alias: 'errorCode', type: Thrift.Type.I32 },
    2: { alias: 'message', type: Thrift.Type.STRING }
  });

  module.exports.SystemException = Thrift.Exception.define('SystemException',  {
    1: { alias: 'errorCode', type: Thrift.Type.I32 },
    2: { alias: 'message', type: Thrift.Type.STRING }
  });

  module.exports.BadOpenIDException = Thrift.Exception.define('BadOpenIDException',  {
    1: { alias: 'errorCode', type: Thrift.Type.I32 },
    2: { alias: 'message', type: Thrift.Type.STRING }
  });



/***/ }),

/***/ 84:
/***/ (function(module, exports, __webpack_require__) {

//
// Autogenerated by Thrift Compiler (0.7.0-en-11139b3b5cb61e817408c6e84b0e1c258bf6c6ae)
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//


  // Define types and services

  var Thrift = __webpack_require__(0).Thrift;
  var Types = __webpack_require__(3);


  module.exports.IncentiveRedemptionStatus = {
    'ACTIVE' : 1,
    'IN_PROGRESS' : 2,
    'REDEEMED' : 3,
    'EXPIRED' : 4
  };

  module.exports.IncentiveType = {
    'BONUS' : 1,
    'SAVINGS' : 2,
    'TRIAL' : 3
  };

  module.exports.IncentiveValidationType = {
    'SIGNATURE' : 1,
    'SILVERPOP' : 2
  };

  module.exports.IncentiveTimeUnit = {
    'DAYS' : 1,
    'WEEKS' : 2,
    'MONTHS' : 3,
    'YEARS' : 4
  };

  module.exports.IncentiveAttributeType = {
    'ELIGIBLE_SKU' : 1,
    'COUNTRY_RESTRICTION' : 2,
    'CURRENCY_RESTRICTION' : 3,
    'COMMERCE_SERVICE_RESTRICTION' : 4,
    'EMAIL_RESTRICTION' : 5,
    'LANGUAGE_RESTRICTION' : 6,
    'SKU_RESTRICTION' : 7,
    'SERVICE_LEVEL_RESTRICTION' : 8
  };

  module.exports.IncentiveEligibility = Thrift.Struct.define('IncentiveEligibility',  {
    1: { alias: 'requiredOffer', type: Thrift.Type.STRING },
    2: { alias: 'requiredOrigin', type: Thrift.Type.STRING },
    3: { alias: 'validationType', type: Thrift.Type.I32 },
    4: { alias: 'validationSecret', type: Thrift.Type.STRING },
    5: { alias: 'redemptionsAllowed', type: Thrift.Type.BYTE },
    6: { alias: 'redemptionsAllowedUnit', type: Thrift.Type.I32 },
    7: { alias: 'createdBefore', type: Thrift.Type.I64 },
    8: { alias: 'requiredCountries', type: Thrift.Type.SET, def: Thrift.Set.define(Thrift.Type.STRING) },
    9: { alias: 'requiredCurrencies', type: Thrift.Type.SET, def: Thrift.Set.define(Thrift.Type.STRING) },
    10: { alias: 'requiredCommerceServices', type: Thrift.Type.SET, def: Thrift.Set.define(Thrift.Type.STRING) },
    11: { alias: 'requiredEmailSuffixes', type: Thrift.Type.SET, def: Thrift.Set.define(Thrift.Type.STRING) },
    12: { alias: 'requiredLanguages', type: Thrift.Type.SET, def: Thrift.Set.define(Thrift.Type.STRING) },
    13: { alias: 'requiredSkus', type: Thrift.Type.SET, def: Thrift.Set.define(Thrift.Type.STRING) },
    14: { alias: 'requiredServiceLevels', type: Thrift.Type.SET, def: Thrift.Set.define(Thrift.Type.I32) }
  });

  module.exports.Incentive = Thrift.Struct.define('Incentive',  {
    1: { alias: 'id', type: Thrift.Type.I32 },
    2: { alias: 'internalName', type: Thrift.Type.STRING },
    3: { alias: 'promoCode', type: Thrift.Type.STRING },
    4: { alias: 'enabled', type: Thrift.Type.BOOL },
    5: { alias: 'startDate', type: Thrift.Type.I64 },
    6: { alias: 'endDate', type: Thrift.Type.I64 },
    7: { alias: 'incentiveType', type: Thrift.Type.I32 },
    8: { alias: 'percentSaved', type: Thrift.Type.I32 },
    9: { alias: 'incentiveTimeLength', type: Thrift.Type.BYTE },
    10: { alias: 'incentiveTimeUnit', type: Thrift.Type.I32 },
    11: { alias: 'eligibleSkuCodes', type: Thrift.Type.SET, def: Thrift.Set.define(Thrift.Type.STRING) },
    12: { alias: 'eligibilityFilters', type: Thrift.Type.STRUCT, def: module.exports.IncentiveEligibility }
  });

  module.exports.IncentiveAssociation = Thrift.Struct.define('IncentiveAssociation',  {
    1: { alias: 'id', type: Thrift.Type.I64 },
    2: { alias: 'incentiveId', type: Thrift.Type.I32 },
    3: { alias: 'userId', type: Thrift.Type.I32 },
    4: { alias: 'created', type: Thrift.Type.I64 },
    5: { alias: 'userSignature', type: Thrift.Type.STRING },
    6: { alias: 'overrideEligibility', type: Thrift.Type.BOOL },
    7: { alias: 'redemptionStatus', type: Thrift.Type.I32 },
    8: { alias: 'redemptionStatusUpdated', type: Thrift.Type.I64 },
    9: { alias: 'redemptionOrderNumber', type: Thrift.Type.STRING }
  });



/***/ }),

/***/ 85:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_85__;

/***/ }),

/***/ 86:
/***/ (function(module, exports, __webpack_require__) {

//
// Autogenerated by Thrift Compiler (0.7.0-en-11139b3b5cb61e817408c6e84b0e1c258bf6c6ae)
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//


  // Define types and services

  var Thrift = __webpack_require__(0).Thrift;
  var Errors = __webpack_require__(7);
  var Types = __webpack_require__(3);
  var NoteStore = __webpack_require__(42);


  module.exports.NoteShareAdminShareType = {
    'SHARED_WITH_BUSINESS' : 0,
    'SHARED_BY_PUBLIC_LINK' : 1,
    'SHARED_WITH_INTERNAL_INDIVIDUAL' : 2,
    'SHARED_WITH_EXTERNAL_INDIVIDUAL' : 3
  };

  module.exports.RecommendationReasonType = {
    'NOTE_CREATOR' : 0,
    'NOTE_EDITOR' : 1,
    'NOTEBOOK_CONTRIBUTOR' : 2,
    'NOTEBOOK_MEMBER' : 3,
    'POPULAR' : 4,
    'NOTEBOOK_RECENT_CONTRIBUTOR' : 5,
    'RELATED_CONTENT' : 6,
    'USER_HISTORY' : 7,
    'NOTEBOOK_ACTIVE_CONTRIBUTOR' : 8
  };

  module.exports.NoteRecommendationEventType = {
    'NOTE_CREATED' : 0,
    'NOTE_UPDATED' : 1
  };

  module.exports.EducationCardType = {
    'CREATE_BUSINESS_NOTEBOOK' : 0,
    'CREATE_BUSINESS_NOTE' : 1,
    'START_WORKCHAT' : 2,
    'INSTALL_WEBCLIPPER' : 3,
    'LEARN_CONTEXT' : 4,
    'PUBLISH_BUSINESS_NOTEBOOK' : 5
  };

  module.exports.BusinessAutoApproveDomain = Thrift.Struct.define('BusinessAutoApproveDomain',  {
    1: { alias: 'emailDomain', type: Thrift.Type.STRING },
    2: { alias: 'confirmed', type: Thrift.Type.BOOL }
  });

  module.exports.NoteShareAdminFilter = Thrift.Struct.define('NoteShareAdminFilter',  {
    1: { alias: 'shareType', type: Thrift.Type.I32 },
    2: { alias: 'query', type: Thrift.Type.STRING },
    3: { alias: 'minPrivilegeLevel', type: Thrift.Type.I32 },
    4: { alias: 'startAt', type: Thrift.Type.I32 }
  });

  module.exports.NoteShareAdminResult = Thrift.Struct.define('NoteShareAdminResult',  {
    1: { alias: 'endsAt', type: Thrift.Type.I32 },
    2: { alias: 'hasMoreNoteShares', type: Thrift.Type.BOOL },
    3: { alias: 'notes', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, Types.Note)  },
    4: { alias: 'notebooks', type: Thrift.Type.MAP, def: Thrift.Map.define(Thrift.Type.STRING, Thrift.Type.STRUCT, Types.Notebook)  },
    5: { alias: 'users', type: Thrift.Type.MAP, def: Thrift.Map.define(Thrift.Type.I32, Thrift.Type.STRUCT, Types.User)  },
    6: { alias: 'identities', type: Thrift.Type.MAP, def: Thrift.Map.define(Thrift.Type.I64, Thrift.Type.STRUCT, Types.Identity)  },
    7: { alias: 'shareRelationships', type: Thrift.Type.MAP, def: Thrift.Map.define(Thrift.Type.STRING, Thrift.Type.STRUCT, NoteStore.NoteShareRelationships)  }
  });

  module.exports.RecommendationReason = Thrift.Struct.define('RecommendationReason',  {
    1: { alias: 'reasonType', type: Thrift.Type.I32 },
    2: { alias: 'guid', type: Thrift.Type.STRING }
  });

  module.exports.NoteRecommendationEvent = Thrift.Struct.define('NoteRecommendationEvent',  {
    1: { alias: 'eventType', type: Thrift.Type.I32 },
    2: { alias: 'timestamp', type: Thrift.Type.I64 },
    3: { alias: 'userIds', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.I32)  },
    4: { alias: 'unlistedUserIdCount', type: Thrift.Type.I32 }
  });

  module.exports.RecommendedNote = Thrift.Struct.define('RecommendedNote',  {
    1: { alias: 'noteMetadata', type: Thrift.Type.STRUCT, def: NoteStore.NoteMetadata },
    2: { alias: 'activeUserIds', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.I32)  },
    3: { alias: 'snippetText', type: Thrift.Type.STRING },
    4: { alias: 'reason', type: Thrift.Type.STRUCT, def: module.exports.RecommendationReason },
    5: { alias: 'event', type: Thrift.Type.STRUCT, def: module.exports.NoteRecommendationEvent },
    6: { alias: 'canShare', type: Thrift.Type.BOOL },
    7: { alias: 'largestResourceFileName', type: Thrift.Type.STRING },
    8: { alias: 'largestResourceGuid', type: Thrift.Type.STRING }
  });

  module.exports.RecommendedNotebook = Thrift.Struct.define('RecommendedNotebook',  {
    1: { alias: 'guid', type: Thrift.Type.STRING },
    2: { alias: 'activeUserIds', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.I32)  },
    3: { alias: 'reason', type: Thrift.Type.STRUCT, def: module.exports.RecommendationReason }
  });

  module.exports.EducationCard = Thrift.Struct.define('EducationCard',  {
    1: { alias: 'educationCardType', type: Thrift.Type.I32 },
    2: { alias: 'promotionId', type: Thrift.Type.STRING },
    3: { alias: 'objectId', type: Thrift.Type.STRING }
  });

  module.exports.BusinessSummary = Thrift.Struct.define('BusinessSummary',  {
    1: { alias: 'recommendedNotes', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, module.exports.RecommendedNote)  },
    2: { alias: 'recommendedNotebooks', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, module.exports.RecommendedNotebook)  },
    3: { alias: 'trendingNotebooks', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, module.exports.RecommendedNotebook)  },
    4: { alias: 'recommendedArticles', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, Types.RelatedContent)  },
    5: { alias: 'educationCards', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, module.exports.EducationCard)  },
    6: { alias: 'summaryPeriodStart', type: Thrift.Type.I64 },
    7: { alias: 'summaryPeriodEnd', type: Thrift.Type.I64 },
    8: { alias: 'updated', type: Thrift.Type.I64 },
    9: { alias: 'debugInfo', type: Thrift.Type.STRING }
  });

  module.exports.BusinessSummaryResultSpec = Thrift.Struct.define('BusinessSummaryResultSpec',  {
    1: { alias: 'includeDebugInfo', type: Thrift.Type.BOOL }
  });

  module.exports.BusinessSummaryNotificationResult = Thrift.Struct.define('BusinessSummaryNotificationResult',  {
    1: { alias: 'topActiveUserIds', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.I32)  },
    2: { alias: 'totalActiveUsers', type: Thrift.Type.I32 }
  });

  module.exports.SecurityDetails = Thrift.Struct.define('SecurityDetails',  {
    1: { alias: 'twoFactorEnabled', type: Thrift.Type.BOOL }
  });

  module.exports.UserProfileWithSecurityDetails = Thrift.Struct.define('UserProfileWithSecurityDetails',  {
    1: { alias: 'userProfile', type: Thrift.Type.STRUCT, def: Types.UserProfile },
    2: { alias: 'securityDetails', type: Thrift.Type.STRUCT, def: module.exports.SecurityDetails },
    3: { alias: 'status', type: Thrift.Type.I32 }
  });

  module.exports.ClientAccessEntriesPage = Thrift.Struct.define('ClientAccessEntriesPage',  {
    1: { alias: 'entries', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, Types.ClientAccessEntry)  },
    2: { alias: 'hasMore', type: Thrift.Type.BOOL }
  });

  module.exports.ServiceAccessEntriesPage = Thrift.Struct.define('ServiceAccessEntriesPage',  {
    1: { alias: 'entries', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, Types.ServiceAccessEntry)  },
    2: { alias: 'hasMore', type: Thrift.Type.BOOL }
  });

  module.exports.BusinessAppTokenMetadata = Thrift.Struct.define('BusinessAppTokenMetadata',  {
    1: { alias: 'created', type: Thrift.Type.I64 },
    2: { alias: 'expires', type: Thrift.Type.I64 }
  });

  module.exports.CreateBusinessAppTokenResponse = Thrift.Struct.define('CreateBusinessAppTokenResponse',  {
    1: { alias: 'token', type: Thrift.Type.STRING },
    2: { alias: 'metadata', type: Thrift.Type.STRUCT, def: module.exports.BusinessAppTokenMetadata }
  });

  var BusinessService = module.exports.BusinessService = {};

  BusinessService.findNoteShares = Thrift.Method.define({
    alias: 'findNoteShares',
    args: Thrift.Struct.define('findNoteSharesArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'filter', type: Thrift.Type.STRUCT, def: module.exports.NoteShareAdminFilter, index: 1 }
    }),
    result: Thrift.Struct.define('findNoteSharesResult', {
      0: { alias: 'returnValue',type: Thrift.Type.STRUCT, def: module.exports.NoteShareAdminResult },
      1: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      2: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException }
    })
  });

  BusinessService.getBusinessSummary = Thrift.Method.define({
    alias: 'getBusinessSummary',
    args: Thrift.Struct.define('getBusinessSummaryArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'resultSpec', type: Thrift.Type.STRUCT, def: module.exports.BusinessSummaryResultSpec, index: 1 }
    }),
    result: Thrift.Struct.define('getBusinessSummaryResult', {
      0: { alias: 'returnValue',type: Thrift.Type.STRUCT, def: module.exports.BusinessSummary },
      1: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      2: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException }
    })
  });

  BusinessService.getBusinessSummaryNotificationDetails = Thrift.Method.define({
    alias: 'getBusinessSummaryNotificationDetails',
    args: Thrift.Struct.define('getBusinessSummaryNotificationDetailsArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 }
    }),
    result: Thrift.Struct.define('getBusinessSummaryNotificationDetailsResult', {
      0: { alias: 'returnValue',type: Thrift.Type.STRUCT, def: module.exports.BusinessSummaryNotificationResult },
      1: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      2: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException }
    })
  });

  BusinessService.listBusinessInvitations = Thrift.Method.define({
    alias: 'listBusinessInvitations',
    args: Thrift.Struct.define('listBusinessInvitationsArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 }
    }),
    result: Thrift.Struct.define('listBusinessInvitationsResult', {
      0: { alias: 'returnValue',type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, Types.BusinessInvitation)  },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
    })
  });

  BusinessService.approveInvitations = Thrift.Method.define({
    alias: 'approveInvitations',
    args: Thrift.Struct.define('approveInvitationsArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'emails', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRING) , index: 1 }
    }),
    result: Thrift.Struct.define('approveInvitationsResult', {
      0: { alias: 'returnValue',type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, Types.BusinessInvitation)  },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
    })
  });

  BusinessService.removeInvitations = Thrift.Method.define({
    alias: 'removeInvitations',
    args: Thrift.Struct.define('removeInvitationsArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'emails', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRING) , index: 1 }
    }),
    result: Thrift.Struct.define('removeInvitationsResult', {
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
    })
  });

  BusinessService.listBusinessUserProfilesWithSecurityDetails = Thrift.Method.define({
    alias: 'listBusinessUserProfilesWithSecurityDetails',
    args: Thrift.Struct.define('listBusinessUserProfilesWithSecurityDetailsArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 }
    }),
    result: Thrift.Struct.define('listBusinessUserProfilesWithSecurityDetailsResult', {
      0: { alias: 'returnValue',type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, module.exports.UserProfileWithSecurityDetails)  },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
    })
  });

  BusinessService.setBusinessUserRole = Thrift.Method.define({
    alias: 'setBusinessUserRole',
    args: Thrift.Struct.define('setBusinessUserRoleArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'userId', type: Thrift.Type.I32, index: 1 },
      3: { alias: 'role', type: Thrift.Type.I32, index: 2 }
    }),
    result: Thrift.Struct.define('setBusinessUserRoleResult', {
      1: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException },
      2: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      3: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
    })
  });

  BusinessService.setBusinessEmailForUser = Thrift.Method.define({
    alias: 'setBusinessEmailForUser',
    args: Thrift.Struct.define('setBusinessEmailForUserArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'userId', type: Thrift.Type.I32, index: 1 },
      3: { alias: 'email', type: Thrift.Type.STRING, index: 2 }
    }),
    result: Thrift.Struct.define('setBusinessEmailForUserResult', {
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
    })
  });

  BusinessService.getClientAccessHistoryForUser = Thrift.Method.define({
    alias: 'getClientAccessHistoryForUser',
    args: Thrift.Struct.define('getClientAccessHistoryForUserArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'startDateInMillis', type: Thrift.Type.I64, index: 1 },
      3: { alias: 'endDateInMillis', type: Thrift.Type.I64, index: 2 },
      4: { alias: 'pageSize', type: Thrift.Type.I32, index: 3 },
      5: { alias: 'before', type: Thrift.Type.STRUCT, def: Types.ClientAccessEntry, index: 4 }
    }),
    result: Thrift.Struct.define('getClientAccessHistoryForUserResult', {
      0: { alias: 'returnValue',type: Thrift.Type.STRUCT, def: module.exports.ClientAccessEntriesPage },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
    })
  });

  BusinessService.getServiceAccessHistoryForUser = Thrift.Method.define({
    alias: 'getServiceAccessHistoryForUser',
    args: Thrift.Struct.define('getServiceAccessHistoryForUserArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'startDateInMillis', type: Thrift.Type.I64, index: 1 },
      3: { alias: 'endDateInMillis', type: Thrift.Type.I64, index: 2 },
      4: { alias: 'pageSize', type: Thrift.Type.I32, index: 3 },
      5: { alias: 'before', type: Thrift.Type.STRUCT, def: Types.ServiceAccessEntry, index: 4 }
    }),
    result: Thrift.Struct.define('getServiceAccessHistoryForUserResult', {
      0: { alias: 'returnValue',type: Thrift.Type.STRUCT, def: module.exports.ServiceAccessEntriesPage },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
    })
  });

  BusinessService.isAvailableForAutoApproval = Thrift.Method.define({
    alias: 'isAvailableForAutoApproval',
    args: Thrift.Struct.define('isAvailableForAutoApprovalArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'emailDomain', type: Thrift.Type.STRING, index: 1 }
    }),
    result: Thrift.Struct.define('isAvailableForAutoApprovalResult', {
      0: { alias: 'returnValue',type: Thrift.Type.BOOL },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException }
    })
  });

  BusinessService.listAutoApproveDomains = Thrift.Method.define({
    alias: 'listAutoApproveDomains',
    args: Thrift.Struct.define('listAutoApproveDomainsArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 }
    }),
    result: Thrift.Struct.define('listAutoApproveDomainsResult', {
      0: { alias: 'returnValue',type: Thrift.Type.SET, def: Thrift.Set.define(Thrift.Type.STRUCT, module.exports.BusinessAutoApproveDomain) },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
    })
  });

  BusinessService.listJoinableAutoApproveDomains = Thrift.Method.define({
    alias: 'listJoinableAutoApproveDomains',
    args: Thrift.Struct.define('listJoinableAutoApproveDomainsArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 }
    }),
    result: Thrift.Struct.define('listJoinableAutoApproveDomainsResult', {
      0: { alias: 'returnValue',type: Thrift.Type.SET, def: Thrift.Set.define(Thrift.Type.STRING) },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
    })
  });

  BusinessService.removeAutoApproveDomain = Thrift.Method.define({
    alias: 'removeAutoApproveDomain',
    args: Thrift.Struct.define('removeAutoApproveDomainArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'domain', type: Thrift.Type.STRING, index: 1 }
    }),
    result: Thrift.Struct.define('removeAutoApproveDomainResult', {
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
    })
  });

  BusinessService.reserveAutoApproveDomain = Thrift.Method.define({
    alias: 'reserveAutoApproveDomain',
    args: Thrift.Struct.define('reserveAutoApproveDomainArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'confirmationEmail', type: Thrift.Type.STRING, index: 1 }
    }),
    result: Thrift.Struct.define('reserveAutoApproveDomainResult', {
      0: { alias: 'returnValue',type: Thrift.Type.STRUCT, def: module.exports.BusinessAutoApproveDomain },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
    })
  });

  BusinessService.resendAutoApproveDomainConfirmationEmail = Thrift.Method.define({
    alias: 'resendAutoApproveDomainConfirmationEmail',
    args: Thrift.Struct.define('resendAutoApproveDomainConfirmationEmailArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'domain', type: Thrift.Type.STRING, index: 1 }
    }),
    result: Thrift.Struct.define('resendAutoApproveDomainConfirmationEmailResult', {
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException },
      3: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
    })
  });

  BusinessService.getDisplayNamesForExternalUsers = Thrift.Method.define({
    alias: 'getDisplayNamesForExternalUsers',
    args: Thrift.Struct.define('getDisplayNamesForExternalUsersArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'userIds', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.I32) , index: 1 }
    }),
    result: Thrift.Struct.define('getDisplayNamesForExternalUsersResult', {
      0: { alias: 'returnValue',type: Thrift.Type.MAP, def: Thrift.Map.define(Thrift.Type.I32, Thrift.Type.STRING )  },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
    })
  });

  BusinessService.revokeAccess = Thrift.Method.define({
    alias: 'revokeAccess',
    args: Thrift.Struct.define('revokeAccessArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'userId', type: Thrift.Type.I32, index: 1 }
    }),
    result: Thrift.Struct.define('revokeAccessResult', {
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
    })
  });

  BusinessService.deactivateBusinessUser = Thrift.Method.define({
    alias: 'deactivateBusinessUser',
    args: Thrift.Struct.define('deactivateBusinessUserArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'userId', type: Thrift.Type.I32, index: 1 }
    }),
    result: Thrift.Struct.define('deactivateBusinessUserResult', {
      0: { alias: 'returnValue',type: Thrift.Type.BOOL },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
    })
  });

  BusinessService.reactivateBusinessUserAndChargeBusiness = Thrift.Method.define({
    alias: 'reactivateBusinessUserAndChargeBusiness',
    args: Thrift.Struct.define('reactivateBusinessUserAndChargeBusinessArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'userId', type: Thrift.Type.I32, index: 1 }
    }),
    result: Thrift.Struct.define('reactivateBusinessUserAndChargeBusinessResult', {
      0: { alias: 'returnValue',type: Thrift.Type.BOOL },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
    })
  });

  BusinessService.createAccessToken = Thrift.Method.define({
    alias: 'createAccessToken',
    args: Thrift.Struct.define('createAccessTokenArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'tokenType', type: Thrift.Type.STRING, index: 1 }
    }),
    result: Thrift.Struct.define('createAccessTokenResult', {
      0: { alias: 'returnValue',type: Thrift.Type.STRUCT, def: module.exports.CreateBusinessAppTokenResponse },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException },
      3: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
    })
  });

  BusinessService.revokeAccessToken = Thrift.Method.define({
    alias: 'revokeAccessToken',
    args: Thrift.Struct.define('revokeAccessTokenArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'tokenType', type: Thrift.Type.STRING, index: 1 }
    }),
    result: Thrift.Struct.define('revokeAccessTokenResult', {
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException },
      3: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
    })
  });

  BusinessService.getAccessTokenMetadata = Thrift.Method.define({
    alias: 'getAccessTokenMetadata',
    args: Thrift.Struct.define('getAccessTokenMetadataArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'tokenType', type: Thrift.Type.STRING, index: 1 }
    }),
    result: Thrift.Struct.define('getAccessTokenMetadataResult', {
      0: { alias: 'returnValue',type: Thrift.Type.STRUCT, def: module.exports.BusinessAppTokenMetadata },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException },
      3: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
    })
  });

  // Define BusinessService Client

  function BusinessServiceClient(output) {
    this.output = output;
    this.seqid = 0;
  }

  BusinessServiceClient.prototype.findNoteShares = function(authenticationToken, filter, callback) {
    var mdef = BusinessService.findNoteShares;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.filter = filter;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  BusinessServiceClient.prototype.getBusinessSummary = function(authenticationToken, resultSpec, callback) {
    var mdef = BusinessService.getBusinessSummary;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.resultSpec = resultSpec;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  BusinessServiceClient.prototype.getBusinessSummaryNotificationDetails = function(authenticationToken, callback) {
    var mdef = BusinessService.getBusinessSummaryNotificationDetails;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  BusinessServiceClient.prototype.listBusinessInvitations = function(authenticationToken, callback) {
    var mdef = BusinessService.listBusinessInvitations;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  BusinessServiceClient.prototype.approveInvitations = function(authenticationToken, emails, callback) {
    var mdef = BusinessService.approveInvitations;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.emails = emails;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  BusinessServiceClient.prototype.removeInvitations = function(authenticationToken, emails, callback) {
    var mdef = BusinessService.removeInvitations;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.emails = emails;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  BusinessServiceClient.prototype.listBusinessUserProfilesWithSecurityDetails = function(authenticationToken, callback) {
    var mdef = BusinessService.listBusinessUserProfilesWithSecurityDetails;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  BusinessServiceClient.prototype.setBusinessUserRole = function(authenticationToken, userId, role, callback) {
    var mdef = BusinessService.setBusinessUserRole;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.userId = userId;
    args.role = role;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  BusinessServiceClient.prototype.setBusinessEmailForUser = function(authenticationToken, userId, email, callback) {
    var mdef = BusinessService.setBusinessEmailForUser;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.userId = userId;
    args.email = email;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  BusinessServiceClient.prototype.getClientAccessHistoryForUser = function(authenticationToken, startDateInMillis, endDateInMillis, pageSize, before, callback) {
    var mdef = BusinessService.getClientAccessHistoryForUser;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.startDateInMillis = startDateInMillis;
    args.endDateInMillis = endDateInMillis;
    args.pageSize = pageSize;
    args.before = before;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  BusinessServiceClient.prototype.getServiceAccessHistoryForUser = function(authenticationToken, startDateInMillis, endDateInMillis, pageSize, before, callback) {
    var mdef = BusinessService.getServiceAccessHistoryForUser;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.startDateInMillis = startDateInMillis;
    args.endDateInMillis = endDateInMillis;
    args.pageSize = pageSize;
    args.before = before;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  BusinessServiceClient.prototype.isAvailableForAutoApproval = function(authenticationToken, emailDomain, callback) {
    var mdef = BusinessService.isAvailableForAutoApproval;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.emailDomain = emailDomain;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  BusinessServiceClient.prototype.listAutoApproveDomains = function(authenticationToken, callback) {
    var mdef = BusinessService.listAutoApproveDomains;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  BusinessServiceClient.prototype.listJoinableAutoApproveDomains = function(authenticationToken, callback) {
    var mdef = BusinessService.listJoinableAutoApproveDomains;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  BusinessServiceClient.prototype.removeAutoApproveDomain = function(authenticationToken, domain, callback) {
    var mdef = BusinessService.removeAutoApproveDomain;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.domain = domain;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  BusinessServiceClient.prototype.reserveAutoApproveDomain = function(authenticationToken, confirmationEmail, callback) {
    var mdef = BusinessService.reserveAutoApproveDomain;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.confirmationEmail = confirmationEmail;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  BusinessServiceClient.prototype.resendAutoApproveDomainConfirmationEmail = function(authenticationToken, domain, callback) {
    var mdef = BusinessService.resendAutoApproveDomainConfirmationEmail;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.domain = domain;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  BusinessServiceClient.prototype.getDisplayNamesForExternalUsers = function(authenticationToken, userIds, callback) {
    var mdef = BusinessService.getDisplayNamesForExternalUsers;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.userIds = userIds;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  BusinessServiceClient.prototype.revokeAccess = function(authenticationToken, userId, callback) {
    var mdef = BusinessService.revokeAccess;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.userId = userId;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  BusinessServiceClient.prototype.deactivateBusinessUser = function(authenticationToken, userId, callback) {
    var mdef = BusinessService.deactivateBusinessUser;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.userId = userId;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  BusinessServiceClient.prototype.reactivateBusinessUserAndChargeBusiness = function(authenticationToken, userId, callback) {
    var mdef = BusinessService.reactivateBusinessUserAndChargeBusiness;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.userId = userId;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  BusinessServiceClient.prototype.createAccessToken = function(authenticationToken, tokenType, callback) {
    var mdef = BusinessService.createAccessToken;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.tokenType = tokenType;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  BusinessServiceClient.prototype.revokeAccessToken = function(authenticationToken, tokenType, callback) {
    var mdef = BusinessService.revokeAccessToken;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.tokenType = tokenType;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  BusinessServiceClient.prototype.getAccessTokenMetadata = function(authenticationToken, tokenType, callback) {
    var mdef = BusinessService.getAccessTokenMetadata;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.tokenType = tokenType;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  module.exports.BusinessService.Client = BusinessServiceClient;

  // Define BusinessService Server

  function BusinessServiceServer(service, stransport, Protocol) {
    var methodName;
      this.service = service;
      this.stransport = stransport;
      this.processor = new Thrift.Processor();
      for (methodName in BusinessService) {
        if (service[methodName]) {
          this.processor.addMethod(BusinessService[methodName], service[methodName].bind(service));
        }
      }
      this.stransport.process = function (input, output, noop) {
      var inprot = new Protocol(input);
      var outprot = new Protocol(output);
      this.processor.process(inprot, outprot, noop);
    }.bind(this);
  }

  BusinessServiceServer.prototype.start = function () {
    this.stransport.listen();
  };
  BusinessServiceServer.prototype.stop = function () {
    this.stransport.close();
  };

  module.exports.BusinessService.Server = BusinessServiceServer;



/***/ }),

/***/ 88:
/***/ (function(module, exports, __webpack_require__) {

//
// Autogenerated by Thrift Compiler (0.7.0-en-11139b3b5cb61e817408c6e84b0e1c258bf6c6ae)
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//


  // Define types and services

  var Thrift = __webpack_require__(0).Thrift;
  var CommerceInternal = __webpack_require__(84);
  var Errors = __webpack_require__(7);
  var Types = __webpack_require__(3);
  var Utility = __webpack_require__(82);


  module.exports.BetaFeatureStatusInternal = {
    'OPEN' : 0,
    'CLOSED' : 100
  };

  module.exports.CreateBusinessDiscountDealRequest = Thrift.Struct.define('CreateBusinessDiscountDealRequest',  {
    1: { alias: 'creatorId', type: Thrift.Type.I32 },
    2: { alias: 'businessId', type: Thrift.Type.I32 },
    3: { alias: 'unitPrice', type: Thrift.Type.I32 },
    4: { alias: 'startDate', type: Thrift.Type.I64 },
    5: { alias: 'endDate', type: Thrift.Type.I64 },
    6: { alias: 'seatCount', type: Thrift.Type.I32 }
  });

  module.exports.UpdateBusinessDiscountDealRequest = Thrift.Struct.define('UpdateBusinessDiscountDealRequest',  {
    1: { alias: 'id', type: Thrift.Type.I32 },
    2: { alias: 'unitPrice', type: Thrift.Type.I32 },
    3: { alias: 'currencyCode', type: Thrift.Type.STRING },
    4: { alias: 'startDate', type: Thrift.Type.I64 },
    5: { alias: 'endDate', type: Thrift.Type.I64 },
    6: { alias: 'seatCount', type: Thrift.Type.I32 }
  });

  module.exports.BusinessDiscountDeal = Thrift.Struct.define('BusinessDiscountDeal',  {
    1: { alias: 'id', type: Thrift.Type.I32 },
    2: { alias: 'creatorId', type: Thrift.Type.I32 },
    3: { alias: 'created', type: Thrift.Type.I64 },
    4: { alias: 'businessId', type: Thrift.Type.I32 },
    5: { alias: 'unitPrice', type: Thrift.Type.I32 },
    6: { alias: 'currencyCode', type: Thrift.Type.STRING },
    7: { alias: 'startDate', type: Thrift.Type.I64 },
    8: { alias: 'endDate', type: Thrift.Type.I64 },
    9: { alias: 'seatCount', type: Thrift.Type.I32 }
  });

  module.exports.CreateBusinessDiscountOfferRequest = Thrift.Struct.define('CreateBusinessDiscountOfferRequest',  {
    1: { alias: 'creatorId', type: Thrift.Type.I32 },
    2: { alias: 'unitPrice', type: Thrift.Type.I32 },
    3: { alias: 'currencyCode', type: Thrift.Type.STRING },
    4: { alias: 'email', type: Thrift.Type.STRING },
    5: { alias: 'businessName', type: Thrift.Type.STRING },
    6: { alias: 'seatCount', type: Thrift.Type.I32 },
    7: { alias: 'expiry', type: Thrift.Type.I64 }
  });

  module.exports.UpdateBusinessDiscountOfferRequest = Thrift.Struct.define('UpdateBusinessDiscountOfferRequest',  {
    1: { alias: 'id', type: Thrift.Type.I32 },
    2: { alias: 'unitPrice', type: Thrift.Type.I32 },
    3: { alias: 'currencyCode', type: Thrift.Type.STRING },
    4: { alias: 'email', type: Thrift.Type.STRING },
    5: { alias: 'businessName', type: Thrift.Type.STRING },
    6: { alias: 'seatCount', type: Thrift.Type.I32 },
    7: { alias: 'expiry', type: Thrift.Type.I64 }
  });

  module.exports.BusinessDiscountOffer = Thrift.Struct.define('BusinessDiscountOffer',  {
    1: { alias: 'id', type: Thrift.Type.I32 },
    2: { alias: 'creatorId', type: Thrift.Type.I32 },
    3: { alias: 'created', type: Thrift.Type.I64 },
    4: { alias: 'unitPrice', type: Thrift.Type.I32 },
    5: { alias: 'currencyCode', type: Thrift.Type.STRING },
    6: { alias: 'email', type: Thrift.Type.STRING },
    7: { alias: 'businessName', type: Thrift.Type.STRING },
    8: { alias: 'seatCount', type: Thrift.Type.I32 },
    9: { alias: 'expiry', type: Thrift.Type.I64 },
    10: { alias: 'dealId', type: Thrift.Type.I32 }
  });

  module.exports.BackToSchoolEmailLookUpResult = Thrift.Struct.define('BackToSchoolEmailLookUpResult',  {
    1: { alias: 'available', type: Thrift.Type.BOOL },
    2: { alias: 'whitelisted', type: Thrift.Type.BOOL },
    3: { alias: 'userId', type: Thrift.Type.I32 },
    4: { alias: 'created', type: Thrift.Type.I64 }
  });

  module.exports.CreateIncentiveRequest = Thrift.Struct.define('CreateIncentiveRequest',  {
    1: { alias: 'incentiveToCreate', type: Thrift.Type.STRUCT, def: CommerceInternal.Incentive }
  });

  module.exports.UpdateIncentiveRequest = Thrift.Struct.define('UpdateIncentiveRequest',  {
    1: { alias: 'id', type: Thrift.Type.I32 },
    2: { alias: 'enabled', type: Thrift.Type.BOOL },
    3: { alias: 'startDate', type: Thrift.Type.I64 },
    4: { alias: 'unsetStartDate', type: Thrift.Type.BOOL },
    5: { alias: 'endDate', type: Thrift.Type.I64 },
    6: { alias: 'unsetEndDate', type: Thrift.Type.BOOL },
    7: { alias: 'validationType', type: Thrift.Type.I32 },
    8: { alias: 'unsetValidationType', type: Thrift.Type.BOOL }
  });

  module.exports.BetaFeatureInternal = Thrift.Struct.define('BetaFeatureInternal',  {
    1: { alias: 'guid', type: Thrift.Type.STRING },
    2: { alias: 'featureKey', type: Thrift.Type.STRING },
    3: { alias: 'name', type: Thrift.Type.STRING },
    4: { alias: 'featureDescription', type: Thrift.Type.STRING },
    5: { alias: 'help', type: Thrift.Type.STRING },
    6: { alias: 'requireWaitlist', type: Thrift.Type.BOOL },
    7: { alias: 'teamSizeMin', type: Thrift.Type.I32 },
    8: { alias: 'teamSizeMax', type: Thrift.Type.I32 },
    9: { alias: 'startDate', type: Thrift.Type.I64 },
    10: { alias: 'endDate', type: Thrift.Type.I64 },
    11: { alias: 'countryCodes', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRING)  },
    12: { alias: 'whitelistedBusinessIds', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.I32)  },
    13: { alias: 'blacklistedBusinessIds', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.I32)  },
    14: { alias: 'status', type: Thrift.Type.I32 }
  });

  module.exports.BetaFeatureEnrollmentInternal = Thrift.Struct.define('BetaFeatureEnrollmentInternal',  {
    1: { alias: 'guid', type: Thrift.Type.STRING },
    2: { alias: 'featureGuid', type: Thrift.Type.STRING },
    3: { alias: 'featureKey', type: Thrift.Type.STRING },
    4: { alias: 'userId', type: Thrift.Type.I32 },
    5: { alias: 'businessId', type: Thrift.Type.I32 },
    6: { alias: 'submitterUserId', type: Thrift.Type.I32 },
    7: { alias: 'status', type: Thrift.Type.I32 },
    8: { alias: 'statusDate', type: Thrift.Type.I64 },
    9: { alias: 'enrollerName', type: Thrift.Type.STRING },
    10: { alias: 'disabledDate', type: Thrift.Type.I64 }
  });

  module.exports.EnrollAndEnableIntoBetaFeatureResult = Thrift.Struct.define('EnrollAndEnableIntoBetaFeatureResult',  {
    1: { alias: 'succeededBusinessIds', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.I32)  },
    2: { alias: 'failedBusinessIds', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.I32)  }
  });

  module.exports.ListEnrollmentsForBetaFeatureResult = Thrift.Struct.define('ListEnrollmentsForBetaFeatureResult',  {
    1: { alias: 'enrollments', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, module.exports.BetaFeatureEnrollmentInternal)  },
    2: { alias: 'firstResult', type: Thrift.Type.I32 },
    3: { alias: 'maxResults', type: Thrift.Type.I32 },
    4: { alias: 'totalResults', type: Thrift.Type.I32 }
  });

  var AdminService = module.exports.AdminService = {};

  AdminService.createBusinessDiscountDeal = Thrift.Method.define({
    alias: 'createBusinessDiscountDeal',
    args: Thrift.Struct.define('createBusinessDiscountDealArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'request', type: Thrift.Type.STRUCT, def: module.exports.CreateBusinessDiscountDealRequest, index: 1 }
    }),
    result: Thrift.Struct.define('createBusinessDiscountDealResult', {
      0: { alias: 'returnValue',type: Thrift.Type.STRUCT, def: module.exports.BusinessDiscountDeal },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
    })
  });

  AdminService.getBusinessDiscountDeal = Thrift.Method.define({
    alias: 'getBusinessDiscountDeal',
    args: Thrift.Struct.define('getBusinessDiscountDealArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'dealId', type: Thrift.Type.I32, index: 1 }
    }),
    result: Thrift.Struct.define('getBusinessDiscountDealResult', {
      0: { alias: 'returnValue',type: Thrift.Type.STRUCT, def: module.exports.BusinessDiscountDeal },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
    })
  });

  AdminService.updateBusinessDiscountDeal = Thrift.Method.define({
    alias: 'updateBusinessDiscountDeal',
    args: Thrift.Struct.define('updateBusinessDiscountDealArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'request', type: Thrift.Type.STRUCT, def: module.exports.UpdateBusinessDiscountDealRequest, index: 1 }
    }),
    result: Thrift.Struct.define('updateBusinessDiscountDealResult', {
      0: { alias: 'returnValue',type: Thrift.Type.STRUCT, def: module.exports.BusinessDiscountDeal },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
    })
  });

  AdminService.cancelBusinessDiscountDeal = Thrift.Method.define({
    alias: 'cancelBusinessDiscountDeal',
    args: Thrift.Struct.define('cancelBusinessDiscountDealArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'dealId', type: Thrift.Type.I32, index: 1 }
    }),
    result: Thrift.Struct.define('cancelBusinessDiscountDealResult', {
      0: { alias: 'returnValue',type: Thrift.Type.BOOL },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
    })
  });

  AdminService.endBusinessDiscountDeal = Thrift.Method.define({
    alias: 'endBusinessDiscountDeal',
    args: Thrift.Struct.define('endBusinessDiscountDealArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'dealId', type: Thrift.Type.I32, index: 1 }
    }),
    result: Thrift.Struct.define('endBusinessDiscountDealResult', {
      0: { alias: 'returnValue',type: Thrift.Type.STRUCT, def: module.exports.BusinessDiscountDeal },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
    })
  });

  AdminService.listAllBusinessDiscountDeals = Thrift.Method.define({
    alias: 'listAllBusinessDiscountDeals',
    args: Thrift.Struct.define('listAllBusinessDiscountDealsArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 }
    }),
    result: Thrift.Struct.define('listAllBusinessDiscountDealsResult', {
      0: { alias: 'returnValue',type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, module.exports.BusinessDiscountDeal)  },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
    })
  });

  AdminService.listDiscountDealsForBusiness = Thrift.Method.define({
    alias: 'listDiscountDealsForBusiness',
    args: Thrift.Struct.define('listDiscountDealsForBusinessArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'businessId', type: Thrift.Type.I32, index: 1 }
    }),
    result: Thrift.Struct.define('listDiscountDealsForBusinessResult', {
      0: { alias: 'returnValue',type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, module.exports.BusinessDiscountDeal)  },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
    })
  });

  AdminService.createBusinessDiscountOffer = Thrift.Method.define({
    alias: 'createBusinessDiscountOffer',
    args: Thrift.Struct.define('createBusinessDiscountOfferArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'request', type: Thrift.Type.STRUCT, def: module.exports.CreateBusinessDiscountOfferRequest, index: 1 }
    }),
    result: Thrift.Struct.define('createBusinessDiscountOfferResult', {
      0: { alias: 'returnValue',type: Thrift.Type.STRUCT, def: module.exports.BusinessDiscountOffer },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException },
      3: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
    })
  });

  AdminService.updateBusinessDiscountOffer = Thrift.Method.define({
    alias: 'updateBusinessDiscountOffer',
    args: Thrift.Struct.define('updateBusinessDiscountOfferArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'request', type: Thrift.Type.STRUCT, def: module.exports.UpdateBusinessDiscountOfferRequest, index: 1 }
    }),
    result: Thrift.Struct.define('updateBusinessDiscountOfferResult', {
      0: { alias: 'returnValue',type: Thrift.Type.STRUCT, def: module.exports.BusinessDiscountOffer },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
    })
  });

  AdminService.cancelBusinessDiscountOffer = Thrift.Method.define({
    alias: 'cancelBusinessDiscountOffer',
    args: Thrift.Struct.define('cancelBusinessDiscountOfferArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'offerId', type: Thrift.Type.I32, index: 1 }
    }),
    result: Thrift.Struct.define('cancelBusinessDiscountOfferResult', {
      0: { alias: 'returnValue',type: Thrift.Type.BOOL },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
    })
  });

  AdminService.listAllBusinessDiscountOffers = Thrift.Method.define({
    alias: 'listAllBusinessDiscountOffers',
    args: Thrift.Struct.define('listAllBusinessDiscountOffersArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 }
    }),
    result: Thrift.Struct.define('listAllBusinessDiscountOffersResult', {
      0: { alias: 'returnValue',type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, module.exports.BusinessDiscountOffer)  },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
    })
  });

  AdminService.setupECCBusiness = Thrift.Method.define({
    alias: 'setupECCBusiness',
    args: Thrift.Struct.define('setupECCBusinessArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'businessId', type: Thrift.Type.I32, index: 1 }
    }),
    result: Thrift.Struct.define('setupECCBusinessResult', {
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
    })
  });

  AdminService.lookUpBackToSchoolEmail = Thrift.Method.define({
    alias: 'lookUpBackToSchoolEmail',
    args: Thrift.Struct.define('lookUpBackToSchoolEmailArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'email', type: Thrift.Type.STRING, index: 1 }
    }),
    result: Thrift.Struct.define('lookUpBackToSchoolEmailResult', {
      0: { alias: 'returnValue',type: Thrift.Type.STRUCT, def: module.exports.BackToSchoolEmailLookUpResult },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
    })
  });

  AdminService.createIncentive = Thrift.Method.define({
    alias: 'createIncentive',
    args: Thrift.Struct.define('createIncentiveArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'createIncentiveRequest', type: Thrift.Type.STRUCT, def: module.exports.CreateIncentiveRequest, index: 1 }
    }),
    result: Thrift.Struct.define('createIncentiveResult', {
      0: { alias: 'returnValue',type: Thrift.Type.STRUCT, def: CommerceInternal.Incentive },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
    })
  });

  AdminService.updateIncentive = Thrift.Method.define({
    alias: 'updateIncentive',
    args: Thrift.Struct.define('updateIncentiveArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'updateIncentiveRequest', type: Thrift.Type.STRUCT, def: module.exports.UpdateIncentiveRequest, index: 1 }
    }),
    result: Thrift.Struct.define('updateIncentiveResult', {
      0: { alias: 'returnValue',type: Thrift.Type.STRUCT, def: CommerceInternal.Incentive },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException },
      3: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
    })
  });

  AdminService.deactivateBusinessUser = Thrift.Method.define({
    alias: 'deactivateBusinessUser',
    args: Thrift.Struct.define('deactivateBusinessUserArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'userId', type: Thrift.Type.I32, index: 1 }
    }),
    result: Thrift.Struct.define('deactivateBusinessUserResult', {
      1: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException },
      2: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      3: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
    })
  });

  AdminService.deactivateBusinessUserEvenLastAdmin = Thrift.Method.define({
    alias: 'deactivateBusinessUserEvenLastAdmin',
    args: Thrift.Struct.define('deactivateBusinessUserEvenLastAdminArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'userId', type: Thrift.Type.I32, index: 1 }
    }),
    result: Thrift.Struct.define('deactivateBusinessUserEvenLastAdminResult', {
      1: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException },
      2: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      3: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
    })
  });

  AdminService.reactivateBusinessUser = Thrift.Method.define({
    alias: 'reactivateBusinessUser',
    args: Thrift.Struct.define('reactivateBusinessUserArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'userId', type: Thrift.Type.I32, index: 1 }
    }),
    result: Thrift.Struct.define('reactivateBusinessUserResult', {
      1: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException },
      2: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      3: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
    })
  });

  AdminService.listBetaFeatures = Thrift.Method.define({
    alias: 'listBetaFeatures',
    args: Thrift.Struct.define('listBetaFeaturesArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 }
    }),
    result: Thrift.Struct.define('listBetaFeaturesResult', {
      0: { alias: 'returnValue',type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, module.exports.BetaFeatureInternal)  },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
    })
  });

  AdminService.updateBetaFeature = Thrift.Method.define({
    alias: 'updateBetaFeature',
    args: Thrift.Struct.define('updateBetaFeatureArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'feature', type: Thrift.Type.STRUCT, def: module.exports.BetaFeatureInternal, index: 1 }
    }),
    result: Thrift.Struct.define('updateBetaFeatureResult', {
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
    })
  });

  AdminService.activateBetaFeature = Thrift.Method.define({
    alias: 'activateBetaFeature',
    args: Thrift.Struct.define('activateBetaFeatureArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'featureGuid', type: Thrift.Type.STRING, index: 1 },
      3: { alias: 'isActivated', type: Thrift.Type.BOOL, index: 2 }
    }),
    result: Thrift.Struct.define('activateBetaFeatureResult', {
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
    })
  });

  AdminService.listEnrollmentsForBetaFeature = Thrift.Method.define({
    alias: 'listEnrollmentsForBetaFeature',
    args: Thrift.Struct.define('listEnrollmentsForBetaFeatureArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'featureGuid', type: Thrift.Type.STRING, index: 1 },
      3: { alias: 'firstResult', type: Thrift.Type.I32, index: 2 },
      4: { alias: 'maxResults', type: Thrift.Type.I32, index: 3 }
    }),
    result: Thrift.Struct.define('listEnrollmentsForBetaFeatureResult', {
      0: { alias: 'returnValue',type: Thrift.Type.STRUCT, def: module.exports.ListEnrollmentsForBetaFeatureResult },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
    })
  });

  AdminService.listEnrollmentsForBetaFeatureAndStatus = Thrift.Method.define({
    alias: 'listEnrollmentsForBetaFeatureAndStatus',
    args: Thrift.Struct.define('listEnrollmentsForBetaFeatureAndStatusArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'featureGuid', type: Thrift.Type.STRING, index: 1 },
      3: { alias: 'status', type: Thrift.Type.I32, index: 2 },
      4: { alias: 'firstResult', type: Thrift.Type.I32, index: 3 },
      5: { alias: 'maxResults', type: Thrift.Type.I32, index: 4 }
    }),
    result: Thrift.Struct.define('listEnrollmentsForBetaFeatureAndStatusResult', {
      0: { alias: 'returnValue',type: Thrift.Type.STRUCT, def: module.exports.ListEnrollmentsForBetaFeatureResult },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
    })
  });

  AdminService.approveBetaFeatureEnrollment = Thrift.Method.define({
    alias: 'approveBetaFeatureEnrollment',
    args: Thrift.Struct.define('approveBetaFeatureEnrollmentArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'enrollmentGuid', type: Thrift.Type.STRING, index: 1 }
    }),
    result: Thrift.Struct.define('approveBetaFeatureEnrollmentResult', {
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
    })
  });

  AdminService.enrollAndEnableIntoBetaFeature = Thrift.Method.define({
    alias: 'enrollAndEnableIntoBetaFeature',
    args: Thrift.Struct.define('enrollAndEnableIntoBetaFeatureArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'featureKey', type: Thrift.Type.STRING, index: 1 },
      3: { alias: 'businessIds', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.I32) , index: 2 }
    }),
    result: Thrift.Struct.define('enrollAndEnableIntoBetaFeatureResult', {
      0: { alias: 'returnValue',type: Thrift.Type.STRUCT, def: module.exports.EnrollAndEnableIntoBetaFeatureResult },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
    })
  });

  // Define AdminService Client

  function AdminServiceClient(output) {
    this.output = output;
    this.seqid = 0;
  }

  AdminServiceClient.prototype.createBusinessDiscountDeal = function(authenticationToken, request, callback) {
    var mdef = AdminService.createBusinessDiscountDeal;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.request = request;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  AdminServiceClient.prototype.getBusinessDiscountDeal = function(authenticationToken, dealId, callback) {
    var mdef = AdminService.getBusinessDiscountDeal;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.dealId = dealId;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  AdminServiceClient.prototype.updateBusinessDiscountDeal = function(authenticationToken, request, callback) {
    var mdef = AdminService.updateBusinessDiscountDeal;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.request = request;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  AdminServiceClient.prototype.cancelBusinessDiscountDeal = function(authenticationToken, dealId, callback) {
    var mdef = AdminService.cancelBusinessDiscountDeal;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.dealId = dealId;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  AdminServiceClient.prototype.endBusinessDiscountDeal = function(authenticationToken, dealId, callback) {
    var mdef = AdminService.endBusinessDiscountDeal;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.dealId = dealId;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  AdminServiceClient.prototype.listAllBusinessDiscountDeals = function(authenticationToken, callback) {
    var mdef = AdminService.listAllBusinessDiscountDeals;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  AdminServiceClient.prototype.listDiscountDealsForBusiness = function(authenticationToken, businessId, callback) {
    var mdef = AdminService.listDiscountDealsForBusiness;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.businessId = businessId;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  AdminServiceClient.prototype.createBusinessDiscountOffer = function(authenticationToken, request, callback) {
    var mdef = AdminService.createBusinessDiscountOffer;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.request = request;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  AdminServiceClient.prototype.updateBusinessDiscountOffer = function(authenticationToken, request, callback) {
    var mdef = AdminService.updateBusinessDiscountOffer;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.request = request;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  AdminServiceClient.prototype.cancelBusinessDiscountOffer = function(authenticationToken, offerId, callback) {
    var mdef = AdminService.cancelBusinessDiscountOffer;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.offerId = offerId;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  AdminServiceClient.prototype.listAllBusinessDiscountOffers = function(authenticationToken, callback) {
    var mdef = AdminService.listAllBusinessDiscountOffers;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  AdminServiceClient.prototype.setupECCBusiness = function(authenticationToken, businessId, callback) {
    var mdef = AdminService.setupECCBusiness;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.businessId = businessId;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  AdminServiceClient.prototype.lookUpBackToSchoolEmail = function(authenticationToken, email, callback) {
    var mdef = AdminService.lookUpBackToSchoolEmail;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.email = email;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  AdminServiceClient.prototype.createIncentive = function(authenticationToken, createIncentiveRequest, callback) {
    var mdef = AdminService.createIncentive;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.createIncentiveRequest = createIncentiveRequest;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  AdminServiceClient.prototype.updateIncentive = function(authenticationToken, updateIncentiveRequest, callback) {
    var mdef = AdminService.updateIncentive;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.updateIncentiveRequest = updateIncentiveRequest;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  AdminServiceClient.prototype.deactivateBusinessUser = function(authenticationToken, userId, callback) {
    var mdef = AdminService.deactivateBusinessUser;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.userId = userId;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  AdminServiceClient.prototype.deactivateBusinessUserEvenLastAdmin = function(authenticationToken, userId, callback) {
    var mdef = AdminService.deactivateBusinessUserEvenLastAdmin;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.userId = userId;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  AdminServiceClient.prototype.reactivateBusinessUser = function(authenticationToken, userId, callback) {
    var mdef = AdminService.reactivateBusinessUser;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.userId = userId;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  AdminServiceClient.prototype.listBetaFeatures = function(authenticationToken, callback) {
    var mdef = AdminService.listBetaFeatures;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  AdminServiceClient.prototype.updateBetaFeature = function(authenticationToken, feature, callback) {
    var mdef = AdminService.updateBetaFeature;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.feature = feature;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  AdminServiceClient.prototype.activateBetaFeature = function(authenticationToken, featureGuid, isActivated, callback) {
    var mdef = AdminService.activateBetaFeature;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.featureGuid = featureGuid;
    args.isActivated = isActivated;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  AdminServiceClient.prototype.listEnrollmentsForBetaFeature = function(authenticationToken, featureGuid, firstResult, maxResults, callback) {
    var mdef = AdminService.listEnrollmentsForBetaFeature;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.featureGuid = featureGuid;
    args.firstResult = firstResult;
    args.maxResults = maxResults;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  AdminServiceClient.prototype.listEnrollmentsForBetaFeatureAndStatus = function(authenticationToken, featureGuid, status, firstResult, maxResults, callback) {
    var mdef = AdminService.listEnrollmentsForBetaFeatureAndStatus;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.featureGuid = featureGuid;
    args.status = status;
    args.firstResult = firstResult;
    args.maxResults = maxResults;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  AdminServiceClient.prototype.approveBetaFeatureEnrollment = function(authenticationToken, enrollmentGuid, callback) {
    var mdef = AdminService.approveBetaFeatureEnrollment;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.enrollmentGuid = enrollmentGuid;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  AdminServiceClient.prototype.enrollAndEnableIntoBetaFeature = function(authenticationToken, featureKey, businessIds, callback) {
    var mdef = AdminService.enrollAndEnableIntoBetaFeature;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.featureKey = featureKey;
    args.businessIds = businessIds;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  module.exports.AdminService.Client = AdminServiceClient;

  // Define AdminService Server

  function AdminServiceServer(service, stransport, Protocol) {
    var methodName;
      this.service = service;
      this.stransport = stransport;
      this.processor = new Thrift.Processor();
      for (methodName in AdminService) {
        if (service[methodName]) {
          this.processor.addMethod(AdminService[methodName], service[methodName].bind(service));
        }
      }
      this.stransport.process = function (input, output, noop) {
      var inprot = new Protocol(input);
      var outprot = new Protocol(output);
      this.processor.process(inprot, outprot, noop);
    }.bind(this);
  }

  AdminServiceServer.prototype.start = function () {
    this.stransport.listen();
  };
  AdminServiceServer.prototype.stop = function () {
    this.stransport.close();
  };

  module.exports.AdminService.Server = AdminServiceServer;



/***/ }),

/***/ 89:
/***/ (function(module, exports, __webpack_require__) {

//
// Autogenerated by Thrift Compiler (0.6.0-en-exported)
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//


  // Define types and services

  var Thrift = __webpack_require__(0).Thrift;
  var AuthenticationErrors = __webpack_require__(83);


  module.exports.Result = {
    'SUCCESS' : 1,
    'FAILURE' : 2,
    'UNKNOWN_OPENID' : 3,
    'USER_EXISTS' : 4
  };

  module.exports.ServiceProvider = {
    'GOOGLE' : 0
  };

  module.exports.OpenIdCredential = Thrift.Struct.define('OpenIdCredential',  {
    1: { alias: 'openIdToken', type: Thrift.Type.STRING },
    2: { alias: 'serviceProvider', type: Thrift.Type.I32 }
  });

  module.exports.PlainCredential = Thrift.Struct.define('PlainCredential',  {
    1: { alias: 'userId', type: Thrift.Type.I32 },
    2: { alias: 'password', type: Thrift.Type.STRING }
  });

  module.exports.AuthenticationRequestResult = Thrift.Struct.define('AuthenticationRequestResult',  {
    1: { alias: 'userId', type: Thrift.Type.I32 },
    2: { alias: 'userEmail', type: Thrift.Type.STRING },
    3: { alias: 'result', type: Thrift.Type.I32 }
  });

  module.exports.RegistrationRequestResult = Thrift.Struct.define('RegistrationRequestResult',  {
    1: { alias: 'refreshToken', type: Thrift.Type.STRING },
    2: { alias: 'userEmail', type: Thrift.Type.STRING },
    3: { alias: 'result', type: Thrift.Type.I32 }
  });

  var AuthenticationService = module.exports.AuthenticationService = {};

  AuthenticationService.authenticate = Thrift.Method.define({
    alias: 'authenticate',
    args: Thrift.Struct.define('authenticateArgs', {
      1: { alias: 'credential', type: Thrift.Type.STRUCT, def: module.exports.PlainCredential, index: 0 }
    }),
    result: Thrift.Struct.define('authenticateResult', {
      0: { alias: 'returnValue',type: Thrift.Type.STRUCT, def: module.exports.AuthenticationRequestResult },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: AuthenticationErrors.UserNotFoundException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: AuthenticationErrors.SystemException }
    })
  });

  AuthenticationService.authenticateOpenID = Thrift.Method.define({
    alias: 'authenticateOpenID',
    args: Thrift.Struct.define('authenticateOpenIDArgs', {
      1: { alias: 'credential', type: Thrift.Type.STRUCT, def: module.exports.OpenIdCredential, index: 0 }
    }),
    result: Thrift.Struct.define('authenticateOpenIDResult', {
      0: { alias: 'returnValue',type: Thrift.Type.STRUCT, def: module.exports.AuthenticationRequestResult },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: AuthenticationErrors.UserNotFoundException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: AuthenticationErrors.SystemException },
      3: { alias: 'formatException', type: Thrift.Type.EXCEPTION, def: AuthenticationErrors.BadOpenIDException }
    })
  });

  AuthenticationService.registerUser = Thrift.Method.define({
    alias: 'registerUser',
    args: Thrift.Struct.define('registerUserArgs', {
      1: { alias: 'credential', type: Thrift.Type.STRUCT, def: module.exports.PlainCredential, index: 0 }
    }),
    result: Thrift.Struct.define('registerUserResult', {
      0: { alias: 'returnValue',type: Thrift.Type.STRUCT, def: module.exports.RegistrationRequestResult },
      1: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: AuthenticationErrors.SystemException }
    })
  });

  AuthenticationService.registerOpenIdUser = Thrift.Method.define({
    alias: 'registerOpenIdUser',
    args: Thrift.Struct.define('registerOpenIdUserArgs', {
      1: { alias: 'userId', type: Thrift.Type.I32, index: 0 },
      2: { alias: 'credential', type: Thrift.Type.STRUCT, def: module.exports.OpenIdCredential, index: 1 }
    }),
    result: Thrift.Struct.define('registerOpenIdUserResult', {
      0: { alias: 'returnValue',type: Thrift.Type.STRUCT, def: module.exports.RegistrationRequestResult },
      1: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: AuthenticationErrors.SystemException },
      2: { alias: 'formatException', type: Thrift.Type.EXCEPTION, def: AuthenticationErrors.BadOpenIDException }
    })
  });

  AuthenticationService.associateOpenIDWithUser = Thrift.Method.define({
    alias: 'associateOpenIDWithUser',
    args: Thrift.Struct.define('associateOpenIDWithUserArgs', {
      1: { alias: 'credential', type: Thrift.Type.STRUCT, def: module.exports.OpenIdCredential, index: 0 },
      2: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 1 }
    }),
    result: Thrift.Struct.define('associateOpenIDWithUserResult', {
      1: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: AuthenticationErrors.SystemException },
      2: { alias: 'formatException', type: Thrift.Type.EXCEPTION, def: AuthenticationErrors.BadOpenIDException },
      3: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: AuthenticationErrors.UserNotFoundException }
    })
  });

  AuthenticationService.dissociateOpenIDFromUser = Thrift.Method.define({
    alias: 'dissociateOpenIDFromUser',
    args: Thrift.Struct.define('dissociateOpenIDFromUserArgs', {
      1: { alias: 'credential', type: Thrift.Type.STRUCT, def: module.exports.OpenIdCredential, index: 0 },
      2: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 1 }
    }),
    result: Thrift.Struct.define('dissociateOpenIDFromUserResult', {
      1: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: AuthenticationErrors.SystemException },
      2: { alias: 'formatException', type: Thrift.Type.EXCEPTION, def: AuthenticationErrors.BadOpenIDException },
      3: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: AuthenticationErrors.UserNotFoundException }
    })
  });

  AuthenticationService.updatePassword = Thrift.Method.define({
    alias: 'updatePassword',
    args: Thrift.Struct.define('updatePasswordArgs', {
      1: { alias: 'userId', type: Thrift.Type.I32, index: 0 },
      2: { alias: 'oldPassword', type: Thrift.Type.STRING, index: 1 },
      3: { alias: 'newPassword', type: Thrift.Type.STRING, index: 2 }
    }),
    result: Thrift.Struct.define('updatePasswordResult', {
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: AuthenticationErrors.UserNotFoundException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: AuthenticationErrors.SystemException }
    })
  });

  // Define AuthenticationService Client

  function AuthenticationServiceClient(output) {
    this.output = output;
    this.seqid = 0;
  }

  AuthenticationServiceClient.prototype.authenticate = function(credential, callback) {
    var mdef = AuthenticationService.authenticate;
    var args = new mdef.args();
    args.credential = credential;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  AuthenticationServiceClient.prototype.authenticateOpenID = function(credential, callback) {
    var mdef = AuthenticationService.authenticateOpenID;
    var args = new mdef.args();
    args.credential = credential;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  AuthenticationServiceClient.prototype.registerUser = function(credential, callback) {
    var mdef = AuthenticationService.registerUser;
    var args = new mdef.args();
    args.credential = credential;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  AuthenticationServiceClient.prototype.registerOpenIdUser = function(userId, credential, callback) {
    var mdef = AuthenticationService.registerOpenIdUser;
    var args = new mdef.args();
    args.userId = userId;
    args.credential = credential;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  AuthenticationServiceClient.prototype.associateOpenIDWithUser = function(credential, authenticationToken, callback) {
    var mdef = AuthenticationService.associateOpenIDWithUser;
    var args = new mdef.args();
    args.credential = credential;
    args.authenticationToken = authenticationToken;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  AuthenticationServiceClient.prototype.dissociateOpenIDFromUser = function(credential, authenticationToken, callback) {
    var mdef = AuthenticationService.dissociateOpenIDFromUser;
    var args = new mdef.args();
    args.credential = credential;
    args.authenticationToken = authenticationToken;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  AuthenticationServiceClient.prototype.updatePassword = function(userId, oldPassword, newPassword, callback) {
    var mdef = AuthenticationService.updatePassword;
    var args = new mdef.args();
    args.userId = userId;
    args.oldPassword = oldPassword;
    args.newPassword = newPassword;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  module.exports.AuthenticationService.Client = AuthenticationServiceClient;

  // Define AuthenticationService Server

  function AuthenticationServiceServer(service, stransport, Protocol) {
    var methodName;
      this.service = service;
      this.stransport = stransport;
      this.processor = new Thrift.Processor();
      for (methodName in AuthenticationService) {
        if (service[methodName]) {
          this.processor.addMethod(AuthenticationService[methodName], service[methodName].bind(service));
        }
      }
      this.stransport.process = function (input, output, noop) {
      var inprot = new Protocol(input);
      var outprot = new Protocol(output);
      this.processor.process(inprot, outprot, noop);
    }.bind(this);
  }

  AuthenticationServiceServer.prototype.start = function () {
    this.stransport.listen();
  };
  AuthenticationServiceServer.prototype.stop = function () {
    this.stransport.close();
  };

  module.exports.AuthenticationService.Server = AuthenticationServiceServer;



/***/ }),

/***/ 9:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.

function isArray(arg) {
  if (Array.isArray) {
    return Array.isArray(arg);
  }
  return objectToString(arg) === '[object Array]';
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = Buffer.isBuffer;

function objectToString(o) {
  return Object.prototype.toString.call(o);
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1).Buffer))

/***/ }),

/***/ 90:
/***/ (function(module, exports, __webpack_require__) {

//
// Autogenerated by Thrift Compiler (0.7.0-en-11139b3b5cb61e817408c6e84b0e1c258bf6c6ae)
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//


  // Define types and services

  var Thrift = __webpack_require__(0).Thrift;
  var Errors = __webpack_require__(7);
  var CommunicationEngineTypes = __webpack_require__(43);
  var CommunicationEngineTypesV2 = __webpack_require__(44);


  var CommunicationEngine = module.exports.CommunicationEngine = {};

  CommunicationEngine.getMessages = Thrift.Method.define({
    alias: 'getMessages',
    args: Thrift.Struct.define('getMessagesArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'request', type: Thrift.Type.STRUCT, def: CommunicationEngineTypes.MessageRequest, index: 1 }
    }),
    result: Thrift.Struct.define('getMessagesResult', {
      0: { alias: 'returnValue',type: Thrift.Type.STRUCT, def: CommunicationEngineTypes.MessageResponse },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
    })
  });

  CommunicationEngine.syncMessages = Thrift.Method.define({
    alias: 'syncMessages',
    args: Thrift.Struct.define('syncMessagesArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'request', type: Thrift.Type.STRUCT, def: CommunicationEngineTypesV2.MessageRequest, index: 1 }
    }),
    result: Thrift.Struct.define('syncMessagesResult', {
      0: { alias: 'returnValue',type: Thrift.Type.STRUCT, def: CommunicationEngineTypesV2.MessageResponse },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
    })
  });

  // Define CommunicationEngine Client

  function CommunicationEngineClient(output) {
    this.output = output;
    this.seqid = 0;
  }

  CommunicationEngineClient.prototype.getMessages = function(authenticationToken, request, callback) {
    var mdef = CommunicationEngine.getMessages;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.request = request;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  CommunicationEngineClient.prototype.syncMessages = function(authenticationToken, request, callback) {
    var mdef = CommunicationEngine.syncMessages;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.request = request;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  module.exports.CommunicationEngine.Client = CommunicationEngineClient;

  // Define CommunicationEngine Server

  function CommunicationEngineServer(service, stransport, Protocol) {
    var methodName;
      this.service = service;
      this.stransport = stransport;
      this.processor = new Thrift.Processor();
      for (methodName in CommunicationEngine) {
        if (service[methodName]) {
          this.processor.addMethod(CommunicationEngine[methodName], service[methodName].bind(service));
        }
      }
      this.stransport.process = function (input, output, noop) {
      var inprot = new Protocol(input);
      var outprot = new Protocol(output);
      this.processor.process(inprot, outprot, noop);
    }.bind(this);
  }

  CommunicationEngineServer.prototype.start = function () {
    this.stransport.listen();
  };
  CommunicationEngineServer.prototype.stop = function () {
    this.stransport.close();
  };

  module.exports.CommunicationEngine.Server = CommunicationEngineServer;



/***/ }),

/***/ 91:
/***/ (function(module, exports, __webpack_require__) {

//
// Autogenerated by Thrift Compiler (0.7.0-en-11139b3b5cb61e817408c6e84b0e1c258bf6c6ae)
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//


  // Define types and services

  var Thrift = __webpack_require__(0).Thrift;
  var CommunicationEngineTypes = __webpack_require__(43);


  var SharedAPI = module.exports.SharedAPI = {};

  SharedAPI.processServerResponse = Thrift.Method.define({
    oneway: true,
    alias: 'processServerResponse',
    args: Thrift.Struct.define('processServerResponseArgs', {
      1: { alias: 'response', type: Thrift.Type.STRUCT, def: CommunicationEngineTypes.MessageResponse, index: 0 }
    }),
    result: Thrift.Struct.define('processServerResponseResult')
  });

  SharedAPI.initialize = Thrift.Method.define({
    oneway: true,
    alias: 'initialize',
    args: Thrift.Struct.define('initializeArgs', {
      1: { alias: 'supportedPlacements', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.I32) , index: 0 },
      2: { alias: 'supportedTriggers', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.I32) , index: 1 },
      3: { alias: 'savedState', type: Thrift.Type.BINARY, index: 2 }
    }),
    result: Thrift.Struct.define('initializeResult')
  });

  SharedAPI.trigger = Thrift.Method.define({
    oneway: true,
    alias: 'trigger',
    args: Thrift.Struct.define('triggerArgs', {
      1: { alias: 'trigger', type: Thrift.Type.STRUCT, def: CommunicationEngineTypes.Trigger, index: 0 }
    }),
    result: Thrift.Struct.define('triggerResult')
  });

  SharedAPI.requestPlacement = Thrift.Method.define({
    oneway: true,
    alias: 'requestPlacement',
    args: Thrift.Struct.define('requestPlacementArgs', {
      1: { alias: 'placement', type: Thrift.Type.I32, index: 0 }
    }),
    result: Thrift.Struct.define('requestPlacementResult')
  });

  SharedAPI.placementIsVisible = Thrift.Method.define({
    oneway: true,
    alias: 'placementIsVisible',
    args: Thrift.Struct.define('placementIsVisibleArgs', {
      1: { alias: 'placement', type: Thrift.Type.I32, index: 0 }
    }),
    result: Thrift.Struct.define('placementIsVisibleResult')
  });

  SharedAPI.userAction = Thrift.Method.define({
    oneway: true,
    alias: 'userAction',
    args: Thrift.Struct.define('userActionArgs', {
      1: { alias: 'placement', type: Thrift.Type.I32, index: 0 },
      2: { alias: 'blob', type: Thrift.Type.STRING, index: 1 }
    }),
    result: Thrift.Struct.define('userActionResult')
  });

  SharedAPI.syncComplete = Thrift.Method.define({
    oneway: true,
    alias: 'syncComplete',
    args: Thrift.Struct.define('syncCompleteArgs', {
      1: { alias: 'communicationEngineUpdateId', type: Thrift.Type.I32, index: 0 }
    }),
    result: Thrift.Struct.define('syncCompleteResult')
  });

  SharedAPI.placementWasDismissed = Thrift.Method.define({
    oneway: true,
    alias: 'placementWasDismissed',
    args: Thrift.Struct.define('placementWasDismissedArgs', {
      1: { alias: 'placement', type: Thrift.Type.I32, index: 0 }
    }),
    result: Thrift.Struct.define('placementWasDismissedResult')
  });

  SharedAPI.placementWillNotBeVisible = Thrift.Method.define({
    oneway: true,
    alias: 'placementWillNotBeVisible',
    args: Thrift.Struct.define('placementWillNotBeVisibleArgs', {
      1: { alias: 'placement', type: Thrift.Type.I32, index: 0 }
    }),
    result: Thrift.Struct.define('placementWillNotBeVisibleResult')
  });

  // Define SharedAPI Client

  function SharedAPIClient(output) {
    this.output = output;
    this.seqid = 0;
  }

  SharedAPIClient.prototype.processServerResponse = function(response, callback) {
    var mdef = SharedAPI.processServerResponse;
    var args = new mdef.args();
    args.response = response;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  SharedAPIClient.prototype.initialize = function(supportedPlacements, supportedTriggers, savedState, callback) {
    var mdef = SharedAPI.initialize;
    var args = new mdef.args();
    args.supportedPlacements = supportedPlacements;
    args.supportedTriggers = supportedTriggers;
    args.savedState = savedState;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  SharedAPIClient.prototype.trigger = function(trigger, callback) {
    var mdef = SharedAPI.trigger;
    var args = new mdef.args();
    args.trigger = trigger;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  SharedAPIClient.prototype.requestPlacement = function(placement, callback) {
    var mdef = SharedAPI.requestPlacement;
    var args = new mdef.args();
    args.placement = placement;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  SharedAPIClient.prototype.placementIsVisible = function(placement, callback) {
    var mdef = SharedAPI.placementIsVisible;
    var args = new mdef.args();
    args.placement = placement;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  SharedAPIClient.prototype.userAction = function(placement, blob, callback) {
    var mdef = SharedAPI.userAction;
    var args = new mdef.args();
    args.placement = placement;
    args.blob = blob;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  SharedAPIClient.prototype.syncComplete = function(communicationEngineUpdateId, callback) {
    var mdef = SharedAPI.syncComplete;
    var args = new mdef.args();
    args.communicationEngineUpdateId = communicationEngineUpdateId;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  SharedAPIClient.prototype.placementWasDismissed = function(placement, callback) {
    var mdef = SharedAPI.placementWasDismissed;
    var args = new mdef.args();
    args.placement = placement;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  SharedAPIClient.prototype.placementWillNotBeVisible = function(placement, callback) {
    var mdef = SharedAPI.placementWillNotBeVisible;
    var args = new mdef.args();
    args.placement = placement;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  module.exports.SharedAPI.Client = SharedAPIClient;

  // Define SharedAPI Server

  function SharedAPIServer(service, stransport, Protocol) {
    var methodName;
      this.service = service;
      this.stransport = stransport;
      this.processor = new Thrift.Processor();
      for (methodName in SharedAPI) {
        if (service[methodName]) {
          this.processor.addMethod(SharedAPI[methodName], service[methodName].bind(service));
        }
      }
      this.stransport.process = function (input, output, noop) {
      var inprot = new Protocol(input);
      var outprot = new Protocol(output);
      this.processor.process(inprot, outprot, noop);
    }.bind(this);
  }

  SharedAPIServer.prototype.start = function () {
    this.stransport.listen();
  };
  SharedAPIServer.prototype.stop = function () {
    this.stransport.close();
  };

  module.exports.SharedAPI.Server = SharedAPIServer;

  var MainApp = module.exports.MainApp = {};

  MainApp.getMessages = Thrift.Method.define({
    oneway: true,
    alias: 'getMessages',
    args: Thrift.Struct.define('getMessagesArgs', {
      1: { alias: 'request', type: Thrift.Type.STRUCT, def: CommunicationEngineTypes.MessageRequest, index: 0 }
    }),
    result: Thrift.Struct.define('getMessagesResult')
  });

  MainApp.show = Thrift.Method.define({
    oneway: true,
    alias: 'show',
    args: Thrift.Struct.define('showArgs', {
      1: { alias: 'placement', type: Thrift.Type.I32, index: 0 },
      2: { alias: 'content', type: Thrift.Type.STRING, index: 1 },
      3: { alias: 'priority', type: Thrift.Type.I32, index: 2 }
    }),
    result: Thrift.Struct.define('showResult')
  });

  MainApp.sendEvents = Thrift.Method.define({
    oneway: true,
    alias: 'sendEvents',
    args: Thrift.Struct.define('sendEventsArgs', {
      1: { alias: 'events', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, CommunicationEngineTypes.Event) , index: 0 }
    }),
    result: Thrift.Struct.define('sendEventsResult')
  });

  MainApp.log = Thrift.Method.define({
    oneway: true,
    alias: 'log',
    args: Thrift.Struct.define('logArgs', {
      1: { alias: 'message', type: Thrift.Type.STRING, index: 0 }
    }),
    result: Thrift.Struct.define('logResult')
  });

  MainApp.dismissMessage = Thrift.Method.define({
    oneway: true,
    alias: 'dismissMessage',
    args: Thrift.Struct.define('dismissMessageArgs', {
      1: { alias: 'placement', type: Thrift.Type.I32, index: 0 }
    }),
    result: Thrift.Struct.define('dismissMessageResult')
  });

  MainApp.saveState = Thrift.Method.define({
    oneway: true,
    alias: 'saveState',
    args: Thrift.Struct.define('saveStateArgs', {
      1: { alias: 'state', type: Thrift.Type.BINARY, index: 0 }
    }),
    result: Thrift.Struct.define('saveStateResult')
  });

  MainApp.placementsAvailable = Thrift.Method.define({
    oneway: true,
    alias: 'placementsAvailable',
    args: Thrift.Struct.define('placementsAvailableArgs', {
      1: { alias: 'placements', type: Thrift.Type.SET, def: Thrift.Set.define(Thrift.Type.I32), index: 0 }
    }),
    result: Thrift.Struct.define('placementsAvailableResult')
  });

  // Define MainApp Client

  function MainAppClient(output) {
    this.output = output;
    this.seqid = 0;
  }

  MainAppClient.prototype.getMessages = function(request, callback) {
    var mdef = MainApp.getMessages;
    var args = new mdef.args();
    args.request = request;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  MainAppClient.prototype.show = function(placement, content, priority, callback) {
    var mdef = MainApp.show;
    var args = new mdef.args();
    args.placement = placement;
    args.content = content;
    args.priority = priority;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  MainAppClient.prototype.sendEvents = function(events, callback) {
    var mdef = MainApp.sendEvents;
    var args = new mdef.args();
    args.events = events;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  MainAppClient.prototype.log = function(message, callback) {
    var mdef = MainApp.log;
    var args = new mdef.args();
    args.message = message;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  MainAppClient.prototype.dismissMessage = function(placement, callback) {
    var mdef = MainApp.dismissMessage;
    var args = new mdef.args();
    args.placement = placement;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  MainAppClient.prototype.saveState = function(state, callback) {
    var mdef = MainApp.saveState;
    var args = new mdef.args();
    args.state = state;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  MainAppClient.prototype.placementsAvailable = function(placements, callback) {
    var mdef = MainApp.placementsAvailable;
    var args = new mdef.args();
    args.placements = placements;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  module.exports.MainApp.Client = MainAppClient;

  // Define MainApp Server

  function MainAppServer(service, stransport, Protocol) {
    var methodName;
      this.service = service;
      this.stransport = stransport;
      this.processor = new Thrift.Processor();
      for (methodName in MainApp) {
        if (service[methodName]) {
          this.processor.addMethod(MainApp[methodName], service[methodName].bind(service));
        }
      }
      this.stransport.process = function (input, output, noop) {
      var inprot = new Protocol(input);
      var outprot = new Protocol(output);
      this.processor.process(inprot, outprot, noop);
    }.bind(this);
  }

  MainAppServer.prototype.start = function () {
    this.stransport.listen();
  };
  MainAppServer.prototype.stop = function () {
    this.stransport.close();
  };

  module.exports.MainApp.Server = MainAppServer;



/***/ }),

/***/ 92:
/***/ (function(module, exports, __webpack_require__) {

//
// Autogenerated by Thrift Compiler (0.7.0-en-11139b3b5cb61e817408c6e84b0e1c258bf6c6ae)
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//


  // Define types and services

  var Thrift = __webpack_require__(0).Thrift;
  var CommunicationEngineTypesV2 = __webpack_require__(44);


  var SharedAPIV2 = module.exports.SharedAPIV2 = {};

  SharedAPIV2.processServerResponse = Thrift.Method.define({
    oneway: true,
    alias: 'processServerResponse',
    args: Thrift.Struct.define('processServerResponseArgs', {
      1: { alias: 'response', type: Thrift.Type.STRUCT, def: CommunicationEngineTypesV2.MessageResponse, index: 0 }
    }),
    result: Thrift.Struct.define('processServerResponseResult')
  });

  SharedAPIV2.initialize = Thrift.Method.define({
    oneway: true,
    alias: 'initialize',
    args: Thrift.Struct.define('initializeArgs', {
      1: { alias: 'request', type: Thrift.Type.STRUCT, def: CommunicationEngineTypesV2.InitializeRequest, index: 0 }
    }),
    result: Thrift.Struct.define('initializeResult')
  });

  SharedAPIV2.requestPlacement = Thrift.Method.define({
    oneway: true,
    alias: 'requestPlacement',
    args: Thrift.Struct.define('requestPlacementArgs', {
      1: { alias: 'placement', type: Thrift.Type.I32, index: 0 }
    }),
    result: Thrift.Struct.define('requestPlacementResult')
  });

  SharedAPIV2.placementIsVisible = Thrift.Method.define({
    oneway: true,
    alias: 'placementIsVisible',
    args: Thrift.Struct.define('placementIsVisibleArgs', {
      1: { alias: 'placement', type: Thrift.Type.I32, index: 0 }
    }),
    result: Thrift.Struct.define('placementIsVisibleResult')
  });

  SharedAPIV2.userAction = Thrift.Method.define({
    oneway: true,
    alias: 'userAction',
    args: Thrift.Struct.define('userActionArgs', {
      1: { alias: 'placement', type: Thrift.Type.I32, index: 0 },
      2: { alias: 'blob', type: Thrift.Type.STRING, index: 1 }
    }),
    result: Thrift.Struct.define('userActionResult')
  });

  SharedAPIV2.placementWasDismissed = Thrift.Method.define({
    oneway: true,
    alias: 'placementWasDismissed',
    args: Thrift.Struct.define('placementWasDismissedArgs', {
      1: { alias: 'placement', type: Thrift.Type.I32, index: 0 }
    }),
    result: Thrift.Struct.define('placementWasDismissedResult')
  });

  SharedAPIV2.placementWillNotBeVisible = Thrift.Method.define({
    oneway: true,
    alias: 'placementWillNotBeVisible',
    args: Thrift.Struct.define('placementWillNotBeVisibleArgs', {
      1: { alias: 'placement', type: Thrift.Type.I32, index: 0 }
    }),
    result: Thrift.Struct.define('placementWillNotBeVisibleResult')
  });

  SharedAPIV2.htmlFetched = Thrift.Method.define({
    oneway: true,
    alias: 'htmlFetched',
    args: Thrift.Struct.define('htmlFetchedArgs', {
      1: { alias: 'uri', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'html', type: Thrift.Type.STRING, index: 1 }
    }),
    result: Thrift.Struct.define('htmlFetchedResult')
  });

  // Define SharedAPIV2 Client

  function SharedAPIV2Client(output) {
    this.output = output;
    this.seqid = 0;
  }

  SharedAPIV2Client.prototype.processServerResponse = function(response, callback) {
    var mdef = SharedAPIV2.processServerResponse;
    var args = new mdef.args();
    args.response = response;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  SharedAPIV2Client.prototype.initialize = function(request, callback) {
    var mdef = SharedAPIV2.initialize;
    var args = new mdef.args();
    args.request = request;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  SharedAPIV2Client.prototype.requestPlacement = function(placement, callback) {
    var mdef = SharedAPIV2.requestPlacement;
    var args = new mdef.args();
    args.placement = placement;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  SharedAPIV2Client.prototype.placementIsVisible = function(placement, callback) {
    var mdef = SharedAPIV2.placementIsVisible;
    var args = new mdef.args();
    args.placement = placement;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  SharedAPIV2Client.prototype.userAction = function(placement, blob, callback) {
    var mdef = SharedAPIV2.userAction;
    var args = new mdef.args();
    args.placement = placement;
    args.blob = blob;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  SharedAPIV2Client.prototype.placementWasDismissed = function(placement, callback) {
    var mdef = SharedAPIV2.placementWasDismissed;
    var args = new mdef.args();
    args.placement = placement;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  SharedAPIV2Client.prototype.placementWillNotBeVisible = function(placement, callback) {
    var mdef = SharedAPIV2.placementWillNotBeVisible;
    var args = new mdef.args();
    args.placement = placement;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  SharedAPIV2Client.prototype.htmlFetched = function(uri, html, callback) {
    var mdef = SharedAPIV2.htmlFetched;
    var args = new mdef.args();
    args.uri = uri;
    args.html = html;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  module.exports.SharedAPIV2.Client = SharedAPIV2Client;

  // Define SharedAPIV2 Server

  function SharedAPIV2Server(service, stransport, Protocol) {
    var methodName;
      this.service = service;
      this.stransport = stransport;
      this.processor = new Thrift.Processor();
      for (methodName in SharedAPIV2) {
        if (service[methodName]) {
          this.processor.addMethod(SharedAPIV2[methodName], service[methodName].bind(service));
        }
      }
      this.stransport.process = function (input, output, noop) {
      var inprot = new Protocol(input);
      var outprot = new Protocol(output);
      this.processor.process(inprot, outprot, noop);
    }.bind(this);
  }

  SharedAPIV2Server.prototype.start = function () {
    this.stransport.listen();
  };
  SharedAPIV2Server.prototype.stop = function () {
    this.stransport.close();
  };

  module.exports.SharedAPIV2.Server = SharedAPIV2Server;

  var MainAppV2 = module.exports.MainAppV2 = {};

  MainAppV2.syncMessages = Thrift.Method.define({
    oneway: true,
    alias: 'syncMessages',
    args: Thrift.Struct.define('syncMessagesArgs', {
      1: { alias: 'request', type: Thrift.Type.STRUCT, def: CommunicationEngineTypesV2.MessageRequest, index: 0 }
    }),
    result: Thrift.Struct.define('syncMessagesResult')
  });

  MainAppV2.show = Thrift.Method.define({
    oneway: true,
    alias: 'show',
    args: Thrift.Struct.define('showArgs', {
      1: { alias: 'request', type: Thrift.Type.STRUCT, def: CommunicationEngineTypesV2.ShowRequest, index: 0 }
    }),
    result: Thrift.Struct.define('showResult')
  });

  MainAppV2.sendAnalyticsEvent = Thrift.Method.define({
    oneway: true,
    alias: 'sendAnalyticsEvent',
    args: Thrift.Struct.define('sendAnalyticsEventArgs', {
      1: { alias: 'event', type: Thrift.Type.STRUCT, def: CommunicationEngineTypesV2.AnalyticsEvent, index: 0 }
    }),
    result: Thrift.Struct.define('sendAnalyticsEventResult')
  });

  MainAppV2.log = Thrift.Method.define({
    oneway: true,
    alias: 'log',
    args: Thrift.Struct.define('logArgs', {
      1: { alias: 'message', type: Thrift.Type.STRING, index: 0 }
    }),
    result: Thrift.Struct.define('logResult')
  });

  MainAppV2.dismissMessage = Thrift.Method.define({
    oneway: true,
    alias: 'dismissMessage',
    args: Thrift.Struct.define('dismissMessageArgs', {
      1: { alias: 'placement', type: Thrift.Type.I32, index: 0 }
    }),
    result: Thrift.Struct.define('dismissMessageResult')
  });

  MainAppV2.saveState = Thrift.Method.define({
    oneway: true,
    alias: 'saveState',
    args: Thrift.Struct.define('saveStateArgs', {
      1: { alias: 'state', type: Thrift.Type.BINARY, index: 0 }
    }),
    result: Thrift.Struct.define('saveStateResult')
  });

  MainAppV2.placementsAvailable = Thrift.Method.define({
    oneway: true,
    alias: 'placementsAvailable',
    args: Thrift.Struct.define('placementsAvailableArgs', {
      1: { alias: 'placements', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.I32) , index: 0 }
    }),
    result: Thrift.Struct.define('placementsAvailableResult')
  });

  MainAppV2.fetchHtml = Thrift.Method.define({
    oneway: true,
    alias: 'fetchHtml',
    args: Thrift.Struct.define('fetchHtmlArgs', {
      1: { alias: 'uri', type: Thrift.Type.STRING, index: 0 }
    }),
    result: Thrift.Struct.define('fetchHtmlResult')
  });

  // Define MainAppV2 Client

  function MainAppV2Client(output) {
    this.output = output;
    this.seqid = 0;
  }

  MainAppV2Client.prototype.syncMessages = function(request, callback) {
    var mdef = MainAppV2.syncMessages;
    var args = new mdef.args();
    args.request = request;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  MainAppV2Client.prototype.show = function(request, callback) {
    var mdef = MainAppV2.show;
    var args = new mdef.args();
    args.request = request;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  MainAppV2Client.prototype.sendAnalyticsEvent = function(event, callback) {
    var mdef = MainAppV2.sendAnalyticsEvent;
    var args = new mdef.args();
    args.event = event;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  MainAppV2Client.prototype.log = function(message, callback) {
    var mdef = MainAppV2.log;
    var args = new mdef.args();
    args.message = message;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  MainAppV2Client.prototype.dismissMessage = function(placement, callback) {
    var mdef = MainAppV2.dismissMessage;
    var args = new mdef.args();
    args.placement = placement;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  MainAppV2Client.prototype.saveState = function(state, callback) {
    var mdef = MainAppV2.saveState;
    var args = new mdef.args();
    args.state = state;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  MainAppV2Client.prototype.placementsAvailable = function(placements, callback) {
    var mdef = MainAppV2.placementsAvailable;
    var args = new mdef.args();
    args.placements = placements;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  MainAppV2Client.prototype.fetchHtml = function(uri, callback) {
    var mdef = MainAppV2.fetchHtml;
    var args = new mdef.args();
    args.uri = uri;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  module.exports.MainAppV2.Client = MainAppV2Client;

  // Define MainAppV2 Server

  function MainAppV2Server(service, stransport, Protocol) {
    var methodName;
      this.service = service;
      this.stransport = stransport;
      this.processor = new Thrift.Processor();
      for (methodName in MainAppV2) {
        if (service[methodName]) {
          this.processor.addMethod(MainAppV2[methodName], service[methodName].bind(service));
        }
      }
      this.stransport.process = function (input, output, noop) {
      var inprot = new Protocol(input);
      var outprot = new Protocol(output);
      this.processor.process(inprot, outprot, noop);
    }.bind(this);
  }

  MainAppV2Server.prototype.start = function () {
    this.stransport.listen();
  };
  MainAppV2Server.prototype.stop = function () {
    this.stransport.close();
  };

  module.exports.MainAppV2.Server = MainAppV2Server;



/***/ }),

/***/ 93:
/***/ (function(module, exports, __webpack_require__) {

//
// Autogenerated by Thrift Compiler (0.7.0-en-11139b3b5cb61e817408c6e84b0e1c258bf6c6ae)
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//


  // Define types and services

  var Thrift = __webpack_require__(0).Thrift;
  var Errors = __webpack_require__(7);
  var Types = __webpack_require__(3);


  module.exports.ETNoteSortOrder = {
    'CREATED' : 1,
    'UPDATED' : 2,
    'RELEVANCE' : 3,
    'UPDATE_SEQUENCE_NUMBER' : 4,
    'TITLE' : 5
  };

  module.exports.SearchScope = Thrift.Struct.define('SearchScope',  {
    1: { alias: 'noteGuids', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRING)  },
    2: { alias: 'notebookGuids', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRING)  }
  });

  module.exports.ETNoteFilter = Thrift.Struct.define('ETNoteFilter',  {
    1: { alias: 'teamGuid', type: Thrift.Type.STRING },
    2: { alias: 'userGuid', type: Thrift.Type.STRING },
    3: { alias: 'queryText', type: Thrift.Type.STRING },
    4: { alias: 'order', type: Thrift.Type.I32 },
    5: { alias: 'filters', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRING)  },
    6: { alias: 'scope', type: Thrift.Type.STRUCT, def: module.exports.SearchScope },
    7: { alias: 'sessionGuid', type: Thrift.Type.STRING },
    8: { alias: 'notebookGuid', type: Thrift.Type.STRING },
    9: { alias: 'includeAllReadableNotebooks', type: Thrift.Type.BOOL }
  });

  module.exports.NoteAttribute = Thrift.Struct.define('NoteAttribute',  {
    1: { alias: 'attrName', type: Thrift.Type.STRING },
    2: { alias: 'attrValue', type: Thrift.Type.STRING }
  });

  module.exports.NoteResult = Thrift.Struct.define('NoteResult',  {
    1: { alias: 'noteGuid', type: Thrift.Type.STRING },
    2: { alias: 'score', type: Thrift.Type.DOUBLE },
    3: { alias: 'attributes', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, module.exports.NoteAttribute)  }
  });

  module.exports.SearchResult = Thrift.Struct.define('SearchResult',  {
    1: { alias: 'totalNotes', type: Thrift.Type.I32 },
    2: { alias: 'noteResults', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, module.exports.NoteResult)  },
    3: { alias: 'sessionGuid', type: Thrift.Type.STRING }
  });

  module.exports.SearchResultSpec = Thrift.Struct.define('SearchResultSpec',  {
    1: { alias: 'splitting', type: Thrift.Type.BOOL },
    2: { alias: 'outputDetailsLevel', type: Thrift.Type.I32 }
  });

  module.exports.ETQuery = Thrift.Struct.define('ETQuery',  {
    1: { alias: 'noteFilter', type: Thrift.Type.STRUCT, def: module.exports.ETNoteFilter },
    2: { alias: 'offset', type: Thrift.Type.I32 },
    3: { alias: 'maxNotes', type: Thrift.Type.I32 },
    4: { alias: 'searchResultSpec', type: Thrift.Type.STRUCT, def: module.exports.SearchResultSpec },
    5: { alias: 'finalQuery', type: Thrift.Type.BOOL }
  });

  module.exports.SearchSuggestion = Thrift.Struct.define('SearchSuggestion',  {
    1: { alias: 'status', type: Thrift.Type.I32 },
    2: { alias: 'history', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRING)  },
    3: { alias: 'suggestions', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRING)  },
    4: { alias: 'categories', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRING)  },
    5: { alias: 'userGuids', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRING)  },
    6: { alias: 'notebookGuids', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRING)  },
    7: { alias: 'tagGuids', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRING)  },
    8: { alias: 'sessionGuid', type: Thrift.Type.STRING }
  });

  var TeamSearch = module.exports.TeamSearch = {};

  TeamSearch.queryNotes = Thrift.Method.define({
    alias: 'queryNotes',
    args: Thrift.Struct.define('queryNotesArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'query', type: Thrift.Type.STRUCT, def: module.exports.ETQuery, index: 1 }
    }),
    result: Thrift.Struct.define('queryNotesResult', {
      0: { alias: 'returnValue',type: Thrift.Type.STRUCT, def: module.exports.SearchResult },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
    })
  });

  TeamSearch.querySuggestion = Thrift.Method.define({
    alias: 'querySuggestion',
    args: Thrift.Struct.define('querySuggestionArgs', {
      1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
      2: { alias: 'noteFilter', type: Thrift.Type.STRUCT, def: module.exports.ETNoteFilter, index: 1 }
    }),
    result: Thrift.Struct.define('querySuggestionResult', {
      0: { alias: 'returnValue',type: Thrift.Type.STRUCT, def: module.exports.SearchSuggestion },
      1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
      2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
      3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
    })
  });

  // Define TeamSearch Client

  function TeamSearchClient(output) {
    this.output = output;
    this.seqid = 0;
  }

  TeamSearchClient.prototype.queryNotes = function(authenticationToken, query, callback) {
    var mdef = TeamSearch.queryNotes;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.query = query;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  TeamSearchClient.prototype.querySuggestion = function(authenticationToken, noteFilter, callback) {
    var mdef = TeamSearch.querySuggestion;
    var args = new mdef.args();
    args.authenticationToken = authenticationToken;
    args.noteFilter = noteFilter;
    mdef.sendRequest(this.output, this.seqid++, args, callback);
  };

  module.exports.TeamSearch.Client = TeamSearchClient;

  // Define TeamSearch Server

  function TeamSearchServer(service, stransport, Protocol) {
    var methodName;
      this.service = service;
      this.stransport = stransport;
      this.processor = new Thrift.Processor();
      for (methodName in TeamSearch) {
        if (service[methodName]) {
          this.processor.addMethod(TeamSearch[methodName], service[methodName].bind(service));
        }
      }
      this.stransport.process = function (input, output, noop) {
      var inprot = new Protocol(input);
      var outprot = new Protocol(output);
      this.processor.process(inprot, outprot, noop);
    }.bind(this);
  }

  TeamSearchServer.prototype.start = function () {
    this.stransport.listen();
  };
  TeamSearchServer.prototype.stop = function () {
    this.stransport.close();
  };

  module.exports.TeamSearch.Server = TeamSearchServer;



/***/ })

/******/ })});;