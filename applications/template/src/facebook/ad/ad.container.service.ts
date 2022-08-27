import {injectable} from "inversify";
import {AdInterstitialService} from "./ad.interstitial.service";
import {AdBannerService} from "./ad.banner.service";

export type adTypes = "interstitial" | "banner" | "reward" | "rewardInterstitial";

@injectable()
export class AdContainerService {
    constructor(
        private readonly adInterstitialService: AdInterstitialService,
        private readonly adBannerService: AdBannerService
    ) {
    }

    public preloadAd(adType: adTypes, adId: string): void {
        if (adType === "interstitial") {
            this.adInterstitialService.preloadAd(adId);
        } else if (adType === "reward") {
            // this.adInterstitialService.preloadAd(adId);
        } else if (adType === "rewardInterstitial") {
            // this.adInterstitialService.preloadAd(adId);
        } else if (adType === "banner") {
            this.adBannerService.preloadAd(adId);
        } else {
            console.error(`[AdContainerService]: ${adType} adType cannot be preloaded`);
        }
    }

    public showAd(adType: adTypes): void {
        if (adType === "interstitial") {
            this.adInterstitialService.showAd();
        } else if (adType === "reward") {
            // this.adInterstitialService.showAd();
        } else if (adType === "rewardInterstitial") {
            // this.adInterstitialService.showAd();
        } else if (adType === "banner") {
            this.adBannerService.showAd();
        } else {
            console.error(`[AdContainerService]: ${adType} adType cannot be shown`);
        }
    }

    public hideAd(adType: adTypes): void {
        if (adType === "interstitial") {
            this.adInterstitialService.hideAd();
        } else if (adType === "reward") {
            // this.adInterstitialService.hideAd();
        } else if (adType === "rewardInterstitial") {
            // this.adInterstitialService.hideAd();
        } else if (adType === "banner") {
            this.adBannerService.hideAd();
        } else {
            console.error(`[AdContainerService]: ${adType} adType cannot be hidden`);
        }
    }
}