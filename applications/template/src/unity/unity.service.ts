import {inject, injectable} from "inversify";
import {IUnityInstance} from "./unity.types";


@injectable()
export class UnityService {
    constructor(@inject("unityInstance") private readonly unityInstance: IUnityInstance) {
        console.log(this.unityInstance)
    }

    public sendMessage(gameObject: string, method: string, value?: any): void {
        this.unityInstance.sendMessage(gameObject, method, value);
    }
}