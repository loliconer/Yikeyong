/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _viewer = __webpack_require__(1);

	var _viewer2 = _interopRequireDefault(_viewer);

	var _navbar = __webpack_require__(9);

	var _navbar2 = _interopRequireDefault(_navbar);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	new Vue({
	    el: "#app",
	    data: {
	        type: null
	    },
	    components: { Viewer: _viewer2.default, Navbar: _navbar2.default },
	    methods: {
	        view: function view(type) {
	            this.$refs.viewer.show(type);
	        }
	    }
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* script */
	__vue_exports__ = __webpack_require__(2)

	/* template */
	var __vue_template__ = __webpack_require__(8)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "D:\\360\\workspace\\Phpstorm\\Yikeyong\\src\\public\\js\\src\\vue\\viewer.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-631b91ee", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-631b91ee", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] viewer.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _utils = __webpack_require__(3);

	var _utils2 = _interopRequireDefault(_utils);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var prototype = {};
	var EVENT_MOUSEDOWN = "mousedown touchstart pointerdown MSPointerDown",
	    EVENT_MOUSEMOVE = "mousemove touchmove pointermove MSPointerMove",
	    EVENT_MOUSEUP = "mouseup touchend touchcancel pointerup pointercancel MSPointerUp MSPointerCancel",
	    EVENT_WHEEL = "wheel mousewheel DOMMouseScroll";

	exports.default = {
	    data: function data() {
	        return {
	            bShowViewer: false,
	            index: 0,
	            jsonData: null,
	            type: "",
	            images: {
	                base: "beauty/校园女生",
	                files: ["nvsheng0001.jpg"]
	            },
	            ratio: 1,
	            degree: 0
	        };
	    },

	    computed: {
	        imgStyle: function imgStyle() {
	            return {
	                transform: "scale(" + this.ratio + ") rotate(" + this.degree + "deg)",
	                background: "url(/spa/img/" + this.images.base + "/" + this.images.files[this.index] + ") no-repeat center"
	            };
	        }
	    },
	    methods: {
	        show: function show(type) {
	            var _this = this;
	            this.type = type;
	            if (this.jsonData) {
	                this.images = this.jsonData[this.type];
	            } else {
	                _utils2.default.fetchGet('/public/js/images.json', function (body) {
	                    _this.jsonData = body;
	                    _this.images = _this.jsonData[_this.type];
	                });
	            }

	            this.bShowViewer = true;
	        },
	        close: function close() {
	            this.index = 0;
	            this.reset();
	            this.bShowViewer = false;
	        },
	        prev: function prev() {
	            if (this.index === 0) return;

	            this.reset();
	            this.index--;
	        },
	        next: function next() {
	            if (this.index === this.images.files.length - 1) return;

	            this.reset();
	            this.index++;
	        },
	        reset: function reset() {
	            this.ratio = 1;
	            this.degree = 0;
	        }
	    }
	};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _stringify = __webpack_require__(4);

	var _stringify2 = _interopRequireDefault(_stringify);

	__webpack_require__(7);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	    SITE: "http://www.yikeyong.com",
	    getData: function getData(api, options, callback) {
	        $.ajax({
	            type: "get",
	            url: "/data/" + api,
	            dataType: "json",
	            data: options,
	            success: function success(data) {
	                callback(data);
	            },
	            error: function error(xhr, status, _error) {
	                console.log(status, _error);
	            }
	        });
	    },
	    getJSONKeyByValue: function getJSONKeyByValue(obj, value) {
	        for (var key in obj) {
	            if (obj.hasOwnProperty(key) && obj[key] === value) {
	                return key;
	            }
	        }
	    },
	    getAverageRGB: function getAverageRGB(imgEl) {
	        var blockSize = 5,
	            defaultRGB = { r: 0, g: 0, b: 0 },
	            canvas = document.createElement('canvas'),
	            context = canvas.getContext && canvas.getContext('2d'),
	            data,
	            width,
	            height,
	            i = -4,
	            length,
	            rgb = { r: 0, g: 0, b: 0 },
	            count = 0;
	        if (!context) {
	            return defaultRGB;
	        }
	        height = canvas.height = imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height;
	        width = canvas.width = imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width;
	        context.drawImage(imgEl, 0, 0);
	        try {
	            data = context.getImageData(0, 0, width, height);
	        } catch (e) {
	            return defaultRGB;
	        }
	        length = data.data.length;
	        while ((i += blockSize * 4) < length) {
	            ++count;
	            rgb.r += data.data[i];
	            rgb.g += data.data[i + 1];
	            rgb.b += data.data[i + 2];
	        }

	        rgb.r = ~~(rgb.r / count);
	        rgb.g = ~~(rgb.g / count);
	        rgb.b = ~~(rgb.b / count);

	        return rgb;
	    },
	    isWeixin: function isWeixin() {
	        var userAgent = navigator.userAgent.toLowerCase();
	        return userAgent.match(/micromessenger/);
	    },
	    isWeixinInIphone: function isWeixinInIphone() {
	        var userAgent = navigator.userAgent.toLowerCase();
	        return userAgent.match(/iphone os/) && userAgent.match(/micromessenger/);
	    },
	    isMobile: function isMobile() {
	        return (/Mobi/i.test(navigator.userAgent)
	        );
	    },
	    isMobile2: function isMobile2() {
	        return (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)
	        );
	    },
	    isMobile3: function isMobile3() {
	        return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
	        );
	    },
	    isVisible: function isVisible(elem) {
	        var bottom, top, viewBottom, viewTop;
	        viewTop = window.pageYOffset;
	        viewBottom = viewTop + Math.min(elem.clientHeight, window.innerHeight);
	        top = this.offsetTop(elem);
	        bottom = top + elem.clientHeight;
	        return top <= viewBottom && bottom >= viewTop;
	    },
	    adjustImgShape: function adjustImgShape(container, ratio) {
	        var imgs = document.querySelectorAll(container + ' .img-wrap img');
	        [].forEach.call(imgs, function (img) {
	            img.onload = function () {
	                img.parentNode.classList.add(img.naturalWidth / img.naturalHeight >= ratio ? 'img-w' : 'img-h');
	            };
	        });
	    },
	    getScrollTop: function getScrollTop() {
	        if (document.documentElement.scrollTop) {
	            return document.documentElement.scrollTop;
	        } else {
	            return document.body.scrollTop;
	        }
	    },
	    goToTop: function goToTop() {
	        if (document.documentElement.scrollTop) {
	            document.documentElement.scrollTop = 0;
	        } else {
	            document.body.scrollTop = 0;
	        }
	    },
	    getTimeDiff: function getTimeDiff(time) {
	        var d = new Date();
	        var diff = Math.floor(d.getTime() / 1000) - time;

	        var thisDate = new Date(time * 1000),
	            thisYear = thisDate.getFullYear(),
	            thisMonth = thisDate.getMonth() + 1,
	            thisDay = thisDate.getDate(),
	            thisHour = thisDate.getHours(),
	            thisMinute = thisDate.getMinutes();

	        thisHour = thisHour === 0 ? "00" : thisHour;
	        thisMinute = thisMinute === 0 ? "00" : thisMinute;

	        if (diff < 60) {
	            return (diff < 1 ? 1 : diff) + "秒前";
	        } else if (diff >= 60 && diff < 60 * 60) {
	            return Math.floor(diff / 60) + "分钟前";
	        } else if (thisDate.toDateString() === d.toDateString()) {
	            return "今天 " + thisHour + ":" + thisMinute;
	        } else if (thisYear === d.getFullYear()) {
	            return thisMonth + "月" + thisDay + "日 " + thisHour + ":" + thisMinute;
	        } else {
	            return thisYear + "-" + thisMonth + "-" + thisDay + " " + thisHour + ":" + thisMinute;
	        }
	    },
	    fetchNormal: function fetchNormal(url, option, callback, handler) {
	        fetch(url, {
	            method: "post",
	            body: (0, _stringify2.default)(option),
	            credentials: 'same-origin',
	            headers: {
	                "Content-Type": "application/json"
	            }
	        }).then(function (res) {
	            if (res.status === 200) {
	                return res.json();
	            } else {
	                var error = new Error();
	                error.response = res;
	                throw error;
	            }
	        }).then(function (body) {
	            callback(body);
	        }).catch(function (err) {
	            console.log(err);
	            if (handler) {
	                handler(err);
	            }
	        });
	    },
	    fetchGet: function fetchGet(url, callback, handler) {
	        fetch(url).then(function (res) {
	            if (res.status === 200) {
	                return res.json();
	            } else {
	                var error = new Error();
	                error.response = res;
	                throw error;
	            }
	        }).then(function (body) {
	            callback(body);
	        }).catch(function (err) {
	            console.log(err);
	            if (handler) {
	                handler(err);
	            }
	        });
	    },
	    fetchForm: function fetchForm(url, submit, callback, handler) {
	        fetch(url, {
	            method: "post",
	            body: submit,
	            credentials: "same-origin"
	        }).then(function (res) {
	            if (res.status === 200) {
	                return res.json();
	            } else {
	                var error = new Error();
	                error.response = res;
	                throw error;
	            }
	        }).then(function (body) {
	            callback(body);
	        }).catch(function (err) {
	            console.log(err);
	            if (handler) {
	                handler(err);
	            }
	        });
	    },
	    reload: function reload() {
	        if (this.isWeixin()) {
	            location.href = location.href + "?v=" + 10000 * Math.random();
	        } else {
	            location.reload();
	        }
	    }
	};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(5), __esModule: true };

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var core  = __webpack_require__(6)
	  , $JSON = core.JSON || (core.JSON = {stringify: JSON.stringify});
	module.exports = function stringify(it){ // eslint-disable-line no-unused-vars
	  return $JSON.stringify.apply($JSON, arguments);
	};

