import {inject, injectable} from "inversify";
import {IUnityInstance, UNITY_SERVICE_IDENTIFIERS} from "./unity.types";


@injectable()
export class UnityService {
    private sendMessageBehaviour: IUnityInstance = this.unityInstance;

    constructor(
        @inject(UNITY_SERVICE_IDENTIFIERS.unityInstance) private readonly unityInstance: IUnityInstance
    ) {
    }

    public sendMessage(gameObject: string, method: string, value?: string): void {
        this.sendMessageBehaviour.SendMessage(gameObject, method, value);
    }

    public changeSendMessageBehaviour(unityInstance: IUnityInstance): void {
        this.sendMessageBehaviour = unityInstance;
    }
}