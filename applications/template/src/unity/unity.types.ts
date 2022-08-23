interface IUnityInstance {
    SendMessage: (gameObject: string, method: string, value: string) => void;
}

export const ABR_PLANKTON_NAMES = {
    planktonGameObject: "Plankton",
    onAdLoaded: "OnAdLoaded",
    onAdFailedToLoad: "OnAdFailedToLoad",
}

const UNITY_SERVICE_IDENTIFIERS = {
    unityInstance: Symbol.for("unityInstance"),
}

export {IUnityInstance, UNITY_SERVICE_IDENTIFIERS}