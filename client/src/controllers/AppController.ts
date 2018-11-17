import { MapView } from '../views/MapView';
import { PathFinding } from '../utils/PathFinding';
import { Node } from '../models/Node';
import { Map } from '../models/Map';
import { Title } from '../views/Title';
import { Instructions } from '../views/Instructions';
import { GameState } from '../states/GameState';

export class AppController {

    private size : number = 40;
    private mapCol : number = 14;
    private mapRow : number = 8;
    private mapPaddingTopBottom : number = this.size * 5;
    private mapPaddingLeftRight : number = this.size * 2;

    private gameState : GameState;

    private mapView : MapView = new MapView(this.size);
    private resources : any;
    private domElement : HTMLDivElement;
    private app : PIXI.Application; 

    private randomMode : boolean = false;

    private map : Map;

    constructor(){

        const loader = new PIXI.loaders.Loader();
        loader.add("tile-set","../images/tile-set.png")
              .load(this.setup.bind(this));

       //let bestPath = PathFinding.find(this.map);
       //if(bestPath)this.showResult(bestPath, this.showNodes);

       

    }

    setup(loader: PIXI.loaders.Loader, res : any){

        this.resources = res["tile-set"];

        let width = this.size*this.mapCol + this.mapPaddingLeftRight;
        let height = this.size*this.mapRow + this.mapPaddingTopBottom;

        this.init(width, height);
        
        this.gameState = new GameState();

        this.setupView(width, height);
    }

    init(width : number, height : number){ 

        this.app = new PIXI.Application(width, height, 
                        { antialias: true , transparent: true});

        let domElement = document.body.querySelector("#map");
        if(domElement)this.domElement = domElement as HTMLDivElement;
        this.domElement.appendChild(this.app.view);
    }

    setupView(width : number, height : number){

        this.map = new Map(this.mapCol, this.mapRow, this.randomMode);
        if(this.randomMode)this.mapView.disableTiles();

        let mapViewContainer = this.mapView.createStage(this.map, this.resources);
        mapViewContainer.x = this.mapPaddingLeftRight/2;
        mapViewContainer.y = this.mapPaddingTopBottom/5 * 4;
        this.app.stage.addChild(mapViewContainer);

        let title = new Title("PathFinding", width);
        title.x = (( width ) - title.width)/2;
        title.y = 0;
        this.app.stage.addChild(title);

        let instructions = new Instructions(this.gameState.currentState.instructions, width - this.mapPaddingLeftRight);
        instructions.x = this.mapPaddingLeftRight/2;
        instructions.y = title.height;
        this.app.stage.addChild(instructions);

    }

    showResult(node:Node, draw: Function){

        let currentNode = node;
        while(currentNode){
            draw.apply(this, [currentNode]);
            currentNode = currentNode.getParent();
        }

    }

    showNodes(node:Node){

        this.mapView.highlightRectangule(node.getRow(), node.getCol());

    }

}