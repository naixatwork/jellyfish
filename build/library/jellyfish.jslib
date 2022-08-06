var jellyfish;
/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
function showSupportedAPIs() {
    jellyfish.facebook.logSupportedAPIs();
}
function showAd() {
    jellyfish.facebook.showAd();
}
function changeAd(adId) {
    var newAdStrategy = jellyfish.interstitialAd(adId);
    jellyfish.facebook.setAdStrategy(newAdStrategy);
    jellyfish.facebook.showAd();
}
// @ts-ignore
mergeInto(LibraryManager.library, {
    showSupportedAPIs: showSupportedAPIs,
    showAd: showAd,
    changeAd: changeAd
});

jellyfish = __webpack_exports__;
/******/ })()
;