import { GameState } from "./GameState";
import { End } from "./End";

export class Start implements State {

    public instructions : string = "Select start position";
    public stateType : string = "GameState.START";
    public gameState : GameState;

    constructor(state : GameState){
        this.gameState = state;
    }

    update(){
        this.gameState.change(new End(this.gameState));
    }
}