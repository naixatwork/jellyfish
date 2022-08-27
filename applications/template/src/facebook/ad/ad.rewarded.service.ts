import {inject, injectable} from "inversify";
import {AdBaseService} from "./ad.base.service";
import {FACEBOOK_SERVICE_IDENTIFIERS, IFBInstantSDK} from "../facebook.type";
import {PreloadBehaviour} from "./ad.loadBehaviour.ts/ad.preloadBehaviour";
import {ShowAdInterstitialBehaviour} from "./ad.interstitial.service";
import {adTypes} from "./ad.container.service";
import {HideNullBehaviour} from "./ad.hideBehaviour";
import {IFacebookAd} from "./ad.type";

@injectable()
export class AdRewardedService extends AdBaseService {
    protected adType: adTypes = "rewarded";
    protected hideAdBehaviour = new HideNullBehaviour();
    protected loadBehaviour = this.preloadBehaviour;
    protected showBehaviour = this.showAdInterstitialBehaviour;

    constructor(
        @inject<IFBInstantSDK>(FACEBOOK_SERVICE_IDENTIFIERS.FacebookSDK) protected readonly fbInstant: IFBInstantSDK,
        @inject(FACEBOOK_SERVICE_IDENTIFIERS.preloadBehaviour) private readonly preloadBehaviour: PreloadBehaviour,
        @inject(FACEBOOK_SERVICE_IDENTIFIERS.showAdInterstitialBehaviour) private readonly showAdInterstitialBehaviour: ShowAdInterstitialBehaviour,
    ) {
        super();
    }

    protected preloadAdFunction(adId: string): Promise<IFacebookAd> {
        return this.fbInstant.getRewardedVideoAsync(adId);
    }
}