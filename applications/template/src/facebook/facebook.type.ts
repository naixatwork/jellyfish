import {IFacebookAd} from "./ad/ad.type";

// https://developers.facebook.com/docs/games/instant-games/sdk/fbinstant7.1
interface IFBInstantSDK {
    initializeAsync(): Promise<any>;

    startGameAsync(): Promise<any>;

    setLoadingProgress(percentage: number): void;

    getSupportedAPIs(): string[];

    getInterstitialAdAsync(adId: string): Promise<IFacebookAd>;

    loadBannerAdAsync(adId: string): Promise<IFacebookAd>;

    hideBannerAdAsync(): Promise<void>;
}


const FACEBOOK_SERVICE_IDENTIFIERS = {
    facebookService: Symbol("facebookService"),
    preloadBehaviour: Symbol("preloadBehaviour"),
    showAdInterstitialBehaviour: Symbol("showAdInterstitialBehaviour"),
    loadBannerBehaviour: Symbol("loadBannerBehaviour"),
    hideBannerBehaviour: Symbol("hideBannerBehaviour"),
    FacebookSDK: Symbol("FacebookSDK"),
    adRewardedService: Symbol("adRewardedService"),
};


export {IFBInstantSDK, FACEBOOK_SERVICE_IDENTIFIERS};