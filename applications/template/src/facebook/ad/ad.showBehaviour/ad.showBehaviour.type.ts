import {IFacebookAd} from "../ad.type";
import {adTypes} from "../ad.container.service";

export interface IAdShowBehaviour {
    showAd(ad: IFacebookAd, adType: adTypes): void;
}