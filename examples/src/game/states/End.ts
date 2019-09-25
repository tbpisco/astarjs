import { GameStateManager } from "./GameStateManager";
import { PathEnd } from "./PathEnd";
import {State} from './State';

export class End implements State {

    public instructions : string = "Select end position";
    public stateType : string = "GameState.END";
    public gameStateManager : GameStateManager;

    constructor(state : GameStateManager){
        this.gameStateManager = state;
        this.gameStateManager.controller.removeButtonView();
    }

    update(){
        this.gameStateManager.change(new PathEnd(this.gameStateManager));
    }
}