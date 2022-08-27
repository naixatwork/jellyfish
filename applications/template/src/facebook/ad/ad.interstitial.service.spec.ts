import {AdInterstitialService} from "./ad.interstitial.service";
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
    }
}

@injectable()
class FBInstantSDKFailMock extends FBInstantSDKMock {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

    afterEach(() => {
        UnityInstanceMock.logStack = [];
    });

    test("it should be defined", () => {
        expect(sut).toBeDefined();
    });

    test("it should set preloaded Ad instance after calling preloadAd()", async () => {
        await sut.preloadAd("999");

        expect(sut.ad).toBeDefined();
        expect(sut.ad).toBeInstanceOf(FacebookAdMock);
    });

    test("it should send OnAdLoaded with interstitial as value message to unity if preloadAd() resolves successfully", async () => {
        await sut.preloadAd("999");

        expect(_.last(UnityInstanceMock.logStack)).toEqual({
            gameObject: ABR_PLANKTON_NAMES.planktonGameObject,
            method: ABR_PLANKTON_NAMES.onAdLoaded,
            value: "interstitial"
        });
    });

    test("it should send OnAdLoadFailed with interstitial as value message to unity if preloadAd() fails to resolve", async () => {
        moduleRef.rebind<IFBInstantSDK>(FACEBOOK_SERVICE_IDENTIFIERS.FacebookSDK).to(FBInstantSDKFailMock);
        sut = moduleRef.get(AdInterstitialService);

        await sut.preloadAd("999");

        expect(_.last(UnityInstanceMock.logStack)).toEqual({
            gameObject: ABR_PLANKTON_NAMES.planktonGameObject,
            method: ABR_PLANKTON_NAMES.onAdFailedToLoad,
            value: "interstitial"
        });
    });

    test("it should call preloaded ad's showAsync() on showAd()", async () => {
        class TestAdMock extends FacebookAdMock {
            public static hasShowAsyncCalled = false;

            override showAsync(): Promise<IFacebookAd> {
                TestAdMock.hasShowAsyncCalled = true;
                return super.showAsync();
            }
        }

        class FBInstantSDKTestMock extends FBInstantSDKMock {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            override getInterstitialAdAsync(adId: string): Promise<IFacebookAd> {
                return Promise.resolve(new TestAdMock());
            }
        }

        moduleRef.rebind<IFBInstantSDK>(FACEBOOK_SERVICE_IDENTIFIERS.FacebookSDK).to(FBInstantSDKTestMock);
        sut = moduleRef.get(AdInterstitialService);

        await sut.preloadAd("999");
        sut.showAd();

        expect(TestAdMock.hasShowAsyncCalled).toBeTruthy();
    });

    test("it should send OnAdShowed with interstitial as value message to unity if showAd() resolves successfully", async () => {
        await sut.preloadAd("999");
        await sut.showAd();

        expect(_.last(UnityInstanceMock.logStack)).toEqual({
            gameObject: ABR_PLANKTON_NAMES.planktonGameObject,
            method: ABR_PLANKTON_NAMES.onAdShowed,
            value: JSON.stringify({
                format: "interstitial",
                network: "facebook",
                response_id: "0"
            })
        });
    });

    test("it should send OnAdFailedToShow with interstitial as value message to unity if showAd() receives an undefined ad instance", async () => {
        moduleRef.rebind<IFBInstantSDK>(FACEBOOK_SERVICE_IDENTIFIERS.FacebookSDK).to(FBInstantSDKFailMock);
        sut = moduleRef.get(AdInterstitialService);

        await sut.preloadAd("999");
        await sut.showAd();

        expect(sut.ad).toBeUndefined();
        expect(_.last(UnityInstanceMock.logStack)).toEqual({
            gameObject: ABR_PLANKTON_NAMES.planktonGameObject,
            method: ABR_PLANKTON_NAMES.onAdFailedToShow,
            value: JSON.stringify({
                format: "interstitial",
                network: "facebook",
                response_id: "0"
            })
        });
    });

    test("it should send OnAdFailedToShow with interstitial as value message to unity if showAd() fails to resolve", async () => {
        class TestAdMock extends FacebookAdMock {
            public static hasShowAsyncCalled = false;

            override showAsync(): Promise<IFacebookAd> {
                TestAdMock.hasShowAsyncCalled = true;
                return Promise.reject("[TestAdMock]: for testing purposes");
            }
        }

        class FBInstantSDKTestMock extends FBInstantSDKMock {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            override getInterstitialAdAsync(adId: string): Promise<IFacebookAd> {
                return Promise.resolve(new TestAdMock());
            }
        }

        moduleRef.rebind<IFBInstantSDK>(FACEBOOK_SERVICE_IDENTIFIERS.FacebookSDK).to(FBInstantSDKTestMock);
        sut = moduleRef.get(AdInterstitialService);

        await sut.preloadAd("999");
        await sut.showAd();

        expect(sut.ad).toBeDefined();
        expect(sut.ad).toBeInstanceOf(TestAdMock);
        expect(TestAdMock.hasShowAsyncCalled).toBeTruthy();
        expect(_.last(UnityInstanceMock.logStack)).toEqual({
            gameObject: ABR_PLANKTON_NAMES.planktonGameObject,
            method: ABR_PLANKTON_NAMES.onAdFailedToShow,
            value: JSON.stringify({
                format: "interstitial",
                network: "facebook",
                response_id: "0"
            })
        });
    });
});