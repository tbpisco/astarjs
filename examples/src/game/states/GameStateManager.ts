import { AppController } from "../controllers/AppController";
import { Initial } from "./Initial";
import { State } from "./State";

export class GameStateManager {

    public currentState : State = new Initial(this);
    private previousState : State[] = [];
    public controller:AppController;

    constructor(controller:AppController){
        this.controller = controller;
    }

    change( state : State ){

        this.previousState.push(this.currentState);
        this.currentState = state;
        this.controller.updateInstructions(this.currentState.instructions);
    }

    start(){

        this.currentState.update();

    }

    update(type?:string){

        this.currentState.update(type);

    }
}