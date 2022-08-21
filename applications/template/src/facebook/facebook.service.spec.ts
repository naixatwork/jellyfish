import {FacebookService} from "./facebook.service";
import {createTestingModule} from "../shared/create-testing-module.function";
import {FacebookModule} from "./facebook.module";
import {UnityModule} from "../unity/unity.module";

describe("FacebookService", () => {
    let sut: FacebookService;

    beforeEach(() => {
        const moduleRef = createTestingModule(FacebookModule, UnityModule);
        sut = moduleRef.get(FacebookService);
    });

    test("it should be defined", () => {
        expect(sut).toBeDefined();
    })
})