import {IAdLoadBehaviour} from "./ad.loadBehaviour.type";
import {IFacebookAd} from "../ad.type";
import {adTypes} from "../ad.container.service";
import {Observable, of} from "rxjs";
import {FacebookAdMock} from "../../facebook.module";
import {injectable} from "inversify";

@injectable()
export class LoadNullBehaviour implements IAdLoadBehaviour {
    preloadAd(asyncPreloadFunction: Promise<IFacebookAd>, adType: adTypes): Observable<IFacebookAd> {
        return of(new FacebookAdMock());
    }
}