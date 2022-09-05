import {AdBaseService} from "./ad.base.service";
import {adTypes} from "./ad.container.service";
import {injectable, interfaces} from "inversify";
import {HideNullBehaviour} from "./ad.hideBehaviour";
import {LoadNullBehaviour} from "./ad.loadBehaviour.ts/ad.loadNullBehaviour";
import {ShowNullBehaviour} from "./ad.showBehaviour/ad.showNullBehaviour";
import {IFacebookAd} from "./ad.type";
import {FacebookAdMock, FacebookModule} from "../facebook.module";
import {createTestingModule} from "../../shared/create-testing-module.function";
import {UnityModule} from "../../unity/unity.module";
import {IUnityInstance, UNITY_SERVICE_IDENTIFIERS} from "../../unity/unity.types";
import Container = interfaces.Container;


describe("AdBaseService", () => {
    @injectable()
    class UnityInstanceMock implements IUnityInstance {
        public static logStack: {
            gameObject: string,
            method: string,
            value: string
        }[] = [];

        SendMessage(gameObject: string, method: string, value?: string): void {
            UnityInstanceMock.logStack.push({
                gameObject,
                method,
                value: value || ""
            });
        }
    }

    @injectable()
    class AdMockService extends AdBaseService {
        protected _adType: adTypes = "interstitial";
        protected hideAdBehaviour = new HideNullBehaviour();
        protected loadBehaviour = new LoadNullBehaviour();
        protected showBehaviour = new ShowNullBehaviour();

        protected fbInstantSDKPreloadAdFunction(adId: string): Promise<IFacebookAd> {
            return Promise.resolve(new FacebookAdMock());
        }
    }

    let sut: AdMockService;
    let moduleRef: Container;

    beforeEach(() => {
        moduleRef = createTestingModule(FacebookModule, UnityModule);
        moduleRef.bind(AdMockService).toSelf();
        sut = moduleRef.get(AdMockService);
    });

    afterEach(() => {
        UnityInstanceMock.logStack = [];
    });

    test("it should be defined", () => {
        expect(sut).toBeDefined();
        expect(sut).toBeInstanceOf(AdBaseService);
    });

    test(`it should set loaded Ad instance after calling preloadAd()`, async () => {
        await sut.loadAd("999");

        expect(sut.ad).toBeDefined();
        expect(sut.ad).toBeInstanceOf(FacebookAdMock);
    });
});