var jellyfish;
/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
function showSupportedAPIs() {
    jellyfish.facebook.logSupportedAPIs();
}
function ShowAd() {
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
    ShowAd: ShowAd,
    changeAd: changeAd
});

jellyfish = __webpack_exports__;
/******/ })()
;