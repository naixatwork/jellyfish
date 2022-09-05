import {ISendMessageBehaviour} from "./sendMessageBehaviour.type";
import {IUnityInstance} from "../unity.types";

export class SendMessageUnityBehaviour implements ISendMessageBehaviour {
    constructor(private readonly unityInstance: IUnityInstance) {
    }

    // todo: unit tests
    sendMessage(gameObject: string, method: string, value?: string): void {
        this.unityInstance.SendMessage(gameObject, method, value);
    }
}