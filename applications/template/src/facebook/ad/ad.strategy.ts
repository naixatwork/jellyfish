import {injectable} from "inversify";

@injectable()
export abstract class AdStrategy {
    protected ad: any;

    public abstract showAd(): void;

    public abstract preloadAd(adId: string): void;
}