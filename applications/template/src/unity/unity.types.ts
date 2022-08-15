export interface IUnityInstance {
    sendMessage: (gameObject: string, method: string, value: string) => void;
}