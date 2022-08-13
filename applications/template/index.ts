import "reflect-metadata";
import './fbapp-config.json';
import {TestModule} from "./src/test/container";
import {Ninja} from "./src/test/classes";
import {Container} from "inversify";

export const PLANKTON_GAME_OBJECT_NAME = "Plankton";

// export const facebook = Facebook.getSingletonInstance();
export let unityEngine: any;
//
// declare var unity: any;
//
// export function onUnityInitiated(): void {
//     console.log(unity);
//     unityEngine = new Unity(unity);
//     console.log(unityEngine);
// }

// export const ninja = testContainer.resolve(Ninja);
// export const weapon = testContainer.get<Weapon>(TYPES.Weapon);
// export const ninja = testContainer.get<Warrior>(TYPES.Warrior);
const container = new Container();
container.load(new TestModule())
const ninja = container.get(Ninja);
console.log(ninja.sneak())
console.log(ninja.fight())