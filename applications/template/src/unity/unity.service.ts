import {inject, injectable} from "inversify";
import {IUnityInstance} from "./unity.types";


@injectable()
export class UnityService {
    constructor(@inject("unityInstance") private readonly unityInstance: IUnityInstance) {
    }

    public sendMessage(gameObject: string, method: string, value?: any): void {
        this.unityInstance.SendMessage(gameObject, method, value);
    }
}