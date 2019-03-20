System.register(["../views/MapView", "../utils/PathFinding", "../models/MapModel", "../components/Title", "../components/Instructions", "../states/GameStateManager", "../components/Button"], function (exports_1, context_1) {
    "use strict";
    var MapView_1, PathFinding_1, MapModel_1, Title_1, Instructions_1, GameStateManager_1, Button_1, AppController;
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
            function (GameStateManager_1_1) {
                GameStateManager_1 = GameStateManager_1_1;
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
                    this.gameStateManager = new GameStateManager_1.GameStateManager(this);
                    this.mapView.setState(this.gameStateManager);
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
                    this.instructions = new Instructions_1.Instructions(this.gameStateManager.currentState.instructions, width - this.mapPaddingLeftRight);
                    this.instructions.x = this.mapPaddingLeftRight / 2;
                    this.instructions.y = title.height;
                    this.app.stage.addChild(this.instructions);
                    this.buttonDone = new Button_1.default(380, this.instructions.y + this.instructions.height + 15, 100, 20);
                    this.buttonDone.setText("DONE");
                    this.buttonDone.clicked = this.onDoneClicked.bind(this);
                    this.buttonRandom = new Button_1.default(310, this.instructions.y + this.instructions.height + 15, 100, 20);
                    this.buttonRandom.setText("RANDOM");
                    this.buttonRandom.clicked = this.onRandomClicked.bind(this);
                    this.app.stage.addChild(this.buttonRandom);
                    this.buttonReset = new Button_1.default(310, this.instructions.y + this.instructions.height + 15, 100, 20);
                    this.buttonReset.setText("RESET");
                    this.buttonReset.clicked = this.onResetClicked.bind(this);
                }
                buildView() {
                    this.buttonDone.x = 310;
                    this.app.stage.addChild(this.buttonDone);
                    this.app.stage.removeChild(this.buttonRandom);
                }
                removeButtonView() {
                    this.app.stage.removeChild(this.buttonDone);
                    this.app.stage.removeChild(this.buttonRandom);
                }
                resetView() {
                    this.app.stage.addChild(this.buttonReset);
                }
                onResetClicked() {
                    this.gameStateManager.update();
                    this.app.stage.removeChild(this.buttonDone);
                    this.app.stage.removeChild(this.buttonReset);
                    this.app.stage.addChild(this.buttonRandom);
                    this.randomMode = false;
                    this.generateMap();
                }
                generateMap() {
                    this.map = new MapModel_1.MapModel(this.mapCol, this.mapRow, this.randomMode);
                    this.mapView.setMap(this.map);
                    this.map.get().forEach((elementRow, indexRow) => {
                        elementRow.forEach((elementCol, indexCol) => {
                            let tile = this.mapView.tiles.get(`${indexCol}-${indexRow}`);
                            tile.type = elementCol;
                            tile.update();
                            if (this.randomMode)
                                tile.disable();
                            else
                                tile.enable();
                        });
                    });
                }
                onDoneClicked() {
                    this.gameStateManager.update();
                    this.mapView.setState(this.gameStateManager);
                }
                updateInstructions(value) {
                    this.instructions.text = value;
                }
                onRandomClicked() {
                    this.randomMode = true;
                    this.generateMap();
                    this.gameStateManager.update("random");
                }
                findPath() {
                    let bestPath = PathFinding_1.PathFinding.find(this.map);
                    if (bestPath)
                        this.showResult(bestPath, this.createPath);
                }
                showResult(node, func) {
                    let currentNode = node;
                    this.listPath = [];
                    while (currentNode) {
                        func.apply(this, [currentNode]);
                        currentNode = currentNode.getParent();
                        if (!currentNode)
                            this.showNodes(this.listPath);
                    }
                }
                createPath(node) {
                    this.listPath.push(node);
                }
                showNodes(listPath) {
                    listPath.map((node, index) => {
                        let nodeParent = node.getParent();
                        if (!nodeParent)
                            return;
                        this.mapView.highlightRectangule(listPath.length, index, node.getRow(), node.getCol(), nodeParent.getRow(), nodeParent.getCol());
                    });
                }
            };
            exports_1("AppController", AppController);
        }
    };
});
