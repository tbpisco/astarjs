import { MapView } from '../views/MapView';
import { PathFinding } from '../utils/PathFinding';
import { Node } from '../models/Node';
import { MapModel } from '../models/MapModel';
import { Title } from '../components/Title';
import { Instructions } from '../components/Instructions';
import { GameState } from '../states/GameState';
import Button from '../components/Button';

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

    private map : MapModel;

    constructor(){

        const loader = new PIXI.loaders.Loader();
        loader.add("tile-set","../images/tile-set_01.png")
              .load(this.setup.bind(this));

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

        this.map = new MapModel(this.mapCol, this.mapRow, this.randomMode);
        if(this.randomMode)this.mapView.disableTiles();

        let mapViewContainer = this.mapView.createStage(this.map, this.resources);
        mapViewContainer.x = this.mapPaddingLeftRight/2;
        mapViewContainer.y = this.mapPaddingTopBottom/5 * 4;
        this.app.stage.addChild(mapViewContainer);

        let title = new Title("Path Finding", width);
        title.x = (( width ) - title.width)/2;
        title.y = 0;
        this.app.stage.addChild(title);

        let instructions = new Instructions(this.gameState.currentState.instructions, width - this.mapPaddingLeftRight);
        instructions.x = this.mapPaddingLeftRight/2;
        instructions.y = title.height;
        this.app.stage.addChild(instructions);

        let buttonDone = new Button(380, instructions.y + instructions.height + 15 , 100, 20);
        buttonDone.setText("DONE");
        buttonDone.clicked = this.onDoneClicked.bind(this);
        this.app.stage.addChild(buttonDone);

        let buttonRandom = new Button(250, instructions.y + instructions.height + 15 , 100, 20);
        buttonRandom.setText("RANDOM");
        buttonRandom.clicked = this.onRandomClicked.bind(this);
        this.app.stage.addChild(buttonRandom);
    }

    onDoneClicked(){
        alert("done!")
    }

    onRandomClicked(){
        this.randomMode = true;
        this.map = new MapModel(this.mapCol, this.mapRow, this.randomMode);
        this.map.get().forEach((elementRow, indexRow) => {
            elementRow.forEach((elementCol, indexCol) => {
                let tile = this.mapView.tiles.get(`${indexCol}-${indexRow}`);
                tile.type = elementCol;
                tile.update();
                tile.disable();
            })
        })
        this.findPath();
    }

    findPath(){
       let bestPath = PathFinding.find(this.map);
       if(bestPath)this.showResult(bestPath, this.showNodes);
    }

    showResult(node:Node, draw: Function){
        let currentNode = node;
        while(currentNode){
            draw.apply(this, [currentNode]);
            currentNode = currentNode.getParent();
        }
    }

    showNodes(node:Node){
        let nodeParent = node.getParent();
        this.mapView.highlightRectangule(node.getRow(), node.getCol(),
                                         nodeParent.getRow(), nodeParent.getCol());
    }

}