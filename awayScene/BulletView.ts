/**
 * 
 * 
 */
class BulletView extends egret.Sprite {
    private used = false;
    private _type = BulletTypeEnum.MISSILE;
    private view: egret.Bitmap;
    public index: number;
    private selectedFrame: egret.Bitmap;
    private head: BulletHead;
    private typeTextField: egret.TextField;
    private _status: number

    constructor() {
        super();
        this.initView();
    }

    private initView() {
        this.head = new BulletHead();

        this.view = new egret.Bitmap();
        this.addChild(this.view);

        this.anchorOffsetX = this.view.width / 2;
        this.anchorOffsetY = this.view.height / 2;

        this.typeTextField = new egret.TextField();

        this.typeTextField.anchorOffsetX = this.typeTextField.width;
        this.typeTextField.anchorOffsetY = this.typeTextField.height;
        this.addChild(this.typeTextField);



    }

    private updateView() {
        this.view.texture = RES.getRes("bullet_png");
        this.typeTextField.text = this._type.toString();
    }

    public set type(type) {
        this._type = type;
        this.updateView();
    }

    public set status(value) {
        this._status = value;
        this.updateView();
    }

    public setUsed() {
        this.used = true;
    }

    public setBulletHeadUserName(name) {
        this.head.name = name;
    }
}