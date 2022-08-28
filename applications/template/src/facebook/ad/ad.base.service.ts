import {IAdHideBehaviour} from "./ad.hideBehaviour";
import {IFacebookAd} from "./ad.type";
import {adTypes} from "./ad.container.service";
import {IAdLoadBehaviour} from "./ad.loadBehaviour.ts/ad.loadBehaviour.type";
import {IAdShowBehaviour} from "./ad.showBehaviour/ad.showBehaviour.type";

export abstract class AdBaseService {
    private _ad: IFacebookAd;

    public get ad(): AdBaseService['_ad'] {
        return this._ad;
    }

    private set ad(newAd) {
        this._ad = newAd;
    }

    protected abstract showBehaviour: IAdShowBehaviour;
    protected abstract loadBehaviour: IAdLoadBehaviour;
    protected abstract hideAdBehaviour: IAdHideBehaviour;
    protected abstract _adType: adTypes;

    public adType(): AdBaseService['_adType'] {
        return this._adType;
    }

    protected abstract fbInstantSDKPreloadAdFunction(adId: string): Promise<IFacebookAd>;

    // todo change this function name to load
    public async loadAd(adId: string): Promise<void> {
        await this.loadBehaviour.preloadAd(this.fbInstantSDKPreloadAdFunction(adId), this._adType)
            .subscribe({
                next: (ad) => {
                    this.ad = ad;
                }
            });
    }

    public showAd(): void {
        this.showBehaviour.showAd(this.ad);
    }

    public hideAd(): void {
        this.hideAdBehaviour.hideAd();
    }
}
