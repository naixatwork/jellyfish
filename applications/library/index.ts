import {adTypes} from "../template/src/facebook/ads/ad.container";

declare const jellyfish: any; // a global variable that should come from jellyfish template


// @ts-ignore
mergeInto(LibraryManager.library, {
    showSupportedAPIs: (): void => {
        jellyfish.facebook.logSupportedAPIs();
    },
    showAd: (adType: BufferSource): void => {
        const textDecoder = new TextDecoder("utf8");
        jellyfish.facebook.showAd(textDecoder.decode(adType));
    },
    preloadAd: (adType: BufferSource, adId: BufferSource): void => {
        // @ts-ignore
        jellyfish.facebook.preloadAd(UTF8ToString(adType), UTF8ToString(adId));

        // @ts-ignore
        console.log(UTF8ToString(adType));
    }
});