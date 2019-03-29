interface State {

    readonly instructions: string;
    readonly stateType: string;

    update(type?:string): void;
}