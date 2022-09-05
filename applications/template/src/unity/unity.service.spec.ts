import {UnityService} from "./unity.service";
import {createTestingModule} from "../shared/create-testing-module.function";
import {UnityModule} from "./unity.module";
import {UNITY_SERVICE_IDENTIFIERS} from "./unity.types";

describe("unity.service", () => {
    let sut: UnityService;

    beforeEach(() => {
        const moduleRef = createTestingModule(UnityModule);
        sut = moduleRef.get(UNITY_SERVICE_IDENTIFIERS.unityService);
    });

    test("it should be defined", () => {
        expect(sut).toBeDefined();
    });
});