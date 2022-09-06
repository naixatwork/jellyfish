import {UnityService} from "./unity.service";
import {createTestingModule} from "../shared/create-testing-module.function";
import {UnityModule} from "./unity.module";
import {UNITY_SERVICE_IDENTIFIERS} from "./unity.types";

describe("UnityService", () => {
    let sut: UnityService;

    beforeEach(() => {
        const moduleRef = createTestingModule(UnityModule);
        sut = moduleRef.get(UNITY_SERVICE_IDENTIFIERS.unityService);
    });

    test("it should be defined and be an instance of UnityService", () => {
        expect(sut).toBeDefined();
        expect(sut).toBeInstanceOf(UnityService);
    });
});