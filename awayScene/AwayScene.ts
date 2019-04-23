/**
 * 游戏场景
 * 
 * 出征场景
 * create by tishoy
 * 2019.4.20
 */

class AwayScene extends egret.Sprite {
    constructor() {
        super();
        this.initView();
    }

    public gameView: GameView;
    private bulletCurrent: BulletView;
    private bulletNext: BulletView;


    private initView() {
        let bg = new egret.Bitmap();
        bg.texture = RES.getRes("bg_png");
        this.addChild(bg);



        this.gameView = new GameView(false);
        this.addChild(this.gameView);

        // for () {

        // }
        this.x = -640;
    }

    public inAnimate() {
        // this.cityView.
        egret.Tween.get(this).to({ x: 0 }, 800);
    }

    public outAnimate() {
        egret.Tween.get(this).to({ x: -640 }, 800);
    }
}