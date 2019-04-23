/**
 * 游戏界面
 * 9*9的飞机图
 */
class GameView extends egret.Sprite {
    private showAll: boolean;
    public gridList: Array<GridView> = [];

    constructor(showAll: boolean = false) {
        super();
        this.showAll = showAll;
        this.initView();
    }

    private initView() {
        let grid: GridView;
        for (let i = 0; i < 81; i++) {
            let column = i % 9;
            let row = Math.floor(i / 9);
            grid = new GridView(i);
            grid.status = this.showAll ? GridStatusEnum.SHOW : GridStatusEnum.COVER;
            // grid.type = AIController.getInstance().getGridTypeById(i);
            grid.x = column * 60;
            grid.y = row * 60;
            grid.touchEnabled = true;
            grid.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouched, this);
            grid.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
            grid.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
            grid.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
            grid.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onTouchCancel, this);
            grid.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchRelease, this);
            this.addChild(grid);
            this.gridList.push(grid);
        }
        this.anchorOffsetX = this.width / 2;
        this.anchorOffsetY = this.height / 2;
        this.x = AdaptSceenUtil.curWidth() / 2;
        this.y = AdaptSceenUtil.curHeight() / 2;
    }

    public resetView() {
        for (let i = 0; i < 81; i++) {
            this.gridList[i].resetView();
        }
    }

    protected updateView() {
        for (let i = 0; i < 81; i++) {
            this.gridList[i].updateView();
        }
    }


    private onTouched(e) {
        let grid = e.target;
        // console.log(e.target.id, "touch");
        PlayerHandleController.getInstance().playerTouchedGameView(grid.id);
        // console.log(grid);
    }

    private onTouchBegin(e) {
        let grid = e.target;
        // console.log(e.target.id, "begin");
        PlayerHandleController.getInstance().playerBeginMoveInGameView(grid.id);
    }

    private onTouchMove(e) {
        let grid = e.target;
        // console.log(e.target.id, "move");
        PlayerHandleController.getInstance().playerMovingInGameView(grid.id);
    }

    private onTouchEnd(e) {
        let grid = e.target;
        // console.log(e.target.id, "end");
        PlayerHandleController.getInstance().playerReleaseOnGameView(grid.id);
    }

    private onTouchRelease(e) {
        let grid = e.target;
        // console.log(e.target.id, "release");
    }

    private onTouchCancel(e) {
        // console.log(e.target.id, "release");
    }

}