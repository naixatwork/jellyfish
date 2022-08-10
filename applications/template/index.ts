import './fbapp-config.json';
import Facebook from "./src/facebook/facebook";

export const facebook = Facebook.getSingletonInstance();

declare var unity: any;

console.log(unity);

export function onUnityInitiated(): void {
    console.log(unity);
}