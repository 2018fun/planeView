/**
 * 
 * 
 */
class BulletView extends egret.Sprite {
    private used = false;
    private type = BulletTypeEnum.MISSILE;
    private view: egret.Bitmap;
    private selectedFrame: egret.Bitmap;
    private head: BulletHead;

    constructor(type) {
        super();
        this.type = type;
        this.initView();
    }

    private initView() {
        this.head = new BulletHead();
    }

    private updateView() {

    }

    public setUsed() {
        this.used = true;
    }

    public setBulletHeadUserName(name) {
        this.head.name = name;
    }
}