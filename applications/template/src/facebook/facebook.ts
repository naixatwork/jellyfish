import {AdStrategy} from "./ads/ad.type";
import {InterstitialAdStrategy} from "./ads/ad.Interstitial";

declare var FBInstant: unknown; // a global variable that should come from Facebook SDK

export default class Facebook {
    private static instance: Facebook;
    private adStrategy: AdStrategy = new InterstitialAdStrategy(this.fbInstant, '3226407067686742_3226470167680432');

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

    public setAdStrategy(adStrategy: AdStrategy): void {
        this.adStrategy = adStrategy;
    }

    public showAd(): void {
        this.adStrategy.showAd();
    }
}