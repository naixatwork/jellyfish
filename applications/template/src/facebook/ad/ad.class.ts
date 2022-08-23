import {IAdHideBehaviour} from "./ad.hideBehaviour";
import {IAdPreloadBehaviour} from "./ad.preloadBehaviour";
import {IAdShowBehaviour} from "./ad.showBehaviour";

export abstract class Ad {
    private _ad: IAd;

    public get ad(): Ad['_ad'] {
        return this._ad;
    }

    private set ad(newAd) {
        this._ad = newAd;
    }

    protected abstract showBehaviour: IAdShowBehaviour;
    protected abstract preloadBehaviour: IAdPreloadBehaviour;
    protected abstract hideAdBehaviour: IAdHideBehaviour;

    public preloadAd(adId: string): void {
        this.preloadBehaviour.preloadAd(adId)
            .then((preloadedAd) => {
                console.log({preloadedAd});
                this.ad = preloadedAd;
            })
    }

    public showAd(): void {
        this.showBehaviour.showAd(this.ad);
    }

    public hideAd(): void {
        this.hideAdBehaviour.hideAd();
    }
}


export interface IAd {
    getPlacementID(): string;

    showAsync(): Promise<IAd>;

    loadAsync(): Promise<IAd>;
}