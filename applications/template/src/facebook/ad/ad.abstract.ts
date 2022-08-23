import {IAdHideBehaviour} from "./ad.hideBehaviour";
import {IAdPreloadBehaviour} from "./ad.preloadBehaviour";
import {IAdShowBehaviour} from "./ad.showBehaviour";
import {IFacebookAd} from "./ad.type";

export abstract class AdService {
    private _ad: IFacebookAd;

    public get ad(): AdService['_ad'] {
        return this._ad;
    }

    private set ad(newAd) {
        this._ad = newAd;
    }

    protected abstract showBehaviour: IAdShowBehaviour;
    protected abstract preloadBehaviour: IAdPreloadBehaviour;
    protected abstract hideAdBehaviour: IAdHideBehaviour;

    public async preloadAd(adId: string): Promise<void> {
        await this.preloadBehaviour.preloadAd(adId).subscribe({
            next: (preloadedAd) => {
                this.ad = preloadedAd;
            }
        })
    }

    public showAd(): void {
        this.showBehaviour.showAd(this.ad);
    }

    public hideAd(): void {
        this.hideAdBehaviour.hideAd();
    }
}
