import {FacebookAdMock} from "../facebook.module";
import {IFacebookAd} from "./ad.type";
import {first, from, Observable, of, switchMap, tap} from "rxjs";
import {injectable} from "inversify";
import {UnityService} from "../../unity/unity.service";
import {ABR_PLANKTON_NAMES} from "../../unity/unity.types";
import {adTypes} from "./ad.container.service";

export interface IAdPreloadBehaviour {
    preloadAd(asyncPreloadFunction: Promise<IFacebookAd>, adType: adTypes): Observable<IFacebookAd>;
}

export class PreloadNullBehaviour implements IAdPreloadBehaviour {
    preloadAd(asyncPreloadFunction: Promise<IFacebookAd>, adType: adTypes): Observable<IFacebookAd> {
        return of(new FacebookAdMock());
    }
}

@injectable()
export class PreloadBehaviour implements IAdPreloadBehaviour {
    constructor(
        private readonly unityService: UnityService
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
                switchMap((adInstance) => adInstance.loadAsync()),
                tap({
                    next: onAdPreloaded,
                    error: onAdFailedToPreload
                }),
            );
    }
}
