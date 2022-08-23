import {AdInterstitialService} from "./ad.interstitial.service";
import {createTestingModule} from "../../shared/create-testing-module.function";
import {FacebookAdMock, FacebookModule} from "../facebook.module";
import {UnityModule} from "../../unity/unity.module";
import {IUnityInstance, PLANKTON_GAME_OBJECT_NAME, UNITY_SERVICE_IDENTIFIERS} from "../../unity/unity.types";

class UnityInstanceMock implements IUnityInstance {
    public static logStack: {
        gameObject: string,
        method: string,
        value: string
    }[] = [];

    SendMessage(gameObject: string, method: string, value: string): void {
        UnityInstanceMock.logStack.push({
            gameObject,
            method,
            value
        });
        console.log(`[UnityInstanceMock]: ${gameObject} ${method} ${value}`);
    }
}

describe("AdInterstitialService", () => {
    let sut: AdInterstitialService;

    beforeEach(() => {
        const moduleRef = createTestingModule(FacebookModule, UnityModule);
        moduleRef.rebind(UNITY_SERVICE_IDENTIFIERS.unityInstance).toConstantValue(new UnityInstanceMock())
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
        expect(UnityInstanceMock.logStack[0]).toEqual({
            gameObject: PLANKTON_GAME_OBJECT_NAME,
            method: "OnAdLoaded",
            value: "interstitial"
        })
    });
});