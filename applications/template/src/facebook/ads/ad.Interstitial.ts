import {AdStrategy} from './ad.type'
import Facebook from "../facebook";
import {PLANKTON_GAME_OBJECT_NAME, unityEngine} from "../../../index";

export class InterstitialAdStrategy extends AdStrategy {
    constructor(adId: string, facebook: Facebook) {
        super(adId, facebook);
    }

    public showAd() {
        const callUnityOnAdShowed = () => {
            unityEngine.sendMessage(PLANKTON_GAME_OBJECT_NAME, "OnAdShowed", JSON.stringify({
                format: "interstitial",
                network: "facebook",
                response_id: "0"
            }))
        }

        const callUnityOnAdFailedToShow = () => {
            unityEngine.sendMessage(PLANKTON_GAME_OBJECT_NAME, "OnAdFailedToShow", JSON.stringify({
                format: "interstitial",
                network: "facebook",
                response_id: "0"
            }))
        }

        if (!this.ad) {
            callUnityOnAdFailedToShow();
            return;
        }

        this.ad.showAsync()
            .then(() => {
                callUnityOnAdShowed();
            })
            .catch(function (error: any) {
                callUnityOnAdFailedToShow();
                console.error(error)
            })
    }

    public preloadAd(adId: string) {
        console.log(adId, this.facebook);
        const setAd = (ad: any) => {
            this.ad = ad;
        }

        const callUnityOnAdLoaded = () => {
            console.log('callUnityOnAdLoaded')
            unityEngine.sendMessage(PLANKTON_GAME_OBJECT_NAME, "OnAdLoaded", "interstitial");
        }

        const callUnityOnAdFailedToLoad = () => {
            console.log('callUnityOnAdFailedToLoad')
            unityEngine.sendMessage(PLANKTON_GAME_OBJECT_NAME, "OnAdFailedToLoad", "interstitial");
        }

        this.facebook.fbInstant.getInterstitialAdAsync(adId)
            .then((ad: InterstitialAdStrategy['ad']) => {
                setAd(ad);
                callUnityOnAdLoaded();
            })
            .catch(function (error: any) {
                callUnityOnAdFailedToLoad();
                console.error(error)
            });
    }
}