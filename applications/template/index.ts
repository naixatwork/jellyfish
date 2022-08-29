import "reflect-metadata";
import './fbapp-config.json';
import {Container} from "inversify";
import {UnityModule} from "./src/unity/unity.module";
import {IUnityInstance, UNITY_SERVICE_IDENTIFIERS} from "./src/unity/unity.types";
import {FacebookModule} from './src/facebook/facebook.module';
import {FACEBOOK_SERVICE_IDENTIFIERS, IFBInstantSDK} from "./src/facebook/facebook.type";
import {FacebookService} from "./src/facebook/facebook.service";
import {UnityService} from "./src/unity/unity.service";
import {first, Subject} from "rxjs";

declare let FBInstant: IFBInstantSDK; // comes from Facebook SDK

// todo: create app.module.ts and move the container creating logic there
export const container = new Container({skipBaseClassChecks: true});
export let facebook: FacebookService;
export let unityService: UnityService;

container.load(new UnityModule());
container.load(new FacebookModule());

export const $onUnityInitiated = new Subject<IUnityInstance>()
    .pipe(first());

$onUnityInitiated.subscribe((unity: IUnityInstance) => {
    container.rebind<IUnityInstance>(UNITY_SERVICE_IDENTIFIERS.unityInstance).toConstantValue(unity);
    console.log(container.get(UNITY_SERVICE_IDENTIFIERS.unityInstance));
    container.rebind<IFBInstantSDK>(FACEBOOK_SERVICE_IDENTIFIERS.FacebookSDK).toConstantValue(FBInstant);
    facebook = container.get(FACEBOOK_SERVICE_IDENTIFIERS.facebookService);
    unityService = container.get(UnityService);
});