declare var FBInstant: unknown; // a global variable that comes from Facebook SDK

export default class Facebook {
    private static instance: Facebook;

    private constructor(private readonly fbInstant: any) {
        const afterInitialization = () => {
            this.setLoadingProgressTo100();
            this.startGame();
            this.preloadInterstitial();
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

    private interstitialAd: any;

    private preloadInterstitial(): void {
        const setInterstitialAd = (interstitial: any) => {
            this.interstitialAd = interstitial;
        }

        this.fbInstant.getInterstitialAdAsync('3226407067686742_3226470167680432')
            .then(setInterstitialAd)
            .catch(function (error: any) {
                console.error(error.message)
            })

    }

    public showInterstitial(): void {
        if (!this.interstitialAd) {
            return;
        }
        this.interstitialAd.showAsync()
            .then()
            .catch(function (error: any) {
                console.error(error)
            })
    }
}