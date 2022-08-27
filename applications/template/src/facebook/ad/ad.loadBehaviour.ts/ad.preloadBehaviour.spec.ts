import {PreloadBehaviour} from "./ad.preloadBehaviour";
import {Container, injectable} from "inversify";
import {createTestingModule} from "../../../shared/create-testing-module.function";
import {FacebookAdMock, FacebookModule} from "../../facebook.module";
import {UnityModule} from "../../../unity/unity.module";
import {ABR_PLANKTON_NAMES, IUnityInstance, UNITY_SERVICE_IDENTIFIERS} from "../../../unity/unity.types";
import {FACEBOOK_SERVICE_IDENTIFIERS} from "../../facebook.type";
import {IFacebookAd} from "../ad.type";
import _ from "lodash";
import {noop} from "rxjs";

describe("PreloadBehaviour", () => {
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

    class TestAdMock extends FacebookAdMock {
        public static hasLoadAsyncCalled = false;

        override loadAsync(): Promise<IFacebookAd> {
            TestAdMock.hasLoadAsyncCalled = true;
            return super.loadAsync();
        }
    }

    class FBInstantSDKTestMock {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        public static getMockAdAsync(adId: string): Promise<IFacebookAd> {
            return Promise.resolve(new TestAdMock());
        }
    }

    class FBInstantSDKTestFailMock {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        public static getMockAdAsync(adId: string): Promise<IFacebookAd> {
            return Promise.reject("for testing purposes");
        }
    }

    let sut: PreloadBehaviour;
    let moduleRef: Container;

    beforeEach(() => {
        moduleRef = createTestingModule(FacebookModule, UnityModule);
        moduleRef.rebind(UNITY_SERVICE_IDENTIFIERS.unityInstance).to(UnityInstanceMock);
        sut = moduleRef.get(FACEBOOK_SERVICE_IDENTIFIERS.preloadBehaviour);
    });

    afterEach(() => {
        UnityInstanceMock.logStack = [];
        TestAdMock.hasLoadAsyncCalled = false;
    });

    test("it should be defined", () => {
        expect(sut).toBeDefined();
        expect(sut).toBeInstanceOf(PreloadBehaviour);
    });

    test("it should switchMap() to loadAsync() from asyncPreloadFunction", async () => {
        await sut.preloadAd(FBInstantSDKTestMock.getMockAdAsync("999"), "banner")
            .subscribe();

        expect(TestAdMock.hasLoadAsyncCalled).toBeTruthy();
    });

    test("it should send OnAdLoaded message to unity if preloadAd() resolves successfully", (done) => {
        const onAdPreload = () => {
            expect(_.last(UnityInstanceMock.logStack)).toEqual({
                gameObject: ABR_PLANKTON_NAMES.planktonGameObject,
                method: ABR_PLANKTON_NAMES.onAdLoaded,
                value: "banner"
            });
            done();
        };

        sut.preloadAd(FBInstantSDKTestMock.getMockAdAsync("999"), "banner")
            .subscribe({
                next: onAdPreload,
                error: noop
            });
    });

    test("it should send OnAdFailedToLoad message to unity if preloadAd() fails to resolve", (done) => {
        const onAdPreloadFailed = () => {
            expect(_.last(UnityInstanceMock.logStack)).toEqual({
                gameObject: ABR_PLANKTON_NAMES.planktonGameObject,
                method: ABR_PLANKTON_NAMES.onAdFailedToLoad,
                value: "banner"
            });
            done();
        };

        sut.preloadAd(FBInstantSDKTestFailMock.getMockAdAsync("999"), "banner")
            .subscribe({
                next: noop,
                error: onAdPreloadFailed
            });
    });
});