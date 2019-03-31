export class Title extends PIXI.Text {

    constructor(text:string, width: number){

        var style = new PIXI.TextStyle({
            fontFamily: 'FuturaHandwritten',
            fontSize: 36,
            fontWeight: 'bold',
            fill: '#c3087e',
            dropShadow: true,
            dropShadowColor: '#000000',
            dropShadowBlur: 3,
            dropShadowAngle: Math.PI / 6,
            dropShadowDistance: 2,
            wordWrap: true,
            align: 'center',
            wordWrapWidth: width
        });

        super(text, style);

    }

}



