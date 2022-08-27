import {createTestingModule} from "../../../shared/create-testing-module.function";
import {FacebookAdMock, FacebookModule} from "../../facebook.module";
import {UnityModule} from "../../../unity/unity.module";
import {LoadNullBehaviour} from "./ad.loadNullBehaviour";
import {FACEBOOK_SERVICE_IDENTIFIERS} from "../../facebook.type";
import {Observable} from "rxjs";

describe("PreloadNullBehaviour", () => {
    let sut: LoadNullBehaviour;

    beforeEach(() => {
        const moduleRef = createTestingModule(FacebookModule, UnityModule);
        sut = moduleRef.get(FACEBOOK_SERVICE_IDENTIFIERS.loadNullBehaviour);
    });

    test("it should be defined", () => {
        expect(sut).toBeDefined();
    });

    test("it should return a Observable<FacebookAdMock> instance on preloadAd()", async () => {
        const adMock = await sut.preloadAd(Promise.resolve(new FacebookAdMock()), "interstitial");
        expect(adMock).toBeDefined();
        expect(adMock).toBeInstanceOf(Observable<FacebookAdMock>);
    });
});