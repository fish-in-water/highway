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

	window.Highway = _highway2.default; //import "babel-polyfill";
	exports.default = _highway2.default;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _view = __webpack_require__(3);

	var _view2 = _interopRequireDefault(_view);

	var _component = __webpack_require__(5);

	var _component2 = _interopRequireDefault(_component);

	var _service = __webpack_require__(6);

	var _service2 = _interopRequireDefault(_service);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var installServices = function installServices() {
	  var scope = __webpack_require__(7);

	  (0, _service2.default)('$scope', scope.default);
	};

	installServices();

	var highway = Object.assign(_view2.default, {
	  component: _component2.default,
	  service: _service2.default
	});

	exports.default = highway;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _utils = __webpack_require__(4);

	var _component = __webpack_require__(5);

	var _component2 = _interopRequireDefault(_component);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var privates = {
	  render: function render($ctx) {
	    $ctx.$willmount();

	    _component2.default.compile($ctx);

	    $ctx.$didmount();
	  },
	  destroy: function destroy() {}
	};

	var View = function () {
	  function View(options) {
	    _classCallCheck(this, View);

	    Object.assign(this, options);
	    privates.render(this);
	  }

	  _createClass(View, [{
	    key: '$willmount',
	    value: function $willmount($ctx) {}
	  }, {
	    key: '$didmount',
	    value: function $didmount($ctx) {}
	  }, {
	    key: '$willunmount',
	    value: function $willunmount($ctx) {}
	  }, {
	    key: '$didunmount',
	    value: function $didunmount($ctx) {}
	  }, {
	    key: '$destroy',
	    value: function $destroy() {
	      privates.destroy.call(this);
	    }
	  }]);

	  return View;
	}();

	View.extend = _utils.extend;
	exports.default = View;

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	exports.extend = extend;

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

	  Object.assign(Child.prototype, options);
	  return Child;
	}

	var MapList = exports.MapList = function () {
	  function MapList() {
	    _classCallCheck(this, MapList);

	    this.data = {};
	  }

	  _createClass(MapList, [{
	    key: "add",
	    value: function add(key, value) {
	      var _this2 = this;

	      var data = this.data;
	      var list = data[key] || (data[key] = []);
	      list.push(value);
	      return function () {
	        _this2.del(key, value);
	      };
	    }
	  }, {
	    key: "del",
	    value: function del(key, value) {
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
	    key: "find",
	    value: function find(key, value) {
	      var data = this.data;
	      var list = data[key] || [];
	      var result = [];
	      var _iteratorNormalCompletion = true;
	      var _didIteratorError = false;
	      var _iteratorError = undefined;

	      try {
	        for (var _iterator = list[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	          var v = _step.value;

	          if (value == null || v === value) {
	            result.push(tmp);
	          }
	        }
	      } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion && _iterator.return) {
	            _iterator.return();
	          }
	        } finally {
	          if (_didIteratorError) {
	            throw _iteratorError;
	          }
	        }
	      }

	      return result;
	    }
	  }]);

	  return MapList;
	}();

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var components = {};

	var component = function component(name, View) {
	  components[name.toLowerCase()] = View;
	};

	var privates = {};

	Object.assign(component, {
	  compile: function compile($ctx) {
	    $ctx.$el = $ctx.$el || $('<div></div>');
	    $ctx.$template && $ctx.$el.html($($ctx.$template));
	    $ctx.$components = Object.assign({}, components, $ctx.$components);
	    var iterator = function iterator(node, $ctx) {
	      if (node == null) {
	        return;
	      }

	      $ctx.$el.$children = $ctx.$el.$children || [];
	      $ctx.$children = $ctx.$children || [];

	      var _iteratorNormalCompletion = true;
	      var _didIteratorError = false;
	      var _iteratorError = undefined;

	      try {
	        for (var _iterator = Array.from(node.childNodes)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	          var childNode = _step.value;

	          if (childNode && childNode.nodeType === 1 && $ctx.$components[childNode.tagName.toLowerCase()]) {
	            var View = $ctx.$components[childNode.tagName.toLowerCase()];
	            var instance = new View();
	            $(childNode).replaceWith(instance.$el);
	            $ctx.$children.push(instance);
	          } else {
	            $ctx.$el.$children.push($(childNode));
	            iterator(childNode, $ctx);
	          }
	        }
	      } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion && _iterator.return) {
	            _iterator.return();
	          }
	        } finally {
	          if (_didIteratorError) {
	            throw _iteratorError;
	          }
	        }
	      }
	    };

	    iterator($ctx.$el[0], $ctx);
	  },
	  uncompile: function uncompile($ctx) {
	    $ctx.$el.$children = null;
	    $ctx.$children = null;
	  }
	});

	exports.default = component;

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var services = {};

	var service = function service(name, _service) {
	  services[name] = _service;
	};

	var privates = {
	  compile: function compile($ctx) {
	    $ctx.$services = Object.assign({}, services, $ctx.$services);
	  },
	  uncompile: function uncompile($ctx) {}
	};

	Object.assign(service, {
	  compile: function compile($ctx) {
	    privates.compile($ctx);
	  },
	  uncompile: function uncompile($ctx) {
	    privates.uncompile($ctx);
	  }
	});

	exports.default = service;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _utils = __webpack_require__(4);

	var scope = function scope($ctx) {
	  var $scope = $ctx.$scope || ($ctx.$scope = {});
	  var watchers = new _utils.MapList();
	  return Object.assign($scope, {
	    $get: function $get(prop) {
	      return $scope[prop] || '';
	    },
	    $set: function $set(prop, newVal) {},
	    $watch: function $watch(prop, handler) {
	      return watchers.add(prop, handler);
	    },
	    $unwatch: function $unwatch(prop, hanlder) {
	      return watchers.del(prop, handler);
	    },
	    $fire: function $fire(prop, newVal, oldVal) {
	      var handlers = watchers.find(prop);
	      var _iteratorNormalCompletion = true;
	      var _didIteratorError = false;
	      var _iteratorError = undefined;

	      try {
	        for (var _iterator = handlers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	          var _handler = _step.value;

	          handlers(newVal, oldVal);
	        }
	      } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion && _iterator.return) {
	            _iterator.return();
	          }
	        } finally {
	          if (_didIteratorError) {
	            throw _iteratorError;
	          }
	        }
	      }
	    },
	    $willunmount: function $willunmount($ctx) {
	      watchers = null;
	    }
	  });
	};

	exports.default = scope;

/***/ }
/******/ ]);