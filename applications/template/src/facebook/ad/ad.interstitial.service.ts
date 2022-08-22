import {inject, injectable} from "inversify";
import {Ad, IAd} from "./ad.class";
import {UnityService} from "../../unity/unity.service";
import {FACEBOOK_SERVICE_IDENTIFIERS, IFBInstantSDK} from "../facebook.type";
import {IAdPreloadBehaviour} from "./ad.preloadBehaviour";
import {IAdShowBehaviour} from "./ad.showBehaviour";
import {HideNullBehaviour} from "./ad.hideBehaviour";
import {PLANKTON_GAME_OBJECT_NAME} from "../../../index";

@injectable()
export class AdInterstitialService extends Ad {
    protected preloadBehaviour = this.preloadInterstitialBehaviour;
    protected showBehaviour = this.showAdInterstitialBehaviour;
    protected hideAdBehaviour = new HideNullBehaviour();

    constructor(
        @inject(FACEBOOK_SERVICE_IDENTIFIERS.preloadInterstitialBehaviour) private readonly preloadInterstitialBehaviour: PreloadInterstitialBehaviour,
        @inject(FACEBOOK_SERVICE_IDENTIFIERS.showAdInterstitialBehaviour) private readonly showAdInterstitialBehaviour: ShowAdInterstitialBehaviour,
    ) {
        super();
    }
}

@injectable()
export class PreloadInterstitialBehaviour implements IAdPreloadBehaviour {
    constructor(
        @inject<IFBInstantSDK>(FACEBOOK_SERVICE_IDENTIFIERS.fbInstantSDK) protected readonly fbInstant: IFBInstantSDK,
        private readonly unityService: UnityService
    ) {
    }

    preloadAd(adId: string): IAd {
        let ad: IAd;
        const getAd = (): IAd => {
            return ad;
        }

        const setAd = (preloadedAd: IAd) => {
            ad = preloadedAd;
        }

        const callUnityOnAdLoaded = () => {
            this.unityService.sendMessage(PLANKTON_GAME_OBJECT_NAME, "OnAdLoaded", "interstitial");
        }

        const callUnityOnAdFailedToLoad = () => {
            this.unityService.sendMessage(PLANKTON_GAME_OBJECT_NAME, "OnAdFailedToLoad", "interstitial");
        }

        this.fbInstant.getInterstitialAdAsync(adId)
            .then((ad: IAd) => {
                setAd(ad);
                callUnityOnAdLoaded();
            })
            .catch(function (error: any) {
                callUnityOnAdFailedToLoad();
                console.error(error);
            });

        return getAd();
    }
}

@injectable()
export class ShowAdInterstitialBehaviour implements IAdShowBehaviour {
    constructor(
        @inject(FACEBOOK_SERVICE_IDENTIFIERS.fbInstantSDK) protected readonly fbInstant: IFBInstantSDK,
        @inject<UnityService>(UnityService) private readonly unityService: UnityService
    ) {
    }

    public showAd(ad: IAd) {
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

        if (!ad) {
            callUnityOnAdFailedToShow();
            return;
        }

        ad.showAsync()
            .then(() => {
                callUnityOnAdShowed();
            })
            .catch(function (error: any) {
                callUnityOnAdFailedToShow();
                console.error(error)
            })
    }
}