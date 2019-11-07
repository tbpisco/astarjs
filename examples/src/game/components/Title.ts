import Text = PIXI.Text;
import TextStyle = PIXI.TextStyle;

export class Title extends Text {

    constructor(text:string, width: number){

        let style = new TextStyle({
            fontFamily: 'Helvetica',
            fontSize: 36,
            fontWeight: 'bold',
            fill: '#ebce8d',
            dropShadow: true,
            dropShadowColor: '#f8eec7',
            dropShadowBlur: 3,
            dropShadowAngle: Math.PI*0.25,
            dropShadowDistance: 3,
            wordWrap: true,
            align: 'center',
            wordWrapWidth: width
        });

        super(text, style);

    }

}



