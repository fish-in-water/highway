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
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _highway = __webpack_require__(2);
	
	var _highway2 = _interopRequireDefault(_highway);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	window.Highway = _highway2.default; //import 'babel-polyfill';
	exports.default = _highway2.default;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _utils = __webpack_require__(3);
	
	var _view = __webpack_require__(5);
	
	var _view2 = _interopRequireDefault(_view);
	
	var _component = __webpack_require__(7);
	
	var _component2 = _interopRequireDefault(_component);
	
	var _service = __webpack_require__(8);
	
	var _service2 = _interopRequireDefault(_service);
	
	var _directive = __webpack_require__(14);
	
	var _directive2 = _interopRequireDefault(_directive);
	
	var _macro = __webpack_require__(24);
	
	var _macro2 = _interopRequireDefault(_macro);
	
	var _pipe = __webpack_require__(10);
	
	var _pipe2 = _interopRequireDefault(_pipe);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var highway = (0, _utils.assign)(_view2.default, {
	  component: _component2.default,
	  service: _service2.default,
	  macro: _macro2.default,
	  pipe: _pipe2.default
	});
	
	exports.default = highway;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.MapList = exports.assign = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	exports.unique = unique;
	exports.includes = includes;
	exports.isArray = isArray;
	exports.isObject = isObject;
	exports.extend = extend;
	exports.inject = inject;
	exports.deconstruct = deconstruct;
	exports.secureHtml = secureHtml;
	exports.getAttrs = getAttrs;
	
	var _Zepto = __webpack_require__(4);
	
	var _Zepto2 = _interopRequireDefault(_Zepto);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var counter = 0;
	function unique(prefix) {
	  return '' + (prefix || '') + counter++;
	}
	
	var assign = exports.assign = _Zepto2.default.extend;
	
	function includes(arr, val) {
	  for (var i = 0, ii = arr.length; i < ii; i++) {
	    if (arr[i] === val) {
	      return true;
	    }
	  }
	
	  return false;
	}
	
	function isArray(obj) {
	  return Object.prototype.toString.call(obj) === '[object Array]';
	}
	
	function isObject(obj) {
	  return obj instanceof Object;
	  //return Object.prototype.toString.call(obj) === '[object Object]';
	}
	
	function extend(options) {
	  var Parent = this;
	
	  var Child = function (_Parent) {
	    _inherits(Child, _Parent);
	
	    function Child(options) {
	      _classCallCheck(this, Child);
	
	      return _possibleConstructorReturn(this, (Child.__proto__ || Object.getPrototypeOf(Child)).call(this, options));
	    }
	
	    return Child;
	  }(Parent);
	
	  this.assign(Child.prototype, options);
	  return Child;
	}
	
	function inject(handler, options) {
	  var deps = handler.toString().match(/^function\s*[^\(]*\(\s*([^\)]*)\)/m)[1].replace(/ /g, '').split(',');
	  var args = (deps || []).map(function (dep) {
	    return options[dep];
	  });
	  return function () {
	    return handler.apply(this, args);
	  };
	}
	
	var MapList = exports.MapList = function () {
	  function MapList() {
	    _classCallCheck(this, MapList);
	
	    this.data = {};
	  }
	
	  _createClass(MapList, [{
	    key: 'add',
	    value: function add(key, value) {
	      var _this2 = this;
	
	      var data = this.data;
	      var list = data[key] || (data[key] = []);
	      list.push(value);
	      return function () {
	        _this2.remove(key, value);
	      };
	    }
	  }, {
	    key: 'remove',
	    value: function remove(key, value) {
	      var data = this.data;
	      var list = data[key] || [];
	      for (var i = 0, ii = list.length; i < ii; i++) {
	        var v = list[i];
	        if (v == null) {
	          continue;
	        }
	        if (value == null || v === value) {
	          list.splice(i, 1);
	          i--;
	        }
	      }
	    }
	  }, {
	    key: 'find',
	    value: function find(key, value) {
	      if (key == null) {
	        return [];
	      }
	
	      var data = this.data;
	      var list = data[key] || [];
	      var result = [];
	      for (var _iterator = list, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
	        var _ref;
	
	        if (_isArray) {
	          if (_i >= _iterator.length) break;
	          _ref = _iterator[_i++];
	        } else {
	          _i = _iterator.next();
	          if (_i.done) break;
	          _ref = _i.value;
	        }
	
	        var v = _ref;
	
	        if (value == null || v === value) {
	          result.push(v);
	        }
	      }
	      return result;
	    }
	  }, {
	    key: 'clear',
	    value: function clear() {
	      var data = this.data;
	      for (var k in data) {
	        this.remove(k);
	      }
	    }
	  }, {
	    key: 'keys',
	    value: function keys() {
	      var keys = [];
	      for (var key in this.data) {
	        keys.push(key);
	      }
	      return keys;
	    }
	  }]);
	
	  return MapList;
	}();
	
	function deconstruct(exp) {
	  var exps = exp.replace(/[\[\]\{\}]/gi, '').split('|').map(function (attr) {
	    return attr.trim();
	  });
	  var watch = false;
	  var secure = true;
	
	  if (/{{{\s*[\s\S]+\s*}}}/.test(exp)) {
	    watch = true;
	    secure = false;
	  } else if (/{{\s*[\s\S]+\s*}}/.test(exp)) {
	    watch = true;
	    secure = true;
	  } else if (/\[\[\[\s*[\s\S]+\s*]]]/.test(exp)) {
	    watch = false;
	    secure = false;
	  } else if (/\[\[\s*[\s\S]+\s*]]/.test(exp)) {
	    watch = false;
	    secure = true;
	  } else {
	    watch = true;
	    secure = false;
	  }
	
	  return {
	    prop: exps[0],
	    watch: watch,
	    secure: secure,
	    pipes: exps.slice(1)
	  };
	}
	
	function secureHtml(html) {
	  if (null == html || '' == html) {
	    return html;
	  }
	
	  if (typeof html === 'string') {
	    return html.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#x27;').replace(/ /g, '&nbsp;');
	  } else {
	    return html;
	  }
	}
	
	function getAttrs($el) {
	  var attrs = {};
	  var node = $el[0];
	  for (var attr in node.attributes) {
	    if (node.attributes.hasOwnProperty(attr)) {
	      attrs[node.attributes[attr].name] = node.attributes[attr].value;
	    }
	  }
	  return attrs;
	}

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = Zepto;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _utils = __webpack_require__(3);
	
	var _element = __webpack_require__(6);
	
	var _element2 = _interopRequireDefault(_element);
	
	var _component = __webpack_require__(7);
	
	var _component2 = _interopRequireDefault(_component);
	
	var _service = __webpack_require__(8);
	
	var _service2 = _interopRequireDefault(_service);
	
	var _directive = __webpack_require__(14);
	
	var _directive2 = _interopRequireDefault(_directive);
	
	var _macro = __webpack_require__(24);
	
	var _macro2 = _interopRequireDefault(_macro);
	
	var _pipe = __webpack_require__(10);
	
	var _pipe2 = _interopRequireDefault(_pipe);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var View = function () {
	  function View(options) {
	    _classCallCheck(this, View);
	
	    (0, _utils.assign)(this, options);
	
	    this.$willmount();
	
	    {
	      _element2.default.initial(this);
	
	      _pipe2.default.initial(this);
	
	      _service2.default.initial(this);
	
	      _directive2.default.initial(this);
	
	      _component2.default.initial(this);
	
	      _macro2.default.initial(this);
	    }
	
	    this.$compile(this.$el, this.$scope);
	
	    this.$didmount();
	  }
	
	  _createClass(View, [{
	    key: '$compile',
	    value: function $compile($el) {
	      var $scope = arguments.length <= 1 || arguments[1] === undefined ? this.$scope : arguments[1];
	
	
	      //service.compile($el, $scope, this);
	
	      _element2.default.compile($el, $scope, this);
	
	      _directive2.default.compile($el, $scope, this, _directive2.default.PRIOR.EMERGENCY);
	
	      _component2.default.compile($el, $scope, this);
	
	      _directive2.default.compile($el, $scope, this);
	
	      _macro2.default.compile($el, $scope, this);
	    }
	  }, {
	    key: '$willmount',
	    value: function $willmount() {}
	  }, {
	    key: '$didmount',
	    value: function $didmount() {}
	  }, {
	    key: '$willunmount',
	    value: function $willunmount() {}
	  }, {
	    key: '$didunmount',
	    value: function $didunmount() {}
	  }, {
	    key: '$remove',
	    value: function $remove($el) {
	
	      _component2.default.remove($el, this);
	
	      _macro2.default.remove($el, this);
	
	      _directive2.default.remove($el, this);
	
	      _element2.default.remove($el, this);
	    }
	  }, {
	    key: '$destroy',
	    value: function $destroy() {
	
	      this.$willunmount && this.$willunmount();
	
	      this.$remove(this.$el);
	
	      {
	        _component2.default.destroy(this);
	
	        _macro2.default.destroy(this);
	
	        _directive2.default.destroy(this);
	
	        _service2.default.destroy(this);
	
	        _element2.default.destroy(this);
	      }
	
	      this.$didunmount && this.$didunmount();
	    }
	  }]);
	
	  return View;
	}();
	
	View.extend = _utils.extend;
	exports.default = View;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _utils = __webpack_require__(3);
	
	var _component = __webpack_require__(7);
	
	var _component2 = _interopRequireDefault(_component);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var element = {
	  initial: function initial($ctx) {
	    $ctx.$el = $ctx.$el || $('<div></div>');
	    $ctx.$template && $ctx.$el.html($($ctx.$template));
	  },
	  compile: function compile($el, $scope, $ctx) {
	    return $el;
	  },
	  remove: function remove($el, $ctx) {
	    $el.remove();
	  },
	  getId: function getId($el) {
	    var generate = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
	
	    var id = $el.attr('hi-id');
	    if (generate && id == null) {
	      $el.attr('hi-id', id = (0, _utils.unique)());
	    }
	    return id;
	  },
	  destroy: function destroy($ctx) {
	    $ctx.$el.remove();
	    $ctx.$el = null;
	    $ctx.$template = null;
	  }
	};
	
	exports.default = element;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _utils = __webpack_require__(3);
	
	var _element = __webpack_require__(6);
	
	var _element2 = _interopRequireDefault(_element);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var components = {};
	
	var component = function component(name, View) {
	  components[name.toLowerCase()] = View;
	};
	
	(0, _utils.assign)(component, {
	  initial: function initial($ctx) {
	    $ctx.$components = (0, _utils.assign)({}, components, $ctx.$components);
	    $ctx.$components._instances = new _utils.MapList();
	    //$ctx.$components.$children = $ctx.$components.$children || [];
	  },
	  compile: function compile($el, $scope, $ctx) {
	    var _this = this;
	
	    var iterator = function iterator($el, $ctx) {
	      if (!$el || !$el.length || !$el[0]) {
	        return;
	      }
	
	      for (var _iterator = Array.prototype.slice.call($el.children()), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
	        var _ref;
	
	        if (_isArray) {
	          if (_i >= _iterator.length) break;
	          _ref = _iterator[_i++];
	        } else {
	          _i = _iterator.next();
	          if (_i.done) break;
	          _ref = _i.value;
	        }
	
	        var childNode = _ref;
	
	        if (_this.isComponent($(childNode), $ctx)) {
	          var instance = _this.createComponent(childNode, $ctx);
	          instance.$parent = $ctx;
	          $ctx.$components._instances.add(_element2.default.getId(instance.$el, true), instance);
	        }
	      }
	    };
	
	    //if root is component
	    if (this.isComponent($ctx.$el, $ctx)) {
	      this.createComponent($ctx.$el, $ctx);
	    }
	
	    iterator($el, $ctx);
	  },
	  isComponent: function isComponent($el, $ctx) {
	
	    // if created
	    var instances = $ctx.$components._instances.find(_element2.default.getId($el));
	    if (instances && instances.length) {
	      return true;
	    }
	
	    // not created
	    var node = $el[0];
	    return node && node.nodeType === 1 && !!$ctx.$components[node.tagName.toLowerCase()];
	  },
	  createComponent: function createComponent(node, $ctx) {
	    var tagName = node.tagName.toLowerCase();
	    var View = $ctx.$components[tagName];
	    var $el = $('<div></div>').attr((0, _utils.assign)({ 'hi-component': tagName }, (0, _utils.getAttrs)($(node))));
	    $(node).replaceWith($el);
	    var instance = new View({ $el: $el });
	    return instance;
	  },
	  remove: function remove($el, $ctx) {
	    var iterator = function iterator($el, $ctx) {
	      if (component.isComponent($el, $ctx)) {
	        var id = _element2.default.getId($el);
	        if (id != null) {
	          var instances = $ctx.$components._instances.find(id);
	          for (var _iterator2 = instances, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
	            var _ref2;
	
	            if (_isArray2) {
	              if (_i2 >= _iterator2.length) break;
	              _ref2 = _iterator2[_i2++];
	            } else {
	              _i2 = _iterator2.next();
	              if (_i2.done) break;
	              _ref2 = _i2.value;
	            }
	
	            var instance = _ref2;
	
	            instance.$destroy();
	          }
	          $ctx.$components._instances.remove(id);
	        }
	
	        return;
	      }
	
	      for (var _iterator3 = Array.from($el.children()), _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
	        var _ref3;
	
	        if (_isArray3) {
	          if (_i3 >= _iterator3.length) break;
	          _ref3 = _iterator3[_i3++];
	        } else {
	          _i3 = _iterator3.next();
	          if (_i3.done) break;
	          _ref3 = _i3.value;
	        }
	
	        var childNode = _ref3;
	
	        iterator($(childNode), $ctx);
	      }
	    };
	
	    iterator($el, $ctx);
	  },
	  destroy: function destroy($ctx) {
	    var keys = $ctx.$components._instances.keys();
	    for (var key in keys) {
	      var instances = $ctx.$directives._instances.find(key);
	      for (var _iterator4 = instances, _isArray4 = Array.isArray(_iterator4), _i4 = 0, _iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator]();;) {
	        var _ref4;
	
	        if (_isArray4) {
	          if (_i4 >= _iterator4.length) break;
	          _ref4 = _iterator4[_i4++];
	        } else {
	          _i4 = _iterator4.next();
	          if (_i4.done) break;
	          _ref4 = _i4.value;
	        }
	
	        var instance = _ref4;
	
	        instance.$destroy();
	      }
	    }
	
	    $ctx.$el.$children = null;
	    $ctx.$children = null;
	  }
	});
	
	exports.default = component;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _utils = __webpack_require__(3);
	
	var _scope = __webpack_require__(9);
	
	var _scope2 = _interopRequireDefault(_scope);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var services = {};
	
	var service = function service(name, _service) {
	  services[name] = _service;
	};
	
	(0, _utils.assign)(service, {
	  initial: function initial($ctx) {
	    $ctx.$services = (0, _utils.assign)({}, services, $ctx.$services);
	    for (var _service2 in $ctx.$services) {
	      var instance = $ctx.$services[_service2]($ctx);
	      $ctx.$services[_service2] = instance;
	      instance.$mount && instance.$mount($ctx);
	    }
	  },
	
	  //compile($el, $scope, $ctx) {
	  //
	  //},
	  destroy: function destroy($ctx) {
	    for (var instance in $ctx.$services) {
	      instance.$unmount && instance.$unmount($ctx);
	    }
	
	    $ctx.$services = null;
	  }
	});
	
	exports.default = service;
	
	// install build-in
	
	service('$scope', _scope2.default);

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _utils = __webpack_require__(3);
	
	var _pipe = __webpack_require__(10);
	
	var _pipe2 = _interopRequireDefault(_pipe);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var scope = function scope($ctx) {
	  var factory = function factory(obj) {
	    var series = {};
	    var watchers = new _utils.MapList();
	
	    return (0, _utils.assign)(Object.create({
	      $create: function $create(obj) {
	        return factory(obj);
	      },
	      $series: function $series(data) {
	        var series = {};
	
	        var iterator = function iterator(prop, data) {
	
	          series[prop] = data;
	
	          if ((0, _utils.isArray)(data)) {
	            for (var i = 0, ii = data.length; i < ii; i++) {
	              var prop2 = prop + ('[' + i + ']');
	              series[prop2] = data[i];
	              iterator(prop + ('[' + i + ']'), data[i]);
	            }
	          } else if ((0, _utils.isObject)(data)) {
	            for (var key in data) {
	              if (data.hasOwnProperty(key)) {
	                var childProp = prop ? prop + '.' + key : '' + key;
	                iterator(childProp, data[key]);
	              }
	            }
	          }
	        };
	
	        iterator('', data);
	
	        return series;
	      },
	      $where: function $where() {
	        var prop = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
	
	        if (!prop) {
	          return {
	            scope: this,
	            prop: prop
	          };
	        }
	
	        var matches = prop.match(/^(?:\$parent).([\s\S]*)/);
	        if (matches) {
	          return {
	            scope: this.$parent.$scope,
	            prop: matches[1]
	          };
	        }
	
	        var first = prop.match(/^([^.\[\]])+/)[0];
	        if (typeof series[first] === 'undefined' && this.$parent) {
	          return {
	            scope: this.$parent,
	            prop: prop
	          };
	        }
	
	        return {
	          scope: this,
	          prop: prop
	        };
	      },
	      $get: function $get() {
	        var prop = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
	
	        var where = this.$where(prop);
	        if (where.scope === this) {
	          var val = series[prop];
	          if ((0, _utils.isArray)(val)) {
	            return (0, _utils.assign)([], val);
	          } else if ((0, _utils.isObject)(val)) {
	            return (0, _utils.assign)({}, val);
	          } else {
	            return val;
	          }
	        } else {
	          return where.scope.$get(where.prop);
	        }
	      },
	      $set: function $set() {
	        var prop = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
	        var newVal = arguments.length <= 1 || arguments[1] === undefined ? void 0 : arguments[1];
	
	        if (prop) {
	          this[prop] = newVal;
	        } else {
	          for (var key in this) {
	            if (this.hasOwnProperty(key)) {
	              delete this[key];
	            }
	          }
	
	          (0, _utils.assign)(this, newVal);
	        }
	
	        var oldSeries = series;
	        var newSeries = series = this.$series(this);
	
	        var reg = new RegExp('^' + prop);
	        var keys = watchers.keys();
	        for (var _iterator = keys, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
	          var _ref;
	
	          if (_isArray) {
	            if (_i >= _iterator.length) break;
	            _ref = _iterator[_i++];
	          } else {
	            _i = _iterator.next();
	            if (_i.done) break;
	            _ref = _i.value;
	          }
	
	          var _key = _ref;
	
	          if (reg.test(_key)) {
	            var oldValue = oldSeries[_key];
	            var newValue = newSeries[_key];
	            if (newValue !== oldValue) {
	              this.$fire(_key, newValue, oldValue);
	            }
	          }
	        }
	
	        return newVal;
	      },
	      $watch: function $watch(prop, handler) {
	        var where = this.$where(prop);
	        if (where.scope === this) {
	          return watchers.add(prop, handler);
	        } else {
	          return where.scope.$watch(where.prop, handler);
	        }
	      },
	      $unwatch: function $unwatch(prop, handler) {
	        var where = this.$where(prop);
	        if (where.scope === this) {
	          return watchers.remove(prop, handler);
	        } else {
	          return where.scope.$unwatch(where.prop, handler);
	        }
	      },
	      $fire: function $fire(prop, newVal, oldVal) {
	        var handlers = watchers.find(prop);
	        for (var _iterator2 = handlers, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
	          var _ref2;
	
	          if (_isArray2) {
	            if (_i2 >= _iterator2.length) break;
	            _ref2 = _iterator2[_i2++];
	          } else {
	            _i2 = _iterator2.next();
	            if (_i2.done) break;
	            _ref2 = _i2.value;
	          }
	
	          var handler = _ref2;
	
	          handler(newVal, oldVal);
	        }
	      },
	      $pipe: function $pipe(val, pipes) {
	        return _pipe2.default.compile(val, pipes, $ctx);
	      },
	      $mount: function $mount($ctx) {
	        series = this.$series(this);
	      },
	      $unmount: function $unmount($ctx) {
	        series = null;
	        watchers.clear();
	      }
	    }), obj);
	  };
	
	  $ctx.$scope = factory($ctx.$scope);
	
	  return $ctx.$scope;
	};
	
	exports.default = scope;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _utils = __webpack_require__(3);
	
	var _lowercase = __webpack_require__(11);
	
	var _lowercase2 = _interopRequireDefault(_lowercase);
	
	var _uppercase = __webpack_require__(12);
	
	var _uppercase2 = _interopRequireDefault(_uppercase);
	
	var _sort = __webpack_require__(13);
	
	var _sort2 = _interopRequireDefault(_sort);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var pipes = {};
	
	var pipe = function pipe(name, _pipe) {
	  pipes[name] = _pipe;
	};
	
	(0, _utils.assign)(pipe, {
	  initial: function initial($ctx) {
	    $ctx.$pipes = (0, _utils.assign)({}, pipes, $ctx.$pipes);
	
	    for (var _pipe2 in $ctx.$pipes) {
	      var instance = $ctx.$pipes[_pipe2]($ctx);
	      $ctx.$pipes[_pipe2] = instance;
	      instance.$mount && instance.$mount($ctx);
	    }
	  },
	  compile: function compile($value, pipes, $ctx) {
	    return pipes.reduce(function ($value, pipe) {
	      var exp = void 0;
	      var index = pipe.indexOf(':');
	      if (index != -1) {
	        var ori = pipe;
	        pipe = ori.substring(0, index).trim();
	        exp = ori.substring(index + 1).trim();
	      }
	
	      var instance = $ctx.$pipes[pipe];
	      if (!instance) {
	        return $value;
	      }
	      var $iterator = instance.$iterator;
	      return $iterator({
	        $value: $value,
	        $ctx: $ctx,
	        $exp: exp,
	        $pipe: pipe
	      });
	    }, $value);
	  },
	  destroy: function destroy($ctx) {
	    for (var instance in $ctx.$pipes) {
	      instance.$unmount && instance.$unmount($ctx);
	    }
	
	    $ctx.$pipes = null;
	  }
	});
	
	exports.default = pipe;
	
	// install build-in
	
	pipe('lowercase', _lowercase2.default);
	pipe('uppercase', _uppercase2.default);
	pipe('sort', _sort2.default);

