// https://developers.facebook.com/docs/games/instant-games/sdk/fbinstant7.1
export interface IFacebookAd {
    getPlacementID(): string;

    showAsync(): Promise<IFacebookAd>;

    loadAsync(): Promise<IFacebookAd>;
}