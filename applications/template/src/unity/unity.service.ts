import {injectable} from "inversify";
import {IUnityInstance} from "./unity.types";
import {SendMessageNullBehaviour} from "./sendMessageBehaviour/sendMessageNullBehaviour";
import {ISendMessageBehaviour} from "./sendMessageBehaviour/sendMessageBehaviour.type";


@injectable()
export class UnityService {
    private sendMessageBehaviour: ISendMessageBehaviour = new SendMessageNullBehaviour();

    public sendMessage(gameObject: string, method: string, value?: string): void {
        this.sendMessageBehaviour.sendMessage(gameObject, method, value);
    }

    public changeSendMessageBehaviour(newSendMessageBehaviour: ISendMessageBehaviour): void {
        this.sendMessageBehaviour = newSendMessageBehaviour;
    }
}