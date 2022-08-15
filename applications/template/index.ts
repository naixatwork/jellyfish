import "reflect-metadata";
import './fbapp-config.json';
import {TestModule} from "./src/test/container";
import {Ninja} from "./src/test/classes";
import {Container} from "inversify";
import {UnityModule} from "./src/unity/unity.module";
import {UnityService} from "./src/unity/unity.service";
import {IUnityInstance} from "./src/unity/unity.types";
import Facebook from "./src/facebook/facebook";
import {Unity} from "./src/unity/unity.class";

export const PLANKTON_GAME_OBJECT_NAME = "Plankton";

export const container = new Container();
container.load(new TestModule());
container.load(new UnityModule());
const ninja = container.get(Ninja);


export const facebook = Facebook.getSingletonInstance();
declare var unity: IUnityInstance;
export let unityEngine: any;

export function onUnityInitiated(): void {
    unityEngine = new Unity(unity);
    container.rebind<IUnityInstance>("unityInstance").toConstantValue(unity)
    const unity1 = container.get(UnityService);
    unity1.sendMessage("lol", "lol");
}