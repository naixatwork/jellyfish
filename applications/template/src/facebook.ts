declare var FBInstant: unknown; // a global variable that comes from Facebook SDK

export default class Facebook {
    private static instance: Facebook;

    private constructor(private readonly fbInstant: any) {
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


}