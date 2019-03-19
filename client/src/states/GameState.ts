import { Build } from "./Build";
import { AppController } from "../controllers/AppController";
import { PathEnd } from "./PathEnd";

export class GameState {

    public currentState : State = new Build(this);
    private previousState : State[] = [];
    private controller:AppController;

    constructor(controller:AppController){
        this.controller = controller;
    }

    change( state : State ){

        this.previousState.push(this.currentState);
        this.currentState = state;
        this.controller.updateInstructions(this.currentState.instructions);
        if(this.currentState instanceof PathEnd){
             this.controller.findPath();
             this.controller.resetView();
        }
    }

    start(){

        this.currentState.update();

    }

    update(){

        this.currentState.update();

    }
}