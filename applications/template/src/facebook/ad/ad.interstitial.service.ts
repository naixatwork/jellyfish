import {inject, injectable} from "inversify";
import {AdService} from "./ad.abstract";
import {UnityService} from "../../unity/unity.service";
import {FACEBOOK_SERVICE_IDENTIFIERS, IFBInstantSDK} from "../facebook.type";
import {IAdPreloadBehaviour} from "./ad.preloadBehaviour";
import {IAdShowBehaviour} from "./ad.showBehaviour";
import {HideNullBehaviour} from "./ad.hideBehaviour";
import {PLANKTON_GAME_OBJECT_NAME} from "../../unity/unity.types";
import {catchError, first, from, lastValueFrom, Observable, switchMap, tap} from "rxjs";
import {IFacebookAd} from "./ad.type";

@injectable()
export class AdInterstitialService extends AdService {
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

    preloadAd(adId: string): Observable<IFacebookAd> {
        const onAdPreloaded = () => {
            const callUnityOnAdLoaded = () => {
                this.unityService.sendMessage(PLANKTON_GAME_OBJECT_NAME, "OnAdLoaded", "interstitial");
            }
            callUnityOnAdLoaded();
        }

        const onAdFailedToPreload = (error: Error) => {
            const callUnityOnAdFailedToLoad = () => {
                this.unityService.sendMessage(PLANKTON_GAME_OBJECT_NAME, "OnAdFailedToLoad", "interstitial");
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
        @inject(FACEBOOK_SERVICE_IDENTIFIERS.fbInstantSDK) protected readonly fbInstant: IFBInstantSDK,
        @inject<UnityService>(UnityService) private readonly unityService: UnityService
    ) {
    }

    public showAd(ad: IFacebookAd) {
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