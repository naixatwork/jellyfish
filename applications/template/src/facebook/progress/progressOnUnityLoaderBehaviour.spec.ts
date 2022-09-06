import {ProgressOnUnityLoaderBehaviour} from "./progressOnUnityLoaderBehaviour";
import {createTestingModule} from "../../shared/create-testing-module.function";
import {UnityModule} from "../../unity/unity.module";
import {FacebookModule, FBInstantSDKMock} from "../facebook.module";
import {FACEBOOK_SERVICE_IDENTIFIERS} from "../facebook.type";

describe("ProgressOnUnityLoaderBehaviour", () => {

    class FBInstantSDKTestMock extends FBInstantSDKMock {
        public static hasSetLoadingProgressCalled = false;
        setLoadingProgress(percentage: number) {
            FBInstantSDKTestMock.hasSetLoadingProgressCalled = true;
            super.setLoadingProgress(percentage);
        }
    }

    let sut: ProgressOnUnityLoaderBehaviour;

    beforeEach(() => {
        const moduleRef = createTestingModule(FacebookModule, UnityModule);
        moduleRef.rebind(FACEBOOK_SERVICE_IDENTIFIERS.FacebookSDK).to(FBInstantSDKTestMock);
        sut = moduleRef.get(FACEBOOK_SERVICE_IDENTIFIERS.progressOnUnityLoaderBehaviour);
    });

    test("it should be defined and instance of ProgressOnUnityLoaderBehaviour", () => {
       expect(sut).toBeDefined();
       expect(sut).toBeInstanceOf(ProgressOnUnityLoaderBehaviour);
    });

    test("it should setLoadingProgress() from fbInstantSDK", () => {
        sut.setProgress(1);

        expect(FBInstantSDKTestMock.hasSetLoadingProgressCalled).toBeTruthy();
    });
});