/***/ },
/* 11 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var lowercase = function lowercase() {
	  return {
	    $iterator: function $iterator(_ref) {
	      var $value = _ref.$value;
	
	      if ($value == null) {
	        return $value;
	      }
	
	      return $value.toLowerCase();
	    }
	  };
	};
	
	exports.default = lowercase;

/***/ },
/* 12 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var lowercase = function lowercase() {
	  return {
	    $iterator: function $iterator(_ref) {
	      var $value = _ref.$value;
	
	      if ($value == null) {
	        return $value;
	      }
	
	      return $value.toUpperCase();
	    }
	  };
	};
	
	exports.default = lowercase;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _utils = __webpack_require__(3);
	
	var orderby = function orderby() {
	  return {
	    $iterator: function $iterator(_ref) {
	      var $value = _ref.$value;
	      var $exp = _ref.$exp;
	
	
	      if (!$exp) {
	        return $value;
	      }
	
	      if (!(0, _utils.isArray)($value)) {
	        return $value;
	      }
	
	      var matches = $exp.match(/(\S+)\s+(\S+)/);
	      var field = matches[1];
	      var asc = !matches[2] || matches[2].toLowerCase() === 'asc';
	
	      var result = $value.sort(function (a, b) {
	        return asc ? a[field] - b[field] : a[field] - b[field];
	      });
	
	      return result;
	    }
	  };
	};
	
	exports.default = orderby;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _component = __webpack_require__(7);
	
	var _component2 = _interopRequireDefault(_component);
	
	var _element = __webpack_require__(6);
	
	var _element2 = _interopRequireDefault(_element);
	
	var _utils = __webpack_require__(3);
	
	var _if = __webpack_require__(15);
	
	var _if2 = _interopRequireDefault(_if);
	
	var _repeat = __webpack_require__(16);
	
	var _repeat2 = _interopRequireDefault(_repeat);
	
	var _on = __webpack_require__(17);
	
	var _on2 = _interopRequireDefault(_on);
	
	var _bind = __webpack_require__(18);
	
	var _bind2 = _interopRequireDefault(_bind);
	
	var _value = __webpack_require__(19);
	
	var _value2 = _interopRequireDefault(_value);
	
	var _show = __webpack_require__(22);
	
	var _show2 = _interopRequireDefault(_show);
	
	var _hide = __webpack_require__(23);
	
	var _hide2 = _interopRequireDefault(_hide);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var PRIOR = {
	  EMERGENCY: -9,
	  DEFAULT: 0
	};
	
	var priorities = [];
	var directives = {};
	
	var directive = function directive(name, _directive) {
	  var priority = arguments.length <= 2 || arguments[2] === undefined ? PRIOR.DEFAULT : arguments[2];
	
	  if (!(0, _utils.includes)(priorities, priority)) {
	    priorities.push(priority);
	    priorities.sort(function (prev, next) {
	      return prev - next;
	    });
	  }
	
	  _directive.priority = priority;
	  directives[name] = _directive;
	};
	
	(0, _utils.assign)(directive, {
	  PRIOR: PRIOR,
	  initial: function initial($ctx) {
	    $ctx.$directives = (0, _utils.assign)({}, directives, $ctx.$directives);
	    $ctx.$directives._instances = new _utils.MapList();
	  },
	  compile: function compile($el, $scope, $ctx, priority) {
	    var iterator = function iterator($el, $ctx, priority) {
	      if (_component2.default.isComponent($el, $ctx)) {
	        return;
	      }
	
	      var attrs = (0, _utils.getAttrs)($el);
	      for (var attr in attrs) {
	
	        var index = attr.indexOf(':');
	        var ori = attr;
	        var arg = void 0;
	        if (index != -1) {
	          attr = ori.substring(0, index);
	          arg = ori.substring(index + 1);
	        }
	
	        var _directive2 = $ctx.$directives[attr];
	        if (_directive2 && (_directive2.priority || PRIOR.DEFAULT) === priority) {
	          var instance = _directive2({
	            $ctx: $ctx,
	            $el: $el,
	            $arg: arg,
	            $exp: attrs[ori],
	            $scope: $scope,
	            $directive: attr
	          });
	
	          if (instance) {
	            instance.$mount && instance.$mount($ctx);
	            $ctx.$directives._instances.add(_element2.default.getId($el, true), instance);
	          }
	        }
	      }
	
	      for (var _iterator = Array.prototype.slice.call($el.children()), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
	        var _ref;
	
	        if (_isArray) {
	          if (_i >= _iterator.length) break;
	          _ref = _iterator[_i++];
	        } else {
	          _i = _iterator.next();
	          if (_i.done) break;
	          _ref = _i.value;
	        }
	
	        var childNode = _ref;
	
	        iterator($(childNode), $ctx, priority);
	      }
	    };
	
	    if (priority != null) {
	      iterator($el, $ctx, priority);
	    } else {
	      for (var _iterator2 = priorities, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
	        var _ref2;
	
	        if (_isArray2) {
	          if (_i2 >= _iterator2.length) break;
	          _ref2 = _iterator2[_i2++];
	        } else {
	          _i2 = _iterator2.next();
	          if (_i2.done) break;
	          _ref2 = _i2.value;
	        }
	
	        var tmp = _ref2;
	
	        if (tmp !== PRIOR.EMERGENCY) {
	          iterator($el, $ctx, tmp);
	        }
	      }
	    }
	  },
	  remove: function remove($el, $ctx) {
	    var iterator = function iterator($el, $ctx) {
	      if (_component2.default.isComponent($el, $ctx)) {
	        return;
	      }
	
	      for (var _iterator3 = Array.prototype.slice.call($el.children()), _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
	        var _ref3;
	
	        if (_isArray3) {
	          if (_i3 >= _iterator3.length) break;
	          _ref3 = _iterator3[_i3++];
	        } else {
	          _i3 = _iterator3.next();
	          if (_i3.done) break;
	          _ref3 = _i3.value;
	        }
	
	        var childNode = _ref3;
	
	        iterator($(childNode), $ctx);
	      }
	
	      var id = _element2.default.getId($el);
	      if (id != null) {
	        var instances = $ctx.$directives._instances.find(id);
	        for (var _iterator4 = instances, _isArray4 = Array.isArray(_iterator4), _i4 = 0, _iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator]();;) {
	          var _ref4;
	
	          if (_isArray4) {
	            if (_i4 >= _iterator4.length) break;
	            _ref4 = _iterator4[_i4++];
	          } else {
	            _i4 = _iterator4.next();
	            if (_i4.done) break;
	            _ref4 = _i4.value;
	          }
	
	          var instance = _ref4;
	
	          instance.$unmount && instance.$unmount($ctx);
	        }
	        $ctx.$directives._instances.remove(id);
	      }
	    };
	
	    iterator($el, $ctx);
	  },
	  destroy: function destroy($ctx) {
	    var keys = $ctx.$directives._instances.keys();
	    for (var key in keys) {
	      var instances = $ctx.$directives._instances.find(key);
	      for (var _iterator5 = instances, _isArray5 = Array.isArray(_iterator5), _i5 = 0, _iterator5 = _isArray5 ? _iterator5 : _iterator5[Symbol.iterator]();;) {
	        var _ref5;
	
	        if (_isArray5) {
	          if (_i5 >= _iterator5.length) break;
	          _ref5 = _iterator5[_i5++];
	        } else {
	          _i5 = _iterator5.next();
	          if (_i5.done) break;
	          _ref5 = _i5.value;
	        }
	
	        var instance = _ref5;
	
	        instance.$unmount && instance.$unmount(this);
	      }
	    }
	
	    $ctx.$directives._instances.clear();
	    $ctx.$directives._instances = null;
	    $ctx.$directives = null;
	  }
	});
	
	exports.default = directive;
	
	// install build-in
	
	directive('hi-if', _if2.default, directive.PRIOR.EMERGENCY);
	directive('hi-repeat', _repeat2.default, directive.PRIOR.EMERGENCY);
	directive('hi-on', _on2.default);
	directive('hi-bind', _bind2.default);
	directive('hi-value', _value2.default);
	directive('hi-show', _show2.default);
	directive('hi-hide', _hide2.default);

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _utils = __webpack_require__(3);
	
	var _element = __webpack_require__(6);
	
	var _element2 = _interopRequireDefault(_element);
	
	var _directive = __webpack_require__(14);
	
	var _directive2 = _interopRequireDefault(_directive);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var ef = function ef(_ref) {
	  var $ctx = _ref.$ctx;
	  var $el = _ref.$el;
	  var $arg = _ref.$arg;
	  var $exp = _ref.$exp;
	  var $scope = _ref.$scope;
	
	  //$ctx, $el, $arg, $exp
	  var _deconstruct = (0, _utils.deconstruct)($exp);
	
	  var prop = _deconstruct.prop;
	  var watch = _deconstruct.watch;
	
	  var $clone = $el.clone();
	  var $prev = $el.prev();
	  var $next = $el.next();
	  var $parent = $el.parent();
	  var $new = $el;
	  var watcher = function watcher(value) {
	    if (value) {
	      $new = $clone.clone();
	      if ($next.length && $next.parent().length) {
	        $new.insertBefore($next);
	      } else if ($prev.length && $prev.parent().length) {
	        $new.insertAfter($prev);
	      } else {
	        $new.appendTo($parent);
	      }
	      $ctx.$compile($new);
	      $scope.$unwatch(prop, watcher);
	    } else {
	      $ctx.$remove($new);
	      $scope.$watch(prop, watcher);
	    }
	  };
	
	  if (!$ctx.$scope.$get(prop)) {
	    $ctx.$remove($el);
	  }
	
	  if (watch) {
	    return {
	      $mount: function $mount() {
	        $scope.$watch(prop, watcher);
	      },
	      $unmount: function $unmount() {
	        $scope.$unwatch(prop, watcher);
	      }
	    };
	  }
	};
	
	exports.default = ef;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _utils = __webpack_require__(3);
	
	var repeat = function repeat(_ref) {
	  var $ctx = _ref.$ctx;
	  var $el = _ref.$el;
	  var $arg = _ref.$arg;
	  var $exp = _ref.$exp;
	  var $scope = _ref.$scope;
	  var $directive = _ref.$directive;
	
	  var _deconstruct = (0, _utils.deconstruct)($exp);
	
	  var prop = _deconstruct.prop;
	  var watch = _deconstruct.watch;
	  var pipes = _deconstruct.pipes;
	
	  var $clone = $el.clone().removeAttr($directive).removeAttr('hi-id');
	  var $prev = $el.prev();
	  var $next = $el.next();
	  var $parent = $el.parent();
	  var matches = prop.match(/(\S*)\s+in\s+(\S*)/);
	  var itemProp = matches[1];
	  var arrayProp = matches[2];
	  var $els = [];
	  var scopes = [];
	
	  // remove current el
	  $ctx.$remove($el);
	
	  var clear = function clear() {
	    // clear els
	    for (var _iterator = $els, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
	      var _ref2;
	
	      if (_isArray) {
	        if (_i >= _iterator.length) break;
	        _ref2 = _iterator[_i++];
	      } else {
	        _i = _iterator.next();
	        if (_i.done) break;
	        _ref2 = _i.value;
	      }
	
	      var _$el = _ref2;
	
	      $ctx.$remove(_$el);
	    }
	    $els = [];
	
	    // clear scopes
	    for (var _iterator2 = scopes, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
	      var _ref3;
	
	      if (_isArray2) {
	        if (_i2 >= _iterator2.length) break;
	        _ref3 = _iterator2[_i2++];
	      } else {
	        _i2 = _iterator2.next();
	        if (_i2.done) break;
	        _ref3 = _i2.value;
	      }
	
	      var scope = _ref3;
	
	      scope.$unmount();
	    }
	    scopes = [];
	  };
	
	  var watcher = function watcher(value) {
	
	    value = $ctx.$scope.$pipe(value, pipes);
	
	    clear();
	
	    if (value && (0, _utils.isArray)(value) && value.length) {
	      var _loop = function _loop(i, ii) {
	
	        (function () {
	          var data = {};
	          data[itemProp] = value[i];
	
	          // create new scope
	          var scope = $scope.$create(data);
	          scope.$parent = $scope;
	          scope.$mount();
	          scopes.push(scope);
	
	          // create new element
	          var $el = $clone.clone();
	
	          // compile
	          $ctx.$compile($el, scope);
	
	          $els.push($el);
	        })();
	      };
	
	      for (var i = 0, ii = value.length; i < ii; i++) {
	        _loop(i, ii);
	      }
	
	      if ($el.length && $next.parent().length) {
	        for (var _iterator3 = $els, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
	          var _ref4;
	
	          if (_isArray3) {
	            if (_i3 >= _iterator3.length) break;
	            _ref4 = _iterator3[_i3++];
	          } else {
	            _i3 = _iterator3.next();
	            if (_i3.done) break;
	            _ref4 = _i3.value;
	          }
	
	          var _$el2 = _ref4;
	
	          _$el2.insertBefore($next);
	        }
	      } else if ($prev.length && $prev.parent().length) {
	        for (var _iterator4 = $els.reverse(), _isArray4 = Array.isArray(_iterator4), _i4 = 0, _iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator]();;) {
	          var _ref5;
	
	          if (_isArray4) {
	            if (_i4 >= _iterator4.length) break;
	            _ref5 = _iterator4[_i4++];
	          } else {
	            _i4 = _iterator4.next();
	            if (_i4.done) break;
	            _ref5 = _i4.value;
	          }
	
	          var _$el3 = _ref5;
	
	          _$el3.insertAfter($prev);
	        }
	      } else {
	        for (var _iterator5 = $els, _isArray5 = Array.isArray(_iterator5), _i5 = 0, _iterator5 = _isArray5 ? _iterator5 : _iterator5[Symbol.iterator]();;) {
	          var _ref6;
	
	          if (_isArray5) {
	            if (_i5 >= _iterator5.length) break;
	            _ref6 = _iterator5[_i5++];
	          } else {
	            _i5 = _iterator5.next();
	            if (_i5.done) break;
	            _ref6 = _i5.value;
	          }
	
	          var _$el4 = _ref6;
	
	          _$el4.appendTo($parent);
	        }
	      }
	    }
	  };
	
	  watcher($ctx.$scope.$get(arrayProp));
	
	  if (watch) {
	    return {
	      $mount: function $mount() {
	        $scope.$watch(arrayProp, watcher);
	      },
	      $unmount: function $unmount() {
	        $scope.$unwatch(arrayProp, watcher);
	
	        clear();
	      }
	    };
	  }
	};
	
	exports.default = repeat;

/***/ },
/* 17 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var on = function on(_ref) {
	  var $ctx = _ref.$ctx;
	  var $el = _ref.$el;
	  var $arg = _ref.$arg;
	  var $exp = _ref.$exp;
	  //$ctx, $el, $arg, $exp
	  var handler = function handler($ev) {
	    $ctx[$exp]({ $el: $el, $ev: $ev });
	  };
	
	  return {
	    $mount: function $mount() {
	      $el.on($arg, handler);
	    },
	    $unmount: function $unmount() {
	      $el.off($arg, handler);
	    }
	  };
	};
	
	exports.default = on;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _utils = __webpack_require__(3);
	
	var bind = function bind(_ref) {
	  var $el = _ref.$el;
	  var $arg = _ref.$arg;
	  var $exp = _ref.$exp;
	  var $scope = _ref.$scope;
	
	  //$ctx, $el, $arg, $exp
	  var _deconstruct = (0, _utils.deconstruct)($exp);
	
	  var prop = _deconstruct.prop;
	  var watch = _deconstruct.watch;
	  var secure = _deconstruct.secure;
	  var pipes = _deconstruct.pipes;
	
	  var watcher = function watcher(value) {
	    $el.html(secure ? (0, _utils.secureHtml)(value) : value);
	  };
	
	  watcher($scope.$pipe($scope.$get(prop), pipes));
	
	  if (watch) {
	    return {
	      $mount: function $mount() {
	        $scope.$watch(prop, watcher);
	      },
	      $unmount: function $unmount() {
	        $scope.$unwatch(prop, watcher);
	      }
	    };
	  }
	};
	
	exports.default = bind;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _input = __webpack_require__(20);
	
	var _input2 = _interopRequireDefault(_input);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var value = function value(_ref) {
	  var $ctx = _ref.$ctx;
	  var $el = _ref.$el;
	  var $arg = _ref.$arg;
	  var $exp = _ref.$exp;
	  var $scope = _ref.$scope;
	  //$ctx, $el, $arg, $exp
	  switch ($el.attr('tagName').toLowerCase()) {
	    case 'input':
	      return (0, _input2.default)({ $ctx: $ctx, $el: $el, $arg: $arg, $exp: $exp, $scope: $scope });
	  }
	};
	
	exports.default = value;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _text = __webpack_require__(21);
	
	var _text2 = _interopRequireDefault(_text);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var input = function input(_ref) {
	  var $ctx = _ref.$ctx;
	  var $el = _ref.$el;
	  var $arg = _ref.$arg;
	  var $exp = _ref.$exp;
	  var $scope = _ref.$scope;
	  //$ctx, $el, $arg, $exp
	  switch ($el.attr('type').toLowerCase()) {
	    case 'text':
	      return (0, _text2.default)({ $ctx: $ctx, $el: $el, $arg: $arg, $exp: $exp, $scope: $scope });
	  }
	};
	
	exports.default = input;

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _utils = __webpack_require__(3);
	
	var text = function text(_ref) {
	  var $el = _ref.$el;
	  var $arg = _ref.$arg;
	  var $exp = _ref.$exp;
	  var $scope = _ref.$scope;
	
	  //$ctx, $el, $arg, $exp
	  var _deconstruct = (0, _utils.deconstruct)($exp);
	
	  var prop = _deconstruct.prop;
	  var watch = _deconstruct.watch;
	  var secure = _deconstruct.secure;
	
	  var watcher = function watcher(value) {
	    $el.val(secure ? (0, _utils.secureHtml)(value) : value);
	  };
	  var inputer = function inputer() {
	    $scope.$set(prop, $el.val());
	  };
	
	  watcher($scope.$get(prop));
	
	  if (watch) {
	    return {
	      $mount: function $mount() {
	        $scope.$watch(prop, watcher);
	        $el.on('input', inputer);
	      },
	      $unmount: function $unmount() {
	        $scope.$unwatch(prop, handler);
	        $el.off('input', inputer);
	      }
	    };
	  }
	};
	
	exports.default = text;

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _utils = __webpack_require__(3);
	
	var show = function show(_ref) {
	  var $el = _ref.$el;
	  var $arg = _ref.$arg;
	  var $exp = _ref.$exp;
	  var $scope = _ref.$scope;
	
	  //$ctx, $el, $arg, $exp
	  var _deconstruct = (0, _utils.deconstruct)($exp);
	
	  var prop = _deconstruct.prop;
	  var watch = _deconstruct.watch;
	
	  var watcher = function watcher(value) {
	    $el.css('display', value ? '' : 'none');
	  };
	
	  watcher($scope.$get(prop));
	
	  if (watch) {
	    return {
	      $mount: function $mount() {
	        $scope.$watch(prop, watcher);
	      },
	      $unmount: function $unmount() {
	        $scope.$unwatch(prop, watcher);
	      }
	    };
	  }
	};
	
	exports.default = show;

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _utils = __webpack_require__(3);
	
	var hide = function hide(_ref) {
	  var $el = _ref.$el;
	  var $arg = _ref.$arg;
	  var $exp = _ref.$exp;
	  var $scope = _ref.$scope;
	
	  //$ctx, $el, $arg, $exp
	  var _deconstruct = (0, _utils.deconstruct)($exp);
	
	  var prop = _deconstruct.prop;
	  var watch = _deconstruct.watch;
	
	  var watcher = function watcher(value) {
	    $el.css('display', !value ? '' : 'none');
	  };
	
	  watcher($scope.$get(prop));
	
	  if (watch) {
	    return {
	      $mount: function $mount() {
	        $scope.$watch(prop, watcher);
	      },
	      $unmount: function $unmount() {
	        $scope.$unwatch(prop, watcher);
	      }
	    };
	  }
	};
	
	exports.default = hide;

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	var _component = __webpack_require__(7);
	
	var _component2 = _interopRequireDefault(_component);
	
	var _element = __webpack_require__(6);
	
	var _element2 = _interopRequireDefault(_element);
	
	var _utils = __webpack_require__(3);
	
	var _bind = __webpack_require__(25);
	
	var _bind2 = _interopRequireDefault(_bind);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var macros = {};
	var macro = function macro(exp, _macro) {
	  macros[exp] = _macro;
	};
	
	(0, _utils.assign)(macro, {
	  initial: function initial($ctx) {
	    $ctx.$macros = (0, _utils.assign)({}, macros, $ctx.macros);
	    $ctx.$macros._instances = new _utils.MapList();
	  },
	  compile: function compile($el, $scope, $ctx) {
	
	    var iterator = function iterator($el, $ctx) {
	
	      if (_component2.default.isComponent($el, $ctx)) {
	        return;
	      }
	
	      if (!$el.children().length) {
	        var _ret = function () {
	          var text = $el.html();
	          if (text == null || text === '') {
	            return {
	              v: void 0
	            };
	          }
	
	          var instances = [];
	          var update = function update() {
	            if (instances && instances.length) {
	              var newHtml = instances.reduce(function (text, instance) {
	                var $iterator = instance.$iterator;
	                if (!$iterator) {
	                  return text;
	                }
	
	                if ($.isFunction($iterator)) {
	                  return $iterator(text);
	                } else {
	                  return text.replace($iterator.$exp, $iterator.$value);
	                }
	
	                //return instance.$iterator ? instance.$iterator(text) : text;
	              }, text);
	              $el.html(newHtml);
	            }
	          };
	
	          for (var exp in macros) {
	            var matches = text.match(new RegExp(exp, 'gm'));
	            if (matches) {
	              for (var _iterator = matches, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
	                var _ref;
	
	                if (_isArray) {
	                  if (_i >= _iterator.length) break;
	                  _ref = _iterator[_i++];
	                } else {
	                  _i = _iterator.next();
	                  if (_i.done) break;
	                  _ref = _i.value;
	                }
	
	                var match = _ref;
	
	                var instance = macros[exp]({
	                  $ctx: $ctx,
	                  $el: $el,
	                  $exp: match,
	                  $update: update,
	                  $scope: $scope
	                });
	                instance.$mount && instance.$mount($ctx);
	                instances.push(instance);
	                $ctx.$macros._instances.add(_element2.default.getId($el, true), instance);
	              }
	            }
	          }
	
	          update();
	        }();
	
	        if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
	      }
	
	      for (var _iterator2 = Array.prototype.slice.call($el.children()), _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
	        var _ref2;
	
	        if (_isArray2) {
	          if (_i2 >= _iterator2.length) break;
	          _ref2 = _iterator2[_i2++];
	        } else {
	          _i2 = _iterator2.next();
	          if (_i2.done) break;
	          _ref2 = _i2.value;
	        }
	
	        var childNode = _ref2;
	
	        iterator($(childNode), $ctx);
	      }
	    };
	
	    iterator($el, $ctx);
	  },
	  remove: function remove($el, $ctx) {
	
	    var iterator = function iterator($el, $ctx) {
	      if (_component2.default.isComponent($el, $ctx)) {
	        return;
	      }
	
	      for (var _iterator3 = Array.prototype.slice.call($el.children()), _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
	        var _ref3;
	
	        if (_isArray3) {
	          if (_i3 >= _iterator3.length) break;
	          _ref3 = _iterator3[_i3++];
	        } else {
	          _i3 = _iterator3.next();
	          if (_i3.done) break;
	          _ref3 = _i3.value;
	        }
	
	        var childNode = _ref3;
	
	        iterator($(childNode), $ctx);
	      }
	
	      var id = _element2.default.getId($el);
	      if (id != null) {
	        var instances = $ctx.$macros._instances.find(id);
	        for (var _iterator4 = instances, _isArray4 = Array.isArray(_iterator4), _i4 = 0, _iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator]();;) {
	          var _ref4;
	
	          if (_isArray4) {
	            if (_i4 >= _iterator4.length) break;
	            _ref4 = _iterator4[_i4++];
	          } else {
	            _i4 = _iterator4.next();
	            if (_i4.done) break;
	            _ref4 = _i4.value;
	          }
	
	          var instance = _ref4;
	
	          instance.$unmount && instance.$unmount($ctx);
	        }
	        $ctx.$macros._instances.remove(id);
	      }
	    };
	
	    iterator($el, $ctx);
	  },
	  destroy: function destroy($ctx) {
	    var keys = $ctx.$macros._instances.keys();
	    for (var key in keys) {
	      var instances = $ctx.$macros._instances.find(key);
	      for (var _iterator5 = instances, _isArray5 = Array.isArray(_iterator5), _i5 = 0, _iterator5 = _isArray5 ? _iterator5 : _iterator5[Symbol.iterator]();;) {
	        var _ref5;
	
	        if (_isArray5) {
	          if (_i5 >= _iterator5.length) break;
	          _ref5 = _iterator5[_i5++];
	        } else {
	          _i5 = _iterator5.next();
	          if (_i5.done) break;
	          _ref5 = _i5.value;
	        }
	
	        var instance = _ref5;
	
	        instance.$unmount && instance.$unmount($ctx);
	      }
	    }
	    $ctx.$macros._instances.clear();
	    $ctx.$macros._instances = null;
	    $ctx.$macros = null;
	  }
	});
	
	exports.default = macro;
	
	// install build-in
	
	macro('\\[?\\[\\[(\\S+)]]]?|\\{?\\{\\{(\\S+)}}}?', _bind2.default);

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _utils = __webpack_require__(3);
	
	var bind = function bind(_ref) {
	  var $exp = _ref.$exp;
	  var $update = _ref.$update;
	  var $scope = _ref.$scope;
	
	  var _deconstruct = (0, _utils.deconstruct)($exp);
	
	  var prop = _deconstruct.prop;
	  var watch = _deconstruct.watch;
	  var secure = _deconstruct.secure;
	
	  if (watch) {
	    return {
	      $mount: function $mount() {
	        $scope.$watch(prop, $update);
	      },
	      $unmount: function $unmount() {
	        $scope.$unwatch(prop, $update);
	      },
	      $iterator: function $iterator($text) {
	        return $text.replace($exp, function () {
	          var value = $scope.$get(prop);
	          return secure ? (0, _utils.secureHtml)(value) : value;
	        });
	      }
	    };
	  } else {
	    var value = $scope.$get(prop);
	    return {
	      $iterator: {
	        $exp: $exp,
	        $value: secure ? (0, _utils.secureHtml)(value) : value
	      }
	    };
	    //return {
	    //  $replace($text) {
	    //    return $text.replace($exp, function () {
	    //      return secure ? secureHtml(value) : value;
	    //    });
	    //  }
	    //};
	  }
	};
	
	exports.default = bind;

/***/ }
/******/ ]);
//# sourceMappingURL=highway.js.map