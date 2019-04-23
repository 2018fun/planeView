/**
 * 
 */
class GridView extends egret.Sprite {
    constructor(id) {
        super();
        this._id = id;
        this.initView();
    }

    private coverView: egret.Bitmap;
    private selectedView: egret.Bitmap;

    private _selected: boolean;
    private _touched: boolean;
    private gird: egret.Shape;
    /**
     * 实际飞机内容
     */
    private _type: number;
    /**
     * 标记飞机内容
     */
    private _signType: number;
    private _status: number;

    private _id: number;

   
    private headView: egret.Bitmap;

    /**
     * head bone12 wingL1L2R1R2,bottom,tailLR
     */
    private gridView: egret.Bitmap;

    private gridList = [];

    private initView() {
        this._status = GridStatusEnum.COVER;

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
        this.gridView.visible = false;
        this.addChild(this.gridView);

        this.coverView = new egret.Bitmap();
        this.coverView.texture = RES.getRes("cover_png");
        this.coverView.width = 60;
        this.coverView.height = 60;
        if (this._status === GridStatusEnum.COVER) {
            this.coverView.visible = true;
        } else {
            this.coverView.visible = false;
        }
        this.addChild(this.coverView);

        this.selectedView = new egret.Bitmap();
        this.selectedView.texture = RES.getRes("selected_png");
        this.selectedView.width = 60;
        this.selectedView.height = 60;
        this.selectedView.visible = false;
        this.addChild(this.selectedView);

    }

    public updateView() {
        if (this._touched) {

        }
        if (this._status === GridStatusEnum.COVER) {
            this.coverView.visible = true;
        } else if (this._status === GridStatusEnum.KNOWN) {
            if (this.type === GridTypeEnum.HEAD) {

            } else if (this.type === GridTypeEnum.BODY) {

            } else if (this.type === GridTypeEnum.MISS) {

            }

        } else if (this._status === GridStatusEnum.SHOW) {
            if (GameController.getInstance().type === GameTypeEnum.GAME_TYPE_MAPING) {
                if (this._selected) {
                    this.coverView.visible = true;
                    // this.gridView
                }
            } else if (GameController.getInstance().type === GameTypeEnum.GAME_TYPE_HITTING) {
                this.coverView.visible = false;
                this.gridView.visible = true;
                if (this.type === GridTypeEnum.HEAD) {
                    this.gridView.texture = RES.getRes("head_png");
                } else if (this.type === GridTypeEnum.BODY) {
                    this.gridView.texture = RES.getRes("body_png");
                } else if (this.type === GridTypeEnum.MISS) {
                    this.gridView.texture = RES.getRes("miss_png");
                } else if (this.type === GridTypeEnum.UNSET) {
                    this.gridView.texture = null;
                }
            }


        } else if (this._status === GridStatusEnum.UNSHOW) {

        }
        // if (this.) {

        // }
    }

    public resetView() {
        this._status = GridStatusEnum.COVER;
        this._type = GridTypeEnum.UNSET
        console.log("123");
        this.coverView.visible = true;
        this.updateView();
    }

    public set status(value) {
        this._status = value;
        this.updateView();
    }

    public get status(): number {
        return this._status;
    }

    public set type(value) {
        console.log(value);
        if (this._type !== value) {
            this._type = value;

        } else {

        }
        if (this._type !== 0) {
            // this.coverView.alpha = 0;
        } else {
            // DrawUtil.setImageColor(this.coverView, 0x550000)
        }
        this.updateView();
    }

    public get type(): number {
        return this._type;
    }

    public set signType(value) {
        this._signType = value;
    }

    public get signType() {
        return this._signType;
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