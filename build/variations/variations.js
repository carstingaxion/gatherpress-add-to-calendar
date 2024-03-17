/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "@wordpress/blocks":
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
/***/ ((module) => {

module.exports = window["wp"]["blocks"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["i18n"];

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!***************************!*\
  !*** ./src/variations.js ***!
  \***************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/**
 * WordPress dependencies
 */



/**
 * Internal dependencies
 */
const GPIB = 'gatherpress-add-to-calendar';
const GPIB_CLASS_NAME = 'gp-add-to-calendar';
const GPIB_VARIATION_ATTRIBUTES = {
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Add to calendar', 'gatherpress') + ' (v2)',
  description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Allows a user to add an event to their preferred calendar.', 'gatherpress'),
  category: 'gatherpress',
  icon: 'nametag'
};
const GPIB_BUTTON_ATTRIBUTES = {
  tagName: 'button',
  // By setting this to 'button', instead of 'a', we can completely prevent the LinkControl getting rendered into the Toolbar.
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Allows you to add an event to your preferred calendar.', 'gatherpress'),
  text: '📅 ' + (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Add to Calendar', 'gatherpress') + ' (v2)',
  className: GPIB_CLASS_NAME
};

/**
 * 
 * 
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-variations/
 */
(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockVariation)('core/button', {
  ...GPIB_VARIATION_ATTRIBUTES,
  name: GPIB,
  isActive: ['namespace', 'title'],
  // 'className' can be a string of multiple classes, e.g. when using block styles, so avoid them over here. The 'title' attibute however is unique to our variation and non-editable by the editor.
  // @source https://github.com/WordPress/gutenberg/issues/41303#issuecomment-1760985709 
  // isActive: ({ className }) => {
  // 	return (
  // 		className.includes(GROUP_CARD_VARIATION) // check if className contains GROUP_CARD_VARIATION and not equals. incase you add additional css classes it will still work
  // 	);
  // },
  attributes: {
    ...GPIB_BUTTON_ATTRIBUTES
  },
  scope: ['inserter', 'transform', 'block'],
  // Defaults to 'block' and 'inserter'.
  example: {}
});

/**
 * A Trap block, that looks like a single button, hohoho.
 *  
 * This block-variation is only useful, because a user can pick the block directly from the inserter or the left sidebar.
 * 
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-variations/
 */
(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockVariation)('core/buttons', {
  ...GPIB_VARIATION_ATTRIBUTES,
  name: 'pseudo-' + GPIB,
  // isActive: [ 'namespace', 'title' ], // This is not used/disabled by purpose.
  innerBlocks: [['core/button', {
    ...GPIB_BUTTON_ATTRIBUTES
  }]],
  example: {
    innerBlocks: [{
      name: 'core/button',
      attributes: {
        ...GPIB_BUTTON_ATTRIBUTES
      }
    }]
  }
});
})();

/******/ })()
;
//# sourceMappingURL=variations.js.map