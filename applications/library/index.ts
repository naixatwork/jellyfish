declare const FBInstant: any;

function Hello() {
    console.log(FBInstant);
}

// @ts-ignore
mergeInto(LibraryManager.library, {
    Hello
});