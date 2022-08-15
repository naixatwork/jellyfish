import {ContainerModule} from "inversify";
import {FacebookService} from "./facebook.service";
import {AdContainerService} from "./ad/ad.container.service";
import {AdInterstitialService} from "./ad/ad.interstitial.service";
import {AdStrategy} from "./ad/ad.strategy";
import {FACEBOOK_SERVICE_IDENTIFIERS} from "./facebook.type";

export class FacebookModule extends ContainerModule {
    public constructor() {
        super(bind => {
            bind(FACEBOOK_SERVICE_IDENTIFIERS.fbInstantSDK).toConstantValue({});
            bind(FacebookService).toSelf();
            bind(AdContainerService).toSelf();
            bind(AdInterstitialService).toSelf();
            bind(AdStrategy).toSelf();
        });
    }
}