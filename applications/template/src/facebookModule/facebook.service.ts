import {inject, injectable} from "inversify";
import {AdContainerService} from "./ad/ad.container.service";
import {adTypes} from "../facebook/ads/ad.container";

@injectable()
export class FacebookService {
    constructor(
        @inject("fbInstant") private readonly fbInstant: any,
        private readonly adContainerService: AdContainerService
    ) {
        const afterInitialization = () => {
            this.setLoadingProgressTo100();
            this.startGame();
        }

        fbInstant.initializeAsync().then(afterInitialization);
    }

    private setLoadingProgressTo100(): void {
        this.fbInstant.setLoadingProgress(100);
    }

    private startGame(): void {
        this.fbInstant.startGameAsync();
    }

    public logSupportedAPIs(): void {
        console.log(this.fbInstant.getSupportedAPIs());
    }

    public preloadAd(adType: adTypes, adId: string): void {
        this.adContainerService.preloadAd(adType, adId);
    }

    public showAd(adType: adTypes): void {
        this.adContainerService.showAd(adType);
    }
}