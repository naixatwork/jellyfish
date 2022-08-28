import {inject, injectable} from "inversify";
import {AdBaseService} from "./ad.base.service";
import {adTypes} from "./ad.container.service";
import {FACEBOOK_SERVICE_IDENTIFIERS, IFBInstantSDK} from "../facebook.type";
import {PreloadBehaviour} from "./ad.loadBehaviour.ts/ad.preloadBehaviour";
import {ShowAdAsyncBehaviour} from "./ad.showBehaviour/ad.showAsyncBehaviour";
import {HideNullBehaviour} from "./ad.hideBehaviour";
import {IFacebookAd} from "./ad.type";

@injectable()
export class AdRewardedInterstitialService extends AdBaseService {
    protected _adType: adTypes = "rewardedInterstitial";
    protected hideAdBehaviour = new HideNullBehaviour();
    protected loadBehaviour = this.preloadBehaviour;
    protected showBehaviour = this.showAdAsyncBehaviour;

    constructor(
        @inject<IFBInstantSDK>(FACEBOOK_SERVICE_IDENTIFIERS.FacebookSDK) protected readonly fbInstant: IFBInstantSDK,
        @inject(FACEBOOK_SERVICE_IDENTIFIERS.preloadBehaviour) private readonly preloadBehaviour: PreloadBehaviour,
        @inject(FACEBOOK_SERVICE_IDENTIFIERS.showAdAsyncBehaviour) private readonly showAdAsyncBehaviour: ShowAdAsyncBehaviour,
    ) {
        super();
    }

    protected fbInstantSDKPreloadAdFunction(adId: string): Promise<IFacebookAd> {
        return this.fbInstant.getRewardedInterstitialAsync(adId);
    }
}