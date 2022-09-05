import {ContainerModule} from "inversify";
import {UnityService} from "./unity.service";
import {IUnityInstance, UNITY_SERVICE_IDENTIFIERS} from "./unity.types";

class UnityInstanceMock implements IUnityInstance {
    SendMessage(gameObject: string, method: string, value?: string): void {
        console.log(`[UnityInstanceMock]: ${gameObject} ${method} ${value}`);
    }
}

export class UnityModule extends ContainerModule {
    public constructor() {
        super(bind => {
            bind(UNITY_SERVICE_IDENTIFIERS.unityService).to(UnityService).inSingletonScope();
            // todo: create a symbol for this serviceIdentifier
            bind(UNITY_SERVICE_IDENTIFIERS.unityInstance).toConstantValue(new UnityInstanceMock());
        });
    }
}