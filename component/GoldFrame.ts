/**
 * 金币显示
 */
class GoldFrame extends egret.Sprite {
    /**
     * 资源类型
     */
    private _type;

    private _amount;

    private goldIcon: egret.Bitmap;
    private frameBg: egret.Bitmap;
    private amountText: egret.TextField;

    constructor(type) {
        super();
        this._type = type;
        this.initView();
    }

    private initView() {
        this.frameBg = new egret.Bitmap;
        this.frameBg.texture = RES.getRes("frame_png");
        this.frameBg.x = 0;
        this.frameBg.y = 0;
        this.addChild(this.frameBg);

        this.goldIcon = new egret.Bitmap();
        this.goldIcon.texture = RES.getRes(this._type + "_png");
        this.goldIcon.x = 0;
        this.goldIcon.y = 0;
        this.addChild(this.goldIcon);

        this.amountText = new egret.TextField();
        this.amountText.x = this.goldIcon.width + 10;
        this.amountText.y = 10;
        this.amountText.width = 80;
        this.amountText.textAlign = egret.HorizontalAlign.RIGHT;
        this.addChild(this.amountText);
    }

    // public set type(value) {
    //     this._type = value;
    // }

    public set amount(value) {
        this._amount = value;
        this.updateView();
    }

    private updateView() {
        this.amountText.text = this._amount.toString();
    }
}
