import {ContainerModule} from "inversify";
import {ExampleController} from "./example.controller";

export class ExampleModule extends ContainerModule {
    public constructor() {
        super(bind => {
            bind(ExampleController).toSelf()
        });
    }
}