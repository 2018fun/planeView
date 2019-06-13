/**
 * 
 */
class GroundControlView extends egret.Sprite {
    constructor() {
        super();
        this.intiView();
    }

    private titleTextField: egret.TextField;
    private backButton: E8Button;

    private buildingViewList: egret.Bitmap[] = [null];
    private controlViewBg: egret.Bitmap;
    private scrollView: egret.ScrollView;
    private buildingContainer: egret.Sprite;

    private intiView() {
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
        this.titleTextField.text = "新建筑";
        this.addChild(this.titleTextField);


        this.backButton = new E8Button(this, RES.getRes("back_png"), this.onBackButtonTouched);
        this.backButton.touchEnabled = true;
        this.backButton.x = -10;
        this.backButton.y = 0;
        this.backButton.visible = false;
        this.addChild(this.backButton);

        this.scrollView = new egret.ScrollView();
        this.buildingContainer = new egret.Sprite();

        let building: BuildingBase;
        let buildingView: egret.Bitmap;
        for (let i = 1; i < BuildingEnum.count; i++) {
            building = BuildingDataCache.getInstance().getBuildingByIdAndLevel(i, 1);
            buildingView = new egret.Bitmap();
            buildingView.texture = RES.getRes(building.view);
            buildingView.scaleX = buildingView.scaleY = 0.5;
            buildingView.y = 0;
            buildingView.x = 300 * (i - 1);
            buildingView.touchEnabled = true;
            this.buildingViewList.push(buildingView);
            buildingView.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBuild, this);
            this.buildingContainer.addChild(buildingView);
        }
        this.scrollView.width = AdaptSceenUtil.curWidth();
        this.scrollView.height = 1136 - 900;
        this.scrollView.bounces = false;
        this.scrollView.touchEnabled = true;
        this.scrollView.setContent(this.buildingContainer);
        this.addChild(this.scrollView)
    }

    private onBuild(e: egret.TouchEvent) {
        let buildingView = e.target;
        let id = this.buildingViewList.indexOf(buildingView);
        CityController.getInstance().buildBuilding(id)
    }

    private onBackButtonTouched() {

    }
}