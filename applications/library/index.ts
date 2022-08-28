import {BufferSource} from "stream/web";

declare const jellyfish: any; // a global variable that should come from jellyfish template


// @ts-ignore
mergeInto(LibraryManager.library, {
    showSupportedAPIs: (): void => {
        jellyfish.facebook.logSupportedAPIs();
    },
    showAd: (adType: BufferSource): void => {
        // @ts-ignore
        jellyfish.facebook.showAd(UTF8ToString(adType));
    },
    preloadAd: (adType: BufferSource, adId: BufferSource): void => {
        // @ts-ignore
        jellyfish.facebook.loadAd(UTF8ToString(adType), UTF8ToString(adId));
    }
});