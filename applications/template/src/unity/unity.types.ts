interface IUnityInstance {
    SendMessage: (gameObject: string, method: string, value: string) => void;
}

const UNITY_SERVICE_IDENTIFIERS = {
    unityInstance: Symbol.for("unityInstance"),
}

export {IUnityInstance, UNITY_SERVICE_IDENTIFIERS}