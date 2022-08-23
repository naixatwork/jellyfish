import {inject, injectable} from "inversify";
import {AdServiceBase} from "./ad.abstract";
import {IAdPreloadBehaviour} from "./ad.preloadBehaviour";
import {ShowNullBehaviour} from "./ad.showBehaviour";
import {IAdHideBehaviour} from "./ad.hideBehaviour";
import {FACEBOOK_SERVICE_IDENTIFIERS, IFBInstantSDK} from "../facebook.type";
import {UnityService} from "../../unity/unity.service";
import {first, from, Observable, tap} from "rxjs";
import {IFacebookAd} from "./ad.type";
import {ABR_PLANKTON_NAMES} from "../../unity/unity.types";

@injectable()
export class AdBannerService extends AdServiceBase {
    protected preloadBehaviour = this.loadBannerBehaviour;
    protected showBehaviour = new ShowNullBehaviour();
    protected hideAdBehaviour = this.hideBannerBehaviour;

    constructor(
        @inject(FACEBOOK_SERVICE_IDENTIFIERS.loadBannerBehaviour) private readonly loadBannerBehaviour: LoadBannerBehaviour,
        @inject(FACEBOOK_SERVICE_IDENTIFIERS.hideBannerBehaviour) private readonly hideBannerBehaviour: HideBannerBehaviour
    ) {
        super();
    }
}

@injectable()
export class LoadBannerBehaviour implements IAdPreloadBehaviour {
    constructor(
        @inject(FACEBOOK_SERVICE_IDENTIFIERS.FacebookSDK) protected readonly fbInstant: IFBInstantSDK,
        private readonly unityService: UnityService
    ) {
    }

    preloadAd(adId: string): Observable<IFacebookAd> {


        const onAdLoaded = () => {
            const callUnityOnAdLoaded = () => {
                this.unityService.sendMessage(ABR_PLANKTON_NAMES.planktonGameObject, "OnAdLoaded", "banner");
            };
            callUnityOnAdLoaded();
            // return new FacebookAdMock();
        };

        const onAdFailedToLoad = (error: Error) => {
            const callUnityOnAdFailedToLoad = () => {
                this.unityService.sendMessage(ABR_PLANKTON_NAMES.planktonGameObject, "OnAdFailedToLoad", "banner");
            };
            callUnityOnAdFailedToLoad();
            console.error(error);
        };

        return from(this.fbInstant.loadBannerAdAsync(adId))
            .pipe(
                first(),
                tap({
                    next: onAdLoaded,
                    error: onAdFailedToLoad
                })
            );
    }
}

@injectable()
export class HideBannerBehaviour implements IAdHideBehaviour {
    constructor(
        @inject(FACEBOOK_SERVICE_IDENTIFIERS.FacebookSDK) protected readonly fbInstant: IFBInstantSDK,
    ) {
    }

    hideAd(): void {
        this.fbInstant.hideBannerAdAsync();
    }
}