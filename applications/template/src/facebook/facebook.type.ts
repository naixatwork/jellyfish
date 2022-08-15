interface IFBInstantSDK {
    initializeAsync(): Promise<any>;

    startGameAsync(): Promise<any>;

    setLoadingProgress(percentage: number): void;

    getSupportedAPIs(): string[];

    getInterstitialAdAsync(adId: string): Promise<IAd>;
}

interface IAd {
    getPlacementID(): string;

    showAsync(): Promise<IAd>;

    loadAsync(): Promise<IAd>;
}

const FACEBOOK_SERVICE_IDENTIFIERS = {
    fbInstantSDK: Symbol.for("fbInstantSDK"),
};


export {IAd, IFBInstantSDK, FACEBOOK_SERVICE_IDENTIFIERS};