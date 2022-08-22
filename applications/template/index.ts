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

declare var FBInstant: IFBInstantSDK; // comes from Facebook SDK
// declare var unity: IUnityInstance; // instantiates after unity engine has loaded

// todo: create app.module.ts and move the container creating logic there
export const container = new Container({skipBaseClassChecks: true});
export let facebook: FacebookService;
export let unityService: UnityService;

container.load(new UnityModule());
container.load(new FacebookModule());
// container.rebind<IFBInstantSDK>(FACEBOOK_SERVICE_IDENTIFIERS.fbInstantSDK).toConstantValue(FBInstant);
// facebook = container.get<FacebookService>(FACEBOOK_SERVICE_IDENTIFIERS.facebookService);

// export function onUnityInitiated(): void {
//     container.rebind<IUnityInstance>(UNITY_SERVICE_IDENTIFIERS.unityInstance).toConstantValue(unity);
//     container.rebind<IFBInstantSDK>(FACEBOOK_SERVICE_IDENTIFIERS.fbInstantSDK).toConstantValue(FBInstant);
//     facebook = container.get(FACEBOOK_SERVICE_IDENTIFIERS.facebookService);
//     unityService = container.get(UnityService);
// }

export const $onUnityInitiated = new Subject<IUnityInstance>()
    .pipe(first());

$onUnityInitiated.subscribe((unity: IUnityInstance) => {
    container.rebind<IUnityInstance>(UNITY_SERVICE_IDENTIFIERS.unityInstance).toConstantValue(unity);
    container.rebind<IFBInstantSDK>(FACEBOOK_SERVICE_IDENTIFIERS.fbInstantSDK).toConstantValue(FBInstant);
    facebook = container.get(FACEBOOK_SERVICE_IDENTIFIERS.facebookService);
    unityService = container.get(UnityService);
});