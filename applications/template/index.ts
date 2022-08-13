import "reflect-metadata";
import './fbapp-config.json';
import {TestModule} from "./src/test/container";
import {Ninja} from "./src/test/classes";
import {Container} from "inversify";
import {UnityModule} from "./src/unity/unity.module";
import {UnityService} from "./src/unity/unity.service";
import {IUnityInstance} from "./src/unity/unity.types";
import Facebook from "./src/facebook/facebook";

export const PLANKTON_GAME_OBJECT_NAME = "Plankton";

const container = new Container();
container.load(new TestModule());
container.load(new UnityModule());
const ninja = container.get(Ninja);
console.log(ninja.sneak())
console.log(ninja.fight())


export const facebook = Facebook.getSingletonInstance();
declare var unity: IUnityInstance;
export let unityEngine: IUnityInstance;

export function onUnityInitiated(): void {
    // await unity;
    unity = unityEngine;
    console.log(unity);
    console.log(unityEngine);
    const unity1 = container.get(UnityService);
    console.log(unity1)
    unity1.sendMessage("lol", "lol");
}
