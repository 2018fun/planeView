/**
 * 
 */
class AwayGridView extends GridView {

    private _status;
    private _signType: number;

    constructor(id) {
        super(id);
        super.initView();
    }

    public updateView() {

        if (this._touched) {

        }
        if (this._status === GridStatusEnum.COVER) {
            this.gridView.texture = RES.getRes("cover_png");
            this.gridView.alpha = 0;
        } else if (this._status === GridStatusEnum.KNOWN) {
            if (this.type === GridTypeEnum.HEAD) {

            } else if (this.type === GridTypeEnum.BODY) {

            } else if (this.type === GridTypeEnum.MISS) {

            }

        } else if (this._status === GridStatusEnum.SHOW) {
            if (GameController.getInstance().isPlacing()) {
                if (this._selected) {
                    // this.gridView
                }

            } else if (GameController.getInstance().isHitGaming() || GameController.getInstance().isGuiding()) {
                if (this.type === GridTypeEnum.HEAD) {
                    this.gridView.texture = RES.getRes("head_png");
                    this.gridView.alpha = 1;
                } else if (this.type === GridTypeEnum.BODY) {
                    this.gridView.texture = RES.getRes("body_png");
                    this.gridView.alpha = 1;
                } else if (this.type === GridTypeEnum.MISS) {
                    this.gridView.texture = RES.getRes("miss_png");
                    this.gridView.alpha = 1;
                } else if (this.type === GridTypeEnum.UNSET) {
                    this.gridView.texture = RES.getRes("cover_png");
                    this.gridView.alpha = 0;
                }
            }


        } else if (this._status === GridStatusEnum.UNSHOW) {

        }

    }


    public resetView() {
        this._status = GridStatusEnum.COVER;
        this._type = GridTypeEnum.MISS;
        this.gridView.texture = null;
        this.updateView();
    }

    public set status(value) {
        this._status = value;
        this.updateView();
    }

    public get status(): number {
        return this._status;
    }

    public set signType(value) {
        this._signType = value;
    }

    public get signType() {
        return this._signType;
    }


}