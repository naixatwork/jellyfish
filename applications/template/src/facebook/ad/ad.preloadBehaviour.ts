import {FacebookAdMock} from "../facebook.module";
import {IFacebookAd} from "./ad.type";

export interface IAdPreloadBehaviour {
    preloadAd(adId: string): Promise<IFacebookAd>;
}

export class PreloadNullBehaviour implements IAdPreloadBehaviour {
    preloadAd(adId: string): Promise<IFacebookAd> {
        return Promise.resolve(new FacebookAdMock());
    }
}