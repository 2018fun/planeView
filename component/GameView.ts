/**
 * 游戏界面
 * 9*9的飞机图
 */
class GameView extends egret.Sprite {
    private showAll: boolean;
    private showTags: boolean;
    public gridList: Array<GridView> = [];
    private letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
    private numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

    private rowTags: egret.Sprite[] = [];
    private colTags: egret.Sprite[] = [];

    constructor(showAll: boolean = false, data = null, showTags = true) {
        super();
        this.showAll = showAll;
        this.showTags = showTags;
        if (data !== null) {
            this.initWithData(data);
        } else {
            this.initView();
        }
    }

    private initWithData(data) {
        let grid: GridView;
        for (let i = 0; i < 81; i++) {
            let column = i % 9;
            let row = Math.floor(i / 9);
            if (this.showAll) {
                grid = new PlacingGridView(i);
                if (data !== null) {
                    (grid as PlacingGridView).setPlane(data[i].index, data[i].gridType, data[i].bodyType, data[i].direction);
                }
            } else {
                grid = new AwayGridView(i);
            }

            grid.x = column * 60;
            grid.y = row * 60;
            this.addGridEventListener(grid);
            this.addChild(grid);
            this.gridList.push(grid);
        }
        this.anchorOffsetX = this.width / 2;
        this.anchorOffsetY = this.height / 2;
        this.x = AdaptSceenUtil.curWidth() / 2;
        this.y = AdaptSceenUtil.curHeight() / 2;

        if (this.showTags) {
            this.addTags();
        }

    }

    public updateWithData(data) {
        for (let i = 0; i < 81; i++) {
            (this.gridList[i] as PlacingGridView).setPlane(data[i].index, data[i].gridType, data[i].bodyType, data[i].direction);
            this.gridList[i].updateView();
        }
    }

    private initView() {
        let grid: GridView;
        for (let i = 0; i < 81; i++) {
            let column = i % 9;
            let row = Math.floor(i / 9);
            if (this.showAll) {
                grid = new PlacingGridView(i);
            } else {
                grid = new AwayGridView(i);
            }
            // grid.type = AIController.getInstance().getGridTypeById(i);
            grid.x = column * 60;
            grid.y = row * 60;
            this.addGridEventListener(grid);
            this.addChild(grid);
            this.gridList.push(grid);
        }
        this.anchorOffsetX = this.width / 2;
        this.anchorOffsetY = this.height / 2;
        this.x = AdaptSceenUtil.curWidth() / 2;
        this.y = AdaptSceenUtil.curHeight() / 2;
        if (this.showTags) {
            this.addTags();
        }
    }


    protected addTags() {
        let text: egret.Sprite;
        for (let i = 0; i < 9; i++) {
            text = DrawUtil.textFilter(this.numbers[i], 36, false);
            text.x = (i) * 60 + 30;
            text.y = (-1) * 60 + 30;
            this.colTags.push(text);
            this.addChild(text);

            text = DrawUtil.textFilter(this.letters[i], 36, false);
            text.x = (-1) * 60 + 30;
            text.y = (i) * 60 + 30;
            this.rowTags.push(text);
            this.addChild(text);
        }
    }

    protected addGridEventListener(grid) {
        grid.touchEnabled = true;
        grid.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouched, this);
        grid.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        grid.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        grid.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        grid.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onTouchCancel, this);
        grid.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchRelease, this);
    }

    public resetView() {
        for (let i = 0; i < 81; i++) {
            this.gridList[i].resetView();
        }
    }

    public updateView() {
        for (let i = 0; i < 81; i++) {
            this.gridList[i].updateView();
        }
    }

    private updateTags() {
        for (let i = 0; i < 9; i++) {
            DrawUtil.setImageColor(this.colTags[i], 0xffffff);
            DrawUtil.setImageColor(this.rowTags[i], 0xffffff);
        }
    }

    private onTouched(e) {
        let grid = e.target;
        PlayerHandleController.getInstance().playerTouchedGameView(grid.id);
    }

    private onTouchBegin(e) {
        this.updateTags();
        let grid = e.target;
        let x = MapUtil.getXYFromValue(grid.id).x;
        let y = MapUtil.getXYFromValue(grid.id).y;
        DrawUtil.setImageColor(this.colTags[x], 0xff0000);
        DrawUtil.setImageColor(this.rowTags[y], 0xff0000);
        PlayerHandleController.getInstance().playerBeginMoveInGameView(grid.id, e);
    }

    private onTouchMove(e) {
        let grid = e.target;
        this.updateTags();
        let x = MapUtil.getXYFromValue(grid.id).x;
        let y = MapUtil.getXYFromValue(grid.id).y;

        DrawUtil.setImageColor(this.colTags[x], 0xff0000);
        DrawUtil.setImageColor(this.rowTags[y], 0xff0000);
        PlayerHandleController.getInstance().playerMovingInGameView(grid.id, e);
    }

    private onTouchEnd(e) {
        let grid = e.target;
        this.updateTags();
        PlayerHandleController.getInstance().playerReleaseOnGameView(grid.id, e);
    }

    private onTouchRelease(e) {
        let grid = e.target;
    }

    private onTouchCancel(e) {
    }

}