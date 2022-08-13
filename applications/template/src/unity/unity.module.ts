import {ContainerModule} from "inversify";
import {UnityService} from "./unity.service";
import {unityEngine} from "../../index";

export class UnityModule extends ContainerModule {
    public constructor() {
        super(bind => {
            bind(UnityService).toSelf();
            bind("unityInstance").toConstantValue(unityEngine)
        });
    }
}