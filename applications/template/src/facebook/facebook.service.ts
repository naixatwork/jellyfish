import {inject, injectable} from "inversify";
import {AdContainerService, adTypes} from "./ad/ad.container.service";
import {FACEBOOK_SERVICE_IDENTIFIERS, IFBInstantSDK} from "./facebook.type";

@injectable()
export class FacebookService {
    private static hasInitialized = false;
    public static counter = 0;

    constructor(
        @inject(FACEBOOK_SERVICE_IDENTIFIERS.FacebookSDK) private readonly fbInstant: IFBInstantSDK,
        private readonly adContainerService: AdContainerService
    ) {
        FacebookService.counter++;
        console.log(FacebookService.counter);
        const afterInitialization = () => {
            FacebookService.hasInitialized = true;
        };

        if (!FacebookService.hasInitialized)
            fbInstant.initializeAsync().then(afterInitialization);
    }

    public setLoadingProgress(progressPercentage: number) {
        this.fbInstant.setLoadingProgress(progressPercentage);
        if (progressPercentage >= 100) {
            this.startGame();
        }
    }

    private startGame(): void {
        this.fbInstant.startGameAsync().then();
    }

    public logSupportedAPIs(): void {
        console.log(this.fbInstant.getSupportedAPIs());
    }

    public loadAd(adType: adTypes, adId: string): void {
        this.adContainerService.loadAd(adType, adId);
    }

    public showAd(adType: adTypes): void {
        this.adContainerService.showAd(adType);
    }

    public hideAd(adType: adTypes): void {
        this.adContainerService.hideAd(adType);
    }
}