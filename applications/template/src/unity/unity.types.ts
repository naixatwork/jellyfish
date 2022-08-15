export interface IUnityInstance {
    SendMessage: (gameObject: string, method: string, value: string) => void;
}