import {ContainerModule} from "inversify";
import {FacebookService} from "./facebook.service";
import {AdContainerService} from "./ad/ad.container.service";
import {AdInterstitialService} from "./ad/ad.interstitial.service";
import {AdStrategy} from "./ad/ad.strategy";
import {FACEBOOK_SERVICE_IDENTIFIERS, IAd, IFBInstantSDK} from "./facebook.type";

export class FacebookModule extends ContainerModule {
    public constructor() {
        super(bind => {
            bind(FacebookService).toSelf();
            bind(AdContainerService).toSelf();
            bind(AdInterstitialService).toSelf();
            bind(AdStrategy).toSelf();
            bind(FACEBOOK_SERVICE_IDENTIFIERS.fbInstantSDK).toConstantValue(new FBInstantSDKMock());
        });
    }
}

class AdMock implements IAd {
    getPlacementID(): string {
        return "";
    }

    loadAsync(): Promise<IAd> {
        return Promise.resolve(this);
    }

    showAsync(): Promise<IAd> {
        return Promise.resolve(this);
    }

}

class FBInstantSDKMock implements IFBInstantSDK {
    getInterstitialAdAsync(adId: string): Promise<IAd> {
        return Promise.resolve(new AdMock());
    }

    getSupportedAPIs(): string[] {
        return [];
    }

    initializeAsync(): Promise<any> {
        return Promise.resolve(undefined);
    }

    setLoadingProgress(percentage: number): void {
    }

    startGameAsync(): Promise<any> {
        return Promise.resolve(undefined);
    }

}