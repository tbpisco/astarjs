import Button from './Button';
import Container = PIXI.Container;

export class SettingsMenu extends Container {

    public manhattanBtn:Button;
    public diagonalBtn:Button;
    public diagonalFreeBtn:Button;

    public selectedMode:string = "manhattan";
 
    constructor(){
        super()

        const width = 160;

        this.manhattanBtn = new Button(0, 0, width, 20, true);
        this.manhattanBtn.setText("MANHATTAN");
        this.manhattanBtn.id = "manhattan";
        this.manhattanBtn.clicked = this.onClicked.bind(this, this.manhattanBtn);

        this.diagonalBtn = new Button(width + 10, 0, width, 20);
        this.diagonalBtn.setText("DIAGONAL");
        this.diagonalBtn.id = "diagonal";
        this.diagonalBtn.clicked = this.onClicked.bind(this, this.diagonalBtn);

        this.diagonalFreeBtn = new Button(width*2 + 20, 0, width, 20);
        this.diagonalFreeBtn.setText("ALL DIAGONALS");
        this.diagonalFreeBtn.id = "allDiagonals";
        this.diagonalFreeBtn.clicked = this.onClicked.bind(this, this.diagonalFreeBtn);

        this.addChild(this.manhattanBtn);
        this.addChild(this.diagonalBtn);
        this.addChild(this.diagonalFreeBtn);
    }

    public onClicked(btn:Button): void {
        switch(btn.id){
            case "manhattan":
                this.selectedMode = "manhattan";
                this.diagonalBtn.reset();
                this.diagonalFreeBtn.reset();
            break;
            case "diagonal":
                this.selectedMode = "diagonal";
                this.manhattanBtn.reset();
                this.diagonalFreeBtn.reset();
            break;
            case "allDiagonals":
                this.selectedMode = "allDiagonals";
                this.diagonalBtn.reset();
                this.manhattanBtn.reset();
            break;
            default:
                this.selectedMode = "manhattan";
                this.diagonalBtn.reset();
                this.diagonalFreeBtn.reset();
        }
    }

}