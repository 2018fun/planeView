/**
 * 
 */
class ScienceControlView extends BuildingControlView {
    constructor() {
        super();
        this.initScieneView();
    }

    INIT_STATUS = 0;
    BULLETS_STATUS = 1;
    INFO_STATUS = 2;

    private bulletList;

    private rewardContainer;
    private scrollView;

    private status;

    private initScieneView() {
        this.status = this.INIT_STATUS;

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
        this.rewardContainer = new egret.Sprite();

        this.bulletList = new Array<RewardCardView>();

        let bulletCard: RewardCardView;
        for (let i = 0; i < 5; i++) {
            bulletCard = new RewardCardView();
            bulletCard.touchEnabled = true;
            // opponentView.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onToAwayScene, this);
            bulletCard.x = 200 * i;
            this.rewardContainer.addChild(bulletCard);

        }
        this.scrollView.x = 90;
        this.scrollView.width = AdaptSceenUtil.curWidth() - 90;
        this.scrollView.y = 80;
        this.scrollView.height = 200;
        this.scrollView.bounces = false;
        this.scrollView.touchEnabled = true;
        this.scrollView.setContent(this.rewardContainer);
        this.addChild(this.scrollView);

        this.updateView();
    }

    private updateView() {
        if (this.status === this.BULLETS_STATUS) {
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

}