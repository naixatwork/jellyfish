import {IFacebookAd} from "./ad/ad.type";

const FACEBOOK_SERVICE_IDENTIFIERS = {
    facebookService: Symbol("facebookService"),
    preloadBehaviour: Symbol("preloadBehaviour"),
    showAdAsyncBehaviour: Symbol("showAdAsyncBehaviour"),
    loadBannerBehaviour: Symbol("loadBannerBehaviour"),
    hideBannerBehaviour: Symbol("hideBannerBehaviour"),
    FacebookSDK: Symbol("FacebookSDK"),
    adRewardedService: Symbol("adRewardedService"),
    loadNullBehaviour: Symbol("loadNullBehaviour"),
};

// https://developers.facebook.com/docs/games/instant-games/sdk/fbinstant7.1
interface IFBInstantSDK {
    initializeAsync(): Promise<any>;

    startGameAsync(): Promise<any>;

    setLoadingProgress(percentage: number): void;

    getSupportedAPIs(): string[];

    getInterstitialAdAsync(adId: string): Promise<IFacebookAd>;

    getRewardedVideoAsync(adId: string): Promise<IFacebookAd>;

    loadBannerAdAsync(adId: string): Promise<IFacebookAd>;

    hideBannerAdAsync(): Promise<void>;
}


export {IFBInstantSDK, FACEBOOK_SERVICE_IDENTIFIERS};