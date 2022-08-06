export abstract class AdStrategy {
    protected ad: any;

    public abstract showAd(): void;

    protected abstract preloadAd(adId: string): void;

    protected constructor(protected readonly fbInstant: any, adId: string) {
        this.preloadAd(adId);
    }
}