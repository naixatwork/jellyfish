import {IAd} from "./ad/ad.class";

interface IFBInstantSDK {
    initializeAsync(): Promise<any>;

    startGameAsync(): Promise<any>;

    setLoadingProgress(percentage: number): void;

    getSupportedAPIs(): string[];

    getInterstitialAdAsync(adId: string): Promise<IAd>;

    loadBannerAdAsync(adId: string): Promise<IAd>;

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


export {IAd, IFBInstantSDK, FACEBOOK_SERVICE_IDENTIFIERS};