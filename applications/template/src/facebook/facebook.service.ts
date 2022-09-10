import {inject, injectable} from "inversify";
import {AdContainerService, adTypes} from "./ad/ad.container.service";
import {FACEBOOK_SERVICE_IDENTIFIERS, IFBInstantSDK} from "./facebook.type";
import {IProgressBehaviour} from "./progress/progressBehaviour.type";
import {ProgressNullBehaviour} from "./progress/progressNullBehaviour";
import {ProgressOnUnityLoaderBehaviour} from "./progress/progressOnUnityLoaderBehaviour";

@injectable()
export class FacebookService {
    private _progressBehaviour: IProgressBehaviour = new ProgressNullBehaviour();
    public get progressBehaviour(): IProgressBehaviour {
        return this._progressBehaviour;
    }

    private set progressBehaviour(newProgressBehaviour) {
        this._progressBehaviour = newProgressBehaviour;
    }

    constructor(
        @inject(FACEBOOK_SERVICE_IDENTIFIERS.FacebookSDK) private readonly fbInstant: IFBInstantSDK,
        @inject(FACEBOOK_SERVICE_IDENTIFIERS.progressOnUnityLoaderBehaviour) private readonly progressOnUnityLoaderBehaviour: ProgressOnUnityLoaderBehaviour,
        @inject(FACEBOOK_SERVICE_IDENTIFIERS.adContainerService) private readonly adContainerService: AdContainerService,
    ) {
        fbInstant.initializeAsync()
            .then(() => {
                this.changeProgressBehaviourToUnityLoader();
            });
    }

    private changeProgressBehaviourToUnityLoader(): void {
        this.progressBehaviour = this.progressOnUnityLoaderBehaviour;
    }

    public setLoadProgress(progress: number): void {
        this.progressBehaviour.setProgress(progress);
    }

    public startGame(): void {
        this.fbInstant.startGameAsync().then();
    }

    public logSupportedAPIs(): void {
        console.log(this.fbInstant.getSupportedAPIs());
    }

    public loadAd(adType: adTypes, adId: string): void {
        this.adContainerService.loadAd(adType, adId);
    }

    public showAd(adType: adTypes): void {
        this.adContainerService.showAd(adType);
    }

    public hideAd(adType: adTypes): void {
        this.adContainerService.hideAd(adType);
    }
}