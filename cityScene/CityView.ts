/**
 * 
 */
class CityView extends egret.Sprite {
    constructor() {
        super();
        this.initView();
    }

    private currentSelect;
    private currentLongTouch;
    private longTouchTime;


    private centerX;
    private centerY;

    private addSequence = [6, 1, 5, 0, 2, 4, 3]
    private groundX = [0, 100, 200, 100, -100, -200, -100];
    private groundY = [20, -140, 20, 180, 180, 20, -140];
    private groundList = new Array<Ground>();

    private bg: egret.Bitmap;

    private initView() {
        this.currentSelect = null;

        this.bg = new egret.Bitmap();
        this.bg.texture = RES.getRes("city_bg_png");
        this.bg.scaleX = this.bg.scaleY = 0.5;
        this.bg.anchorOffsetX = this.bg.width / 2;
        this.bg.anchorOffsetY = this.bg.height / 2;
        // this.bg.anchorOffsetY 
        this.bg.x = AdaptSceenUtil.curWidth() / 2;
        this.bg.y = AdaptSceenUtil.curHeight() / 2;
        this.addChild(this.bg);

        let ground: Ground;
        this.groundList.length = 7;
        // let centerX = 0;
        // let centerY = 0;
        this.centerX = AdaptSceenUtil.curWidth() / 2;
        this.centerY = AdaptSceenUtil.curHeight() / 2;


        let cityData = CityController.getInstance().getBuildings();
        for (let i = 0; i < this.addSequence.length; i++) {

            ground = new Ground(this.addSequence[i]);
            ground.x = this.centerX + this.groundX[this.addSequence[i]];
            ground.y = this.centerY + this.groundY[this.addSequence[i]];
            ground.touchEnabled = true;


            this.addChild(ground);
            this.groundList[this.addSequence[i]] = ground;
            if (cityData[this.addSequence[i]] === null) {
                continue;
            }
            ground.setBuilding(cityData[this.addSequence[i]].id, cityData[this.addSequence[i]].level);

        }

        this.anchorOffsetX = this.centerX;
        this.anchorOffsetY = this.centerY;

        this.x = AdaptSceenUtil.curWidth() / 2;
        this.y = AdaptSceenUtil.curHeight() / 2;
        this.addBuildingTouchEventListener();
    }

    private addBuildingTouchEventListener() {
        for (let i = 0; i < this.groundList.length; i++) {
            this.groundList[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.groundTouched, this);
            this.groundList[i].addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.groundTouchBegin, this);
        }

    }

    private removeBuildingTouchEventListener() {
        for (let i = 0; i < this.groundList.length; i++) {
            this.groundList[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.groundTouched, this);
            this.groundList[i].removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.groundTouchBegin, this);
        }

    }

    public updateView(position) {
        let cityData = CityController.getInstance().getBuildings();
        this.groundList[position].setBuilding(cityData[position].id, cityData[position].level);
    }

    private groundTouchBegin(e) {
        this.removeBuildingTouchEventListener();

        this.longTouchTime = new Date().getTime();
        let ground: Ground = e.target;
        // if (this.currentSelect === ground.position) {
        //     return;
        // }
        // CityController.getInstance().selectPosition(ground.position);

        this.currentLongTouch = ground;

        this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMove, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);
    }

    private touchMove(e) {

    }

    private touchEnd(e) {
        this.addBuildingTouchEventListener();
        let time = new Date().getTime();
        if (time - this.longTouchTime < 1500) {
            return
        }

        // this.closeUp(this.currentLongTouch.position);
        this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMove, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);
    }

    private groundTouched(e: egret.TouchEvent) {
        let ground: Ground = e.target;
        if (this.currentSelect === ground.position) {
            return;
        }
        CityController.getInstance().selectPosition(ground.position);
    }

    public closeUp(position) {
        egret.Tween.get(this, { loop: false }).to({ x: this.centerX - 2 * this.groundX[position], y: this.centerY - 2 * this.groundY[position], scaleX: 2, scaleY: 2 }, 1500);
    }


    public updateSelected(position) {
        if (this.currentSelect !== null) {
            this.groundList[this.currentSelect].selected = false;
        }
        this.currentSelect = position;
        this.groundList[position].selected = true;
    }

    public build(building) {
        this.groundList[this.currentSelect].setBuilding(building.id, 1);
    }

    public demolish() {
        this.groundList[this.currentSelect].demolish();
    }

    public levelUp() {
        this.groundList[this.currentSelect].levelUp();
    }
}