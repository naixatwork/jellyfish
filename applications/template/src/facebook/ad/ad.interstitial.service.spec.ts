import {AdInterstitialService} from "./ad.interstitial.service";
import {createTestingModule} from "../../shared/create-testing-module.function";
import {FacebookModule} from "../facebook.module";
import {UnityModule} from "../../unity/unity.module";

describe("AdInterstitialService", () => {
    let sut: AdInterstitialService;

    beforeEach(() => {
        const moduleRef = createTestingModule(FacebookModule);
        moduleRef.load(new UnityModule());
        sut = moduleRef.get(AdInterstitialService);
    });

    test("it should be defined", () => {
        expect(sut).toBeDefined();
    })
});