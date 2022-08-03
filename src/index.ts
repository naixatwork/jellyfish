declare const $: object;
declare const FBInstant: object;

const Hello = () => {
  console.log($);
  console.log(FBInstant);
}


// @ts-ignore
mergeInto(LibraryManager.library, {
    Hello
});