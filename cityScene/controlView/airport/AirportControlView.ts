/**
 * 
 */
class AirportControlView extends BuildingControlView {
    constructor() {
        super();
        this.initAirport()
    }

    INIT_STATUS = 0;
    OPPONENT_STATUS = 1;


    private awayButton: E8TextButton;
    private placingButton: E8TextButton;
    private refreshButton: E8TextButton;

    private scrollView: egret.ScrollView;

    private oppoContiner: egret.Sprite;
    private opponentList: Array<OpponentView>;

    private status: number;

    private initAirport() {

        this.status = this.INIT_STATUS;

        this.demolishButton.visible = false;



        this.titleTextField = new egret.TextField();
        this.titleTextField.x = 36;
        this.titleTextField.y = 18;
        this.titleTextField.bold = true;
        this.titleTextField.size = 28;
        // this.titleTextField.fontFamily = ""
        this.titleTextField.textAlign = egret.HorizontalAlign.CENTER;
        this.titleTextField.text = i18n.getInstance().getLanguage(CityController.getInstance().selectedData().name);
        this.addChild(this.titleTextField);


        this.backButton = new E8Button(this, RES.getRes("back_png"), this.onBackButtonTouched);
        this.backButton.touchEnabled = true;
        this.backButton.x = -10;
        this.backButton.y = 0;
        this.backButton.visible = false;
        this.addChild(this.backButton);


        this.scrollView = new egret.ScrollView();
        this.oppoContiner = new egret.Sprite();

        this.opponentList = new Array<OpponentView>();
        let opponentData = AIController.getInstance().randomOpponent();
        let opponentView: OpponentView;

        this.refreshButton = new E8TextButton(this, RES.getRes("btn_green_png"), this.onRefreshButtonTouched);
        // this.refreshButton.scale(0.8, 0.5);
        this.refreshButton.setButtonText(i18n.getInstance().getLanguage("ui_refresh"));
        this.refreshButton.x = 0;
        this.refreshButton.y = 100;
        this.addChild(this.refreshButton);

        for (let i = 0; i < opponentData.length; i++) {
            opponentView = new OpponentView();
            opponentView.touchEnabled = true;
            opponentView.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSelectedOpponent, this);
            opponentView.x = 200 * i;
            opponentView.level = opponentData[i];
            this.oppoContiner.addChild(opponentView);
            this.opponentList.push(opponentView);

        }
        this.scrollView.x = this.refreshButton.width + 10;
        this.scrollView.width = AdaptSceenUtil.curWidth() - 90;
        this.scrollView.y = 80;
        this.scrollView.height = 200;
        this.scrollView.bounces = false;
        this.scrollView.touchEnabled = true;
        this.scrollView.setContent(this.oppoContiner);
        this.addChild(this.scrollView)


        this.awayButton = new E8TextButton(this, RES.getRes("btn_red_png"), this.onToAwayScene);
        // this.awayButton.scale(0.8, 0.5);
        this.awayButton.setButtonText(i18n.getInstance().getLanguage("ui_attack"));
        this.awayButton.x = AdaptSceenUtil.curWidth() - 3 * this.levelUpButton.width - 30;
        this.awayButton.y = 100;
        this.addChild(this.awayButton);

        this.placingButton = new E8TextButton(this, RES.getRes("btn_green_png"), this.onToPlacingScene);
        // this.placingButton.scale(0.8, 0.5);
        this.placingButton.setButtonText(i18n.getInstance().getLanguage("ui_placing"));
        this.placingButton.x = AdaptSceenUtil.curWidth() - 2 * this.levelUpButton.width - 20;;
        this.placingButton.y = 100;
        this.addChild(this.placingButton);




        this.updateView();
    }

    private updateView() {
        if (this.status === this.OPPONENT_STATUS) {
            this.placingButton.visible = false;
            this.awayButton.visible = false;
            this.scrollView.visible = true;
            this.backButton.visible = true;
            this.levelUpButton.visible = false;
            this.refreshButton.visible = true;
        } else {
            this.placingButton.visible = true;
            this.awayButton.visible = true;
            this.scrollView.visible = false;
            this.backButton.visible = false;
            this.levelUpButton.visible = true;
            this.refreshButton.visible = false;
        }
    }


    private onToPlacingScene(e) {
        GameController.getInstance().startPlacingGame();
        SceneManager.getInstance().toPlacingScene();
    }

    private onToAwayScene(e) {
        this.status = this.OPPONENT_STATUS;
        this.updateView();

    }

    private onSelectedOpponent(e: egret.TouchEvent) {
        let oppo = e.target as OpponentView;
        console.log(oppo.level);
        GameController.getInstance().resetAwayGame(oppo.level);
        SceneManager.getInstance().toAwayScene();
    }

    private onBackButtonTouched() {
        if (this.status === this.OPPONENT_STATUS) {
            this.status = this.INIT_STATUS;
            this.updateView();
        }
    }

    private onRefreshButtonTouched() {
        let opponentData = AIController.getInstance().randomOpponent();
        let opponentView;
        for (let i = 0; i < opponentData.length; i++) {
            if (this.opponentList.length >= i) {
                this.opponentList[i].level = opponentData[i];
            } else {
                opponentView = new OpponentView();
                opponentView.touchEnabled = true;
                opponentView.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSelectedOpponent, this);
                opponentView.x = 200 * i;
                opponentView.level = opponentData[i];
                this.oppoContiner.addChild(opponentView);
                this.opponentList.push(opponentView);
            }


        }
    }

}