/***/ },
/* 6 */
/***/ function(module, exports) {

	var core = module.exports = {version: '2.4.0'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 7 */
/***/ function(module, exports) {

	(function(self) {
	  'use strict';

	  if (self.fetch) {
	    return
	  }

	  var support = {
	    searchParams: 'URLSearchParams' in self,
	    iterable: 'Symbol' in self && 'iterator' in Symbol,
	    blob: 'FileReader' in self && 'Blob' in self && (function() {
	      try {
	        new Blob()
	        return true
	      } catch(e) {
	        return false
	      }
	    })(),
	    formData: 'FormData' in self,
	    arrayBuffer: 'ArrayBuffer' in self
	  }

	  if (support.arrayBuffer) {
	    var viewClasses = [
	      '[object Int8Array]',
	      '[object Uint8Array]',
	      '[object Uint8ClampedArray]',
	      '[object Int16Array]',
	      '[object Uint16Array]',
	      '[object Int32Array]',
	      '[object Uint32Array]',
	      '[object Float32Array]',
	      '[object Float64Array]'
	    ]

	    var isDataView = function(obj) {
	      return obj && DataView.prototype.isPrototypeOf(obj)
	    }

	    var isArrayBufferView = ArrayBuffer.isView || function(obj) {
	      return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1
	    }
	  }

	  function normalizeName(name) {
	    if (typeof name !== 'string') {
	      name = String(name)
	    }
	    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
	      throw new TypeError('Invalid character in header field name')
	    }
	    return name.toLowerCase()
	  }

	  function normalizeValue(value) {
	    if (typeof value !== 'string') {
	      value = String(value)
	    }
	    return value
	  }

	  // Build a destructive iterator for the value list
	  function iteratorFor(items) {
	    var iterator = {
	      next: function() {
	        var value = items.shift()
	        return {done: value === undefined, value: value}
	      }
	    }

	    if (support.iterable) {
	      iterator[Symbol.iterator] = function() {
	        return iterator
	      }
	    }

	    return iterator
	  }

	  function Headers(headers) {
	    this.map = {}

	    if (headers instanceof Headers) {
	      headers.forEach(function(value, name) {
	        this.append(name, value)
	      }, this)

	    } else if (headers) {
	      Object.getOwnPropertyNames(headers).forEach(function(name) {
	        this.append(name, headers[name])
	      }, this)
	    }
	  }

	  Headers.prototype.append = function(name, value) {
	    name = normalizeName(name)
	    value = normalizeValue(value)
	    var oldValue = this.map[name]
	    this.map[name] = oldValue ? oldValue+','+value : value
	  }

	  Headers.prototype['delete'] = function(name) {
	    delete this.map[normalizeName(name)]
	  }

	  Headers.prototype.get = function(name) {
	    name = normalizeName(name)
	    return this.has(name) ? this.map[name] : null
	  }

	  Headers.prototype.has = function(name) {
	    return this.map.hasOwnProperty(normalizeName(name))
	  }

	  Headers.prototype.set = function(name, value) {
	    this.map[normalizeName(name)] = normalizeValue(value)
	  }

	  Headers.prototype.forEach = function(callback, thisArg) {
	    for (var name in this.map) {
	      if (this.map.hasOwnProperty(name)) {
	        callback.call(thisArg, this.map[name], name, this)
	      }
	    }
	  }

	  Headers.prototype.keys = function() {
	    var items = []
	    this.forEach(function(value, name) { items.push(name) })
	    return iteratorFor(items)
	  }

	  Headers.prototype.values = function() {
	    var items = []
	    this.forEach(function(value) { items.push(value) })
	    return iteratorFor(items)
	  }

	  Headers.prototype.entries = function() {
	    var items = []
	    this.forEach(function(value, name) { items.push([name, value]) })
	    return iteratorFor(items)
	  }

	  if (support.iterable) {
	    Headers.prototype[Symbol.iterator] = Headers.prototype.entries
	  }

	  function consumed(body) {
	    if (body.bodyUsed) {
	      return Promise.reject(new TypeError('Already read'))
	    }
	    body.bodyUsed = true
	  }

	  function fileReaderReady(reader) {
	    return new Promise(function(resolve, reject) {
	      reader.onload = function() {
	        resolve(reader.result)
	      }
	      reader.onerror = function() {
	        reject(reader.error)
	      }
	    })
	  }

	  function readBlobAsArrayBuffer(blob) {
	    var reader = new FileReader()
	    var promise = fileReaderReady(reader)
	    reader.readAsArrayBuffer(blob)
	    return promise
	  }

	  function readBlobAsText(blob) {
	    var reader = new FileReader()
	    var promise = fileReaderReady(reader)
	    reader.readAsText(blob)
	    return promise
	  }

	  function readArrayBufferAsText(buf) {
	    var view = new Uint8Array(buf)
	    var chars = new Array(view.length)

	    for (var i = 0; i < view.length; i++) {
	      chars[i] = String.fromCharCode(view[i])
	    }
	    return chars.join('')
	  }

	  function bufferClone(buf) {
	    if (buf.slice) {
	      return buf.slice(0)
	    } else {
	      var view = new Uint8Array(buf.byteLength)
	      view.set(new Uint8Array(buf))
	      return view.buffer
	    }
	  }

	  function Body() {
	    this.bodyUsed = false

	    this._initBody = function(body) {
	      this._bodyInit = body
	      if (!body) {
	        this._bodyText = ''
	      } else if (typeof body === 'string') {
	        this._bodyText = body
	      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
	        this._bodyBlob = body
	      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
	        this._bodyFormData = body
	      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
	        this._bodyText = body.toString()
	      } else if (support.arrayBuffer && support.blob && isDataView(body)) {
	        this._bodyArrayBuffer = bufferClone(body.buffer)
	        // IE 10-11 can't handle a DataView body.
	        this._bodyInit = new Blob([this._bodyArrayBuffer])
	      } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
	        this._bodyArrayBuffer = bufferClone(body)
	      } else {
	        throw new Error('unsupported BodyInit type')
	      }

	      if (!this.headers.get('content-type')) {
	        if (typeof body === 'string') {
	          this.headers.set('content-type', 'text/plain;charset=UTF-8')
	        } else if (this._bodyBlob && this._bodyBlob.type) {
	          this.headers.set('content-type', this._bodyBlob.type)
	        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
	          this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8')
	        }
	      }
	    }

	    if (support.blob) {
	      this.blob = function() {
	        var rejected = consumed(this)
	        if (rejected) {
	          return rejected
	        }

	        if (this._bodyBlob) {
	          return Promise.resolve(this._bodyBlob)
	        } else if (this._bodyArrayBuffer) {
	          return Promise.resolve(new Blob([this._bodyArrayBuffer]))
	        } else if (this._bodyFormData) {
	          throw new Error('could not read FormData body as blob')
	        } else {
	          return Promise.resolve(new Blob([this._bodyText]))
	        }
	      }

	      this.arrayBuffer = function() {
	        if (this._bodyArrayBuffer) {
	          return consumed(this) || Promise.resolve(this._bodyArrayBuffer)
	        } else {
	          return this.blob().then(readBlobAsArrayBuffer)
	        }
	      }
	    }

	    this.text = function() {
	      var rejected = consumed(this)
	      if (rejected) {
	        return rejected
	      }

	      if (this._bodyBlob) {
	        return readBlobAsText(this._bodyBlob)
	      } else if (this._bodyArrayBuffer) {
	        return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer))
	      } else if (this._bodyFormData) {
	        throw new Error('could not read FormData body as text')
	      } else {
	        return Promise.resolve(this._bodyText)
	      }
	    }

	    if (support.formData) {
	      this.formData = function() {
	        return this.text().then(decode)
	      }
	    }

	    this.json = function() {
	      return this.text().then(JSON.parse)
	    }

	    return this
	  }

	  // HTTP methods whose capitalization should be normalized
	  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']

	  function normalizeMethod(method) {
	    var upcased = method.toUpperCase()
	    return (methods.indexOf(upcased) > -1) ? upcased : method
	  }

	  function Request(input, options) {
	    options = options || {}
	    var body = options.body

	    if (typeof input === 'string') {
	      this.url = input
	    } else {
	      if (input.bodyUsed) {
	        throw new TypeError('Already read')
	      }
	      this.url = input.url
	      this.credentials = input.credentials
	      if (!options.headers) {
	        this.headers = new Headers(input.headers)
	      }
	      this.method = input.method
	      this.mode = input.mode
	      if (!body && input._bodyInit != null) {
	        body = input._bodyInit
	        input.bodyUsed = true
	      }
	    }

	    this.credentials = options.credentials || this.credentials || 'omit'
	    if (options.headers || !this.headers) {
	      this.headers = new Headers(options.headers)
	    }
	    this.method = normalizeMethod(options.method || this.method || 'GET')
	    this.mode = options.mode || this.mode || null
	    this.referrer = null

	    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
	      throw new TypeError('Body not allowed for GET or HEAD requests')
	    }
	    this._initBody(body)
	  }

	  Request.prototype.clone = function() {
	    return new Request(this, { body: this._bodyInit })
	  }

	  function decode(body) {
	    var form = new FormData()
	    body.trim().split('&').forEach(function(bytes) {
	      if (bytes) {
	        var split = bytes.split('=')
	        var name = split.shift().replace(/\+/g, ' ')
	        var value = split.join('=').replace(/\+/g, ' ')
	        form.append(decodeURIComponent(name), decodeURIComponent(value))
	      }
	    })
	    return form
	  }

	  function parseHeaders(rawHeaders) {
	    var headers = new Headers()
	    rawHeaders.split('\r\n').forEach(function(line) {
	      var parts = line.split(':')
	      var key = parts.shift().trim()
	      if (key) {
	        var value = parts.join(':').trim()
	        headers.append(key, value)
	      }
	    })
	    return headers
	  }

	  Body.call(Request.prototype)

	  function Response(bodyInit, options) {
	    if (!options) {
	      options = {}
	    }

	    this.type = 'default'
	    this.status = 'status' in options ? options.status : 200
	    this.ok = this.status >= 200 && this.status < 300
	    this.statusText = 'statusText' in options ? options.statusText : 'OK'
	    this.headers = new Headers(options.headers)
	    this.url = options.url || ''
	    this._initBody(bodyInit)
	  }

	  Body.call(Response.prototype)

	  Response.prototype.clone = function() {
	    return new Response(this._bodyInit, {
	      status: this.status,
	      statusText: this.statusText,
	      headers: new Headers(this.headers),
	      url: this.url
	    })
	  }

	  Response.error = function() {
	    var response = new Response(null, {status: 0, statusText: ''})
	    response.type = 'error'
	    return response
	  }

	  var redirectStatuses = [301, 302, 303, 307, 308]

	  Response.redirect = function(url, status) {
	    if (redirectStatuses.indexOf(status) === -1) {
	      throw new RangeError('Invalid status code')
	    }

	    return new Response(null, {status: status, headers: {location: url}})
	  }

	  self.Headers = Headers
	  self.Request = Request
	  self.Response = Response

	  self.fetch = function(input, init) {
	    return new Promise(function(resolve, reject) {
	      var request = new Request(input, init)
	      var xhr = new XMLHttpRequest()

	      xhr.onload = function() {
	        var options = {
	          status: xhr.status,
	          statusText: xhr.statusText,
	          headers: parseHeaders(xhr.getAllResponseHeaders() || '')
	        }
	        options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL')
	        var body = 'response' in xhr ? xhr.response : xhr.responseText
	        resolve(new Response(body, options))
	      }

	      xhr.onerror = function() {
	        reject(new TypeError('Network request failed'))
	      }

	      xhr.ontimeout = function() {
	        reject(new TypeError('Network request failed'))
	      }

	      xhr.open(request.method, request.url, true)

	      if (request.credentials === 'include') {
	        xhr.withCredentials = true
	      }

	      if ('responseType' in xhr && support.blob) {
	        xhr.responseType = 'blob'
	      }

	      request.headers.forEach(function(value, name) {
	        xhr.setRequestHeader(name, value)
	      })

	      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit)
	    })
	  }
	  self.fetch.polyfill = true
	})(typeof self !== 'undefined' ? self : this);


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;
	  return _h('div', {
	    directives: [{
	      name: "show",
	      rawName: "v-show",
	      value: (_vm.bShowViewer),
	      expression: "bShowViewer"
	    }],
	    staticClass: "viewer-container overlay"
	  }, [_h('div', {
	    staticClass: "viewer-canvas"
	  }, [_h('div', {
	    staticClass: "img-wrap",
	    style: (_vm.imgStyle)
	  })]), " ", _h('div', {
	    staticClass: "viewer-footer"
	  }, [_h('ul', {
	    staticClass: "viewer-toolbar"
	  }, [_h('li', {
	    staticClass: "fa fa-plus",
	    on: {
	      "click": function($event) {
	        _vm.ratio += 0.1
	      }
	    }
	  }), " ", _h('li', {
	    staticClass: "fa fa-minus",
	    on: {
	      "click": function($event) {
	        _vm.ratio = Math.max(_vm.ratio -= 0.1, 0.1)
	      }
	    }
	  }), " ", _h('li', {
	    staticClass: "font-14",
	    on: {
	      "click": function($event) {
	        _vm.ratio = 1
	      }
	    }
	  }, ["1:1"]), " ", _h('li', {
	    staticClass: "fa fa-chevron-left",
	    on: {
	      "click": _vm.prev
	    }
	  }), " ", _h('li', {
	    staticClass: "fa fa-play viewer-play"
	  }), " ", _h('li', {
	    staticClass: "fa fa-chevron-right",
	    on: {
	      "click": _vm.next
	    }
	  }), " ", _h('li', {
	    staticClass: "fa fa-reply",
	    on: {
	      "click": function($event) {
	        _vm.degree -= 90
	      }
	    }
	  }), " ", _h('li', {
	    staticClass: "fa fa-share",
	    on: {
	      "click": function($event) {
	        _vm.degree += 90
	      }
	    }
	  })]), " ", _h('div', {
	    staticClass: "viewer-navbar"
	  })]), " ", _h('div', {
	    staticClass: "viewer-close",
	    on: {
	      "click": _vm.close
	    }
	  })])
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-631b91ee", module.exports)
	  }
	}

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* template */
	var __vue_template__ = __webpack_require__(10)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "D:\\360\\workspace\\Phpstorm\\Yikeyong\\src\\public\\js\\src\\vue\\navbar.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-b22b6628", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-b22b6628", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] navbar.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;
	  return _vm._m(0)
	},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;
	  return _h('div', {
	    staticClass: "vue-navbar"
	  }, [_h('nav', {
	    staticClass: "flex flex-average navigator"
	  }, [_h('a', {
	    staticClass: "box-hover",
	    attrs: {
	      "href": "http://www.yikeyong.com"
	    }
	  }, ["首页"]), " ", _h('a', {
	    staticClass: "box-hover",
	    attrs: {
	      "href": "/blog",
	      "target": "_blank"
	    }
	  }, ["博客"]), " ", _h('a', {
	    staticClass: "box-hover",
	    attrs: {
	      "href": "https://github.com/loliconer",
	      "target": "_blank"
	    }
	  }, ["Github"])])])
	}]}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-b22b6628", module.exports)
	  }
	}

/***/ }
/******/ ]);