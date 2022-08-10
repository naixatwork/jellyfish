import Facebook from "../facebook";

export abstract class AdStrategy {
    protected ad: any;

    protected constructor(adId: string, protected readonly facebook: Facebook) {
        this.preloadAd(adId);
    }

    public abstract showAd(): void;

    public abstract preloadAd(adId: string): void;
}