import { Build } from "./Build";

export class GameState {

    public currentState : State = new Build(this);

    constructor(){

    }

    change( state : State ){

        this.currentState = state;
        this.currentState
    }

    start(){

        this.currentState.update();

    }
}