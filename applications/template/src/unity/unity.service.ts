import {inject, injectable} from "inversify";
import {IUnityInstance, UNITY_SERVICE_IDENTIFIERS} from "./unity.types";


@injectable()
export class UnityService {
    constructor(@inject(UNITY_SERVICE_IDENTIFIERS.unityInstance) private readonly unityInstance: IUnityInstance) {}

    public sendMessage(gameObject: string, method: string, value?: string): void {
        this.unityInstance.SendMessage(gameObject, method, value);
    }
}