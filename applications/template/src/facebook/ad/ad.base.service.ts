import {IAdHideBehaviour} from "./ad.hideBehaviour";
import {IAdShowBehaviour} from "./ad.showBehaviour";
import {IFacebookAd} from "./ad.type";
import {adTypes} from "./ad.container.service";
import {IAdLoadBehaviour} from "./ad.loadBehaviour.ts/ad.loadBehaviour.type";

export abstract class AdServiceBase {
    private _ad: IFacebookAd;

    public get ad(): AdServiceBase['_ad'] {
        return this._ad;
    }

    private set ad(newAd) {
        this._ad = newAd;
    }

    protected abstract showBehaviour: IAdShowBehaviour;
    protected abstract preloadBehaviour: IAdLoadBehaviour;
    protected abstract hideAdBehaviour: IAdHideBehaviour;
    protected abstract adType: adTypes;

    protected abstract preloadAdFunction(adId: string): Promise<IFacebookAd>;

    public async preloadAd(adId: string): Promise<void> {
        await this.preloadBehaviour.preloadAd(this.preloadAdFunction(adId), this.adType)
            .subscribe({
            next: (preloadedAd) => {
                this.ad = preloadedAd;
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
