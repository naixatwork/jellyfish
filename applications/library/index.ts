declare const jellyfish: any; // a global variable that should come from jellyfish template

function showSupportedAPIs(): void {
    jellyfish.facebook.logSupportedAPIs();
}

function showAd(): void {
    jellyfish.facebook.showAd();
}


// @ts-ignore
mergeInto(LibraryManager.library, {
    showSupportedAPIs,
    showAd
});