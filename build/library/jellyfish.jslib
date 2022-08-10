var jellyfish;
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
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
__webpack_require__.r(__webpack_exports__);
// @ts-ignore
mergeInto(LibraryManager.library, {
    showSupportedAPIs: function () {
        jellyfish.facebook.logSupportedAPIs();
    },
    showAd: function (adType) {
        var textDecoder = new TextDecoder("utf8");
        jellyfish.facebook.showAd(textDecoder.decode(adType));
    },
    preloadAd: function (adType, adId) {
        // @ts-ignore
        jellyfish.facebook.preloadAd(UTF8ToString(adType), UTF8ToString(adId));
        // @ts-ignore
        console.log(UTF8ToString(adType));
    }
});


jellyfish = __webpack_exports__;
/******/ })()
;