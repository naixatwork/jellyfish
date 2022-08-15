export class Unity {
    constructor(private readonly unityInstance: any) {
    }

    public sendMessage(gameObject: string, method: string, value?: any): void {
        this.unityInstance.SendMessage(gameObject, method, value);
    }
}