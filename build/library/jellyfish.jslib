var jellyfish;
/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
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
        jellyfish.facebook.preloadAd(UTF8ToString(adType), UTF8ToString(adId));
    }
});

jellyfish = __webpack_exports__;
/******/ })()
;