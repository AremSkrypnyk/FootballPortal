(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define('sdc-site-pub-sub',[], factory);
	else if(typeof exports === 'object')
		exports["sdc-site-pub-sub"] = factory();
	else
		root["sdc-site-pub-sub"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	__webpack_require__.p = "/js/modules/components";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

	/* global console */
	/* eslint no-console: ["error", {allow: ["debug"]}] */

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var namespace = 'pubSub';

	/**
	* Stateful pub sub manager
	*
	*/

	var SdcSitePubSub = (function () {
	  /**
	   * @param {object} root a root to attach the instance to
	   */

	  function SdcSitePubSub(root) {
	    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	    _classCallCheck(this, SdcSitePubSub);

	    if (!root) {
	      throw new Error('You must supply a root to encapsulate the pub sub manager');
	    }

	    root[namespace] = this;
	    this.eventSubscribers = {};
	    this.options = options;
	  }

	  /**
	   * static factory method
	   * @param {object} root a root to attach the instance to
	   */

	  _createClass(SdcSitePubSub, [{
	    key: 'publish',

	    /**
	     * Triggers event
	     * @param {string} name the event name
	     * @param {object} context optional context around the firing of the event
	     */
	    value: function publish(name) {
	      var context = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	      if (!this.eventSubscribers[name]) {
	        return;
	      }

	      this.options.debugMode && console.debug('[' + namespace + '] publishing ' + name, context);

	      this.eventSubscribers[name].forEach(function (subscriber) {
	        return subscriber(context);
	      });
	    }

	    /**
	     * Attaches `callback` to event, `callback` will be invoked every time
	     * a `name` event is published
	     * @param {string} name
	     * @param {function} callback
	     */
	  }, {
	    key: 'subscribe',
	    value: function subscribe(name, callback) {
	      if (typeof callback !== 'function') {
	        throw new Error('You must supply a valid callback');
	      }

	      this.options.debugMode && console.debug('[' + namespace + '] subscribing to ' + name, callback);

	      if (!this.eventSubscribers[name]) {
	        this.eventSubscribers[name] = [];
	      }

	      this.eventSubscribers[name].push(callback);
	    }
	  }], [{
	    key: 'init',
	    value: function init(root) {
	      var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	      return new this(root, options);
	    }
	  }]);

	  return SdcSitePubSub;
	})();

	exports['default'] = SdcSitePubSub;
	module.exports = exports['default'];

/***/ })
/******/ ])
});
;
