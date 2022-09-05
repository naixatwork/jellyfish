import {IProgressBehaviour} from "./progressBehaviour.type";
import {inject, injectable} from "inversify";
import {FACEBOOK_SERVICE_IDENTIFIERS, IFBInstantSDK} from "../facebook.type";

@injectable()
export class ProgressOnUnityLoaderBehaviour implements IProgressBehaviour {
    progressPercentage = 0;

    constructor(
        @inject(FACEBOOK_SERVICE_IDENTIFIERS.FacebookSDK) private readonly fbInstantSDK: IFBInstantSDK
    ) {
    }

    setProgress(progress: number): void {
        const progressPercentage = progress * 100;
        const roundedProgressPercentage = Math.ceil(progressPercentage);
        this.fbInstantSDK.setLoadingProgress(roundedProgressPercentage);
        this.progressPercentage = roundedProgressPercentage;
        console.log(`[ProgressOnUnityLoaderBehaviour]: ${roundedProgressPercentage}`);
    }
}