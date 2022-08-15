import {injectable} from "inversify";

@injectable()
export abstract class AdStrategy {
    protected ad: any;

    public constructor(
        protected readonly fbInstant: any
    ) {
    }

    public abstract showAd(): void;

    public abstract preloadAd(adId: string): void;
}