import {inject, injectable} from "inversify";
import {AdBaseService} from "./ad.base.service";
import {UnityService} from "../../unity/unity.service";
import {FACEBOOK_SERVICE_IDENTIFIERS, IFBInstantSDK} from "../facebook.type";
import {PreloadBehaviour} from "./ad.loadBehaviour.ts/ad.preloadBehaviour";
import {HideNullBehaviour} from "./ad.hideBehaviour";
import {first, from} from "rxjs";
import {IFacebookAd} from "./ad.type";
import {ABR_PLANKTON_NAMES} from "../../unity/unity.types";
import {adTypes} from "./ad.container.service";
import {IAdShowBehaviour} from "./ad.showBehaviour/ad.showBehaviour.type";

@injectable()
export class AdInterstitialService extends AdBaseService {
    protected loadBehaviour = this.preloadBehaviour;
    protected showBehaviour = this.showAdInterstitialBehaviour;
    protected hideAdBehaviour = new HideNullBehaviour();
    protected adType: adTypes = "interstitial";

    constructor(
        @inject<IFBInstantSDK>(FACEBOOK_SERVICE_IDENTIFIERS.FacebookSDK) protected readonly fbInstant: IFBInstantSDK,
        @inject(FACEBOOK_SERVICE_IDENTIFIERS.preloadBehaviour) private readonly preloadBehaviour: PreloadBehaviour,
        @inject(FACEBOOK_SERVICE_IDENTIFIERS.showAdInterstitialBehaviour) private readonly showAdInterstitialBehaviour: ShowAdInterstitialBehaviour,
    ) {
        super();
    }

    protected preloadAdFunction(adId: string): Promise<IFacebookAd> {
        return this.fbInstant.getInterstitialAdAsync(adId);
    }
}

@injectable()
export class ShowAdInterstitialBehaviour implements IAdShowBehaviour {
    constructor(
        @inject(FACEBOOK_SERVICE_IDENTIFIERS.FacebookSDK) protected readonly fbInstant: IFBInstantSDK,
        @inject<UnityService>(UnityService) private readonly unityService: UnityService
    ) {
    }

    public showAd(ad: IFacebookAd): void {
        const callUnityOnAdShowed = (): void => {
            this.unityService.sendMessage(
                ABR_PLANKTON_NAMES.planktonGameObject,
                "OnAdShowed",
                JSON.stringify({
                    format: "interstitial",
                    network: "facebook",
                    response_id: "0"
                }));
        };

        const callUnityOnAdFailedToShow = (): void => {
            this.unityService.sendMessage(
                ABR_PLANKTON_NAMES.planktonGameObject,
                "OnAdFailedToShow",
                JSON.stringify({
                    format: "interstitial",
                    network: "facebook",
                    response_id: "0"
                }));
        };

        if (!ad) {
            callUnityOnAdFailedToShow();
            return;
        }

        from(ad.showAsync())
            .pipe(
                first()
            )
            .subscribe({
                next: callUnityOnAdShowed,
                error: callUnityOnAdFailedToShow
            });
    }
}