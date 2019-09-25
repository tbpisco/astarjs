"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MapView_1 = require("../views/MapView");
var src_1 = require("../../../../src/");
var MapModel_1 = require("../models/MapModel");
var Title_1 = require("../components/Title");
var Instructions_1 = require("../components/Instructions");
var GameStateManager_1 = require("../states/GameStateManager");
var Button_1 = require("../components/Button");
var Tile_1 = require("../views/Tile");
var AppController = (function () {
    function AppController() {
        this.size = 40;
        this.mapCol = 14;
        this.mapRow = 8;
        this.mapPaddingTopBottom = this.size * 5;
        this.mapPaddingLeftRight = this.size * 2;
        this.mapView = new MapView_1.MapView(this.size);
        this.randomMode = false;
        var loader = new PIXI.loaders.Loader();
        loader.add("tile-set", "../images/tile-set_01.png")
            .load(this.setup.bind(this));
    }
    AppController.prototype.setup = function (loader, res) {
        this.resources = res["tile-set"];
        var width = this.size * this.mapCol + this.mapPaddingLeftRight;
        var height = this.size * this.mapRow + this.mapPaddingTopBottom;
        this.init(width, height);
        this.gameStateManager = new GameStateManager_1.GameStateManager(this);
        this.mapView.setState(this.gameStateManager);
        this.setupView(width, height);
    };
    AppController.prototype.init = function (width, height) {
        this.app = new PIXI.Application(width, height, { antialias: true, transparent: true });
        var domElement = document.body.querySelector("#map");
        if (domElement)
            this.domElement = domElement;
        this.domElement.appendChild(this.app.view);
    };
    AppController.prototype.setupView = function (width, height) {
        this.map = new MapModel_1.MapModel(this.mapCol, this.mapRow, this.randomMode);
        if (this.randomMode)
            this.mapView.disableTiles();
        var mapViewContainer = this.mapView.createStage(this.map, this.resources);
        mapViewContainer.x = this.mapPaddingLeftRight / 2;
        mapViewContainer.y = this.mapPaddingTopBottom / 5 * 4;
        this.app.stage.addChild(mapViewContainer);
        var title = new Title_1.Title("Path Finding", width);
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
    };
    AppController.prototype.buildView = function () {
        this.buttonDone.x = 310;
        this.app.stage.addChild(this.buttonDone);
        this.app.stage.removeChild(this.buttonRandom);
    };
    AppController.prototype.removeButtonView = function () {
        this.app.stage.removeChild(this.buttonDone);
        this.app.stage.removeChild(this.buttonRandom);
    };
    AppController.prototype.resetView = function () {
        this.app.stage.addChild(this.buttonReset);
    };
    AppController.prototype.onResetClicked = function () {
        this.gameStateManager.update();
        this.app.stage.removeChild(this.buttonDone);
        this.app.stage.removeChild(this.buttonReset);
        this.app.stage.addChild(this.buttonRandom);
        this.randomMode = false;
        this.generateMap();
    };
    AppController.prototype.generateMap = function () {
        var _this = this;
        this.map = new MapModel_1.MapModel(this.mapCol, this.mapRow, this.randomMode);
        this.mapView.setMap(this.map);
        this.map.get().forEach(function (elementRow, indexRow) {
            elementRow.forEach(function (elementCol, indexCol) {
                var tile = _this.mapView.tiles.get(indexCol + "-" + indexRow);
                tile.type = elementCol;
                tile.update();
                if (_this.randomMode)
                    tile.disable();
                else
                    tile.enable();
            });
        });
    };
    AppController.prototype.onDoneClicked = function () {
        this.gameStateManager.update();
        this.mapView.setState(this.gameStateManager);
    };
    AppController.prototype.updateInstructions = function (value) {
        this.instructions.text = value;
    };
    AppController.prototype.onRandomClicked = function () {
        this.randomMode = true;
        this.generateMap();
        this.gameStateManager.update("random");
    };
    AppController.prototype.findPath = function () {
        var bestPath = src_1.PathFinding.find(this.gameMapToPathfind(this.map));
        if (bestPath.length > 0)
            this.showNodes(bestPath);
    };
    AppController.prototype.gameMapToPathfind = function (map) {
        return this.map.get().map(function (row) {
            return row.map(function (col) {
                if (col == Tile_1.TILE.END) {
                    return src_1.Types.END;
                }
                else if (col == Tile_1.TILE.START) {
                    return src_1.Types.START;
                }
                else if (col == Tile_1.TILE.GREEN) {
                    return src_1.Types.WALKABLE;
                }
                else {
                    return src_1.Types.NON_WALKABLE;
                }
            });
        });
    };
    AppController.prototype.showNodes = function (listPath) {
        var _this = this;
        var nodeParent;
        listPath.forEach(function (node, index) {
            nodeParent = listPath[index + 1];
            if (!nodeParent)
                return;
            _this.mapView.highlightRectangule(index, node.row, node.col, nodeParent.row, nodeParent.col);
        });
    };
    return AppController;
}());
exports.AppController = AppController;
//# sourceMappingURL=AppController.js.map