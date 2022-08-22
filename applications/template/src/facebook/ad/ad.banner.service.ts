import {inject, injectable} from "inversify";
import {Ad, IAd} from "./ad.class";
import {IAdPreloadBehaviour} from "./ad.preloadBehaviour";
import {IAdShowBehaviour, ShowNullBehaviour} from "./ad.showBehaviour";
import {HideNullBehaviour, IAdHideBehaviour} from "./ad.hideBehaviour";
import {FACEBOOK_SERVICE_IDENTIFIERS, IFBInstantSDK} from "../facebook.type";
import {UnityService} from "../../unity/unity.service";
import {PLANKTON_GAME_OBJECT_NAME} from "../../../index";
import {AdMock} from "../facebook.module";

@injectable()
export class AdBannerService extends Ad {
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

    preloadAd(adId: string): IAd {
        const callUnityOnAdLoaded = () => {
            this.unityService.sendMessage(PLANKTON_GAME_OBJECT_NAME, "OnAdLoaded", "banner");
        }

        const callUnityOnAdFailedToLoad = () => {
            this.unityService.sendMessage(PLANKTON_GAME_OBJECT_NAME, "OnAdFailedToLoad", "banner");
        }

        this.fbInstant.loadBannerAdAsync(adId)
            .then(() => {
                callUnityOnAdLoaded();
            })
            .catch(function (error: any) {
                callUnityOnAdFailedToLoad();
                console.error(error);
            });

        return new AdMock();
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