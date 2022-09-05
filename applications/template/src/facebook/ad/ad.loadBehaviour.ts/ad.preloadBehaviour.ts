import {IFacebookAd} from "../ad.type";
import {first, from, Observable, switchMap, tap} from "rxjs";
import {inject, injectable} from "inversify";
import {UnityService} from "../../../unity/unity.service";
import {ABR_PLANKTON_NAMES, UNITY_SERVICE_IDENTIFIERS} from "../../../unity/unity.types";
import {adTypes} from "../ad.container.service";
import {IAdLoadBehaviour} from "./ad.loadBehaviour.type";

@injectable()
export class PreloadBehaviour implements IAdLoadBehaviour {
    constructor(
        @inject(UNITY_SERVICE_IDENTIFIERS.unityService) private readonly unityService: UnityService
    ) {
    }

    preloadAd(asyncPreloadFunction: Promise<IFacebookAd>, adType: adTypes): Observable<IFacebookAd> {
        const onAdPreloaded = () => {
            const callUnityOnAdLoaded = () => {
                this.unityService.sendMessage(
                    ABR_PLANKTON_NAMES.planktonGameObject,
                    ABR_PLANKTON_NAMES.onAdLoaded,
                    adType);
            };
            callUnityOnAdLoaded();
        };

        const onAdFailedToPreload = (error: Error) => {
            const callUnityOnAdFailedToLoad = () => {
                this.unityService.sendMessage(
                    ABR_PLANKTON_NAMES.planktonGameObject,
                    ABR_PLANKTON_NAMES.onAdFailedToLoad,
                    adType);
            };

            callUnityOnAdFailedToLoad();
            console.error(error);
        };

        return from(asyncPreloadFunction)
            .pipe(
                first(),
                switchMap((adInstance) => from(adInstance.loadAsync())),
                tap({
                    next: onAdPreloaded,
                    error: onAdFailedToPreload
                }),
            );
    }
}
