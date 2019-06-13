/**
 * 
 */

class MiniGameView extends egret.Sprite {
    constructor(data) {
        super();
        this.headData = data;
        this.initView();
    }

    private headData: HeadData[];

    private bg: egret.Bitmap;

    private gameView: GameView;

    private mapData: MapData;

    private selected: boolean;

    async initView() {
        this.bg = new egret.Bitmap();
        this.bg.texture = RES.getRes("map_bg_png");
        this.addChild(this.bg);


        this.mapData = new MapData();
        await this.initData();

        console.log(this.mapData.map);

        this.gameView = new GameView(true, this.mapData.map, false);
        // this.gameView.sethe
        this.gameView.anchorOffsetX = this.gameView.width / 2;
        this.gameView.anchorOffsetY = this.gameView.height / 2;
        this.gameView.scaleX = 160 / 630;
        this.gameView.scaleY = 160 / 630;
        this.gameView.x = this.bg.width / 2;
        this.gameView.y = this.bg.height / 2 - 5;
        this.addChild(this.gameView);
        // this.gameView.cacheAsBitmap = true;
        this.gameView.touchEnabled = false;
        this.gameView.touchChildren = false;
        this.gameView.cacheAsBitmap = true;
    }

    private initData() {
        for (let i = 0; i < this.headData.length; i++) {
            this.mapData.setPlaneGridByHead(this.headData[i].head, this.headData[i].direction);
        }
    }

    private updateData() {

    }
}