import {inject, injectable} from "inversify";
import {AdInterstitialService} from "./ad.interstitial.service";
import {AdBannerService} from "./ad.banner.service";
import {FACEBOOK_SERVICE_IDENTIFIERS} from "../facebook.type";
import {AdRewardedService} from "./ad.rewarded.service";
import {AdRewardedInterstitialService} from "./ad.rewardedInterstitial.service";
import {AdBaseService} from "./ad.base.service";

export type adTypes = "interstitial" | "banner" | "rewarded" | "rewardedInterstitial";

@injectable()
export class AdContainerService {
    private readonly ads: Record<adTypes, AdBaseService> = {
        "banner": this.adBannerService,
        "interstitial": this.adInterstitialService,
        "rewarded": this.adRewardedService,
        "rewardedInterstitial": this.adRewardedInterstitialService
    };

    constructor(
        private readonly adInterstitialService: AdInterstitialService,
        private readonly adBannerService: AdBannerService,
        @inject(FACEBOOK_SERVICE_IDENTIFIERS.adRewardedService) private readonly adRewardedService: AdRewardedService,
        @inject(FACEBOOK_SERVICE_IDENTIFIERS.adRewardedInterstitialService) private readonly adRewardedInterstitialService: AdRewardedInterstitialService
    ) {
    }

    private doesAdTypeExistInAds(adType: adTypes): boolean {
        const showErrorAndReturnFalseIfAdTypeDoesntExist = () => {
            console.error(`[AdContainerService]: ${adType} adType cannot be preloaded`);
            return false;
        };

        return this.ads[adType] instanceof AdBaseService || showErrorAndReturnFalseIfAdTypeDoesntExist();
    }

    public loadAd(adType: adTypes, adId: string): void {
        if (this.doesAdTypeExistInAds(adType)) {
            this.ads[adType].loadAd(adId).then();
        }
    }

    public showAd(adType: adTypes): void {
        if (this.doesAdTypeExistInAds(adType)) {
            this.ads[adType].showAd();
        }
    }

    public hideAd(adType: adTypes): void {
        if (this.doesAdTypeExistInAds(adType)) {
            this.ads[adType].hideAd();
        }
    }
}