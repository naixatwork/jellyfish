import {AdStrategy} from './ad.type'

export class InterstitialAdStrategy extends AdStrategy {
    constructor(fbInstant: any, adId: string) {
        super(fbInstant, adId);
    }

    override showAd() {
        if (!this.ad) return;

        this.ad.showAsync()
            .then()
            .catch(function (error: any) {
                console.error(error)
            })
    }

    override preloadAd(adId: string) {
        const setAd = (ad: any) => {
            this.ad = ad;
        }

        this.fbInstant.getInterstitialAdAsync(adId)
            .then(setAd)
            .catch(function (error: any) {
                console.error(error)
            });
    }
}