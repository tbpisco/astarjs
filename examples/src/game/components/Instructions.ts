import Text = PIXI.Text;
import TextStyle = PIXI.TextStyle;

export class Instructions extends Text {

    constructor(text:string, width: number){

        let style = new TextStyle({
            fontFamily: 'Arial',
            fontSize: 16,
            fontWeight: 'bold',
            fill: ['#000'],
            wordWrap: true,
            align : 'center',
            wordWrapWidth: width
        });

        super(text, style);
    }
}