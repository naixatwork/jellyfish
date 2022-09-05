interface IUnityInstance {
    SendMessage: (gameObject: string, method: string, value?: string) => void;
}

export const ABR_PLANKTON_NAMES = {
    planktonGameObject: "Plankton",
    onAdLoaded: "OnAdLoaded",
    onAdFailedToLoad: "OnAdFailedToLoad",
    onAdShowed: "OnAdShowed",
    onAdFailedToShow: "OnAdFailedToShow"
};

const UNITY_SERVICE_IDENTIFIERS = {
    unityService: Symbol("unityService"),
};

export {IUnityInstance, UNITY_SERVICE_IDENTIFIERS};