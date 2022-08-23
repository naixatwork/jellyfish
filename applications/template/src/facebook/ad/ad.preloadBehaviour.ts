import {FacebookAdMock} from "../facebook.module";
import {IFacebookAd} from "./ad.type";
import {Observable, of} from "rxjs";

export interface IAdPreloadBehaviour {
    preloadAd(adId: string): Observable<IFacebookAd>;
}

export class PreloadNullBehaviour implements IAdPreloadBehaviour {
    preloadAd(adId: string): Observable<IFacebookAd> {
        return of(new FacebookAdMock());
    }
}