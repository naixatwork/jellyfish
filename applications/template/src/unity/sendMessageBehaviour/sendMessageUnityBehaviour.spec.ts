import {SendMessageUnityBehaviour} from "./sendMessageUnityBehaviour";
import {IUnityInstance} from "../unity.types";

describe("SendMessageUnityBehaviour", () => {
    class UnityInstanceMock implements IUnityInstance {
        public static hasSendMessageCalled = false;
        SendMessage(gameObject: string, method: string, value: string | undefined): void {
            UnityInstanceMock.hasSendMessageCalled = true;
        }
    }

    let sut: SendMessageUnityBehaviour;

    beforeEach(() => {
       sut = new SendMessageUnityBehaviour(new UnityInstanceMock());
    });

    test("it should be defined and be instance of SendMessageUnityBehaviour", () => {
       expect(sut).toBeDefined();
       expect(sut).toBeInstanceOf(SendMessageUnityBehaviour);
    });

    test("it should call SendMessage() from unityInstance", () => {
        sut.sendMessage("test", "test", "test");

        expect(UnityInstanceMock.hasSendMessageCalled).toBeTruthy();
    });
});