import "reflect-metadata";
import './fbapp-config.json';
import {Container} from "inversify";
import {UnityModule} from "./src/unity/unity.module";
import {IUnityInstance, UNITY_SERVICE_IDENTIFIERS} from "./src/unity/unity.types";
import {FacebookModule} from './src/facebook/facebook.module';
import {FacebookService} from "./src/facebook/facebook.service";

declare var FBInstant: unknown; // comes from Facebook SDK
declare var unity: IUnityInstance; // instantiates after unity engine has loaded

export const PLANKTON_GAME_OBJECT_NAME = "Plankton";
export let container = new Container();
export let facebook: FacebookService;

container.load(new UnityModule());
container.load(new FacebookModule());

export function onUnityInitiated(): void {
    container.rebind<IUnityInstance>(UNITY_SERVICE_IDENTIFIERS.unityInstance).toConstantValue(unity);
    container.rebind("fbInstant").toConstantValue(FBInstant);
    facebook = container.get(FacebookService);
}