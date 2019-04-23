/**
 * 
 */
class PlaneView extends egret.Sprite {
    private planeView: egret.Bitmap;

    private status;

    private direction;
    private headGrid;

    constructor() {

        super();
        this.initView();
    }

    private initView() {
        this.planeView = new egret.Bitmap;
        this.planeView.texture = RES.getRes("");
    }




}