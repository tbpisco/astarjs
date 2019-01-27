System.register(["../views/MapView", "../utils/PathFinding", "../models/MapModel", "../components/Title", "../components/Instructions", "../states/GameState", "../components/Button"], function (exports_1, context_1) {
    "use strict";
    var MapView_1, PathFinding_1, MapModel_1, Title_1, Instructions_1, GameState_1, Button_1, AppController;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (MapView_1_1) {
                MapView_1 = MapView_1_1;
            },
            function (PathFinding_1_1) {
                PathFinding_1 = PathFinding_1_1;
            },
            function (MapModel_1_1) {
                MapModel_1 = MapModel_1_1;
            },
            function (Title_1_1) {
                Title_1 = Title_1_1;
            },
            function (Instructions_1_1) {
                Instructions_1 = Instructions_1_1;
            },
            function (GameState_1_1) {
                GameState_1 = GameState_1_1;
            },
            function (Button_1_1) {
                Button_1 = Button_1_1;
            }
        ],
        execute: function () {
            AppController = class AppController {
                constructor() {
                    this.size = 40;
                    this.mapCol = 14;
                    this.mapRow = 8;
                    this.mapPaddingTopBottom = this.size * 5;
                    this.mapPaddingLeftRight = this.size * 2;
                    this.mapView = new MapView_1.MapView(this.size);
                    this.randomMode = false;
                    const loader = new PIXI.loaders.Loader();
                    loader.add("tile-set", "../images/tile-set_01.png")
                        .load(this.setup.bind(this));
                }
                setup(loader, res) {
                    this.resources = res["tile-set"];
                    let width = this.size * this.mapCol + this.mapPaddingLeftRight;
                    let height = this.size * this.mapRow + this.mapPaddingTopBottom;
                    this.init(width, height);
                    this.gameState = new GameState_1.GameState();
                    this.setupView(width, height);
                }
                init(width, height) {
                    this.app = new PIXI.Application(width, height, { antialias: true, transparent: true });
                    let domElement = document.body.querySelector("#map");
                    if (domElement)
                        this.domElement = domElement;
                    this.domElement.appendChild(this.app.view);
                }
                setupView(width, height) {
                    this.map = new MapModel_1.MapModel(this.mapCol, this.mapRow, this.randomMode);
                    if (this.randomMode)
                        this.mapView.disableTiles();
                    let mapViewContainer = this.mapView.createStage(this.map, this.resources);
                    mapViewContainer.x = this.mapPaddingLeftRight / 2;
                    mapViewContainer.y = this.mapPaddingTopBottom / 5 * 4;
                    this.app.stage.addChild(mapViewContainer);
                    let title = new Title_1.Title("Path Finding", width);
                    title.x = ((width) - title.width) / 2;
                    title.y = 0;
                    this.app.stage.addChild(title);
                    let instructions = new Instructions_1.Instructions(this.gameState.currentState.instructions, width - this.mapPaddingLeftRight);
                    instructions.x = this.mapPaddingLeftRight / 2;
                    instructions.y = title.height;
                    this.app.stage.addChild(instructions);
                    let buttonDone = new Button_1.default(380, instructions.y + instructions.height + 15, 100, 20);
                    buttonDone.setText("DONE");
                    buttonDone.clicked = this.onDoneClicked.bind(this);
                    this.app.stage.addChild(buttonDone);
                    let buttonRandom = new Button_1.default(250, instructions.y + instructions.height + 15, 100, 20);
                    buttonRandom.setText("RANDOM");
                    buttonRandom.clicked = this.onRandomClicked.bind(this);
                    this.app.stage.addChild(buttonRandom);
                }
                onDoneClicked() {
                    alert("done!");
                }
                onRandomClicked() {
                    this.randomMode = true;
                    this.map = new MapModel_1.MapModel(this.mapCol, this.mapRow, this.randomMode);
                    this.map.get().forEach((elementRow, indexRow) => {
                        elementRow.forEach((elementCol, indexCol) => {
                            let tile = this.mapView.tiles.get(`${indexCol}-${indexRow}`);
                            tile.type = elementCol;
                            tile.update();
                            tile.disable();
                        });
                    });
                    this.findPath();
                }
                findPath() {
                    let bestPath = PathFinding_1.PathFinding.find(this.map);
                    if (bestPath)
                        this.showResult(bestPath, this.showNodes);
                }
                showResult(node, draw) {
                    let currentNode = node;
                    while (currentNode) {
                        draw.apply(this, [currentNode]);
                        currentNode = currentNode.getParent();
                    }
                }
                showNodes(node) {
                    let nodeParent = node.getParent();
                    this.mapView.highlightRectangule(node.getRow(), node.getCol(), nodeParent.getRow(), nodeParent.getCol());
                }
            };
            exports_1("AppController", AppController);
        }
    };
});
