/**
 * 
 */
class CompanyControlView extends BuildingControlView {
    constructor() {
        super();
        this.initInsure();
    }


    INIT_STATUS = 0;
    INSURE_STATUS = 1;
    INFO_STATUS = 2;

    private scrollView: egret.ScrollView;

    private buildingContainer: egret.Sprite;
    private buildingList: Array<BuildingView>;

    private status;

    private initInsure() {
        this.status = this.INIT_STATUS;

        this.demolishButton.visible = false;

        this.titleTextField = new egret.TextField();
        this.titleTextField.x = 36;
        this.titleTextField.y = 18;
        this.titleTextField.bold = true;
        this.titleTextField.size = 28;
        // this.titleTextField.fontFamily = ""
        this.titleTextField.textAlign = egret.HorizontalAlign.CENTER; this.titleTextField.text = i18n.getInstance().getLanguage(CityController.getInstance().selectedData().name);
        this.addChild(this.titleTextField);


        this.backButton = new E8Button(this, RES.getRes("back_png"), this.onBackButtonTouched);
        this.backButton.touchEnabled = true;
        this.backButton.x = -10;
        this.backButton.y = 0;
        this.backButton.visible = false;
        this.addChild(this.backButton);

        this.scrollView = new egret.ScrollView();
        this.buildingContainer = new egret.Sprite();

        this.buildingList = new Array<BuildingView>();

        let buildingMiniView: BuildingView;
        for (let i = 0; i < CityController.getInstance().getBuildings().length; i++) {
            if (CityController.getInstance().getBuildings()[i].level === 0) {
                continue;
            }
            buildingMiniView = new BuildingView();
            buildingMiniView.touchEnabled = true;
            buildingMiniView.name = i18n.getInstance().getLanguage(CityController.getInstance().getBuildings()[i].name);
            buildingMiniView.level = CityController.getInstance().getBuildings()[i].level;
            buildingMiniView.x = 200 * this.buildingList.length;
            this.buildingList.push(buildingMiniView);
            this.buildingContainer.addChild(buildingMiniView);
        }
        this.scrollView.x = 90;
        this.scrollView.width = AdaptSceenUtil.curWidth() - 90;
        this.scrollView.y = 80;
        this.scrollView.height = 200;
        this.scrollView.bounces = false;
        this.scrollView.touchEnabled = true;
        this.scrollView.setContent(this.buildingContainer);
        this.addChild(this.scrollView)

        this.updateView();

    }

    private updateView() {
        if (this.status === this.INSURE_STATUS) {
            this.scrollView.visible = true;
            this.backButton.visible = true;
            this.levelUpButton.visible = false;
            this.demolishButton.visible = false;
        } else if (this.status === this.INIT_STATUS) {
            this.scrollView.visible = false;
            this.backButton.visible = false;
            this.levelUpButton.visible = true;
            this.demolishButton.visible = true;
        } else if (this.status === this.INFO_STATUS) {

        }
    }

    private onBackButtonTouched() {
    }

    private onBuyBuildingInsure() {
        CityController.getInstance().buyInsure();
    }


}