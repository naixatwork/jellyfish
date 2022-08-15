import {inject, injectable} from "inversify";
import {AdStrategy} from "./ad.strategy";
import {PLANKTON_GAME_OBJECT_NAME} from "../../../index";
import {UnityService} from "../../unity/unity.service";

@injectable()
export class AdInterstitialService extends AdStrategy {
    constructor(
        @inject("fbInstant") protected readonly fbInstant: any,
        private readonly unityService: UnityService
    ) {
        super(fbInstant);
    }

    public showAd() {
        const callUnityOnAdShowed = () => {
            this.unityService.sendMessage(PLANKTON_GAME_OBJECT_NAME, "OnAdShowed", JSON.stringify({
                format: "interstitial",
                network: "facebook",
                response_id: "0"
            }))
        }

        const callUnityOnAdFailedToShow = () => {
            this.unityService.sendMessage(PLANKTON_GAME_OBJECT_NAME, "OnAdFailedToShow", JSON.stringify({
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
        console.log(adId, this.fbInstant);
        const setAd = (ad: any) => {
            this.ad = ad;
        }

        const callUnityOnAdLoaded = () => {
            console.log('callUnityOnAdLoaded')
            this.unityService.sendMessage(PLANKTON_GAME_OBJECT_NAME, "OnAdLoaded", "interstitial");
        }

        const callUnityOnAdFailedToLoad = () => {
            console.log('callUnityOnAdFailedToLoad')
            this.unityService.sendMessage(PLANKTON_GAME_OBJECT_NAME, "OnAdFailedToLoad", "interstitial");
        }

        this.fbInstant.getInterstitialAdAsync(adId)
            .then((ad: AdStrategy['ad']) => {
                setAd(ad);
                callUnityOnAdLoaded();
            })
            .catch(function (error: any) {
                callUnityOnAdFailedToLoad();
                console.error(error)
            });
    }
}