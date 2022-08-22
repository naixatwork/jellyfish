export interface IAdHideBehaviour {
    hideAd(): void;
}

export class HideNullBehaviour implements IAdHideBehaviour {
    hideAd(): void {}
}