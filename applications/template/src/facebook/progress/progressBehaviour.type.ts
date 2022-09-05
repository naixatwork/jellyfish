export interface IProgressBehaviour {
    progressPercentage: number;
    setProgress(progress: number): void;
}