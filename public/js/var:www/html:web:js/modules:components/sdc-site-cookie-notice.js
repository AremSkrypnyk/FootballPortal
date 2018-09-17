(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define('sdc-site-cookie-notice',[], factory);
	else if(typeof exports === 'object')
		exports["sdc-site-cookie-notice"] = factory();
	else
		root["sdc-site-cookie-notice"] = factory();
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
/***/ (function(module, exports, __webpack_require__) {

	/**
	* Initialises the component when passed an element
	*
	* @param {HTMLNode} rootElement The component dom node
	*/
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

	var _utilsCookies = __webpack_require__(1);

	var cookies = _interopRequireWildcard(_utilsCookies);

	exports['default'] = function (rootElement, options) {
	  if (!rootElement) {
	    return;
	  }

	  var name = 'eucd';
	  if (options && options.cookieName) {
	    name = options.cookieName;
	  }

	  function init() {
	    if (cookies.hasNoticeViewedCookie(name)) {
	      return;
	    }

	    var closeButton = rootElement.querySelector('.sdc-site-cookie-notice__close');
	    closeButton.addEventListener('click', function (e) {
	      e.preventDefault();
	      cookies.handleCookieCloseClick(rootElement, name);
	    });
	  }

	  init(rootElement);
	};

	module.exports = exports['default'];

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	
	/**
	 * Handles when cookie notice close button is clicked
	 *
	 * @param {String} element
	 */
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports.handleCookieCloseClick = handleCookieCloseClick;
	exports.setNoticeViewedCookie = setNoticeViewedCookie;
	exports.hideCookieNotice = hideCookieNotice;
	exports.hasNoticeViewedCookie = hasNoticeViewedCookie;

	function handleCookieCloseClick(element, name) {
	  setNoticeViewedCookie(name);
	  hideCookieNotice(element);
	}

	/**
	 * Sets a cookie to indicate notice has been viewed for ~5 years
	 */

	function setNoticeViewedCookie(name) {
	  document.cookie = name + '=0;path=/;expires=' + new Date(+new Date() + 157785e6).toUTCString();
	}

	/**
	 * Applies a class to hide the passed element
	 *
	 * @param {String} element
	 */

	function hideCookieNotice(element) {
	  element.className += ' sdc-site-cookie-notice--hidden';
	}

	/**
	 * Checks if the cookie notice is set
	 *
	 * @return {Boolean}
	 */

	function hasNoticeViewedCookie(name) {
	  return document.cookie.search(name + '=0') !== -1;
	}

/***/ })
/******/ ])
});
;
