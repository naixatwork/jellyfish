import {inject, injectable} from "inversify";
import {AdInterstitialService} from "./ad.interstitial.service";
import {AdBannerService} from "./ad.banner.service";
import {FACEBOOK_SERVICE_IDENTIFIERS} from "../facebook.type";
import {AdRewardedService} from "./ad.rewarded.service";
import {AdRewardedInterstitialService} from "./ad.rewardedInterstitial.service";

export type adTypes = "interstitial" | "banner" | "rewarded" | "rewardedInterstitial";

@injectable()
export class AdContainerService {
    constructor(
        private readonly adInterstitialService: AdInterstitialService,
        private readonly adBannerService: AdBannerService,
        @inject(FACEBOOK_SERVICE_IDENTIFIERS.adRewardedService) private readonly adRewardedService: AdRewardedService,
        @inject(FACEBOOK_SERVICE_IDENTIFIERS.adRewardedInterstitialService) private readonly adRewardedInterstitialService: AdRewardedInterstitialService
    ) {
    }

    public loadAd(adType: adTypes, adId: string): void {
        if (adType === "interstitial") {
            this.adInterstitialService.loadAd(adId);
        } else if (adType === "rewarded") {
            this.adRewardedService.loadAd(adId);
        } else if (adType === "rewardedInterstitial") {
            this.adRewardedInterstitialService.loadAd(adId);
        } else if (adType === "banner") {
            this.adBannerService.loadAd(adId);
        } else {
            console.error(`[AdContainerService]: ${adType} adType cannot be preloaded`);
        }
    }

    public showAd(adType: adTypes): void {
        if (adType === "interstitial") {
            this.adInterstitialService.showAd();
        } else if (adType === "rewarded") {
            this.adRewardedService.showAd();
        } else if (adType === "rewardedInterstitial") {
            this.adRewardedInterstitialService.showAd();
        } else if (adType === "banner") {
            this.adBannerService.showAd();
        } else {
            console.error(`[AdContainerService]: ${adType} adType cannot be shown`);
        }
    }

    public hideAd(adType: adTypes): void {
        if (adType === "interstitial") {
            this.adInterstitialService.hideAd();
        } else if (adType === "rewarded") {
            this.adRewardedService.hideAd();
        } else if (adType === "rewardedInterstitial") {
            this.adRewardedInterstitialService.hideAd();
        } else if (adType === "banner") {
            this.adBannerService.hideAd();
        } else {
            console.error(`[AdContainerService]: ${adType} adType cannot be hidden`);
        }
    }
}