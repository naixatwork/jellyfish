import {IAd} from "./ad.class";

export interface IAdShowBehaviour {
    showAd(ad: IAd): void;
}

export class ShowNullBehaviour implements IAdShowBehaviour {
    showAd(ad: IAd): void {
    }
}