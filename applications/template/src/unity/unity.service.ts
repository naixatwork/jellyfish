import {inject, injectable} from "inversify";
import {IUnityInstance, UNITY_SERVICE_IDENTIFIERS} from "./unity.types";


@injectable()
export class UnityService {
    constructor(@inject(UNITY_SERVICE_IDENTIFIERS.unityInstance) private readonly unityInstance: IUnityInstance) {
        console.log(unityInstance)
    }

    public sendMessage(gameObject: string, method: string, value?: any): void {
        this.unityInstance.SendMessage(gameObject, method, value);
    }
}