import {ContainerModule} from "inversify";
import {DrawerComponent} from "./drawer/drawer.component";
import {WEB_COMPONENTS_IDENTIFIERS} from "./web-component.type";

export class WebComponentModule extends ContainerModule {
    public constructor() {
        super(bind => {
            bind(WEB_COMPONENTS_IDENTIFIERS.drawer).to(DrawerComponent)
        });

    }

}