interface State {

    readonly instructions: string;
    readonly stateType: string;

    update(): void;
}