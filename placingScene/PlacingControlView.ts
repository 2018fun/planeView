/**
 * 
 */


class PlacingControlView extends egret.Sprite {
    constructor() {
        super();
        this.initView();
    }

    INIT_STATUS = 0;
    HISTORY_STATUS = 1;

    private status: number;

    private mapList: Array<MiniGameView>;

    private controlViewBg: egret.Bitmap;
    private scrollView: egret.ScrollView;
    private mapController: egret.Sprite;
    private titleTextField: egret.TextField;
    private backButton: E8Button;
    private newMapButton: E8Button;

    private historyButton: E8TextButton;
    private shareButton: E8TextButton;
    private randomButton: E8TextButton;

    private initView() {
        this.controlViewBg = new egret.Bitmap();
        this.controlViewBg.texture = RES.getRes("control_bg_png");
        this.controlViewBg.width = AdaptSceenUtil.curWidth();

        // this.controlViewBg.x = ;
        // this.controlViewBg.width = AdaptSceenUtil.curWidth();
        this.addChild(this.controlViewBg);
        // this.controlViewBg.height = 180;

        this.historyButton = new E8TextButton(this, RES.getRes("btn_yellow_png"), this.onHistoryButtonTouched);
        this.historyButton.setButtonText("分享历史");
        this.historyButton.touchEnabled = true;
        this.historyButton.x = 0;
        this.historyButton.y = 100;
        this.addChild(this.historyButton);

        this.shareButton = new E8TextButton(this, RES.getRes("btn_green_png"), this.shareButtonTouched);
        this.shareButton.setButtonText("分享此地图");
        this.shareButton.touchEnabled = true;
        this.shareButton.x = this.historyButton.width + 20;
        this.shareButton.y = 100;
        this.addChild(this.shareButton);

        this.randomButton = new E8TextButton(this, RES.getRes("btn_purple_png"), this.onRandomButtonTouched);
        this.randomButton.setButtonText("随机");
        this.randomButton.touchEnabled = true;
        this.randomButton.x = AdaptSceenUtil.curWidth() - this.randomButton.width;
        this.randomButton.y = 100;
        this.addChild(this.randomButton);



        this.titleTextField = new egret.TextField();
        this.titleTextField.x = 36;
        this.titleTextField.y = 18;
        this.titleTextField.bold = true;
        this.titleTextField.size = 28;
        // this.titleTextField.fontFamily = ""
        this.titleTextField.textAlign = egret.HorizontalAlign.CENTER;
        this.titleTextField.text = "我的飞机图";
        this.addChild(this.titleTextField);

        this.backButton = new E8Button(this, RES.getRes("back_png"), this.onBackButtonTouched);
        this.backButton.touchEnabled = true;
        this.backButton.x = -10;
        this.backButton.y = 0;
        this.backButton.visible = false;
        this.addChild(this.backButton);


        this.scrollView = new egret.ScrollView();
        this.mapController = new egret.Sprite();

        this.mapList = new Array<MiniGameView>();

        let map: MiniGameView;
        for (let i = 0; i < 5; i++) {

            map = new MiniGameView([{ head: 34, direction: 1 },
            { head: 49, direction: 1 },
            { head: 21, direction: 1 }]);
            map.x = 200 * i;
            // map.y = this.controlViewBg.height - map.height;
            this.mapController.addChild(map);
            this.mapList.push(map);
            map.touchEnabled = true;
            map.addEventListener(egret.TouchEvent.TOUCH_TAP, this.mapTouched, this);
        }
        this.scrollView.x = 90;
        this.scrollView.width = AdaptSceenUtil.curWidth() - 90;
        this.scrollView.y = 80;
        this.scrollView.height = 200;
        this.scrollView.bounces = false;
        this.scrollView.touchEnabled = true;
        this.scrollView.setContent(this.mapController);
        this.addChild(this.scrollView)

        this.newMapButton = new E8Button(this, RES.getRes("new_map"), this.onRandomButtonTouched);
        this.newMapButton.y = this.controlViewBg.height - this.newMapButton.height;
        this.addChild(this.newMapButton);

        this.updateView();
    }

    private mapTouched(e: egret.TouchEvent) {
        let map = e.target as MiniGameView;
        // map
        PlacingController.getInstance().selectedSharedMap(map);
    }

    private updateView() {
        if (this.status === this.HISTORY_STATUS) {
            this.shareButton.visible = false;
            this.randomButton.visible = false;
            this.historyButton.visible = false;
            this.scrollView.visible = true;
            this.newMapButton.visible = true;
            this.backButton.visible = true;
        } else {
            this.shareButton.visible = true;
            this.randomButton.visible = true;
            this.historyButton.visible = true;
            this.scrollView.visible = false;
            this.newMapButton.visible = false;
            this.backButton.visible = false;
        }
    }

    private shareButtonTouched() {
        // platform.share();
    }

    async onRandomButtonTouched(e) {
        SceneManager.getInstance().placingScene.resetView();
        PlacingController.getInstance().randomMap();
    }

    private onHistoryButtonTouched() {
        this.status = this.HISTORY_STATUS;
        this.updateView();
    }

    private onBackButtonTouched() {
        if (this.status === this.HISTORY_STATUS) {
            this.status = this.INIT_STATUS;
            this.updateView();
        }
    }


}