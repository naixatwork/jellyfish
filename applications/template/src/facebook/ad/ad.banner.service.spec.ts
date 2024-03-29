import {AdBannerService} from "./ad.banner.service";
import {injectable, interfaces} from "inversify";
import {createTestingModule} from "../../shared/create-testing-module.function";
import {FacebookAdMock, FacebookModule, FBInstantSDKMock} from "../facebook.module";
import {UnityModule} from "../../unity/unity.module";
import {ABR_PLANKTON_NAMES, IUnityInstance, UNITY_SERVICE_IDENTIFIERS} from "../../unity/unity.types";
import {IFacebookAd} from "./ad.type";
import {FACEBOOK_SERVICE_IDENTIFIERS, IFBInstantSDK} from "../facebook.type";
import _ from "lodash";
import Container = interfaces.Container;
import {UnityService} from "../../unity/unity.service";
import {SendMessageUnityBehaviour} from "../../unity/sendMessageBehaviour/sendMessageUnityBehaviour";

describe("AdBannerService", () => {
    let sut: AdBannerService;
    let moduleRef: Container;

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
    class FBInstantSDKTestMock extends FBInstantSDKMock {
        public static hasLoadBannerAdAsyncCalled = false;
        public static hasHideBannerAdAsync = false;

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        override loadBannerAdAsync(adId: string): Promise<IFacebookAd> {
            FBInstantSDKTestMock.hasLoadBannerAdAsyncCalled = true;
            return Promise.resolve(new FacebookAdMock());
        }

        override hideBannerAdAsync(): Promise<void> {
            FBInstantSDKTestMock.hasHideBannerAdAsync = true;
            return super.hideBannerAdAsync();
        }
    }

    @injectable()
    class FBInstantSDKTestFailMock extends FBInstantSDKMock {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        override loadBannerAdAsync(adId: string): Promise<IFacebookAd> {
            return Promise.reject("for testing purposes");
        }
    }

    beforeEach(() => {
        moduleRef = createTestingModule(FacebookModule, UnityModule);
        const unityService = moduleRef.get<UnityService>(UNITY_SERVICE_IDENTIFIERS.unityService);
        unityService.changeSendMessageBehaviour(new SendMessageUnityBehaviour(new UnityInstanceMock()));
        sut = moduleRef.get(FACEBOOK_SERVICE_IDENTIFIERS.adBannerService);
    });

    afterEach(() => {
        FBInstantSDKTestMock.hasLoadBannerAdAsyncCalled = false;
        FBInstantSDKTestMock.hasHideBannerAdAsync = false;
    });

    test("it should be an instance of AdBannerService and defined", () => {
        expect(sut).toBeDefined();
        expect(sut).toBeInstanceOf(AdBannerService);
    });

    test("it should subscribe to loadBannerAdAsync() from SDK after calling preloadAd()", async () => {
        moduleRef.rebind<IFBInstantSDK>(FACEBOOK_SERVICE_IDENTIFIERS.FacebookSDK).to(FBInstantSDKTestMock);
        sut = moduleRef.get(FACEBOOK_SERVICE_IDENTIFIERS.adBannerService);

        await sut.loadAd("999");

        expect(FBInstantSDKTestMock.hasLoadBannerAdAsyncCalled).toBeTruthy();
    });

    test("it should send OnAdLoaded message to unity if preloadAd() resolves successfully", async () => {
        moduleRef.rebind<IFBInstantSDK>(FACEBOOK_SERVICE_IDENTIFIERS.FacebookSDK).to(FBInstantSDKTestMock);
        sut = moduleRef.get(FACEBOOK_SERVICE_IDENTIFIERS.adBannerService);

        await sut.loadAd("999");

        expect(_.last(UnityInstanceMock.logStack)).toEqual({
            gameObject: ABR_PLANKTON_NAMES.planktonGameObject,
            method: ABR_PLANKTON_NAMES.onAdLoaded,
            value: "banner"
        });
    });

    test("it should send OnAdLoadFailed message to unity if preloadAd() fails to resolve", async () => {
        moduleRef.rebind<IFBInstantSDK>(FACEBOOK_SERVICE_IDENTIFIERS.FacebookSDK).to(FBInstantSDKTestFailMock);
        sut = moduleRef.get(FACEBOOK_SERVICE_IDENTIFIERS.adBannerService);

        await sut.loadAd("999");

        expect(_.last(UnityInstanceMock.logStack)).toEqual({
            gameObject: ABR_PLANKTON_NAMES.planktonGameObject,
            method: ABR_PLANKTON_NAMES.onAdFailedToLoad,
            value: "banner"
        });
    });

    test("it should subscribe to hideBannerAdAsync() from SDK after calling hideAd()", async () => {
        moduleRef.rebind<IFBInstantSDK>(FACEBOOK_SERVICE_IDENTIFIERS.FacebookSDK).to(FBInstantSDKTestMock);
        sut = moduleRef.get(FACEBOOK_SERVICE_IDENTIFIERS.adBannerService);

        await sut.loadAd("999");
        await sut.hideAd();

        expect(FBInstantSDKTestMock.hasHideBannerAdAsync).toBeTruthy();
    });
});