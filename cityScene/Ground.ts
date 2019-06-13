/**
 * 
 */
class Ground extends egret.Sprite {
    constructor(position) {
        super();
        this._position = position;
        this.initView();
    }

    private _selected: boolean;
    private bgView: egret.Bitmap;
    private buildingId: number;
    private buildingLevel: number;
    private _position: number;
    private buildingView: egret.MovieClip;
    private buildingViewPng: egret.Bitmap;

    private mcFactory: egret.MovieClipDataFactory;

    private initView() {
        this.bgView = new egret.Bitmap();
        this.bgView.texture = RES.getRes("ground_png");
        this.bgView.anchorOffsetX = this.bgView.width / 2;
        this.bgView.anchorOffsetY = this.bgView.height / 2;
        this.bgView.alpha = 0;
        this.addChild(this.bgView);

        // this.buildingView = new egret.MovieClip();
        // this.buildingView.touchEnabled = false;
        // this.buildingView.stop();

        this.buildingViewPng = new egret.Bitmap();
        this.buildingViewPng.scaleX = this.buildingViewPng.scaleY = 0.5;
        this.buildingViewPng.anchorOffsetX = this.width / 2;
        this.buildingViewPng.anchorOffsetY = this.height / 2;
        this.buildingViewPng.x = -60;
        this.addChild(this.buildingViewPng);
    }

    private updateView() {
        if (this.buildingId === -1) {
            return;
        }
        // this.buildingView.gotoAndStop(this.buildingLevel * 9);
        // this.buildingView.gotoAndStop(1);
    }

    public get position() {
        return this._position;
    }

    public setBuilding(id, level) {
        if (id === -1) {
            return;
        }
        if (this.buildingId === id && this.buildingLevel === level) {
            return;
        }
        if (id !== this.buildingId) {
            let namePrefix = BuildingEnum.buildingString[id];
            let build_data = RES.getRes(namePrefix + "_json");
            let build_image = RES.getRes(namePrefix + "_png");
            this.mcFactory = new egret.MovieClipDataFactory(build_data, build_image);
            // this.buildingView.movieClipData = this.mcFactory.generateMovieClipData(namePrefix);
            // this.addChild(this.buildingView);
            this.buildingViewPng.texture = RES.getRes("view_airport_png");
        }
        this.buildingId = id;
        this.buildingLevel = level;
        this.updateView();
    }


    public levelUp() {
        this.buildingLevel++;
        this.updateView();
    }

    public demolish() {
        this.buildingId = -1;
        this.buildingLevel = 0;
        this.buildingViewPng.texture = null;
        // this.buildingView.movieClipData = null;
        // this.buildingView.gotoAndStop(1);
        // if (this.contains(this.buildingView)) {
        //     this.removeChild(this.buildingView);
        // }
        // CityController.getInstance().selectPosition(this.position);
    }

    public destroy() {

    }

    public get id() {
        return this.buildingId;
    }

    public get level() {
        return this.buildingLevel;
    }

    public set selected(value) {
        this._selected = value;
        if (value) {
            DrawUtil.setImageColor(this.bgView, 0xdd33dd);
        } else {
            DrawUtil.setImageColor(this.bgView, 0xffffff);
        }
    }
}