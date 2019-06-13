/**
 * 
 */
/**
 * 
 */

class OpponentView extends egret.Sprite {
    constructor() {
        super();
        this.initView();
    }

    private headData: HeadData[];

    private bg: egret.Bitmap;
    private airport: egret.Bitmap;


    private mapData: MapData;

    private selected: boolean;

    private _level: number

    private nameText: egret.TextField;
    private levelText: egret.TextField;

    async initView() {
        this.bg = new egret.Bitmap();
        this.bg.texture = RES.getRes("map_bg_png");
        this.addChild(this.bg);

        this.airport = new egret.Bitmap();
        this.airport.texture = RES.getRes("view_airport_png");
        this.airport.scaleX = this.airport.scaleY = 1 / 2;
        this.airport.x = this.bg.width / 2 - this.airport.width / 4;
        this.addChild(this.airport);


        this.levelText = new egret.TextField;
        this.levelText.x = 30;
        this.levelText.y = this.bg.height - 50;
        this.addChild(this.levelText);


    }



    private updateData() {
        let data = AIController.getInstance().makeOpponenetDataByLevel(this._level);
        this.levelText.text = data.level;
    }

    public set level(value) {
        this._level = value;
        this.updateData();
    }

    public get level() {
        return this._level;
    }
}   