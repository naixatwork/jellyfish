import {AdStrategy} from "./ad.type";
import {InterstitialAdStrategy} from "./ad.Interstitial";
import Facebook from "../facebook";

export type adTypes = "interstitial" | "banner" | "reward" | "rewardInterstitial";

export class AdContainer {
    private ads: Partial<Record<adTypes, AdStrategy>> = {
        interstitial: new InterstitialAdStrategy("lol", this.facebook)
    };

    constructor(private readonly facebook: Facebook) {
    }

    public preloadAd(adType: adTypes, adId: string): void {
        if (adType === "interstitial") {
            this.ads.interstitial = new InterstitialAdStrategy(adId, this.facebook);
        } else if (adType === "reward") {
            this.ads.interstitial = new InterstitialAdStrategy(adId, this.facebook);
        } else if (adType === "rewardInterstitial") {
            this.ads.rewardInterstitial = new InterstitialAdStrategy(adId, this.facebook);
        } else if (adType === "banner") {
            this.ads.banner = new InterstitialAdStrategy(adId, this.facebook);
        } else {
            console.error(`[AdContainer]: ${adType} adType cannot be handled`);
        }
        console.log(this.ads);
    }

    public showAd(adType: adTypes): void {
        // @ts-ignore
        this.ads[adType].showAd();
    }
}