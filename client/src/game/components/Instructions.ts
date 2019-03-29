export class Instructions extends PIXI.Text {

    constructor(text:string, width: number){

        var style = new PIXI.TextStyle({
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