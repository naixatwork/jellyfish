import {Container, injectable} from "inversify";
import {IUnityInstance, UNITY_SERVICE_IDENTIFIERS} from "../../unity/unity.types";
import {createTestingModule} from "../../shared/create-testing-module.function";
import {FacebookModule} from "../facebook.module";
import {UnityModule} from "../../unity/unity.module";
import {FACEBOOK_SERVICE_IDENTIFIERS} from "../facebook.type";
import {AdRewardedInterstitialService} from "./ad.rewardedInterstitial.service";

describe("AdRewardedInterstitialService", () => {
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

    let sut: AdRewardedInterstitialService;
    let moduleRef: Container;

    beforeEach(() => {
        moduleRef = createTestingModule(FacebookModule, UnityModule);
        sut = moduleRef.get(FACEBOOK_SERVICE_IDENTIFIERS.adRewardedInterstitialService);
    });

    afterEach(() => {
        UnityInstanceMock.logStack = [];
    });

    test("it should be an instance of AdRewardedInterstitialService and defined", () => {
        expect(sut).toBeDefined();
        expect(sut).toBeInstanceOf(AdRewardedInterstitialService);
    });

    test("it should return getRewardedInterstitialAsync() from fbInstant SDK on fbInstantSDKPreloadAdFunction()", () => {
        pending();
    });
});