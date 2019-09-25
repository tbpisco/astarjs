import { GameStateManager } from "./GameStateManager";
import { Initial } from "./Initial";
import {State} from './State';

export class PathEnd implements State {

    public instructions : string = "done!";
    public stateType : string = "GameState.PATHEND";
    public gameStateManager : GameStateManager;

    constructor(state : GameStateManager){
        this.gameStateManager = state;
        this.gameStateManager.controller.findPath();
        this.gameStateManager.controller.resetView();
        this.gameStateManager.controller.removeButtonView();
    }

    update(){
        this.gameStateManager.change(new Initial(this.gameStateManager));
    }
}