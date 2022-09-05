import {UnityService} from "./unity.service";
import {createTestingModule} from "../shared/create-testing-module.function";
import {UnityModule} from "./unity.module";
import {IUnityInstance, UNITY_SERVICE_IDENTIFIERS} from "./unity.types";

class UnityInstanceMock implements IUnityInstance {
    public static hasBeenCalled = false;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    SendMessage(gameObject: string, method: string, value?: string): void {
        UnityInstanceMock.hasBeenCalled = true;
    }
}

describe("unity.service", () => {
    let sut: UnityService;

    beforeEach(() => {
        const moduleRef = createTestingModule(UnityModule);
        moduleRef.rebind<IUnityInstance>(UNITY_SERVICE_IDENTIFIERS.unityInstance).toConstantValue(new UnityInstanceMock());
        sut = moduleRef.get(UNITY_SERVICE_IDENTIFIERS.unityService);
    });

    test("it should be defined", () => {
        expect(sut).toBeDefined();
    });

    test("it should call UnityInstance's SendMessage method", () => {
        sut.sendMessage("test", "test", "test");
        expect(UnityInstanceMock.hasBeenCalled).toBeTruthy();
    });
});