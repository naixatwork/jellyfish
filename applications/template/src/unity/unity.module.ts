import {ContainerModule} from "inversify";
import {UnityService} from "./unity.service";
import {UNITY_SERVICE_IDENTIFIERS} from "./unity.types";

export class UnityModule extends ContainerModule {
    public constructor() {
        super(bind => {
            bind(UNITY_SERVICE_IDENTIFIERS.unityService).to(UnityService).inSingletonScope();
        });
    }
}