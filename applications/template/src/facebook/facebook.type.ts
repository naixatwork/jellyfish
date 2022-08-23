import {IFacebookAd} from "./ad/ad.type";

interface IFBInstantSDK {
    initializeAsync(): Promise<any>;

    startGameAsync(): Promise<any>;

    setLoadingProgress(percentage: number): void;

    getSupportedAPIs(): string[];

    getInterstitialAdAsync(adId: string): Promise<IFacebookAd>;

    loadBannerAdAsync(adId: string): Promise<IFacebookAd>;

    hideBannerAdAsync(): void;
}


const FACEBOOK_SERVICE_IDENTIFIERS = {
    facebookService: Symbol("facebookService"),
    preloadInterstitialBehaviour: Symbol("preloadInterstitialBehaviour"),
    showAdInterstitialBehaviour: Symbol("showAdInterstitialBehaviour"),
    loadBannerBehaviour: Symbol("loadBannerBehaviour"),
    hideBannerBehaviour: Symbol("hideBannerBehaviour"),
    fbInstantSDK: Symbol("fbInstantSDK"),
};


export {IFBInstantSDK, FACEBOOK_SERVICE_IDENTIFIERS};