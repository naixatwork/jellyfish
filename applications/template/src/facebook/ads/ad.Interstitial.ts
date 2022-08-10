import {AdStrategy} from './ad.type'
import Facebook from "../facebook";

export class InterstitialAdStrategy extends AdStrategy {
    constructor(adId: string, facebook: Facebook) {
        super(adId, facebook);
    }

    public showAd() {
        if (!this.ad) return;

        this.ad.showAsync()
            .then()
            .catch(function (error: any) {
                console.error(error)
            })
    }

    public preloadAd(adId: string) {
        console.log(adId, this.facebook);
        const setAd = (ad: any) => {
            this.ad = ad;
        }

        this.facebook.fbInstant.getInterstitialAdAsync(adId)
            .then(setAd)
            .catch(function (error: any) {
                console.error(error)
            });
    }
}