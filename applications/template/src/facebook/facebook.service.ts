import {inject, injectable} from "inversify";
import {AdContainerService, adTypes} from "./ad/ad.container.service";
import {FACEBOOK_SERVICE_IDENTIFIERS, IFBInstantSDK} from "./facebook.type";
import {concatMap, delay, from, of} from "rxjs";

@injectable()
export class FacebookService {
    constructor(
        @inject(FACEBOOK_SERVICE_IDENTIFIERS.FacebookSDK) private readonly fbInstant: IFBInstantSDK,
        private readonly adContainerService: AdContainerService
    ) {
        const afterInitialization = () => {
            this.mockLoadingProgress();
        };

        fbInstant.initializeAsync().then(afterInitialization);
    }

    private mockLoadingProgress(): void {
        const progressWithDelay = from([2,13,26,32,56,71,90,100])
            .pipe(
                concatMap(progress => of(progress).pipe(delay(100)))
            );

        progressWithDelay
            .subscribe({
                next: (progress) => {
                    console.log(progress);
                    this.fbInstant.setLoadingProgress(progress);
                    if (progress >= 100) {
                        this.startGame();
                    }
                }
            });
    }

    private startGame(): void {
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