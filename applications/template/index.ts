import './fbapp-config.json';
import Facebook from "./src/facebook/facebook";

export const facebook = Facebook.getSingletonInstance();
