/**
 * 
 */
class CityScene extends egret.Sprite {
    constructor() {
        super();
        this.initView();
    }

    public cityView: CityView;
    private bg: egret.Bitmap;

    private awayButton: egret.Bitmap;

    private initView() {
        this.bg = new egret.Bitmap();
        // this.bg.x = 640;
        this.bg.texture = RES.getRes("bg_png");
        this.addChild(this.bg);

        this.cityView = new CityView();
        // this.cityView.x = 640;
        this.cityView.y = 160;
        this.cityView.touchEnabled = true;
        this.addChild(this.cityView);

        this.awayButton = new egret.Bitmap();
        this.awayButton.texture = RES.getRes("away_button_png")
        this.awayButton.x = 10;
        this.awayButton.y = 900;
        this.awayButton.touchEnabled = true;
        this.awayButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onToAwayScene, this);
        this.addChild(this.awayButton);
    }

    public inAnimate() {
        // this.cityView.
        this.cityView.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onToCityScene, this);
        egret.Tween.get(this.cityView).to({ x: 0, y: 160, scaleX: 1, scaleY: 1 }, 800, egret.Ease.quintIn)
        // egret.Tween.get(this.cityView).to({ scaleX: 1, scaleY: 1 }, 800);
        egret.Tween.get(this.bg).to({ x: 0 }, 800);
    }

    public outAnimate() {
        egret.Tween.get(this.cityView).to({ x: 640 - 120, y: 900, scaleX: 0.1, scaleY: 0.1 }, 800, egret.Ease.quadOut);
        // egret.Tween.get(this.cityView).to({}, 800);
        egret.Tween.get(this.bg).to({ x: 640 }, 800);

        this.cityView.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onToCityScene, this);

    }

    private onToAwayScene(e) {
        GameController.getInstance().resetAwayGame()
        SceneManager.getInstance().toAwayScene();
    }

    private onToCityScene(e) {
        SceneManager.getInstance().toCityScene();
    }
}