import {AdInterstitialService} from "./ad.interstitial.service";
import {createTestingModule} from "../../shared/create-testing-module.function";
import {FacebookModule} from "../facebook.module";
import {UnityModule} from "../../unity/unity.module";

describe("AdInterstitialService", () => {
    let sut: AdInterstitialService;

    beforeEach(() => {
        const moduleRef = createTestingModule(FacebookModule, UnityModule);
        sut = moduleRef.get(AdInterstitialService);
    });

    test("it should be defined", () => {
        expect(sut).toBeDefined();
    });

    test("it should return an Ad", async () => {
        console.log(sut.ad)
        await sut.preloadAd("42323");
        expect(sut.ad).toBeDefined();
    });
});