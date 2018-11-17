import { GameState } from "./GameState";

export class Build implements State {

    public instructions : string = "To create your own map CLICK on the SQUARES or switch to RANDOM mode.";
    public stateType : string = "GameState.BUILD";
    public gameState : GameState;

    constructor(state : GameState){
        this.gameState = state;
    }

    update(){

    }
}