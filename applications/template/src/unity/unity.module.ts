import {ContainerModule} from "inversify";
import {UnityService} from "./unity.service";
import {IUnityInstance} from "./unity.types";

class UnityInstanceMock implements IUnityInstance {
    SendMessage(gameObject: string, method: string, value: string): void {
        console.log(`[UnityInstanceMock]: ${gameObject} ${method} ${value}`);
    }
}

export class UnityModule extends ContainerModule {
    public constructor() {
        super(bind => {
            bind(UnityService).toSelf();
            // todo: create a symbol for this serviceIdentifier
            bind("unityInstance").toConstantValue(new UnityInstanceMock())
        });
    }
}