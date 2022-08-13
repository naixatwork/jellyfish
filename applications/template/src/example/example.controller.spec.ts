import {ExampleController} from "./example.controller";
import {createTestingModule} from "../shared/create-testing-module.function";
import {ExampleModule} from "./example.module";

describe("todo-controller", () => {
    let sut: ExampleController;

    beforeEach(() => {
        const moduleRef = createTestingModule(ExampleModule);
        sut = moduleRef.get(ExampleController);
    })

    test("is defined", () => {
        expect(sut).toBeDefined();
    })

    test("creates a todo item",async () => {
        // arrange

        // act
        const todo = await sut.store()
        // assert
        expect(todo).toEqual({});
    })
})