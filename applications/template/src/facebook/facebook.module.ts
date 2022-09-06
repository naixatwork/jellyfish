import {ContainerModule, injectable} from "inversify";
import {FacebookService} from "./facebook.service";
import {AdContainerService} from "./ad/ad.container.service";
import {AdInterstitialService,} from "./ad/ad.interstitial.service";
import {FACEBOOK_SERVICE_IDENTIFIERS, IFBInstantSDK} from "./facebook.type";
import {AdBannerService, HideBannerBehaviour, LoadBannerBehaviour} from "./ad/ad.banner.service";
import {IFacebookAd} from "./ad/ad.type";
import {AdRewardedService} from "./ad/ad.rewarded.service";
import {PreloadBehaviour} from "./ad/ad.loadBehaviour.ts/ad.preloadBehaviour";
import {LoadNullBehaviour} from "./ad/ad.loadBehaviour.ts/ad.loadNullBehaviour";
import {ShowAdAsyncBehaviour} from "./ad/ad.showBehaviour/ad.showAsyncBehaviour";
import {AdRewardedInterstitialService} from "./ad/ad.rewardedInterstitial.service";
import {ProgressNullBehaviour} from "./progress/progressNullBehaviour";
import {ProgressOnUnityLoaderBehaviour} from "./progress/progressOnUnityLoaderBehaviour";

export class FacebookModule extends ContainerModule {
    public constructor() {
        super(bind => {
            // todo: provide service identifier for everything
            bind<IFBInstantSDK>(FACEBOOK_SERVICE_IDENTIFIERS.FacebookSDK).to(FBInstantSDKMock).inSingletonScope();
            bind(FACEBOOK_SERVICE_IDENTIFIERS.facebookService).to(FacebookService).inSingletonScope();
            bind(FACEBOOK_SERVICE_IDENTIFIERS.preloadBehaviour).to(PreloadBehaviour);
            bind(FACEBOOK_SERVICE_IDENTIFIERS.loadNullBehaviour).to(LoadNullBehaviour);
            bind(FACEBOOK_SERVICE_IDENTIFIERS.showAdAsyncBehaviour).to(ShowAdAsyncBehaviour);
            bind(FACEBOOK_SERVICE_IDENTIFIERS.loadBannerBehaviour).to(LoadBannerBehaviour);
            bind(FACEBOOK_SERVICE_IDENTIFIERS.hideBannerBehaviour).to(HideBannerBehaviour);
            bind(FACEBOOK_SERVICE_IDENTIFIERS.adRewardedService).to(AdRewardedService);
            bind(FACEBOOK_SERVICE_IDENTIFIERS.adRewardedInterstitialService).to(AdRewardedInterstitialService);
            bind(FACEBOOK_SERVICE_IDENTIFIERS.progressNullBehaviour).to(ProgressNullBehaviour);
            bind(FACEBOOK_SERVICE_IDENTIFIERS.progressOnUnityLoaderBehaviour).to(ProgressOnUnityLoaderBehaviour);
            bind(AdContainerService).toSelf();
            bind(AdInterstitialService).toSelf();
            bind(AdBannerService).toSelf();
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
export class FBInstantSDKMock implements IFBInstantSDK {
    loadBannerAdAsync(adId: string): Promise<IFacebookAd> {
        return Promise.resolve(new FacebookAdMock());
    }

    getInterstitialAdAsync(adId: string): Promise<IFacebookAd> {
        return Promise.resolve(new FacebookAdMock());
    }

    getRewardedVideoAsync(adId: string): Promise<IFacebookAd> {
        return Promise.resolve(new FacebookAdMock());
    }

    getRewardedInterstitialAsync(adId: string): Promise<IFacebookAd> {
        return Promise.resolve(new FacebookAdMock());
    }

    getSupportedAPIs(): string[] {
        return [];
    }

    initializeAsync(): Promise<void> {
        return Promise.resolve();
    }

    setLoadingProgress(percentage: number): void {
    }

    startGameAsync(): Promise<any> {
        return Promise.resolve(undefined);
    }

    hideBannerAdAsync(): Promise<void> {
        return Promise.resolve();
    }
}