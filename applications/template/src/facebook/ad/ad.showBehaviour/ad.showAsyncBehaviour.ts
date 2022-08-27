import {inject, injectable} from "inversify";
import {IAdShowBehaviour} from "./ad.showBehaviour.type";
import {FACEBOOK_SERVICE_IDENTIFIERS, IFBInstantSDK} from "../../facebook.type";
import {UnityService} from "../../../unity/unity.service";
import {IFacebookAd} from "../ad.type";
import {ABR_PLANKTON_NAMES} from "../../../unity/unity.types";
import {first, from} from "rxjs";

@injectable()
export class ShowAdAsyncBehaviour implements IAdShowBehaviour {
    constructor(
        @inject(FACEBOOK_SERVICE_IDENTIFIERS.FacebookSDK) protected readonly fbInstant: IFBInstantSDK,
        @inject<UnityService>(UnityService) private readonly unityService: UnityService
    ) {
    }

    public showAd(ad: IFacebookAd): void {
        const callUnityOnAdShowed = (): void => {
            this.unityService.sendMessage(
                ABR_PLANKTON_NAMES.planktonGameObject,
                "OnAdShowed",
                JSON.stringify({
                    format: "interstitial",
                    network: "facebook",
                    response_id: "0"
                }));
        };

        const callUnityOnAdFailedToShow = (): void => {
            this.unityService.sendMessage(
                ABR_PLANKTON_NAMES.planktonGameObject,
                "OnAdFailedToShow",
                JSON.stringify({
                    format: "interstitial",
                    network: "facebook",
                    response_id: "0"
                }));
        };

        if (!ad) {
            callUnityOnAdFailedToShow();
            return;
        }

        from(ad.showAsync())
            .pipe(
                first()
            )
            .subscribe({
                next: callUnityOnAdShowed,
                error: callUnityOnAdFailedToShow
            });
    }
}