export interface IFacebookAd {
    getPlacementID(): string;

    showAsync(): Promise<IFacebookAd>;

    loadAsync(): Promise<IFacebookAd>;
}