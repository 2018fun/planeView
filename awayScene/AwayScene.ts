/**
 * 游戏场景
 * 
 * 出征场景
 * create by tishoy
 * 2019.4.20
 */

class AwayScene extends egret.Sprite implements Scene {
    constructor() {
        super();
        this.initView();
    }

    private gameView: GameView;

    private bulletControlView: BulletControlView;

    private savedBullet: BulletView;


    private startAnimate: egret.MovieClip;
    private overAnimate: egret.MovieClip;

    private resultPanel: ResultPanel;
    private messageView: AwayGameMsgView;
    private backButton: E8Button;

    private initView() {

        // this.addChild(new BackGround());


        this.messageView = new AwayGameMsgView();
        this.messageView.anchorOffsetX = this.messageView.width / 2;
        this.messageView.x = AdaptSceenUtil.curWidth() / 2;
        this.messageView.y = 100 + AdaptSceenUtil.y_fix() / 2;
        this.addChild(this.messageView);


        this.gameView = new GameView(false);
        this.addChild(this.gameView);



        this.backButton = new E8Button(this, RES.getRes("back_png"), this.onBackButtonTouched);
        this.backButton.touchEnabled = true;
        this.backButton.x = -10;
        this.backButton.y = 32 + AdaptSceenUtil.y_fix() / 2;
        this.addChild(this.backButton);




        this.bulletControlView = new BulletControlView();
        this.bulletControlView.width = AdaptSceenUtil.curWidth();
        this.bulletControlView.y = AdaptSceenUtil.curHeight() - this.bulletControlView.height;
        this.bulletControlView.visible = false;
        SceneManager.getInstance().getUILayer().addChild(this.bulletControlView);

    }

    private onBackButtonTouched() {
        SceneManager.getInstance().toResultScene();
    }

    public inAnimate() {
        this.bulletControlView.visible = true;
        // this.cityView.
        // egret.Tween.get(this).to({ x: 0 }, 800);
        this.visible = true;
    }

    public outAnimate() {
        this.bulletControlView.visible = false;
        // egret.Tween.get(this).to({ x: -640 }, 800);
        this.visible = false;
    }

    public updateMsg() {
        this.messageView.updateView();
    }

    public updateBullets() {
        this.bulletControlView.addNewBullet();
        this.messageView.updateView();
    }

    public resetGameView(level = 0) {
        this.gameView.resetView();
        this.bulletControlView.updateView();
        this.messageView.resetMsgViewStatus(level);
    }

    public showGridView(gridId, type, status = GridStatusEnum.SHOW) {
        (this.gameView.gridList[gridId] as AwayGridView).status = status;
        this.gameView.gridList[gridId].type = type;
    }

    public showGameFinished() {



        return;
        this.resultPanel = new ResultPanel();
        this.resultPanel.x = this.x + AdaptSceenUtil.curWidth() / 2;
        this.resultPanel.y = this.y + AdaptSceenUtil.curHeight() / 2;
        this.addChild(this.resultPanel);
    }

    public get msgView() {
        return this.messageView;
    }

}