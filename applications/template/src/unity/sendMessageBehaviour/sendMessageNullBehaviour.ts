import {ISendMessageBehaviour} from "./sendMessageBehaviour.type";

export class SendMessageNullBehaviour implements ISendMessageBehaviour {
    sendMessage(gameObject: string, method: string, value?: string): void {
        console.log(`[SendMessageNullBehaviour]: ${gameObject} ${method} ${value}`);
    }
}