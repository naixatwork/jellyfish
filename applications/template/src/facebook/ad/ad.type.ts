export interface IFacebookAd {
    // reference: https://developers.facebook.com/docs/games/instant-games/sdk/fbinstant7.1
    getPlacementID(): string;

    showAsync(): Promise<IFacebookAd>;

    loadAsync(): Promise<IFacebookAd>;
}