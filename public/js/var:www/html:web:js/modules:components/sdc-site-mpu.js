(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define('sdc-site-mpu',[], factory);
	else if(typeof exports === 'object')
		exports["sdc-site-mpu"] = factory();
	else
		root["sdc-site-mpu"] = factory();
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

	/* global window, document, setInterval, clearInterval */
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

	var _library = __webpack_require__(1);

	var library = _interopRequireWildcard(_library);

	var _slots = __webpack_require__(2);

	var slots = _interopRequireWildcard(_slots);

	var _slot = __webpack_require__(3);

	var slot = _interopRequireWildcard(_slot);

	/**
	* Initialises the component when passed an element
	*
	* @param {HTMLNode} rootElement The component dom node
	* @param {Object} options Any options passed to the component
	*/

	exports['default'] = function (rootElement, options) {
	  if (!rootElement) {
	    return;
	  }

	  var adSlot = {
	    id: null,
	    container: rootElement,
	    slot: null,
	    loaded: false,
	    responsive: true,
	    breakpoints: ['(max-width: 739px)', '(min-width: 740px) and (max-width: 999px)', '(min-width: 1000px)'],
	    lookup: {
	      mobile: 320,
	      tablet: 740,
	      desktop: 1000,
	      'default': 0
	    },
	    center: false,
	    tolerance: 1
	  };

	  function init() {
	    // allow the breakpoints and global targeting
	    // to be set externally to the module
	    if (options) {
	      if (options.targeting) {
	        adSlot.targeting = options.targeting;
	      }

	      if (options.breakpoints) {
	        adSlot.breakpoints = options.breakpoints;
	      }

	      if (options.lookup) {
	        adSlot.lookup = options.lookup;
	      }

	      if (options.centerAds) {
	        adSlot.center = options.centerAds;
	      }
	    }

	    slots.register(slot.create(adSlot));
	  }

	  library.load();

	  // defer initialisation until page has fully loaded
	  var readyStateCheckInterval = setInterval(function () {
	    if (window.googletag && document.readyState === 'complete') {
	      clearInterval(readyStateCheckInterval);
	      init();
	    }
	  }, 10);
	};

	module.exports = exports['default'];

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	/* global window, document */

	/**
	 * Load the googletag library
	 */
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports.load = load;

	function load() {
	  // if the library is already present then bail out
	  if (window.googletag) {
	    return;
	  }

	  // googletag needs to be registered as a global var
	  window.googletag = { cmd: [] };

	  // fetch the Google Publisher Tag (GPT) library
	  var gads = document.createElement('script');
	  gads.async = true;
	  gads.src = 'https://www.googletagservices.com/tag/js/gpt.js';
	  document.getElementsByTagName('head')[0].appendChild(gads);
	}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	/* global window, document, googletag */
	/* eslint no-use-before-define: ["error", { "functions": false }] */
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports.register = register;
	exports.loadSlots = loadSlots;

	var _slot = __webpack_require__(3);

	var _utilsViewport = __webpack_require__(6);

	/**
	 * Enables once all slots in the page have been registered
	 *
	 * @param {Object} adSlot Slot reference object
	 */

	function register(adSlot) {
	  window.sdc = window.sdc || {};
	  window.sdc.ads = window.sdc.ads || [];
	  window.sdc.ads.push(adSlot);

	  checkInstances(adSlot);
	}

	/**
	 * Enables once all slots in the page have been registered
	 *
	 * @param {Object} adSlot Slot reference object
	 */
	function checkInstances(adSlot) {
	  var instances = [].slice.call(document.querySelectorAll('[data-component-name=sdc-site-mpu]')).filter(function (instance) {
	    return instance.offsetWidth > 0;
	  });

	  if (window.sdc.ads.length < instances.length) {
	    return;
	  }

	  enableSlots(adSlot);
	}

	/**
	 * Enable googletag services ready for the slots
	 *
	 * @param {Object} adSlot Slot reference object
	 */
	function enableSlots(adSlot) {
	  googletag.cmd.push(function () {
	    googletag.pubads().setCentering(adSlot.center);
	    googletag.pubads().enableSingleRequest();
	    googletag.pubads().disableInitialLoad();
	    googletag.enableServices();

	    loadSlots();
	  });
	}

	/**
	 * Load the slots ready for rendering
	 */

	function loadSlots() {
	  var visibleSlots = window.sdc.ads.filter(function (ad) {
	    return (0, _utilsViewport.isInViewPort)(ad.container, ad.tolerance);
	  });

	  // render the visible ads
	  visibleSlots.forEach(function (ad) {
	    googletag.cmd.push(function () {
	      googletag.display(ad.id);
	    });
	  });

	  // refresh visible ads in one batch for SRA
	  googletag.cmd.push(function () {
	    googletag.pubads().refresh();
	  });

	  // lazy load any that aren't visible
	  window.sdc.ads.filter(function (ad) {
	    return visibleSlots.indexOf(ad) < 0;
	  }).map(function (ad) {
	    return (0, _slot.lazyLoad)(ad);
	  });
	}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	/* global window, googletag, setTimeout */
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports.create = create;
	exports.refresh = refresh;
	exports.lazyLoad = lazyLoad;

	var _utilsBreakpoint = __webpack_require__(4);

	var _utilsSlot = __webpack_require__(5);

	var _utilsViewport = __webpack_require__(6);

	/**
	 * Create and configure a new Google Tag Advert Slot
	 *
	 * @param {Object} adSlot Slot reference object
	 * @return {Object} data for advert configuration
	 */

	function create(adSlot) {
	  var configData = (0, _utilsSlot.getConfig)(adSlot.container);
	  var sizes = (0, _utilsBreakpoint.getSizeMapping)(configData.size, adSlot);
	  var defaultSize = (0, _utilsBreakpoint.getDefaultSize)(configData.size);
	  var targeting = (0, _utilsSlot.getTargeting)(adSlot, configData);
	  var tag = (0, _utilsSlot.getTag)(adSlot, configData);
	  var collapse = (0, _utilsSlot.getCollapse)(adSlot);

	  adSlot.tolerance = (0, _utilsSlot.getTolerance)(adSlot, configData);

	  // there's only one breakpoint so we don't need this to be responsive
	  if (sizes.length <= 1) {
	    adSlot.responsive = false;
	  }

	  googletag.cmd.push(function () {
	    (0, _utilsSlot.defineSlot)(adSlot, configData, tag, defaultSize, sizes, collapse, targeting);
	  });

	  return adSlot;
	}

	/**
	 * Refresh any visible slots
	 *
	 * @param {Object} adSlot Slot reference object
	 */

	function refresh(adSlot) {
	  if ((0, _utilsViewport.isInViewPort)(adSlot.container, adSlot.tolerance)) {
	    googletag.cmd.push(function () {
	      googletag.pubads().refresh([adSlot.slot]);
	      adSlot.container.setAttribute('data-slot-called', parseInt(adSlot.container.getAttribute('data-slot-called'), 10) + 1);
	      adSlot.loaded = true;
	    });
	  }
	}

	/**
	 * Load the ad when it becomes relevant
	 *
	 * @param {Object} adSlot Ad Slot reference object
	 */

	function lazyLoad(adSlot) {
	  if (adSlot.loaded) {
	    return;
	  }

	  refresh(adSlot);

	  setTimeout(function () {
	    window.requestAnimationFrame(function () {
	      lazyLoad(adSlot);
	    });
	  }, 500);
	}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	/* global window */
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports.getSizeMapping = getSizeMapping;
	exports.getDefaultSize = getDefaultSize;
	exports.listen = listen;

	var _slot = __webpack_require__(3);

	/**
	 * Returns list of sizes mapped to matching breakpoint sizes
	 *
	 * @param {Object} sizes Breakpoints/Sizes to check through
	 * @param {Object} adSlot Slot reference object
	 * @return {Object} Sizes mapped to breakpoint sizes
	 */

	function getSizeMapping(sizes, adSlot) {
	  var sizeMappings = [];

	  for (var item in sizes) {
	    if (item !== 'default') {
	      sizeMappings.unshift([[adSlot.lookup[item], 0], sizes[item]]);
	    }
	  }

	  return sizeMappings;
	}

	/**
	 * Returns the first size that matches the order of breakpoints
	 *
	 * @param {Object} sizes Breakpoints/Sizes to check through
	 * @return {Object|null} Size of the first matching breakpoint
	 */

	function getDefaultSize(sizes) {
	  var breakpoints = ['default', 'mobile', 'tablet', 'desktop'];

	  for (var i = 0; i < breakpoints.length; i++) {
	    if (sizes[breakpoints[i]]) {
	      return sizes[breakpoints[i]][0];
	    }
	  }

	  return null;
	}

	/**
	 * Listen for changes when media query breakpoints are fired
	 *
	 * @param {Object} adSlot Ad Slot reference object
	 * @return {Array} matchMedia objects
	 */

	function listen(adSlot) {
	  var queries = [];

	  // loop through our breakpoints list
	  adSlot.breakpoints.forEach(function (bp) {
	    var match = window.matchMedia(bp);
	    queries.push(match);

	    // call render event on mq match
	    match.addListener(function (mq) {
	      if (mq.matches) {
	        (0, _slot.refresh)(adSlot);
	      }
	    });
	  });

	  return queries;
	}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	/* global googletag */
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports.defineSlot = defineSlot;
	exports.getConfig = getConfig;
	exports.getTargeting = getTargeting;
	exports.getTag = getTag;
	exports.getQueryTagOverride = getQueryTagOverride;
	exports.getTolerance = getTolerance;
	exports.getCollapse = getCollapse;

	var _breakpoint = __webpack_require__(4);

	/**
	 * Define a slot for googletag
	 *
	 * @param {Object} adSlot Slot reference object
	 * @param {Object} configData Slot reference object
	 * @param {Object} tag Slot reference object
	 * @param {Object} defaultSize Slot reference object
	 * @param {Object} sizes Slot reference object
	 * @param {Object} collapse Slot reference object
	 * @param {Object} targeting Slot reference object
	 * @return {Object}
	 */

	function defineSlot(adSlot, configData, tag, defaultSize, sizes, collapse, targeting) {
	  var slot = googletag.defineSlot(tag, defaultSize, configData.id).addService(googletag.pubads()).defineSizeMapping(sizes).setCollapseEmptyDiv(collapse, collapse);

	  // set the targeting for the slot
	  Object.keys(targeting).forEach(function (target) {
	    slot.setTargeting(target, decodeURI(targeting[target]));
	  });

	  // set actual rendered size using the renderEnded callback
	  // this can be used to piggyback styling changes when adverts can be different sizes
	  // eg a single to double height mpu
	  googletag.pubads().addEventListener('slotRenderEnded', function (event) {
	    if (event.size && adSlot.container.parentNode.getAttribute('data-ad-format')) {
	      adSlot.container.parentNode.setAttribute('data-advert-rendered', [event.size[0], event.size[1]].join('x'));
	    }
	  });

	  // keep track of the slot we've created
	  adSlot.id = configData.id;
	  adSlot.slot = slot;
	  adSlot.container.setAttribute('data-slot-called', 0);

	  // monitor responsive breakpoints for changes
	  (0, _breakpoint.listen)(adSlot);

	  return adSlot;
	}

	/**
	 * Extract the configuration data from the component
	 *
	 * @param {HTMLNode} element The element to get the data from
	 * @return {Object}
	 */

	function getConfig(element) {
	  var config = element.getAttribute('data-config');
	  if (config === null) {
	    return;
	  }

	  return JSON.parse(config);
	}

	/**
	 * Extract targeting from attribute and fallback to config data if not provided
	 *
	 * @param {Object} adSlot Slot reference object
	 * @param {Object} configData Slot config object
	 * @return {Object}
	 */

	function getTargeting(adSlot, configData) {
	  var targeting = {};
	  var targetingData = adSlot.container.getAttribute('data-targeting');

	  if (targetingData) {
	    targeting = JSON.parse(targetingData);
	  } else if (configData.targeting) {
	    targeting = configData.targeting;
	  }

	  // use these values instead of those set in configData if they are set as direct data attributes
	  var targetingStrnativekey = adSlot.container.getAttribute('data-targeting-strnativekey');
	  var targetingPlatform = adSlot.container.getAttribute('data-targeting-platform');

	  if (targetingStrnativekey) {
	    targeting.strnativekey = targetingStrnativekey;
	  }

	  if (targetingPlatform) {
	    targeting.platform = targetingPlatform;
	  }

	  return targeting;
	}

	/**
	 * Get the tag for a slot
	 *
	 * @param {Object} adSlot Slot reference object
	 * @param {Object} configData Slot config object
	 * @return {String}
	 */

	function getTag(adSlot, configData) {

	  var queryOverrideTag = getQueryTagOverride();

	  if (queryOverrideTag) {
	    adSlot.container.setAttribute('data-tag', queryOverrideTag);
	  }

	  return adSlot.container.getAttribute('data-tag') || configData.tag;
	}

	/**
	 * Get sky media tag override if present
	 *
	 * @return {String}
	 */

	function getQueryTagOverride() {
	  var match = RegExp('[?&]' + 'adtagtest' + '=([^&]*)').exec(window.location.search);
	  return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
	}

	/**
	 * Get the tolerance for a slot
	 *
	 * @param {Object} adSlot Slot reference object
	 * @param {Object} configData Slot config object
	 * @return {String}
	 */

	function getTolerance(adSlot, configData) {
	  return parseFloat(adSlot.container.getAttribute('data-tolerance')) || configData.tolerance;
	}

	/**
	 * Get the ad to collapse by default if empty, but allow an override
	 *
	 * @param {Object} adSlot Slot reference object
	 * @return {Boolean}
	 */

	function getCollapse(adSlot) {
	  var collapse = adSlot.container.getAttribute('data-collapse') || true;
	  return collapse === true;
	}

/***/ }),
/* 6 */
/***/ (function(module, exports) {

	/* global window, document */

	/**
	 * Check whether an element is visible in the viewport
	 *
	 * Tolerance value represents how far in screen viewports from the top of the viewport to
	 * begin loading the advert. Any numerical value from 1 to 10 allowed, including decimals:
	 * 1 = 100%, the advert will begin loading at 1 viewport height from the top of the screen
	 * 1.5 = 150%, the advert will begin loading at 1.5 viewport heights from the top of the screen
	 * 2 = 200%, the advert will begin loading at 2 viewport heights from the top of the screen
	 *
	 * @param {Element} element Element to check visibility for
	 * @return {Boolean} Whether the element is visible
	 */
	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.isInViewPort = isInViewPort;

	function isInViewPort(element) {
	  var tolerance = arguments.length <= 1 || arguments[1] === undefined ? 1.5 : arguments[1];

	  if (!element) {
	    return;
	  }

	  var rect = element.getBoundingClientRect();
	  var viewportWidth = window.innerWidth || document.documentElement.clientWidth;
	  var viewportHeight = window.innerHeight || document.documentElement.clientHeight;

	  // return false if element is not visible or out of viewport top
	  if (rect.right < 0 || rect.bottom < 0 || rect.left > viewportWidth) {
	    return false;
	  }

	  // @note - use a fallback for window.innerHeight in IE8
	  // out of viewport bottom
	  if (viewportHeight * tolerance - rect.top < 0) {
	    return false;
	  }

	  // if it passes all that, it's visible
	  return true;
	}

/***/ })
/******/ ])
});
;
