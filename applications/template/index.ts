import "reflect-metadata";
import './fbapp-config.json';
import {TestModule} from "./src/test/container";
import {Ninja} from "./src/test/classes";
import {Container} from "inversify";
import {UnityModule} from "./src/unity/unity.module";
import {UnityService} from "./src/unity/unity.service";
import {IUnityInstance} from "./src/unity/unity.types";
import {Unity} from "./src/unity/unity.class";
import {FacebookModule} from "./src/facebookModule/facebook.module";
import {FacebookService} from "./src/facebookModule/facebook.service";

export const PLANKTON_GAME_OBJECT_NAME = "Plankton";

export let facebook: FacebookService;
declare var unity: IUnityInstance;
export let unityEngine: any;

declare var FBInstant: unknown;

export let container = new Container();

container.load(new TestModule());
container.load(new UnityModule());
container.load(new FacebookModule());

export function onUnityInitiated(): void {
    unityEngine = new Unity(unity);
    container.rebind<IUnityInstance>("unityInstance").toConstantValue(unity);
    container.rebind("fbInstant").toConstantValue(FBInstant);
    const ninja = container.get(Ninja);
    console.log(ninja.sneak())
    const unity1 = container.get(UnityService);
    unity1.sendMessage("lol", "lol");
    facebook = container.get(FacebookService);
}