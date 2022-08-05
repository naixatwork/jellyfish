declare const jellyfish: any; // a global variable that should come from jellyfish template

function Hello() {
    console.log(jellyfish.facebook);
}

// @ts-ignore
mergeInto(LibraryManager.library, {
    Hello
});