import {injectable} from "inversify";
import {AdInterstitialService} from "./ad.interstitial.service";

export type adTypes = "interstitial" | "banner" | "reward" | "rewardInterstitial";

@injectable()
export class AdContainerService {
    constructor(
        private readonly adInterstitialService: AdInterstitialService
    ) {
    }

    public preloadAd(adType: adTypes, adId: string): void {
        if (adType === "interstitial") {
            this.adInterstitialService.preloadAd(adId);
        } else if (adType === "reward") {
            this.adInterstitialService.preloadAd(adId);
        } else if (adType === "rewardInterstitial") {
            this.adInterstitialService.preloadAd(adId);
        } else if (adType === "banner") {
            this.adInterstitialService.preloadAd(adId);
        } else {
            console.error(`[AdContainerService]: ${adType} adType cannot be handled`);
        }
    }

    public showAd(adType: adTypes): void {
        if (adType === "interstitial") {
            this.adInterstitialService.showAd();
        } else if (adType === "reward") {
            this.adInterstitialService.showAd();
        } else if (adType === "rewardInterstitial") {
            this.adInterstitialService.showAd();
        } else if (adType === "banner") {
            this.adInterstitialService.showAd();
        } else {
            console.error(`[AdContainerService]: ${adType} adType cannot be handled`);
        }
    }
}