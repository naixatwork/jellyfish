var jellyfish;
/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
function showSupportedAPIs() {
    jellyfish.facebook.logSupportedAPIs();
}
function showAd() {
    jellyfish.facebook.showAd();
}
// @ts-ignore
mergeInto(LibraryManager.library, {
    showSupportedAPIs: showSupportedAPIs,
    showAd: showAd
});

jellyfish = __webpack_exports__;
/******/ })()
;