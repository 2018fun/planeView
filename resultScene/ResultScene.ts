/**
 * 成绩界面
 */
class ResultScene extends egret.Sprite {

    private title: egret.Bitmap;
    private score: egret.Bitmap;
    private bullet_animate: egret.MovieClip;
    private report: egret.Sprite;
    private return_button: E8Button;
    private review_button: E8TextButton;
    private share_button: E8Button;
    private reward_control: RewardControlView;

    private next_button: E8TextButton;

    private _game_result: number;
    private _score: number;

    private shareButton: E8TextButton;
    private backButton: E8Button;

    private gameView: GameView;

    private reporting = false;
    private report_bullet = 0;

    constructor() {
        super();

        this.title = new egret.Bitmap();
        this.title.y = 200;
        this.addChild(this.title);

        this.score = new egret.Bitmap();
        this.score.y = AdaptSceenUtil.curHeight() / 2;
        this.addChild(this.score);

        this.bullet_animate = new egret.MovieClip();

        this.backButton = new E8Button(this, RES.getRes("back_png"), this.onBackButtonTouched);
        this.backButton.touchEnabled = true;
        this.backButton.x = -10;
        this.backButton.y = 32 + AdaptSceenUtil.y_fix() / 2;
        this.addChild(this.backButton);


        this.review_button = new E8TextButton(this, RES.getRes("btn_green_png"), this.reviewButtonTouched);
        this.review_button.setButtonText("本局回顾");
        this.review_button.touchEnabled = true;
        this.review_button.anchorOffsetX = this.review_button.width / 2;
        this.review_button.anchorOffsetY = this.review_button.height / 2;
        this.review_button.x = AdaptSceenUtil.curWidth() / 2 - 40;
        this.review_button.y = AdaptSceenUtil.curHeight() / 2 + 300;
        this.addChild(this.review_button);

        this.next_button = new E8TextButton(this, RES.getRes("btn_blue_png"), this.nextButtonTouched);
        this.next_button.setButtonText("下一炮");
        this.next_button.touchEnabled = true;
        this.next_button.anchorOffsetX = this.next_button.width / 2;
        this.next_button.anchorOffsetY = this.next_button.height / 2;
        this.next_button.x = AdaptSceenUtil.curWidth() / 2 + 140;
        this.next_button.y = AdaptSceenUtil.curHeight() / 2 + 300;
        this.addChild(this.next_button);


        this.shareButton = new E8TextButton(this, RES.getRes("share_png"), this.shareButtonTouched);
        this.shareButton.setButtonText("分享此地图");
        this.shareButton.touchEnabled = true;
        this.shareButton.anchorOffsetX = this.shareButton.width / 2;
        this.shareButton.anchorOffsetY = this.shareButton.height / 2;
        this.shareButton.x = AdaptSceenUtil.curWidth() / 2 - 140;
        this.shareButton.y = AdaptSceenUtil.curHeight() / 2 + 300;
        this.addChild(this.shareButton);

        this.reward_control = new RewardControlView();
        this.reward_control.width = AdaptSceenUtil.curWidth();
        this.reward_control.x = 0;
        this.reward_control.y = AdaptSceenUtil.curHeight() - this.reward_control.height;
        this.reward_control.visible = false;
        this.addChild(this.reward_control);


        this.gameView = new GameView(false);
        this.gameView.visible = false;
        this.addChild(this.gameView);

    }

    private reviewButtonTouched() {
        this.reporting = true;
        this.gameView.visible = true;
    }

    private nextButtonTouched() {
        for (let i = 0; i < RecordController.getInstance().getEachGridOpenRecord(this.report_bullet).length; i++) {
            let gridId = RecordController.getInstance().getEachGridOpenRecord(this.report_bullet)[i];
            let gridData = RecordController.getInstance().recordedMap[gridId];
            this.showGridView(
                gridId, gridData.gridType
            )
        }
        this.report_bullet++;
    }

    private showGridView(gridId, type, status = GridStatusEnum.SHOW) {
        (this.gameView.gridList[gridId] as AwayGridView).status = status;
        this.gameView.gridList[gridId].type = type;
    }


    private shareButtonTouched() {
        // platform.share();
    }


    private onBackButtonTouched() {
        SceneManager.getInstance().toCityScene();
    }

    public showResult(result = ResultTypeEnum.WIN, score = ScoreTypeEnum.NO_SCORE) {
        if (result === ResultTypeEnum.WIN) {
            this.title.texture = RES.getRes("win_png");
        } else if (result === ResultTypeEnum.FAIL) {
            this.title.texture = RES.getRes("fail_png");
        } else if (result === ResultTypeEnum.GIVE_UP) {
            this.title.texture = RES.getRes("give_up_png");
        }
        this.title.x = AdaptSceenUtil.curWidth() / 2 - this.title.width / 2;
        switch (score) {
            case ScoreTypeEnum.SSS:
                this.score.texture = RES.getRes("sss_png");
                break;
            case ScoreTypeEnum.S:
                this.score.texture = RES.getRes("s_png");
                break;
            case ScoreTypeEnum.A:
                this.score.texture = RES.getRes("a_png");
                break;
            case ScoreTypeEnum.B:
                this.score.texture = RES.getRes("b_png");
                break;
            case ScoreTypeEnum.C:
                this.score.texture = RES.getRes("c_png");
                break;
        }
        this.score.x = AdaptSceenUtil.curWidth() / 2 - this.score.width / 2;
    }

    public inAnimate() {
        this.reward_control.visible = true;
        this.visible = true;
    }

    public outAnimate() {
        this.reward_control.visible = false;
        this.visible = false;
    }
}