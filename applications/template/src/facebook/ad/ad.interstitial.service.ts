import {inject, injectable} from "inversify";
import {AdService} from "./ad.abstract";
import {UnityService} from "../../unity/unity.service";
import {FACEBOOK_SERVICE_IDENTIFIERS, IFBInstantSDK} from "../facebook.type";
import {IAdPreloadBehaviour} from "./ad.preloadBehaviour";
import {IAdShowBehaviour} from "./ad.showBehaviour";
import {HideNullBehaviour} from "./ad.hideBehaviour";
import {PLANKTON_GAME_OBJECT_NAME} from "../../unity/unity.types";
import {first, from, lastValueFrom, switchMap} from "rxjs";
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

    async preloadAd(adId: string): Promise<IFacebookAd> {
        const ad$ = from(this.fbInstant.getInterstitialAdAsync(adId));

        const onAdPreloaded = (ad: IFacebookAd) => {
            const callUnityOnAdLoaded = () => {
                this.unityService.sendMessage(PLANKTON_GAME_OBJECT_NAME, "OnAdLoaded", "interstitial");
            }

            callUnityOnAdLoaded();
            return ad;
        }

        const onAdFailedToPreload = (error: Error) => {
            const callUnityOnAdFailedToLoad = () => {
                this.unityService.sendMessage(PLANKTON_GAME_OBJECT_NAME, "OnAdFailedToLoad", "interstitial");
            }

            callUnityOnAdFailedToLoad();
            console.error(error);
        }

        ad$
            .pipe(
                first(),
                switchMap((interstitialInstance) => interstitialInstance.loadAsync())
            )
            .subscribe({
                next: onAdPreloaded,
                error: onAdFailedToPreload
            });

        return await lastValueFrom(ad$);
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