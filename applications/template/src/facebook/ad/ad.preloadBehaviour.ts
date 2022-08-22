import {IAd} from "./ad.class";
import {inject, injectable} from "inversify";
import {FACEBOOK_SERVICE_IDENTIFIERS, IFBInstantSDK} from "../facebook.type";
import {UnityService} from "../../unity/unity.service";
import {PLANKTON_GAME_OBJECT_NAME} from "../../../index";
import {AdMock} from "../facebook.module";

export interface IAdPreloadBehaviour {
    preloadAd(adId: string): IAd;
}

export class PreloadNullBehaviour implements IAdPreloadBehaviour {
    preloadAd(adId: string): IAd {
        return new AdMock();
    }
}