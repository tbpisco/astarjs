export class MapView {

    private domElement : HTMLDivElement;

    constructor(domElementID:string){

        let domElement = document.body.querySelector(domElementID);

        if(domElement)this.domElement = domElement as HTMLDivElement;

    }
}