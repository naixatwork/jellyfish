var jellyfish;
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it uses a non-standard name for the exports (exports).
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
// @ts-ignore
mergeInto(LibraryManager.library, {
    showSupportedAPIs: function () {
        jellyfish.facebook.logSupportedAPIs();
    },
    showAd: function (adType) {
        // @ts-ignore
        jellyfish.facebook.showAd(UTF8ToString(adType));
    },
    preloadAd: function (adType, adId) {
        // @ts-ignore
        jellyfish.facebook.loadAd(UTF8ToString(adType), UTF8ToString(adId));
    }
});

})();

jellyfish = __webpack_exports__;
/******/ })()
;