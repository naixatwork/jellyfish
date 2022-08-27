import {IFacebookAd} from "../ad.type";
import {adTypes} from "../ad.container.service";
import {Observable} from "rxjs";

export interface IAdLoadBehaviour {
    preloadAd(asyncPreloadFunction: Promise<IFacebookAd>, adType: adTypes): Observable<IFacebookAd>;
}