interface IUnityInstance {
    SendMessage: (gameObject: string, method: string, value: string) => void;
}

export const PLANKTON_GAME_OBJECT_NAME = "Plankton";

const UNITY_SERVICE_IDENTIFIERS = {
    unityInstance: Symbol.for("unityInstance"),
}

export {IUnityInstance, UNITY_SERVICE_IDENTIFIERS}