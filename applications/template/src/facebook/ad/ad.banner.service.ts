import {inject, injectable} from "inversify";
import {AdService} from "./ad.abstract";
import {IAdPreloadBehaviour} from "./ad.preloadBehaviour";
import {ShowNullBehaviour} from "./ad.showBehaviour";
import {IAdHideBehaviour} from "./ad.hideBehaviour";
import {FACEBOOK_SERVICE_IDENTIFIERS, IFBInstantSDK} from "../facebook.type";
import {UnityService} from "../../unity/unity.service";
import {FacebookAdMock} from "../facebook.module";
import {PLANKTON_GAME_OBJECT_NAME} from "../../unity/unity.types";
import {first, from, lastValueFrom} from "rxjs";
import {IFacebookAd} from "./ad.type";

@injectable()
export class AdBannerService extends AdService {
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
        @inject(FACEBOOK_SERVICE_IDENTIFIERS.fbInstantSDK) protected readonly fbInstant: IFBInstantSDK,
        private readonly unityService: UnityService
    ) {
    }

    async preloadAd(adId: string): Promise<IFacebookAd> {
        const ad$ = from(this.fbInstant.loadBannerAdAsync(adId));

        const onAdLoaded = () => {
            const callUnityOnAdLoaded = () => {
                this.unityService.sendMessage(PLANKTON_GAME_OBJECT_NAME, "OnAdLoaded", "banner");
            }
            callUnityOnAdLoaded();
            return new FacebookAdMock();
        }

        const onAdFailedToLoad = (error: Error) => {
            const callUnityOnAdFailedToLoad = () => {
                this.unityService.sendMessage(PLANKTON_GAME_OBJECT_NAME, "OnAdFailedToLoad", "banner");
            }
            callUnityOnAdFailedToLoad();
            console.error(error)
        }

        ad$
            .pipe(first())
            .subscribe({
                next: onAdLoaded,
                error: onAdFailedToLoad,
            })

        return await lastValueFrom(ad$);
    }
}

@injectable()
export class HideBannerBehaviour implements IAdHideBehaviour {
    constructor(
        @inject(FACEBOOK_SERVICE_IDENTIFIERS.fbInstantSDK) protected readonly fbInstant: IFBInstantSDK,
        private readonly unityService: UnityService
    ) {
    }

    hideAd(): void {
        const callUnityOnAdLoaded = () => {
            this.unityService.sendMessage(PLANKTON_GAME_OBJECT_NAME, "OnAdLoaded", "banner");
        }

        this.fbInstant.hideBannerAdAsync();
    }
}