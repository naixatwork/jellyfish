import {IAd} from "./ad.class";
import {AdMock} from "../facebook.module";

export interface IAdPreloadBehaviour {
    preloadAd(adId: string): IAd;
}

export class PreloadNullBehaviour implements IAdPreloadBehaviour {
    preloadAd(adId: string): IAd {
        return new AdMock();
    }
}