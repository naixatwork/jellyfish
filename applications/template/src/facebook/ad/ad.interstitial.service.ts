import {inject, injectable} from "inversify";
import {AdServiceBase} from "./ad.abstract";
import {UnityService} from "../../unity/unity.service";
import {FACEBOOK_SERVICE_IDENTIFIERS, IFBInstantSDK} from "../facebook.type";
import {IAdPreloadBehaviour} from "./ad.preloadBehaviour";
import {IAdShowBehaviour} from "./ad.showBehaviour";
import {HideNullBehaviour} from "./ad.hideBehaviour";
import {first, from, Observable, switchMap, tap} from "rxjs";
import {IFacebookAd} from "./ad.type";
import {ABR_PLANKTON_NAMES} from "../../unity/unity.types";

@injectable()
export class AdInterstitialService extends AdServiceBase {
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
        @inject<IFBInstantSDK>(FACEBOOK_SERVICE_IDENTIFIERS.FacebookSDK) protected readonly fbInstant: IFBInstantSDK,
        private readonly unityService: UnityService
    ) {
    }

    preloadAd(adId: string): Observable<IFacebookAd> {
        const onAdPreloaded = () => {
            const callUnityOnAdLoaded = () => {
                this.unityService.sendMessage(
                    ABR_PLANKTON_NAMES.planktonGameObject,
                    ABR_PLANKTON_NAMES.onAdLoaded,
                    "interstitial");
            }
            callUnityOnAdLoaded();
        }

        const onAdFailedToPreload = (error: Error) => {
            const callUnityOnAdFailedToLoad = () => {
                this.unityService.sendMessage(ABR_PLANKTON_NAMES.planktonGameObject, "OnAdFailedToLoad", "interstitial");
            }

            callUnityOnAdFailedToLoad();
            console.error(error);
        }

        return from(this.fbInstant.getInterstitialAdAsync(adId))
            .pipe(
                first(),
                switchMap((interstitialInstance) => interstitialInstance.loadAsync()),
                tap({
                    next: onAdPreloaded,
                    error: onAdFailedToPreload
                }),
            )
    }
}

@injectable()
export class ShowAdInterstitialBehaviour implements IAdShowBehaviour {
    constructor(
        @inject(FACEBOOK_SERVICE_IDENTIFIERS.FacebookSDK) protected readonly fbInstant: IFBInstantSDK,
        @inject<UnityService>(UnityService) private readonly unityService: UnityService
    ) {
    }

    public showAd(ad: IFacebookAd) {
        const callUnityOnAdShowed = () => {
            this.unityService.sendMessage(ABR_PLANKTON_NAMES.planktonGameObject, "OnAdShowed", JSON.stringify({
                format: "interstitial",
                network: "facebook",
                response_id: "0"
            }))
        }

        const callUnityOnAdFailedToShow = () => {
            this.unityService.sendMessage(ABR_PLANKTON_NAMES.planktonGameObject, "OnAdFailedToShow", JSON.stringify({
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