import {inject, injectable} from "inversify";
import {AdContainerService, adTypes} from "./ad/ad.container.service";
import {FACEBOOK_SERVICE_IDENTIFIERS, IFBInstantSDK} from "./facebook.type";

@injectable()
export class FacebookService {
    constructor(
        @inject(FACEBOOK_SERVICE_IDENTIFIERS.FacebookSDK) private readonly fbInstant: IFBInstantSDK,
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
        this.fbInstant.startGameAsync().then();
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