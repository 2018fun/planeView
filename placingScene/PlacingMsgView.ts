/**
 * 
 */
class PlacingMsgView extends egret.Sprite {
    constructor() {
        super();
        this.initView();
    }

    private viewBg: egret.Bitmap;
    private msgContainer: egret.Sprite;

    private msgKey = ["playerName", "排名", "城镇积分", "可掠夺金币", "被进攻次数", "S率", "摧毁炮数"];
    private msgValue = [];

    private opponentData;

    private initView() {
        this.viewBg = new egret.Bitmap();
        this.viewBg.texture = RES.getRes("msg_png");
        this.addChild(this.viewBg);

        this.msgContainer = new egret.Sprite();
        this.addChild(this.msgContainer);

        // let text: egret.TextField;
        // let textWidth: number;
        // for (let i = 0; i < this.msgKey.length; i++) {
        //     text = new egret.TextField();
        //     text.text = this.getPlayerData(this.msgKey[i]);
        //     text.x = 20 + Math.floor(i % 2) * AdaptSceenUtil.curWidth() / 2;
        //     text.y = 10 + Math.floor(i / 2) * text.height;

        //     textWidth = text.width;
        //     this.msgContainer.addChild(text);
        //     text = new egret.TextField();
        //     text.text = this.getPlayerData(this.msgValue[i]);
        //     text.x = textWidth + 20 + Math.floor(i % 2) * AdaptSceenUtil.curWidth() / 2;
        //     text.y = 10 + Math.floor(i / 2) * text.height;
        //     this.msgContainer.addChild(text);

        // }
    }

    public updateView(level = 0) {
        this.msgContainer.removeChildren();
        if (level === 0) {

        } else {
            let text: egret.TextField;
            let textWidth: number;
            this.msgKey[0] = "韩闯";
            this.msgValue = [level.toString() + "级", Math.floor(Math.random() * Math.pow(10, 8 - level)), Math.floor(level * 100 * Math.random()), Math.floor(level * 100 * Math.random()) * 10, Math.floor(level * 100 * Math.random()), (40 + (Math.random() * 20)).toFixed(2) + "%", Math.floor((Math.random()) * 11) + 8]

            for (let i = 0; i < this.msgKey.length; i++) {
                text = new egret.TextField();
                text.text = this.msgKey[i] + ":";
                text.x = 20 + Math.floor(i % 2) * AdaptSceenUtil.curWidth() / 2;
                text.y = 10 + Math.floor(i / 2) * text.height;

                textWidth = text.width;
                this.msgContainer.addChild(text);
                text = new egret.TextField();
                text.text = this.msgValue[i];
                text.x = textWidth + 20 + Math.floor(i % 2) * AdaptSceenUtil.curWidth() / 2;
                text.y = 10 + Math.floor(i / 2) * text.height;
                this.msgContainer.addChild(text);

            }
        }
    }

    private getPlayerData(key) {
        if (key.indexOf("msg") !== -1) {
            return this.opponentData[key]
        }
        return key;
    }
}
