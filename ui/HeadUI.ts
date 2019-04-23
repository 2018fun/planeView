/**
 * 头部UI
 */
class HeadUI extends egret.Sprite {
    constructor() {
        super();
        this.initView();
    }

    private goldHead: GoldFrame;
    private gasHead: GoldFrame;

    private initView() {
        this.goldHead = new GoldFrame("gold");
        this.goldHead.x = 32;
        this.goldHead.y = 32;
        this.addChild(this.goldHead);

        this.gasHead = new GoldFrame("gas");
        this.gasHead.x = 224;
        this.gasHead.y = 32;
        this.addChild(this.gasHead);

    }

    public get GoldHead() {
        return this.goldHead;
    }
    public get GasHead() {
        return this.gasHead;
    }

    public setGold(value) {
        this.goldHead.amount = value;
    }

    public setGas(value) {
        this.gasHead.amount = value;
    }
}