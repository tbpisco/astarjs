export class Title extends PIXI.Text {

    constructor(text:string, width: number){

        var style = new PIXI.TextStyle({
            fontFamily: 'Helvetica',
            fontSize: 36,
            fontWeight: 'bold',
            fill: '#ebce8d',
            dropShadow: true,
            dropShadowColor: '#f8eec7',
            dropShadowBlur: 3,
            dropShadowAngle: Math.PI / 4,
            dropShadowDistance: 3,
            wordWrap: true,
            align: 'center',
            wordWrapWidth: width
        });

        super(text, style);

    }

}



