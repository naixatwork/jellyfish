import './fbapp-config.json';
import Facebook from "./src/facebook/facebook";
import {Unity} from "./src/unity/unity.class";

export const PLANKTON_GAME_OBJECT_NAME = "Plankton";

export const facebook = Facebook.getSingletonInstance();
export let unityEngine: any;

declare var unity: any;

export function onUnityInitiated(): void {
    console.log(unity);
    unityEngine = new Unity(unity);
    console.log(unityEngine);
}