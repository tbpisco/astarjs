import { MapView } from '../views/MapView';
import { PathFinding } from '../utils/PathFinding';
import { Node } from '../models/Node';
import { MapModel } from '../models/MapModel';
import { Title } from '../components/Title';
import { Instructions } from '../components/Instructions';
import { GameStateManager } from '../states/GameStateManager';
import Button from '../components/Button';

export class AppController {

    private size : number = 40;
    private mapCol : number = 14;
    private mapRow : number = 8;
    private mapPaddingTopBottom : number = this.size * 5;
    private mapPaddingLeftRight : number = this.size * 2;

    private gameStateManager : GameStateManager;

    private mapView : MapView = new MapView(this.size);
    private resources : any;
    private domElement : HTMLDivElement;
    private app : PIXI.Application; 

    private randomMode : boolean = false;

    private map : MapModel;

    private listPath: Node[];

    public instructions:Instructions;
    public buttonDone:Button;
    public buttonRandom:Button;
    public buttonReset:Button;

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
        
        this.gameStateManager = new GameStateManager(this);
        this.mapView.setState(this.gameStateManager);
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

        this.instructions = new Instructions(this.gameStateManager.currentState.instructions, width - this.mapPaddingLeftRight);
        this.instructions.x = this.mapPaddingLeftRight/2;
        this.instructions.y = title.height;
        this.app.stage.addChild(this.instructions);

        this.buttonDone = new Button(380, this.instructions.y + this.instructions.height + 15 , 100, 20);
        this.buttonDone.setText("DONE");
        this.buttonDone.clicked = this.onDoneClicked.bind(this);
        
        this.buttonRandom = new Button(310, this.instructions.y + this.instructions.height + 15 , 100, 20);
        this.buttonRandom.setText("RANDOM");
        this.buttonRandom.clicked = this.onRandomClicked.bind(this);
        this.app.stage.addChild(this.buttonRandom);

        this.buttonReset = new Button(310, this.instructions.y + this.instructions.height + 15 , 100, 20);
        this.buttonReset.setText("RESET");
        this.buttonReset.clicked = this.onResetClicked.bind(this);
    }

    buildView(){
        this.buttonDone.x = 310;
        this.app.stage.addChild(this.buttonDone);
        this.app.stage.removeChild(this.buttonRandom);
    }

    removeButtonView(){
        this.app.stage.removeChild(this.buttonDone);
        this.app.stage.removeChild(this.buttonRandom);
    }

    resetView(){
        this.app.stage.addChild(this.buttonReset);
    }

    onResetClicked(){
        this.gameStateManager.update();
        this.app.stage.removeChild(this.buttonDone);
        this.app.stage.removeChild(this.buttonReset);
        this.app.stage.addChild(this.buttonRandom);

        this.randomMode = false;
        this.generateMap();
    }

    generateMap(){
        this.map = new MapModel(this.mapCol, this.mapRow, this.randomMode);
        this.mapView.setMap(this.map);
        this.map.get().forEach((elementRow, indexRow) => {
            elementRow.forEach((elementCol, indexCol) => {
                let tile = this.mapView.tiles.get(`${indexCol}-${indexRow}`);
                tile.type = elementCol;
                tile.update();
                if(this.randomMode)tile.disable();
            })
        })
    }

    onDoneClicked(){
        this.gameStateManager.update();
       // this.app.stage.removeChild(this.buttonRandom);
        //this.app.stage.removeChild(this.buttonDone);
        this.mapView.setState(this.gameStateManager);
    }

    updateInstructions(value:string){
        this.instructions.text = value;
    }

    onRandomClicked(){
        this.randomMode = true;
        this.generateMap();
        this.gameStateManager.update("random");
        //this.findPath();
    }

    findPath(){
       let bestPath = PathFinding.find(this.map);
       if(bestPath)this.showResult(bestPath, this.createPath);
    }

    showResult(node:Node, func: Function){
        let currentNode = node;
        this.listPath = [];
        while(currentNode){
            func.apply(this, [currentNode]);
            currentNode = currentNode.getParent();
            if(!currentNode)this.showNodes(this.listPath);
        }
    }

    createPath(node:Node){
        this.listPath.push(node);
    }

    showNodes(listPath:Node[]){
        listPath.map((node, index) => {
            let nodeParent = node.getParent();
            if(!nodeParent)return;
            this.mapView.highlightRectangule(listPath.length, index, node.getRow(), node.getCol(),
                                             nodeParent.getRow(), nodeParent.getCol());
        })
    }

}