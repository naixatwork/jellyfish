import {IAd} from "./ad.class";
import {AdMock} from "../facebook.module";

export interface IAdPreloadBehaviour {
    preloadAd(adId: string): Promise<IAd>;
}

export class PreloadNullBehaviour implements IAdPreloadBehaviour {
    preloadAd(adId: string): Promise<IAd> {
        return Promise.resolve(new AdMock());
    }
}