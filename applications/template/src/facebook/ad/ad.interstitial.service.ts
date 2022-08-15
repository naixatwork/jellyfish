import {inject, injectable} from "inversify";
import {AdStrategy} from "./ad.strategy";
import {PLANKTON_GAME_OBJECT_NAME} from "../../../index";
import {UnityService} from "../../unity/unity.service";
import {FACEBOOK_SERVICE_IDENTIFIERS, IFBInstantSDK} from "../facebook.type";

@injectable()
export class AdInterstitialService extends AdStrategy {
    constructor(
        @inject(FACEBOOK_SERVICE_IDENTIFIERS.fbInstantSDK) protected readonly fbInstant: IFBInstantSDK,
        private readonly unityService: UnityService
    ) {
        super();
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
        const setAd = (ad: any) => {
            this.ad = ad;
        }

        const callUnityOnAdLoaded = () => {
            this.unityService.sendMessage(PLANKTON_GAME_OBJECT_NAME, "OnAdLoaded", "interstitial");
        }

        const callUnityOnAdFailedToLoad = () => {
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