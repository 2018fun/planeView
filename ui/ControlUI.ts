/**
 * 控制UI
 */

class ControlUI extends egret.Sprite {
    constructor() {
        super();
        this.initView();
    }

    private build_png: egret.Bitmap;

    private initView() {
        let bg = new egret.Bitmap();
        bg.texture = RES.getRes("control_png");
        bg.x = 0;
        bg.y = 0;
        this.addChild(bg);

        this.build_png = new egret.Bitmap();
        this.build_png.texture = RES.getRes("build_button_png");
        this.build_png.y = 0;
        this.build_png.x = 320 - this.build_png.width / 2;
        this.addChild(this.build_png);
    }
}