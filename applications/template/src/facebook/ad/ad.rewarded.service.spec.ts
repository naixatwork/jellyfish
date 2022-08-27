import {Container, injectable} from "inversify";
import {createTestingModule} from "../../shared/create-testing-module.function";
import {FacebookModule} from "../facebook.module";
import {UnityModule} from "../../unity/unity.module";
import {IUnityInstance, UNITY_SERVICE_IDENTIFIERS} from "../../unity/unity.types";
import {FACEBOOK_SERVICE_IDENTIFIERS} from "../facebook.type";
import {AdRewardedService} from "./ad.rewarded.service";

describe("AdRewardedService", () => {
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

    let sut: AdRewardedService;
    let moduleRef: Container;

    beforeEach(() => {
        moduleRef = createTestingModule(FacebookModule, UnityModule);
        moduleRef.rebind(UNITY_SERVICE_IDENTIFIERS.unityInstance).to(UnityInstanceMock);
        sut = moduleRef.get(FACEBOOK_SERVICE_IDENTIFIERS.adRewardedService);
    });

    afterEach(() => {
        UnityInstanceMock.logStack = [];
    });

    test("it should be defined", () => {
        expect(sut).toBeDefined();
    });
});