import {AdContainer, adTypes} from "./ads/ad.container";

declare var FBInstant: unknown; // a global variable that should come from Facebook SDK

export default class Facebook {
    private static instance: Facebook;
    private adContainer = new AdContainer(this);

    private constructor(
        public readonly fbInstant: any,
    ) {
        const afterInitialization = () => {
            this.setLoadingProgressTo100();
            this.startGame();
        }

        fbInstant.initializeAsync().then(afterInitialization);
    }

    public static getSingletonInstance(): Facebook {
        if (!Facebook.instance) {
            Facebook.instance = new Facebook(FBInstant);
        }

        return Facebook.instance;
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
        this.adContainer.preloadAd(adType, adId);
    }

    public showAd(adType: adTypes): void {
        this.adContainer.showAd(adType);
    }
}