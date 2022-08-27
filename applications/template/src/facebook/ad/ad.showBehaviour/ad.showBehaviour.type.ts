import {IFacebookAd} from "../ad.type";

export interface IAdShowBehaviour {
    showAd(ad: IFacebookAd): void;
}