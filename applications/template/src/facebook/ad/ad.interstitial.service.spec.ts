import {AdInterstitialService, PreloadInterstitialBehaviour} from "./ad.interstitial.service";
import {createTestingModule} from "../../shared/create-testing-module.function";
import {FacebookAdMock, FacebookModule, FBInstantSDKMock} from "../facebook.module";
import {UnityModule} from "../../unity/unity.module";
import {ABR_PLANKTON_NAMES, IUnityInstance, UNITY_SERVICE_IDENTIFIERS} from "../../unity/unity.types";
import {Container, injectable} from "inversify";
import {IFacebookAd} from "./ad.type";
import {FACEBOOK_SERVICE_IDENTIFIERS, IFBInstantSDK} from "../facebook.type";
import _ from "lodash";

@injectable()
class UnityInstanceMock implements IUnityInstance {
    public static logStack: {
        gameObject: string,
        method: string,
        value: string
    }[] = [];

    SendMessage(gameObject: string, method: string, value?: string): void {
        UnityInstanceMock.logStack.push({
            gameObject,
            method,
            value: value || ""
        });
        console.log(`[UnityInstanceMock]: ${gameObject} ${method} ${value}`);
    }
}

@injectable()
class FBInstantSDKFailMock extends FBInstantSDKMock {
    override getInterstitialAdAsync(adId: string): Promise<IFacebookAd> {
        return Promise.reject("[FBInstantSDKFailMock]: for testing purposes");
    }
}

describe("AdInterstitialService", () => {
    let sut: AdInterstitialService;
    let moduleRef: Container;

    beforeEach(() => {
        moduleRef = createTestingModule(FacebookModule, UnityModule);
        moduleRef.rebind(UNITY_SERVICE_IDENTIFIERS.unityInstance).to(UnityInstanceMock);
        sut = moduleRef.get(AdInterstitialService);
    });

    test("it should be defined", () => {
        expect(sut).toBeDefined();
    });

    test("it should return store preloaded Ad instance after calling preloadAd()", async () => {
        await sut.preloadAd("999");

        expect(sut.ad).toBeDefined();
        expect(sut.ad).toBeInstanceOf(FacebookAdMock);
    });

    test("it should send a message to unity if preloadAd() resolves successfully", async () => {
        await sut.preloadAd("999");

        expect(_.last(UnityInstanceMock.logStack)).toEqual({
            gameObject: ABR_PLANKTON_NAMES.planktonGameObject,
            method: ABR_PLANKTON_NAMES.onAdLoaded,
            value: "interstitial"
        });
    });

    test("it should send a message to unity if preloadAd() fails to resolve", async () => {
        moduleRef.rebind<IFBInstantSDK>(FACEBOOK_SERVICE_IDENTIFIERS.FacebookSDK).to(FBInstantSDKFailMock);
        sut = moduleRef.get(AdInterstitialService);

        await sut.preloadAd("999");
        console.log(UnityInstanceMock.logStack);

        expect(_.last(UnityInstanceMock.logStack)).toEqual({
            gameObject: ABR_PLANKTON_NAMES.planktonGameObject,
            method: ABR_PLANKTON_NAMES.onAdFailedToLoad,
            value: "interstitial"
        });
    });
});