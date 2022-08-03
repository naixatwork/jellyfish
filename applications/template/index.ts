import './fbapp-config.json';

declare var FBInstant: {
    initializeAsync(): Promise<void>
};

const program = () => {
    console.log(JSON.stringify(FBInstant))

    setTimeout(() => {
        FBInstant.initializeAsync().then(afterInitialization);
        console.log(JSON.stringify(FBInstant))
    }, 1000)
}

const afterInitialization = () => {
    console.log(FBInstant)
}

program();