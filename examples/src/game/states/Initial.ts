import { GameStateManager } from "./GameStateManager";
import { Build } from "./Build";
import { PathEnd } from "./PathEnd";
import {State} from './State';

export class Initial implements State {

    public instructions : string = "To create your own map CLICK on the SQUARES or switch to RANDOM mode.";
    public stateType : string = "GameState.BUILD";
    public gameStateManager : GameStateManager;

    constructor(state : GameStateManager){
        this.gameStateManager = state;
    }

    update(type:string){

        if(type == "random"){
            this.gameStateManager.change(new PathEnd(this.gameStateManager));
        } else {
            this.gameStateManager.change(new Build(this.gameStateManager));
        }
    }
}