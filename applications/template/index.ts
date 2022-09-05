import "reflect-metadata";
import './fbapp-config.json';
import {Container} from "inversify";
import {IUnityInstance, UNITY_SERVICE_IDENTIFIERS} from "./src/unity/unity.types";
import {FACEBOOK_SERVICE_IDENTIFIERS, IFBInstantSDK} from "./src/facebook/facebook.type";
import {FacebookService} from "./src/facebook/facebook.service";
import {UnityService} from "./src/unity/unity.service";
import {BehaviorSubject, Subject} from "rxjs";
import {FacebookModule} from "./src/facebook/facebook.module";
import {UnityModule} from "./src/unity/unity.module";
import {SendMessageUnityBehaviour} from "./src/unity/sendMessageBehaviour/sendMessageUnityBehaviour";

declare let FBInstant: IFBInstantSDK; // comes from facebook instant SDK

// todo: create app.module.ts and move the container creating logic there
export const container = new Container({skipBaseClassChecks: true});

container.load(new UnityModule(), new FacebookModule());
container.rebind<IFBInstantSDK>(FACEBOOK_SERVICE_IDENTIFIERS.FacebookSDK).toConstantValue(FBInstant);
// eslint-disable-next-line prefer-const
export const facebook = container.get<FacebookService>(FACEBOOK_SERVICE_IDENTIFIERS.facebookService);
export const unityService = container.get<UnityService>(UNITY_SERVICE_IDENTIFIERS.unityService);

export const onUnityLoadProgress$ = new BehaviorSubject<number>(0);

onUnityLoadProgress$.subscribe((progress) => {
    facebook.setLoadProgress(progress);
});

export const onUnityInitiated$ = new Subject<IUnityInstance>()
    .pipe();

onUnityInitiated$.subscribe((unityInstance: IUnityInstance) => {
    unityService.changeSendMessageBehaviour(new SendMessageUnityBehaviour(unityInstance));
    facebook.setLoadProgress(1.0);
    facebook.startGame();
});