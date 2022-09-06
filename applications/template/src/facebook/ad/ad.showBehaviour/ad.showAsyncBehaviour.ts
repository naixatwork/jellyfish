import {inject, injectable} from "inversify";
import {IAdShowBehaviour} from "./ad.showBehaviour.type";
import {FACEBOOK_SERVICE_IDENTIFIERS, IFBInstantSDK} from "../../facebook.type";
import {UnityService} from "../../../unity/unity.service";
import {IFacebookAd} from "../ad.type";
import {ABR_PLANKTON_NAMES, UNITY_SERVICE_IDENTIFIERS} from "../../../unity/unity.types";
import {first, from} from "rxjs";
import {adTypes} from "../ad.container.service";

@injectable()
export class ShowAdAsyncBehaviour implements IAdShowBehaviour {
    constructor(
        @inject(FACEBOOK_SERVICE_IDENTIFIERS.FacebookSDK) protected readonly fbInstant: IFBInstantSDK,
        @inject(UNITY_SERVICE_IDENTIFIERS.unityService) private readonly unityService: UnityService
    ) {
    }

    public showAd(ad: IFacebookAd, adType: adTypes): void {
        const sendMessageOnAdShowed = (): void => {
            this.unityService.sendMessage(
                ABR_PLANKTON_NAMES.planktonGameObject,
                ABR_PLANKTON_NAMES.onAdShowed,
                JSON.stringify({
                    format: adType,
                    network: "facebook",
                    response_id: "0"
                }));
        };

        const sendMessageOnAdFailedToShow = (): void => {
            this.unityService.sendMessage(
                ABR_PLANKTON_NAMES.planktonGameObject,
                ABR_PLANKTON_NAMES.onAdFailedToShow,
                JSON.stringify({
                    format: adType,
                    network: "facebook",
                    response_id: "0"
                }));
        };

        if (!ad) {
            sendMessageOnAdFailedToShow();
            return;
        }

        from(ad.showAsync())
            .pipe(
                first()
            )
            .subscribe({
                next: sendMessageOnAdShowed,
                error: sendMessageOnAdFailedToShow
            });
    }
}