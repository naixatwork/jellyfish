import "reflect-metadata";
import './fbapp-config.json';
import {Container} from "inversify";
import {UnityModule} from "./src/unity/unity.module";
import {IUnityInstance, UNITY_SERVICE_IDENTIFIERS} from "./src/unity/unity.types";
import {FacebookModule} from './src/facebook/facebook.module';
import {FACEBOOK_SERVICE_IDENTIFIERS, IFBInstantSDK} from "./src/facebook/facebook.type";
import {FacebookService} from "./src/facebook/facebook.service";

declare var FBInstant: IFBInstantSDK; // comes from Facebook SDK
declare var unity: IUnityInstance; // instantiates after unity engine has loaded


// todo: create app.module.ts and move the container making logic there
export let container = new Container({skipBaseClassChecks: true});
export let facebook: any;

container.load(new UnityModule());
container.load(new FacebookModule());
container.rebind<IFBInstantSDK>(FACEBOOK_SERVICE_IDENTIFIERS.fbInstantSDK).toConstantValue(FBInstant);
facebook = container.get<FacebookService>(FACEBOOK_SERVICE_IDENTIFIERS.facebookService);

export function onUnityInitiated(): void {
    container.rebind<IUnityInstance>(UNITY_SERVICE_IDENTIFIERS.unityInstance).toConstantValue(unity);
    container.rebind<IFBInstantSDK>(FACEBOOK_SERVICE_IDENTIFIERS.fbInstantSDK).toConstantValue(FBInstant);
    facebook = container.get(FACEBOOK_SERVICE_IDENTIFIERS.facebookService)
}