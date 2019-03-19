import { GameState } from "./GameState";

export class PathEnd implements State {

    public instructions : string = "done!";
    public stateType : string = "GameState.PATHEND";
    public gameState : GameState;

    constructor(state : GameState){
        this.gameState = state;
    }

    update(){
    }
}