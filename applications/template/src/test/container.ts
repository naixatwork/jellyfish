import {ContainerModule} from "inversify";
import {Katana, Ninja, Shuriken} from "./classes";

export class TestModule extends ContainerModule {
    public constructor() {
        super((bind) => {
            bind(Ninja).toSelf(),
            bind(Katana).toSelf(),
            bind(Shuriken).toSelf()
        });
    }
}