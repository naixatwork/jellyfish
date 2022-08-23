import {IFacebookAd} from "./ad.type";

export interface IAdShowBehaviour {
    showAd(ad: IFacebookAd): void;
}

export class ShowNullBehaviour implements IAdShowBehaviour {
    showAd(ad: IFacebookAd): void {
    }
}