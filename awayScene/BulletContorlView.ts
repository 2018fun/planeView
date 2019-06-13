/**
 * 
 */
class BulletControlView extends egret.Sprite {

    private bulletPool: Array<BulletView> = [];

    private preparedBullet: BulletView;
    private storedBullet: BulletView;

    private bulletX = [];
    private bulletY = [];
    private bulletSize = [];

    private bulletQueue: egret.Sprite;

    private switchButton: E8TextButton;


    private controlViewBg: egret.Bitmap;
    private titleTextField: egret.TextField;


    constructor() {
        super();

        this.controlViewBg = new egret.Bitmap();
        this.controlViewBg.texture = RES.getRes("control_bg_png");
        // this.controlViewBg.x = ;
        this.controlViewBg.width = AdaptSceenUtil.curWidth();
        this.addChild(this.controlViewBg);

        this.titleTextField = new egret.TextField();
        this.titleTextField.x = 36;
        this.titleTextField.y = 18;
        this.titleTextField.bold = true;
        this.titleTextField.size = 28;
        // this.titleTextField.fontFamily = ""
        this.titleTextField.textAlign = egret.HorizontalAlign.CENTER;
        this.titleTextField.text = i18n.getInstance().getLanguage("ui_title_bullet");
        this.addChild(this.titleTextField);

        this.bulletQueue = new egret.Sprite();
        this.addChild(this.bulletQueue);

        this.switchButton = new E8TextButton(this, RES.getRes("btn_purple_png"), this.switchTouched);
        this.switchButton.setButtonText(i18n.getInstance().getLanguage("ui_switch"))
        this.switchButton.x = 300;
        this.switchButton.y = 100;
        this.addChild(this.switchButton);
        this.switchButton.touchEnabled = true;

        // this.storedBullet = new BulletView();
        // this.storedBullet.x = 640 - 150;
        // this.addChild(this.storedBullet);

        this.initPool();
        this.updateView();

    }

    private switchTouched(e) {
        BulletController.getInstance().switchBullet();
        if (this.storedBullet === undefined) {
            this.updateView(true);
        } else {
            this.updateView(false);
        }

    }

    private initPool() {
        let bullet: BulletView;
        for (let i = 0; i < 5; i++) {
            bullet = new BulletView();
            this.bulletPool.push(bullet);
        }
    }

    public addNewBullet() {
        this.updateView(true);
    }

    public updateView(animate = true) {
        this.bulletQueue.removeChildren();
        let bullets = BulletController.getInstance().bullets;

        for (let i = 0; i < bullets.length; i++) {
            let bullet = this.getNoUsedBulletFromPool();
            bullet.type = bullets[i];

            bullet.y = 120;
            if (animate) {
                bullet.x = 170 - 150 * i - 150;
                egret.Tween.get(bullet).to({ x: bullet.x + 150 }, 500);
            } else {
                bullet.x = 320 - 150 * i - 150;
            }
            this.bulletQueue.addChild(bullet);
        }


        if (BulletController.getInstance().stored !== null) {
            this.storedBullet = this.getNoUsedBulletFromPool();
            this.storedBullet.type = BulletController.getInstance().stored;
            this.storedBullet.x = 640 - 120;
            this.storedBullet.y = 120;
            this.bulletQueue.addChild(this.storedBullet);
        }

    }


    private initPrepare() {
        this.preparedBullet = this.getNoUsedBulletFromPool();
        this.addChild(this.preparedBullet);
    }

    public prepareNextBullet() {

    }

    private getNoUsedBulletFromPool() {
        for (let i = 0; i < this.bulletPool.length; i++) {
            if (this.bulletPool[i].parent === null) {
                return this.bulletPool[i];
            }
        }
        return null;
    }

}