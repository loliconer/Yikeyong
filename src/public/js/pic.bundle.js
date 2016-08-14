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
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _viewer = __webpack_require__(1);

	var _viewer2 = _interopRequireDefault(_viewer);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	!function () {
	    new Vue({
	        el: "body",
	        data: {
	            type: null
	        },
	        components: { Viewer: _viewer2.default },
	        methods: {
	            view: function view(type) {
	                this.$refs.viewer.show(type);
	            }
	        }
	    });
	}();

/***/ },

/***/ 1:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(2)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\public\\js\\src\\vue\\viewer.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(44)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-631b91ee/viewer.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 2:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _utils = __webpack_require__(40);

	var _utils2 = _interopRequireDefault(_utils);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var prototype = {}; // <template>
	//     <div class="viewer-container overlay" v-show="bShowViewer">
	//         <div class="viewer-canvas">
	//             <div class="img-wrap" :style="imgStyle"></div>
	//         </div>
	//         <div class="viewer-footer">
	//             <ul class="viewer-toolbar">
	//                 <li class="fa fa-plus" @click="ratio += 0.1"></li>
	//                 <li class="fa fa-minus" @click="ratio = Math.max(ratio -= 0.1,0.1)"></li>
	//                 <li class="font-14" @click="ratio = 1">1:1</li>
	//                 <li class="fa fa-chevron-left" @click="prev"></li>
	//                 <li class="fa fa-play viewer-play"></li>
	//                 <li class="fa fa-chevron-right" @click="next"></li>
	//                 <li class="fa fa-reply" @click="degree -= 90"></li>
	//                 <li class="fa fa-share" @click="degree += 90"></li>
	//             </ul>
	//             <div class="viewer-navbar"></div>
	//         </div>
	//         <div class="viewer-close" @click="close"></div>
	//     </div>
	// </template>
	//
	// <script>

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
	// </script>

/***/ },

/***/ 8:
/***/ function(module, exports) {

	var core = module.exports = {version: '2.4.0'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },

/***/ 40:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _stringify = __webpack_require__(41);

	var _stringify2 = _interopRequireDefault(_stringify);

	__webpack_require__(43);

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
	            // only visit every 5 pixels
	        defaultRGB = { r: 0, g: 0, b: 0 },
	            // for non-supporting envs
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
	            // rgb.a += data.data[i+3];
	        }
	        // ~~ used to floor values
	        rgb.r = ~~(rgb.r / count);
	        rgb.g = ~~(rgb.g / count);
	        rgb.b = ~~(rgb.b / count);
	        // rgb.a = ~~(rgb.a/count);
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

/***/ 41:
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(42), __esModule: true };

/***/ },

/***/ 42:
/***/ function(module, exports, __webpack_require__) {

	var core  = __webpack_require__(8)
	  , $JSON = core.JSON || (core.JSON = {stringify: JSON.stringify});
	module.exports = function stringify(it){ // eslint-disable-line no-unused-vars
	  return $JSON.stringify.apply($JSON, arguments);
	};

/***/ },

