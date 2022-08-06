import './fbapp-config.json';
import Facebook from "./src/facebook/facebook";
import {InterstitialAdStrategy} from "./src/facebook/ads/ad.Interstitial";

export const facebook = Facebook.getSingletonInstance();
export const interstitialAd = (adId: string): InterstitialAdStrategy => {
    return new InterstitialAdStrategy(facebook.fbInstant, adId);
}