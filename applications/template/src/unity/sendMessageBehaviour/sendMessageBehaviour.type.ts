export interface ISendMessageBehaviour {
    sendMessage(gameObject: string, method: string, value?: string): void;
}