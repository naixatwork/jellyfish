import {IProgressBehaviour} from "./progressBehaviour.type";
import {injectable} from "inversify";

@injectable()
export class ProgressNullBehaviour implements IProgressBehaviour {
    progressPercentage = 0;

    setProgress(progress: number): void {
        const progressPercentage = progress * 100;
        const roundedProgressPercentage = Math.ceil(progressPercentage);
        this.progressPercentage = roundedProgressPercentage;
        console.log(`[ProgressNullBehaviour]: ${roundedProgressPercentage}`);
    }
}