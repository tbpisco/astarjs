import { GameState } from "./GameState";
import { PathEnd } from "./PathEnd";

export class End implements State {

    public instructions : string = "Select end position";
    public stateType : string = "GameState.END";
    public gameState : GameState;

    constructor(state : GameState){
        this.gameState = state;
    }

    update(){
        this.gameState.change(new PathEnd(this.gameState));
    }
}