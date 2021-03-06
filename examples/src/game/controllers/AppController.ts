import { MapView } from '../views/MapView';
import { PathFinding, Heuristic } from '../../../../src/';
import { MapModel } from '../models/MapModel';
import { Title } from '../components/Title';
import { Instructions } from '../components/Instructions';
import { GameStateManager } from '../states/GameStateManager';
import Button from '../components/Button';
import { TILE } from '../views/Tile';
import Application = PIXI.Application;
import Loader = PIXI.loaders.Loader;
import { SettingsMenu } from '../components/SettingsMenu';

export class AppController {

    private size : number = 40;
    private mapCol : number = 14;
    private mapRow : number = 8;
    private mapPaddingTopBottom : number = this.size * 5;
    private mapPaddingLeftRight : number = this.size * 2;

    private gameStateManager : GameStateManager;
    private pathFindingManager : PathFinding;

    private mapView : MapView = new MapView(this.size);
    private resources : any;
    private domElement : HTMLDivElement;
    private app : Application;

    private randomMode : boolean = false;

    private map : MapModel;

    public instructions:Instructions;
    public buttonDone:Button;
    public buttonRandom:Button;
    public buttonReset:Button;
    public settingsMenu: SettingsMenu;

    constructor(){

        const loader = new Loader();
        loader.add("tile-set","../images/tile-set_01.png")
              .load(this.setup.bind(this));

    }

    setup(loader: Loader, res : any){

        this.resources = res["tile-set"];

        let width = this.size*this.mapCol + this.mapPaddingLeftRight;
        let height = this.size*this.mapRow + this.mapPaddingTopBottom;

        this.init(width, height);
        
        this.gameStateManager = new GameStateManager(this);
        this.mapView.setState(this.gameStateManager);
        this.setupView(width, height);
    }

    init(width : number, height : number){ 

        this.app = new Application(width, height, { antialias: true , transparent: true});

        let domElement = document.body.querySelector("#map");
        if(domElement)this.domElement = domElement as HTMLDivElement;
        this.domElement.appendChild(this.app.view);
    }

    setupView(width : number, height : number){

        this.map = new MapModel(this.mapCol, this.mapRow, this.randomMode);

        this.mapView.createStage(this.map, this.resources);
        this.mapView.x = this.mapPaddingLeftRight/2;
        this.mapView.y = this.mapPaddingTopBottom/5 * 4;
        this.app.stage.addChild(this.mapView);

        let title = new Title("PATHFINDING", width);
        title.x = (width - title.width)*0.5;
        title.y = 0;
        this.app.stage.addChild(title);

        this.instructions = new Instructions(this.gameStateManager.currentState.instructions, width - this.mapPaddingLeftRight);
        this.instructions.x = this.mapPaddingLeftRight*0.5;
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

        this.settingsMenu = new SettingsMenu();
        this.settingsMenu.x = 130;
        this.settingsMenu.y = 510;
        this.app.stage.addChild(this.settingsMenu);
        
    }

    buildView(){
        this.buttonDone.x = 310;
        this.app.stage.addChild(this.buttonDone);
        this.buttonRandom.reset();
        this.app.stage.removeChild(this.buttonRandom);
    }

    removeButtonView(){
        this.buttonDone.reset();
        this.buttonRandom.reset();
        this.app.stage.removeChild(this.buttonDone);
        this.app.stage.removeChild(this.buttonRandom);
    }

    resetView(){
        this.app.stage.addChild(this.buttonReset);
    }

    onResetClicked(){
        this.mapView.clearTimeoutList();
        this.gameStateManager.update();
        this.buttonDone.reset();
        this.buttonReset.reset();
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
                        else tile.enable();
            })
        })
    }

    onDoneClicked(){
        this.gameStateManager.update();
        this.mapView.setState(this.gameStateManager);
    }

    updateInstructions(value:string){
        this.instructions.text = value;
    }

    onRandomClicked(){
        this.randomMode = true;
        this.generateMap();
        this.gameStateManager.update("random");
    }

    findPath(){
        let heuristic:Heuristic;
        let allowDiagonal:boolean = false;
        switch(this.settingsMenu.selectedMode){
            case "manhattan":
                heuristic = Heuristic.MANHATTAN;
            break;
            case "diagonal":
                heuristic = Heuristic.DIAGONAL;
            break;
            case "allDiagonals":
                heuristic = Heuristic.DIAGONAL;
                allowDiagonal = true;
            break;
            default:
                heuristic = Heuristic.MANHATTAN;
        }
        
        this.pathFindingManager = new PathFinding({heuristic,allowDiagonal});
        this.pathFindingManager.setWalkable(
            {type: TILE.GREEN, weight:0},
            {type: TILE.GRASS, weight:2}).setEnd(TILE.END).setStart(TILE.START);
        let bestPath: {col:number,row:number}[] = this.pathFindingManager.find(this.map.get());
        if(bestPath.length > 0)this.showNodes(bestPath);
    }

    showNodes(listPath:{col:number, row:number}[]){
        let nodeParent;
        listPath.forEach((node, index) => {
            nodeParent = listPath[index+1];
            if(!nodeParent)return;
            this.mapView.highlightRectangule(index, node.row, node.col,
                                             nodeParent.row, nodeParent.col);
        })
    }

}