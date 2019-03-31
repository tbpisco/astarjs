import { GameStateManager } from "./GameStateManager";
import { End } from "./End";

export class Start implements State {

    public instructions : string = "Select start position";
    public stateType : string = "GameState.START";
    public gameStateManager : GameStateManager;

    constructor(state : GameStateManager){
        this.gameStateManager = state;
        this.gameStateManager.controller.removeButtonView();
    }

    update(){
        this.gameStateManager.change(new End(this.gameStateManager));
    }
}