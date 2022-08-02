// @ts-ignore
// import {mergeInto, LibraryManager} from 'myGameInstance';

export function letGo () {
    console.log('dastan')
}

export function showAd() {
    console.log('showing ads')
}

// @ts-ignore
mergeInto(LibraryManager.library, {
    Hello: showAd,
    letGo: letGo,
});