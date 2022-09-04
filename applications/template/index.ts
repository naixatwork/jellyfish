import "reflect-metadata";
import './fbapp-config.json';
import {Container} from "inversify";
import {UnityModule} from "./src/unity/unity.module";
import {IUnityInstance, UNITY_SERVICE_IDENTIFIERS} from "./src/unity/unity.types";
import {FacebookModule} from './src/facebook/facebook.module';
import {FACEBOOK_SERVICE_IDENTIFIERS, IFBInstantSDK} from "./src/facebook/facebook.type";
import {FacebookService} from "./src/facebook/facebook.service";
import {UnityService} from "./src/unity/unity.service";
import {BehaviorSubject, first, Subject} from "rxjs";

declare let FBInstant: IFBInstantSDK; // comes from Facebook SDK

// todo: create app.module.ts and move the container creating logic there
export const container = new Container({skipBaseClassChecks: true});
export let facebook: FacebookService;
export let unityService: UnityService;

container.load(new UnityModule());
container.load(new FacebookModule());
container.rebind<IFBInstantSDK>(FACEBOOK_SERVICE_IDENTIFIERS.FacebookSDK).toConstantValue(FBInstant);
// eslint-disable-next-line prefer-const
facebook = container.get(FACEBOOK_SERVICE_IDENTIFIERS.facebookService);

export const onUnityLoadProgress$ = new BehaviorSubject<number>(0);

onUnityLoadProgress$.subscribe((progress) => {
    facebook.setLoadProgress(progress);
});

export const $onUnityInitiated = new Subject<IUnityInstance>()
    .pipe(first());

$onUnityInitiated.subscribe((unity: IUnityInstance) => {
    container.rebind<IUnityInstance>(UNITY_SERVICE_IDENTIFIERS.unityInstance).toConstantValue(unity);
    container.rebind<IFBInstantSDK>(FACEBOOK_SERVICE_IDENTIFIERS.FacebookSDK).toConstantValue(FBInstant);
    container.rebind(FACEBOOK_SERVICE_IDENTIFIERS.facebookService).to(FacebookService).inSingletonScope();
    // facebook = container.get(FACEBOOK_SERVICE_IDENTIFIERS.facebookService);
    unityService = container.get(UnityService);
    facebook.setLoadProgress(1.0);
    facebook.startGame();
});