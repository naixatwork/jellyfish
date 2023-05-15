import "reflect-metadata";
import './fbapp-config.json';
import {Container} from "inversify";
import {IUnityInstance, UNITY_SERVICE_IDENTIFIERS} from "./src/unity/unity.types";
import {FACEBOOK_SERVICE_IDENTIFIERS, IFBInstantSDK} from "./src/facebook/facebook.type";
import {FacebookService} from "./src/facebook/facebook.service";
import {UnityService} from "./src/unity/unity.service";
import {BehaviorSubject, first, Subject} from "rxjs";
import {FacebookModule} from "./src/facebook/facebook.module";
import {UnityModule} from "./src/unity/unity.module";
import {SendMessageUnityBehaviour} from "./src/unity/sendMessageBehaviour/sendMessageUnityBehaviour";
import {WebComponentModule} from "./src/web-component/web-component.module";
import {DrawerComponent} from "./src/web-component/drawer/drawer.component";
import {WEB_COMPONENTS_IDENTIFIERS} from "./src/web-component/web-component.type";

declare let FBInstant: IFBInstantSDK; // comes from facebook instant SDK

// todo: create app.module.ts and move the container creating logic there
export const container = new Container({skipBaseClassChecks: true});

container.load(new WebComponentModule());
console.log({container})
console.log(container.get<DrawerComponent>(WEB_COMPONENTS_IDENTIFIERS.drawer));
// container.rebind<IFBInstantSDK>(FACEBOOK_SERVICE_IDENTIFIERS.FacebookSDK).toConstantValue(FBInstant);
// export const facebook = container.get<FacebookService>(FACEBOOK_SERVICE_IDENTIFIERS.facebookService);
// export const unityService = container.get<UnityService>(UNITY_SERVICE_IDENTIFIERS.unityService);
//
// export const onUnityLoadProgress$ = new BehaviorSubject<number>(0)
//     .pipe();
//
// onUnityLoadProgress$.subscribe((progress) => {
//     facebook.setLoadProgress(progress);
// });
//
// // todo: this should also wait for  FacebookService -> fbInstant.initializeAsync().then()
// export const onUnityInitiated$ = new Subject<IUnityInstance>()
//     .pipe(first());
//
// // todo: clean code
// onUnityInitiated$.subscribe((unityInstance: IUnityInstance) => {
//     unityService.changeSendMessageBehaviour(new SendMessageUnityBehaviour(unityInstance));
//     facebook.setLoadProgress(1.0);
//     facebook.startGame();
// });