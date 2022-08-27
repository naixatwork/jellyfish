import {inject, injectable} from "inversify";
import {AdBaseService} from "./ad.base.service";
import {IAdHideBehaviour} from "./ad.hideBehaviour";
import {FACEBOOK_SERVICE_IDENTIFIERS, IFBInstantSDK} from "../facebook.type";
import {UnityService} from "../../unity/unity.service";
import {first, from, Observable, tap} from "rxjs";
import {IFacebookAd} from "./ad.type";
import {ABR_PLANKTON_NAMES} from "../../unity/unity.types";
import {adTypes} from "./ad.container.service";
import {IAdLoadBehaviour} from "./ad.loadBehaviour.ts/ad.loadBehaviour.type";
import {ShowNullBehaviour} from "./ad.showBehaviour/ad.showNullBehaviour";

@injectable()
export class AdBannerService extends AdBaseService {
    protected override loadBehaviour = this.loadBannerBehaviour;
    protected override showBehaviour = new ShowNullBehaviour();
    protected override hideAdBehaviour = this.hideBannerBehaviour;
    protected override adType: adTypes = "banner";

    constructor(
        @inject(FACEBOOK_SERVICE_IDENTIFIERS.FacebookSDK) protected readonly fbInstant: IFBInstantSDK,
        @inject(FACEBOOK_SERVICE_IDENTIFIERS.loadBannerBehaviour) private readonly loadBannerBehaviour: LoadBannerBehaviour,
        @inject(FACEBOOK_SERVICE_IDENTIFIERS.hideBannerBehaviour) private readonly hideBannerBehaviour: HideBannerBehaviour
    ) {
        super();
    }

    protected override fbInstantSDKPreloadAdFunction(adId: string): Promise<IFacebookAd> {
        return this.fbInstant.loadBannerAdAsync(adId);
    }
}

@injectable()
export class LoadBannerBehaviour implements IAdLoadBehaviour {
    constructor(
        @inject(FACEBOOK_SERVICE_IDENTIFIERS.FacebookSDK) protected readonly fbInstant: IFBInstantSDK,
        private readonly unityService: UnityService
    ) {
    }

    preloadAd(asyncPreloadFunction: Promise<IFacebookAd>, adType: "banner"): Observable<IFacebookAd> {
        const onAdLoaded = () => {
            const callUnityOnAdLoaded = () => {
                this.unityService.sendMessage(
                    ABR_PLANKTON_NAMES.planktonGameObject,
                    ABR_PLANKTON_NAMES.onAdLoaded,
                    adType
                );
            };
            callUnityOnAdLoaded();
        };

        const onAdFailedToLoad = (error: Error) => {
            const callUnityOnAdFailedToLoad = () => {
                this.unityService.sendMessage(
                    ABR_PLANKTON_NAMES.planktonGameObject,
                    ABR_PLANKTON_NAMES.onAdFailedToLoad,
                    adType
                );
            };
            callUnityOnAdFailedToLoad();
            console.error(error);
        };

        return from(asyncPreloadFunction)
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
        from(this.fbInstant.hideBannerAdAsync())
            .pipe(first())
            .subscribe();
    }
}