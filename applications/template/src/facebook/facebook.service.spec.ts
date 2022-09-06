import {FacebookService} from "./facebook.service";
import {createTestingModule} from "../shared/create-testing-module.function";
import {FacebookModule, FBInstantSDKMock} from "./facebook.module";
import {UnityModule} from "../unity/unity.module";
import {FACEBOOK_SERVICE_IDENTIFIERS} from "./facebook.type";
import {ProgressOnUnityLoaderBehaviour} from "./progress/progressOnUnityLoaderBehaviour";

describe("FacebookService", () => {
    class FBInstantSDKTestMock extends FBInstantSDKMock {
        public static hasStartGameAsyncCalled = false;

        override startGameAsync(): Promise<any> {
            FBInstantSDKTestMock.hasStartGameAsyncCalled = true;
            return super.startGameAsync();
        }
    }

    let sut: FacebookService;

    beforeEach(() => {
        const moduleRef = createTestingModule(FacebookModule, UnityModule);
        moduleRef.rebind(FACEBOOK_SERVICE_IDENTIFIERS.FacebookSDK).to(FBInstantSDKTestMock);
        sut = moduleRef.get(FACEBOOK_SERVICE_IDENTIFIERS.facebookService);
    });

    afterEach(() => {
        FBInstantSDKTestMock.hasStartGameAsyncCalled = false;
    });

    test("it should be defined and be an instance of FacebookService", () => {
        expect(sut).toBeDefined();
        expect(sut).toBeInstanceOf(FacebookService);
    });

    test("it should change progressBehaviour to progressOnUnityLoaderBehaviour after fbInstantSDK.initializeAsync() resolves", () => {
        expect(sut.progressBehaviour).toBeInstanceOf(ProgressOnUnityLoaderBehaviour);
    });

    test("it should call fbInstant.startGameAsync() on startGame()", () => {
        sut.startGame();

        expect(FBInstantSDKTestMock.hasStartGameAsyncCalled).toBeTruthy();
    });
});