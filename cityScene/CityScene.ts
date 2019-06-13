/**
 * 
 */
class CityScene extends egret.Sprite implements Scene {
    constructor() {
        super();
        this.initView();
    }

    public cityView: CityView;

    private cityMsgView: CityMessageView;
    private cityControl: CityControlView;

    // private awayButton: egret.Bitmap;
    // private placeButton: egret.Bitmap;

    private initView() {

        this.cityMsgView = new CityMessageView();
        this.cityMsgView.anchorOffsetX = this.cityMsgView.width / 2;
        this.cityMsgView.x = AdaptSceenUtil.curWidth() / 2;
        this.cityMsgView.y = 100 + AdaptSceenUtil.y_fix() / 2;
        this.addChild(this.cityMsgView)

        this.cityView = new CityView();
        this.cityView.touchChildren = true;
        // this.cityView.x = 640;
        this.cityView.touchEnabled = true;
        this.addChild(this.cityView);
        // SceneManager.getInstance().getGameLayer().addChild(this.cityView);

        this.cityControl = new CityControlView();
        this.cityControl.width = AdaptSceenUtil.curWidth();
        this.cityControl.x = 0;
        this.cityControl.y = AdaptSceenUtil.curHeight() - 280;
        this.cityControl.touchEnabled = true;
        this.cityControl.visible = false;
        SceneManager.getInstance().getUILayer().addChild(this.cityControl);


    }

    public inAnimate() {
        this.cityControl.visible = true;
        // this.cityView.
        this.cityView.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onToCityScene, this);
        // egret.Tween.get(this.cityView).to({ x: 0, y: 0, scaleX: 1, scaleY: 1 }, 800, egret.Ease.quintIn)
        // egret.Tween.get(this.cityView).to({ scaleX: 1, scaleY: 1 }, 800);
        // egret.Tween.get(this).to({ x: 0 }, 800);
        // egret.Tween.get(this.bg).to({ x: 0 }, 800);
        this.visible = true;
    }

    public outAnimate() {
        this.cityControl.visible = false;
        // egret.Tween.get(this.cityView).to({ x: 640 - 120, y: 900, scaleX: 0.1, scaleY: 0.1 }, 800, egret.Ease.quadOut);
        // egret.Tween.get(this.cityView).to({}, 800);
        // egret.Tween.get(this).to({ x: 640 }, 800);
        // egret.Tween.get(this.bg).to({ x: 640 }, 800);
        this.visible = false;
        this.cityView.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onToCityScene, this);

    }

    private onToCityScene(e) {
        SceneManager.getInstance().toCityScene();
    }

    public selectPosition(buildingData, position) {
        this.cityView.updateSelected(position);
        this.cityMsgView.renderPosition(buildingData);
        this.cityControl.renderControlView(buildingData);

    }

    public build(buildingData) {
        this.cityView.build(buildingData);
        this.cityMsgView.renderPosition(buildingData);
        this.cityControl.renderControlView(buildingData);
    }

    public demolish(buildingData) {
        this.cityView.demolish();
        this.cityMsgView.renderPosition(buildingData);
        this.cityControl.renderControlView(buildingData)
    }

    public levelupBuilding(buildingData) {
        this.cityView.levelUp();
        this.cityMsgView.renderPosition(buildingData);
        this.cityControl.renderControlView(buildingData);
    }
}