import {ContainerModule, injectable} from "inversify";
import {FacebookService} from "./facebook.service";
import {AdContainerService} from "./ad/ad.container.service";
import {
    AdInterstitialService,
    PreloadInterstitialBehaviour,
    ShowAdInterstitialBehaviour
} from "./ad/ad.interstitial.service";
import {FACEBOOK_SERVICE_IDENTIFIERS, IFBInstantSDK} from "./facebook.type";
import {AdBannerService, HideBannerBehaviour, LoadBannerBehaviour} from "./ad/ad.banner.service";
import {IFacebookAd} from "./ad/ad.type";

export class FacebookModule extends ContainerModule {
    public constructor() {
        super(bind => {
            bind<FacebookService>(FACEBOOK_SERVICE_IDENTIFIERS.facebookService).to(FacebookService).inSingletonScope();
            bind(AdContainerService).toSelf();
            bind(FACEBOOK_SERVICE_IDENTIFIERS.preloadInterstitialBehaviour).to(PreloadInterstitialBehaviour);
            bind(FACEBOOK_SERVICE_IDENTIFIERS.showAdInterstitialBehaviour).to(ShowAdInterstitialBehaviour);
            bind(FACEBOOK_SERVICE_IDENTIFIERS.loadBannerBehaviour).to(LoadBannerBehaviour);
            bind(FACEBOOK_SERVICE_IDENTIFIERS.hideBannerBehaviour).to(HideBannerBehaviour);
            bind(AdInterstitialService).toSelf();
            bind(AdBannerService).toSelf();
            bind<IFBInstantSDK>(FACEBOOK_SERVICE_IDENTIFIERS.fbInstantSDK).to(FBInstantSDKMock).inSingletonScope();
        });
    }
}

export class FacebookAdMock implements IFacebookAd {
    getPlacementID(): string {
        return "AdMock";
    }

    loadAsync(): Promise<IFacebookAd> {
        return Promise.resolve(this);
    }

    showAsync(): Promise<IFacebookAd> {
        return Promise.resolve(this);
    }
}

@injectable()
class FBInstantSDKMock implements IFBInstantSDK {
    loadBannerAdAsync(adId: string): Promise<IFacebookAd> {
        return Promise.resolve(new FacebookAdMock());
    }

    getInterstitialAdAsync(adId: string): Promise<IFacebookAd> {
        return Promise.resolve(new FacebookAdMock());
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

    hideBannerAdAsync(): void {
    }
}