/***/ 43:
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
	    var list = this.map[name]
	    if (!list) {
	      list = []
	      this.map[name] = list
	    }
	    list.push(value)
	  }

	  Headers.prototype['delete'] = function(name) {
	    delete this.map[normalizeName(name)]
	  }

	  Headers.prototype.get = function(name) {
	    var values = this.map[normalizeName(name)]
	    return values ? values[0] : null
	  }

	  Headers.prototype.getAll = function(name) {
	    return this.map[normalizeName(name)] || []
	  }

	  Headers.prototype.has = function(name) {
	    return this.map.hasOwnProperty(normalizeName(name))
	  }

	  Headers.prototype.set = function(name, value) {
	    this.map[normalizeName(name)] = [normalizeValue(value)]
	  }

	  Headers.prototype.forEach = function(callback, thisArg) {
	    Object.getOwnPropertyNames(this.map).forEach(function(name) {
	      this.map[name].forEach(function(value) {
	        callback.call(thisArg, value, name, this)
	      }, this)
	    }, this)
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
	    reader.readAsArrayBuffer(blob)
	    return fileReaderReady(reader)
	  }

	  function readBlobAsText(blob) {
	    var reader = new FileReader()
	    reader.readAsText(blob)
	    return fileReaderReady(reader)
	  }

	  function Body() {
	    this.bodyUsed = false

	    this._initBody = function(body) {
	      this._bodyInit = body
	      if (typeof body === 'string') {
	        this._bodyText = body
	      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
	        this._bodyBlob = body
	      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
	        this._bodyFormData = body
	      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
	        this._bodyText = body.toString()
	      } else if (!body) {
	        this._bodyText = ''
	      } else if (support.arrayBuffer && ArrayBuffer.prototype.isPrototypeOf(body)) {
	        // Only support ArrayBuffers for POST method.
	        // Receiving ArrayBuffers happens via Blobs, instead.
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
	        } else if (this._bodyFormData) {
	          throw new Error('could not read FormData body as blob')
	        } else {
	          return Promise.resolve(new Blob([this._bodyText]))
	        }
	      }

	      this.arrayBuffer = function() {
	        return this.blob().then(readBlobAsArrayBuffer)
	      }

	      this.text = function() {
	        var rejected = consumed(this)
	        if (rejected) {
	          return rejected
	        }

	        if (this._bodyBlob) {
	          return readBlobAsText(this._bodyBlob)
	        } else if (this._bodyFormData) {
	          throw new Error('could not read FormData body as text')
	        } else {
	          return Promise.resolve(this._bodyText)
	        }
	      }
	    } else {
	      this.text = function() {
	        var rejected = consumed(this)
	        return rejected ? rejected : Promise.resolve(this._bodyText)
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
	    if (Request.prototype.isPrototypeOf(input)) {
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
	      if (!body) {
	        body = input._bodyInit
	        input.bodyUsed = true
	      }
	    } else {
	      this.url = input
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
	    return new Request(this)
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

	  function headers(xhr) {
	    var head = new Headers()
	    var pairs = (xhr.getAllResponseHeaders() || '').trim().split('\n')
	    pairs.forEach(function(header) {
	      var split = header.trim().split(':')
	      var key = split.shift().trim()
	      var value = split.join(':').trim()
	      head.append(key, value)
	    })
	    return head
	  }

	  Body.call(Request.prototype)

	  function Response(bodyInit, options) {
	    if (!options) {
	      options = {}
	    }

	    this.type = 'default'
	    this.status = options.status
	    this.ok = this.status >= 200 && this.status < 300
	    this.statusText = options.statusText
	    this.headers = options.headers instanceof Headers ? options.headers : new Headers(options.headers)
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
	      var request
	      if (Request.prototype.isPrototypeOf(input) && !init) {
	        request = input
	      } else {
	        request = new Request(input, init)
	      }

	      var xhr = new XMLHttpRequest()

	      function responseURL() {
	        if ('responseURL' in xhr) {
	          return xhr.responseURL
	        }

	        // Avoid security warnings on getResponseHeader when not allowed by CORS
	        if (/^X-Request-URL:/m.test(xhr.getAllResponseHeaders())) {
	          return xhr.getResponseHeader('X-Request-URL')
	        }

	        return
	      }

	      xhr.onload = function() {
	        var options = {
	          status: xhr.status,
	          statusText: xhr.statusText,
	          headers: headers(xhr),
	          url: responseURL()
	        }
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

/***/ 44:
/***/ function(module, exports) {

	module.exports = "\n<div class=\"viewer-container overlay\" v-show=\"bShowViewer\">\n    <div class=\"viewer-canvas\">\n        <div class=\"img-wrap\" :style=\"imgStyle\"></div>\n    </div>\n    <div class=\"viewer-footer\">\n        <ul class=\"viewer-toolbar\">\n            <li class=\"fa fa-plus\" @click=\"ratio += 0.1\"></li>\n            <li class=\"fa fa-minus\" @click=\"ratio = Math.max(ratio -= 0.1,0.1)\"></li>\n            <li class=\"font-14\" @click=\"ratio = 1\">1:1</li>\n            <li class=\"fa fa-chevron-left\" @click=\"prev\"></li>\n            <li class=\"fa fa-play viewer-play\"></li>\n            <li class=\"fa fa-chevron-right\" @click=\"next\"></li>\n            <li class=\"fa fa-reply\" @click=\"degree -= 90\"></li>\n            <li class=\"fa fa-share\" @click=\"degree += 90\"></li>\n        </ul>\n        <div class=\"viewer-navbar\"></div>\n    </div>\n    <div class=\"viewer-close\" @click=\"close\"></div>\n</div>\n";

/***/ }

/******/ });