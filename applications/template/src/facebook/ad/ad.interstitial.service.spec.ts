import {AdInterstitialService} from "./ad.interstitial.service";
import {createTestingModule} from "../../shared/create-testing-module.function";
import {FacebookModule} from "../facebook.module";
import {UnityModule} from "../../unity/unity.module";
import {Container} from "inversify";

describe("AdInterstitialService", () => {
    let sut: AdInterstitialService;
    let moduleRef: Container;

    beforeEach(() => {
        moduleRef = createTestingModule(FacebookModule, UnityModule);
        sut = moduleRef.get(AdInterstitialService);
    });

    test("it should be defined", () => {
        expect(sut).toBeDefined();
        expect(sut).toBeInstanceOf(AdInterstitialService);
    });

    test("it should have interstitial as adType", () => {
       expect(sut.adType()).toEqual("interstitial");
    });
});