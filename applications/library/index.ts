declare const jellyfish: any; // a global variable that should come from jellyfish template

function showSupportedAPIs(): void {
    jellyfish.facebook.logSupportedAPIs();
}

function ShowAd(): void {
    jellyfish.facebook.showAd();
}

function changeAd(adId: string): void {
    const newAdStrategy = jellyfish.interstitialAd(adId);
    jellyfish.facebook.setAdStrategy(newAdStrategy);
    jellyfish.facebook.showAd();
}


// @ts-ignore
mergeInto(LibraryManager.library, {
    showSupportedAPIs,
    ShowAd,
    changeAd
});