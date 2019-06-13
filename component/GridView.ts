/**
 * 
 */
class GridView extends egret.Sprite {
    constructor(id) {
        super();
        this._id = id;
        this.initView();
    }

    protected grid_sheet: egret.SpriteSheet;

    protected _id: number;
    //选择
    protected _selected: boolean;
    //点击
    protected _touched: boolean;
    protected _type: number;

    private gird: egret.Shape;

    /**
     * 格子实际内容 hittingView
     * head bone12 wingL1L2R1R2,bottom,tailLR
     */
    protected gridView: egret.Bitmap;

    protected initView() {
        this.grid_sheet = RES.getRes("plane_sheet")


        let color;
        if (this._id % 2 == 1) {
            color = 0x000000;
        } else {
            color = 0xffffff;
        }

        /**
         * 换成图片
         */
        let gridShape = new egret.Shape();
        gridShape.graphics.beginFill(color, 0.2);
        gridShape.graphics.drawRect(0, 0, 60, 60);
        gridShape.graphics.endFill();
        this.addChild(gridShape);

        this.gridView = new egret.Bitmap();
        this.gridView.width = 60;
        this.gridView.height = 60;
        this.addChild(this.gridView);

      
        // this.gridView = new egret.Bitmap();
        // this.gridView.width = 60;
        // this.gridView.height = 60;
        // this.gridView.visible = false;
        // this.addChild(this.gridView);

        // // this.placingView = new egret.Bitmap();

        // this.coverView = new egret.Bitmap();
        // this.coverView.texture = RES.getRes("cover_png");
        // this.coverView.width = 60;
        // this.coverView.height = 60;
        // if (this._status === GridStatusEnum.COVER) {
        //     this.coverView.visible = true;
        // } else {
        //     this.coverView.visible = false;
        // }
        // this.addChild(this.coverView);

        // this.selectedView = new egret.Bitmap();
        // this.selectedView.texture = RES.getRes("selected_png");
        // this.selectedView.width = 60;
        // this.selectedView.height = 60;
        // this.selectedView.visible = false;
        // this.addChild(this.selectedView);

    }

    public updateView() {

        // if (this.) {

        // }
    }

    public resetView() {

    }

    public set type(value) {
        if (this._type !== value) {
            this._type = value;

        } else {

        }
        if (this._type !== 0) {
        } else {
        }
        this.updateView();
    }

    public get type(): number {
        return this._type;
    }

    public set selected(value: boolean) {
        this._selected = value;
        this.updateView();
    }

    public get selected() {
        return this._selected;
    }

    public set touched(value) {
        this._touched = value;
        this.updateView();
    }

    public get touched(): boolean {
        return this._touched;
    }

    public get id(): number {
        return this._id;
    }

    // public set id(value) {
    //     this._id = value;
    // }
}