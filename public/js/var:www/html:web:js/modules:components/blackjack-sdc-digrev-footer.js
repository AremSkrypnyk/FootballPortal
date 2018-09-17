(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define('blackjack-sdc-digrev-footer',[], factory);
	else if(typeof exports === 'object')
		exports["blackjack-sdc-digrev-footer"] = factory();
	else
		root["blackjack-sdc-digrev-footer"] = factory();
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

	// BLACKJACK-FILTER-MENU
	// ===================
	// INITIALISE COMPONENT
	// @param rootElement {htmlNode} root dom element of component
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	exports['default'] = function (rootElement, options) {

	  var accordian = {

	    offset: 0,

	    speed: 333,
	    /**
	    * Initiate the accordion module
	    * @param  {Node}  element  Dom node of module root
	    * @param  {Object} data Object of module paramters set from HTML data-attributes
	    */

	    init: function init() {

	      this.rootElement = rootElement;
	      this._getElements();
	      this._setUpElements();

	      // remove active touch style when user moves off it
	      this.rootElement.ontouchmove = this._removeActiveStyle;
	    },

	    _removeActiveStyle: function _removeActiveStyle(e) {

	      if (e.target.nodeName === 'A') {
	        e.target.classList.add('no-default-active');
	        e.target.ontouchend = (function () {
	          this.classList.remove('no-default-active');
	          this.ontouchend = null;
	        }).bind(e.target);
	      }
	    },

	    toggle: true,

	    /**
	     * Grab html elements
	     */
	    _getElements: function _getElements() {

	      this.items = this.rootElement.querySelectorAll('.accordian__item');
	      this.accordianElement = this.rootElement.querySelector('[data-role="accordian-body"]');
	    },

	    /**
	     * Set up initial html attributes
	     */
	    _setUpElements: function _setUpElements() {

	      var self = this;

	      for (var i = -1; ++i < this.items.length;) {

	        var item = this.items[i];

	        //set initial index and offset values
	        item.setAttribute('data-index', i);
	        item.setAttribute('data-offset', 0);

	        //add click action to item header if theres a slidedown inside
	        if (item.querySelector('.accordian__item-content-frame')) {
	          item.querySelector('.accordian__item-head').addEventListener('click', function (event) {

	            self._clickActions(event, this.parentNode, this);
	          }, false);
	        }
	      }
	    },

	    /**
	     * Set the offset values that apply to elements below the clicked item
	     * @param {Number} index     Index of clicked item
	     * @param {Number} direction 1 is slide down, -1 is slide up
	     * @param {Number} amount    Height of element to slide up or down
	     */
	    _setOffsets: function _setOffsets(index, direction, amount) {

	      var items = this.items;
	      var currentOffset;
	      var item;
	      var i;

	      for (i = items.length - 1; i > index; i--) {

	        item = items[i];

	        currentOffset = parseInt(item.dataset.offset, 10);
	        currentOffset += direction === 1 ? amount : -amount;

	        item.style.cssText = ['-webkit-transform:translateY(' + currentOffset + 'px);', '-moz-transform:translateY(' + currentOffset + 'px);', '-ms-transform:translateY(' + currentOffset + 'px);', 'transform:translateY(' + currentOffset + 'px);'].join('');

	        item.setAttribute('data-offset', currentOffset);
	      }

	      //set total offset in parent component using padding bottom
	      if (direction === 1) {

	        this.offset += amount;
	        this.accordianElement.style.paddingBottom = this.offset + 'px';
	      } else {

	        this.offset -= amount;

	        setTimeout((function () {

	          this.accordianElement.style.paddingBottom = this.offset + 'px';
	        }).bind(this), this.speed);
	      }
	    },

	    /**
	     * Click function that applies to accordian head
	     * @param  {Node} element Dom node of clicked element
	     * @param  {Object} event   Event object
	     */
	    _clickActions: function _clickActions(event, element, link) {

	      event.preventDefault();

	      link.style.pointerEvents = "none";

	      setTimeout(function () {
	        link.style.pointerEvents = "all";
	      }, 333);

	      var content = element.querySelector('.accordian__item-content');

	      if (!content) {
	        return;
	      }

	      var contentHeight = content.offsetHeight;
	      var index = parseInt(element.getAttribute('data-index'), 10);

	      if (element.classList.contains('accordian__item--open')) {

	        content.style.cssText = '';

	        setTimeout((function () {

	          this.classList.remove('accordian__item--open');
	        }).bind(element), this.speed);

	        this._setOffsets(index, -1, contentHeight);
	      } else {
	        // toggle rather than open all
	        if (this.toggle) {
	          this._closeAll();
	        }

	        content.style.cssText = '-webkit-transform:translateY(0);-moz-transform:translateY(0);-ms-transform:translateY(0);transform:translateY(0)';
	        element.classList.add('accordian__item--open');
	        this._setOffsets(index, 1, contentHeight);
	      }
	    },

	    _closeAll: function _closeAll() {

	      // rest all offsets to zero
	      var length = this.items.length;
	      var i;

	      this.offset = 0;

	      for (i = 0; i < length; i++) {

	        var item = this.items[i];
	        var content = item.querySelector('.accordian__item-content');

	        item.setAttribute('data-offset', 0);
	        item.classList.remove('accordian__item--open');
	        item.style.cssText = '';

	        if (content) {
	          content.style.cssText = '';
	        }
	      }
	    }

	  };
	  // init accordian
	  accordian.init();
	};

	module.exports = exports['default'];
	// @param options {object} object of optional parameters for component

/***/ })
/******/ ])
});
;
