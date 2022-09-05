import {injectable, interfaces} from "inversify";
import {ABR_PLANKTON_NAMES, IUnityInstance} from "../../../unity/unity.types";
import {ShowAdAsyncBehaviour} from "./ad.showAsyncBehaviour";
import {createTestingModule} from "../../../shared/create-testing-module.function";
import {FacebookAdMock, FacebookModule} from "../../facebook.module";
import {UnityModule} from "../../../unity/unity.module";
import {FACEBOOK_SERVICE_IDENTIFIERS} from "../../facebook.type";
import {IFacebookAd} from "../ad.type";
import _ from "lodash";
import {adTypes} from "../ad.container.service";
import Container = interfaces.Container;

describe("ShowAdAsyncBehaviour", () => {
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
        public static hasShowAsyncCalled = false;

        override showAsync(): Promise<IFacebookAd> {
            TestAdMock.hasShowAsyncCalled = true;
            return super.showAsync();
        }
    }

    let sut: ShowAdAsyncBehaviour;
    let moduleRef: Container;

    beforeEach(() => {
        moduleRef = createTestingModule(FacebookModule, UnityModule);
        sut = moduleRef.get(FACEBOOK_SERVICE_IDENTIFIERS.showAdAsyncBehaviour);
    });

    afterEach(() => {
        UnityInstanceMock.logStack = [];
        TestAdMock.hasShowAsyncCalled = false;
    });

    test("it should be defined and be an instance of ShowAdAsyncBehaviour", () => {
        expect(sut).toBeDefined();
        expect(sut).toBeInstanceOf(ShowAdAsyncBehaviour);
    });

    test("it should call ad's showAsync() on showAd()", async () => {
        await sut.showAd(new TestAdMock(), "interstitial");

        expect(TestAdMock.hasShowAsyncCalled).toBeTruthy();
    });

    test("it should send OnAdShowed message to unity if showAd() resolves successfully", async () => {
        await sut.showAd(new TestAdMock(), "interstitial");
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

    test("it should send OnAdFailedToShow message to unity if showAd() receives an undefined ad instance", async () => {
        // for testing purposes
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const mockAd = null as FacebookAdMock;
        const adTypeSeed = Math.random().toString() as adTypes;

        await sut.showAd(mockAd, adTypeSeed);

        expect(mockAd).toBeNull();
        expect(_.last(UnityInstanceMock.logStack)).toEqual({
            gameObject: ABR_PLANKTON_NAMES.planktonGameObject,
            method: ABR_PLANKTON_NAMES.onAdFailedToShow,
            value: JSON.stringify({
                format: adTypeSeed,
                network: "facebook",
                response_id: "0"
            })
        });
    });

    test("it should send OnAdFailedToShow to unity if showAd() fails to resolve", async () => {
        class TestAdMock extends FacebookAdMock {
            override showAsync(): Promise<IFacebookAd> {
                return Promise.reject("for testing purposes");
            }
        }
        const adTypeSeed = Math.random().toString() as adTypes;

        await sut.showAd(new TestAdMock(), adTypeSeed);

        expect(_.last(UnityInstanceMock.logStack)).toEqual({
            gameObject: ABR_PLANKTON_NAMES.planktonGameObject,
            method: ABR_PLANKTON_NAMES.onAdFailedToShow,
            value: JSON.stringify({
                format: adTypeSeed,
                network: "facebook",
                response_id: "0"
            })
        });
    });
});