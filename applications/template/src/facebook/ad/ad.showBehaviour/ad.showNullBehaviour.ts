import {IFacebookAd} from "../ad.type";
import {IAdShowBehaviour} from "./ad.showBehaviour.type";

export class ShowNullBehaviour implements IAdShowBehaviour {
    showAd(ad: IFacebookAd): void {
    }
}