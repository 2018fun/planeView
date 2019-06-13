/**
 * 
 */
/**
 * 
 */

class BuildingView extends egret.Sprite {
    constructor() {
        super();
        this.initView();
    }

    private headData: HeadData[];

    private bg: egret.Bitmap;

    private gameView: GameView;

    private mapData: MapData;

    private selected: boolean;

    private _level: number
    private _name: string;

    private nameText: egret.TextField;
    private levelText: egret.TextField;

    async initView() {
        this.bg = new egret.Bitmap();
        this.bg.texture = RES.getRes("map_bg_png");
        this.addChild(this.bg);

        this.nameText = new egret.TextField();
        this.addChild(this.nameText);


        this.levelText = new egret.TextField();
        this.levelText.x = this.bg.width - 20;
        this.addChild(this.levelText);


    }



    private updateData() {

    }

    public set name(value) {
        this._name = value;
        this.nameText.text = this._name;
        this.updateData();
    }

    public get name() {
        return this._name;
    }

    public set level(value) {
        this._level = value;
        this.levelText.text = this._level.toString();
        this.updateData();
    }

    public get level() {
        return this._level;
    }
}