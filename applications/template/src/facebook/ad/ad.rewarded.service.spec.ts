import {Container} from "inversify";
import {createTestingModule} from "../../shared/create-testing-module.function";
import {FacebookModule} from "../facebook.module";
import {UnityModule} from "../../unity/unity.module";
import {FACEBOOK_SERVICE_IDENTIFIERS} from "../facebook.type";
import {AdRewardedService} from "./ad.rewarded.service";

describe("AdRewardedService", () => {
    let sut: AdRewardedService;
    let moduleRef: Container;

    beforeEach(() => {
        moduleRef = createTestingModule(FacebookModule, UnityModule);
        sut = moduleRef.get(FACEBOOK_SERVICE_IDENTIFIERS.adRewardedService);
    });

    test("it should be defined", () => {
        expect(sut).toBeDefined();
        expect(sut).toBeInstanceOf(AdRewardedService);
    });

    test("it should have rewarded as adType", () => {
        expect(sut.adType()).toEqual("rewarded");
    });

    test("it should return getRewardedVideoAsync() from fbInstant SDK on fbInstantSDKPreloadAdFunction()", () => {
        pending();
    });
});