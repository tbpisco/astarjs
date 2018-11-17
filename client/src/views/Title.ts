export class Title extends PIXI.Text {

    constructor(text:string, width: number){

        var style = new PIXI.TextStyle({
            fontFamily: 'Arial',
            fontSize: 36,
            fontWeight: 'bold',
            fill: ['#c3087e', '#e2961b'], // gradient
            stroke: '#000',
            strokeThickness: 5,
            dropShadow: true,
            dropShadowColor: '#000000',
            dropShadowBlur: 4,
            dropShadowAngle: Math.PI / 6,
            dropShadowDistance: 6,
            wordWrap: true,
            align: 'center',
            wordWrapWidth: width
        });

        super(text, style);

    }

}



