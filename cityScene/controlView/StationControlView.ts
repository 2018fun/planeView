/**
 * 
 */
class StationControlView extends BuildingControlView {
    constructor() {
        super();
        this.initStation()
    }

    private initStation() {


        this.titleTextField = new egret.TextField();
        this.titleTextField.x = 36;
        this.titleTextField.y = 18;
        this.titleTextField.bold = true;
        this.titleTextField.size = 28;
        // this.titleTextField.fontFamily = ""
        this.titleTextField.textAlign = egret.HorizontalAlign.CENTER; this.titleTextField.text = i18n.getInstance().getLanguage(CityController.getInstance().selectedData().name);
        this.addChild(this.titleTextField);

        console.log(this.titleTextField.text);

        this.backButton = new E8Button(this, RES.getRes("back_png"), this.onBackButtonTouched);
        this.backButton.touchEnabled = true;
        this.backButton.x = -10;
        this.backButton.y = 0;
        this.backButton.visible = false;
        this.addChild(this.backButton);
    }

    private onBackButtonTouched() {

    }
}